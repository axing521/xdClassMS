/***
 * @creater:ACBash
 * @create_time:22-11-22 18:32:36
 * @last_modify:ACBash
 * @modify_time:23-5-30 13:7:46
 * @line_count:25
 **/

const { defineConfig } = require('@vue/cli-service');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const Icons = require('unplugin-icons/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,   //关闭ESlint校验
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      Icons({
        resolvers: [ElementPlusResolver()],
      }),
      new MiniCssExtractPlugin(),
    ],
  },
});