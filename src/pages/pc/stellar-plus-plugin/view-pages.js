const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

// 转换为Promise形式以便使用async/await
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

/**
 * Base64编码（支持中文及特殊字符）
 * @param {string} str - 需要编码的字符串
 * @returns {string} Base64编码结果
 */
function base64Encode(str) {
    try {
        const utf8Bytes = new TextEncoder().encode(str);
        let binaryString = '';
        for (let i = 0; i < utf8Bytes.length; i++) {
            binaryString += String.fromCharCode(utf8Bytes[i]);
        }
        return btoa(binaryString);
    } catch (error) {
        console.error('Base64编码失败:', error);
        throw error;
    }
}

async function viewPages() {
    const dir = path.join(process.cwd(), 'src/subPackages_pages_view');

    try {
        // 检查目录是否存在
        if (!fs.existsSync(dir)) {
            throw new Error(`目录不存在: ${dir}`);
        }

        const pages = await readdir(dir);

        await Promise.all(
            pages.map(async name => {
                try {
                    const vueFile = path.join(dir, name, `${name}.vue`);
                    const outputFile = path.join(dir, name, `page_code.json`);

                    // 读取文件时明确指定utf8编码
                    let code = await readFile(vueFile, 'utf8');
                    code = code.replace(/@\/uni_modules\/stellar-ui-plus/g, 'stellar-ui-plus');
                    const encoded = base64Encode(code);

                    // 格式化JSON输出
                    await writeFile(outputFile, JSON.stringify({ code: encoded }, null, 2));
                } catch (error) {
                    console.error(`处理页面 ${name} 失败:`, error);
                }
            })
        );
    } catch (error) {
        console.error('处理页面失败:', error);
        throw error;
    }
}

module.exports = viewPages;
