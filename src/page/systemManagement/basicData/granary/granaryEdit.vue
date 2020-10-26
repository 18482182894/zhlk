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
                                <label>廒间名称：</label>
                                <input type="text" class="input-text" v-model="submitData.warehouseName">
                            </span>
                            <span>
                                <label>廒间编号：</label>
                                <input type="text" class="input-text" v-model="submitData.warehouseGbCode">
                            </span>
                            <span>
                                企业编码：
                                <select name="" class="select-style" v-model="submitData.enterpriseCode" @change="getGraindepotGb(submitData.enterpriseCode);">
                                    <option  value="">请选择企业</option>
                                    <option v-for="item in companyDataList" :value="item.enterpriseCode" v-text="item.enterpriseName"></option>
                                </select>
                            </span>
                            <span>
                                <label>库点编码：</label>
                                <select name="" class="select-style" v-model="submitData.graindepotGbCode" @change="getStorehouse(submitData.graindepotGbCode);" >
                                    <option v-for="item in graindepotList" :value="item.graindepotGbCode" v-text="item.graindepotName"></option>
                                </select>
                            </span>
                            <span>
                                <label>仓房编号：</label>
                                <select name="" class="select-style" v-model="submitData.storehouseGbCode">
                                    <option v-for="item in storehouseList" :value="item.storehouseGbCode" v-text="item.storehouseName"></option>
                                </select>
                            </span>
                            <span>
                                责任保管员：
                                <select name="" class="select-style" v-model="submitData.responsibleCustodian">
                                    <option v-for="item in staffListData" :value="item.staff_name" v-text="item.staff_name">
                                    </option>
                                </select>
                            </span>
                            <span style="width: 50%;">
                                省市区：
                                <!-- <input type="text" class="input-text" v-model="submitData.provinceId"> -->
                                <v-distpicker @selected="onSelected" :province="submitData.provice.code" :city="submitData.city.code" :area="submitData.country.code"></v-distpicker>
                            </span>
                            <span>
                                是否国债投资：
                                <select name="" class="select-style" v-model="submitData.nationalDebtInvestmentFlg">
                                    <option value="是">是</option>
                                    <option value="否">否</option>
                                </select>
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
                    <div class="userManage-detail userManage-edit">
                        <div>
                            <span>
                                <label>当前状态：</label>
                                <select name="" class="select-style" v-model="submitData.currentState">
                                    <option v-for="item in granaryStatusList" :value="item.dicInfoCode" v-text="item.dicInfoValue"></option>
                                </select>
                            </span>
                            <span>
                                预计装粮：
                                <div class="edit-grainVariety">
                                  <treeselect v-model="submitData.expectedGrainLoading" :multiple="false" :options="grainVarietyList" />
                                </div>
                            </span>
                            <span>
                                <label>实际装粮:</label>
                                <div class="edit-grainVariety">
                                  <treeselect v-model="submitData.realGrainLoading" :multiple="false" :options="grainVarietyList" />
                                </div>
                            </span>
                            <span>
                                <label>预计数量（千克）:</label>
                                <input type="number" class="input-text" v-model="submitData.expectedQuantity">
                            </span>
                            <span>
                                现有数量（千克）：
                                <input type="number" class="input-text" v-model="submitData.nowQuantity">
                            </span>
                            <span>
                                设计容量（千克）：
                                <input type="number" class="input-text" v-model="submitData.designCapacity">
                            </span>
                            <span>
                                <label>实际容量（千克）：</label>
                                <input type="number" class="input-text" v-model="submitData.actualCapacity">
                            </span>
                            <span>
                                <label>长：</label>
                                <input type="number" class="input-text" v-model="submitData.length">
                            </span>
                            <span>
                                <label>宽：</label>
                                <input type="number" class="input-text" v-model="submitData.width">
                            </span>
                            <span>
                                <label>高：</label>
                                <input type="number" class="input-text" v-model="submitData.height">
                            </span>
                            <span>
                                窗户数量：
                                <input type="text" class="input-text" v-model="submitData.windowNumber">
                            </span>
                            <span>
                                <label>窗户状态：</label>
                                <!-- <input type="text" class="input-text" v-model="submitData.windowStatus"> -->
                                <select name="" class="select-style" v-model="submitData.windowStatus">
                                    <option value="完好">完好</option>
                                    <option value="损坏">损坏</option>
                                </select>
                            </span>
                            <span>
                                <label>通风方式：</label>
                                <select name="" class="select-style" v-model="submitData.aerationType">
                                    <option v-for="item in VentilationModeList" :value="item.dicInfoCode" v-text="item.dicInfoValue"></option>
                                </select>
                            </span>
                            <span>
                                <label>廒间使用状态：</label>
                                <input type="text" class="input-text" v-model="submitData.useStatus">
                            </span>
                            <span>
                                <label>隔热措施：</label>
                                <input type="text" class="input-text" v-model="submitData.heatInsulationMeasures">
                            </span>
                            <span>
                                <label>气密性：</label>
                                <input type="text" class="input-text" v-model="submitData.airtightness">
                            </span>
                            <span>
                                <label>建成年份：</label>
                                <input type="text" class="input-text Wdate"  onclick="WdatePicker({})"  id="builtYear">
                            </span>
                            <span>
                                <label>启用日期：</label>
                                <input type="text" class="input-text Wdate"  onclick="WdatePicker({})"  id="enableDate">
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
                        <img :src="submitData.picUrl?submitData.picUrl:'../../../../../static/images/upload-pic.png'" alt="">
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
 // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import {
  granaryDetail,
  granaryEdit,
  granaryNew
} from "@/api/systemManage/granary";
import { grainVariety,graindepot, storehouse,storehouseType,VentilationMode,companyList,StorageQualification, granaryStatus } from "@/api/systemManage/dropDown";
  import { staffList} from "@/api/systemManage/staff";
