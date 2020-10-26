<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">粮食数量在线监测详细信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
                仓房：
                <label v-text="detail.storehouseName"></label>
              </span>
              <span>
                廒间：
                <label v-text="detail.warehouseName"></label>
              </span>
              <span>
                货位：
                <label v-text="detail.cargoName"></label>
              </span>
              <br>
              <span>
                仓库状态：
                <label v-text="detail.storehouseStatus"></label>
              </span>
              <span>
                粮食品种：
                <label v-text="detail.grainVarietyName"></label>
              </span>
              <span>
                保管帐ID：
                <label v-text="detail.warehouseKeepingAccountId"></label>
              </span>
              <span>
                粮食性质：
                <label v-text="detail.grainPropertyName"></label>
              </span>
              <span>
                粮权所属：
                <label v-text="detail.grainRightsBelongto"></label>
              </span>
              <span>
                收获年度：
                <label v-text="detail.harvestYear"></label>
              </span>
              <span>
                库存数量：
                <label v-text="detail.storageNum"></label>
              </span>
              <span>
                粮食等级：
                <label v-text="detail.grainLevelName"></label>
              </span>
              <br/>
              <span>
                测试时间：
                <label v-text="detail.testDatetime"></label>
              </span>
              <span>
                 检测数量：
                 <label v-text="detail.checkNum"></label>
               </span>
              <span>
                廒间原始编号：
                <label v-text="detail.warehouseOriginalId"></label>
              </span>
              <br/>
              <span>
                测试结果：
                <label v-text="detail.testResult"></label>
              </span>
            </div>
          </div>
          <div id="myDiv" style="width: 100%; height: 600px;"></div>
          <!-- <div class="echarts-3d" id="3d" v-if="detail.grainInfo3dImage"/> <!--粮仓柱状图--> -->
        </div>
      </div>
      <div class="detail-back">
        <button @click="gobackTo()">返回</button>
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
  import { fetchQuantityDetection } from "@/api/intelligentWarehous/quantityDetection";
  import { grainDetail } from '@/api/systemManage/basicData/grainVarieties';
  import { grainOilLevel, grainNature } from "@/api/systemManage/dropDown";
  import { show3D_ } from "@/utils/public";

  export default {
    name: "quantityDetectionDetail",
    data() {
      return {
        detail: {},
		postData: {
				storehouseGbCode:this.$route.query.storehouseGbCode,
                warehouseGbCode:this.$route.query.warehouseGbCode,
                pageNo:this.$route.query.pageNo!=null?this.$route.query.pageNo:0
			}
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
        var vm = this;
        // 3D粮仓图
        axios.get(url).then((res)=>{
          show3D_(res.data.heights);
        })

        // 这里显示3D粮仓图,如果要显示柱状图，可把return及以前的代码注释即可
        return false; 

        // 粮仓柱状图显示
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
