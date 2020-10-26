<template>
  <div class="content">
    <div class="aerationSet">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">基础信息</div>
        </div>

        <div class="autoModel">
        <div class="autoModel-open">
          <p>
            <label>报警类型：</label>
            <select class="select-style" >
              <option value="0">粮温报警</option>
              <option value="1">气体报警</option>
              <option value="2">倒仓报警</option>
              <option value="3">虫情报警</option>
            </select>
          </p>
          <p>    仓内条件：</p>
          <div class="condition">
                            <span>
                                <label>温度：</label>
                                <select class="select-style" >
                                  <option value="0">不判断</option>
                                  <option value="1">></option>
                                  <option value="2"><</option>
                                  <option value="3">>=</option>
                                  <option value="3"><=</option>
                                  <option value="3">=</option>
                                </select>
                                <input type="number">度
                            </span>
            <span>
                                <label>湿度：</label>
                                <select class="select-style" >
                                  <option value="0">不判断</option>
                                  <option value="1">></option>
                                  <option value="2"><</option>
                                  <option value="3">>=</option>
                                  <option value="3"><=</option>
                                  <option value="3">=</option>
                                </select>
                                <input type="number">%
                            </span>
            <br>
            <span>
                                <label>最高粮温：</label>
                                <select class="select-style" >
                                  <option value="0">不判断</option>
                                  <option value="1">></option>
                                  <option value="2"><</option>
                                  <option value="3">>=</option>
                                  <option value="3"><=</option>
                                  <option value="3">=</option>
                                </select>
                                <input type="number">度
                            </span>
            <span>
                                <label>最低粮温：</label>
                                <select class="select-style" >
                                  <option value="0">不判断</option>
                                  <option value="1">></option>
                                  <option value="2"><</option>
                                  <option value="3">>=</option>
                                  <option value="3"><=</option>
                                  <option value="3">=</option>
                                </select>
                                <input type="number">度
                            </span>
            <br>
            <span>
                                <label>粮食最高水分：</label>
                                <select class="select-style" >
                                  <option value="0">不判断</option>
                                  <option value="1">></option>
                                  <option value="2"><</option>
                                  <option value="3">>=</option>
                                  <option value="3"><=</option>
                                  <option value="3">=</option>
                                </select>
                                <input type="number">%
                            </span>
            <span>
                                <label>粮食最低水分：</label>
                                <select class="select-style" >
                                  <option value="0">不判断</option>
                                  <option value="1">></option>
                                  <option value="2"><</option>
                                  <option value="3">>=</option>
                                  <option value="3"><=</option>
                                  <option value="3">=</option>
                                </select>
                                <input type="number">%
                            </span>
            <br>
            <span>
                                <label>二氧化碳：</label>
                                <select class="select-style" >
                                  <option value="0">不判断</option>
                                  <option value="1">></option>
                                  <option value="2"><</option>
                                  <option value="3">>=</option>
                                  <option value="3"><=</option>
                                  <option value="3">=</option>
                                </select>
                                <input type="number">%
                            </span>
            <span>
                                <label>氧气：</label>
                                <select class="select-style" >
                                  <option value="0">不判断</option>
                                  <option value="1">></option>
                                  <option value="2"><</option>
                                  <option value="3">>=</option>
                                  <option value="3"><=</option>
                                  <option value="3">=</option>
                                </select>
                                <input type="number">%
                            </span>
          </div>
          <p>    仓外条件：</p>
          <div class="condition">
                            <span>
                                <label>温度：</label>
                                <select class="select-style" >
                                  <option value="0">不判断</option>
                                  <option value="1">></option>
                                  <option value="2"><</option>
                                  <option value="3">>=</option>
                                  <option value="3"><=</option>
                                  <option value="3">=</option>
                                </select>
                                <input type="number">度
                            </span>
            <span>
                                <label>湿度：</label>
                                <select class="select-style" >
                                  <option value="0">不判断</option>
                                  <option value="1">></option>
                                  <option value="2"><</option>
                                  <option value="3">>=</option>
                                  <option value="3"><=</option>
                                  <option value="3">=</option>
                                </select>
                                <input type="number">%
                            </span>
            <span>
                                <label>天气：</label>
                                <select class="select-style" >
                                  <option value="0">不判断</option>
                                  <option value="1">></option>
                                  <option value="2"><</option>
                                  <option value="3">>=</option>
                                  <option value="3"><=</option>
                                  <option value="3">=</option>
                                </select>
                                <select class="select-style" >
                                  <option value="0">晴</option>
                                  <option value="1">多云</option>
                                  <option value="2">阴</option>
                                  <option value="3">雨</option>
                                  <option value="3">雪</option>
                                </select>
                            </span>
            <span>
                                <label>风力：</label>
                                <select class="select-style" >
                                  <option value="0">不判断</option>
                                  <option value="1">></option>
                                  <option value="2"><</option>
                                  <option value="3">>=</option>
                                  <option value="3"><=</option>
                                  <option value="3">=</option>
                                </select>
                                <select class="select-style" >
                                  <option value="0">1</option>
                                  <option value="1">2</option>
                                  <option value="2">3</option>
                                  <option value="3">4</option>
                                  <option value="3">5</option>
                                  <option value="3">6</option>
                                </select>
                            </span>
          </div>
          <!--<p>时间：<input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})"></p>-->
        </div>
      </div>

        <div class="autoModel">
          <div class="autoModel-open">
            <p>
              <label>报警类型：</label>
            <select class="select-style" >
              <option value="0">粮温报警</option>
              <option value="1">气体报警</option>
              <option value="2">倒仓报警</option>
              <option value="3">虫情报警</option>
            </select>
            </p>

            <div class="condition">
                            <span>
                                <label>温度：</label>
                                <select class="select-style" >
                                  <option value="0">不判断</option>
                                  <option value="1">></option>
                                  <option value="2"><</option>
                                  <option value="3">>=</option>
                                  <option value="3"><=</option>
                                  <option value="3">=</option>
                                </select>
                                <input type="number">度
                            </span>
              <br>
              <span>
                                <label>湿度：</label>
                                <select class="select-style" >
                                  <option value="0">不判断</option>
                                  <option value="1">></option>
                                  <option value="2"><</option>
                                  <option value="3">>=</option>
                                  <option value="3"><=</option>
                                  <option value="3">=</option>
                                </select>
                                <input type="number">度
                            </span>
              <span>
                                <label>最高粮温：</label>
                                <select class="select-style" >
                                  <option value="0">不判断</option>
                                  <option value="1">></option>
                                  <option value="2"><</option>
                                  <option value="3">>=</option>
                                  <option value="3"><=</option>
                                  <option value="3">=</option>
                                </select>
                                <input type="number">%
                            </span>

            </div>
            <!--<p>时间：<input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})"></p>-->
          </div>
        </div>

        <div class="autoModel">
          <div class="autoModel-open">
            <p>
              <label>报警类型：</label>
            <select class="select-style" >
              <option value="0">粮温报警</option>
              <option value="1">气体报警</option>
              <option value="2">倒仓报警</option>
              <option value="3">虫情报警</option>
            </select>
            </p>

            <div class="condition">
                            <span>
                                <label>温度：</label>
                                <select class="select-style" >
                                  <option value="0">不判断</option>
                                  <option value="1">></option>
                                  <option value="2"><</option>
                                  <option value="3">>=</option>
                                  <option value="3"><=</option>
                                  <option value="3">=</option>
                                </select>
                                <input type="number">度
                            </span>
            </div>
          </div>
        </div>

        <div class="autoModel">
          <div class="autoModel-open">
            <p>
              <label>报警类型：</label>
            <select class="select-style" >
              <option value="0">粮温报警</option>
              <option value="1">气体报警</option>
              <option value="2">倒仓报警</option>
              <option value="3">虫情报警</option>
            </select>
            </p>

            <div class="condition">
                            <span>
                                <label>温度：</label>
                                <select class="select-style" >
                                  <option value="0">不判断</option>
                                  <option value="1">></option>
                                  <option value="2"><</option>
                                  <option value="3">>=</option>
                                  <option value="3"><=</option>
                                  <option value="3">=</option>
                                </select>
                                <input type="number">度
                            </span>
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
    export default {
        name: "warningEdit",
      data() {
        return {

        };
      },
      methods: {
        detailBack:function () {
          this.$router.back(-1);
        }
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
