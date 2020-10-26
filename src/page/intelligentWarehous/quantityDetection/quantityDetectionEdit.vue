<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">粮食数量在线监测编辑</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
               仓库:
                <input type="text" class="input-text" readonly v-model="detail.storehouseName"/>
              </span>
              <span>
                廒间：
                <input type="text" class="input-text" readonly v-model="detail.warehouseName"/>
              </span>
              <span>
                货位：
                <input type="text" class="input-text" readonly v-model="detail.cargoName"/>
              </span>
              <br>
              <span>
                仓库状态：
                <input type="text" class="input-text" readonly v-model="detail.storehouseStatus"/>
              </span>
              <span>
                粮食品种：
                <input type="text" class="input-text" readonly v-model="detail.grainVarietyName"/>
              </span>
              <span>
                保管帐ID：
                <input type="text" class="input-text" readonly v-model="detail.warehouseKeepingAccountId"/>
              </span>
              <span>
                粮食性质：
                <input type="text" class="input-text" readonly v-model="detail.grainPropertyName"/>
              </span>
              <span>
                粮权所属：
                <input type="text" class="input-text" readonly v-model="detail.grainRightsBelongto"/>
              </span>
              <span>
                收获年度：
                <input type="text" class="input-text" readonly v-model="detail.harvestYear"/>
              </span>
              <span>
                库存数量：
                <input type="text" class="input-text" readonly v-model="detail.storageNum"/>
              </span>
              <span>
                检测数量：
                <input type="text" class="input-text" readonly v-model="detail.checkNum"/>
              </span>
              <span>
                粮食等级：
                <input type="text" class="input-text" readonly v-model="detail.grainLevelName"/>
              </span>
              <span>
                测试时间：
                <input type="text" class="input-text Wdate"
                       onclick="WdatePicker({dateFmt: 'yyyy-MM-dd HH:mm:ss',maxDate:'%y-%M-%d'})" id="testDatetime"/>
              </span>
              <span>
                廒间原始编号：
                <input type="text" class="input-text" v-model="detail.warehouseOriginalId">
              </span>
              <span style="width: 100%">
                测试结果：
                <textarea class="edit-textarea" v-model="detail.testResult"/>
              </span>
            </div>
          </div>
          <div class="echarts-3d" id="3d" v-if="detail.grainInfo3dImage"/>
        </div>
      </div>
      <div class="edit-btn">
        <button class="edit-submit" @click="submitEvent();">提交</button>
        <button class="edit-back" @click="detailBack();">返回</button>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
  .echarts-3d {
    height: 500px;
  }
