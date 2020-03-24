import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import elementUI from 'element-ui';

import './style/reset.css';
import 'element-ui/lib/theme-chalk/index.css';

import { Component } from 'vue-property-decorator';

Vue.use(elementUI);
Vue.config.productionTip = false;
Vue.prototype.$eventBus = new Vue();

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

