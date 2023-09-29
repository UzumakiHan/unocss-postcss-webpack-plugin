# unocss-postcss-webpack-plugin


## unocss在vite中使用配置，关于unocss在vite中使用，自行查阅官网 https://unocss.dev/integrations/vite ,vite使用unocss就不会出现这样的问题

```js
//vite.config.ts
import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    UnoCSS()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [
          require('autoprefixer')({
              overrideBrowserslist: [
                'Android >= 6', 'iOS >= 10', 'ie >= 11', 'Firefox >= 35', 'chrome >= 40','safari >= 6'
              ]
          })
      ]
  },
  }
})

```
## 使用
```js
<template>
  <div>
    <div class="w-200px h-200px bg-gray-400 flex items-center justify-center">vite中使用unocss的写法</div>
    <div class="box">vite中没有使用unocss的写法</div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.box{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  width: 200px;
  height: 200px;
}
</style>
```

## CSS展示
![1](https://raw.githubusercontent.com/UzumakiHan/static-files/master/images/unocss-postcss-webpack-plugin/vite-unocss-1.png)
![2](https://raw.githubusercontent.com/UzumakiHan/static-files/master/images/unocss-postcss-webpack-plugin/vite-unocss-2.png)


## unocss在webpack中使用配置，关于unocss在webpack中使用，自行查阅官网 https://unocss.dev/integrations/webpack
```js
const { defineConfig } = require('@vue/cli-service');
const UnoCSS = require('@unocss/webpack').default
module.exports = defineConfig({
    lintOnSave: false,
    transpileDependencies: true,
    configureWebpack: {
        plugins: [
            UnoCSS({})
        ],
    },
    css: {
        loaderOptions: {
            postcss: {
                postcssOptions: {
                  plugins: [
                    require('autoprefixer')({
                        overrideBrowserslist: [
                          'Android >= 6', 'iOS >= 10', 'ie >= 11', 'Firefox >= 35', 'chrome >= 40','safari >= 6'
                        ]
                    })
                  ],
                },
            },
        }
    },
});

```
```js
<template>
  <div>
    <div class="w-200px h-200px bg-gray-400 flex items-center justify-center">webpack使用unocss的写法</div>
    <div class="box">webpack没有使用unocss的写法</div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.box{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  width: 200px;
  height: 200px;
}
</style>
```
## CSS展示
![1](https://raw.githubusercontent.com/UzumakiHan/static-files/master/images/unocss-postcss-webpack-plugin/webpack-unocss-1.png)
![2](https://raw.githubusercontent.com/UzumakiHan/static-files/master/images/unocss-postcss-webpack-plugin/webpack-unocss-2.png)

## 比较发现，在webpack中，unocss写法的css样式没有添加css前缀，详情可看这个issue  https://github.com/unocss/unocss/issues/386



## 使用unocss-postcss-webpack-plugin插件 webpack中，unocss 添加 postcss 编译 ,配合@unocss/webpack使用，前提已在项目中配置了unocss相关配置，以及项目中的css是单独打包成独立的css文件

## install

```
npm i unocss-postcss-webpack-plugin -D
```

## 使用
```js
//vue.config.js
const { defineConfig } = require('@vue/cli-service');
const UnoCSS = require('@unocss/webpack').default
const unocssPostcssWebpackPlugin=require('unocss-postcss-webpack-plugin')
module.exports = {
     configureWebpack: {
        plugins: [
            UnoCSS({}),
            unocssPostcssWebpackPlugin(), 
        ],
    },
    css:{
        loaderOptions: {
            postcss: {
                postcssOptions: {
                  plugins: [
                    require('autoprefixer')({
                        overrideBrowserslist: [
                          'Android >= 6', 'iOS >= 10', 'ie >= 11', 'Firefox >= 35', 'chrome >= 40','safari >= 6'
                        ]
                    })
                  ],
                },
            },
        },
        extract:true,//这个主要是设置单独打包css，
    }
}
```
## CSS展示
## unocss编写的css样式也加上了css前缀
![3](https://raw.githubusercontent.com/UzumakiHan/static-files/master/images/unocss-postcss-webpack-plugin/webpack-unocss-3.png)



### props

|   Prop    |   Type    |   Default  |   description    |   required    |
|  ----  | ----  |  ----  | ----  |  ----  | 
|   overrideBrowserslist |   Array<string>  |   ['Android >= 6', 'iOS >= 10', 'ie >= 1,'Firefox >= 35', 'chrome >= 40','safari >= 6']   |  browserslist    |   false   |