</style>
<script>
  import 'echarts-gl';
  import axios from 'axios';
  import {
    editQuantityDetection,
    fetchQuantityDetection,
    fetchWarehouse
  } from "@/api/intelligentWarehous/quantityDetection";
  import {grainOilLevel, grainNature} from "@/api/systemManage/dropDown";
  import {grainDetail} from '@/api/systemManage/basicData/grainVarieties'

  export default {
    name: "priceManageEdit",
    data() {
      return {
        detail: {
          storehouseGbCode: '',
          storehouseName: '',
          warehouseGbCode: '',
          warehouseName: '',
          cargoCode: '',
          cargoName: '',
          storehouseStatus: '',
          grainVariety: '',
          grainVarietyName: '',
          warehouseKeepingAccountId: '',
          grainProperty: '',
          grainPropertyName: '',
          grainRightsBelongto: '',
          harvestYear: '',
          storageNum: '',
          checkNum: 0,
          grainLevel: '',
          grainLevelName: '',
          testDatetime: '',
          warehouseOriginalId: '',
          testResult: '',
          grainInfo3dImage: '',
          insideMonitorImage: '',
        },
		postData: {
				storehouseGbCode:this.$route.query.storehouseGbCode,
                warehouseGbCode:this.$route.query.warehouseGbCode,
                pageNo:this.$route.query.pageNo!=null?this.$route.query.pageNo:0
			},
        storehouseList: [],//仓房下拉列表
        granaryList: [],//廒间下拉列表
        cargoList: [],//货位下拉列表
        grainLevelList: [],//粮食等级下拉列表
        grainNatureList: [],//粮食性质下拉列表
      };
    },
    methods: {
      getDetail(id) {
        layer.load(2);
        fetchQuantityDetection({id})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              this.detail = ret.data.dataMap;
              document.getElementById('testDatetime').value = this.detail.testDatetime;
              this.getGrainDetail(this.detail.grainVariety);
              this.getGrainOilLevel(this.detail.grainLevel);
              this.getGrainNature(this.detail.grainProperty);
              if (this.detail.grainInfo3dImage) {
                this.draw3D(this.detail.grainInfo3dImage);
              }
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      submitEvent: function () {
        this.detail.testDatetime = document.getElementById('testDatetime').value;
        if (!this.detail.warehouseKeepingAccountId) return layer.msg("请填写保管帐ID");
        if (!this.detail.testDatetime) return layer.msg("请选择测试时间");
        if (!this.detail.warehouseOriginalId) return layer.msg("请填写廒间原始编号");
        if (!this.detail.testResult) return layer.msg("请填写测试结果");
        layer.load(2);
        editQuantityDetection(this.detail)
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("修改粮食数量在线监测数据成功！");
              this.gobackTo();
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      detailBack: function () {
        this.gobackTo();
      },
      getGrainDetail(grainVarietyId) {
        grainDetail({grainVarietyId})
          .then(ret => {
            if (ret.code == 200) {
              const {grainVariety} = ret.data;
              this.$set(this.detail, 'grainVarietyName', grainVariety.grainVarietyName);
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          }).catch(err => {
          layer.alert(err.message, {closeBtn: 0});
        });
      },
      getGrainOilLevel(level) {
        grainOilLevel()
          .then(ret => {
            if (ret.code == 200) {
              const grainLevelName = ret.data.dataList.find(l => l.dicInfoCode == level).dicInfoValue;
              this.$set(this.detail, 'grainLevelName', grainLevelName);
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          }).catch(err => {
          layer.alert(err.message, {closeBtn: 0});
        });
      },
      getGrainNature(grainProperty) {
        grainNature()
          .then(ret => {
            if (ret.code == 200) {
              const grainPropertyName = ret.data.dataList.find(l => l.dicInfoCode == grainProperty).dicInfoValue;
              this.$set(this.detail, 'grainPropertyName', grainPropertyName);
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          }).catch(err => {
          layer.alert(err.message, {closeBtn: 0});
        });
      },

      draw3D(url) {
        axios.get(url)
          .then((res) => {
            const {heights} = res.data;
            if (Array.isArray(heights)) {
              const data = heights.map((h) => ([h.an, h.bn, h.height]));
              this.$echarts
                .init(document.getElementById('3d'))
                .setOption({
                  title: {
                    left: 'center',
                    text: '粮情3D图'
                  },
                  visualMap: {
                    show: false,
                    min: 2,
                    max: 6,
                    inRange: {
                      color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                    }
                  },
                  xAxis3D: {
                    type: 'value'
                  },
                  yAxis3D: {
                    type: 'value'
                  },
                  zAxis3D: {
                    type: 'value',
                    name: '高度',
                    // max: 10,
                    // min: 0
                  },
                  grid3D: {
                    axisLine: {
                    },
                    axisPointer: {
                    },
                    viewControl: {
                      // autoRotate: true
                    },
                    light: {
                      main: {
                        shadow: true,
                        quality: 'ultra',
                        intensity: 1.5
                      }
                    }
                  },
                  series: [{
                    type: 'bar3D',
                    data,
                    shading: 'lambert',
                    label: {
                      formatter: function (param) {
                        return param.value[2];
                      }
                    }
                  }]
                });
            }
          })
          .catch(() => {
          })
      },
	  
	  gobackTo(){
		var vm = this;
		this.$router.push({
            name:'quantityDetection',
            query: {
              storehouseGbCode:vm.postData.storehouseGbCode,
              warehouseGbCode:vm.postData.warehouseGbCode,
              pageNo:vm.postData.pageNo
            }
         });  
	  }  
    },
    mounted() {
      if (this.$route.query.id) {
        this.getDetail(this.$route.query.id);
      }
    }
  };
</script>
