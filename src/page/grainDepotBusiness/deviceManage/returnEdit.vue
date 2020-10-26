<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">借用信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
                                设备名称：
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.equipmentName">
                            </span>
              <span>
                                设备类型：
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.equipmentType=='0'?'计量(检验)设备':'仓储设备'">
                            </span>
              <span>
                                设备编号：
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.equipmentId">
                            </span>
              <span>
                                用途：
                                <input type="text" class="input-text" v-model="submitData.purpose">
                            </span>
              <span>
                                借用时间：
                                <input type="text"  class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',})"  id="borrowDatetime" >
                            </span>
              <span>
                                借用人：
                                <select name="" class="select-style" v-model="borrowPerson">
                                    <option v-for="item in staffListData" :value="item" v-text="item.staff_name">
                                    </option>
                                </select>
                            </span>
              <span>
                                借用仓库：
                                <select name="" class="select-style" v-model="borrowGraindepot">
                                    <option v-for="item in graindepotList" :value="item" v-text="item.graindepotName">
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
  import {editBorrow , getBorrow , addBorrow} from "../../../api/devicesManage/borrow";

  import { staffList} from "@/api/systemManage/staff";
  import {
    graindepot
  } from "@/api/systemManage/dropDown";
    export default {
        name: "returnEdit",
      data() {
        return {
          sortOrder: "0", //0 顺序，1 倒序
          postData: {
            id:''
          },
          graindepotList:[],
          staffListData:[],
          borrowPerson:'',
          borrowGraindepot:'',
          submitData: {
            equipmentName:"",
            equipmentId:'',
            equipmentCode:'',
            equipmentType:'',

            id: "",
            purpose: "",
            borrowDatetime:'',
            borrowPerson: "",
            borrowPersonName: "",
            borrowGraindepot: "",
            borrowGraindepotName: "",
          },
          editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
        };
      },
      methods: {
        getDetail: function() {
          var vm = this;
          layer.load(2);
          getBorrow(vm.postData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                // console.log(JSON.stringify(ret))

                vm.submitData.equipmentName = ret.data.dataMap.equipmentName;
                vm.submitData.equipmentId = ret.data.dataMap.equipmentId;
                vm.submitData.equipmentCode = ret.data.dataMap.equipmentCode;
                vm.submitData.equipmentType = ret.data.dataMap.equipmentType;

                vm.submitData.id = ret.data.dataMap.id;
                vm.submitData.purpose = ret.data.dataMap.purpose;

                // vm.submitData.borrowPerson = ret.data.dataMap.borrowPerson;
                // vm.submitData.borrowPersonName = ret.data.dataMap.borrowPersonName;

                // vm.submitData.borrowGraindepot = ret.data.dataMap.borrowGraindepot;
                // vm.submitData.borrowGraindepotName = ret.data.dataMap.borrowGraindepotName;

                $('#borrowDatetime').val(ret.data.dataMap.borrowDatetime);

                vm.$nextTick(function() {

                  vm.borrowPerson={
                    staff_id:ret.data.dataMap.borrowPerson,
                    staff_name:ret.data.dataMap.borrowPersonName
                  };
                  vm.borrowGraindepot={
                    graindepotGbCode:ret.data.dataMap.borrowGraindepot,
                    graindepotName:ret.data.dataMap.borrowGraindepotName
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
          vm.submitData.borrowDatetime=$('#borrowDatetime').val();

          vm.submitData.borrowPerson=vm.borrowPerson.staff_id;
          vm.submitData.borrowPersonName=vm.borrowPerson.staff_name;

          vm.submitData.borrowGraindepot=vm.borrowGraindepot.graindepotGbCode;
          vm.submitData.borrowGraindepotName=vm.borrowGraindepot.graindepotName;

          if (vm.submitData.purpose == "") {
            layer.msg("请填写用途");
            return;
          }
          if (vm.submitData.borrowDatetime == "") {
            layer.msg("请填写借用时间");
            return;
          }
          if (vm.submitData.borrowPersonName == "") {
            layer.msg("请填写借用人");
            return;
          }
          if (vm.submitData.borrowGraindepotName == "") {
            layer.msg("请填写借用仓库");
            return;
          }
          if (this.$route.query.type=='edit') {
            layer.load(2);
           editBorrow(vm.submitData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  layer.msg("借用成功！");
                  this.$router.push({
                    name: "return"
                  });
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
          } else {
            vm.submitData.id='';
            layer.load(2);
            addBorrow(vm.submitData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  layer.msg("借用成功！");
                  this.$router.push({
                    name: "return"
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
          graindepot('').then(ret => {//仓房信息下拉列表
            if (ret.code == 200) {
                  // console.log(JSON.stringify(ret))
              vm.graindepotList = ret.data.dataList;
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
            name: "return",
            query: {
              equipmentType:this.$route.query.equipmentType,
              returnFlg:this.$route.query.returnFlg
            }
          });
        }
      },
      mounted() {
        var vm = this;
        if (this.$route.query.type=='add') {
          vm.postData.id=this.$route.query.data.id;

          vm.getDetail();
        }
        if (this.$route.query.type=='edit') {
          vm.postData.id=this.$route.query.data.id;

          vm.getDetail();
        }else{
          // console.log(JSON.stringify(this.$route.query.data))
          vm.submitData.equipmentName=this.$route.query.data.equipmentName;
          vm.submitData.equipmentId=this.$route.query.data.equipmentId;
          vm.submitData.equipmentCode=this.$route.query.data.equipmentCode;
          vm.submitData.equipmentType=this.$route.query.data.equipmentType;

          vm.getDropDown();

        }
      }
    };
</script>
