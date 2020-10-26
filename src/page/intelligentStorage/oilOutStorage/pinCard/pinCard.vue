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
                                卡号：
                                <input type="text" class="input-text" v-model="submitData.reverseJobId">
                            </span>
                            <span>
                                是否复查：
                                <input type="number" class="input-text" v-model="submitData.grainNumber">
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div>
              <div class="btn btn-add" @click="jumpEdit();">
                  <img src="../../../../../static/images/add.png" alt="">
                  <label>新增</label>
              </div>
              <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
                <option value="">排序方式</option>
                <option value="0">顺序</option>
                <option value="1">倒序</option>
              </select>
            </div>
            <table class="customTable">
              <thead>
                <tr>
                  <th style="width:10%;"><input type="checkbox" ></th>
                  <th style="width:10%;">序号</th>
                  <th style="width:10%;">卡号</th>
                  <th style="width:10%;">入库单号</th>
                  <th style="width:10%;">是否复查</th>
                  <th style="width:15%;">销卡时间</th>
                  <th style="width:30%;">操作</th>
                </tr>
              </thead>
              <tbody>
                  <!-- <tr v-for="(item,i) in listData">
                      <td><input type="checkbox" :value="item.billId" v-model="delList.billIdList" @change="clickChange();"></td>
                      <td v-if="sortOrder=='0'" v-text="i+1"></td>
                      <td v-else v-text="listData.length-i"></td>
                      <td v-text="item.billId"></td>
                      <td v-text="item.deliveryCustomer"></td>
                      <td v-text="item.billMan"></td>
                      <td v-text="item.billDate"></td>
                      <td v-text="item.shipingCount"></td>
                      <td v-text="item.receivedMoney"></td>
                      <td v-text="item.applyId"></td>
                      <td>
                        <div class="table-btn btn-yellow" @click="showPopup(item.billId,'detail');">详情</div>
                        <div class="table-btn btn-red" @click="delData(item.billId);">删除</div>
                      </td>
                  </tr> -->
                          <tr>
                            <td><input type="checkbox" ></td>
                            <td>1</td>
                            <td>CF2394949</td>
                            <td>2号</td>
                            <td>小麦</td>
                            <td>2018-09-06 12:23:56</td>
                            <td>
                                <div class="table-btn btn-yellow" @click="jumpDetail(item.formulaId);">详情</div>
                                <div class="table-btn btn-green" @click="jumpEdit(item.formulaId);">销卡</div>
                            </td>
                          </tr>
              </tbody>
            </table>
            <div class="edit-btn">
                <button class="edit-submit" @click="submitEvent();">提交</button>
                <button class="edit-back" @click="detailBack();">返回</button>
            </div>
        </div>
    </div>
</template>

<style type="text/css" scoped>
  .tag-box .edit-btn{
    margin-top: 15px;
  }
</style>
<script>
  import { reverseDetail, reverseAdd, reverseEdit } from "@/api/business/warehousingStock/reverse";
  import { storehouse, granary,  } from "@/api/systemManage/dropDown";
export default {
  name: "warehouseEdit",
  data() {
    return {
        sortOrder: "0", //0 顺序，1 倒序
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
