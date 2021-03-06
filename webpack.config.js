const path = require('path');
const webpack = require("webpack");
//自己编写的第一个插件
const MyFisrtWbapckPlugin = require('./webpack-plugins/MyFisrtWbapckPlugin')
const EndWebpackPlugin = require('./webpack-plugins/EndWebpackPlugin')
const MyFirstBabelPlugin = require('./babel-plugins/plugin')

module.exports = {
  entry: {
  //   //index: './index.js',
  //   // babelcover:"./test/index2.js"
  //   // babelcoverJoin:"./test/index2.js"
    babelcoverJoin2:"./index2.js" //babel-plguin 生效了 先用babel-plguin 转js内容 >>>>然后在  webpack loader 在转换内容
  },

  // entry: {
  //     babelcoverJoinPlguin: ['./babel-plugins/plugin','./index2.js'] //这种方式 babel-plugin 中的console.log("Called!"); 被耦合嵌入进入打包代码     
  // },

  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].bundle.js"
  },

  //注意，resolve 配置会影响 normal 和 context 这两个 resolver，而 resolveLoader 则用于修改 loader resolver。
  resolveLoader: {
        // 单个 告诉 webpack 该去那个目录下找 loader 模块 本地模块
         // modules: ['node_modules', path.resolve(__dirname, 'loaders-way1')]
        
        //多个loader [] 从数组最右边开始处理
        modules: ['node_modules', path.resolve(__dirname, 'loaders')]
  },
  module:{
    rules:[
      //这个是一个loader 处理 无配置

      // {
      //   test:/\.js/,
      //   use:'my-loader'
      // }


      //这个是一个loader 处理 有配置 却别上面配置 格式
      // {
      //   test:/\.js/,
      //   use:{
      //     loader:"my-loader",
      //     options:{
      //       name:"react test "
      //     }
      //   }
      // }


      //这个是loader chain 转变顺序 jackieli-vue-world  注意 use 中的顺序是反的
      
      //单个   
      // {
      //   test:/\.js/,
      //   use:['vueToWorld','jackieliToVue']
      // }
      
      //多个数组  带参数
      {
        test:/\.js/,
        use:[

            {
                  loader:"vueToWorld",
                  options:{
                    name:"world"
                  }
            },
            {
                  loader:"jackieliToVue",
                  options:{
                    name:"vue"
                  }
            }
        ]
      },
       //多个数组  带参数 默认值options
      //  {
      //   test:/\.js/,
      //   use:[
      //       {
      //             loader:"vueToWorld",
      //             options:{
      //               name:"world"
      //             }
      //       },
      //       {
      //             loader:"jackieliToVue",
      //       }
      //   ]
      // },

    ],
  },
   
  //自己的插件 
  plugins:[
    new webpack.BannerPlugin('@author: jackieli\n@website: http://issue.lilidong.cn'),
    //use
    new MyFisrtWbapckPlugin(),
    // 在初始化 EndWebpackPlugin 时传入了两个参数，分别是在成功时的回调函数和失败时的回调函数；
    // new EndWebpackPlugin((stats) => {
    //   // Webpack 构建成功，并且文件输出了后会执行到这里，在这里可以做发布文件操作
    //   console.log('构建成功，并且文件输出了后会执行到这里，在这里可以做发布文件操作',stats.compilation.assets)
    // }, (err) => {
    //   // Webpack 构建失败，err 是导致错误的原因
    //   console.error(err);        
    // })
  ]
};

/* +----------------------------------------------------------------------
// | West Gate Internet
// +----------------------------------------------------------------------
// | ©2018 All Rights Reserved.版权所有.West Gate Internet 
// +----------------------------------------------------------------------
// | 博客ssr版本:https://textnuxt.lilidong.cn/
// | 博客spa版本:http://issue.lilidong.cn/ 
// +----------------------------------------------------------------------
// | 开源协议 ( https://mit-license.org )
// +----------------------------------------------------------------------
// | github开源项目：https://github.com/jackieli123723
// +--------------------------------------------------------------------*/