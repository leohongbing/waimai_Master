/*入口*/
import Vue from 'vue'
import { Button } from 'mint-ui'
import App from './App'
import router from './router' /*引入路由器*/
import store from './store'
import './mock/mockServer' //引入Mock执行代码
import VueLazyload from 'vue-lazyload'//图片懒加载
import loading from './common/images/loading.gif'
import './filters'
Vue.component(Button.name,Button)
Vue.use(VueLazyload, {
  loading
})
new Vue({
  el:'#app',
  render: h=>h(App),
  router /*s使用路由*/,
  store //使用vuex
})
