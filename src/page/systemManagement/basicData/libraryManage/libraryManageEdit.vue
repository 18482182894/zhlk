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
                                <label>
                                <em class="fc-red">*</em>库点名称：</label>
                                <input type="text" class="input-text" v-model="submitData.graindepotName">
                            </span>
                            <span>
                                <label>
                                <em class="fc-red">*</em>库点类型：</label>
                                <select name="" class="select-style" v-model="submitData.graindepotTypeId">
                                    <option>请选择库点类型</option>
                                    <option v-for="item in libraryTypeList" :value="item.graindepotTypeId" v-text="item.graindepotTypeName"></option>
                                </select>
                            </span>
                            <span>
                                <label>
                                <em class="fc-red">*</em>企业编码：</label>
                                <!-- <input type="text" class="input-text" v-model="submitData.enterpriseCode"> -->
                                <select name="" class="select-style" v-model="submitData.enterpriseCode">
                                    <option>请选择企业</option>
                                    <option v-for="item in companyDataList" :value="item.enterpriseCode" v-text="item.enterpriseName"></option>
                                </select>
                            </span>
                            <!-- <span>
                                <em class="fc-red">*</em>仓储企业：
                                <input type="text" class="input-text" v-model="submitData.">
                            </span> -->
                            <span>
                                <label>
                                <em class="fc-red">*</em>库点编码：</label>
                                <input type="text" class="input-text" v-model="submitData.graindepotGbCode">
                            </span>
                            <!-- <span>
                                <em class="fc-red">*</em>库点类型：
                                <input type="text" class="input-text" v-model="submitData.">
                            </span> -->
                            <!-- <span>
                                <label>
                                省 份：</label>
                                <input type="text" class="input-text" v-model="submitData.provinceId">
                            </span>
                            <span>
                                <label>
                                城 市：</label>
                                <input type="text" class="input-text" v-model="submitData.cityId">
                            </span>
                            <span>
                                <label>
                                行 政 区：</label>
                                <input type="text" class="input-text" v-model="submitData.countryId">
                            </span> -->

                            <span style="width: 50%;">
                                省市区：
                                <!-- <input type="text" class="input-text" v-model="submitData.provinceId"> -->
                                <v-distpicker @selected="onSelected" :province="submitData.provinceName" :city="submitData.cityName" :area="submitData.countryName"></v-distpicker>
                            </span>

                            <span>
                                <label>
                                详细地址：</label>
                                <input type="text" class="input-text" v-model="submitData.address">
                            </span>
                            <span>
                                <label>
                                邮政编码：</label>
                                <input type="text" class="input-text" v-model="submitData.postalCode">
                            </span>
                            <span>
                                <label>
                                传 真：</label>
                                <input type="text" class="input-text" v-model="submitData.faxNo">
                            </span>
                            <span>
                                <label>
                                邮 箱：</label>
                                <input type="text" class="input-text" v-model="submitData.email">
                            </span>
                            <span>
                                <label>
                                法人代表：</label>
                                <input type="text" class="input-text" v-model="submitData.corporation">
                            </span>
                            <!-- <span>
                                审 核 人：
                                <input type="text" class="input-text" v-model="submitData.auditName">
                            </span> -->
                            <span>
                                <label>
                                联系电话：</label>
                                <input type="text" class="input-text" v-model="submitData.phoneNo">
                            </span>
                            <span>
                                <label>
                                手机号：</label>
                                <input type="text" class="input-text" v-model="submitData.cellphone">
                            </span>
                            <span>
                                <label>
                                开发单位：</label>
                                <input type="text" class="input-text" v-model="submitData.developCompany">
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
                    <div class="userManage-detail userManage-edit">
                        <div class="libraryManage">
                            <span>
                                <label>
                                仓库设计总容量（千克）：</label>
                                <input type="text" class="input-text" v-model="submitData.storeDesignCapacity">
                            </span>
                            <span>
                                <label>
                                仓库实际总容量（千克）：</label>
                                <input type="text" class="input-text" v-model="submitData.storeActualCapacity">
                            </span>
                            <span>
                                <label>
                                最高库存量（千克）：</label>
                                <input type="text" class="input-text" v-model="submitData.maxStock">
                            </span>
                            <span>
                                <label>
                                最低库存量（千克）:</label>
                                <input type="text" class="input-text" v-model="submitData.minStock">
                            </span>
                            <span>
                                <label>
                                仓库总数（个）：</label>
                                <input type="text" class="input-text" v-model="submitData.storeCount">
                            </span>
                            <span>
                                <label>
                                油罐实际总罐容（千克）：</label>
                                <input type="text" class="input-text" v-model="submitData.oilcanActualCapacity">
                            </span>
                            <span>
                                <label>
                                油罐设计总容量（千克）：</label>
                                <input type="text" class="input-text" v-model="submitData.oilcanDesignCapacity">
                            </span>
                            <span>
                                油罐总数（个）：
                                <input type="text" class="input-text" v-model="submitData.oilcanCount">
                            </span>
                            <span>
                                <label>
                                机械信息_烘干机数量：</label>
                                <input type="text" class="input-text" v-model="submitData.engineCount">
                            </span>
                            <span>
                                <label>
                                地坪信息_专用码头（个）:</label>
                                <input type="text" class="input-text" v-model="submitData.terraceWharf">
                            </span>
                            <span>
                                <label>
                                占地面积（平方米）：</label>
                                <input type="text" class="input-text" v-model="submitData.floorSpace">
                            </span>
                            <span>
                                <label>
                                机械信息_谷物冷却机（个）:</label>
                                <input type="text" class="input-text" v-model="submitData.engineCooler">
                            </span>
                            <span>
                                <label>
                                机械通风（仓数（个））：</label>
                                <input type="text" class="input-text" v-model="submitData.ensureAeration">
                            </span>
                            <span>
                                <label>
                                环流熏蒸（仓数（个））：</label>
                                <input type="text" class="input-text" v-model="submitData.ensureFumigation">
                            </span>
                            <span>
                                <label>
                                低温储粮（仓数（个））：</label>
                                <input type="text" class="input-text" v-model="submitData.ensureLowTemperature">
                            </span>
                            <span>
                                <label>
                                气调储粮（仓数（个））：</label>
                                <input type="text" class="input-text" v-model="submitData.ensureThermometric">
                            </span>
                            <span>
                                <label>
                                廒间总数（个）：</label>
                                <input type="text" class="input-text" v-model="submitData.warehouseCount">
                            </span>
                            <span>
                                <label>
                                库区数：</label>
                                <input type="text" class="input-text" v-model="submitData.gdCount">
                            </span>
                            <span>
                                <label>
                                数据录入类型：</label>
                                <input type="text" class="input-text" v-model="submitData.infoEditType">
                            </span>
                            <!-- <span>
                                计算机测温（仓数（个））：
                                <input type="text" class="input-text" v-model="submitData.">
                            </span> -->
                            <span>
                                <label>
                                业务管理系统：</label>
                                <select name="" class="select-style" v-model="submitData.itIsBusiness" >
                                    <option value="0">没有</option>
                                    <option value="1">有</option>
                                </select>
                            </span>
                            <span>
                                <label>
                                 仓储管理系统：</label>
                                <select name="" class="select-style" v-model="submitData.itIsStorage" >
                                    <option value="0">没有</option>
                                    <option value="1">有</option>
                                </select>
                            </span>
                            <span>
                                <label>
                                自动化作业系统：</label>
                                <select name="" class="select-style" v-model="submitData.itIsAuto" >
                                    <option value="0">没有</option>
                                    <option value="1">有</option>
                                </select>
                            </span>
                            <span>
                                <label>
                                监管系统：</label>
                                <select name="" class="select-style" v-model="submitData.itIsRemote" >
                                    <option value="0">没有</option>
                                    <option value="1">有</option>
                                </select>
                            </span>
                            <span>
                                <label>
                                其他管理系统：</label>
                                <select name="" class="select-style" v-model="submitData.itIsOther" >
                                    <option value="0">没有</option>
                                    <option value="1">有</option>
                                </select>
                            </span>
                            <span>
                                <label>
                                 库存名简称:</label>
                                <input type="text" class="input-text" v-model="submitData.graindepotShortName">
                            </span>
                            <span>
                                <label>
                                 上级机构ID:</label>
                                <input type="text" class="input-text" v-model="submitData.belongId">
                            </span>
                            <span>
                                <label>
                                 上级机构编码:</label>
                                <input type="text" class="input-text" v-model="submitData.belongCode">
                            </span>
                            <span>
                                <label>
                                 经度：</label>
                                <input type="text" class="input-text" v-model="submitData.longitude">
                            </span>
                            <span>
                                <label>
                                 纬度：</label>
                                <input type="text" class="input-text" v-model="submitData.latitude">
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">图片</div>
                </div>
                <div class="tag-box-content" >
                    <div class="upload-pic">
                        <div id="uploadPic"></div>
                        <img  :src="submitData.picUrl?submitData.picUrl:'../../../../../static/images/upload-pic.png'" alt="">
                        <label class="fc-red">只支持.jpg格式</label>
                    </div>
                </div>
            </div>
            <!-- <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">审核</div>
                </div>
                <div class="tag-box-content">
                    <div class="formula-item">
                        <div class="formula-right">
                            <textarea class="custom-textarea">
                            </textarea>
                        </div>
                        <button class="formula-button btn-query" @click="clearFormula();">同意</button>
                        <button class="formula-button bun-refuse" @click="backFormula();">拒绝</button>
                    </div>
                </div>
            </div> -->
            <div class="edit-btn">
                <button class="edit-submit" @click="submitEvent();">提交</button>
                <button class="edit-back" @click="detailBack();">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
