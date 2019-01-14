import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//  reset CSS
import "normalize.css/normalize.css";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/iconfont/iconfont.css" // 简化处理时候 只用element-UI 的图标库，项目大的时候 改成vue-awesome
import '@/styles/index.scss' // global css
import './permisssion' // permission control

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
