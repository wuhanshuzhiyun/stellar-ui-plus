import { parse, compileScript } from '@vue/compiler-sfc';

export default function autoDebugPlugin(dirName) {
    return {
        name: 'vite-plugin-auto-debug',
        enforce: 'pre',
        transform(code, id) {
            const isPage = id.endsWith('.vue') && (id.includes('/src/pages/') || id.includes('/src/subPackages') || (dirName && id.includes(dirName)));

            if (!isPage) return null;

            const { descriptor } = parse(code);

            if (!descriptor.scriptSetup) {
                return null;
            }

            let scriptContent = descriptor.scriptSetup.content;
            let scriptLang = descriptor.scriptSetup.lang || 'js';

            const { bindings } = compileScript(descriptor, { id });

            if (!bindings) {
                return null;
            }

            const debugVars = Object.keys(bindings).filter(key => ['setup-ref', 'setup-reactive-const', 'setup-computed', 'setup-shallow-ref'].includes(bindings[key]));

            if (debugVars.length === 0) {
                return null;
            }

            const injectionCall = `
        import { useStellarDebug } from 'stellar-ui-plus/common/auto-debug/useStellarDebug';
        useStellarDebug({ ${debugVars.join(', ')} });
      `;

            let newScriptContent = scriptContent + injectionCall;

            let newCode = '';

            if (descriptor.template) {
                const attrs = Object.keys(descriptor.template.attrs)
                    .map(key => `${key}="${key === 'lang' ? descriptor.template.attrs[key] : descriptor.template.attrs[key]}"`)
                    .join(' ');
                newCode += `<template ${attrs ? ` ${attrs}` : ''}>\n${descriptor.template.content}\n</template>\n`;
            }

            newCode += `<script setup${scriptLang ? ` lang="${scriptLang}"` : ''}>\n${newScriptContent}\n</script>\n`;

            if (descriptor.styles) {
                descriptor.styles.forEach(style => {
                    const attrs = Object.keys(style.attrs)
                        .map(key => `${key}="${key === 'lang' ? style.attrs[key] : style.attrs[key]}"`)
                        .join(' ');
                    newCode += `<style${attrs ? ` ${attrs}` : ''}>\n${style.content}\n</style>\n`;
                });
            }

            return {
                code: newCode,
                map: null,
            };
        },
    };
}
