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
                            <!-- <span>
                                类型编号：
                                <input type="text" class="input-text" v-model="submitData.graindepotTypeId" v-if="postData.graindepotTypeId" readonly="readonly">
                                <input type="text" class="input-text" v-model="submitData.graindepotTypeId" v-else>
                            </span> -->
                            <span>
                                类型名称：
                                <input type="text" class="input-text" v-model="submitData.graindepotTypeName">
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
  libraryTypeDetail,
  libraryTypeEdit,
  libraryTypeNew
} from "@/api/systemManage/basicData/libraryType";
export default {
  name: "libraryType",
  data() {
    return {
      postData: {
        graindepotTypeId: this.$route.query.id
      },
      submitData: {
        graindepotTypeId: "",
        graindepotTypeName: "",
        memo: ""
      }
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      libraryTypeDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.submitData.graindepotTypeId =
              ret.data.grainDepotType.graindepotTypeId;
            vm.submitData.graindepotTypeName =
              ret.data.grainDepotType.graindepotTypeName;
            vm.submitData.memo = ret.data.grainDepotType.memo;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    submitEvent: function() {
      var vm = this;
      // if (vm.submitData.graindepotTypeId == "") {
      //   layer.msg("请填写类型编号");
      //   return;
      // }else{
      //   if (vm.submitData.graindepotTypeId.length>20) {
      //     layer.msg("类型编号不得超过20个字符");
      //     return;
      //   }
      // }
      if (vm.submitData.graindepotTypeName == "") {
        layer.msg("请填写类型名称");
        return;
      }else{
        if (vm.submitData.graindepotTypeName.length>20) {
          layer.msg("类型名称不得超过20个字符");
          return;
        }
      }
      if (this.$route.query.id) {
        layer.load(2);
        libraryTypeEdit(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("编辑库点类型成功！");
              this.$router.push({
                name: "libraryType",
                query: {
                  grainDepotTypeName:this.$route.query.grainDepotTypeName,
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
      } else {
        layer.load(2);
        libraryTypeNew(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增库点类型成功！");
              this.$router.push({
                name: "libraryType",
                query: {
                  grainDepotTypeName:this.$route.query.grainDepotTypeName,
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
      }
    },
    detailBack:function () {
       /* this.$router.back(-1);*/
      this.$router.push({
        name: "libraryType",
        query: {
          grainDepotTypeName:this.$route.query.grainDepotTypeName,
          pageNo:this.$route.query.pageNo
        }
      });
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
