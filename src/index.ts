import WebpackSources from 'webpack-sources';
import { createUnplugin } from 'unplugin';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';


const PLUGIN_NAME = 'unocss-postcss';
const DEFAULT_OVERRIDE_BROWSERS_LIST = [
    ">1%",
    "last 1 versions",
    "not ie <= 8",
    "not dead"
]

export function unocssPostcssWebpackPlugin(overrideBrowserslist: Array<string>=DEFAULT_OVERRIDE_BROWSERS_LIST) {
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
                                console.error('[postcss autoprefixer]:', e);
                            }
                        }
                    });
                });
            }
        };
    }).webpack();
}
