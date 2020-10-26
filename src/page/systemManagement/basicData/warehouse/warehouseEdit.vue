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
                                仓房名称：
                                <input type="text" class="input-text" v-model="submitData.storehouseName">
                            </span>
                            <!-- <span>
                                仓房编码：
                                <input type="text" class="input-text" v-model="submitData.storehouseGbCode">
                            </span> -->
                           <!--  <span>
                                库点名称：
                                <input type="text" class="input-text" v-model="submitData.">
                            </span> -->
                            <span>
                                企业编码：
                                <select name="" class="select-style" v-model="submitData.enterpriseCode" @change="getGraindepotGb(submitData.enterpriseCode);">
                                    <option  value="">请选择企业</option>
                                    <option v-for="item in companyDataList" :value="item.enterpriseCode" v-text="item.enterpriseName"></option>
                                </select>
                            </span>
                            <span>
                                库点编号：
                                <select name="" class="select-style" v-model="submitData.graindepotGbCode" >
                                    <option value="">请选择库点</option>
                                    <option v-for="item in graindepotList" :value="item.graindepotGbCode" v-text="item.graindepotName"></option>
                                </select>
                            </span>
                            <span>
                                仓房类型：
                                <select name="" class="select-style" v-model="submitData.storehouseType">
                                    <option v-for="item in storehouseTypeList" :value="item.dicInfoCode" v-text="item.dicInfoValue"></option>
                                </select>
                            </span>
                            <span>
                                仓房状态：
                                <select name="" class="select-style" v-model="submitData.storehouseState">
                                    <option v-for="item in StorehouseStatusList" :value="item.dicInfoCode" v-text="item.dicInfoValue"></option>
                                </select>
                            </span>
                            <span>
                                主要业务：
                                <select name="" class="select-style" v-model="submitData.primaryService">
                                    <option v-for="item in mainBusinessList" :value="item.dicInfoCode" v-text="item.dicInfoValue"></option>
                                </select>
                            </span>
                            <span>
                                储粮方式：
                                <select name="" class="select-style"  v-model="submitData.storeWay">
                                    <option value="1">散装</option>
                                    <option value="2">包装</option>
                                </select>
                            </span>
                            <span>
                                使用情况：
                                <select name="" class="select-style" v-model="submitData.useType">
                                    <option v-for="item in UsageSituationList" :value="item.dicInfoCode" v-text="item.dicInfoValue"></option>
                                </select>
                            </span>
                            <span>
                                储存资格:
                                <select name="" class="select-style" v-model="submitData.storagetype">
                                    <option v-for="item in StorageQualificationList" :value="item.dicInfoCode" v-text="item.dicInfoValue"></option>
                                </select>
                            </span>

                            <span style="width: 50%;">
                                省市区：
                                <!-- <input type="text" class="input-text" v-model="submitData.provinceId"> -->
                                <v-distpicker @selected="onSelected" :province="submitData.provice.code" :city="submitData.city.code" :area="submitData.country.code"></v-distpicker>
                            </span>

                            <span>
                                设计容量（千克）：
                                <input type="text" class="input-text" v-model="submitData.designCapacity">
                            </span>
                            <span>
                                实际容量（千克）：
                                <input type="text" class="input-text" v-model="submitData.actualCapacity">
                            </span>
                            <span>
                                通风方式：
                                <select name="" class="select-style" v-model="submitData.aerationType">
                                    <option v-for="item in VentilationModeList" :value="item.dicInfoCode" v-text="item.dicInfoValue"></option>
                                </select>
                            </span>
                            <span>
                                隔热措施：
                                <input type="text" class="input-text" v-model="submitData.heatInsulationMeasures">
                            </span>
                            <span>
                                气密性：
                                <input type="text" class="input-text" v-model="submitData.airtightness">
                            </span>
                            <span>
                                建成年份：
                                <input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})"  id="startTime" >
                            </span>
                            <span>
                                启用日期：
                                <input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})" id="enableDate">
                            </span>
                            <span>
                                是否国债投资：
                                <select name="" class="select-style" v-model="submitData.nationalDebtInvestmentFlg">
                                    <option value="是">是</option>
                                    <option value="否">否</option>
                                </select>
                            </span>
                            <span>
                                责任保管员：
                                <select name="" class="select-style" v-model="submitData.responsibleCustodian">
                                    <option v-for="item in staffListData" :value="item.staff_name" v-text="item.staff_name">
                                    </option>
                                </select>
                            </span>
                          <span>
                                房顶结构：
                                <select name="" class="select-style" v-model="submitData.roof">
                                    <option value="01">钢筋砼</option>
                                    <option value="02">砖混</option>
                                    <option value="03">钢筋</option>
                                    <option value="04">砼</option>
                                    <option value="99">其他</option>
                                </select>
                            </span>
                          <span>
                                房架结构：
                                <select name="" class="select-style" v-model="submitData.wall">
                                    <option value="01">钢筋砼</option>
                                    <option value="02">砖混</option>
                                    <option value="03">钢筋</option>
                                    <option value="04">砼</option>
                                    <option value="99">其他</option>
                                </select>
                            </span>
                          <span>
                                仓外长：
                               <input type="text" class="input-text" v-model="submitData.length">米
                            </span>
                          <span>
                                仓外高：
                               <input type="text" class="input-text" v-model="submitData.height">米
                            </span>
                          <span>
                                仓外房檐高：
                               <input type="text" class="input-text" v-model="submitData.outHeight">米
                            </span>

                          <span>
                                仓外顶高：
                               <input type="text" class="input-text" v-model="submitData.outTopHeight">米
                            </span>
                          <span>
                                仓外筒仓外径：
                               <input type="text" class="input-text" v-model="submitData.grainRadius">米
                            </span>
                          <span>
                                仓内体积：
                               <input type="text" class="input-text" v-model="submitData.storeVolume">米
                            </span>
                          <span>
                                粮堆体积：
                               <input type="text" class="input-text" v-model="submitData.grainVolume">米
                            </span>
                          <span>
                                仓门数量：
                               <input type="text" class="input-text" v-model="submitData.doorNum">
                            </span>
                          <span>
                                仓门位置：
                               <input type="text" class="input-text" v-model="submitData.doorLocation">
                            </span>
                          <span>
                                仓门高度：
                               <input type="text" class="input-text" v-model="submitData.doorHeight">米
                            </span>
                          <span>
                                仓门宽度：
                               <input type="text" class="input-text" v-model="submitData.doorWidth">米
                            </span>
                          <span>
                                仓房是否完好：
                                <select name="" class="select-style" v-model="submitData.storeCheck">
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                    <option value="9">其他或不确定</option>
                                </select>
                            </span>
                          <!--<span>
                                能否隔热保温：
                                <select name="" class="select-style" v-model="submitData.heatInsulationMeasures">
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                    <option value="9">其他或不确定</option>
                                </select>
                            </span>-->
                          <span>
                                能否散装储存：
                                <select name="" class="select-style" v-model="submitData.checkStockpile">
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                    <option value="9">其他或不确定</option>
                                </select>
                            </span>
                          <span>
                                有无防鼠防雀防虫装置及设施：
                                <select name="" class="select-style" v-model="submitData.checkInsectMouse">
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                    <option value="9">其他或不确定</option>
                                </select>
                            </span>
                          <span>
                                有无防火防爆防盗措施：
                                <select name="" class="select-style" v-model="submitData.checkFire">
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                    <option value="9">其他或不确定</option>
                                </select>
                            </span>
                          <span>
                                有无粮情检测设施：
                                <select name="" class="select-style" v-model="submitData.checkGrainTem">
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                    <option value="9">其他或不确定</option>
                                </select>
                            </span>
                          <span>
                                有无机械通风设施：
                                <select name="" class="select-style" v-model="submitData.checkEquipWind">
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                    <option value="9">其他或不确定</option>
                                </select>
                            </span>
                          <span>
                                能否环流熏蒸杀虫：
                                <select name="" class="select-style" v-model="submitData.checkEquipInsect">
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                    <option value="9">其他或不确定</option>
                                </select>
                            </span>
                          <span>
                                能否富氮低氧气调储粮：
                                <select name="" class="select-style" v-model="submitData.checkEquipGas">
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                    <option value="9">其他或不确定</option>
                                </select>
                            </span>
                          <span>
                                能否仓外测虫：
                                <select name="" class="select-style" v-model="submitData.checkOutInsect">
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                    <option value="9">其他或不确定</option>
                                </select>
                            </span>
                          <span>
                                厫间数：
                               <input type="text" class="input-text" v-model="submitData.warehouseNum">
                            </span>
                          <span>
                                利用情况：
                                <select name="" class="select-style" v-model="submitData.takeCondition">
                                    <option value="0">空值</option>
                                    <option value="1">储粮</option>
                                    <option value="2">占用</option>
                                    <option value="3">挪用他用</option>
                                    <option value="9">其他或不确定</option>
                                </select>
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
                            <textarea class="custom-textarea" style="resize:none">

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
<style scoped>
  .userManage-edit > div span .input-text{
    display: inline-block;
  }
