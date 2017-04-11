// import miShop from './customized_modules/shopEvent.js'
import App from './src/index.vue'

if (weex.config.platform == 'Web') {
  if(window && !window.global) { // Stream.fetch jsonp调用失败，原因是找不到global
    window.global = window;
  }
}
App.el = '#root'
export default new Vue(App);
