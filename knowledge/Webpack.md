还有其他的库（Rollup）也非常的不错

Version-check.js. 是为了检查即将构建的bundle版本是否完全匹配。

## 新的重点：code splitting and tree shaking

tree shaking
Tree shaking是有rollup提出来的，webpack2也加入了这一概念，如下：
    其实质：找出使用的代码，区别于其他的排除不使用代码
    过程：基于 ES6 的静态引用，tree shaking 通过扫描所有 ES6 的 export，找出被 import 的内容并添加到最终代码中。 webpack 的实现是把所有 import 标记为有使用/无使用两种，在后续压缩时进行区别处理。因为就如比喻所说，在放入烤箱(压缩混淆)前先剔除蛋壳(无使用的 import)，只放入有用的蛋白蛋黄(有使用的 import)

    过程就是webpack对代码进行标记，标记使用或者不适用的，然后通过uglifyjsplugin把没有使用的代码清除掉，完成tree shaking。但是对于类class只做顶级的处理，只要用过此类，其中的方法有用到的没有用到的统统都打进代码里面。
    副作用：某个方法或者文件执行了之后，还会对全局其他内容产生影响的代码
    为了解决副作用webpack3启用的插件webpakc.optimize.ModuleConcatenateModulePlugin()这个插件，但是在webpack4这个直接默认为production 的配置，在4中可以在package.json中写到sideEffects: false,表示没有副作用
    避免副作用：使用es6模块语法编写代码，工具类函数尽量以单独的形势输出，声明sideEffects

## Code splitting
代码分割，分割成按需加载的块（chunks）
commonJS
    使用require.ensure(dependencies, callback)
        dependencies=[‘module-a’,’module-b’]
        callback参数是require

作用：第三方库打包，生产环境可以有效缓存这一内容，因为其基本不改变（vendor.js）
            按需加载，例如路由的懒加载等等
           单独打包逻辑复用模块


+ resolve的作用
该功能是设置模块如何被解析的。
Resolve.alias 别名解析 用于import 或者require更方便
    例如alias: { xyz: ’src/utils’}. 实用import {load} from ‘xyz/common.js'
    


+ externals的作用
     外部扩展，配置选项提供了【从输出端排除依赖】，由用户提供环境， 可以是string, array, object等，常用的是object 例如下面的
+ Externals: { jquery: jQuery, react: React, react-dom: ReactDOM}


+ Devtool的作用
source map：能够提供将压缩文件恢复到原文件原始位置的印社代码的方式。
该配置是控制如何生成source map，也就是方便开发者定义bug的位置
开发环境：eval-source-map. Cheap-module-eval-source-map
生产环境：none 或者source-map(会生成一个文件)

+ 配置loader
exclude  排除
exclude:/node_modules/
因为会增加编译的时间

+ 入口文件：entry：
     单一入口文件  可以是字符串 ‘./app.js’  或者是一个数组  ［’   ’，’   ’］或者 ｛ ｝
     多个入口文件
     entry：{
         pageA:’./pageA.js’,
          pageB: ‘./pageB'
     }
+ 出口文件：output:{
     filename:’——',
     path:’---'
}    

+ 2.module：{
     loaders: [
          {
               test:匹配文件用的   ／\.ejs$／ 正则表达式
               include: 匹配目录   字符串或者数组   只包含的文件
               exclude: 排除什么用的  不需要编译的
          },
     ],
    
}
 resolve: 影响对模块的解析，一个对象
  {
     extensions:[ ]    自动补全后缀识别    默认值[ ‘’,'web pack.js’, ‘.web.js’, ‘.js']
  }
:意义在于解析文件的时候用，例如 require(‘./cup')
## babel - loader
```
    例如解析 . jsx 和es6 react  文件
    配置：
    module : {
        test : / js[x]?$ / ,
        exclude : / modules /,
        loader  : ‘ babel-loader ? presets[ ] = es2015 & presets[ ] = react’   也可以换成下面的写法    
    }
    loader : ‘babel’
    query : { presets : [ “ es2015 “ , “ react “ ] }
```

## 好用的插件：  webpack.config.js  中配置
+ 1）UglifyJs Plugin   将代码量变小再输出
var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
+ 2) html webpack plugin  and open browser webpack plugin
前者创建一个html文件 ，可以定义文件名称，路径，模版等等
后者帮助我们打开浏览器，省去人工输入localhost : 8000
```
plugins: [
    new HtmlwebpackPlugin({
      title: 'Webpack-demos',
      filename: ‘index.html’,template: __dirname + ‘/app/index.html'
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    })
  ]
```
+ 3）环境标志  environment flags
```
可以帮助我们定义一些变量  例如:  __DEV__
var webpack = require('webpack');

var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [devFlagPlugin]
};
# Linux & Mac
$ env DEBUG=true webpack-dev-server

# Windows
$ set DEBUG=true
$ webpack-dev-server
这些就是环境变量   当在命令行输入上述的时候，文件这样写
document.write('<h1>Hello World</h1>');

if (__DEV__) {
  document.write(new Date());
}
就会走if中的语句了
```

