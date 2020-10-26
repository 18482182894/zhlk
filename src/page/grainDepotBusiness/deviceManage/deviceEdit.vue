<template>
  <div class="content">
    <div class="menuManage userManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">安装信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
                            <span>
                                <label>设备名称：</label>
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.equipmentName">
                            </span>
              <span>
                                <label>设备类型：</label>
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.equipmentType?'计量设备':'仓储设备'">
                            </span>
              <span>
                                <label>设备编号：</label>
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.equipmentId">
                            </span>
              <span>
                                <label>安装费用：</label>
                                <input type="number" class="input-text" v-model="submitData.intallFee">
                            </span>
              <span>
                                <label>维修电话：</label>
                                <input type="text" class="input-text" v-model="submitData.telephone">
                            </span>
              <span>
                                <label>安装位置：</label>
                                <input type="text" class="input-text" v-model="submitData.installPlace">
                            </span>
              <span>
                                <label>安装公司：</label>
                                <input type="text" class="input-text" v-model="submitData.installCompany">
                            </span>
              <span>
                                <label>责任人：</label>
                                <select name="" class="select-style" v-model="installAdmin">
                                    <option v-for="item in staffListData" :value="item" v-text="item.staff_name">
                                    </option>
                                </select>
                            </span>
              <span>
                                <label>下一任责任人：</label>
                                <select name="" class="select-style" v-model="nextInstallAdmin">
                                    <option v-for="item in staffListData" :value="item" v-text="item.staff_name">
                                    </option>
                                </select>
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
  import{ editDeviceInstall} from "../../../api/devicesManage/deviceManage";
  import { staffList} from "@/api/systemManage/staff";
  import{ getDeviceInstall} from "../../../api/devicesManage/deviceManage";
  import { addDeviceInstall} from "../../../api/devicesManage/deviceManage";

  export default {
        name: "deviceEdit",
    data() {
      return {
        type:this.$route.query.type,
        sortOrder: "0", //0 顺序，1 倒序
        postData: {
          equipmentInstall: this.$route.query.id
        },
        postListData:{},
        documentId:[],
        documentName:'',
        listData:[],
        staffListData:[],
        installAdmin:'',
        nextInstallAdmin:'',
        submitData: {
          equipmentInstall: "",
          equipmentName: "",
          equipmentType: "",
          equipmentId: "",
          equipmentCode: "",
          intallFee: "",
          installPlace:'',
          telephone:'',
          installCompany:'',
          installAdmin:'',
          installAdminName:'',
          nextInstallAdmin:'',
          nextInstallAdminName:'',
          memo:''
        },
        editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
      };
    },
    methods: {
      getDetail: function() {
        var vm = this;
        layer.load(2);
        getDeviceInstall(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.submitData.equipmentInstall = ret.data.equipmentInstallDetail.equipmentInstall;
              vm.submitData.equipmentName = ret.data.equipmentInstallDetail.equipmentName;
              vm.submitData.equipmentType = ret.data.equipmentInstallDetail.equipmentType;
              vm.submitData.equipmentId = ret.data.equipmentInstallDetail.equipmentId;
              vm.submitData.equipmentCode = ret.data.equipmentInstallDetail.equipmentCode;
              vm.submitData.intallFee = ret.data.equipmentInstallDetail.intallFee;
              vm.submitData.installPlace = ret.data.equipmentInstallDetail.installPlace;
              vm.submitData.telephone = ret.data.equipmentInstallDetail.telephone;
              vm.submitData.installCompany = ret.data.equipmentInstallDetail.installCompany;
              vm.submitData.installAdmin = ret.data.equipmentInstallDetail.installAdmin;
              vm.submitData.installAdminName = ret.data.equipmentInstallDetail.installAdminName;
              vm.submitData.nextInstallAdmin = ret.data.equipmentInstallDetail.nextInstallAdmin;
              vm.submitData.nextInstallAdminName = ret.data.equipmentInstallDetail.nextInstallAdminName;
              // vm.documentId[0] = ret.data.plan.fileId;
              // vm.documentName = ret.data.plan.fileName;
              vm.$nextTick(function() {

                  vm.installAdmin={
                    staff_id:ret.data.equipmentInstallDetail.installAdmin,
                    staff_name:ret.data.equipmentInstallDetail.installAdminName
                  };
                  vm.nextInstallAdmin={
                    staff_id:ret.data.equipmentInstallDetail.nextInstallAdmin,
                    staff_name:ret.data.equipmentInstallDetail.nextInstallAdminName
                  };

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
          vm.submitData.installAdmin=vm.installAdmin.staff_id;
          vm.submitData.installAdminName=vm.installAdmin.staff_name;
          vm.submitData.nextInstallAdmin=vm.nextInstallAdmin.staff_id;
          vm.submitData.nextInstallAdminName=vm.nextInstallAdmin.staff_name;
        if (vm.submitData.equipmentName == "") {
          layer.msg("请填写设备名称");
          return;
        }
        if (vm.submitData.equipmentType == "") {
          layer.msg("请选择设备类型");
          return;
        }
        if (vm.submitData.equipmentId == "") {
          layer.msg("请填写设备编码");
          return;
        }
        if (vm.submitData.intallFee == "") {
          layer.msg("请填写安装费用");
          return;
        }
        if (vm.submitData.executeType == 1||vm.submitData.executeType == 3) {
          if (vm.submitData.storagePrice == "") {
            layer.msg("请填写维修电话");
            return;
          }
          if (vm.submitData.installPlace == "") {
            layer.msg("请填写安装位置");
            return;
          }
          if (vm.submitData.telephone == "") {
            layer.msg("请填写维修电话");
            return;
          }
        }
        if (vm.submitData.executeType == 2||vm.submitData.executeType == 3) {
          if (vm.submitData.salesPrice == "") {
            layer.msg("请填写计划粮销售价格");
            return;
          }
          if (vm.submitData.salesBeginTime == "") {
            layer.msg("请填写计划销售开始日期");
            return;
          }
          if (vm.submitData.salesEndTime == "") {
            layer.msg("请填写计划销售截至日期");
            return;
          }
        }
        if (vm.submitData.telephone == "") {
          layer.msg("请填写维修电话");
          return;
        }
        if (vm.submitData.installPlace == "") {
          layer.msg("请填写安装位子");
          return;
        }
        if (vm.submitData.installCompany == "") {
          layer.msg("请填写安装公司");
          return;
        }
        if (vm.submitData.installAdmin == "") {
          layer.msg("请填写责任人");
          return;
        }

        if (vm.submitData.nextInstallAdmin == "") {
          layer.msg("请填写下一任责任人");
          return;
        }
        if (vm.type=='edit') {
          layer.load(2);
          editDeviceInstall(vm.submitData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("安装成功！");
                this.$router.push({
                  name: "build",
                  query: {
                    equipmentName:this.$route.query.equipmentName,
                    equipmentCode:this.$route.query.equipmentCode,
                    equipmentType:this.$route.query.equipmentType,
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
          vm.submitData.planId='';
          layer.load(2);
          addDeviceInstall(vm.submitData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("安装成功！");
                this.$router.push({
                  name: "build",
                  query: {
                    equipmentName:this.$route.query.equipmentName,
                    equipmentCode:this.$route.query.equipmentCode,
                    equipmentType:this.$route.query.equipmentType,
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
/*        this.$router.push({//提交后筛选条件带回
          name:this.$route.query.name,
          query: {
            equipmentName:this.$route.query.equipmentName,
            equipmentCode:this.$route.query.equipmentCode,
            equipmentType:this.$route.query.equipmentType,
            pageNo:this.$route.query.pageNo

          }
        });*/
      },
      showPopup: function() {// 展示弹出层
        var vm = this;
        vm.getList();
        vm.editPopup = 1;
      },
      closePopup: function() {// 隐藏弹出层
        var vm = this;
        vm.editPopup = 0;
      },
      getList: function() {//获取来文列表
        var vm = this;
        layer.load(2);
        getDocReviceList(vm.postListData)
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
      changeSortOrder: function() {//倒序
        var vm = this;
        vm.listData.reverse();
      },
      getDropDown: function() {//获取下拉项
        var vm = this;
            staffList({
              pageSize: 1000,
              pageNo: 0
            }).then(ret => {//职工列表
                if (ret.code == 200) {
                  // console.log(JSON.stringify(ret))
                  for (var i = 0; i < ret.data.staffList.length; i++) {
                    vm.staffListData.push({
                      staff_id:ret.data.staffList[i].staff_id,
                      staff_name:ret.data.staffList[i].staff_name
                    });
                  }
                  // vm.staffListData = ret.data.staffList;
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
            }).catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
            });
      },
      detailBack:function () {//返回
        //this.$router.back(-1);
        this.$router.push({
          name:this.$route.query.name,
          query: {
            equipmentName:this.$route.query.equipmentName,
            equipmentCode:this.$route.query.equipmentCode,
            equipmentType:this.$route.query.equipmentType,
            pageNo:this.$route.query.pageNo

          }
        });
      }
    },
    mounted() {
      var vm = this;
        if (this.$route.query.type=='edit') {
          // vm.postData.equipmentInstall=this.$route.query.id;
          // vm.submitData.equipmentName=this.$route.query.data.equipmentName;
          // vm.submitData.equipmentId=this.$route.query.data.equipmentId;
          // vm.submitData.equipmentCode=this.$route.query.data.equipmentCode;

          vm.getDetail();
        }else{
          console.log(JSON.stringify(this.$route.query.data))
          vm.submitData.equipmentName=this.$route.query.data.equipmentName;
          vm.submitData.equipmentId=this.$route.query.data.equipmentId;
          vm.submitData.equipmentCode=this.$route.query.data.equipmentCode;
          vm.submitData.equipmentType=this.$route.query.data.equipmentType;

          vm.getDropDown();

        }
    }
  };
</script>

<style scoped>

</style>
