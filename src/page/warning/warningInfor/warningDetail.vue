<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">基础信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div class="detail-div_1">
                            <span class="detail-tittle">
                                报警类型：粮温报警
                                <label v-text="detailData.grainVarietyName"></label>
                            </span>
              <div class="detail-content">
              <span>
                                仓内条件：
                                <label v-text="detailData.inventoryPropertyValue"></label>
                            </span>
              <span>
                                温度：23度
                                <label v-text="detailData.grainOilLevel"></label>
                            </span>
              <span>
                                湿度：20%
                                <label v-text="detailData.price"></label>
                            </span>
                <br>
              <span style="margin-left: 25%">
                                最高粮温：23度
                                <label v-text="detailData.memo" ></label>
                            </span>

              <span>
                                最低粮温：13度
                                <label v-text="detailData.grainVarietyName"></label>
                            </span>
                <br>
              <span style="margin-left: 25%">
                                粮食最高水分：5%
                                <label v-text="detailData.inventoryPropertyValue"></label>
                            </span>
              <span>
                                粮食最低水分：1%
                                <label v-text="detailData.grainOilLevel"></label>
                            </span>

              <br>
              <span style="margin-left: 25%">
                                二氧化碳：22%
                                <label v-text="detailData.inventoryPropertyValue"></label>
                            </span>
              <span>
                                氧气：25%
                                <label v-text="detailData.inventoryPropertyValue"></label>
                            </span>
              </div>
              <div class="line"></div>
              <div>
              <span>
                                仓外条件：
                                <label v-text="detailData.inventoryPropertyValue"></label>
                            </span>
              <span>
                                温度：16度
                                <label v-text="detailData.inventoryPropertyValue"></label>
                            </span>
              <span>
                                湿度：20%
                                <label v-text="detailData.inventoryPropertyValue"></label>
                            </span>
                <br>
              <span style="margin-left: 25%">
                                天气：多云
                                <label v-text="detailData.inventoryPropertyValue"></label>
                            </span>
              <span>
                                风力：5
                                <label v-text="detailData.inventoryPropertyValue"></label>
                            </span>
              </div>

            </div>
            <!-- <div class="detail-div_2">
                 <span class="detail-tittle">
                                报警类型：Q2345667
                                <label v-text="detailData.grainVarietyName"></label>
                            </span>

              <span class="detail-tittle">
                                O₂：23度
                                <label v-text="detailData.inventoryPropertyValue"></label>
                            </span>
                <br>
              <span style="margin-left: 25%">
                                CO₂：23度
                                <label v-text="detailData.inventoryPropertyValue"></label>
                            </span>
                <br>
              <span style="margin-left: 25%">
                                N₂：23度
                                <label v-text="detailData.inventoryPropertyValue"></label>
                            </span>


            </div>
            <div class="detail-div_3">

              <span >
                                报警类型：23度
                                <label v-text="detailData.inventoryPropertyValue"></label>
                            </span>

              <span>
                                到期时间：23度
                                <label v-text="detailData.inventoryPropertyValue"></label>
                            </span>


            </div>
            <div class="detail-div_3">

              <span >
                                报警类型：23度
                                <label v-text="detailData.inventoryPropertyValue"></label>
                            </span>

              <span>
                                虫数：23度
                                <label v-text="detailData.inventoryPropertyValue"></label>
                            </span>


            </div> -->
          </div>
        </div>
      </div>
      <div class="detail-back">
        <button @click="detailBack();">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "warningDetail",
      data() {
        return {
          postData: {
            priceId: this.$route.query.id
          },
          detailData: ""
        };
      },
      methods: {
        getDetail: function() {
          var vm = this;
          layer.load(2);
          priceDetail(vm.postData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                vm.detailData = ret.data.priceInfo;
              } else {
                layer.alert(ret.data, { closeBtn: 0 });
              }
            })
            .catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
            });
        },
        detailBack:function () {
          this.$router.back(-1);
        }
      },
      mounted() {
        var vm = this;
        // vm.getDetail();
      }
    };
</script>

<style scoped>
  .line{
    width: 60%;;
    height: 1px;
    background-color: gainsboro;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .detail-div_1{
    width: 85%;
    height: 550px;
    border: 1px gray solid;
    margin-left: 5%;
    padding-left: 5%;
  }
  .detail-div_2{
    width: 85%;
    border: 1px gray solid;
    margin-left: 5%;
    padding-left: 5%;
    margin-top: 50px;
  }
  .detail-content{
    margin-top: 50px;
  }
  .detail-div_3{
    padding-top: 50px;
    padding-bottom: 50px;
    width: 85%;
    border: 1px gray solid;
    margin-left: 5%;
    padding-left: 5%;
    margin-top: 50px;
  }
  .detail-content_2{
    margin-left: 25%;

  }
  .detail-tittle{
    margin-top: 50px;
  }
</style>
