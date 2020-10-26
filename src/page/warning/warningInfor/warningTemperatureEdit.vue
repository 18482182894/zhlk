<template>
  <div class="content">
    <div class="aerationSet">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">粮温报警策略设置</div>
        </div>

        <div class="autoModel">
        <div class="autoModel-open" >
          <p>
            <label>报警类型：</label>粮温报警
          </p>
          <p>    仓内条件：</p>
          <div class="condition">
                            <span>
                                <label>温度：</label>
                                <select class="select-style" v-model="submitNewData.inhouseTempJudgeMark">
                                  <option value="不判断">不判断</option>
                                  <option value=">">></option>
                                  <option value="<"><</option>
                                  <option value=">=">>=</option>
                                  <option value="<="><=</option>
                                  <option value="=">=</option>
                                </select>
                                <input type="number" v-model="submitNewData.inhouseTempJudgeValue">度
                            </span>
            <span>
                                <label>湿度：</label>
                                <select class="select-style" v-model="submitNewData.inhouseHumidityJudgeMark">
                                  <option value="不判断">不判断</option>
                                  <option value=">">></option>
                                  <option value="<"><</option>
                                  <option value=">=">>=</option>
                                  <option value="<="><=</option>
                                  <option value="=">=</option>
                                </select>
                                <input type="number" v-model="submitNewData.inhouseHumidityJudgeValue">%
                            </span>
            <br>
            <span>
                                <label>最高粮温：</label>
                                <select class="select-style" v-model="submitNewData.inhouseMaxgraintempJudgeMark">
                                  <option value="不判断">不判断</option>
                                  <option value=">">></option>
                                  <option value="<"><</option>
                                  <option value=">=">>=</option>
                                  <option value="<="><=</option>
                                  <option value="=">=</option>
                                </select>
                                <input type="number" v-model="submitNewData.inhouseMaxgraintempJudgeValue">度
                            </span>
            <span>
                                <label>最低粮温：</label>
                                <select class="select-style" v-model="submitNewData.inhouseMingraintempJudgeMark">
                                  <option value="不判断">不判断</option>
                                  <option value=">">></option>
                                  <option value="<"><</option>
                                  <option value=">=">>=</option>
                                  <option value="<="><=</option>
                                  <option value="=">=</option>
                                </select>
                                <input type="number" v-model="submitNewData.inhouseMingraintempJudgeValue">度
                            </span>
            <br>
            <span>
                                <label>粮食最高水分：</label>
                                <select class="select-style" v-model="submitNewData.inhouseMaxwaterJudgeMark">
                                  <option value="不判断">不判断</option>
                                  <option value=">">></option>
                                  <option value="<"><</option>
                                  <option value=">=">>=</option>
                                  <option value="<="><=</option>
                                  <option value="=">=</option>
                                </select>
                                <input type="number" v-model="submitNewData.inhouseMaxwaterJudgeValue">%
                            </span>
            <span>
                                <label>粮食最低水分：</label>
                                <select class="select-style" >
                                  <option value="不判断">不判断</option>
                                  <option value=">">></option>
                                  <option value="<"><</option>
                                  <option value=">=">>=</option>
                                  <option value="<="><=</option>
                                  <option value="=">=</option>
                                </select>
                                <input type="number">%
                            </span>
            <br>
            <span>
                                <label>二氧化碳：</label>
                                <select class="select-style" v-model="submitNewData.inhouseCo2JudgeMark">
                                  <option value="不判断">不判断</option>
                                  <option value=">">></option>
                                  <option value="<"><</option>
                                  <option value=">=">>=</option>
                                  <option value="<="><=</option>
                                  <option value="=">=</option>
                                </select>
                                <input type="number" v-model="submitNewData.inhouseCo2JudgeValue">%
                            </span>
            <span>
                                <label>氧气：</label>
                                <select class="select-style" v-model="submitNewData.inhouseO2JudgeMark">
                                  <option value="不判断">不判断</option>
                                  <option value=">">></option>
                                  <option value="<"><</option>
                                  <option value=">=">>=</option>
                                  <option value="<="><=</option>
                                  <option value="=">=</option>
                                </select>
                                <input type="number" v-model="submitNewData.inhouseO2JudgeValue">%
                            </span>
          </div>
          <p>    仓外条件：</p>
          <div class="conditionOne">
                            <span>
                                <label>温度：</label>
                                <select class="select-style" v-model="submitNewData.outhouseTempJudgeMark">
                                  <option value="不判断">不判断</option>
                                  <option value=">">></option>
                                  <option value="<"><</option>
                                  <option value=">=">>=</option>
                                  <option value="<="><=</option>
                                  <option value="=">=</option>
                                </select>
                                <input type="number" v-model="submitNewData.outhouseTempJudgeValue">度
                            </span>
            <span>
                                <label>湿度：</label>
                                <select class="select-style" v-model="submitNewData.outhouseHumidityJudgeMark">
                                  <option value="不判断">不判断</option>
                                  <option value=">">></option>
                                  <option value="<"><</option>
                                  <option value=">=">>=</option>
                                  <option value="<="><=</option>
                                  <option value="=">=</option>
                                </select>
                                <input type="number" v-model="submitNewData.outhouseHumidityJudgeValue">%
                            </span>
            <span>
                                <label>天气：</label>
                                <select class="select-style" v-model="submitNewData.outhouseWeatherJudgeMark">
                                  <option value="不判断">不判断</option>
                                  <option value="=">=</option>
                                </select>
                                <select class="select-style" v-model="submitNewData.outhouseWeatherJudgeValue">
                                  <option value="晴">晴</option>
                                  <option value="多云">多云</option>
                                  <option value="阴">阴</option>
                                  <option value="雨">雨</option>
                                  <option value="雪">雪</option>
                                </select>
                            </span>
            <span>
                                <label>风力：</label>
                                <select class="select-style" v-model="submitNewData.outhouseWindJudgeMark">
                                  <option value="不判断">不判断</option>
                                  <option value="=">=</option>
                                </select>
                                <select class="select-style" v-model="submitNewData.outhouseWindJudgeValue">
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                  <option value="9">9</option>
                                </select>
                            </span>
            <div class="textTop">
              <h2>报警说明：</h2>
              <textarea name="" cols="140" rows="5" placeholder="请填写报警说明" v-model="submitNewData.warningContent"></textarea>
            </div>
          </div>
          <!--<p>时间：<input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})"></p>-->
        </div>
      </div>
      </div>
    </div>

    <div class="edit-btn">
      <button class="edit-submit" @click="submitEvent();">提交</button>
      <button class="edit-back" @click="detailBack();">返回</button>
    </div>
  </div>
