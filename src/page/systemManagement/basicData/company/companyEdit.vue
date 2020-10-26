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
                                企业名称：
                                <input type="text" class="input-text" v-model="submitData.enterpriseName">
                            </span>
                            <span>
                                企业编号：
                                <input type="text" class="input-text" v-model="submitData.enterpriseCode">
                            </span>
                            <span>
                                企业性质：
                                <select name="" class="select-style" v-model="submitData.enterpriseProperty">
                                    <option v-for="item in PropertyList" :value="item.dicInfoCode" v-text="item.dicInfoValue"></option>
                                </select>
                            </span>
                            <span>
                                隶属关系：
                                <select name="" class="select-style" v-model="submitData.relateType">
                                    <option v-for="item in relateTypeList" :value="item.dicInfoCode" v-text="item.dicInfoValue"></option>
                                </select>
                            </span>
                            <span>
                                税务登记号：
                                <input type="text" class="input-text" v-model="submitData.taxRegistorCode">
                            </span>
                            <span>
                                企业组织机构代码：
                                <input type="text" class="input-text" v-model="submitData.organizationCode">
                            </span>
                            <span>
                                统一社会信用代码:
                                <input type="text" class="input-text" v-model="submitData.unifiedSocialCreditCode">
                            </span>
                            <span>
                                工商登记编号：
                                <input type="text" class="input-text" v-model="submitData.businessRegistorCode">
                            </span>
                            <span>
                                注册资本：
                                <input type="text" class="input-text" v-model="submitData.registorCapital">
                            </span>
                            <span>
                                三证合一：
                                <input type="text" class="input-text" v-model="submitData.threeCertificates">
                            </span>
                            <span>
                                业务类型：
                                <select name="" class="select-style" v-model="submitData.businessType">
                                    <option v-for="item in businessTypeList" :value="item.dicInfoCode" v-text="item.dicInfoValue"></option>
                                </select>
                            </span>
                            <span>
                                邮政编码：
                                <input type="text" class="input-text" v-model="submitData.postalCode">
                            </span>
                            <span style="width: 50%;">
                                省市区：
                                <!-- <input type="text" class="input-text" v-model="submitData.provinceId"> -->
                                <v-distpicker @selected="onSelected" :province="submitData.provinceName" :city="submitData.cityName" :area="submitData.countryName"></v-distpicker>
                            </span>
                            <!-- <span>
                                城市：
                                <input type="text" class="input-text" v-model="submitData.cityId">
                            </span>
                            <span>
                                行政区：
                                <input type="text" class="input-text" v-model="submitData.countryId">
                            </span> -->
                            <span>
                                地址：
                                <input type="text" class="input-text" v-model="submitData.address">
                            </span>
                            <span>
                                法人代表：
                                <input type="text" class="input-text" v-model="submitData.corporation">
                            </span>
                            <span>
                                联系电话：
                                <input type="text" class="input-text" v-model="submitData.phoneNo">
                            </span>
                            <span>
                                传真：
                                <input type="text" class="input-text" v-model="submitData.faxNo">
                            </span>
                            <span>
                                邮箱：
                                <input type="text" class="input-text" v-model="submitData.email">
                            </span>
                            <span>
                                手机号：
                                <input type="text" class="input-text" v-model="submitData.mobilePhoneNo">
                            </span>
                            <span>
                                是否仓储企业：
                                <select name="" class="select-style" v-model="submitData.storageFlg">
                                    <option value="Y">是</option>
                                    <option value="N">否</option>
                                </select>
                            </span>
                            <span>
                                是否应急企业：
                                <select name="" class="select-style" v-model="submitData.emergencyFlg">
                                    <option value="Y">是</option>
                                    <option value="N">否</option>
                                </select>
                            </span>
                            <span>
                                是否放心粮油：
                                <select name="" class="select-style" v-model="submitData.administrativeFlg">
                                    <option value="Y">是</option>
                                    <option value="N">否</option>
                                </select>
                            </span>
                            <span>
                                是否价格监测点：
                                <select name="" class="select-style" v-model="submitData.pricemonitoringFlg">
                                    <option value="Y">是</option>
                                    <option value="N">否</option>
                                </select>
                            </span>
                            <span>
                                是否有效：
                                <select name="" class="select-style" v-model="submitData.delFlg">
                                    <option value="0">是</option>
                                    <option value="1">否</option>
                                </select>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">图片</div>
                </div>
                <div class="tag-box-content">
                    <div class="upload-pic">
                        <div id="uploadPic"></div>
                        <img :src="submitData.picurl?submitData.picurl:'../../../../../static/images/upload-pic.png'" alt="">
                        <label class="fc-red">只支持.jpg格式</label>
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
import {
  companyDetail,
  companyEdit,
  companyNew
} from "@/api/systemManage/basicData/company";
import {
  enterpriseProperty,
  relateType,
  businessType
} from "@/api/systemManage/dropDown";
import { uploadPic } from "@/utils/public";
export default {
  name: "desktop",
  data() {
    return {
      type:this.$route.query.type,
      postData: {
        enterpriseCode: this.$route.query.id
      },
      PropertyList: "",
      PropertyValue: "",
      relateTypeList: "",
      relateTypeValue: "",
      businessTypeList: "",
      businessTypeValue: "",
      submitData: {
        enterpriseCode: "",
        enterpriseName: "",
        enterpriseProperty: "",
        relateType: "",
        taxRegistorCode: "",
        organizationCode: "",
        unifiedSocialCreditCode: "",
        businessRegistorCode: "",
        registorCapital: "",
        threeCertificates: "",
        businessType: "",
        provinceId: "",
        cityId: "",
        countryId: "",
        provinceName:'',
        cityName:'',
        countryName:'',
        address: "",
        postalCode: "",
        corporation: "",
        phoneNo: "",
        faxNo: "",
        email: "",
        mobilePhoneNo: "",
        storageFlg: "",
        emergencyFlg: "",
        administrativeFlg: "",
        pricemonitoringFlg: "",
        picNameList: "",
        picurl:''
      }
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
            // console.log(JSON.stringify(ret))
            vm.submitData.enterpriseCode =
              ret.data.enterpriseMap.enterpriseCode;
            vm.submitData.enterpriseName =
              ret.data.enterpriseMap.enterpriseName;
            vm.PropertyValue = ret.data.enterpriseMap.enterpriseProperty;
            vm.relateTypeValue = ret.data.enterpriseMap.relateType;
            vm.submitData.taxRegistorCode =
              ret.data.enterpriseMap.taxRegistorCode;
            vm.submitData.organizationCode =
              ret.data.enterpriseMap.organizationCode;
            vm.submitData.unifiedSocialCreditCode =
              ret.data.enterpriseMap.unifiedSocialCreditCode;
            vm.submitData.businessRegistorCode =
              ret.data.enterpriseMap.businessRegistorCode;
            vm.submitData.registorCapital =
              ret.data.enterpriseMap.registorCapital;
            vm.submitData.threeCertificates =
              ret.data.enterpriseMap.threeCertificates;
            vm.businessTypeValue = ret.data.enterpriseMap.businessType;

            vm.submitData.provinceId = ret.data.enterpriseMap.provinceId;
            vm.submitData.cityId = ret.data.enterpriseMap.cityId;
            vm.submitData.countryId = ret.data.enterpriseMap.countryId;
            vm.submitData.provinceName = ret.data.enterpriseMap.provinceName;
            vm.submitData.cityName = ret.data.enterpriseMap.cityName;
            vm.submitData.countryName = ret.data.enterpriseMap.countryName;

            vm.submitData.address = ret.data.enterpriseMap.address;
            vm.submitData.postalCode = ret.data.enterpriseMap.postalCode;
            vm.submitData.corporation = ret.data.enterpriseMap.corporation;
            vm.submitData.phoneNo = ret.data.enterpriseMap.phoneNo;
            vm.submitData.faxNo = ret.data.enterpriseMap.faxNo;
            vm.submitData.email = ret.data.enterpriseMap.email;
            vm.submitData.mobilePhoneNo = ret.data.enterpriseMap.mobilePhoneNo;
            vm.submitData.storageFlg = ret.data.enterpriseMap.storageFlg;
            vm.submitData.emergencyFlg = ret.data.enterpriseMap.emergencyFlg;

            vm.submitData.picurl = ret.data.enterpriseMap.ImgUrl+'/'+ret.data.enterpriseMap.ImgName;

            vm.submitData.administrativeFlg =
              ret.data.enterpriseMap.administrativeFlg;
            vm.submitData.pricemonitoringFlg =
              ret.data.enterpriseMap.pricemonitoringFlg;
            // vm.submitData.picNameList=ret.data.enterpriseMap.ImgName;
            vm.$nextTick(function() {
              vm.getProperty();
              vm.getRelateType();
              vm.getBusinessType();
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
      if (vm.submitData.enterpriseName == "") {
        layer.msg("请填写企业名称");
        return;
      }
      if (vm.submitData.enterpriseCode == "") {
        layer.msg("请填写企业编号");
        return;
      }
      if (vm.submitData.enterpriseProperty == "") {
        layer.msg("请填写企业性质");
        return;
      }
      if (vm.submitData.unifiedSocialCreditCode == "") {
        layer.msg("请填写工商登记编号");
        return;
      }
      if (vm.submitData.threeCertificates == "") {
        layer.msg("请填写三证合一");
        return;
      }
      if (vm.submitData.businessType == "") {
        layer.msg("请填写业务类型");
        return;
      }
      if (vm.submitData.phoneNo == "") {
        layer.msg("请填写联系电话");
        return;
      }
      if (vm.submitData.corporation == "") {
        layer.msg("请填写法人代表");
        return;
      }
      if (vm.submitData.mobilePhoneNo == "") {
        layer.msg("请填写手机号");
        return;
      }
      if (vm.type=='edit') {
        vm.submitData.graindepotTypeId = this.$route.query.id;
        console.log(JSON.stringify(vm.submitData))
        layer.load(2);
        companyEdit(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("编辑仓储企业成功！");
              this.$router.push({
                name: "company"
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
        companyNew(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增仓储企业成功！");
              this.$router.push({
                name: "company"
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
    getProperty: function() {
      //获取企业性质
      var vm = this;
      layer.load(2);
      enterpriseProperty()
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.PropertyList = ret.data.dataList;
            for (var i = 0; i < ret.data.dataList.length; i++) {
              if (ret.data.dataList[i].dicInfoValue == vm.PropertyValue) {
                vm.submitData.enterpriseProperty =
                  ret.data.dataList[i].dicInfoCode;
              }
            }
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getRelateType: function() {
      //获取隶属关系
      var vm = this;
      layer.load(2);
      relateType()
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.relateTypeList = ret.data.dataList;
            for (var i = 0; i < ret.data.dataList.length; i++) {
              if (ret.data.dataList[i].dicInfoValue == vm.relateTypeValue) {
                vm.submitData.relateType = ret.data.dataList[i].dicInfoCode;
              }
            }
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getBusinessType: function() {
      //业务类型
      var vm = this;
      layer.load(2);
      businessType()
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.businessTypeList = ret.data.dataList;
            for (var i = 0; i < ret.data.dataList.length; i++) {
              if (ret.data.dataList[i].dicInfoValue == vm.businessTypeValue) {
                vm.submitData.businessType = ret.data.dataList[i].dicInfoCode;
              }
            }
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    onSelected:function (data ) {
      var vm=this;
      vm.submitData.provinceId=data.province.code ;
      vm.submitData.cityId=data.city.code ;
      vm.submitData.countryId=data.area.code; 
      vm.submitData.provinceName=data.province.value ;
      vm.submitData.cityName=data.city.value ;
      vm.submitData.countryName=data.area.value;    
    },
    detailBack:function () {
        this.$router.back(-1);
    }
  },
  mounted() {
    var vm = this;
    if (this.$route.query.id) {
      vm.getDetail();
    } else {
      vm.getProperty();
      vm.getRelateType();
      vm.getBusinessType();
    }
    uploadPic("uploadPic", function(ret) {
      if (ret.code == 200) {
          console.log(JSON.stringify(ret))
          vm.submitData.picNameList=ret.data.fileName;
          vm.submitData.picurl=ret.data.fileUrl;
      } else {
        layer.alert("上传文件出错", { closeBtn: 0 });
      }
    });
  }
};
</script>
