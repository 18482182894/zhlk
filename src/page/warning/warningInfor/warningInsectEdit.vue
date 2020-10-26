<template>
  <div class="content">
    <div class="aerationSet">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">虫情报警策略设置</div>
        </div>

        <div class="autoModel">
          <div class="autoModel-open">
            <p>
              <label>报警类型：</label>虫情报警
            </p>
            <div class="conditionOne" style="margin: 0;">
              <span style="margin-bottom: 2rem">
                  <label>虫数：</label>
                  <select class="select-style" v-model="submitNewData.inhouseInsectornumJudgeMark">
                    <option value="不判断">不判断</option>
                    <option value=">">></option>
                    <option value=">"><</option>
                    <option value=">=">>=</option>
                    <option value="<="><=</option>
                    <option value="=">=</option>
                  </select>
                  <input type="number" v-model="submitNewData.inhouseInsectornumJudgeValue">头
              </span>
              <div>
                <h2>报警说明：</h2>
                <textarea name="" cols="140" rows="5" placeholder="请填写报警说明" v-model="submitNewData.warningContents"></textarea>
              </div>
            </div>
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
  import {warningInsectNew} from "@/api/warning/warningList";
  export default {
    name: "warningInsectEdit",
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
        if (vm.submitNewData.inhouseInsectornumJudgeMark == "") {
          layer.msg("请选择虫数判定符号");
          return;
        }
        if(vm.submitNewData.inhouseInsectornumJudgeValue == "") {
          layer.msg("请填写虫数");
          return;
        }
        //报警说明
        if (vm.submitNewData.warningContents == "") {
          layer.msg("请填写报警说明");
          return;
        }
        layer.load(2);
        warningInsectNew(vm.submitNewData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增虫情报警策略成功！");
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

