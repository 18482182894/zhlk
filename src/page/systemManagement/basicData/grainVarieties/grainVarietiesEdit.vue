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
                                粮食编号：
                                <input type="text" class="input-text" v-model="submitData.grainVarietyId" v-if="type=='edit'" readonly="readonly">
                                <input type="text" class="input-text" v-model="submitData.grainVarietyId" v-else>
                            </span>
                            <span>
                                粮食品种：
                                <input type="text" class="input-text" v-model="submitData.grainVarietyName">
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
  grainDetail,
  grainEdit,
  grainNew
} from "@/api/systemManage/basicData/grainVarieties";
export default {
  name: "grainVarietiesEdit",
  data() {
    return {
      type: this.$route.query.type,
      postData: {
        grainVarietyId: this.$route.query.id,
        grainVarietyName:this.$route.query.grainVarietyName,
        pageNo:this.$route.query.pageNo
      },
      submitData: {
        grainVarietyId: "",
        grainVarietyName: "",
        parentGrainVarietyId: this.$route.query.id,
        memo: ""
      }
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      grainDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.submitData.grainVarietyId = this.$route.query.id;
            vm.submitData.grainVarietyName =
              ret.data.grainVariety.grainVarietyName;
            vm.submitData.parentGrainVarietyId = ret.data.parentGrainVarietyId;
            vm.submitData.memo = ret.data.grainVariety.memo;
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
      if (vm.submitData.grainVarietyName == "") {
        layer.msg("请填写品种名称");
        return;
      }
      if (vm.type == "edit") {
        layer.load(2);
        grainEdit(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("编辑粮食品种成功！");
              this.$router.push({
                name: "grainVarieties",
                query: {
                  grainVarietyName:vm.postData.grainVarietyName,
                  pageNo:vm.postData.pageNo
                }
              });
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      } else {
        layer.load(2);
        grainNew(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增粮食品种成功！");
              this.$router.push({
                name: "grainVarieties",
                query: {
                  grainVarietyName:vm.postData.grainVarietyName,
                  pageNo:vm.postData.pageNo
                }
              });
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      }
    },
    detailBack:function (id,grainVarietyName) {
      var vm=this;
      this.$router.push({
        name: "grainVarieties",
        query: {
          id:id,
          grainVarietyName:vm.postData.grainVarietyName,
          pageNo:vm.postData.pageNo
        }
      });
    }
  },
  mounted() {
    var vm = this;
    if (this.$route.query.type == "edit") {
      vm.getDetail();
    }
  }
};
</script>
