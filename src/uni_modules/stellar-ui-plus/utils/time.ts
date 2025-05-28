/**
 * @desc @swjs/chinese-holidays 中国法定节假日查询
 * @version 1.1.0
 */

async function getRemoteHolidaysApi(year, options) {
    return new Promise(async (resolve, reject) => {
        uni.request({
            url: `${options.baseUrl}/${year}.json`,
            method: 'get',
            success: res => {
                console.log('res', res);
                resolve(res.data);
            },
        });
    });
}

// 日期网址链接
// export const BASE_URL = 'https://cdn.jsdelivr.net/gh/NateScarlet/holiday-cn@master';
/**
 * 中国地区 cdn 地址受到污染，因此使用 fastly.jsdelivr.net
 */
const BASE_URL = 'https://fastly.jsdelivr.net/gh/NateScarlet/holiday-cn@master';
const WEEKS = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

/**
 * @desc 假期信息
 */
class HolidaysInfo {
    constructor(config) {
        /**
         * 日期的缓存
         */
        this.holidays = {};
        this.config = {
            baseUrl: BASE_URL,
            ...(config || {}),
        };
    }
    /**
     * @desc 获取日期信息
     * @param {string} dateStr
     * @returns
     */
    async getDateInfo(dateStr) {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const holidays = await this.getHolidaysByYear(String(year));
        // see https://github.com/MrSeaWave/chinese-holidays/pull/124
        // 2022年12月31的节假日日期在2023年才能获得，有些时候会有调休
        if (date.getMonth() === 11) {
            const nextYear = year + 1;
            const nextHolidays = await this.getHolidaysByYear(String(nextYear));
            holidays.push(...nextHolidays);
        }
        return holidays.find(info => info.date === dateStr);
    }
    /**
     * 获取当年的假期数据（包含节假日的调休
     * @param year
     */
    async getHolidaysByYear(year) {
        if (!this.holidays[year]) {
            await this._getRemoteData(year);
        }
        return this.holidays[year] || [];
    }
    // 从链接中获取新的年份信息
    async _getRemoteData(year) {
        // console.log(`------ Start: 获取远程日期(${year})数据中... ------`);
        const resp = await getRemoteHolidaysApi(year, { baseUrl: this.config.baseUrl });
        console.log('resp', resp);
        //await getMethod({ url: `/${year}.json` });
        // console.log('------ End: 结束获取 ------');
        const { days = [] } = resp || {};
        if (!days.length) throw new Error(`暂时没有 ${year} 年的放假数据，请稍后重试 `);
        this.holidays[year] = days;
    }
    // 获取本地holidays缓存
    getHolidaysCache() {
        return this.holidays;
    }
}

/**
 * @desc 判断是否是有效日期
 * @param {Date} date
 * @returns {boolean}
 */
function isValidDate(date) {
    return date instanceof Date && !Number.isNaN(date.getTime());
}
/**
 * @desc 日期格式化
 * @param {AcceptDateType} date 日期
 * @param {string} fmt 格式规则
 * @returns {string} 格式化后的日期
 */
function dateFormat(date, fmt = 'YYYY-MM-DD HH:mm:ss') {
    const d = new Date(date);
    if (!isValidDate(d)) {
        throw new Error(`Invalid date: ${date}`);
    }
    const opt = {
        'Y+': d.getFullYear().toString(), // 年
        'M+': (d.getMonth() + 1).toString(), // 月
        'D+': d.getDate().toString(), // 日
        'H+': d.getHours().toString(), // 小时
        'm+': d.getMinutes().toString(), // 分
        's+': d.getSeconds().toString(), // 秒
        'q+': Math.floor((d.getMonth() + 3) / 3).toString(), // 季度
        S: d.getMilliseconds().toString(), // 毫秒
    };
    Object.entries(opt).forEach(([k, val]) => {
        const ret = new RegExp(`(${k})`).exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], ret[1].length === 1 ? val : val.padStart(ret[1].length, '0'));
        }
    });
    return fmt;
}
/**
 * @desc 当前日期是星期几
 * @param {AcceptDateType} date 日期
 * @returns {string}
 */
function getWeekDay(date) {
    return WEEKS[new Date(date).getDay()];
}
/**
 * @desc 判断是否是周末
 * @param date
 */
function isWeekEnd$1(date) {
    const day = new Date(date).getDay();
    return day === 0 || day === 6;
}

var EDateType;
(function (EDateType) {
    /**
     * 工作日
     */
    EDateType[(EDateType['WorkDay'] = 1)] = 'WorkDay';
    /**
     * 周末
     */
    EDateType[(EDateType['WeekEnd'] = 2)] = 'WeekEnd';
    /**
     * 法定节假日
     */
    EDateType[(EDateType['Holiday'] = 3)] = 'Holiday';
    /**
     * 调休，节假日调班
     */
    EDateType[(EDateType['LeaveInLieu'] = 4)] = 'LeaveInLieu';
})(EDateType || (EDateType = {}));
/**
 * 判定日期的工具集
 */
class Holidays {
    static getInstance() {
        if (!this.instance) {
            this.instance = new Holidays();
        }
        return this.instance;
    }
    constructor(config) {
        /**
         * @desc 获取当前日期数据
         * @param {string | Date | number} date 日期
         */
        this.getDateInfo = async date => {
            const dateStr = dateFormat(date, 'YYYY-MM-DD');
            const day = getWeekDay(date);
            // type: 1-工作日 2-周末 3 法定节假日 4 节假日调班
            const result = {
                name: '工作日',
                date: dateStr,
                day,
                type: 1,
            };
            if (isWeekEnd$1(date)) {
                result.name = '周末';
                result.type = 2;
            }
            const holiday = await this.holidaysInfo.getDateInfo(dateStr);
            if (holiday) {
                const { isOffDay, name } = holiday;
                result.name = name + (isOffDay ? '' : ' 调班');
                result.type = isOffDay ? 3 : 4;
            }
            return result;
        };
        /**
         * @desc 判断是否是法定节假日
         * @param {AcceptDateType} date 日期
         */
        this.isHoliday = async date => {
            const info = await this.getDateInfo(date);
            return info.type === EDateType.Holiday;
        };
        /**
         * @desc 判断是否是工作日（含节假日的调休）
         * @param date
         */
        this.isWorkingDay = async date => {
            const info = await this.getDateInfo(date);
            return info.type === EDateType.WorkDay || info.type === EDateType.LeaveInLieu;
        };
        /**
         * @desc 判断是否是周末（不包含节假日调休上班）
         * @param date
         */
        this.isWeekEnd = async date => {
            const info = await this.getDateInfo(date);
            return info.type === EDateType.WeekEnd;
        };
        /**
         * @desc 获取本地的假期缓存数据
         */
        this.getHolidaysCache = () => {
            return this.holidaysInfo.getHolidaysCache();
        };
        this.holidaysInfo = new HolidaysInfo(config);
    }
}
const holidays = Holidays.getInstance();

const isWorkingDay = holidays.isWorkingDay;
const isHoliday = holidays.isHoliday;
const isWeekEnd = holidays.isWeekEnd;
const getDateInfo = holidays.getDateInfo;
const getHolidaysCache = holidays.getHolidaysCache;
// 测试编译包的语法，不要使用
const __isHoliday__ = holidays?.isHoliday;

export { Holidays, __isHoliday__, getDateInfo, getHolidaysCache, isHoliday, isWeekEnd, isWorkingDay };
