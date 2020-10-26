<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">基础信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div class="detail-div_1">
                            <span class="detail-tittle">
                                报警类型：粮温报警
                                <label v-text="detailData.grainVarietyName"></label>
                            </span>
              <div class="detail-content" >
              <span>
                                仓内条件：
                                <label v-text="detailData.inventoryPropertyValue"></label>
                            </span>
                <span style="margin-left: 17%">
                                温度：
                                <label v-text="detailData.inhouseTempJudgeMark"></label>
                                <label v-text="detailData.inhouseTempJudgeValue"></label>度
                            </span>
                <span>
                                湿度：
                                <label v-text="detailData.inhouseHumidityJudgeMark"></label>
                                <label v-text="detailData.inhouseHumidityJudgeValue"></label>%
                            </span>
                <br/>
                <span style="margin-left: 25%">
                                最高粮温：
                                <label v-text="detailData.inhouseMaxgraintempJudgeMark"></label>
                                <label v-text="detailData.inhouseMaxgraintempJudgeValue" ></label>度
                            </span>

                <span>
                                最低粮温：
                                <label v-text="detailData.inhouseMingraintempJudgeMark"></label>
                                <label v-text="detailData.inhouseMingraintempJudgeValue"></label>度
                            </span>
                <br/>
                <span style="margin-left: 25%">
                                粮食最高水分：
                                <label v-text="detailData.inhouseMaxwaterJudgeMark"></label>
                                <label v-text="detailData.inhouseMaxwaterJudgeValue"></label>%
                            </span>
               <!-- <span>
                                粮食最低水分：1%
                                <label v-text="detailData.grainOilLevel"></label>
                            </span>-->

                <br/>
                <span style="margin-left: 25%">
                                二氧化碳：
                                <label v-text="detailData.inhouseCo2JudgeMark"></label>
                                <label v-text="detailData.inhouseCo2JudgeValue"></label>%
                            </span>
                <span>
                                氧气：
                                <label v-text="detailData.inhouseO2JudgeMark"></label>
                                <label v-text="detailData.inhouseO2JudgeValue"></label>%
                            </span>
              </div>
              <div class="line"></div>
              <div>
              <span>
                                仓外条件：
                                <label v-text="detailData.inventoryPropertyValue"></label>
                            </span>
                <span style="margin-left: 17%">
                                温度：
                                <label v-text="detailData.outhouseTempJudgeMark"></label>
                                <label v-text="detailData.outhouseTempJudgeValue"></label>度
                            </span>
                <span>
                                湿度：
                                <label v-text="detailData.outhouseHumidityJudgeMark"></label>
                                <label v-text="detailData.outhouseHumidityJudgeValue"></label>%
                            </span>
                <br/>
                <span style="margin-left: 25%">
                                天气：
                                <label v-text="detailData.outhouseWeatherJudgeMark"></label>
                                <label v-text="detailData.outhouseWeatherJudgeValue"></label>
                            </span>
                <span>
                                风力：
                                <label v-text="detailData.outhouseWindJudgeMark"></label>
                                <label v-text="detailData.outhouseWindJudgeValue"></label>级
                            </span>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="textLeft">
        <h2>报警说明：</h2>
        <p v-text="detailData.warningContent"></p>
      </div>
      <div class="detail-back">
        <button @click="detailBack();">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {warningTemperatureDetail} from "@/api/warning/warningList";
  export default {
    name: "warningTemperatureDetail",
    data() {
      return {
        postData: {
          id:this.$route.query.id
        },
        detailData:{
          inhouseTempJudgeMark:'',
          inhouseTempJudgeValue:'',
          inhouseHumidityJudgeMark:'',
          inhouseHumidityJudgeValue:'',
          inhouseMaxgraintempJudgeMark:'',
          inhouseMaxgraintempJudgeValue:'',
          inhouseMingraintempJudgeMark:'',
          inhouseMingraintempJudgeValue:'',
          inhouseMaxwaterJudgeMark:'',
          inhouseMaxwaterJudgeValue:'',
          inhouseCo2JudgeMark:'',
          inhouseCo2JudgeValue:'',
          inhouseO2JudgeMark:'',
          inhouseO2JudgeValue:'',
          outhouseTempJudgeMark:'',
          outhouseTempJudgeValue:'',
          outhouseHumidityJudgeMark:'',
          outhouseHumidityJudgeValue:'',
          outhouseWeatherJudgeMark:'',
          outhouseWeatherJudgeValue:'',
          outhouseWindJudgeMark:'',
          outhouseWindJudgeValue:'',
          warningContent:''
        }
      };
    },
    methods: {
      getDetail: function() {
        var vm = this;
        layer.load(2);
        warningTemperatureDetail(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.detailData = ret.data.grainTemperaturePolicyDetail;
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

<style scoped>
  .line{
    width: 60%;;
    height: 1px;
    background-color: gainsboro;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .detail-div_1{
    width: 85%;
    height: 550px;
    border: 1px gray solid;
    margin-left: 5%;
    padding-left: 5%;
  }
  .detail-div_2{
    width: 85%;
    border: 1px gray solid;
    margin-left: 5%;
    padding-left: 5%;
    margin-top: 50px;
  }
  .detail-content{
    margin-top: 50px;
  }
  .detail-div_3{
    padding-top: 50px;
    padding-bottom: 50px;
    width: 85%;
    border: 1px gray solid;
    margin-left: 5%;
    padding-left: 5%;
    margin-top: 50px;
  }
  .detail-content_2{
    margin-left: 25%;

  }
  .detail-tittle{
    margin-top: 50px;
  }
  .userManage-detail > div{
    font-size: 16px;
  }
</style>