+ 4）code splitting  可以实现按需加载   非常实用   终点
应用require . ensure ( dependencies , callback )
```
另外一种方法：code splitting with bundle-loader 
var load = require('bundle-loader!./a.js');

// To wait until a.js is available (and get the exports)
//  you need to async wait for it.
load(function(file) {
  document.open();
  document.write('<h1>' + file + '</h1>');
  document.close();
});
```
+ 5）common chunk  公共的模块
```
    当有多个脚本的拥有共同的模块的时候，可以将它提取出来，打包一个新的文件，利用webpack插件CommonsChunkPlugin
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
module.exports = {
  entry: {
    bundle1: './main1.jsx',
    bundle2: './main2.jsx'
  },
  output: {
    filename: '[name].js'
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
    ]
  },
  plugins: [
    new CommonsChunkPlugin('init.js')
  ]
}
上面的两个入口文件有公共的部分就会进入init 这个js文件中
写法可以更改，
```

+ 6）exposing global variable   暴露全局的变量
```
例如我们又一个data.js  文件，里面是json数据，利用externals
webpack.config.js     与entry 同级别
 externals: {
    'data': 'data'
  }
这样在所有的文件中都可以引用
var data = require ( ‘ data ‘ )   这是一个全局的，不可以更改


3.webpack  编译的时候可以查看进度
webpack --progress --colors


4.node 调试webpack 的时候可以使用下面的命令
node bundle.js    前提是里面有console.log  编译后的文件

```
## css modules   用于web pack css打包中

+ 1）webpack.config.js中loader配置如下：  因为有hash  所以是独一无二的 ，也就是局部作用
test: /\.css$/,
 loader: "style-loader!css-loader?modules”   // 在css－loader后面增加了一个查询参数modules，表示打开CSS Modules

运行时，css显示的是hash值  ._3XfJ4TQxu9jRk63SqfN6h  类似这样的   这个是modules的功能

 + 2）全局css
 ```
.title { color : red  }

: globle ( .title ) { color : blue } use     className = " title “   ＊＊＊＊＊＊不会被解析成hash值
: local ( .title ) { color : red }    use      className = { styles . title }   import styles from “ ./style.css "
```
+ 3）改变hash值的用法
```
test: /\.css$/,
      loader: "style-loader!css-loader?modules&localIdentName=[name] . [local] . [hash:base64:3]”
name : component  ‘ name
local : className
hash : 3位hash值
```
+ 4）引用css   （也就是继承name的样式）
```
.name { color : red }
.title {   composes : name        background-color : blue }     use     className = { styles . title }     
结果是拥有了上面两种样式，并且都被解析成hash值
```

+ 5） 引入其他css文件，与上面的相似
只是在 composes :  name from “ ./another.css “   二者也都会被解析成hash    class上 是这样的   class＝” hash..   hash…”

+ 6）导出变量和引入变量
```
所以需要安装
$ npm install --save postcss-loader postcss-modules-values
Add postcss-loader into webpack.config.js.
var values = require('postcss-modules-values');

module.exports = {
  entry: __dirname + '/index.js',
  output: {
    publicPath: '/',
    filename: './bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader?modules!postcss-loader"
      },
    ]
  },
  postcss: [
    values
  ]
};
开始自定义变量的名称：
@value blue: #07ccf77  等等
import 文件－－－例如
@value colors: "./colors.css";
@value blue, red, green from colors;
.title { color : blue }   就等于引入的变量，而不是真正的blue的颜色     
                                                                                                                                －－－－－－－－－－－－－－》可参考阮一峰日志

## new webpack.optimize.OccurenceOrderPlugin()
是为组件和模块分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID，通过分析ID，可以建议降低总文件的大小
```

+ 2、代码分割
    对于一个单页应用项目来说，有分为业务代码和第三方代码，业务代码会频繁改动，而第三方代码一般来讲变动的次数较少，如果每次修改业务代码都需要用户将整个js文件都重新下载一遍，对于加载性能来讲是不可取的，所以一般而言我们会将代码分为业务代码和第三方代码分别进行打包，虽然多了一个请求的文件，增加了一些网络开销，但是相比于浏览器能将文件进行缓存而言，这些开销是微不足道的。
这个时候就需要引入CommonsChunkPlugin 插件，这个插件相当的复杂

+ webpack分离的正确方法
1、bundle splitting
就是把一个大的文件拆分成不同大小的小模块，这样有些没有改动的地方就可以不用在下载了，达到浏览器缓存的效果
2、code splitting
其实就是懒加载的原理，因为有的页面访问量不足20%，所以在需要的时候进行引入就可以了
其余的就是本身代码的逻辑了！例如loading后在加载组件，可以使用import().then(module => {})