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
                仓房：
                <select class="select-style" v-model="storehouseGb" @change="getGranary();">
                  <option :value="item" v-for="item in storehouseList" v-text="item.storehouseName"></option>
                </select>
              </span>
              <span>
                廒间：
                <select class="select-style" v-model="warehouseGb">
                  <option :value="item" v-for="item in granaryList" v-text="item.warehouseName"></option>
                </select>
              </span>
              <span>
                用电项目：
                <select class="select-style" v-model="submitData.electricConsumerItem">
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
                  onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"
                  id="startDatetime"
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
import { electricAdd } from "@/api/energyConsumption/public";
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
        storehouseGbCode: "",
        warehouseGbCode: "",
        storehouseName: "",
        warehouseName: "",
        recordType: "",
        electricConsumerItem: "",
        startDatetime: "",
        beforeJobMeterData: ""
      },
      storehouseList: [], //仓房下拉列表
      granaryList: [], //廒间下拉列表
      storehouseGb: "",
      warehouseGb: ""
    };
  },
  methods: {
    submitEvent: function() {
      var vm = this;
      vm.submitData.storehouseGbCode = vm.storehouseGb.storehouseGbCode;
      vm.submitData.warehouseGbCode = vm.warehouseGb.warehouseGbCode;
      vm.submitData.storehouseName = vm.storehouseGb.storehouseName;
      vm.submitData.warehouseName = vm.warehouseGb.warehouseName;
      vm.submitData.startDatetime = $("#startDatetime").val();

      if (vm.submitData.storehouseGbCode == "") {
        layer.msg("请选择仓房");
        return;
      }
      if (vm.submitData.warehouseGbCode == "") {
        layer.msg("请选择廒间");
        return;
      }
      if (vm.submitData.electricConsumerItem == "") {
        layer.msg("请填写用电项目");
        return;
      }
      if (vm.submitData.startDatetime == "") {
        layer.msg("请选择开始时间");
        return;
      }
      layer.load(2);
      electricAdd(vm.submitData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("手动采集电能成功！");
            this.$router.push({
              name: "consumeEnergy_electric"
            });
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.data, { closeBtn: 0 });
        });
    },
    getDropDown: function() {
      //获取下拉项
      var vm = this;

      storehouse()
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            // console.log(ret)
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
          layer.alert(err.data, { closeBtn: 0 });
        });
    },
    getGranary: function() {
      //廒间下拉列表
      var vm = this;
      layer.load(2);
      granary(vm.storehouseGb.storehouseGbCode)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            // console.log(ret)
            vm.granaryList = ret.data.dataList;
          } else {
            if (ret.code == 500 && ret.data == "查询错误，没有数据") {
              vm.granaryList = [];
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          }
        })
        .catch(err => {
          layer.alert(err.data, { closeBtn: 0 });
        });
    },
    detailBack: function() {
      //返回
      this.$router.back(-1);
    }
  },
  mounted() {
    this.getDropDown();
  }
};
</script>
