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
              <!--<span v-if="postData.equipmentCode">-->
              <!--文件编号：-->
              <!--<input type="text" class="input-text" readonly="readonly" v-model="submitData.fileId" >-->
              <!--</span>-->
              <span>
                                所属库点国际编码：
                                <select name="" class="select-style"  v-model="submitData.graindepotGbCode">
                                  <option :value="item.graindepotGbCode" v-for="item in libraryList">{{item.graindepotName}}</option>
                                </select>
                            </span>
              <!--<span>-->
              <!--发文日期：-->
              <!--<input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})"  id="releaseDate" >-->
              <!--</span>-->
              <span>
                                设备类型：
                                <select name="" class="select-style"  v-model="submitData.equipmentType">
                                  <option :value="item.dicInfoCode" v-for="item in unitTypeList">{{item.dicInfoValue}}</option>
                                </select>
                            </span>
              <span>
                                设备名称：
                                <input type="text" class="input-text" v-model="submitData.equipmentName">
                            </span>
              <span>
                                设备规格描述：
                                <input type="text" class="input-text" v-model="submitData.equipmentSpecifications">
                            </span>
              <span>
                                计量单位编码：
                                <select name="" class="select-style"  v-model="submitData.measuringUnitCode">
                                  <option :value="item.dicInfoCode" v-for="item in unitsCodeList">{{item.dicInfoValue}}</option>
                                </select>
                            </span>
              <span>
                                原始记录ID：
                                <input type="text" class="input-text" v-model="submitData.originalId">
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

<script>
  import {addDevice , getDevice ,editDevice} from "../../../api/devicesManage/device";
  import {unitsCode,unitType} from "../../../api/systemManage/dropDown";
  import {
    libraryDropdown
  } from "@/api/systemManage/basicData/library";
  import { checkPhone, uploadPic } from "@/utils/public";
    export default {
        name: "basicinfoEdit",
      data() {
        return {
          sortOrder: "0", //0 顺序，1 倒序
          postData: {
            equipmentId: this.$route.query.id
          },
          libraryList:[],//库点
          unitTypeList:[],//设备类型
          unitsCodeList:[],//计量单位编码
          submitData: {
            equipmentId:'',
            graindepotGbCode: "",
            equipmentType: "",
            equipmentName: "",
            equipmentSpecifications: "",
            measuringUnitCode: "",
            originalId:'',
          },
          editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
        };
      },
      methods: {
        getDetail: function() {
          var vm = this;
          layer.load(2);
          getDevice(vm.postData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                console.log(JSON.stringify(ret))
                vm.submitData.equipmentId = ret.data.equipmentInfor.equipmentId;
                vm.submitData.graindepotGbCode = ret.data.equipmentInfor.graindepotGbCode;
                vm.submitData.equipmentType = ret.data.equipmentInfor.equipmentType;
                vm.submitData.equipmentName = ret.data.equipmentInfor.equipmentName;
                vm.submitData.equipmentSpecifications = ret.data.equipmentInfor.equipmentSpecifications;
                // $('#releaseDate').val(ret.data.receivedDocument.releaseDate);
                vm.submitData.measuringUnitCode = ret.data.equipmentInfor.measuringUnitCode;
                vm.submitData.originalId = ret.data.equipmentInfor.originalId;
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
          vm.submitData.releaseDate=$('#releaseDate').val();
          if (vm.submitData.maintainAdminName == "") {
            layer.msg("请填写负责人");
            return;
          }
          if (vm.submitData.maintainFee == "") {
            layer.msg("请填写保养费用");
            return;
          }
          if (this.$route.query.id) {
            layer.load(2);
            editDevice(vm.submitData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  layer.msg("编辑设备成功！");
                  this.$router.push({
                    name: "basicinfo"
                  });
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
          } else {
            vm.submitData.planId='';
            layer.load(2);
            addDevice(vm.submitData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  layer.msg("新增设备成功！");
                  this.$router.push({
                    name: "basicinfo"
                  });
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
          }
          this.$router.push({//提交后筛选条件带回
            name: "basicinfo",
            query: {
              equipmentName:this.$route.query.equipmentName,
              equipmentType:this.$route.query.equipmentType,
              pageNo:this.$route.query.pageNo

            }
          });
        },
        getDropDown: function() {//获取下拉项
          var vm = this;
          libraryDropdown({}).then(ret => {//库点下拉
            if (ret.code == 200) {
              // console.log(JSON.stringify(ret));
              vm.libraryList = ret.data.dataList;
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          }).catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
          unitType({}).then(ret => {//设备类型
            if (ret.code == 200) {
              console.log(JSON.stringify(ret));
              vm.unitTypeList = ret.data.dataList;
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          }).catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
          unitsCode({}).then(ret => {//计量单位编码
            if (ret.code == 200) {
              console.log(JSON.stringify(ret));
              vm.unitsCodeList = ret.data.dataList;
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          }).catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
        },
        detailBack:function () {//返回
         // this.$router.back(-1);
          this.$router.push({
            name: "basicinfo",
            query: {
              equipmentName:this.$route.query.equipmentName,
              equipmentType:this.$route.query.equipmentType,
              pageNo:this.$route.query.pageNo

            }
          });
        }
      },
      mounted() {
        var vm = this;
        if (this.$route.query.id) {
          vm.getDetail();
        }else{
          vm.getDropDown();
        }
      }
    };
</script>

<style scoped>

</style>