</template>
<script>
  import {warningTemNew} from "@/api/warning/warningList";
    export default {
        name: "warningTemperatureEdit",
      data() {
        return {
          postData:{
            id:this.$route.query.id
          },
          submitNewData:{
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
        detailBack:function () {
          this.$router.back(-1);
        },
        submitEvent:function () {
          var vm=this;
            //新增提交
            //仓内温度
            if (vm.submitNewData.inhouseTempJudgeMark == "") {
              layer.msg("请选择仓内温度判定符号");
              return;
            }
            if(vm.submitNewData.inhouseTempJudgeValue == "") {
              layer.msg("请填写仓内温度");
              return;
            }
            //仓内湿度
            if (vm.submitNewData.inhouseHumidityJudgeMark == "") {
              layer.msg("请选择仓内湿度判定符号");
              return;
            }
            if(vm.submitNewData.inhouseHumidityJudgeValue == "") {
              layer.msg("请填写仓内湿度");
              return;
            }
            //仓内最高粮温
            if (vm.submitNewData.inhouseMaxgraintempJudgeMark == "") {
              layer.msg("请选择仓内最高粮温判定符号");
              return;
            }
            if(vm.submitNewData.inhouseMaxgraintempJudgeValue == "") {
              layer.msg("请填写仓内最高粮温");
              return;
            }
            //仓内最低粮温
            if (vm.submitNewData.inhouseMingraintempJudgeMark == "") {
              layer.msg("请选择仓内最低粮温判定符号");
              return;
            }
            if(vm.submitNewData.inhouseMingraintempJudgeValue == "") {
              layer.msg("请填写仓内最低粮温");
              return;
            }
            //仓内最高水分
            if (vm.submitNewData.inhouseMaxwaterJudgeMark == "") {
              layer.msg("请选择仓内最高水分判定符号");
              return;
            }
            if(vm.submitNewData.inhouseMaxwaterJudgeValue == "") {
              layer.msg("请填写仓内最高水分");
              return;
            }
            //仓内二氧化碳
            if (vm.submitNewData.inhouseCo2JudgeMark == "") {
              layer.msg("请选择仓内二氧化碳判定符号");
              return;
            }
            if(vm.submitNewData.inhouseCo2JudgeValue == "") {
              layer.msg("请填写仓内二氧化碳");
              return;
            }
            //仓内氧气
            if (vm.submitNewData.inhouseO2JudgeMark == "") {
              layer.msg("请选择仓内氧气判定符号");
              return;
            }
            if(vm.submitNewData.inhouseO2JudgeValue == "") {
              layer.msg("请填写仓内氧气");
              return;
            }
            //仓外温度
            if (vm.submitNewData.outhouseTempJudgeMark == "") {
              layer.msg("请选择仓外温度判定符号");
              return;
            }
            if(vm.submitNewData.outhouseTempJudgeValue == "") {
              layer.msg("请填写仓外温度");
              return;
            }
            //仓外湿度
            if (vm.submitNewData.outhouseHumidityJudgeMark == "") {
              layer.msg("请选择仓外湿度判定符号");
              return;
            }
            if(vm.submitNewData.outhouseHumidityJudgeValue == "") {
              layer.msg("请填写仓外湿度");
              return;
            }
            //仓外天气
            if (vm.submitNewData.outhouseWeatherJudgeMark == "") {
              layer.msg("请选择仓外天气判定符号");
              return;
            }
            if(vm.submitNewData.outhouseWeatherJudgeValue == "") {
              layer.msg("请选择仓外天气");
              return;
            }
            //仓外风力
            if (vm.submitNewData.outhouseWindJudgeMark == "") {
              layer.msg("请选择仓外风力判定符号");
              return;
            }
            if(vm.submitNewData.outhouseWindJudgeValue == "") {
              layer.msg("请选择仓外风力");
              return;
            }
            //报警说明
            if (vm.submitNewData.warningContent == "") {
              layer.msg("请填写报警说明");
              return;
            }
            layer.load(2);
            warningTemNew(vm.submitNewData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  layer.msg("新增粮温报警策略成功！");
                  this.$router.push({
                    name: "warningList"
                  });
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
        },
        mounted() {
          var vm=this;
        }
      }
    };
</script>

<style type="text/css" scoped>
  .edit-btn {
    padding-bottom: 2rem;
  }
  .granary-pic{
    margin-top: 0;
  }
  .granary-pic-left{
    width: 100%;
  }
  .customTable{
    width: auto;
    box-sizing: border-box;
    margin: 30px;
  }
  .autoModel-open p select{
    width: 10%;
    margin: 0 2%;
    height: 2rem;
    border-radius: .25rem;
    border: 1px solid rgba(185,185,185,1);
  }
  .autoModel-open{
    margin-top: 30px;
    border: 1px gainsboro solid;
    width: 100%;
    padding-top: 30px;
    padding-left: 1%;
  }
  .condition{
    width: 70%;
    margin-left: 20%;


  }
  .condition span input {
    width: 30%;
  }
 .condition span select {
   width: 30%;
 }
  .condition span {
    width: 50%;
  }



</style>
