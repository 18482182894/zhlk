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
                                粮油等级：
                                <input type="text" class="input-text" v-model="submitData.grainOilLevelValue">
                            </span>
                            <span>
                                备  &nbsp; &nbsp; &nbsp;  注：
                                <input type="text" class="input-text" v-model="submitData.memo">
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
import {
  gradeLYDetail,
  gradeLYEdit,
  gradeLYNew
} from "@/api/systemManage/basicData/gradeLY";
export default {
  name: "desktop",
  data() {
    return {
      postData: {
        grainOilLevelId: this.$route.query.id
      },
      submitData: {
        grainOilLevelId: "",
        grainOilLevelValue: "",
        memo: ""
      }
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      gradeLYDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.submitData.grainOilLevelValue =
              ret.data.enterpriseMap.grainOilLevelValue;
            vm.submitData.memo = ret.data.enterpriseMap.memo;
          } else {
            layer.alert(err.message, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    submitEvent: function() {
      var vm = this;
      if (vm.submitData.grainOilLevelValue == "") {
        layer.msg("请填写粮油等级");
        return;
      }
      if (this.$route.query.id) {
        vm.submitData.grainOilLevelId = this.$route.query.id;
        layer.load(2);
        gradeLYEdit(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("编辑粮油等级成功！");
              this.$router.push({
                name: "gradeLY"
              });
            } else {
              layer.alert(err.message, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      } else {
        layer.load(2);
        gradeLYNew(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增粮油等级成功！");
              this.$router.push({
                name: "gradeLY"
              });
            } else {
              layer.alert(err.message, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      }
    },
    detailBack:function () {
        this.$router.back(-1);
    }
  },
  mounted() {
    var vm = this;
    if (this.$route.query.id) {
      vm.getDetail();
    }
  }
};
</script>
