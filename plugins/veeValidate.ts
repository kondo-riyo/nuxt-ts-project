import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
// import * as rules from 'vee-validate/dist/rules'
import {
  required, max, email,
} from 'vee-validate/dist/rules';
// 全てのルールを利用
// Object.keys(rules).forEach((rule) => {
//   extend(rule, rules[rule])
// })

extend('required', { ...required });
extend('max', { ...max });
extend('email', { ...email });


Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

//----------------------------------
// import Vue from 'vue';
// import {
//   ValidationProvider, configure, localize, extend,
// } from 'vee-validate';
// import ja from 'vee-validate/dist/locale/ja.json';
// import {
//   required, max, email,
// } from 'vee-validate/dist/rules';

// Vue.component('ValidationProvider', ValidationProvider);

// // 共通で変更したいoptionがあれば
// configure({
//   bails: false,
// });

// // // 必要なruleを追加していく
// extend('required', { ...required });
// extend('max', { ...max });
// extend('email', { ...email });

// // 一括でもrulesをextendできる
// // import * as rules from 'vee-validate/dist/rules';
// // for (let rule in rules) {
// //   extend(rule, rules[rule]);
// // }

// localize('ja', ja);