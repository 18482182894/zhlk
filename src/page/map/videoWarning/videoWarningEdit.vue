<template>
  <div class="content">
    <div class="menuManage userManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">视频报警信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
                                录像机：
                                <select name="" class="select-style" v-model="dvrData" @change="selectDvr();">
                                    <option v-for="item in videoRecorderList" :value="item" >{{item.dvrName}}</option>
                                </select>
                            </span>
              <span>
                               通道号：
                                <input type="text" class="input-text" v-model="submitData.channelNo">
                            </span>
              <span>
                                报警类型：
                                <select name="" class="select-style"  v-model="submitData.warningType">
                                    <option value="非法入侵" >非法入侵</option>
                                    <option value="视频丢失" >视频丢失</option>
                                    <option value="摄像头遮挡" >摄像头遮挡</option>
                                    <option value="越界侦测" >越界侦测</option>
                                    <option value="区域入侵" >区域入侵</option>
                                    <option value="信号丢失" >信号丢失</option>
                                    <option value="图像模糊" >图像模糊</option>
                                    <option value="亮度异常" >亮度异常</option>
                                    <option value="图像偏色" >图像偏色</option>
                                    <option value="雪花噪声" >雪花噪声</option>
                                    <option value="条纹干扰" >条纹干扰</option>
                                    <option value="画面冻结" >画面冻结</option>
                                    <option value="PTZ失控" >PTZ失控</option>
                                </select>
                            </span>
              <span>
                                报警时间：
                                <input type="text" class="input-text Wdate" onclick="WdatePicker({ dateFmt: 'yyyy-MM-dd HH:mm:ss' })" id="warningDatetime">
                            </span>
              <span>
                                报警原因：
                                <input type="text" class="input-text" v-model="submitData.warningReason">
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
import {detailVideoAlarm, editVideoAlarm, addVideoAlarm ,ListDigitalVideoRecorder} from "../../../api/map/map";
    export default {
        name: "videoWarningEdit",
      data() {
        return {
          postData:{
            warningId:this.$route.query.id,
			warningType:this.$route.query.warningType,
			pageNo:this.$route.query.pageNo
          },
          dvrData:'',
          videoRecorderList:[],//录像机列表
          submitData:{
            warningId:'',
            dvrCode:'',
            dvrName:'',
            channelNo:'',
            warningType:'',
            warningDatetime:'',
            warningReason:'',
          }
        }
      },
      methods: {
        getDetail: function() {
          var vm = this;
          layer.load(2);
          detailVideoAlarm(vm.postData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                console.log(JSON.stringify(ret.data.dataMap))
                vm.submitData.warningId = ret.data.dataMap.warningId;
                vm.dvrData={
                    dvrCode: ret.data.dataMap.dvrCode,
                    dvrName: ret.data.dataMap.dvrName
                };
                vm.submitData.dvrCode = ret.data.dataMap.dvrCode;
                vm.submitData.dvrName = ret.data.dataMap.dvrName;
                vm.submitData.channelNo = ret.data.dataMap.channelNo;
                vm.submitData.warningType = ret.data.dataMap.warningType;
                vm.submitData.warningDatetime = ret.data.dataMap.warningDatetime;
                $('#warningDatetime').val(ret.data.dataMap.warningDatetime);
                vm.submitData.warningReason = ret.data.dataMap.warningReason;
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
        selectDvr:function () {
            var vm=this;
            console.log(JSON.stringify(vm.dvrData))
            vm.submitData.dvrCode=vm.dvrData.dvrCode;
            vm.submitData.dvrName=vm.dvrData.dvrName;
        },
        submitEvent: function() {
          var vm = this;
          vm.submitData.warningDatetime=$('#warningDatetime').val();
          if (vm.submitData.dvrCode == "") {
            layer.msg("请选择录像机");
            return;
          }
          if (vm.submitData.warningType == "") {
            layer.msg("请选择报警类型");
            return;
          }
          if (vm.submitData.warningDatetime == "") {
            layer.msg("请填写报警时间");
            return;
          }
          if (vm.submitData.warningReason == "") {
            layer.msg("请填写报警原因");
            return;
          }
          if (this.$route.query.id) {
            layer.load(2);
            editVideoAlarm(vm.submitData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  layer.msg("编辑视频报警信息成功！");
                  this.$router.push({
                    name: "videoWarning",
					query: {
                      warningType:vm.postData.warningType,
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
            addVideoAlarm(vm.submitData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  layer.msg("新增视频报警信息成功！");
                  this.$router.push({
                    name: "videoWarning",
					query: {
                      warningType:vm.postData.warningType,
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
          ListDigitalVideoRecorder({
              pageSize:1000,
              pageNo:0
          })
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                for (var i = 0; i < ret.data.dataList.length; i++) {
                  vm.videoRecorderList.push({
                    dvrCode: ret.data.dataList[i].dvrCode,
                    dvrName: ret.data.dataList[i].dvrName
                  });
                }
                
              }else {
                  layer.alert(ret.data, { closeBtn: 0 });
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
            name: "videoWarning",
            query: {
              warningType:vm.postData.warningType,
			  pageNo:this.$route.query.pageNo
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

