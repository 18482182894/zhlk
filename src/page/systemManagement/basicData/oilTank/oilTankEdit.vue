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
                                油罐名称：</label>
                                <input type="text" class="input-text" v-model="submitData.oilcanName">
                            </span>
                            <span>
                                <label>
                                油罐编码：</label>
                                <input type="text" class="input-text" v-model="submitData.oilcanCode">
                            </span>
                            <!-- <span>
                                库点名称：
                                <input type="text" class="input-text" v-model="submitData.graindepotName">
                            </span> -->
                            <!-- <span>
                                库点编码：
                                <input type="text" class="input-text" v-model="submitData.graindepotGbCode">
                            </span> -->
                            <span>
                                <label>
                                主要业务：</label>
                                <select name="" class="select-style" v-model="submitData.primaryService">
                                    <option v-for="item in businessTypeList" :value="item.dicInfoCode" v-text="item.dicInfoValue"></option>
                                </select>
                            </span>
                            <span>
                                <label>
                                企业编码：</label>
                                <select name="" class="select-style" v-model="submitData.enterpriseCode" @change="getGraindepotGb(submitData.enterpriseCode);">
                                    <option  value="">请选择企业</option>
                                    <option v-for="item in companyDataList" :value="item.enterpriseCode" v-text="item.enterpriseName"></option>
                                </select>
                            </span>
                            <span>
                                <label>
                                库点：</label>
                                <!-- <input type="text" class="input-text" v-model="submitData.graindepotGbCode"> -->
                                <select name="" class="select-style" v-model="submitData.graindepotGbCode">
                                    <option :value="item.graindepotGbCode" v-for="item in graindepotList" v-text="item.graindepotName"></option>
                                </select>
                            </span>

                            <span style="width: 50%;">
                                省市区：
                                <!-- <input type="text" class="input-text" v-model="submitData.provinceId"> -->
                                <v-distpicker @selected="onSelected" :province="submitData.provice.code" :city="submitData.city.code" :area="submitData.country.code"></v-distpicker>
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
                    <div class="userManage-detail userManage-edit">
                        <div>
                            <span>
                                <label>
                                油罐状态：</label>
                                <select name="" class="select-style" v-model="submitData.ocState">
                                    <option v-for="item in oilStateList" :value="item.dicInfoCode" v-text="item.dicInfoValue"></option>
                                </select>
                            </span>
                            <span>
                                <label>
                                使用情况：</label>
                                <select name="" class="select-style" v-model="submitData.useState">
                                    <option v-for="item in usageList" :value="item.dicInfoCode" v-text="item.dicInfoValue"></option>
                                </select>
                            </span>
                            <span>
                                <label>
                                油罐规格：</label>
                                <input type="text" class="input-text" v-model="submitData.ocFormat">
                            </span>
                            <span>
                                <label>
                                设计罐容(千克)：</label>
                                <input type="text" class="input-text" v-model="submitData.designCapacity">
                            </span>
                            <span>
                                <label>
                                实际罐容(千克):</label>
                                <input type="text" class="input-text" v-model="submitData.actualCapacity">
                            </span>
                            <span>
                                <label>
                                油罐直径：</label>
                                <input type="text" class="input-text" v-model="submitData.diameter">
                            </span>
                            <span>
                                <label>
                                油罐高度：</label>
                                <input type="text" class="input-text" v-model="submitData.height">
                            </span>
                            <span>
                                <label>
                                装油线高度:</label>
                                <input type="text" class="input-text" v-model="submitData.ladeLineHeight">
                            </span>
                            <span>
                                <label>
                                装备情况(打孔):</label>
                                <select name="" class="select-style" v-model="submitData.equipmentState">
                                    <option v-for="item in equipStateList" :value="item.dicInfoCode" v-text="item.dicInfoValue"></option>
                                </select>
                            </span>
                            <span>
                                <label>
                                经度:</label>
                                <input type="text" class="input-text" v-model="submitData.longitude">
                            </span>
                            <span>
                                <label>
                                纬度:</label>
                                <input type="text" class="input-text" v-model="submitData.latitude">
                            </span>
                            <span>
                                <label>
                                建成年份：</label>
                                <input type="text" class="input-text Wdate" onclick="WdatePicker({})"  id="constructionYear" >
                            </span>
                            <span>
                                <label>
                                启用日期</label>
                                <input type="text" class="input-text Wdate" onclick="WdatePicker({})"  id="enableDate" >
                            </span>
                            <span>
                                <label>
                                现有容量(千克):</label>
                                <input type="text" class="input-text" v-model="submitData.remark">
                            </span>
                        </div>
                    </div>
                </div>
            </div>
           <!--  <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">审核</div>
                </div>
                <div class="tag-box-content">
                    <div class="formula-item">
                        <div class="formula-right">
                            <textarea class="custom-textarea" style="resize:none" >
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
  oilTankDetail,
  oilTankEdit,
  oilTankNew
} from "@/api/systemManage/basicData/oilTank";
import {
  oilState,
  usage,
  equipState,
  businessType,
  graindepot,
  companyList
} from "@/api/systemManage/dropDown";
export default {
  name: "oilTankEdit",
  data() {
    return {
      type:this.$route.query.type,
      postData: {
        oilcanCode: this.$route.query.id,
        oilcan:this.$route.query.oilcanCode,
        oilcanName:this.$route.query.oilcanName,
        pageNo:this.$route.query.pageNo
      },
      oilStateList: "",
      usageList: "",
      equipStateList: "",
      businessTypeList: "",
      graindepotList:[],
      companyDataList:[],
      submitData: {
        enterpriseCode: "",
        graindepotGbCode: "",
        oilcanCode: "",
        oilcanName: "",
        ocFormat: "",
        designCapacity: "",
        actualCapacity: "",
        diameter: "",
        height: "",
        ladeLineHeight: "",
        primaryService: "",
        ocState: "",
        useState: "",
        equipmentState: "",
        longitude: "",
        latitude: "",
        remark: "",
        auditstate: "",

        provice: "",
        city: "",
        country: "",
        enableDate:'',
        constructionYear: ""
      }
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
            vm.submitData.enterpriseCode = ret.data.oilcanDetail.enterpriseCode;
            vm.$nextTick(function() {
              vm.getGraindepotGb(ret.data.oilcanDetail.enterpriseCode);
            });
            vm.submitData.graindepotGbCode =
              ret.data.oilcanDetail.graindepotGbCode;
            vm.submitData.graindepotName = ret.data.oilcanDetail.graindepotName;
            vm.submitData.oilcanCode = this.$route.query.id;
            vm.submitData.oilcanName = ret.data.oilcanDetail.oilcanName;
            vm.submitData.ocFormat = ret.data.oilcanDetail.ocFormat;
            vm.submitData.designCapacity = ret.data.oilcanDetail.designCapacity;
            vm.submitData.actualCapacity = ret.data.oilcanDetail.actualCapacity;
            vm.submitData.diameter = ret.data.oilcanDetail.diameter;
            vm.submitData.ladeLineHeight = ret.data.oilcanDetail.ladeLineHeight;
            vm.submitData.primaryService = ret.data.oilcanDetail.primaryService;
            vm.submitData.ocState = ret.data.oilcanDetail.ocState;
            vm.submitData.useState = ret.data.oilcanDetail.useState;
            vm.submitData.equipmentState = ret.data.oilcanDetail.equipmentState;
            vm.submitData.longitude = ret.data.oilcanDetail.longitude;
            vm.submitData.latitude = ret.data.oilcanDetail.latitude;
            vm.submitData.remark = ret.data.oilcanDetail.remark;
            vm.submitData.auditstate = ret.data.oilcanDetail.auditstate;

            vm.submitData.provice = ret.data.oilcanDetail.provice;
            vm.submitData.city = ret.data.oilcanDetail.city;
            vm.submitData.country = ret.data.oilcanDetail.country;
              if (ret.data.oilcanDetail.constructionYear) {
                vm.submitData.constructionYear =
                  ret.data.oilcanDetail.constructionYear.substr(0, 10);
                $("#constructionYear").val(ret.data.oilcanDetail.constructionYear.substr(0, 10));
              }
              if (ret.data.oilcanDetail.enableDate) {
                vm.submitData.enableDate =
                  ret.data.oilcanDetail.enableDate.substr(0, 10);
                $("#enableDate").val(ret.data.oilcanDetail.enableDate.substr(0, 10));
              }

            vm.submitData.height =
              ret.data.oilcanDetail.height;
            vm.$nextTick(function() {
              vm.getdropDown();
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
        vm.submitData.constructionYear = $("#constructionYear").val();
        vm.submitData.enableDate = $("#enableDate").val();
      if (vm.submitData.oilcanName == "") {
        layer.msg("请填写油罐名称");
        return;
      }
      if (vm.submitData.oilcanCode == "") {
        layer.msg("请填写油罐编码");
        return;
      }
      if (vm.submitData.graindepotName == "") {
        layer.msg("请填写库点名称");
        return;
      }
      if (vm.submitData.graindepotGbCode == "") {
        layer.msg("请填写库点编码");
        return;
      }
      if (vm.submitData.primaryServiceValue == "") {
        layer.msg("请填写主要业务");
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
      if (vm.submitData.ocStateValue == "") {
        layer.msg("请填写油罐状态");
        return;
      }
      if (vm.submitData.useStateValue == "") {
        layer.msg("请填写使用情况");
        return;
      }
      if (vm.submitData.ocFormat == "") {
        layer.msg("请填写油罐规格");
        return;
      }
      if ($("#constructionYear").val() == "") {
        layer.msg("请填写建成年份");
        return;
      } else {
        vm.submitData.constructionYear = $("#constructionYear").val();
      }
      if (vm.type=='edit') {
        layer.load(2);
        oilTankEdit(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("编辑油罐成功！");
              this.$router.push({
                name: "oilTank",
                query: {
                  oilcanCode:vm.postData.oilcan,
                  oilcanName:vm.postData.oilcanName,
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
        oilTankNew(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增油罐成功！");
              this.$router.push({
                name: "oilTank",
                query: {
                  oilcanCode:vm.postData.oilcan,
                  oilcanName:vm.postData.oilcanName,
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
    getdropDown: function() {
      //获取下拉数据
      var vm = this;
      oilState()
        .then(ret => {
          //油罐状态
          if (ret.code == 200) {
            vm.oilStateList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
      usage()
        .then(ret => {
          //使用情况下拉列表
          if (ret.code == 200) {
            vm.usageList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
      equipState()
        .then(ret => {
          //装备情况（打孔）下拉列表
          if (ret.code == 200) {
            vm.equipStateList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
      businessType()
        .then(ret => {
          //业务
          if (ret.code == 200) {
            vm.businessTypeList = ret.data.dataList;
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
      vm.submitData.provice=data.province.code ;
      vm.submitData.city=data.city.code ;
      vm.submitData.country=data.area.code;
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
      vm.getdropDown();
    if (this.$route.query.id) {
      vm.getDetail();
    }
  }
};
</script>