</style>
<script>
import {
  warehouseDetail,
  warehouseEdit,
  warehouseNew
} from "@/api/systemManage/basicData/warehouse";
import { storehouseType,VentilationMode,UsageSituation,StorageQualification, StorehouseStatus,companyList,graindepot,mainBusiness} from "@/api/systemManage/dropDown";
  import { staffList} from "@/api/systemManage/staff";
export default {
  name: "warehouseEdit",
  data() {
    return {
        type:this.$route.query.type,
        postData:{
            storehouseGbCode:this.$route.query.id
        },
        storehouseTypeList:[],
        VentilationModeList:[],
        UsageSituationList:[],
        companyDataList:[],//企业列表
        graindepotList:[],//库点列表
        mainBusinessList:[],//主要业务
        StorageQualificationList:[],
        staffListData:[],
        StorehouseStatusList:[],
        debugAdmin:'',
        provinceList:[],
        submitData:{
          storehouseName:'',
          storehouseGbCode:this.$route.query.id,
          graindepotGbCode:'',
          enterpriseCode:'',
          storehouseType:'',
          storehouseState:'',
          primaryService:'',
          storeWay:'',
          useType:'',
          storagetype:'',
          designCapacity:'',
          actualCapacity:'',
          provice:'',
          city:'',
          country:'',
          provinceName:'',
          cityName:'',
          countryName:'',
          completedYear:'',
          aerationType:'',
          heatInsulationMeasures:'',
          airtightness:'',
          enableDate:'',
          nationalDebtInvestmentFlg:'',
          responsibleCustodian:'',

          roof:'',
          wall:'',
          length:'',
          height:'',
          outHeight:'',
          outTopHeight:'',
          grainRadius:'',
          storeVolume:'',
          grainVolume:'',
          doorNum:'',
          doorLocation:'',
          doorHeight:'',
          doorWidth:'',
          storeCheck:'',
          checkStockpile:'',
          checkInsectMouse:'',
          checkFire:'',
          checkGrainTem:'',
          checkEquipWind:'',
          checkEquipInsect:'',
          checkEquipGas:'',
          checkOutInsect:'',
          warehouseNum:'',
          takeCondition:''
        }
    }
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      warehouseDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            //console.log(ret.data.dataMap);
            vm.submitData.storehouseName = ret.data.dataMap.storehouseName;
            vm.submitData.graindepotGbCode = ret.data.dataMap.graindepotGbCode;
            vm.submitData.enterpriseCode = ret.data.dataMap.enterpriseCode;

            vm.$nextTick(function() {
              vm.getGraindepotGb(ret.data.dataMap.enterpriseCode);
            });
            if (ret.data.dataMap.storehouseType!='') {
              vm.submitData.storehouseType = ret.data.dataMap.storehouseType[0].dicInfoCode;
            }
            if (ret.data.dataMap.storehouseState!='') {
              vm.submitData.storehouseState = ret.data.dataMap.storehouseState[0].dicInfoCode;
            }
            vm.submitData.primaryService = ret.data.dataMap.primaryService;
            vm.submitData.storeWay = ret.data.dataMap.storeWay;
            vm.submitData.useType = ret.data.dataMap.useType;

            vm.submitData.provice = ret.data.dataMap.provice;
            vm.submitData.city = ret.data.dataMap.city;
            vm.submitData.country = ret.data.dataMap.country;

            vm.submitData.provinceName = ret.data.dataMap.province;
            vm.submitData.cityName = ret.data.dataMap.city;
            vm.submitData.countryName = ret.data.dataMap.country;

            vm.submitData.designCapacity = ret.data.dataMap.designCapacity;
            vm.submitData.actualCapacity = ret.data.dataMap.actualCapacity;
            vm.submitData.completedYear = ret.data.dataMap.completedYear.substr(0, 10);

            vm.submitData.aerationType = ret.data.dataMap.aerationType;
            vm.submitData.heatInsulationMeasures = ret.data.dataMap.heatInsulationMeasures;
            vm.submitData.airtightness = ret.data.dataMap.airtightness;
            vm.submitData.enableDate = ret.data.dataMap.enableDate.substr(0, 10);
            $("#enableDate").val(ret.data.dataMap.enableDate.substr(0, 10));

            vm.submitData.nationalDebtInvestmentFlg = ret.data.dataMap.nationalDebtInvestmentFlg;
            vm.submitData.responsibleCustodian = ret.data.dataMap.responsibleCustodian;

            $("#startTime").val(ret.data.dataMap.completedYear.substr(0, 10));
            vm.submitData.storagetype = ret.data.dataMap.storagetype;

            vm.submitData.roof=ret.data.dataMap.roof;
            vm.submitData.wall=ret.data.dataMap.wall;
            vm.submitData.length=ret.data.dataMap.length;
            vm.submitData.height=ret.data.dataMap.height;
            vm.submitData.outHeight=ret.data.dataMap.outHeight;
            vm.submitData.outTopHeight=ret.data.dataMap.outTopHeight;
            vm.submitData.grainRadius=ret.data.dataMap.grainRadius;
            vm.submitData.storeVolume=ret.data.dataMap.storeVolume;
            vm.submitData.grainVolume=ret.data.dataMap.grainVolume;
            vm.submitData.doorNum=ret.data.dataMap.doorNum;
            vm.submitData.doorLocation=ret.data.dataMap.doorLocation;
            vm.submitData.doorHeight=ret.data.dataMap.doorHeight;
            vm.submitData.doorWidth=ret.data.dataMap.doorWidth;
            vm.submitData.storeCheck=ret.data.dataMap.storeCheck;
            vm.submitData.checkStockpile=ret.data.dataMap.checkStockpile;
            vm.submitData.checkInsectMouse=ret.data.dataMap.checkInsectMouse;
            vm.submitData.checkFire=ret.data.dataMap.checkFire;
            vm.submitData.checkGrainTem=ret.data.dataMap.checkGrainTem;
            vm.submitData.checkEquipWind=ret.data.dataMap.checkEquipWind;
            vm.submitData.checkEquipInsect=ret.data.dataMap.checkEquipInsect;
            vm.submitData.checkEquipGas=ret.data.dataMap.checkEquipGas;
            vm.submitData.checkOutInsect=ret.data.dataMap.checkOutInsect;
            vm.submitData.warehouseNum=ret.data.dataMap.warehouseNum;
            vm.submitData.takeCondition=ret.data.dataMap.takeCondition;


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
      if (vm.submitData.storehouseName == "") {
        layer.msg("请填写仓房名称");
        return;
      }
      if (vm.submitData.graindepotGbCode == "") {
        layer.msg("请填写库点编号");
        return;
      }
      if (vm.submitData.enterpriseCode == "") {
        layer.msg("请填写企业编码");
        return;
      }
      if (vm.submitData.storehouseType == "") {
        layer.msg("请填写仓房类型");
        return;
      }
      if (vm.submitData.storehouseState == "") {
        layer.msg("请填写仓房状态");
        return;
      }
      if (vm.submitData.primaryService == "") {
        layer.msg("请填写主要业务");
        return;
      }
      if (vm.submitData.storeWay == "") {
        layer.msg("请填写储粮方式");
        return;
      }
      if (vm.submitData.useType == "") {
        layer.msg("请填写使用情况");
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
      if (vm.submitData.designCapacity == "") {
        layer.msg("请填写设计容量");
        return;
      }
      if (vm.submitData.actualCapacity == "") {
        layer.msg("请填写实际容量");
        return;
      }
      vm.submitData.completedYear = $("#startTime").val();
      vm.submitData.enableDate = $("#enableDate").val();
      if (vm.submitData.completedYear == "") {
        layer.msg("请填写建成年份");
        return;
      }
      if (vm.submitData.roof == "") {
        layer.msg("请选择房顶结构");
        return;
      }
      if (vm.submitData.wall == "") {
        layer.msg("请选择房架结构");
        return;
      }
      if (vm.submitData.length == "") {
        layer.msg("请填写仓外长");
        return;
      }
      if (vm.submitData.height == "") {
        layer.msg("请填写仓外高");
        return;
      }
      if (vm.submitData.outHeight == "") {
        layer.msg("请填写仓外房檐高");
        return;
      }
      if (vm.submitData.outTopHeight == "") {
        layer.msg("请填写仓外顶高");
        return;
      }
      if (vm.submitData.grainRadius == "") {
        layer.msg("请填写仓外筒仓外径");
        return;
      }
      if (vm.submitData.storeVolume == "") {
        layer.msg("请填写仓内体积");
        return;
      }
      if (vm.submitData.grainVolume == "") {
        layer.msg("请填写粮堆体积");
        return;
      }
      if (vm.submitData.doorNum == "") {
        layer.msg("请填写仓门数量");
        return;
      }
      if (vm.submitData.doorLocation == "") {
        layer.msg("请填写仓门位置");
        return;
      }
      if (vm.submitData.doorHeight == "") {
        layer.msg("请填写仓门高度");
        return;
      }
      if (vm.submitData.doorWidth == "") {
        layer.msg("请填写仓门宽度");
        return;
      }
      if (vm.submitData.storeCheck == "") {
        layer.msg("请选择仓房是否完好");
        return;
      }
      if (vm.submitData.checkStockpile == "") {
        layer.msg("请选择能否散装储存");
        return;
      }
      if (vm.submitData.checkInsectMouse == "") {
        layer.msg("请选择有误防鼠防雀防虫装置及设施");
        return;
      }
      if (vm.submitData.checkFire == "") {
        layer.msg("请选择有无防火防爆防盗措施");
        return;
      }
      if (vm.submitData.checkGrainTem == "") {
        layer.msg("请选择有无粮情检测设施");
        return;
      }
      if (vm.submitData.checkEquipWind == "") {
        layer.msg("请选择有无机械通风设施");
        return;
      }
      if (vm.submitData.checkEquipInsect == "") {
        layer.msg("请选择能否环流熏蒸杀虫");
        return;
      }
      if (vm.submitData.checkEquipGas == "") {
        layer.msg("请选择能否富氮低氧气调储粮");
        return;
      }
      if (vm.submitData.checkOutInsect == "") {
        layer.msg("请选择能否仓外测虫");
        return;
      }
      if (vm.submitData.warehouseNum == "") {
        layer.msg("请填写厫间数");
        return;
      }
      if (vm.submitData.takeCondition == "") {
        layer.msg("请选择利用情况");
        return;
      }


      if (vm.type=='edit' || vm.type=='change') {
        layer.load(2);
        warehouseEdit(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("编辑仓房成功！");
              this.$router.push({
                name: "warehouse",
                query: {
                  storehouseGbCode:this.$route.query.storehouseGbCode,
                  storehouseName:this.$route.query.storehouseName,
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
        warehouseNew(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增仓房成功！");
              this.$router.push({
                name: "warehouse",
                query: {
                  storehouseGbCode:this.$route.query.storehouseGbCode,
                  storehouseName:this.$route.query.storehouseName,
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
    getGraindepotGb:function (id) {//获取库点
      var vm = this;
      layer.load(2);
        graindepot(id)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
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
    getStorehouseType: function() {
      //获取仓房类型
      var vm = this;
      layer.load(2);
      storehouseType()
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.storehouseTypeList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
      VentilationMode()
        .then(ret => {//通风方式
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
      UsageSituation()
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.UsageSituationList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });

      StorageQualification()
        .then(ret => {//储存资格
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
      StorehouseStatus()
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.StorehouseStatusList = ret.data.dataList;
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
        mainBusiness({})
        .then(ret => {//主要业务
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.mainBusinessList = ret.data.dataList;
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
    detailBack:function () {
      /*this.$router.back(-1);*/
      this.$router.push({
        name: "warehouse",
        query: {
          storehouseGbCode:this.$route.query.storehouseGbCode,
          storehouseName:this.$route.query.storehouseName,
          pageNo:this.$route.query.pageNo
        }
      });
    }
  },
  mounted () {
        var vm=this;
        vm.getStorehouseType();
        // vm.getProvinceList();
        if (this.$route.query.id) {
            vm.getDetail();
        }
  }
}
</script>
