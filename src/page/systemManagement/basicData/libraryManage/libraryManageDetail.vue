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
                                <em class="fc-red">*</em>库点名称：
                                <label v-text="detailData.graindepotName"></label>
                            </span>
                            <span>
                                <em class="fc-red">*</em>企业编码：
                                <label v-text="detailData.enterpriseCode"></label>
                            </span>
                            <!-- <span>
                                <em class="fc-red">*</em>仓储企业：
                                <label v-text="detailData.graindepotName">中央企业</label>
                            </span> -->
                            <span>
                                <em class="fc-red">*</em>库点编码：
                                <label v-text="detailData.graindepotGbCode"></label>
                            </span>
                            <!-- <span>
                                <em class="fc-red">*</em>库点类型：
                                <label v-text="detailData.graindepotName">示范库</label>
                            </span> -->
                            <span>
                                省 份：
                                <label v-text="detailData.provinceName"></label>
                            </span>
                            <span>
                                城 市：
                                <label v-text="detailData.cityName"></label>
                            </span>
                            <span>
                                行 政 区：
                                <label v-text="detailData.countryName"></label>
                            </span>
                            <span>
                                详细地址：
                                <label v-text="detailData.address"></label>
                            </span>
                            <span>
                                邮政编码：
                                <label v-text="detailData.postalCode"></label>
                            </span>
                            <span>
                                传 真：
                                <label v-text="detailData.faxNo"></label>
                            </span>
                            <span>
                                邮 箱：
                                <label v-text="detailData.email"></label>
                            </span>
                            <!-- <span>
                                审 核 人：
                                <label v-text="detailData.auditName">李楠</label>
                            </span> -->
                            <span>
                                联系电话：
                                <label v-text="detailData.phoneNo"></label>
                            </span>
                            <span>
                                手机号：
                                <label v-text="detailData.cellphone"></label>
                            </span>
                            <span>
                                开发单位：
                                <label v-text="detailData.developCompany"></label>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">库点信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail">
                        <div>
                            <span>
                                仓库设计总容量（千克）：
                                <label v-text="detailData.storeDesignCapacity"></label>
                            </span>
                            <span>
                                仓库实际总容量（千克）：
                                <label v-text="detailData.storeActualCapacity"></label>
                            </span>
                            <span>
                                最高库存量（千克）：
                                <label v-text="detailData.maxStock"></label>
                            </span>
                            <span>
                                最低库存量（千克）:
                                <label v-text="detailData.minStock"></label>
                            </span>
                            <span>
                                仓库总数（个）：
                                <label v-text="detailData.storeCount"></label>
                            </span>
                            <span>
                                油罐实际总罐容（千克）：
                                <label v-text="detailData.oilcanActualCapacity"></label>
                            </span>
                            <span>
                                油罐设计总容量（千克）：
                                <label v-text="detailData.oilcanDesignCapacity"></label>
                            </span>
                            <span>
                                油罐总数（个）：
                                <label v-text="detailData.oilcanCount"></label>
                            </span>
                            <span>
                                机械信息_烘干机数量：
                                <label v-text="detailData.engineCount"></label>
                            </span>
                            <span>
                                地坪信息_专用码头（个）:
                                <label v-text="detailData.terraceWharf"></label>
                            </span>
                            <span>
                                占地面积（平方米）：
                                <label v-text="detailData.floorSpace"></label>
                            </span>
                            <span>
                                机械信息_谷物冷却机（个）:
                                <label v-text="detailData.engineCooler"></label>
                            </span>
                            <span>
                                机械通风（仓数（个））：
                                <label v-text="detailData.ensureAeration"></label>
                            </span>
                            <span>
                                环流熏蒸（仓数（个））：
                                <label v-text="detailData.ensureFumigation"></label>
                            </span>
                            <span>
                                低温储粮（仓数（个））：
                                <label v-text="detailData.ensureLowTemperature"></label>
                            </span>
                            <span>
                                气调储粮（仓数（个））：
                                <label v-text="detailData.ensureThermometric"></label>
                            </span>
                            <span>
                                廒间总数（个）：
                                <label v-text="detailData.warehouseCount"></label>
                            </span>
                            <span>
                                库区数：
                                <label v-text="detailData.gdCount"></label>
                            </span>
                            <span>
                                数据录入类型：
                                <label v-text="detailData.infoEditType"></label>
                            </span>
                            <!-- <span>
                                计算机测温（仓数（个））：
                                <label v-text="detailData.graindepotName"></label>
                            </span> -->
                            <span>
                                业务管理系统：
                                <label v-text="detailData.itIsBusiness==0?'没有':'有'">有</label>
                            </span>
                            <span>
                                 仓储管理系统：
                                <label v-text="detailData.itIsStorage==0?'没有':'有'">无</label>
                            </span>
                            <span>
                                自动化作业系统：
                                <label v-text="detailData.itIsAuto==0?'没有':'有'">有</label>
                            </span>
                            <span>
                                监管系统：
                                <label v-text="detailData.itIsRemote==0?'没有':'有'">有</label>
                            </span>
                            <span>
                                其他管理系统：
                                <label v-text="detailData.itIsOther==0?'没有':'有'">有</label>
                            </span>
                            <span>
                                库存名简称
                                <label v-text="detailData.graindepotShortName"></label>
                            </span>
                            <span>
                                上级机构ID：
                                <label v-text="detailData.belongId"></label>
                            </span>
                            <span>
                                上级机构编码：
                                <label v-text="detailData.belongCode"></label>
                            </span>
                            <span>
                                 经度：
                                <label v-text="detailData.longitude"></label>
                            </span>
                            <span>
                                 纬度：
                                <label v-text="detailData.latitude"></label>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">附件</div>
                </div>
                <div class="tag-box-content">
                    <div class="upload-pic">
                        <img :src="imageUrl" alt="">
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
                                <label v-text="detailData.auditName">张明宇</label>
                            </span>
                            <span>
                                审核日期：
                                <label v-text="detailData.auditName">2018年10月9日</label>
                            </span>
                        </div>
                    </div>
                </div>
            </div> -->
            <div class="detail-back">
                <button @click="detailBack();">返回</button>
            </div>
        </div>
		<div class="copyright">
			<p>Copyright © 四川百威智联科技有限公司 © 版权所有 电话：028-62631082</p>
		</div>
    </div>
</template>

<script>
import { libraryDetail } from "@/api/systemManage/basicData/library";
export default {
  name: "desktop",
  data() {
    return {
      postData: {
        graindepotGbCode: this.$route.query.id
      },
      imageUrl:'',
      detailData: ""
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      libraryDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData = ret.data.dataMap;
            vm.imageUrl = ret.data.imageUrl;
          } else {
            layer.alert(err.message, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    detailBack:function () {
        /*this.$router.back(-1);*/
      this.$router.push({
        name: "libraryManage",
        query: {
          graindepotGbCode:this.$route.query.graindepotGbCode,
          graindepotName:this.$route.query.graindepotName,
          graindepotTypeId:this.$route.query.graindepotTypeId,
          pageNo:this.$route.query.pageNo
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
