var base = {
	plugin_version: '1.20.2',
};

function createPlugin(o) {
	if ('object' == typeof o && 'string' == typeof o.plugin_name && '' !== o.plugin_name)
		return (
			(o.plugin_version = base.plugin_version),
			(o.log =
				o.log ||
				function () {
					'object' == typeof console &&
						'function' == typeof console.log &&
						console.log.apply(console, arguments);
				}),
			o
		);
	'object' == typeof console &&
		'function' == typeof console.error &&
		console.error('plugin must contain  proprerty "plugin_name"');
}

function isObject(o) {
	return null != o && '[object Object]' == Object.prototype.toString.call(o);
}

function isString(o) {
	return '[object String]' == toString.call(o);
}
function isNumber(obj) {
	return toString.call(obj) == '[object Number]' && /[\d\\.]+/.test(String(obj));
}
const toString = Object.prototype.toString;

function pick(obj, keys) {
	return obj == null
		? {}
		: keys.reduce((result, key) => {
				if (obj.hasOwnProperty(key)) {
					result[key] = obj[key];
				}
				return result;
		  }, {});
}

var nativeIsArray = Array.isArray;
var isArray =
	nativeIsArray ||
	function (obj) {
		return toString.call(obj) === '[object Array]';
	};
function log() {
	if ('object' == typeof console && console.log) {
		isString(arguments[0]) && (arguments[0] = 'sensors reportNetWork————' + arguments[0]);
		try {
			return console.log.apply(console, arguments);
		} catch (o) {
			console.log('sensors reportNetWork————', arguments[0]);
		}
	}
}
function shouldIgnore(url, paths) {
	return paths.some((path) => {
		// 构建正则表达式，匹配包含 path 的URL，path 前后可以有任意字符
		const escapedPath = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // 转义正则表达式中的特殊字符
		const regex = new RegExp(`.*${escapedPath}.*`);
		return regex.test(url);
	});
}
function comparePaths(url1, url2) {
	// 提取URL的路径和查询字符串部分
	function extractPathAndQuery(url) {
		// 去除URL的查询字符串部分（如果有的话）
		let queryStringIndex = url.indexOf('?');
		let queryString = queryStringIndex > -1 ? url.substring(queryStringIndex) : '';
		// 去除协议和主机名部分，保留路径
		let path = url.replace(/^[^/]+:\/\/[^/]+/, '').replace(queryString, '');
		// 返回路径和查询字符串
		return path + queryString;
	}

	// 提取两个URL的路径和查询字符串
	const pathAndQuery1 = extractPathAndQuery(url1);
	const pathAndQuery2 = extractPathAndQuery(url2);

	// 比较两个路径和查询字符串是否相等
	return pathAndQuery1 === pathAndQuery2;
}
// 默认配置
var para = {
	// 采集最低接口耗时时长（毫秒）
	min_cost_time_limit: 3000,
	// 采集接口路径地址
	collect_url_path: [],
	// 排除采集接口路径地址
	ignore_url_path: [],
	// 排查包含采集路径
	ignore_include_url_path: [],
	// 排除采集的接口http状态码
	ignore_http_code: [200],
	// 采集接口的 header 属性
	collect_header_attribute: ['content-type'],
	error_text: '获取失败',
};

