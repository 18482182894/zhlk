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
                            <span>
                                姓名：
                                <input type="number" class="input-text" v-model="submitData.grainNumber">
                            </span>
                            <span>
                                职务：
                                <input type="number" class="input-text" v-model="submitData.grainNumber">
                            </span>
                            <span>
                                职业资质：
                                <input type="number" class="input-text" v-model="submitData.grainNumber">
                            </span>
                            <span>
                                身体状态：
                                <input type="number" class="input-text" v-model="submitData.grainNumber">
                            </span>
                            <span>
                                任务分工：
                                <input type="number" class="input-text" v-model="submitData.grainNumber">
                            </span>
                            <span>
                                是否外请人员：
                                <input type="number" class="input-text" v-model="submitData.grainNumber">
                            </span>
                            <span>
                                作业目的：
                                <input type="number" class="input-text" v-model="submitData.grainNumber">
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
<style type="text/css" scoped>
  .userManage-detail .edit-code{
    margin: 0;
  }
  span .table-btn{
    display: inline-block;
    vertical-align: bottom;
  }
</style>
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
        granaryList:''//廒间
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
            vm.submitData.outWarehouseGbCode = ret.data.reverseJob.enterpriseCode;
            vm.submitData.inWarehouseGbCode = ret.data.reverseJob.inWarehouseGbCode;
            
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
                name: "reverse"
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
    getDropDown: function() {//获取下拉项
      var vm = this;
      storehouse({}).then(ret => {//仓房
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.storehouseList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
      }).catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
      });
      granary({}).then(ret => {//廒间
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
    detailBack:function () {
        this.$router.back(-1);
    }
  },
  mounted () {
      var vm=this;
      // if (this.$route.query.id) {
      //     vm.getDetail();
      // }else{
      //   vm.getDropDown();
      // }
  }
}
</script>
