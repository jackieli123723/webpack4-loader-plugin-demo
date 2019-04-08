class MyFisrtWbapckPlugin {
   
   apply(compiler){
   	//way1 ok
   //    compiler.hooks.done.tapAsync("MyFisrtWbapckPlugin", (stats, cb) => {
	  //    const res = [];
		 // for(let assetName in stats.compilation.assets) {
		 //     res.push(assetName);
		 // }
		 // console.log(res.join("\n"));
		 // // 处理完毕后执行 callback 以通知 Webpack 
   //       // 如果不执行 callback，运行流程将会一直卡在这不往下执行
		 // cb();
	  // })

	    //way2 和上面结果一样不？ compilation.assets 空的 stats compilation Version: webpack 4.27.1
	    //way2 和上面结果一样不？ compilation.compilation.assets 有值 stats compilation Version: webpack 4.12.0
	    //way2 和上面结果一样不？ compilation.compilation.assets 有值 stats compilation Version: webpack 4.29.6
	  //  compiler.hooks.done.tapAsync("MyFisrtWbapckPlugin", (compilation, cb) => {
	  //    const res = [];
		 // for(let assetName in compilation.compilation.assets) {
		 //     res.push(assetName);
		 // }
		 // console.log(res.join("\n"));
		 
		 // cb();
	  // })
       

       //结论  compiler.hooks.emit.tapAsync 生成资源到 output 目录之前钩子 参数：compilation 就可以用compilation.assets 访问到资源
       //用 compiler.hooks.done.tapAsync  编译(compilation)完成钩子 参数：stats 用compilation.assets 访问不到资源 这是个异步必须 compilation.compilation.assets 这样用才能访问到资源
       //参照上面的way1 
       compiler.hooks.done.tapAsync("MyFisrtWbapckPlugin", (compilation, cb) => {
	     const res = [11];
		 for(let assetName in compilation.compilation.assets) {
		     res.push(assetName);
		 }
		 console.log(res.join("\n"));
		 
		 cb();
	  })

       compiler.hooks.emit.tapAsync("MyFisrtWbapckPlugin", (compilation, cb) => {
	     const res = [22];
		 for(let assetName in compilation.assets) {
		     res.push(assetName);
		 }
		 console.log(res.join("\n"));
		 
		 cb();
	  })

	  compiler.hooks.emit.tapAsync('MyFisrtWbapckPlugin', (compilation, callback) => {
      // Create a header string for the generated file:
      var filelist = 'In this build:\n\n';

      // Loop through all compiled assets,
      // adding a new line item for each filename.
      for (var filename in compilation.assets) {
        filelist += '- ' + filename + '\n';
      }

      // Insert this list into the webpack build as a new file asset:
      compilation.assets['filelist'+ (+new Date()) +'.md'] = {
        source: function() {
          return filelist;
        },
        size: function() {
          return filelist.length;
        }
      };

      callback();
    });
 

   }
}

module.exports = MyFisrtWbapckPlugin;



