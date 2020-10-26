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
                借电仓房：
                <select
                  class="select-style excision"
                  v-model="borrowStorehouseGb"
                  @change="getGranary(1);"
                >
                  <option value>请选择</option>
                  <option :value="item" v-for="item in storehouseList" v-text="item.storehouseName"></option>
                </select>
              </span>
              <span>
                借电廒间：
                <select class="select-style excision" v-model="borrowWarehouseGb">
                  <option value>请选择</option>
                  <option
                    :value="item"
                    v-for="item in granaryBorrowList"
                    v-text="item.warehouseName"
                  ></option>
                </select>
              </span>
              <span>
                被借仓房：
                <select
                  class="select-style excision"
                  v-model="borrowedStorehouse"
                  @change="getGranary(2);"
                >
                  <option value>请选择</option>
                  <option :value="item" v-for="item in storehouseList" v-text="item.storehouseName"></option>
                </select>
              </span>
              <span>
                被借廒间：
                <select class="select-style excision" v-model="borrowedWarehouseGb">
                  <option value>请选择</option>
                  <option
                    :value="item"
                    v-for="item in granaryBeBorrowedList"
                    v-text="item.warehouseName"
                  ></option>
                </select>
              </span>
              <span>
                借电项目
                <select class="select-style" v-model="submitData.borrowItem">
                  <option value="1">熏蒸作业</option>
                  <option value="2">通风作业</option>
                  <option value="3">低温储粮</option>
                  <option value="4">值仓</option>
                  <option value="5">其它</option>
                </select>
              </span>
              <span>
                开始时间：
                <input
                  type="text"
                  class="input-text Wdate"
                  onclick="WdatePicker({minDate:'%y-%M-%d',dateFmt:'yyyy-MM-dd HH:mm:ss'})"
                  id="startDatetime"
                />
              </span>
              <span>
                结束时间：
                <input
                  type="text"
                  class="input-text Wdate"
                  onclick="WdatePicker({minDate:'#F{$dp.$D(\'startDatetime\')',dateFmt:'yyyy-MM-dd HH:mm:ss'})"
                  id="endDatetime"
                />
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
import { borrowElectricityAdd } from "@/api/energyConsumption/public";
import {
  graindepot,
  storehouse,
  granary,
  cargo
} from "@/api/systemManage/dropDown";
export default {
  name: "planManageEdit",
  data() {
    return {
      submitData: {
        borrowWarehouseGbCode: "",
        borrowedWarehouseGbCode: "",
        borrowWarehouseName: "",
        borrowedWardhouseName: "",
        borrowItem: "",
        startDatetime: "",
        endDatetime: "",
        borrowStorehouseGbCode: "",
        borrowStorehouseName: "",
        borrowedStorehouseGbCode: "",
        borrowedStorehouseName: ""
      },
      storehouseList: [], //仓房下拉列表
      granaryBorrowList: [], //借电廒间下拉列表
      granaryBeBorrowedList: [], //被借电廒间下拉列表
      borrowWarehouseGb: "", //借电廒间
      borrowStorehouseGb: "", //借电仓房
      borrowedWarehouseGb: "", //被借电廒间
      borrowedStorehouse: "" //被借仓房
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      getDocRevice(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.submitData.documentId = ret.data.receivedDocument.documentId;
            vm.submitData.fileId = ret.data.receivedDocument.fileId;
            vm.submitData.fileName = ret.data.receivedDocument.fileName;
            vm.submitData.releaseDate = ret.data.receivedDocument.releaseDate;
            $("#releaseDate").val(ret.data.receivedDocument.releaseDate);
            vm.submitData.type = ret.data.receivedDocument.type;
            vm.submitData.planName = ret.data.receivedDocument.planName;
            vm.submitData.executeType = ret.data.receivedDocument.executeType;
            vm.submitData.grainKind = ret.data.receivedDocument.grainKind;
            vm.submitData.grainAttribute =
              ret.data.receivedDocument.grainAttribute;
            vm.submitData.grainOilLevel =
              ret.data.receivedDocument.grainOilLevel;
            vm.submitData.attachmentFile =
              ret.data.receivedDocument.attachmentFile;
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
      vm.submitData.borrowWarehouseGbCode =
        vm.borrowWarehouseGb.warehouseGbCode;
      vm.submitData.borrowWarehouseName = vm.borrowWarehouseGb.warehouseName;
      vm.submitData.borrowedWarehouseGbCode =
        vm.borrowedWarehouseGb.warehouseGbCode;
      vm.submitData.borrowedWardhouseName =
        vm.borrowedWarehouseGb.warehouseName;
      vm.submitData.borrowStorehouseGbCode =
        vm.borrowStorehouseGb.storehouseGbCode;
      vm.submitData.borrowStorehouseName = vm.borrowStorehouseGb.storehouseName;
      vm.submitData.borrowedStorehouseGbCode =
        vm.borrowedStorehouse.storehouseGbCode;
      vm.submitData.borrowedStorehouseName =
        vm.borrowedStorehouse.storehouseName;
      vm.submitData.startDatetime = $("#startDatetime").val();
      vm.submitData.endDatetime = $("#endDatetime").val();

      layer.load(2);
      borrowElectricityAdd(vm.submitData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("新增借电成功！");
            this.$router.push({
              name: "borrowElectricity"
            });
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getDropDown: function() {
      //获取下拉项
      var vm = this;

      storehouse()
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            console.log(ret);
            vm.storehouseList = ret.data.dataList;
          } else {
            if (ret.code == 500 && ret.data == "查询错误，没有数据") {
              vm.storehouseList = [];
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getGranary: function(type) {
      //廒间下拉列表
      var vm = this;
      layer.load(2);
      var id;
      if (type == 1) {
        id = vm.borrowStorehouseGb.storehouseGbCode;
      } else {
        id = vm.borrowedStorehouse.storehouseGbCode;
      }
      granary(id)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            if (type == 1) {
              vm.granaryBorrowList = ret.data.dataList;
            } else {
              vm.granaryBeBorrowedList = ret.data.dataList;
            }
          } else {
            if (ret.code == 500 && ret.data == "查询错误，没有数据") {
              vm.granaryList = [];
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    detailBack: function() {
      //返回
      this.$router.back(-1);
    }
  },
  mounted() {
    var vm = this;
    //     vm.getDetail();
    vm.getDropDown();
    // if (this.$route.query.id) {
    //     vm.getDetail();
    // }else{
    //     vm.getDropDown();
    // }
    // uploadPic("uploadPic", function(ret) {
    //   if (ret.code == 200) {
    //   } else {
    //     layer.alert("上传文件出错", { closeBtn: 0 });
    //   }
    // });
  }
};
</script>
