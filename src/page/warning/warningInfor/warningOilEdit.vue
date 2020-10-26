<template>
  <div class="content">
    <div class="aerationSet">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">油温报警策略设置</div>
        </div>

        <div class="autoModel">
          <div class="autoModel-open">
            <p>
              <label>报警类型：</label>油温报警
            </p>
            <div class="conditionOne">
                            <span>
                                <label>油温：</label>
                                <select class="select-style" v-model="submitNewData.inhouseInsectornumJudgeMark">
                                  <option value=">">></option>
                                  <option value="<"><</option>
                                  <option value=">=">>=</option>
                                  <option value="<="><=</option>
                                  <option value="=">=</option>
                                </select>
                                <input type="number" v-model="submitNewData.inhouseInsectornumJudgeValue">度
                            </span>
              <div class="textTop">
                <h2>报警说明：</h2>
                <textarea name="" cols="140" rows="5" placeholder="请填写报警说明" v-model="submitNewData.warningContents"></textarea>
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
  import { warningInsectNew } from "@/api/warning/warningList";
  export default {
    name: "warningGasEdit",
    data() {
      return {
        submitNewData:{
          inhouseInsectornumJudgeMark:'',
          inhouseInsectornumJudgeValue:'',
          warningContents:''
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
            layer.msg("请选择油温判定符号");
            return;
          }
          if(vm.submitNewData.inhouseOilTempJudgeValue == "") {
            layer.msg("请填写油温预警温度");
            return;
          }
         
          layer.load(2);
          warningInsectNew(vm.submitNewData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("新增油温报警策略成功！");
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
 
  .conditionOne span input {
    width: 20%;
    margin: 0 2%;
    height: 2rem;
    border-radius: .25rem;
    border:1px solid rgba(185,185,185,1);
    padding-left: 8px;
    box-sizing: border-box;
  }
  .conditionOne span select {
    width: 20%;
    margin: 0 2%;
    height: 2rem;
    border-radius: .25rem;
    border:1px solid rgba(185,185,185,1);
  }
  .conditionOne span {
    width: 50%;
    display: block;
    text-align: left;
    padding-left: 20px;
  }
  .textTop {
    margin-top: 10px;
  }


</style>