var _ = {
		isObject: isObject,
		log: log,
		isNumber: isNumber,
		pick: pick,
		shouldIgnore: shouldIgnore,
		comparePaths: comparePaths,
	},
	sa = null,
	ReportNetWork = {
		plugin_name: 'ReportNetWork',
		init: function (o, t) {
			if (!o || !_.isObject(o)) {
				_.log('请传入正确的 sensors 对象！');
				return false;
			}
			sa = o;
			if (t) {
				this.reportNetWork(t);
			}
		},
		reportNetWork(o) {
			if (!o || !_.isObject(o)) {
				_.log('请传入正确的参数对象！');
				return false;
			}
			if (
				(o.collect_url_path && !isArray(o.collect_url_path)) ||
				(o.ignore_http_code && !isArray(o.ignore_http_code)) ||
				(o.collect_header_attribute && !isArray(o.collect_header_attribute))
			) {
				_.log('请传入正确的数组对象！');
				return false;
			}
			if (o.min_cost_time_limit && !_.isNumber(o.min_cost_time_limit)) {
				_.log('请传入正确的数字！');
				return false;
			}
			Object.assign(para, o);
			this.requestOptionsMap = new Map();
			uni.addInterceptor('request', {
				invoke: (options) => {
					// 为每个请求生成一个唯一标识符
					const requestId = `req.${Date.now()}.${Math.random().toString(16).slice(2)}`;
					options.header = {
						'x-request-id': requestId,
						...options.header,
					};
					// 排除采集接口路径地址
					if (para.ignore_url_path.includes(options.url)) {
						return false;
					}
					// 排查包含采集路径
					if (_.shouldIgnore(options.url, para.ignore_include_url_path)) {
						return false;
					}
					// 记录当前请求的时间戳并推入队列
					let url = options.url;
					let query = options.query;
					if (options.query != null && Object.keys(options.query).length > 0) {
						url = `${options.url}?${Object.keys(options.query)
							.map((key) => {
								return encodeURIComponent(key) + '=' + encodeURIComponent(options.query[key]);
							})
							.join('&')}`;
					} else if (
						options.data != null &&
						options.method === 'get' &&
						Object.keys(options.data).length > 0
					) {
						query = options.data;
						url = `${options.url}?${Object.keys(options.data)
							.map((key) => {
								return encodeURIComponent(key) + '=' + encodeURIComponent(options.data[key]);
							})
							.join('&')}`;
					}
					const requestEntry = {
						options: {
							dataType: options.dataType,
							header: _.pick(options.header, para.collect_header_attribute),
							method: options.method,
							query: query,
							data: options.data,
							url: url,
							url_path: options.url,
							timeout: options.timeout,
						},
						time: Date.now(), // 获取当前时间戳
					};
					if (options.url.indexOf('inte-mall-customer/api/redEnvelopeLog/getRedEnvelopeList') >= 0) {
					}
					this.requestOptionsMap.set(requestId, requestEntry);
				},
				fail: (err, invocation) => {
					// 捕获到超时错误，使用自定义参数获取URL
					if (err.errMsg.includes('timeout')) {
						for (const [key, value] of this.requestOptionsMap.entries()) {
							if (_.comparePaths(value.options.url, invocation.url)) {
								const data = {
									interface_statusCode: 999,
									interface_bizCode: '999',
									interface_header: value.options.header,
									interface_url: value.options.url,
									interface_url_path: value.options.url_path,
									interface_data: value.options.data || {},
									interface_query: value.options.query || {},
									interface_method: value.options.method,
									interface_duration: 0,
									interface_trace_id: '',
								};
								sa.track('$INFError', data);
								this.requestOptionsMap.delete(key);
							}
						}
					}
				},
				complete: (res) => {
					// 从响应中获取自定义的请求标识符
					const requestId = res.header && res.header['x-request-id'];
					if (!requestId) {
						return;
					}
					// 使用请求标识符从Map中取出对应的options
					const requestEntry = this.requestOptionsMap.get(requestId);
					if (requestEntry) {
						const endTime = Date.now();
						const duration = endTime - requestEntry.time;
						// 处理你的逻辑，例如检查响应数据
						const data = {
							interface_statusCode: res.statusCode,
							interface_bizCode: res.data ? res.data.code : para.error_text,
							interface_header: requestEntry.options.header,
							interface_url: requestEntry.options.url,
							interface_url_path: requestEntry.options.url_path,
							interface_data: requestEntry.options.data || {},
							interface_query: requestEntry.options.query || {},
							interface_method: requestEntry.options.method,
							interface_duration: duration,
							interface_trace_id:
								res.header && res.header['x-trace-id'] ? res.header['x-trace-id'] : para.error_text,
						};
						// 排除采集接口路径地址
						if (para.ignore_url_path.includes(data.interface_url_path)) {
							return false;
						}
						// 排查包含采集路径
						if (shouldIgnore(data.interface_url_path, para.ignore_include_url_path)) {
							return false;
						}
						if (para.collect_url_path.includes(data.interface_url_path)) {
							sa.track('$INFNormal', data);
						}
						if (!para.ignore_http_code.includes(data.interface_statusCode)) {
							// 排除采集的接口http状态码
							sa.track('$INFError', data);
						} else {
							if (duration >= para.min_cost_time_limit) {
								// 采集最低接口耗时时长（毫秒）
								sa.track('$INFSlow', data);
							}
						}
						// 请求完成后，可以从Map中移除对应的options
						this.requestOptionsMap.delete(requestId);
					}
				},
			});
		},
		// 假设有一个实例属性来存储当前请求的options
		requestOptionsMap: null,
	},
	index = createPlugin(ReportNetWork);
export default index;
