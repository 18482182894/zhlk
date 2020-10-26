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
                货位编码：
                <label v-text="detailData.cargoPosition"></label>
              </span>
              <span>
                货位名称：
                <label v-text="detailData.cargoName"></label>
              </span>
              <span>
                廒间名称：
                <label v-text="detailData.warehouseName"></label>
              </span>
              <span>
                廒间编码：
                <label v-text="detailData.warehouseGbCode"></label>
              </span>
              <span>
                仓房编码：
                <label v-text="detailData.storehouseGbCode"></label>
              </span>
              <span>
                库点编码：
                <label v-text="detailData.graindepotGbCode"></label>
              </span>
              <span>
                企业编码：
                <label v-text="detailData.enterpriseCode"></label>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">廒间信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail">
            <div>
              <span>
                当前状态：
                <label v-text="detailData.currentState"></label>
              </span>
              <span>
                设计容量（千克）：
                <label v-text="detailData.designCapacity"></label>
              </span>
              <span>
                通风方式:
                <label v-text="detailData.aerationModeCode"></label>
              </span>
              <span>
                隔热措施：
                <label v-text="detailData.heatInsulation"></label>
              </span>
              <span>
                是否国债投资:
                <label v-text="detailData.isTreasuryBondsInvested==0?'是':'否'"></label>
              </span>
              <span>
                责任保管员：
                <label v-text="detailData.liableMan"></label>
              </span>
              <span>
                设计年限：
                <label v-text="detailData.designTime"></label>
              </span>
              <span>
                启用日期：
                <label v-text="detailData.enableDate"></label>
              </span>
              <!-- <span>
                                建成年份：
                                <label v-text="detailData.">2018年</label>
              </span>-->
              <span>
                气密性：
                <label v-text="detailData.airTightness">良好</label>
              </span>
            </div>
          </div>
        </div>
      </div>
      <!--  <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">审核状态</div>
                    <label class="audit-status">未审核</label>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail">
                        <div>
                            <span>
                                审 核 人 ：
                                <label>张明宇</label>
                            </span>
                            <span>
                                审核日期：
                                <label>2018年10月9日</label>
                            </span>
                        </div>
                    </div>
                </div>
      </div>-->
      <div class="detail-back">
        <button @click="detailBack();">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import { goodsDetail } from "@/api/systemManage/basicData/goodsAllocation";
import { VentilationMode, granaryStatus } from "@/api/systemManage/dropDown";
export default {
  name: "goodsAllocationDetail",
  data() {
    return {
      postData: {
        cargoPosition: this.$route.query.id,
        cargoPosi: this.$route.query.cargoPosition,
        cargoName: this.$route.query.cargoName,
        pageNo: this.$route.query.pageNo,
      },
      granaryStatusList: [],
      VentilationModeList: [],
      detailData: "",
    };
  },
  methods: {
    getDetail: function () {
      var vm = this;
      layer.load(2);
      goodsDetail(vm.postData)
        .then((ret) => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData = ret.data.cargoDetail;
            const designTime = vm.detailData.designTime.slice(0, 4);
            const enableDate = vm.detailData.enableDate.slice(0, 4);
            vm.detailData.designTime = designTime;
            vm.detailData.enableDate = enableDate;
            granaryStatus()
              .then((ret) => {
                //当前状态
                layer.closeAll("loading");
                if (ret.code == 200) {
                  vm.granaryStatusList = ret.data.dataList;

                  for (var i = vm.granaryStatusList.length - 1; i >= 0; i--) {
                    if (
                      vm.granaryStatusList[i].dicInfoCode ==
                      vm.detailData.currentState
                    ) {
                      vm.detailData.currentState =
                        vm.granaryStatusList[i].dicInfoValue;
                    }
                  }
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
              })
              .catch((err) => {
                layer.alert(err.message, { closeBtn: 0 });
              });

            VentilationMode()
              .then((ret) => {
                //通风方式
                layer.closeAll("loading");
                if (ret.code == 200) {
                  vm.VentilationModeList = ret.data.dataList;

                  for (var i = vm.VentilationModeList.length - 1; i >= 0; i--) {
                    if (
                      vm.VentilationModeList[i].dicInfoCode ==
                      vm.detailData.aerationModeCode
                    ) {
                      vm.detailData.aerationModeCode =
                        vm.VentilationModeList[i].dicInfoValue;
                    }
                  }
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
              })
              .catch((err) => {
                layer.alert(err.message, { closeBtn: 0 });
              });
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch((err) => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    detailBack: function (id, cargoName, cargoPosition, pageNo) {
      var vm = this;
      this.$router.push({
        name: "goodsAllocation",
        query: {
          id: id,
          cargoName: vm.postData.cargoName,
          cargoPosition: vm.postData.cargoPosi,
          pageNo: vm.postData.pageNo,
        },
      });
    },
  },
  mounted() {
    var vm = this;
    vm.getDetail();
  },
};
</script>
