import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { $request } from "./util/net";

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.prototype.$request = $request;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
