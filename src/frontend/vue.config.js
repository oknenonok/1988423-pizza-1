const GenerateRoutesPlugin = require("./src/router/_generateRoutes.js");
const GenerateModulesPlugin = require("./src/store/_generateModules.js");
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  css: {
    loaderOptions: {
      sass: {
        additionalData:
          '@import "@/assets/scss/ds-system/ds.scss";\n@import "@/assets/scss/mixins/mixins.scss";',
      },
    },
  },

  devServer: {
    proxy: {
      "^/api": {
        target: "http://backend:3000/",
        changeOrigin: false,
        pathRewrite: { "^/api/": "/" },
      },
      "^/public": {
        target: "http://backend:3000/",
        changeOrigin: false,
        pathRewrite: { "^/public/": "/public/" },
      },
      "/explorer": {
        target: "http://backend:3000/",
        changeOrigin: false,
        proxyTimeout: 1000 * 60 * 10,
        pathRewrite: { "/docs/explorer": "/explorer" },
      },
    },
  },

  configureWebpack: {
    plugins: [new GenerateRoutesPlugin(), new GenerateModulesPlugin()],
  },
});
