<template>
    <div class="content">
        <div class="menuManage roleManage">
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">基础信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail userManage-edit">
                      <div>
                        <span>
                            设备名称：
                            <select name="" class="select-style" v-model="submitData.deviceName">
                                <option v-for="item in deviceNameWLList" :value="item.dicInfoValue" >{{item.dicInfoValue}}</option>
                            </select>
                        </span>
                        <span>
                             设备型号：
                            <input type="text" class="input-text" v-model="submitData.deviceModel">
                        </span>
                        <span>
                            设备类型：
                            <select name="" class="select-style" v-model="submitData.deviceType">
                                <option value="输入设备" >输入设备</option>
                                <option value="输出设备" >输出设备</option>
                            </select>
                        </span>
                        <span>
                             通信模式：
                            <select name="" class="select-style" v-model="submitData.communicationMode">
                                <option value="主动推送" >主动推送</option>
                                <option value="被动拉取" >被动拉取</option>
                            </select>
                        </span>
                        <span>
                            通信方式：
                            <select name="" class="select-style" v-model="submitData.communicationProtocol">
                                <option value="串口" >串口</option>
                                <option value="HTTP" >HTTP</option>
                                <option value="TCP/IP" >TCP/IP</option>
                            </select>
                        </span>

                        <span>
                             校验位：
                            <select name="" class="select-style" v-model="submitData.checkBit">
                                <option value="NONE" >NONE</option>
                                <option value="ODD" >ODD</option>
                            </select>
                        </span>
                        <span>
                            数据位：
                            <select name="" class="select-style" v-model="submitData.dataBit">
                                <option value="5" >5</option>
                                <option value="6" >6</option>
                                <option value="7" >7</option>
                                <option value="8" >8</option>
                            </select>
                        </span>
                        <span>
                             停止位：
                            <select name="" class="select-style" v-model="submitData.stopBit">
                                <option value="1" >1</option>
                                <option value="1.5" >1.5</option>
                                <option value="2" >2</option>
                            </select>
                        </span>
                        <span>
                             波特率：
                            <select name="" class="select-style" v-model="submitData.baudRate">
                                <option value="9600" >9600</option>
                                <option value="19200" >19200</option>
                            </select>
                        </span>
                        <span>
                             地址类型：
                            <select name="" class="select-style" v-model="submitData.addressType">
                                <option value="无" >无</option>
                                <option value="线圈地址" >线圈地址</option>
                                <option value="寄存器地址" >寄存器地址</option>
                            </select>
                        </span>

                        <span>
                             检查链接命令：
                            <input type="text" class="input-text" v-model="submitData.checkConnectCommand">
                        </span>
                        <span>
                             命令校验方式：
                            <select name="" class="select-style" v-model="submitData.commandCheckMode">
                                <option value="无" >无</option>
                                <option value="循环冗余校验" >循环冗余校验</option>
                                <option value="异或" >异或</option>
                            </select>
                        </span>
                        <span>
                             命令头长度：
                            <input type="text" class="input-text" v-model="submitData.commandHeadLength">
                        </span>
                        <span>
                             地址值：
                            <input type="text" class="input-text" v-model="submitData.addressValue">
                        </span>
                        <span>
                             获取数据命令：
                            <input type="text" class="input-text" v-model="submitData.getDataCommand">
                        </span>
                        <span>
                             数据起始位：
                            <input type="text" class="input-text" v-model="submitData.dataStartBit">
                        </span>
                        <span>
                             数据截止位：
                            <input type="text" class="input-text" v-model="submitData.dataEndBit">
                        </span>

                        <span>
                             通风耗能（瓦特）：
                            <input type="text" class="input-text" v-model="submitData.aerationEnergyConsumption">
                        </span>
                        <span>
                             送风方式位：
                            <input type="text" class="input-text" v-model="submitData.airSupplyModePosition">
                        </span>
                        <span>
                             风网阻力：
                            <input type="text" class="input-text" v-model="submitData.windNetResistance">
                        </span>
                        <span>
                             单位通风量：
                            <input type="text" class="input-text" v-model="submitData.unitVentilationVolume">
                        </span>
                        <span style="width: 100%;">
                             设备描述：
                            <input type="text" style="width: 95%;"  class="input-text" v-model="submitData.deviceDesc">
                        </span>                        
                      </div>
                    </div>
                </div>
            </div>
            <div class="edit-btn">
                <button class="edit-submit" @click="submitEvent();">提交</button>
                <button class="edit-back" @click="detailBack();">返回</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
</style>
<script>
import { addEquipmentInfo,} from "@/api/IOT/iot.js";
import { deviceNameWL} from "@/api/systemManage/dropDown";
export default {
  name: "priceManageEdit",
  data() {
    return {
      isShow: 0,
      submitData: {
        deviceName: "",
        deviceType: "",
        deviceModel: "",
        communicationMode: "",
        communicationProtocol: "",
        checkBit: "",
        dataBit: "",
        stopBit: "",
        baudRate: "",
        addressType: "",
        checkConnectCommand: "",
        commandCheckMode: "",
        commandHeadLength: "",
        addressValue: "",
        getDataCommand: "",
        dataStartBit: "",
        dataEndBit: "",
        aerationEnergyConsumption: "",
        airSupplyModePosition: "",
        windNetResistance: "",
        unitVentilationVolume: "",
        deviceDesc: "",
      },
      listData:[],
      deviceNameWLList:[],//物联设备名称列表
      editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
    };
  },
  methods: {
    submitEvent: function() {//提交
      var vm=this;
      addEquipmentInfo(vm.submitData).then(ret =>{
        console.log(ret)
        if(ret.code == 200){
          layer.msg("添加成功!");
          vm.$router.push({name:'equipment'});
        }else{
          layer.alert(ret.data, { closeBtn: 0 });
        }
      }).catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        })
    },
    showPopup: function(id) {// 展示弹出层
        var vm = this;
        vm.editPopup = 1;
    },
    closePopup: function() {// 隐藏弹出层
        var vm = this;
        vm.editPopup = 0;
    },
    getDropDown: function() { //获取下拉项
        var vm = this;

        deviceNameWL({})
            .then(ret => {
              //设备名称
              if (ret.code == 200) {
                // console.log(JSON.stringify(ret));
                vm.deviceNameWLList = ret.data.dataList;
              } else {
                layer.alert(ret.data, { closeBtn: 0 });
              }
            })
            .catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
            });
    },
    detailBack:function () {
        this.$router.back(-1);
    }
  },
  mounted() {
    var vm = this;
    vm.getDropDown();
  }
};
</script>
