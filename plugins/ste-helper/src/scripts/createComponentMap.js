const path = require('node:path');
const fs = require('node:fs');

const basePath = path.resolve(__dirname, './../../../../src/uni_modules/stellar-ui-plus/components');
const componentDirs = fs.readdirSync(basePath, 'utf8');

function genaratorComponentMap() {
    const componentMap = {};
    if (!componentDirs.length) return;

    for (const componentDir of componentDirs) {
        const stat = fs.lstatSync(`${basePath}/${componentDir}`);
        const compoName = path.basename(`${basePath}/${componentDir}`);
        if (stat.isDirectory()) {
            const absolutePath = path.join(`${basePath}/${componentDir}`, `${compoName}.easycom.json`);
            if (!fs.existsSync(absolutePath)) {
                componentMap[compoName] = {
                    site: compoName,
                    attr: [''],
                };
                continue;
            }
            const compConfig = JSON.parse(fs.readFileSync(path.join(`${basePath}/${componentDir}`, `${compoName}.easycom.json`), 'utf8'));

            const props = compConfig.attributes.filter(item => item.name && !item.name.includes('[event]'));
            const events = compConfig.attributes
                .filter(item => item.name && item.name.includes('[event]'))
                .map(item => {
                    return {
                        ...item,
                        name: item.name.replace('[event]', ''),
                    };
                });

            componentMap[compoName.replace(/^ste-/, '')] = {
                site: compoName,
                attr: [`${props[0]?.name}=''`],
                props,
                events,
            };
        }
    }
    return componentMap;
}

function writeFileInComponentMap() {
    const componentMap = genaratorComponentMap();
    const innerText = `
import { ComponentDesc } from './componentDesc';

export const componentMap: Record<string, ComponentDesc> = ${JSON.stringify(componentMap, null, 4)}
    `;

    const componentMapPath = path.resolve(__dirname, './../componentMap.ts');

    fs.writeFileSync(componentMapPath, innerText);
}

writeFileInComponentMap();
