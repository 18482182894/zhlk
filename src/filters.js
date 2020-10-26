import Vue from 'vue';

Vue.filter('medicineDosageFormFormat', function (medicineDosageForm) {
  return {
    '1': '防护剂种类',
    '2': '熏蒸剂种类',
    '3': '空仓、器材杀虫剂种类',
  }[medicineDosageForm] || ''
});
