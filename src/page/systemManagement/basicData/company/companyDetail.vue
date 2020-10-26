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
                                企业名称：
                                <label v-text="detailData.enterpriseName"></label>
                            </span>
                            <span>
                                企业编号：
                                <label v-text="detailData.enterpriseCode"></label>
                            </span>
                            <span>
                                企业性质：
                                <label v-text="detailData.enterpriseProperty"></label>
                            </span>
                            <span>
                                隶属关系：
                                <label v-text="detailData.relateType"></label>
                            </span>
                            <span>
                                税务登记号：
                                <label v-text="detailData.taxRegistorCode"></label>
                            </span>
                            <span>
                                企业组织机构代码：
                                <label v-text="detailData.organizationCode"></label>
                            </span>
                            <span>
                                统一社会信用代码:
                                <label v-text="detailData.unifiedSocialCreditCode"></label>
                            </span>
                            <span>
                                工商登记编号：
                                <label v-text="detailData.businessRegistorCode"></label>
                            </span>
                            <span>
                                注册资本：
                                <label v-text="detailData.registorCapital"></label>
                            </span>
                            <span>
                                三证合一：
                                <label v-text="detailData.threeCertificates"></label>
                            </span>
                            <span>
                                业务类型：
                                <label v-text="detailData.businessType"></label>
                            </span>
                            <span>
                                省份：
                                <label v-text="detailData.provinceName"></label>
                            </span>
                            <span>
                                城市：
                                <label v-text="detailData.cityName"></label>
                            </span>
                            <span>
                                行政区：
                                <label v-text="detailData.countryName"></label>
                            </span>
                            <span>
                                地址：
                                <label v-text="detailData.address"></label>
                            </span>
                            <span>
                                邮政编码：
                                <label v-text="detailData.postalCode"></label>
                            </span>
                            <span>
                                法人代表：
                                <label v-text="detailData.corporation"></label>
                            </span>
                            <span>
                                联系电话：
                                <label v-text="detailData.phoneNo"></label>
                            </span>
                            <span>
                                传真：
                                <label v-text="detailData.faxNo"></label>
                            </span>
                            <span>
                                邮箱：
                                <label v-text="detailData.email"></label>
                            </span>
                            <span>
                                手机号：
                                <label v-text="detailData.mobilePhoneNo"></label>
                            </span>
                            <span>
                                是否仓储企业：
                                <label v-text="detailData.storageFlg=='Y'?'是':'否'">是</label>
                            </span>
                            <span>
                                是否应急企业：
                                <label v-text="detailData.emergencyFlg=='Y'?'是':'否'">是</label>
                            </span>
                            <span>
                                是否放心粮油：
                                <label v-text="detailData.administrativeFlg=='Y'?'是':'否'">否</label>
                            </span>
                            <span>
                                是否价格监测点：
                                <label v-text="detailData.pricemonitoringFlg=='Y'?'是':'否'">否</label>
                            </span>
                            <span>
                                是否有效：
                                <label v-text="detailData.delFlg==0?'是':'否'">否</label>
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
                        <img :src="detailData.ImgUrl+'/'+detailData.ImgName" alt="">
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
import { companyDetail } from "@/api/systemManage/basicData/company";
export default {
  name: "companyDetail",
  data() {
    return {
      postData: {
        enterpriseCode: this.$route.query.id
      },
      detailData: ""
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      companyDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData = ret.data.enterpriseMap;
            console.log(vm.detailData)
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
    vm.getDetail();
  }
};
</script>
