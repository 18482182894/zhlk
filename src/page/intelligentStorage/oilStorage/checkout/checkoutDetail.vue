<template>
    <div class="content">
        <div class="menuManage userManage">
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">基础信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail">
                        <div>

                            <span>
                                卡号：
                                <label v-text="detailData.cardNo"></label>
                            </span>
                            <!-- <span>
                                扫二维码：
                                <label v-text="detailData.storehouseName"></label>
                            </span> -->
                            <span>
                                粮油品种：
                                <label v-text="detailData.grainVariety"></label>
                            </span>
                            <span>
                                粮食性质：
                                <label v-text="detailData.grainAttribute"></label>
                            </span>
                            <span>
                                检验人：
                                <label v-text="detailData.testPerson"></label>
                            </span>
                            <!-- <span>
                                水分增扣量(千克)：
                                <label v-text="detailData.waterIncrementDecrement"></label>
                            </span>
                            <span>
                                杂质增扣量(千克)：
                                <label v-text="detailData.impurityIncrementDecrement"></label>
                            </span>
                            <span>
                                其他扣量(千克)：
                                <label v-text="detailData.otherIncrementDecrement"></label>
                            </span> -->
                        </div>
                    </div>
                </div>
            </div>  
            <table class="customTable">
              <thead>
                <tr>
                  <th style="width:10%;"><input type="checkbox" ></th>
                  <th style="width:10%;">序号</th>
                  <th style="width:10%;">指标分类</th>
                  <th style="width:10%;">指标项</th>
                  <th style="width:20%;">标准值</th>
                  <th style="width:10%;">结果值</th>
                </tr>
              </thead>
              <tbody>
                    <tr v-for="(item,i) in detailData.details">
                      <td><input type="checkbox" ></td>
                      <td v-text="i+1">1</td>
                      <td v-text="item.indicatorType"></td>
                      <td v-text="item.indicatorItem"></td>
                      <td v-text="item.upperLimitValue"></td>
                      <td v-text="item.resultValue"></td>
                    </tr>
              </tbody>
            </table>
            <div class="detail-back">
                <button @click="detailBack();">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
import { checkoutDetail} from "@/api/intelligentStorage/public"; 
import { staffDetail } from "@/api/systemManage/staff";
export default {
  name: "companyDetail",
  data() {
    return {
      postData: {
        registorNo: this.$route.query.id
      },
      detailData: "",
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      checkoutDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData = ret.data.dataMap;
            vm.detailData.details.forEach(item => {
              item.upperLimitValue = item.upperLimitValue.slice(1, 3)
            })
            staffDetail({
                staff_id:vm.detailData.testPerson
              }).then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  vm.detailData.testPerson = ret.data.staffDetail.staff_name;
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    detailBack:function () {
      var vm = this;
      if(this.$route.query.type){
        this.$router.back(-1);
      }else{
          vm.$router.push({
            name: "oilStorageStep",
            query: {
              step: 3
            }
          });
      }
    }
  },
  mounted() {
    var vm = this;
    vm.getDetail();
  }
};
</script>
