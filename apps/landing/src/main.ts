/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import Vue, { VNode } from 'vue';

import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';

Vue.config.productionTip = false;
new Vue({
  router,
  vuetify,
  render: (h): VNode => h(App),
}).$mount('#app');