import { uploadPic } from "@/utils/public";
export default {
  name: "desktop",
  components: { Treeselect },
  data() {
    return {
      type:this.$route.query.type,
      postData: {
        warehouseGbCode: this.$route.query.id,
        storehouseName: this.$route.query.storehouseName,
        warehouseName: this.$route.query.warehouseName,
        pageNo:this.$route.query.pageNo
      },
      graindepotList: [],
      storehouseList: [],
      grainVarietyList:[],
        storehouseTypeList:[],
        VentilationModeList:[],
        companyDataList:[],
        StorageQualificationList:[],
        staffListData:[],
        granaryStatusList:[],
      submitData: {
        warehouseGbCode: "",
        warehouseName: "",
        graindepotGbCode: "",

        provice: "",
        city: "",
        country: "",
        provinceName:'',
        cityName:'',
        countryName:'',

        currentState:'',
        responsibleCustodian:'',
        nationalDebtInvestmentFlg:'',
        expectedGrainLoading:null,
        realGrainLoading:null,
        expectedQuantity:'',
        nowQuantity:'',
        designCapacity:'',
        actualCapacity:'',
        newTypeOfSensor:'',
        windowNumber:'',
        windowStatus:'',
        aerationType:'',
        useStatus:'',
        heatInsulationMeasures:'',
        airtightness:'',

        storehouseGbCode: "",
        enterpriseCode: "",
        actualCapacity: "",
        newTypeOfSensor:'',
        length:'',
        width:'',
        height:'',
        picNameList:'',
        picUrl:''
      }
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      granaryDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            console.log(JSON.stringify(ret))

            vm.submitData.enterpriseCode = ret.data.dataMap.enterpriseCode;
            vm.$nextTick(function() {
              vm.getGraindepotGb(ret.data.dataMap.enterpriseCode);
            });
            vm.submitData.warehouseGbCode = ret.data.dataMap.warehouseGbCode;
            vm.submitData.warehouseName = ret.data.dataMap.warehouseName;
            vm.submitData.graindepotGbCode = ret.data.dataMap.graindepotGbCode;

            vm.$nextTick(function() {
              vm.getStorehouse(ret.data.dataMap.graindepotGbCode);
            });
            vm.submitData.provice = ret.data.dataMap.provice;
            vm.submitData.city = ret.data.dataMap.city;
            vm.submitData.country = ret.data.dataMap.country;

            vm.submitData.responsibleCustodian = ret.data.dataMap.responsibleCustodian;
            vm.submitData.nationalDebtInvestmentFlg = ret.data.dataMap.nationalDebtInvestmentFlg;
            vm.submitData.expectedGrainLoading = ret.data.dataMap.expectedGrainLoading;
            vm.submitData.realGrainLoading = ret.data.dataMap.realGrainLoading;
            vm.submitData.expectedQuantity = ret.data.dataMap.expectedQuantity;
            vm.submitData.nowQuantity = ret.data.dataMap.nowQuantity;
            vm.submitData.designCapacity = ret.data.dataMap.designCapacity;
            vm.submitData.actualCapacity = ret.data.dataMap.actualCapacity;
            vm.submitData.newTypeOfSensor = ret.data.dataMap.newTypeOfSensor;
            vm.submitData.windowNumber = ret.data.dataMap.windowNumber;
            vm.submitData.windowStatus = ret.data.dataMap.windowStatus;
            vm.submitData.aerationType = ret.data.dataMap.aerationType;
            vm.submitData.useStatus = ret.data.dataMap.useStatus;
            vm.submitData.heatInsulationMeasures = ret.data.dataMap.heatInsulationMeasures;
            vm.submitData.airtightness = ret.data.dataMap.airtightness;
            vm.submitData.builtYear = ret.data.dataMap.builtYear.substr(0, 10);
            $("#builtYear").val(ret.data.dataMap.builtYear.substr(0, 10))
            vm.submitData.enableDate =ret.data.dataMap.enableDate.substr(0, 10) ;
            $("#enableDate").val(ret.data.dataMap.enableDate.substr(0, 10))
            vm.submitData.currentState = ret.data.dataMap.currentState;

            vm.submitData.storehouseGbCode = ret.data.dataMap.storehouseGbCode;


            vm.submitData.actualCapacity = ret.data.dataMap.actualCapacity;
            vm.submitData.newTypeOfSensor = ret.data.dataMap.newTypeOfSensor;
            vm.submitData.length = ret.data.dataMap.length;
            vm.submitData.width = ret.data.dataMap.width;
            vm.submitData.height = ret.data.dataMap.height;
            vm.submitData.picNameList = ret.data.dataMap.picNameList;
            vm.submitData.picUrl=ret.data.dataMap.imagUrl+'/'+ret.data.dataMap.imageName;
            vm.$nextTick(function() {
              vm.getDropDown();
            });
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
      vm.submitData.builtYear = $("#builtYear").val();
      vm.submitData.enableDate = $("#enableDate").val();
      if (vm.submitData.warehouseName == "") {
        layer.msg("请填写廒间名称");
        return;
      }
      if (vm.submitData.storehouseGbCode == "") {
        layer.msg("请填写仓房编号");
        return;
      }
      if (vm.submitData.enterpriseCode == "") {
        layer.msg("请填写企业编码");
        return;
      }
      if (vm.submitData.provice == "") {
        layer.msg("请填写省份");
        return;
      }
      if (vm.submitData.city == "") {
        layer.msg("请填写城市");
        return;
      }
      if (vm.submitData.country == "") {
        layer.msg("请填写行政区");
        return;
      }
      if (vm.submitData.warehouseStatus == "") {
        layer.msg("请填写仓房状态");
        return;
      }
      if (vm.submitData.actualCapacity == "") {
        layer.msg("请填写实际容量");
        return;
      }
      if (vm.type=='edit' || vm.type=='change') {
        layer.load(2);
        granaryEdit(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("编辑廒间成功！");
              this.$router.push({
                name: "granary",
                query: {
                  storehouseName:vm.postData.storehouseName,
                  warehouseName:vm.postData.warehouseName,
                  pageNo:vm.postData.pageNo
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
        granaryNew(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增廒间成功！");
              this.$router.push({
                name: "granary",
                query: {
                  storehouseName:vm.postData.storehouseName,
                  warehouseName:vm.postData.warehouseName,
                  pageNo:vm.postData.pageNo
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
    getGraindepotGb:function (id) {//获取库点
      var vm = this;
      layer.load(2);
        graindepot(id)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            console.log(JSON.stringify(ret))
            vm.graindepotList = ret.data.dataList;
          } else {
            if (ret.code == 500&&ret.data=='查询错误，没有数据') {
                vm.graindepotList=[];
            }else{
                layer.alert(ret.data, { closeBtn: 0 });
            }
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getStorehouse:function (id) {//仓房
      var vm = this;
      layer.load(2);
      storehouse(id)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.storehouseList = ret.data.dataList;
          } else {
            if (ret.code == 500&&ret.data=='查询错误，没有数据') {
                vm.storehouseList=[];
            }else{
                layer.alert(ret.data, { closeBtn: 0 });
            }
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });

    },
    getDropDown: function() {
      //获取下拉数据
      var vm = this;
        VentilationMode()
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.VentilationModeList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
        staffList({
              pageSize: 1000,
              pageNo: 0
            }).then(ret => {//职工列表
                if (ret.code == 200) {
                  // console.log(JSON.stringify(ret))
                  for (var i = 0; i < ret.data.staffList.length; i++) {
                    vm.staffListData.push({
                      staff_id:ret.data.staffList[i].staff_id,
                      staff_name:ret.data.staffList[i].staff_name
                    });
                  }
                  // vm.staffListData = ret.data.staffList;
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
            }).catch(err => {
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

      StorageQualification()
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.StorageQualificationList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
      granaryStatus()
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.granaryStatusList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
      grainVariety({})
        .then(ret => {
          //粮食品种
          if (ret.code == 200) {
            vm.grainVarietyList = ret.data.grainVarietyList;
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
      vm.submitData.provice=data.province.code ;
      vm.submitData.city=data.city.code ;
      vm.submitData.country=data.area.code;
      // vm.submitData.provinceName=data.province.value ;
      // vm.submitData.cityName=data.city.value ;
      // vm.submitData.countryName=data.area.value;
    },
    detailBack:function (id,storehouseName,warehouseName,pageNo) {
      var vm=this;
      this.$router.push({
        name: "granary",
        query: {
          id:id,
          storehouseName:vm.postData.storehouseName,
          warehouseName:vm.postData.warehouseName,
          pageNo:vm.postData.pageNo
        }
      });
    }
  },
  mounted() {
    var vm = this;
    vm.getDropDown();
    if (this.$route.query.id) {
      vm.getDetail();
    }
    uploadPic("uploadPic", function(ret) {
      if (ret.code == 200) {
          console.log(JSON.stringify(ret))
          vm.submitData.picNameList=ret.data.fileName;
          vm.submitData.picUrl=ret.data.fileUrl;
      } else {
        layer.alert("上传文件出错", { closeBtn: 0 });
      }
    });
  }
};
</script>
