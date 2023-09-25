import WebpackSources from 'webpack-sources';
import { createUnplugin } from 'unplugin';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
const PLUGIN_NAME = 'unocss-postcss';
const DEFAULT_OVERRIDE_BROWSERS_LIST = [
    'Android >= 6', 'iOS >= 10', 'ie >= 11', 'Firefox >= 35', 'chrome >= 40','safari >= 6'
]
export function unocssPostcssWebpackPlugin(overrideBrowserslist: Array<string>=DEFAULT_OVERRIDE_BROWSERS_LIST) {
    console.log(overrideBrowserslist)
    return createUnplugin(() => {
        return {
            name: PLUGIN_NAME,
            enforce: 'post',
            webpack(compiler) {
                compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation: any) => {
                    compilation.hooks.optimizeAssets.tapPromise(PLUGIN_NAME, async () => {
                        const files = Object.keys(compilation.assets);
                        for (const file of files) {
                            if (!file.endsWith('.css')) {
                                continue;
                            }
                            const code = compilation.assets[file].source().toString();
                            try {
                                const result = await postcss([
                                    autoprefixer({
                                        overrideBrowserslist
                                    })
                                ]).process(code, {
                                    from: file
                                });
                                compilation.assets[file] = new WebpackSources.RawSource(result.content) as any;
                            } catch (e) {
                                console.error('[postcss autoprefixer error]:', e);
                            }
                        }
                    });
                });
            }
        };
    }).webpack();
}
