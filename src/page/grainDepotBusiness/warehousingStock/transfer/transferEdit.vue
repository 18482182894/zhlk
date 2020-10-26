<template>
    <div class="content">
        <div class="menuManage userManage">
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">基础信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail userManage-edit">
                        <div>
                            <span v-if="postData.transferId">
                                记录编号：
                                <input type="text" class="input-text" v-model="submitData.transferId">
                            </span>
                            <span>
                                移交仓房：
                                <select name="" class="select-style" v-model="detailData.storehouseGbCode"  @change="getWarehouse(detailData.storehouseGbCode);">
                                    <option v-for="item in storehouseList" :value="item.storehouseGbCode" v-text="item.storehouseName">
                                    </option>
                                </select>
                            </span>
                            <span>
                                移交廒间：
                                <select name="" class="select-style" v-model="submitData.warehouseGbCode">
                                    <option v-for="item in granaryList" :value="item.warehouseGbCode" v-text="item.warehouseName">
                                    </option>
                                </select>
                            </span>
                            <!-- <span>
                                移交货位：
                                <input type="text" class="input-text" v-model="submitData.enterpriseCode">
                            </span> -->
                           <!--  <span>
                                原保管员：
                                <input type="text" class="input-text" v-model="detailData.nowAdmin">
                            </span> -->
                            <span>
                                新保管员：
                                <select name="" class="select-style" v-model="submitData.newAdminId">
                                    <option v-for="item in staffListData" :value="item.staff_id" v-text="item.staff_name">
                                    </option>
                                </select>
                            </span>
                            <span>
                                交换日期：
                                <input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})"  id="exchangeDate" >
                            </span>
                            <span>
                                监交人：
                                <select name="" class="select-style" v-model="submitData.monitorId">
                                    <option v-for="item in staffListData" :value="item.staff_id" v-text="item.staff_name">
                                    </option>
                                </select>
                            </span>
                            <span>
                                登记日期：
                                <input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})"  id="registorDate" >
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
  import { transferDetail, transferAdd, transferEdit } from "@/api/business/warehousingStock/transfer";
  import { staffList} from "@/api/systemManage/staff";
  import { storehouse, granary } from "@/api/systemManage/dropDown";
export default {
  name: "warehouseEdit",
  data() {
    return {
        postData:{
            transferId:this.$route.query.id
        },
        detailData:{
          storehouseGbCode:'',
          nowAdmin:''
        },
        staffListData:'',
        submitData:{
            transferId:'',
            warehouseGbCode:'',
            newAdminId:'',
            exchangeDate:'',
            registorDate:'',
            monitorId:''
        },
        storehouseList:'',//仓房下拉
        granaryList:''//廒间
    }
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      transferDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData.storehouseGbCode=ret.data.transfer.newStorehouseGbCode;
            vm.detailData.nowAdmin=ret.data.transfer.nowAdmin;
            vm.submitData.transferId = ret.data.transfer.transferId;
            vm.submitData.warehouseGbCode = ret.data.transfer.newWarehouseGbCode;
            vm.submitData.newAdminId = ret.data.transfer.newAdmin;
            
            vm.submitData.exchangeDate = ret.data.transfer.exchangeDate.substr(0,10);
            $('#exchangeDate').val(ret.data.transfer.exchangeDate.substr(0,10));
            vm.submitData.registorDate = ret.data.transfer.registorDate.substr(0,10);
            $('#registorDate').val(ret.data.transfer.registorDate.substr(0,10));
            vm.submitData.monitorId = ret.data.transfer.monitor;
            vm.$nextTick(function() {
              vm.getWarehouse(ret.data.transfer.newStorehouseGbCode);
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
      if (vm.submitData.warehouseGbCode == "") {
        layer.msg("请选择廒间");
        return;
      }
      if (vm.submitData.newAdminId == "") {
        layer.msg("请填写新保管员");
        return;
      }
      if (vm.submitData.monitorId == "") {
        layer.msg("请填写监交人");
        return;
      }
      vm.submitData.exchangeDate = $("#exchangeDate").val();
      if (vm.submitData.exchangeDate == "") {
        layer.msg("请填写交换日期");
        return;
      }
      vm.submitData.registorDate = $("#registorDate").val();
      if (vm.submitData.registorDate == "") {
        layer.msg("请填写登记日期");
        return;
      }
      if (this.$route.query.id) {
        layer.load(2);
        transferEdit(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("编辑移交记录成功！");
              this.$router.push({
                name: "transfer",
                query: {
                  storehouseGbCode: this.$route.query.storehouseGbCode,
                  nowAdmin: this.$route.query.nowAdmin,
                  newAdmin: this.$route.query.newAdmin,
                  exchangeStartDate: this.$route.query.exchangeStartDate,
                  exchangeEndDate: this.$route.query.exchangeEndDate,
                  pageNo: this.$route.query.pageNo
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
        transferAdd(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增移交记录成功！");
              this.$router.push({
                name: "transfer"
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
      getWarehouse:function (id) {
        var vm = this;
        
        granary(id).then(ret => {//廒间
            if (ret.code == 200) {
              // console.log(JSON.stringify(ret))
              vm.granaryList = ret.data.dataList;
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
        }).catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
        });
      },
    getDropDown: function() {//获取下拉项
      var vm = this;
      storehouse('').then(ret => {//仓房
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.storehouseList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
      }).catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
      });
      staffList({
        pageSize: 1000,
        pageNo: 0
      }).then(ret => {//职工列表
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.staffListData = ret.data.staffList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
      }).catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
      });
    },
    detailBack:function () {
       // this.$router.back(-1);
      this.$router.push({
        name: "transfer",
        query: {
          storehouseGbCode: this.$route.query.storehouseGbCode,
          nowAdmin: this.$route.query.nowAdmin,
          newAdmin: this.$route.query.newAdmin,
          pageNo: this.$route.query.pageNo,
          exchangeStartDate: this.$route.query.exchangeStartDate,
          exchangeEndDate: this.$route.query.exchangeEndDate,
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
}
</script>
