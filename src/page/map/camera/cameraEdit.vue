<template>
  <div class="content">
    <div class="menuManage userManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">摄像头信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
                            <span>
                                摄像头编号：
                                <input type="text" class="input-text" v-model="submitData.cameraCode">
                            </span>
              <span>
                                摄像头IP：
                                <input type="text" class="input-text" v-model="submitData.cameraIp">
                            </span>
              <span>
                                硬盘录像机编号：
                                <select name="" class="select-style"  v-model="submitData.dvrCode">
                                    <option v-for="item in videoRecorderList" :value="item.dvrCode" >{{item.dvrName}}</option>
                                </select>
                            </span>
              <span>
                                登陆用户名：
                                <input type="text" class="input-text" v-model="submitData.userName">
                            </span>
              <span>
                                登陆密码：
                                <input type="text" class="input-text" v-model="submitData.userPwd">
                            </span>
              <span>
                                厂家：
                                <input type="text" class="input-text" v-model="submitData.factoryName">
                            </span>
              <span>
                                摄像头名称：
                                <input type="text" class="input-text" v-model="submitData.cameraName">
                            </span>
              <span>
                                摄像头端口：
                                <input type="text" class="input-text" v-model="submitData.cameraPort">
                            </span>
              <span>
                                摄像头ID：
                                <input type="text" class="input-text" v-model="submitData.cameraId">
                            </span>
              <span>
                                显示排序：
                                <input type="text" class="input-text" v-model="submitData.sortNo">
                            </span>
              <span>
                                通道名称：
                                <input type="text" class="input-text" v-model="submitData.channelName">
                            </span>
              <span>
                                通道号：
                                <input type="text" class="input-text"  v-model="submitData.channelNo">
                            </span>
              <span>
                                连接方式：
                                <input type="text" class="input-text" v-model="submitData.connectionType">
                            </span>
              <span>
                                是否在仓内：
                                <select name="" class="select-style"  v-model="submitData.storehouseInsideFlg">
                                    <option value="是" >是</option>
                                    <option value="否" >否</option>
                                </select>
                            </span>
              <span v-if="submitData.storehouseInsideFlg=='是'">
                                仓房：
                                <select class="select-style" v-model="warehouse"  @change="getGranary(warehouse);">
                                    <option :value="item.storehouseGbCode" v-for="item in storehouseList" v-text="item.storehouseName"></option>
                                </select>
                            </span>
              <span v-if="submitData.storehouseInsideFlg=='是'">
                                廒间：
                                <select class="select-style" v-model="submitData.warehouseGbCode">
                                    <option :value="item.warehouseGbCode" v-for="item in granaryList" v-text="item.warehouseName"></option>
                                </select>
                            </span>
              <span>
                                是否有效：
                                <select name="" class="select-style"  v-model="submitData.effictiveFlg">
                                    <option value="是" >是</option>
                                    <option value="否" >否</option>
                                </select>
                            </span>
              <span>
                                是否地磅现场：
                                <select name="" class="select-style"  v-model="submitData.weighingMachineSite">
                                    <option value="是" >是</option>
                                    <option value="否" >否</option>
                                </select>
                            </span>
              <span>
                                是否入仓现场：
                                <select name="" class="select-style"  v-model="submitData.getintoFlg">
                                    <option value="是" >是</option>
                                    <option value="否" >否</option>
                                </select>
                            </span>
              <span>
                                是否可控：
                                <select name="" class="select-style"  v-model="submitData.ctrlFlg">
                                    <option value="是" >是</option>
                                    <option value="否" >否</option>
                                </select>
                            </span>
              <span v-if="submitData.storehouseInsideFlg=='否'">
                                摄像头位置：
                                <input type="text" class="input-text" v-model="submitData.cameraPosition">
                            </span>
              <span>
                                摄像头状态：
                                <select name="" class="select-style"  v-model="submitData.cameraStatus">
                                    <option value="正常" >正常</option>
                                    <option value="离线" >离线</option>
                                    <option value="损坏" >损坏</option>
                                </select>
                            </span>
              <br>
              <span style="width: 73%">
                              流媒体链接地址：
                                <input style="width: 100%" type="text" class="input-text" v-model="submitData.streamingMediaUrl">
                            </span>
              <br>
              <span style="width: 73%">
                                备注：
                                <textarea name="" style="width: 100%" class="edit-textarea" v-model="submitData.memo"></textarea>
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
  .edit-btn {
    padding-bottom: 2rem;
  }
