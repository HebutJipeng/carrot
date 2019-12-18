import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./utils/axios";
import VueLazyload from 'vue-lazyload'

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);
Vue.use(VueLazyload);

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
