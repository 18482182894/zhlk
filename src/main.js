// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import './filters'


import VDistpicker from 'v-distpicker'

Vue.component('v-distpicker', VDistpicker)

import echarts from 'echarts' //引入echarts

Vue.prototype.$echarts = echarts //引入组件

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// Vue.directive('select2', {
//     inserted: function (el, binding, vnode) {
//         let options = binding.value || {};

//         $(el).select2(options).on("select2:select", (e) => {
//             // v-model looks for
//             //  - an event named "change"
//             //  - a value with property path "$event.target.value"
//             el.dispatchEvent(new Event('change', { target: e.target })); //说好的双向绑定，竟然不安套路
//             console.log("fire change in insert");
//         });
//     },
//     update: function (el, binding, vnode) {
//         for (var i = 0; i < vnode.data.directives.length; i++) {
//             if (vnode.data.directives[i].name == "model") {
//                 $(el).val(vnode.data.directives[i].value);
//                 console.log("new value in update:"+vnode.data.directives[i].value);
//             }
//         }
//         $(el).trigger("change");
//         console.log("fire change in update");
//     }
// });