</style>
<script>
import {detailCamera, editCamera, addCamera, ListDigitalVideoRecorder } from "../../../api/map/map";
import {storehouse,granary} from "@/api/systemManage/dropDown";  
    export default {
        name: "cameraEdit",
      data() {
        return {
          postData:{
            cameraCode:this.$route.query.cameraCode,
			cameraCodeCondition:this.$route.query.cameraCodeCondition,
			pageNO:this.$route.pageNo
          },
          warehouse:'',
          videoRecorderList:'',
          submitData:{
            warehouseGbCode:'',
            cameraCode:'',
            cameraIp:'',
            dvrCode:'',
			dvrName:'',
            userName:'',
            userPwd:'',
            factoryName:'',
            cameraPort:'',
            cameraId:'',
            sortNo:'',
            channelName:'',
            channelNo:'',
            connectionType:'',
            storehouseInsideFlg:'',
            effictiveFlg:'',
            weighingMachineSite:'',
            getintoFlg:'',
            ctrlFlg:'',
            streamingMediaUrl:'',
            memo:'',
            cameraName:'',
            cameraPosition:'',
            cameraStatus:'',
          },
          storehouseList:[],//仓房下拉
          granaryList:[]//廒间
        }
      },
      methods: {
        getDetail: function() {
          var vm = this;
          layer.load(2);
          detailCamera(vm.postData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                console.log(JSON.stringify(ret.data.data))
                vm.submitData.warehouseGbCode = ret.data.data.warehouseGbCode;
                vm.submitData.cameraCode = ret.data.data.cameraCode;
                vm.submitData.cameraIp = ret.data.data.cameraIp;
                vm.submitData.dvrCode = ret.data.data.dvrCode;
				vm.submitData.dvrName = ret.data.data.dvrName;
                vm.submitData.userName = ret.data.data.userName;
                vm.submitData.userPwd = ret.data.data.userPwd;
                vm.submitData.factoryName = ret.data.data.factoryName;
                vm.submitData.cameraPort = ret.data.data.cameraPort;
                vm.submitData.cameraId = ret.data.data.cameraId;
                vm.submitData.sortNo = ret.data.data.sortNo;
                vm.submitData.channelName = ret.data.data.channelName;
                vm.submitData.channelNo = ret.data.data.channelNo;
                vm.submitData.connectionType = ret.data.data.connectionType;
                vm.submitData.storehouseInsideFlg = ret.data.data.storehouseInsideFlg;
                vm.submitData.effictiveFlg = ret.data.data.effictiveFlg;
                vm.submitData.weighingMachineSite = ret.data.data.weighingMachineSite;
                vm.submitData.getintoFlg = ret.data.data.getintoFlg;
                vm.submitData.ctrlFlg = ret.data.data.ctrlFlg;
                vm.submitData.streamingMediaUrl = ret.data.data.streamingMediaUrl;
                vm.submitData.memo = ret.data.data.memo;
                vm.submitData.cameraName = ret.data.data.cameraName;
                vm.submitData.cameraPosition = ret.data.data.cameraPosition;
                vm.submitData.cameraStatus = ret.data.data.cameraStatus;
                vm.warehouse=ret.data.data.storehouseGbCode;
                vm.getGranary(ret.data.data.storehouseGbCode);
                vm.$nextTick(function() {
                  vm.getDropDown();
                });
              } else {
                layer.alert(ret.data, { closeBtn: 0 });
              }
            })
            .catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
            });
        },
        submitEvent: function() {
          var vm = this;
          if (vm.submitData.cameraCode == "") {
            layer.msg("请填写摄像头编码");
            return;
          }
          if (vm.submitData.cameraIp == "") {
            layer.msg("请填写摄像头IP");
            return;
          }
          
          if (vm.submitData.userName == "") {
            layer.msg("请填写登陆用户名");
            return;
          }
          if (vm.submitData.userPwd == "") {
            layer.msg("请填写登陆密码");
            return;
          }
          if (vm.submitData.factoryName == "") {
            layer.msg("请填写厂家");
            return;
          }
          if (vm.submitData.cameraPort == "") {
            layer.msg("请填写摄像头端口");
            return;
          }
          if (vm.submitData.cameraId == "") {
            layer.msg("请填写摄像头ID");
            return;
          }
          if (vm.submitData.sortNo == "") {
            layer.msg("请填写显示排序");
            return;
          }
          if (vm.submitData.channelName == "") {
            layer.msg("请填写通道名称");
            return;
          }
          if (vm.submitData.channelNo == "") {
            layer.msg("请填写通道号");
            return;
          }
          if (vm.submitData.storehouseInsideFlg == "") {
            layer.msg("请填写是否在仓内");
            return;
          }
          if (vm.submitData.storehouseInsideFlg == "是") {
              if (vm.submitData.warehouseGbCode == "") {
                layer.msg("请选择廒间");
                return;
              }
          }else{
              if (vm.submitData.cameraPosition == "") {
                layer.msg("请填写摄像头位置");
                return;
              }
          }
          if (vm.submitData.effictiveFlg == "") {
            layer.msg("请填写是否有效");
            return;
          }
          if (vm.submitData.weighingMachineSite == "") {
            layer.msg("请填写是否地磅现场");
            return;
          }
          if (vm.submitData.getintoFlg == "") {
            layer.msg("请填写是否入仓现场");
            return;
          }
          if (vm.submitData.ctrlFlg == "") {
            layer.msg("请填写是否可控");
            return;
          }
          if (vm.submitData.cameraStatus == "") {
            layer.msg("请填写摄像头状态");
            return;
          }
          if (this.$route.query.cameraCode) {
            layer.load(2);
            editCamera(vm.submitData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  layer.msg("编辑摄像头信息成功！");
                  this.$router.push({
                    name: "cameraList",
					query: {
                    cameraCodeCondition: vm.postData.cameraCodeCondition,
			        pageNo:this.$route.query.pageNo
                   }
					
					
                  });
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
          } else {
            layer.load(2);
            addCamera(vm.submitData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  layer.msg("新增摄像头信息成功！");
                  this.$router.push({
                    name: "cameraList",
					query: {
                    cameraCodeCondition: vm.postData.cameraCodeCondition,
			        pageNo:this.$route.query.pageNo
                     }
                  });
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
          }
        },
        getDropDown: function() {//获取下拉项
          var vm = this;
          
          storehouse()
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                console.log(ret)
                vm.storehouseList = ret.data.dataList;
              } else {
                if (ret.code == 500&&ret.data=='查询错误，没有数据') {
                    vm.storehouseList=[];
                }else{
                    layer.alert(ret.data, { closeBtn: 0 });
                }
              }
            })
            .catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
            });

          ListDigitalVideoRecorder({
              pageSize:1000,
              pageNo:0
          })
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                vm.videoRecorderList = ret.data.dataList;
                
              }else {
                  layer.alert(ret.data, { closeBtn: 0 });
              }
            })
            .catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
            });

        },
        getGranary:function (id) {//廒间下拉列表
          var vm = this;
          layer.load(2);
          granary(id).then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                vm.granaryList = ret.data.dataList;
              } else {
                if (ret.code == 500&&ret.data=='查询错误，没有数据') {
                    vm.granaryList=[];
                }else{
                    layer.alert(ret.data, { closeBtn: 0 });
                }
              }
            })
            .catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
            });
            
        },
        detailBack:function () {
          //this.$router.back(-1);
		  var vm = this;
		  this.$router.push({
            name: "cameraList",
            query: {
              cameraCodeCondition: vm.postData.cameraCodeCondition,
			  pageNo:this.$route.query.pageNo
        }
      });
        }
      },
      mounted () {
        var vm=this;
        if (this.$route.query.cameraCode) {
            vm.getDetail();
        }else{
          vm.getDropDown();
        }
      }
    };
</script>
