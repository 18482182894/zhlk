<template>
    <div class="content">
        <div class="menuManage roleManage">
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">基础信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail userManage-edit">
                      <div>
                            <span>
                                卡号：
                                <input type="num" class="input-text" v-model="submitData.cardNo">
                            </span>
                            <span>
                                卡状态：
                                <select name="" class="select-style" v-model="submitData.cardStatus">
                                    <option value="启用">启用</option>
                                    <option value="停用">停用</option>
                                </select>
                            </span> 
                        </div>   
                    </div>
                </div>
            </div>
            <div class="edit-btn">
                <button class="edit-submit" @click="submitEvent();">提交</button>
                <button class="edit-back" @click="detailBack();">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
import { cardNew } from "@/api/systemManage/basicData/card";
export default {
  name: "priceManageEdit",
  data() {
    return {
      submitData: {
        cardNo: "",
        cardStatus: ""
      },
    };
  },
  methods: {
    submitEvent: function() {
      //提交
      var vm = this;

        if (vm.submitData.cardNo == "") {
          layer.msg("请填写卡号");
          return;
        }
        if (vm.submitData.cardStatus == "") {
          layer.msg("请选择卡状态");
          return;
        }
      
        layer.load(2);
        cardNew(vm.submitData).then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增卡成功！");
              this.$router.push({
                name: "cardList",
                query: {
                  cardNo:this.$route.query.cardNo,
                  pageNo:this.$route.query.pageNo
                }
              });
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
    
    },
    detailBack:function () {
        /*this.$router.back(-1);*/
      this.$router.push({
        name: "cardList",
        query: {
          cardNo:this.$route.query.cardNo,
          pageNo:this.$route.query.pageNo
        }
      });
    }
  },
  mounted() {
  }
};
</script>
