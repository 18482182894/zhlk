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
                            <input type="text" class="input-text" v-model="submitData.deviceName" readonly="readonly" placeholder="选择设备" @click="showPopup(1);">
                        </span>
                        <span>
                             设备编号：
                            <input type="text" class="input-text" v-model="submitData.deviceId" readonly="readonly">
                        </span>
                        <span>
                            PC主机：
                            <input type="text" class="input-text" v-model="submitData.pcHostIp" >
                        </span>
                        <span>
                            设备地址：
                            <input type="text" class="input-text" v-model="submitData.deviceAddress" >
                        </span>
                        <span>
                            设备端口：
                            <input type="text" class="input-text" v-model="submitData.devicePort" >
                        </span>
                        <span>
                            库点功能位置：
                            <input type="text" class="input-text" v-model="submitData.funcPositionName" readonly="readonly" placeholder="选择库点功能位置" @click="showPopup(2);">
                        </span>
                        <!-- <span>
                            设备朝向：
                            <input type="text" class="input-text" v-model="submitData.positionMessage" >
                        </span> -->
                        <span>
                            位置信息：
                            <input type="text" class="input-text" v-model="submitData.positionMessage" >
                        </span>
                        <span>
                            用户名：
                            <input type="text" class="input-text" v-model="submitData.userName" >
                        </span>
                        <span>
                            密码：
                            <input type="text" class="input-text" v-model="submitData.password" >
                        </span>

                        <span style="width: 100%;">
                             设备描述：
                            <input type="text" style="width: 95%;"  class="input-text" v-model="submitData.memo">
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

        <!-- 选择设备弹出层 -->
        <div class="popup" :style="editPopup==1?'display:block;':''">
            <div class="popup-main planPopup-edit-main operationLog">
                <div class="popup-title">
                    <label>选择设备</label>
                    <em class="popup-close" @click="closePopup('edit');">×</em>
                </div>
                <div class="popup-content">
                    <div class="videoRetrieval">
                      <div class="lookup">
                        设备名称：
                        <input type="text" class="input-text excision" v-model="postData.deviceName">

                        <div class="btn btn-add" @click="getList(1);">
                          <img src="../../../static/images/search.png" alt="">
                          <label>查找</label>
                        </div>
                      </div>
                      <table class="customTable">
                        <thead>
                            <tr>
                                <th style="width:5%;"><input type="checkbox" ></th>
                                <th style="width:5%;">序号</th>
                                <th style="width:15%;">设备名称</th>
                                <th style="width:15%;">设备类型</th>
                                <th style="width:15%;">设备型号</th>
                                <th style="width:30%;">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,i) in listData">
                                <td><input type="checkbox"></td>
                                <td v-text="i+1"></td>
                                <td v-text="item.deviceName"></td>
                                <td v-text="item.deviceType"></td>
                                <td v-text="item.deviceModel"></td>
                                <td>
                                  <div class="table-btn btn-yellow" @click="selectEquipment(item);">选择</div>
                                </td>
                            </tr>
                        </tbody>
                      </table>
                      <!-- 分页容器 -->
                      <div id="PageBar"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 选择库点功能位置弹出层 -->
        <div class="popup" :style="editPopup==2?'display:block;':''">
            <div class="popup-main planPopup-edit-main operationLog">
                <div class="popup-title">
                    <label>选择库点功能位置</label>
                    <em class="popup-close" @click="closePopup('edit');">×</em>
                </div>
                <div class="popup-content">
                    <div class="videoRetrieval">
                      <div class="lookup">
                        名称：
                        <input type="text" class="input-text excision" v-model="postPositionData.funcPositionName">
                        编号：
                        <input type="text" class="input-text excision" v-model="postPositionData.funcPositionCode">

                        <div class="btn btn-add" @click="getPositionList(1);">
                          <img src="../../../static/images/search.png" alt="">
                          <label>查找</label>
                        </div>
                      </div>
                          <table class="customTable">
                            <thead>
                              <tr>
                                <th style="width:5%;"><input type="checkbox" ></th>
                                <th style="width:5%;">序号</th>
                                <th style="width:15%;">功能位置名称</th>
                                <th style="width:15%;">功能位置编号</th>
                                <th style="width:15%;">位置类型</th>
                                <th style="width:15%;">位置名称</th>
                                <th style="width:30%;">操作</th>
                              </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,i) in positionList">
                                    <td><input type="checkbox" ></td>
                                    <td v-text="i+1"></td>
                                    <td>{{item.funcPositionName}}</td>
                                    <td>{{item.funcPositionCode}}</td>
                                    <td>{{item.positionType}}</td>
                                    <td>{{item.storehouseName}}{{item.warehouseName}}</td>
                                    <td>
                                        <div class="table-btn btn-yellow" @click="selectPosition(item);">选择</div>
                                    </td>
                                </tr>
                            </tbody>
                          </table>
                          <!-- 分页容器 -->
                          <div id="PageBar1" class="PageBar"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.planPopup-edit-main{
    height: 674px;
}
</style>
<script>
import { addwl, equipmentInfo ,locationInfo} from "@/api/IOT/iot.js";
export default {
  name: "priceManageEdit",
  data() {
    return {
      isShow: 0,
      submitData: {
        deviceName:'',
        deviceId: "",
        pcHostIp: "",
        deviceAddress: "",
        devicePort: "",
        funcPositionName:'',
        funcPositionCode: "",
        positionMessage: "",
        userName: "",
        password: "",
        memo: "",
      },
      postData: {
        deviceName:'',
        pageSize: 6,
        pageNo:1
      },
      postPositionData: {
        funcPositionName:"",
        funcPositionCode:"",
        storehouseGbCode:"",
        warehouseGbCode:"",
        pageSize:6,
        pageNo:1
      },
      listData:[],//设备列表
      positionList:[],//库点功能位置列表
      editPopup: 0, // 控制菜单编辑弹出层的显影，1为选择设备，2为选择库点功能位置
    };
  },
  methods: {
    submitEvent: function() {//提交
      var vm=this;

      if (vm.submitData.deviceId == "") {
        layer.msg("请选择设备");
        return;
      }
      if (vm.submitData.pcHostIp == "") {
        layer.msg("请填写PC主机");
        return;
      }
      if (vm.submitData.deviceAddress == "") {
        layer.msg("请填写设备地址");
        return;
      }
      if (vm.submitData.devicePort == "") {
        layer.msg("请填写设备端口");
        return;
      }
      if (vm.submitData.funcPositionCode == "") {
        layer.msg("请选择库点功能位置");
        return;
      }
      if (vm.submitData.positionMessage == "") {
        layer.msg("请填写位置消息");
        return;
      }
      if (vm.submitData.userName == "") {
        layer.msg("请填写用户名");
        return;
      }
      if (vm.submitData.password == "") {
        layer.msg("请填写密码");
        return;
      }
      addwl(vm.submitData).then(ret =>{
        console.log(ret)
        if(ret.code == 200){
          layer.msg("添加成功!");
          vm.$router.push({name:'IOTType'});
        }else{
          layer.alert(ret.data, { closeBtn: 0 });
        }
      }).catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        })
    },
    getList: function(pageNo) {//获取列表
      var vm = this;
      vm.postData.pageNo = pageNo;
      layer.load(2);
      equipmentInfo(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.dataList;

            laypage({
              //分页
              cont: "PageBar", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
              pages: ret.page.totalPages, //通过后台拿到的总页数
              curr: pageNo,
              skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
              jump: function(obj, first) {
                //触发分页后的回调
                if (!first) {
                  //一定要加此判断，否则初始时会无限刷新
                  vm.getList(obj.curr);
                }
              }
            });
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
    getPositionList: function(pageNo) {//获取列表
      var vm = this;
      vm.postPositionData.pageNo = pageNo;
      layer.load(2);
      locationInfo(vm.postPositionData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.positionList = ret.data.dataList;

            laypage({
              //分页
              cont: "PageBar1", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
              pages: ret.page.totalPages, //通过后台拿到的总页数
              curr: pageNo,
              skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
              jump: function(obj, first) {
                //触发分页后的回调
                if (!first) {
                  //一定要加此判断，否则初始时会无限刷新
                  vm.getPositionList(obj.curr);
                }
              }
            });
          } else {
            if (ret.code == "500" && ret.data == "查询错误，没有数据") {
              layer.msg("暂无数据");
              vm.positionList = [];
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    showPopup: function(num) {// 展示弹出层
        var vm = this;
        vm.editPopup = num;
    },
    closePopup: function() {// 隐藏弹出层
        var vm = this;
        vm.editPopup = 0;
    },
    selectEquipment:function (data) {//选择设备
        var vm = this;
        vm.submitData.deviceName=data.deviceName;
        vm.submitData.deviceId=data.deviceId;
        vm.closePopup();
    },
    selectPosition:function (data) {//选择库点功能位置
        var vm = this;
        vm.submitData.funcPositionCode=data.funcPositionCode;
        vm.submitData.funcPositionName=data.funcPositionName;  
        vm.closePopup();      
    },
    detailBack:function () {
        this.$router.back(-1);
    }
  },
  mounted() {
    var vm = this;
    vm.getList(0);
    vm.getPositionList(0);
  }
};
</script>
