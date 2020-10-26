<template>
  <div class="device-list">
    <div class="device-item device-label">
      <div class="label-text">编号</div>
      <div class="label-text">状态</div>
      <div class="label-text">开关</div>
      <div class="label-text">类型</div>
    </div>
    <div class="device-item" v-for="(item, i) in deviceList">
      <div class="device-item-num">{{i + 1}}号</div>
      <div class="device-item-status">{{item.controllerStatus == '1' ? '远程控制' : '现场控制'}}</div>
      <div class="device-item-switch" v-if="item.controllerStatus == '1' && item.switchTime == '0'">
        <!-- <img v-if="!item.remote" src="../../../static/images/on-off-un.png"/> -->
        <!-- <img @click="item.onOffSwitch='0'" v-else-if="item.onOffSwitch=='1'" src="../../../static/images/on-off-on.png"/> -->
        <img @click="Switch(item)" v-if="item.onOffSwitch=='1'" src="../../../static/images/on-off-on.png"/>
        <img @click="Switch(item)" v-if="item.onOffSwitch=='2'" src="../../../static/images/on-off-off.png"/>
        <!-- <img @click="item.onOffSwitch='1'" v-else src="../../../static/images/on-off-off.png"/> -->
      </div>
      <div class="device-item-switch" v-else>
        <img v-if="item.onOffSwitch=='1'" @click="switchBtn(item)" src="../../../static/images/on-off-on.png"/>
        <span class="countDown-on" v-if="item.onOffSwitch=='2' && item.switchTime != '0'">{{item.switchTime}}s</span>
        <img v-if="item.onOffSwitch=='2'" @click="switchBtn(item)" src="../../../static/images/on-off-off.png"/>
        <span class="countDown-off" v-if="item.onOffSwitch=='1' && item.switchTime != '0'">{{item.switchTime}}s</span>
      </div>
      <!-- <div class="device-item-control">
        <template v-if="item.deviceName==='轴流风机'">
          <div class="control-radio" @click="item.type='0'" :class="{'control-radio-checked': item.type == '0'}">
            <span>正转</span>
          </div>
          <div class="control-radio" @click="item.type='100'" :class="{'control-radio-checked': item.type == '100'}">
            <span>反转</span>
          </div>
        </template>
        <template v-if="item.deviceName==='窗户'">
          <div class="control-value">{{item.type}}%</div>
          <input type="range" min="0" max="100" v-model="item.type"/>
        </template>
      </div> -->
      <div class="device-item-control">{{item.deviceName}}</div>
    </div>
  </div>
</template>

<script>
import { stringify } from 'querystring';
  export default {
    name: "DeviceList",
    props: {
      deviceList: Array
    },
    // data () {
    //   return {
    //    warehouseGbCode: '',
    //    deviceBarcode: '',
    //    onOffSwitch: '',
    //    type: ''
    //   }
    // },
    methods: {
      Switch(data) {
        console.log(data)
        if(data.onOffSwitch == '2'){
          data.onOffSwitch = '1';
        } else if(data.onOffSwitch == '1'){
          data.onOffSwitch = '2';
        }
        this.$emit('on-off', data); 
      },
      switchBtn (data) {
        if(data.switchTime != '0') {
          layer.open({
            title: '开关操作',
            content: '请在倒计时结束后再点击开关'
          })
        }
      }
    }
  }
</script>

<style scoped>
  .device-list {
    display: flex;
    margin: 0 30px 30px;
    overflow: auto;
  }

  .device-item:last-child {
    border-right: 1px solid #cbcbcb;
  }

  .device-item > div {
    height: 50px;
    padding: 5px 10px;
    border-top: 1px solid #cbcbcb;
    border-left: 1px solid #cbcbcb;
  }

  .device-item.device-label > div:nth-child(4n + 1) {
    width: 60px;
  }

  .device-item > div:nth-child(4n + 2) {
    background: rgba(244, 244, 244, 1);
  }

  .device-item > div:nth-child(4n + 3) {
  }

  .device-item > div:nth-child(4n + 4) {
    border-bottom: 1px solid #cbcbcb;
    background: rgba(244, 244, 244, 1);
  }

  .label-text,
  .device-item-num,
  .device-item-status {
    line-height: 50px;
    text-align: center;
    font-size: 14px;
  }

  .device-item-switch {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .device-item-switch img {
    height: 30px;
  }

  .device-item .device-item-switch .countDown-on {
    position: absolute;
    left: 1.2rem;
  }

  .device-item .device-item-switch .countDown-off {
    position: absolute;
    right: 1.2rem;
  }

  .device-item-control {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
  }

  .control-value {
    line-height: 20px;
  }

  .device-item-control [type="range"] {
    width: 100px;
  }

  .control-radio {
    position: relative;
    padding-left: 25px;
    line-height: 20px;
    cursor: pointer;
  }
  .control-radio:first-child {
    margin-bottom: 5px;
  }
  .control-radio::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid #C5C5C5;
  }
  .control-radio-checked::after {
    background: #0076FF;
  }
  .control-radio-checked::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    z-index: 1;
    background: url("../../../static/images/checked.png") center center no-repeat;
    background-size: 80%;
  }
</style>
