<template>
    <div class="content">
        <div class="menuManage roleManage">
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">设备信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail userManage-edit">
                        <div>
                            <span>
                                设备名称：
                                <label v-text="detailData.deviceName"></label>
                            </span>
                            <span>
                                设备编号：
                                <label v-text="detailData.deviceId"></label>
                            </span>
                            <span>
                                设备类型：
                                <label v-text="detailData.deviceType"></label>
                            </span>
                            <span>
                                通信模式：
                                <label v-text="detailData.communicationMode"></label>
                            </span>
                            <span>
                                通信方式：
                                <label v-text="detailData.communicationProtocol" ></label>
                            </span>


                            <span>
                                校验位：
                                <label v-text="detailData.checkBit"></label>
                            </span>
                            <span>
                                数据位：
                                <label v-text="detailData.dataBit"></label>
                            </span>
                            <span>
                                停止位：
                                <label v-text="detailData.stopBit"></label>
                            </span>
                            <span>
                                波特率：
                                <label v-text="detailData.baudRate" ></label>
                            </span>
                            <span>
                                地址类型：
                                <label v-text="detailData.addressType"></label>
                            </span>


                            <span>
                                检查链接命令：
                                <label v-text="detailData.checkConnectCommand"></label>
                            </span>
                            <span>
                                命令校验方式：
                                <label v-text="detailData.commandCheckMode"></label>
                            </span>
                            <span>
                                命令头长度：
                                <label v-text="detailData.commandHeadLength"></label>
                            </span>
                            <span>
                                地址值：
                                <label v-text="detailData.addressValue"></label>
                            </span>
                            <span>
                                获取数据命令：
                                <label v-text="detailData.getDataCommand" ></label>
                            </span>

                            <span>
                                数据起始位：
                                <label v-text="detailData.dataStartBit"></label>
                            </span>
                            <span>
                                数据截止位：
                                <label v-text="detailData.dataEndBit"></label>
                            </span>


                            <span>
                                通风耗能（瓦特）：
                                <label v-text="detailData.aerationEnergyConsumption"></label>
                            </span>
                            <span>
                                送风方式位：
                                <label v-text="detailData.airSupplyModePosition"></label>
                            </span>
                            <span>
                                风网阻力：
                                <label v-text="detailData.windNetResistance"></label>
                            </span>
                            <span>
                                单位通风量：
                                <label v-text="detailData.unitVentilationVolume" ></label>
                            </span>
                            
                            <span style="width: 100%;">
                                设备描述：
                                <label style="width: 95%;" v-text="detailData.deviceDesc" ></label>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">设备指令</div>
                </div>
                <div class="tag-box-content">
                    
                      <div>
                        <div class="btn btn-add" @click="showPopup();">
                          <img src="../../../static/images/add.png" alt="">
                          <label>新增</label>
                        </div>
                      </div>
                    <table class="customTable">
                        <thead>
                            <tr>
                                <th style="width:5%;"><input type="checkbox"></th>
                                <th style="width:5%;">序号</th>
                                <th style="width:15%;">指令内容</th>
                                <th style="width:15%;">指令作用</th>
                                <th style="width:15%;">指令数据类型</th>
                                <th style="width:30%;">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,i) in listData">
                                <td><input type="checkbox" ></td>
                                <td v-text="i+1"></td>
                                <td v-text="item.instructionContent"></td>
                                <td v-text="item.instructionEffect"></td>
                                <td v-text="item.instructionDataType"></td>
                                <td>
                                  <div class="table-btn btn-red" @click="delData(item.instructionId);">删除</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- 分页容器 -->
                    <div id="PageBar"></div>
                </div>
            </div>
            <div class="detail-back">
                <button @click="detailBack();">返回</button>
            </div>
        </div>

        <!-- 详情弹出层 -->
        <div class="popup" id="printContent" :style="editPopup==1?'display:block;':''">
            <div class="popup-main planPopup-edit-main operationLog">
                <div class="popup-title">
                    <label>新增指令</label>
                    <em class="popup-close" @click="closePopup('edit');">×</em>
                </div>
                <div class="popup-content" >
                    <div class="userManage-detail userManage-edit">
                        <div>
                            <span>
                                指令内容：
                                <input type="text" class="input-text" v-model="submitOrderData.instructionContent" >
                            </span>
                            <!-- <span>
                                指令编号：
                                <input type="text" class="input-text" v-model="submitOrderData.shipingCount" >
                            </span> -->
                            <span>
                                指令作用：
                                <!-- <input type="text" class="input-text" v-model="submitOrderData.instructionEffect" > -->
                                <select name="" class="select-style" v-model="submitOrderData.instructionEffect">
                                    <option v-for="item in directiveFunctionList" :value="item.dicInfoValue" >{{item.dicInfoValue}}</option>
                                </select>
                            </span>
                            <span>
                                指令数据类型：
                                <select class="select-style" v-model="submitOrderData.instructionDataType" >
                                    <option value="十六进制" >十六进制</option>
                                    <option value="十进制" >十进制</option>
                                </select>
                            </span>
                            <span>
                                通信频率：
                                <input type="text" class="input-text" v-model="submitOrderData.communicationFrequency" >
                            </span>
                            <span>
                                无数据返回内容：
                                <input type="text" class="input-text" v-model="submitOrderData.noDataReturnContent" >
                            </span>
                            <span>
                                js处理器：
                                <input type="text" class="input-text" v-model="submitOrderData.jsProcessor" >
                            </span>
                            <span>
                                java处理器：
                                <input type="text" class="input-text" v-model="submitOrderData.javaProcessor" >
                            </span>
                            <span>
                                数据起始位：
                                <input type="text" class="input-text" v-model="submitOrderData.dataStartBit" >
                            </span>
                            <span>
                                数据截至位：
                                <input type="text" class="input-text" v-model="submitOrderData.dataEndBit" >
                            </span>
                        </div>
                    </div>
                    <div class="edit-btn" >
                        <button class="edit-submit" @click="submitEvent();">提交</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<style type="text/css" scoped>
    .planPopup-edit-main {
        width: 980px;
        height: 350px;
    }
