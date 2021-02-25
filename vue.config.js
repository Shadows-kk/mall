module.exports = {
  configureWebpack:{
    resolve:{
      alias:{
        // 默认src别名是@
        'assets': "@/assets",
        'common': "@/common",
        'components': "@/components",
        'network': "@/network",
         
      }
    }
  }
}