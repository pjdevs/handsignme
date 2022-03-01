const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/app',
  devServer: {
    proxy: {
      '^(?!/(app|ws))': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  },
  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    }
  }
})
