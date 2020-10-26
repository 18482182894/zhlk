<template>
  <div class="content">
    <div class="menuManage userManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">硬盘录像机信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
                            <span>
                                硬盘录像机名称：
                                <input type="text" class="input-text" v-model="submitData.dvrName">
                            </span>
              <span>
                                硬盘录像机ip：
                                <input type="text" class="input-text" v-model="submitData.dvrIp">
                            </span>
              <span>
                                硬盘录像机端口：
                                <input type="text" class="input-text" v-model="submitData.dvrPort">
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
                                硬盘录像机ID：
                                <input type="text" class="input-text" v-model="submitData.dvrId">
                            </span>
              <span>
                                外网IP：
                                <input type="text" class="input-text" v-model="submitData.dvrInternetIp">
                            </span>
              <span>
                                外网端口号：
                                <input type="text" class="input-text" v-model="submitData.dvrInternetPort">
                            </span>
              <span>
                                摄像机数量：
                                <input type="text" class="input-text" v-model="submitData.videoCamera">
                            </span>
              <span>
                                是否流媒体：
                                <select name="" class="select-style"  v-model="submitData.streamingMedia">
                                    <option value="1" >是</option>
                                    <option value="2" >否</option>
                                </select>
                            </span>
              <br>
              <span>
                                备注：
                                <input type="text" class="input-text" v-model="submitData.memo">
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
import {detailDigitalVideoRecorder, editDigitalVideoRecorder, addDigitalVideoRecorder } from "../../../api/map/map";
    export default {
        name: "diskEdit",
      data() {
        return {
          postData:{
            dvrCode:this.$route.query.id,
			dvrName:this.$route.query.dvrName,
			pageNo:this.$route.query.pageNo
          },
          submitData:{
            dvrCode:'',
            dvrName:'',
            dvrIp:'',
            dvrPort:'',
            userName:'',
            userPwd:'',
            factoryName:'',
            dvrId:'',
            dvrInternetIp:'',
            dvrInternetPort:'',
            videoCamera:'',
            streamingMedia:'',
            memo:'',
          }
        }
      },
      methods: {
        getDetail: function() {
          var vm = this;
          layer.load(2);
          detailDigitalVideoRecorder(vm.postData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                console.log(JSON.stringify(ret.data.data))
                vm.submitData.dvrCode = ret.data.data.dvrCode;
                vm.submitData.dvrName = ret.data.data.dvrName;
                vm.submitData.dvrIp = ret.data.data.dvrIp;
                vm.submitData.dvrPort = ret.data.data.dvrPort;
                vm.submitData.userName = ret.data.data.userName;
                vm.submitData.userPwd = ret.data.data.userPwd;
                vm.submitData.factoryName = ret.data.data.factoryName;
                vm.submitData.dvrId = ret.data.data.dvrId;
                vm.submitData.dvrInternetIp = ret.data.data.dvrInternetIp;
                vm.submitData.dvrInternetPort = ret.data.data.dvrInternetPort;
                vm.submitData.videoCamera = ret.data.data.videoCamera;
                vm.submitData.streamingMedia = ret.data.data.streamingMedia;
                vm.submitData.memo = ret.data.data.memo;

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
          if (vm.submitData.dvrName == "") {
            layer.msg("请填写硬盘录像机名称");
            return;
          }
          if (vm.submitData.dvrIp == "") {
            layer.msg("请填写硬盘录像机IP");
            return;
          }
          if (vm.submitData.dvrPort == "") {
            layer.msg("请填写硬盘录像机端口");
            return;
          }
          if (vm.submitData.userName == "") {
            layer.msg("请填写登录用户名");
            return;
          }
          if (vm.submitData.userPwd == "") {
            layer.msg("请填写登录密码");
            return;
          }
          if (vm.submitData.factoryName == "") {
            layer.msg("请填写厂家");
            return;
          }
          if (vm.submitData.dvrId == "") {
            layer.msg("请填写硬盘录像机ID");
            return;
          }
          if (vm.submitData.videoCamera == "") {
            layer.msg("请填写摄像机数量");
            return;
          }
          if (vm.submitData.streamingMedia == "") {
            layer.msg("请选择是否流媒体");
            return;
          }
          if (this.$route.query.id) {
            layer.load(2);
            editDigitalVideoRecorder(vm.submitData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  layer.msg("编辑硬盘录像机信息成功！");
                  this.$router.push({
                    name: "diskList",
					query: {
                    dvrName:vm.postData.dvrName,
			        pageNo:vm.postData.pageNo
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
            addDigitalVideoRecorder(vm.submitData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  layer.msg("新增硬盘录像机信息成功！");
                  this.$router.push({
                    name: "diskList",
					query: {
                     dvrName:vm.postData.dvrName,
			         pageNo:vm.postData.pageNo
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
        detailBack:function () {
          var vm = this;
		    this.$router.push({
            name: "diskList",
            query: {
              dvrName:vm.postData.dvrName,
			  pageNo:vm.postData.pageNo
        }
      });
        }
      },
      mounted () {
        var vm=this;
        if (this.$route.query.id) {
            vm.getDetail();
        }else{
          vm.getDropDown();
        }
      }
    };
</script>

