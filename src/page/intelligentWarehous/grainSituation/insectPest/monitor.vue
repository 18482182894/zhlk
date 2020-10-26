<template>
    <div class="content">
        <div class="monitor">
            <div class="monitor-main">
                <div class="monitor-top">
                    <div :class="isShow?'btn btn-add':'btn btn-blank'" @click="switchShow();">
                        <label>实时监控</label>
                    </div>
                    <div :class="isShow?'btn btn-blank':'btn btn-add'" @click="switchShow();">
                        <label>录像回放</label>
                    </div>
                </div>
                <div v-if="isShow" class="monitor-middle">
                    <div class="middle-left">
                      
                    </div>
                    <div class="middle-right">
                        <div class="console-top">云控制平台</div>
                        <div class="console-middle">
                            <img src="../../../../../static/images/monitor-kz.jpg" alt="">
                        </div>
                        <div class="console-p">
                            <img src="../../../../../static/images/monitor-add.png">
                            <label>变倍</label>
                            <img src="../../../../../static/images/monitor-minus.png" >
                        </div>
                        <div class="console-p">
                            <img src="../../../../../static/images/monitor-add.png" >
                            <label>变焦</label>
                            <img src="../../../../../static/images/monitor-minus.png" >
                        </div>
                        <div class="console-p">
                            <img src="../../../../../static/images/monitor-add.png" >
                            <label>光圈</label>
                            <img src="../../../../../static/images/monitor-minus.png" >
                        </div>
                        <div class="console-div">
                            <label>预置点挑取：</label>
                            <select name="" >
                              <option value=""></option>
                            </select>
                        </div>
                        <div class="console-bottom">设置预置点</div>
                    </div>
                </div>
                <div v-else class="monitor-middle">
                    <div class="middle-left">
                      
                    </div>
                    <div class="middle-right">
                        <div class="console-div">
                            <label>开始时间：</label>
                            <input type="text" class="Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})">
                        </div>
                        <div class="console-div">
                            <label>结束时间：</label>
                            <input type="text" class="Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})">
                        </div>
                        <div class="console-top">确定</div>
                    </div>
                </div>
            </div>
            <div class="detail-back">
                <button @click="detailBack();">返回</button>
            </div>  
        </div> 
    </div>
</template>

<style type="text/css" scoped>
</style>
<script>
import { companyList, companyDel } from "@/api/systemManage/basicData/company";
export default {
  name: "company",
  data() {
    return {
      isShow:true
    };
  },
  methods: {
    detailBack:function () {
        this.$router.back(-1);
    },
    switchShow:function () {
        var vm=this;
        console.log(vm.isShow)
        if (vm.isShow) {
          vm.isShow=false;
        }else{
          vm.isShow=true;
        }

    }
  },
  mounted() {
  }
};
</script>
