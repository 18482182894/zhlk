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
                                油罐名称：
                                <label v-text="detailData.oilcanName"></label>
                            </span>
                            <span>
                                油罐编码：
                                <label v-text="detailData.oilcanCode"></label>
                            </span>
                            <span>
                                库点名称：
                                <label v-text="detailData.graindepotName"></label>
                            </span>
                            <span>
                                库点编码：
                                <label v-text="detailData.graindepotGbCode"></label>
                            </span>
                            <span>
                                主要业务：
                                <label v-text="detailData.primaryServiceValue"></label>
                            </span>
                            <span>
                                企业编码：
                                <label v-text="detailData.enterpriseCode"></label>
                            </span>
                            <span>
                                库点编码：
                                <label v-text="detailData.graindepotGbCode"></label>
                            </span>
                            <span>
                                省份：
                                <label v-text="detailData.provice">四川</label>
                            </span>
                            <span>
                                城市：
                                <label v-text="detailData.city">成都</label>
                            </span>
                            <span>
                                行政区：
                                <label v-text="detailData.country">武侯区</label>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">油罐信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail">
                        <div>
                            <span>
                                油罐状态：
                                <label v-text="detailData.ocStateValue">满仓</label>
                            </span>
                            <span>
                                使用情况：
                                <label v-text="detailData.useStateValue"></label>
                            </span>
                            <span>
                                油罐规格：
                                <label v-text="detailData.ocFormat"></label>
                            </span>
                             <span>
                                设计罐容(千克)：
                                <label v-text="detailData.designCapacity"></label>
                            </span>
                            <span>
                                实际罐容(千克):
                                <label v-text="detailData.actualCapacity"></label>
                            </span>
                            <span>
                                油罐直径：
                                <label v-text="detailData.diameter"></label>
                            </span>
                            <span>
                                油罐高度：
                                <label v-text="detailData.height"></label>
                            </span>
                            <span>
                                装油线高度:
                                <label v-text="detailData.ladeLineHeight"></label>
                            </span>
                            <span>
                                装备情况(打孔):
                                <label v-text="detailData.equipmentState"></label>
                            </span>
                            <span>
                                经度:
                                <label v-text="detailData.longitude"></label>
                            </span>
                            <span>
                                纬度:
                                <label v-text="detailData.latitude"></label>
                            </span>
                            <span>
                                建成年份：
                                <label v-text="detailData.constructionYear"></label>
                            </span>
                            <span>
                                现有容量(千克):
                                <label v-text="detailData.remark"></label>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="tag-box">
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
            </div> -->
            <div class="detail-back">
                <button @click="detailBack();">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
import { oilTankDetail } from "@/api/systemManage/basicData/oilTank";
import {
  equipState,
} from "@/api/systemManage/dropDown";
export default {
  name: "oilTankDetail",
  data() {
    return {
      postData: {
        oilcanCode: this.$route.query.id,
        oilcan:this.$route.query.oilcanCode,
        oilcanName:this.$route.query.oilcanName,
        pageNo:this.$route.query.pageNo
      },
      detailData: ""
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      oilTankDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData = ret.data.oilcanDetail;
            const constructionYear = vm.detailData.constructionYear.slice(0,4)
            vm.detailData.constructionYear = constructionYear
          equipState()
            .then(ret => {
              //装备情况（打孔）下拉列表
              if (ret.code == 200) {
                vm.equipStateList = ret.data.dataList;

                        for (var i = vm.equipStateList.length - 1; i >= 0; i--) {
                          if (vm.equipStateList[i].dicInfoCode==vm.detailData.equipmentState) {
                            vm.detailData.equipmentState=vm.equipStateList[i].dicInfoValue;
                          }
                        }
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
    detailBack:function (id,type,oilcanName,oilcanCode,pageNo) {
      var vm=this;
      this.$router.push({
        name: "oilTank",
        query: {
          id:id,
          type:type,
          oilcanCode:vm.postData.oilcan,
          oilcanName:vm.postData.oilcanName,
          pageNo:vm.postData.pageNo
        }
      });
    }
  },
  mounted() {
    var vm = this;
    vm.getDetail();
  }
};
</script>
