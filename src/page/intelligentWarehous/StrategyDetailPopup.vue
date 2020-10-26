<template>
  <div class="popup" :style="{display: 'block'}">
    <div class="popup-main menuPopup-edit-main">
      <div class="popup-title">
        <label>策略详情</label>
        <em class="popup-close" @click="$emit('hide')">×</em>
      </div>
      <div class="popup-content">
        <div class="strategy-box">
          <label class="strategy-left">
            <input type="radio" @change="useType=1" :checked="useType===1" disabled>
            自动操作(天)
          </label>
          <div class="strategy-right">
            <div class="right-box">
              <select v-model="runtime.day" disabled>
                <option v-for="i of 24">{{i - 1}}</option>
              </select>点
            </div>
          </div>
        </div>
        <div class="strategy-box">
          <label class="strategy-left">
            <input type="radio" @change="useType=2" :checked="useType===2" disabled>
            自动操作(周)
          </label>
          <div class="strategy-right">
            <div class="week">
              <label v-for="w in weekList">
                <input type="checkbox" :value="w.value" :checked="w.checked" @change="w.checked=!w.checked" disabled>
                {{w.name}}
              </label>
            </div>
            <select v-model="runtime.week" disabled>
              <option v-for="i of 24">{{i - 1}}</option>
            </select>点
          </div>
        </div>
        <div class="strategy-box">
          <label class="strategy-left">
            <input type="radio" @change="useType=3" :checked="useType===3" disabled>
            循环操作
          </label>
          <div class="strategy-right">
            <div class="right-box">
              <select v-model="runtime.circle" disabled>
                <option v-for="i of 24">{{i - 1}}</option>
              </select>点开始&nbsp; &nbsp; &nbsp;
              每隔
              <select v-model="circleInterval" disabled>
                <option v-for="i of 24">{{i - 1}}</option>
              </select>小时操作
            </div>
          </div>
        </div>
        <div class="strategy-box">
          <slot :dataPo="dataPo"/>
        </div>
      </div>
      <div>
        <button class="query" @click="$emit('hide')">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "StrategyDetailPopup",
    props: {
      api: Function,
    },
    data() {
      return {
        dataPo: null,
        useType: 1,
        runtime: {
          day: '0',
          week: '0',
          circle: '0',
        },
        weekList: [
          {name: '周一', value: '1', checked: false},
          {name: '周二', value: '2', checked: false},
          {name: '周三', value: '3', checked: false},
          {name: '周四', value: '4', checked: false},
          {name: '周五', value: '5', checked: false},
          {name: '周六', value: '6', checked: false},
          {name: '周日', value: '7', checked: false},
        ],
        circleInterval: '0',
      }
    },
    methods: {
      getGranaryDetail() {
        layer.load(2);
        this.api()
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              const {type, str1, str2} = ret.data.dataMap;
              this.dataPo = ret.data.dataPo;
              this.useType = +type;
              switch (+type) {
                case 1:
                  this.runtime.day = str1;
                  break;
                case 2:
                  this.runtime.week = str1;
                  this.weekList.forEach(w => {
                    w.checked = str2.indexOf(w.value) !== -1;
                  });
                  break;
                case 3:
                  this.runtime.circle = str1;
                  this.circleInterval = str2;
                  break;
              }
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
    },
    mounted() {
      this.getGranaryDetail();
    }
  }
</script>

<style scoped>
  .menuPopup-edit-main {
    width: 60rem;
    height: 42rem;
  }

  .popup-content {
    height: 30rem;
    overflow: auto;
  }
</style>
