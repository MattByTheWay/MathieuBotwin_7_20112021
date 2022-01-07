//import des dépendances
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

//url de l'api
Vue.prototype.$apiUrl = 'http://localhost:3000/api';
//Token et USERS
if (localStorage.user != undefined) {
  Vue.prototype.$token = JSON.parse(localStorage.user).token;
  Vue.prototype.$user = JSON.parse(localStorage.user);
}
//Instance Vue montée sur l'app
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
