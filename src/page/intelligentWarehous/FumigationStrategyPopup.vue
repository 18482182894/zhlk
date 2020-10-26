<template>
  <div class="popup" :style="{display: 'block'}">
    <div class="popup-main menuPopup-edit-main">
      <div class="popup-title">
        <label>创建策略</label>
        <em class="popup-close" @click="$emit('hide')">×</em>
      </div>
      <div class="popup-content">
        <div class="strategy-box">
          <label class="strategy-left">
            <input type="radio" @change="useType=1" :checked="useType===1">
            自动操作(天)
          </label>
          <div class="strategy-right">
            <div class="right-box">
              <select v-model="runtime.day">
                <option v-for="i of 24">{{i - 1}}</option>
              </select>点
            </div>
          </div>
        </div>
        <div class="strategy-box">
          <label class="strategy-left">
            <input type="radio" @change="useType=2" :checked="useType===2">
            自动操作(周)
          </label>
          <div class="strategy-right">
            <div class="week">
              <label v-for="w in weekList">
                <input type="checkbox" :value="w.value" :checked="w.checked" @change="w.checked=!w.checked">
                {{w.name}}
              </label>
            </div>
            <select v-model="runtime.week">
              <option v-for="i of 24">{{i - 1}}</option>
            </select>点
          </div>
        </div>
        <div class="strategy-box">
          <label class="strategy-left">
            <input type="radio" @change="useType=3" :checked="useType===3">
            循环操作
          </label>
          <div class="strategy-right">
            <div class="right-box">
              <select v-model="runtime.circle">
                <option v-for="i of 24">{{i - 1}}</option>
              </select>点开始&nbsp; &nbsp; &nbsp;
              每隔
              <select v-model="circleInterval">
                <option v-for="i of 24">{{i - 1}}</option>
              </select>小时操作
            </div>
          </div>
        </div>
        <div class="extra">
          <div class="extra-label">氧气含量：</div>
          <div class="extra-area">
            <select class="select-style" v-model="conditionData.ccO2Judge">
              <option :value="condition" v-for="condition in conditionList">{{condition}}</option>
            </select>
            <input class="input-text" type="text"
                   v-model="conditionData.ccO2Content"/>
          </div>
        </div>
        <div class="extra">
          <div class="extra-label">氮气含量：</div>
          <div class="extra-area">
            <select class="select-style" v-model="conditionData.ccN2Judge">
              <option :value="condition" v-for="condition in conditionList">{{condition}}</option>
            </select>
            <input class="input-text" type="text" v-model="conditionData.ccN2Content"/>
          </div>
        </div>
        <div class="extra">
          <div class="extra-label">二氧化碳含量：</div>
          <div class="extra-area">
            <select class="select-style" v-model="conditionData.ccCo2Judge">
              <option :value="condition" v-for="condition in conditionList">{{condition}}</option>
            </select>
            <input class="input-text" type="text" v-model="conditionData.ccCo2Content"/>
          </div>
        </div>
        <div class="extra">
          <div class="extra-label">磷化氢含量：</div>
          <div class="extra-area">
            <select class="select-style" v-model="conditionData.ccPh3Judge">
              <option :value="condition" v-for="condition in conditionList">{{condition}}</option>
            </select>
            <input class="input-text" type="text" v-model="conditionData.ccPh3Content"/>
          </div>
        </div>
      </div>
      <div class="strategy-bottom" v-if="isAdd">
        <div>
          <div class="btn btn-blank" @click="granaryCheck('all')">
            <label>全选</label>
          </div>
          <div class="btn btn-blank" @click="granaryCheck('reverse')">
            <label>反选</label>
          </div>
          <div class="btn btn-blank" @click="granaryCheck('empty')">
            <label>全部取消</label>
          </div>
        </div>
        <div class="barn-list">
          <div class="storehouse" v-for="s in storehouseList">
            <div class="storehouse-name">{{s.storehouseName}}:</div>
            <div class="granary-list">
              <label v-for="g in s.granaryList">
                <input type="checkbox" :checked="g.checked" @change="g.checked=!g.checked">
                {{g.warehouseName}}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button class="query" @click="submitEvent();">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {storehouse, granary} from "@/api/systemManage/dropDown";
  import {fetchFumigationStrategy} from '@/api/intelligentWarehous/strategy';

  export default {
    name: "AtmosphereStrategyPopup",
    props: {
      isAdd: { // 是否是新增，新增没有廒间列表
        type: Boolean,
        default: true,
      },
      warehouseGbCode: String,
    },
    data() {
      return {
        useType: 1,
        conditionList: ['不限制', '>', '<', '≥', '≤', '='],
        conditionData: {
          ccO2Judge: '不限制',
          ccO2Content: '',
          ccN2Judge: '不限制',
          ccN2Content: '',
          ccCo2Judge: '不限制',
          ccCo2Content: '',
          ccPh3Judge: '不限制',
          ccPh3Content: '',
        },
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
        storehouseList: []
      }
    },
    methods: {
      granaryCheck(type) {
        this.storehouseList.forEach(s => {
          s.granaryList.forEach(g => {
            switch (type) {
              case 'all':
                g.checked = true;
                break;
              case 'empty':
                g.checked = false;
                break;
              case 'reverse':
                g.checked = !g.checked;
                break;
            }
          })
        })
      },
      submitEvent() {
        const data = {
          useType: this.useType,
          acquisitionType: this.acquisitionType,
        };
        switch (this.useType) {
          case 1:
            data.str1 = this.runtime.day;
            data.str2 = '无';
            break;
          case 2:
            data.str1 = this.runtime.week;
            data.str2 = this.weekList.filter(w => w.checked).map(w => w.value).join(',');
            if (!data.str2.length) {
              return layer.alert('请选择星期', {closeBtn: 0});
            }
            break;
          case 3:
            data.str1 = this.runtime.circle;
            data.str2 = this.circleInterval;
            break;
        }
        if (this.checkThreshold(this.conditionData.ccO2Judge, this.conditionData.ccO2Content, '请填写氧气含量')) {
          data.ccO2Judge = this.conditionData.ccO2Judge;
          if (data.ccO2Judge !== '不限制') {
            data.ccO2Content = this.conditionData.ccO2Content;
          }else {
            data.ccO2Content = '';
          }
        } else {
          return;
        }
        if (this.checkThreshold(this.conditionData.ccN2Judge, this.conditionData.ccN2Content, '请填写氮气含量')) {
          data.ccN2Judge = this.conditionData.ccN2Judge;
          if (data.ccN2Judge !== '不限制') {
            data.ccN2Content = this.conditionData.ccN2Content;
          }else {
            data.ccN2Content = '';
          }
        } else {
          return;
        }
        if (this.checkThreshold(this.conditionData.ccCo2Judge, this.conditionData.ccCo2Content, '请填写二氧化碳含量')) {
          data.ccCo2Judge = this.conditionData.ccCo2Judge;
          if (data.ccCo2Judge !== '不限制') {
            data.ccCo2Content = this.conditionData.ccCo2Content;
          }else {
            data.ccCo2Content = '';
          }
        } else {
          return;
        }
        if (this.checkThreshold(this.conditionData.ccPh3Judge, this.conditionData.ccPh3Content, '请填写磷化氢含量')) {
          data.ccPh3Judge = this.conditionData.ccPh3Judge;
          if (data.ccPh3Judge !== '不限制') {
            data.ccPh3Content = this.conditionData.ccPh3Content;
          }else {
            data.ccPh3Content = '';
          }
        } else {
          return;
        }
        if (this.isAdd) {
          data.warehouseJson = [];
          this.storehouseList.forEach(s => {
            s.granaryList.forEach(g => {
              if (g.checked) {
                data.warehouseJson.push({
                  storehouseGbCode: s.storehouseGbCode,
                  storehouseName: s.storehouseName,
                  warehouseGbCode: g.warehouseGbCode,
                  warehouseName: g.warehouseName,
                })
              }
            })
          });
          if (!data.warehouseJson.length) {
            return layer.alert('请选择厫间', {closeBtn: 0});
          }
          data.warehouseJson = JSON.stringify(data.warehouseJson);
        } else {
          data.warehouseGbCode = this.warehouseGbCode;
        }
        this.$emit('submit', data);
      },
      getStorehouse() { // 获取仓房列表
        layer.load(2);
        storehouse('')
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              this.storehouseList = (ret.data.dataList).map(s => {
                s.granaryList = [];
                this.getGranary(s);
                return s;
              });
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getGranary(s) { // 获取廒间列表
        granary(s.storehouseGbCode)
          .then((ret) => {
            if (ret.code == 200) {
              s.granaryList = ret.data.dataList.map(g => ({...g, checked: false}));
            } else {
              if (ret.code == "500" && ret.data == "查询错误，没有数据") {
                s.granaryList = [];
              } else {
                layer.alert(ret.data, {closeBtn: 0});
              }
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getGranaryDetail() {
        layer.load(2);
        fetchFumigationStrategy({warehouseGbCode: this.warehouseGbCode})
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              const {dataPo, dataMap} = ret.data;
              const {type, str1, str2} = dataMap;
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
              this.conditionData.ccO2Judge = dataPo.ccO2Judge;
              if (dataPo.ccO2Judge !== '不限制') {
                this.conditionData.ccO2Content = dataPo.ccO2Content;
              }
              this.conditionData.ccN2Judge = dataPo.ccN2Judge;
              if (dataPo.ccN2Judge !== '不限制') {
                this.conditionData.ccN2Content = dataPo.ccN2Content;
              }
              this.conditionData.ccCo2Judge = dataPo.ccCo2Judge;
              if (dataPo.ccCo2Judge !== '不限制') {
                this.conditionData.ccCo2Content = dataPo.ccCo2Content;
              }
              this.conditionData.ccPh3Judge = dataPo.ccPh3Judge;
              if (dataPo.ccPh3Judge !== '不限制') {
                this.conditionData.ccPh3Content = dataPo.ccPh3Content;
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
      checkThreshold(judge, value, msg) {
        if (judge !== '不限制' && value === '') {
          layer.alert(msg, {closeBtn: 0});
          return false;
        }
        return true;
      },
    },
    mounted() {
      if (this.isAdd) {
        this.getStorehouse();
      } else {
        this.getGranaryDetail();
      }
    }
  }
</script>

<style scoped>
  .menuPopup-edit-main {
    width: 60rem;
    height: 44.5rem;
    overflow: auto;
  }

  .storehouse {
    display: flex;
    padding: 5px 0;
    border-bottom: 1px solid #f2f2f2;
  }

  .storehouse-name {
    width: 5em;
    margin-right: 1em;
    font-weight: bold;
  }

  .extra {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  .extra-label {
    width: 12em;
  }
</style>