import {
  libraryDetail,
  libraryEdit,
  libraryNew,
  libraryTypeDropdown
} from "@/api/systemManage/basicData/library";
import {
  companyList
} from "@/api/systemManage/dropDown";
import { uploadPic } from "@/utils/public";
export default {
  name: "desktop",
  data() {
    return {
        type:this.$route.query.type,
      postData: {
        graindepotGbCode: this.$route.query.id
      },
      libraryTypeList: [],
      companyDataList:[],
      submitData: {
        graindepotName: "",
        enterpriseCode: "",
        graindepotGbCode: "",
        provinceId: "",
        cityId: "",
        countryId: "",

        provinceName:'',
        cityName:'',
        countryName:'',

        address: "",
        postalCode: "",
        faxNo: "",
        email: "",
        developCompany: "",
        corporation: "",
        phoneNo: "",
        storeDesignCapacity: "",
        storeActualCapacity: "",
        minStock: "",
        maxStock: "",
        storeCount: "",
        oilcanCount: "",
        oilcanDesignCapacity: "",
        engineCount: "",
        terraceWharf: "",
        floorSpace: "",
        engineCooler: "",
        ensureAeration: "",
        ensureFumigation: "",
        ensureLowTemperature: "",
        ensureThermometric: "",
        longitude: "",
        latitude: "",
        warehouseCount: "",
        itIsBusiness: "",
        itIsStorage: "",
        itIsAuto: "",
        itIsRemote: "",
        itIsOther: "",
        graindepotTypeId: "",
        gdCount: "",
        belongId: "",
        belongCode: "",
        infoEditType: "",
        graindepotShortName: "",
        cellphone: "",
        picNameList: '',
        picUrl:''
      }
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
            console.log(JSON.stringify(ret))
            vm.submitData.graindepotName = ret.data.dataMap.graindepotName;
            vm.submitData.graindepotTypeId = ret.data.dataMap.graindepotTypeId;
            vm.submitData.enterpriseCode = ret.data.dataMap.enterpriseCode;
            vm.submitData.graindepotGbCode = ret.data.dataMap.graindepotGbCode;
            vm.submitData.oilcanActualCapacity = ret.data.dataMap.oilcanActualCapacity;

            vm.submitData.provinceId = ret.data.dataMap.provinceId;
            vm.submitData.cityId = ret.data.dataMap.cityId;
            vm.submitData.countryId = ret.data.dataMap.countryId;
            vm.submitData.provinceName = ret.data.dataMap.provinceName;
            vm.submitData.cityName = ret.data.dataMap.cityName;
            vm.submitData.countryName = ret.data.dataMap.countryName;

            vm.submitData.address = ret.data.dataMap.address;
            vm.submitData.postalCode = ret.data.dataMap.postalCode;
            vm.submitData.faxNo = ret.data.dataMap.faxNo;
            vm.submitData.email = ret.data.dataMap.email;
            vm.submitData.developCompany = ret.data.dataMap.developCompany;
            vm.submitData.storeDesignCapacity =
              ret.data.dataMap.storeDesignCapacity;
            vm.submitData.storeActualCapacity =
              ret.data.dataMap.storeActualCapacity;
            vm.submitData.maxStock = ret.data.dataMap.maxStock;
            vm.submitData.minStock = ret.data.dataMap.minStock;
            vm.submitData.storeCount = ret.data.dataMap.storeCount;
            vm.submitData.oilcanCount = ret.data.dataMap.oilcanCount;
            vm.submitData.oilcanDesignCapacity =
              ret.data.dataMap.oilcanDesignCapacity;
            vm.submitData.oilcanCount = ret.data.dataMap.oilcanCount;
            vm.submitData.engineCount = ret.data.dataMap.engineCount;
            vm.submitData.terraceWharf = ret.data.dataMap.terraceWharf;
            vm.submitData.floorSpace = ret.data.dataMap.floorSpace;
            vm.submitData.engineCooler = ret.data.dataMap.engineCooler;
            vm.submitData.ensureAeration = ret.data.dataMap.ensureAeration;
            vm.submitData.ensureFumigation = ret.data.dataMap.ensureFumigation;
            vm.submitData.ensureLowTemperature =
              ret.data.dataMap.ensureLowTemperature;
            vm.submitData.ensureThermometric =
              ret.data.dataMap.ensureThermometric;
            vm.submitData.latitude = ret.data.dataMap.latitude;
            vm.submitData.itIsBusiness = ret.data.dataMap.itIsBusiness;
            vm.submitData.itIsStorage = ret.data.dataMap.itIsStorage;
            vm.submitData.itIsAuto = ret.data.dataMap.itIsAuto;
            vm.submitData.itIsRemote = ret.data.dataMap.itIsRemote;
            vm.submitData.itIsOther = ret.data.dataMap.itIsOther;
            vm.submitData.graindepotShortName =
              ret.data.dataMap.graindepotShortName;
            vm.submitData.warehouseCount = ret.data.dataMap.warehouseCount;
            vm.submitData.longitude = ret.data.dataMap.longitude;
            vm.submitData.phoneNo = ret.data.dataMap.phoneNo;
            vm.submitData.gdCount = ret.data.dataMap.gdCount;
            vm.submitData.belongId = ret.data.dataMap.belongId;
            vm.submitData.cellphone = ret.data.dataMap.cellphone;
            vm.submitData.infoEditType = ret.data.dataMap.infoEditType;
            vm.submitData.corporation = ret.data.dataMap.corporation;
            vm.submitData.belongCode = ret.data.dataMap.belongCode;
            vm.submitData.picUrl = ret.data.imageUrl;
            vm.submitData.picNameList = ret.data.imageUrl;
          } else {
            layer.alert(err.message, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    submitEvent: function() {
      var vm = this;
      if (vm.submitData.graindepotName === "") {
        layer.msg("请填写库点名称");
        return;
      }
      if (vm.submitData.graindepotTypeId === "") {
        layer.msg("请选择库点类型");
        return;
      }
      if (vm.submitData.enterpriseCode === "") {
        layer.msg("请填写企业编码");
        return;
      }
      if (vm.submitData.graindepotGbCode === "") {
        layer.msg("请填写库点编码");
        return;
      }
      if (vm.submitData.provinceId === "") {
        layer.msg("请填写省 份");
        return;
      }
      if (vm.submitData.cityId === "") {
        layer.msg("请填写城 市");
        return;
      }
      if (vm.submitData.countryId === "") {
        layer.msg("请填写行 政 区");
        return;
      }
      if (vm.submitData.address === "") {
        layer.msg("请填写详细地址");
        return;
      }
      if (vm.submitData.postalCode === "") {
        layer.msg("请填写邮政编码");
        return;
      }
      if (vm.submitData.faxNo === "") {
        layer.msg("请填写传 真");
        return;
      }
      if (vm.submitData.email === "") {
        layer.msg("请填写邮 箱");
        return;
      }
      if (vm.submitData.developCompany === "") {
        layer.msg("请填写开发单位");
        return;
      }
      if (vm.submitData.storeDesignCapacity === "") {
        layer.msg("请填写仓库设计总容量");
        return;
      }
      if (vm.submitData.storeActualCapacity === "") {
        layer.msg("请填写仓库实际总容量");
        return;
      }
      if (vm.submitData.maxStock === "") {
        layer.msg("请填写最高库存量");
        return;
      }
      if (vm.submitData.minStock === "") {
        layer.msg("请填写最低库存量");
        return;
      }
      if (vm.submitData.storeCount === "") {
        layer.msg("请填写仓库总数");
        return;
      }
      if (vm.submitData.oilcanCount === "") {
        layer.msg("请填写油罐实际总罐容");
        return;
      }
      if (vm.submitData.oilcanDesignCapacity === "") {
        layer.msg("请填写油罐设计总容量");
        return;
      }
      if (vm.submitData.oilcanCount === "") {
        layer.msg("请填写油罐总数");
        return;
      }
      if (vm.submitData.engineCount === "") {
        layer.msg("请填写烘干机数量");
        return;
      }
      if (vm.submitData.terraceWharf === "") {
        layer.msg("请填写地坪信息_专用码头");
        return;
      }
      if (vm.submitData.floorSpace === "") {
        layer.msg("请填写占地面积");
        return;
      }
      if (vm.submitData.engineCooler === "") {
        layer.msg("请填写谷物冷却机数");
        return;
      }
      if (vm.submitData.ensureAeration === "") {
        layer.msg("请填写机械通风仓数");
        return;
      }
      if (vm.submitData.ensureFumigation === "") {
        layer.msg("请填写环流熏蒸仓数");
        return;
      }
      if (vm.submitData.ensureLowTemperature === "") {
        layer.msg("请填写 低温储量仓数");
        return;
      }
      if (vm.submitData.ensureThermometric === "") {
        layer.msg("请填写气调储粮仓数");
        return;
      }
      if (vm.submitData.latitude === "") {
        layer.msg("请填写廒间总数");
        return;
      }
      if (vm.submitData.gdCount === "") {
        layer.msg("请填写库区数");
        return;
      }
      if (vm.submitData.infoEditType === "") {
        layer.msg("请填写数据录入类型");
        return;
      }
      if (vm.submitData.itIsBusiness === "") {
        layer.msg("请选择业务管理系统");
        return;
      }
      if (vm.submitData.itIsStorage === "") {
        layer.msg("请选择仓储管理系统");
        return;
      }
      if (vm.submitData.itIsAuto === "") {
        layer.msg("请选择自动化作业系统");
        return;
      }
      if (vm.submitData.itIsRemote === "") {
        layer.msg("请选择监管系统");
        return;
      }
      if (vm.submitData.itIsOther === "") {
        layer.msg("请选择其他管理系统");
        return;
      }
      if (vm.submitData.warehouseCount === "") {
        layer.msg("请填写经度");
        return;
      }
      if (vm.submitData.longitude === "") {
        layer.msg("请填写纬度");
        return;
      }
      if (vm.submitData.phoneNo === "") {
        layer.msg("请填写联系电话");
        return;
      }
      if (vm.submitData.belongId === "") {
        layer.msg("请填写上级机构ID");
        return;
      }
      if (vm.submitData.cellphone === "") {
        layer.msg("请填写手机号");
        return;
      }
      if (vm.submitData.corporation === "") {
        layer.msg("请填写法人代表");
        return;
      }
      if (vm.submitData.belongCode === "") {
        layer.msg("请填写上级机构编码");
        return;
      }
      if (vm.type=='edit') {
        layer.load(2);
        libraryEdit(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("编辑库点成功！");
              this.$router.push({
                name: "libraryManage",
                query: {
                  graindepotGbCode:this.$route.query.graindepotGbCode,
                  graindepotName:this.$route.query.graindepotName,
                  graindepotTypeId:this.$route.query.graindepotTypeId,
                  pageNo:this.$route.query.pageNo
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
        libraryNew(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增库点成功！");
              this.$router.push({
                name: "libraryManage",
                query: {
                  graindepotGbCode:this.$route.query.graindepotGbCode,
                  graindepotName:this.$route.query.graindepotName,
                  graindepotTypeId:this.$route.query.graindepotTypeId,
                  pageNo:this.$route.query.pageNo
                }
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
    getLibraryType: function() {
      var vm = this;
      libraryTypeDropdown({})
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.libraryTypeList = ret.data.grainDepotTypeList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
      companyList({})
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.companyDataList = ret.data.dataList;
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
    vm.getLibraryType();
    if (this.$route.query.id) {
      vm.getDetail();
    }
    uploadPic("uploadPic", function(ret) {
      if (ret.code == 200) {
          // console.log(JSON.stringify(ret))
          vm.submitData.picNameList=ret.data.fileName;
          vm.submitData.picUrl=ret.data.fileUrl;
      } else {
        layer.alert("上传文件出错", { closeBtn: 0 });
      }
    });
  }
};
</script>