</style>
<script>
import { detailEquipmentInfo , instructions,addInstructions,delInstructions} from "@/api/IOT/iot.js"; 
import { directiveFunction} from "@/api/systemManage/dropDown";
export default {
  name: "priceManageDetail",
  data() {
    return {
      postData: {
        deviceId: this.$route.query.id
      },
      listData:[],
      sortOrder: "0", //0 顺序，1 倒序
      detailData: "",
      submitOrderData:{
        deviceId:this.$route.query.id,
        instructionContent:'',
        instructionEffect:'',
        instructionDataType:'',
        communicationFrequency:'',
        noDataReturnContent:'',
        jsProcessor:'',
        javaProcessor:'',
        dataStartBit:'',
        dataEndBit:'',
      },
      directiveFunctionList:[],//指令作业列表
      editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      detailEquipmentInfo(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData = ret.data.dataMap;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getList: function() {//获取列表
      var vm = this;
      layer.load(2);
      instructions({deviceId:this.$route.query.id})
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.dataList;
          } else {
            if (ret.code == "500" && ret.data == "查询错误，没有数据") {
              layer.msg("暂无数据");
              vm.listData = [];
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    submitEvent: function() {//提交
      var vm=this;
      addInstructions(vm.submitOrderData).then(ret =>{
        console.log(ret)
        if(ret.code == 200){
          layer.msg("添加成功!");
          vm.closePopup();
          vm.getList();
        }else{
          layer.alert(ret.data, { closeBtn: 0 });
        }
      }).catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        })
    },
    delData: function(id) {//提交
      var vm=this;
      delInstructions({instructionIdList:id}).then(ret =>{
        if(ret.code == 200){
          layer.msg("删除成功!");
          vm.getList();
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
        vm.getDropDown();
    },
    closePopup: function() {// 隐藏弹出层
        var vm = this;
        vm.editPopup = 0;
        vm.submitOrderData={
            deviceId:this.$route.query.id,
            instructionContent:'',
            instructionEffect:'',
            instructionDataType:'',
            communicationFrequency:'',
            noDataReturnContent:'',
            jsProcessor:'',
            javaProcessor:'',
            dataStartBit:'',
            dataEndBit:'',
        };
    },
    getDropDown: function() { //获取下拉项
        var vm = this;

        directiveFunction({})
            .then(ret => {
              //指令作用
              if (ret.code == 200) {
                // console.log(JSON.stringify(ret));
                vm.directiveFunctionList = ret.data.dataList;
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
    vm.getList();
    vm.getDetail();
  }
};
</script>
