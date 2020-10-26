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
                                登记编号：
                                <input type="text" class="input-text" v-model="submitData.registorNo" @change="getStep(submitData.registorNo);">
                            </span>
                            <span>
                                出入库类型：
                                <select name="" class="select-style" v-model="submitData.inOutType" >
                                    <option value="入库">入库</option>
                                    <option value="出库">出库</option>
                                </select>
                            </span>  
                            <br>
                            <span>
                                当前步骤：
                                <label v-text="currentStep"></label>
                            </span>                          
                        </div>
                    </div>
                </div>
            </div>
            <div class="edit-btn">
                <button class="edit-submit" @click="submitEvent();">确定</button>
            </div>
        </div>
    </div>
</template>

<style type="text/css" scoped>
  .tag-box .edit-btn{
    margin-top: 15px;
  }
</style>
<script>
import { nextStep, getStep  } from "@/api/intelligentStorage/public"; 
export default {
  name: "warehouseEdit",
  data() {
    return {
        submitData:{
            registorNo:'',
            inOutType:'入库'
        },
        currentStep:''
    }
  },
  methods: {
    submitEvent: function(id) {
      var vm = this;
      if (vm.submitData.registorNo=='') {
        layer.msg("请填写登记编号");
        return;
      }
      layer.load(2);
      nextStep(vm.submitData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.getStep(vm.submitData.registorNo);
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getStep: function(id) {
      var vm = this;
      layer.load(2);
       getStep({registorNo:id})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code === '200') {
              // console.log(JSON.stringify(ret))
              vm.currentStep=ret.data.current_step_name;
            } else {
                layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          }); 
    }
  },
  mounted () {
      var vm=this; 
  }
}
</script>
