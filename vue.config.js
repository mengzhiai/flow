/*
 * @Author: your name
 * @Date: 2019-11-22 09:19:45
 * @LastEditTime: 2019-11-28 16:20:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \client-system\vue.config.js
 */
/* const path = require("path");
module.exports = {
  //基本url
  publicPath: './',
  //打包的目录
  outputDir: 'dist',
  //静态资源放置目录
  assetsDir: 'assets',
  //HTML输出路径
  indexPath: 'index.html',
  //eslint保存时代码检查
  lintOnSave: false,
  //文件名使用哈希
  filenameHashing: true,
  // 是否使用包含运行时编译器的 Vue构建版本
  runtimeCompiler: true,
  //生产环境是否生成 SourceMap
  productionSourceMap: false,
  devServer: {
    //启动时自动打开浏览器
    open: false,
    //热加载
    hotOnly: false,
    //url/id
    host: '0.0.0.0',
    //端口号
    port: 8080,
    //是否启动https
    https: false,
    hotOnly: false,
    //设置代理
    proxy: null,
    before: app => { }
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
} */









const path = require("path");


module.exports = {
    publicPath: './', // 默认'/'，部署应用包时的基本 URL
    outputDir: 'dist', // 'dist', 生产环境构建文件的目录
    assetsDir: '', // 相对于outputDir的静态资源(js、css、img、fonts)目录
    lintOnSave: false,
    runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
    productionSourceMap: false, // 生产环境的 source map
    devServer: {
        // overlay: {
        //   warnings: true,
        //   errors: true
        // },
        open: true,
        host: 'localhost',
        port: 9090,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: "http://100.64.2.54:9090",
                changeOrigin: true,
                ws: true, // proxy websockets
                pathRewrite: { //重写路径
                    "^/api": ''
                }
            }
        }
    }
};