const path = require('node:path');
const fs = require('node:fs');
const { getDir } = require('./utils');

module.exports = function (components) {
    components.forEach(component => {
        const filePath = path.join(getDir(), '/components', `${component}/${component}.easycom.json`);
        const configFilePath = path.join(getDir(), '/components', `${component}/config.json`);

        // 组件没有easycom和config文件为内置组件，无需提示和生成
        if (!fs.existsSync(filePath)) {
            if (fs.existsSync(configFilePath)) console.error(`组件【${component}】没有定义.easycom.json说明文件`);

            return;
        }
        // 读取文件内容
        let content = fs.readFileSync(filePath, 'utf-8');
        if (!content) {
            console.error(`组件【${component}】的说明文件内容为空`);
            return;
        }
        content = content.replaceAll('|', '/');
        const data = JSON.parse(content);

        if (data.attributes?.length) {
            let props = `### Props\n`;
            props += `| 属性名 | 说明  | 类型 | 默认值  | 可选值 | 支持版本 |\n| ----- | ----- | --- | ------- | ------ | -------- |\n`;
            let isProps = false;
            let event = `### Events\n`;
            event += `| 事件名 | 说明  | 事件参数 | 支持版本 |\n| ----- | ----- | ------- | -------- |\n`;
            let isEvent = false;
            let methods = `### Methods\n`;
            methods += `| 方法名 | 说明  | 参数 | 返回值 | 支持版本 |\n| ----- | ----- | --- | ------ | -------- |\n`;
            let isMethods = false;
            let slots = `### Slots\n`;
            slots += `| 插槽名 | 说明  | 参数 | 支持版本 |\n| ----- | ----- | --- | -------- |\n`;
            let isSlots = false;

            data.attributes.forEach(item => {
                const description = item.description || '-';
                const version = item.version ? `\`${item.version}\`` : '-';

                if (item.name?.indexOf('[event]') === 0) {
                    // Events
                    isEvent = true;
                    const name = item.name.replace('[event]', '');
                    const params = item.params?.length ? item.params.map(param => `\`${param.name}\`：${param.description}`).join('<br/>') : '-';
                    event += `| \`${name}\` | ${description} | ${params} | ${version} |\n`;
                } else if (item.name?.indexOf('[method]') === 0) {
                    // Methods
                    isMethods = true;
                    const name = item.name.replace('[method]', '');
                    const params = item.params?.length ? item.params.map(param => `\`${param.name}\`：${param.description}`).join('<br/>') : '-';
                    const returnValue = item.returnValue ? `\`${item.returnValue}\`` : '-';
                    methods += `| \`${name}\` | ${description} | ${params} | ${returnValue} | ${version} |\n`;
                } else if (item.name?.indexOf('[slot]') === 0) {
                    // Slots
                    isSlots = true;
                    const name = item.name.replace('[slot]', '');
                    const params = item.params?.length ? item.params.map(param => `\`${param.name}\`：${param.description}`).join('<br/>') : '-';
                    slots += `| \`${name}\` | ${description} | ${params} | ${version} |\n`;
                } else {
                    // Props
                    isProps = true;
                    const type = `\`${item.type}\``;
                    let def = '-';

                    if (item.default !== undefined) {
                        if (typeof item.default === 'object') {
                            def = `\`${JSON.stringify(item.default)}\``;
                        } else if (item.type == '-') {
                            def = `${item.default}`;
                        } else {
                            def = `\`${item.default}\``;
                        }
                    }

                    const values = item.values?.length ? item.values.map(value => `\`${value.name}\`：${value.description}`).join('<br/>') : '-';
                    props += `| \`${item.name}\` | ${description} | ${type} | ${def} | ${values} | ${version} |\n`;
                }
            });

            props += '\n\n';
            event += '\n\n';
            methods += '\n\n';
            slots += '\n\n';

            const mdFile = path.join(getDir(), '/components', `${component}/ATTRIBUTES.md`);
            let result = '## API\n\n';
            result += isProps ? props : '';
            result += isEvent ? event : '';
            result += isMethods ? methods : '';
            result += isSlots ? slots : '';
            fs.writeFileSync(mdFile, result, 'utf-8');
        }
    });
};
