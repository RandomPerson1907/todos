require('./bootstrap');
import router from "./router";

//Styles
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

//Plugins
import Clipboard from 'v-clipboard';
import VueRouter from "vue-router";
import BootstrapVue from 'bootstrap-vue';
import VModal from 'vue-js-modal'

//Components
import SearchTaskComponent from "./components/SearchTaskComponent";
import MenuComponent from "./components/MenuComponent";

window.Vue = require('vue');
Vue.use(VueRouter);
Vue.use(Clipboard);
Vue.use(BootstrapVue);
Vue.use(VModal);

import store from "./store";

const app = new Vue({
    el: '#app',
    components: {
        SearchTaskComponent,
        MenuComponent,
    },
    router,
    store
});
