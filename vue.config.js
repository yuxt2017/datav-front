module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  outputDir: "dist",
  assetsDir: "assets",
  lintOnSave: false,
  runtimeCompiler: false,
  productionSourceMap: false,
  css: {
    requireModuleExtension: true,
    loaderOptions: {
      scss: {
        prependData: `@import "~@/style/variables.scss";`
      }
    }
  },
  devServer: {
    disableHostCheck: true,
  },
  pages: {
    index: {
      entry: "src/main.ts",
      template: "public/index.html",
      filename: "index.html",
      title: "datav"
    },
  },
};