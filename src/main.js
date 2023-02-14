import Vue from 'vue';
import Demo from './test/Demo.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Demo),
}).$mount('#app');
