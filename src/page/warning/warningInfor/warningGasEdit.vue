<template>
  <div class="content">
    <div class="aerationSet">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">气体报警策略设置</div>
        </div>

        <div class="autoModel">
          <div class="autoModel-open">
            <p>
              <label>报警类型：</label>气体报警
            </p>
            <div class="conditionOne">
                            <span>
                                <label>O2：</label>
                                <select class="select-style" v-model="submitNewData.inhouseO2JudgeMark">
                                  <option value="不判断">不判断</option>
                                  <option value=">">></option>
                                  <option value="<"><</option>
                                  <option value=">=">>=</option>
                                  <option value="<="><=</option>
                                  <option value="=">=</option>
                                </select>
                                <input type="number" v-model="submitNewData.inhouseO2JudgeValue">度
                            </span>
              <br>
              <span>
                                <label>CO2：</label>
                                <select class="select-style" v-model="submitNewData.inhouseCo2JudgeMark">
                                  <option value="不判断">不判断</option>
                                  <option value=">">></option>
                                  <option value="<"><</option>
                                  <option value=">=">>=</option>
                                  <option value="<="><=</option>
                                  <option value="=">=</option>
                                </select>
                                <input type="number" v-model="submitNewData.inhouseCo2JudgeValue">度
                            </span>
              <span>
                                <label>N2：</label>
                                <select class="select-style" v-model="submitNewData.inhouseN2JudgeMark">
                                  <option value="不判断">不判断</option>
                                  <option value=">">></option>
                                  <option value="<"><</option>
                                  <option value=">=">>=</option>
                                  <option value="<="><=</option>
                                  <option value="=">=</option>
                                </select>
                                <input type="number" v-model="submitNewData.inhouseN2JudgeValue">%
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
  import {warningGasNew} from "@/api/warning/warningList";
  export default {
    name: "warningGasEdit",
    data() {
      return {
        submitNewData:{
          inhouseO2JudgeMark:'',
          inhouseO2JudgeValue:'',
          inhouseN2JudgeMark:'',
          inhouseN2JudgeValue:'',
          inhouseCo2JudgeMark:'',
          inhouseCo2JudgeValue:'',
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
          //氧气
          if (vm.submitNewData.inhouseO2JudgeMark == "") {
            layer.msg("请选择O2判定符号");
            return;
          }
          if(vm.submitNewData.inhouseO2JudgeValue == "") {
            layer.msg("请填写O2含量");
            return;
          }
          //二氧化碳
          if (vm.submitNewData.inhouseCo2JudgeMark == "") {
            layer.msg("请选择CO2判定符号");
            return;
          }
          if(vm.submitNewData.inhouseCo2JudgeValue == "") {
            layer.msg("请填写CO2含量");
            return;
          }
          //氮气
          if (vm.submitNewData.inhouseN2JudgeMark == "") {
            layer.msg("请选择N2判定符号");
            return;
          }
          if(vm.submitNewData.inhouseN2JudgeValue == "") {
            layer.msg("请填写N2含量");
            return;
          }
          //报警说明
          if (vm.submitNewData.warningContent == "") {
            layer.msg("请填写报警说明");
            return;
          }
          layer.load(2);
          warningGasNew(vm.submitNewData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("新增气体报警策略成功！");
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
    },
    mounted() {
      var vm=this;
    }
  };
</script>

<style type="text/css" scoped>
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

