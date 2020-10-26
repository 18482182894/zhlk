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
                            <span v-if="postData.reverseJobId">
                                倒仓单号：
                                <input type="text" class="input-text" v-model="submitData.reverseJobId">
                            </span>
                            <span>
                                倒出仓：
                                <select name="" class="select-style" v-model="detailData.outStorehouseGbCode" @change="getWarehouse('out',detailData.outStorehouseGbCode);">
                                    <option v-for="item in storehouseList" :value="item.storehouseGbCode" v-text="item.storehouseName">
                                    </option>
                                </select>
                            </span>
                            <span>
                                倒出廒间：
                                <select name="" class="select-style" v-model="submitData.outWarehouseGbCode">
                                    <option v-for="item in outGranaryList" :value="item.warehouseGbCode" v-text="item.warehouseName">
                                    </option>
                                </select>
                            </span>
                            <span>
                                倒入仓：
                                <select name="" class="select-style" v-model="detailData.inStorehouseGbCode" @change="getWarehouse('in',detailData.inStorehouseGbCode);">
                                    <option v-for="item in storehouseList" :value="item.storehouseGbCode" v-text="item.storehouseName">
                                    </option>
                                </select>
                            </span>
                            <span>
                                倒入廒间：
                                <select name="" class="select-style" v-model="submitData.inWarehouseGbCode">
                                    <option v-for="item in inGranaryList" :value="item.warehouseGbCode" v-text="item.warehouseName">
                                    </option>
                                </select>
                            </span>
                            <!-- <span>
                                粮食品种：
                                <select name="" class="select-style" v-model="submitData.storehouseType">
                                    <option v-for="item in storehouseTypeList" :value="item.dicInfoCode" v-text="item.dicInfoValue"></option>
                                </select>
                            </span> -->
                            <span>
                                数量（千克）：
                                <input type="number" class="input-text" v-model="submitData.grainNumber">
                            </span>
                            <!-- <span>
                                创建日期：
                                <input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})"  id="startTime" >
                            </span> -->
                            
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
  import { reverseDetail, reverseAdd, reverseEdit } from "@/api/business/warehousingStock/reverse";
  import { storehouse, granary,  } from "@/api/systemManage/dropDown";
export default {
  name: "warehouseEdit",
  data() {
    return {
        postData:{
            reverseJobId:this.$route.query.id
        },
        detailData:{
          outStorehouseGbCode:'',
          inStorehouseGbCode:''
        },
        submitData:{
            reverseJobId:'',
            grainNumber:'',
            outWarehouseGbCode:'',
            inWarehouseGbCode:'',
        },
        storehouseList:'',//仓房下拉
        outGranaryList:'',//廒间
        inGranaryList:''//廒间
    }
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      reverseDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            console.log(JSON.stringify(ret.data.reverseJob))
            vm.detailData.outStorehouseGbCode=ret.data.reverseJob.outStorehouseGbCode;
            vm.detailData.inStorehouseGbCode=ret.data.reverseJob.inStorehouseGbCode;
            vm.submitData.reverseJobId = ret.data.reverseJob.reverseJobId;
            vm.submitData.grainNumber = ret.data.reverseJob.grainNumber;
            vm.submitData.outWarehouseGbCode = ret.data.reverseJob.outWarehouseGbCode;
            vm.submitData.inWarehouseGbCode = ret.data.reverseJob.inWarehouseGbCode;
            
            vm.$nextTick(function() {
              vm.getWarehouse('out',ret.data.reverseJob.outStorehouseGbCode);
              vm.getWarehouse('in',ret.data.reverseJob.inStorehouseGbCode);
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
      if (vm.submitData.outWarehouseGbCode == "") {
        layer.msg("请选择倒出廒间");
        return;
      }
      if (vm.submitData.inWarehouseGbCode == "") {
        layer.msg("请选择倒入廒间");
        return;
      }
      if (vm.submitData.grainNumber == "") {
        layer.msg("请填写数量");
        return;
      }
      if (this.$route.query.id) {
        layer.load(2);
        reverseEdit(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("编辑倒仓作业成功！");
              this.$router.push({
                name: "reverse",
                query: {
                  grainKindId: this.$route.query.grainKindId,
                  pageNo: this.$route.query.pageNo,
                  startDate: this.$route.query.startDate,
                  endDate: this.$route.query.endDate
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
        reverseAdd(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增倒仓作业成功！");
              this.$router.push({
                name: "reverse"
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
      getWarehouse:function (type,id) {
        var vm = this;
        
        granary(id).then(ret => {//廒间
            if (ret.code == 200) {
              // console.log(JSON.stringify(ret))
              if (type=='out') {
                vm.outGranaryList = ret.data.dataList;
              }else{
                vm.inGranaryList = ret.data.dataList;                
              }
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
    },
    detailBack:function () {
        //this.$router.back(-1);
      this.$router.push({
        name: "reverse",
        query: {
          grainKindId: this.$route.query.grainKindId,
          pageNo: this.$route.query.pageNo,
          startDate: this.$route.query.startDate,
          endDate: this.$route.query.endDate
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
