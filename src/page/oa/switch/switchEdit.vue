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
                                业务模块编号：
                                <input type="text" class="input-text" v-model="submitData.module_id">
                            </span>
              <span>
                                业务模块名称：
                                <input type="text" class="input-text" v-model="submitData.module_name">
                            </span>
              <span>
                                流程编号：
                                <select name="" class="select-style" v-model="submitData.flow_id">
                                    <option :value="item.flow_id" v-for="item in flowList" v-text="item.flow_name"></option>
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
  import{addFlowPower,getFlowSelect} from "../../../api/workflow/flow";

  export default {
        name: "switchEdit",
      data() {
        return {
          sortOrder: "0", //0 顺序，1 倒序
          postData: {
            leaveApplyId: this.$route.query.id
          },
          // grainVarietyList:[],
          // grainOilLevelList:[],
          submitData: {
            module_id: "",
            module_name: "",
            flow_id: "",
          },
          flowList:''
        };
      },
      methods: {
        submitEvent: function() {
          var vm = this;
          let module_name=this.$route.query.module_name;
          let pageNo=this.$route.query.pageNo;
          if (vm.submitData.module_name == "") {
            layer.msg("请填写模块名称");
            return;
          }
          if (vm.submitData.flow_id == "") {
            layer.msg("请填写流程编号");
            return;
          }
          if (vm.submitData.module_id == "") {
            layer.msg("请填写模块编号");
            return;
          }
          addFlowPower(vm.submitData)
              .then(ret => {
                layer.closeAll("loading");
                console.log(JSON.stringify(ret))
                if (ret.code == 200) {
                  layer.msg("创建成功！");
                  this.$router.push({
                    name: "switchList",
                    query: {
                      module_name:module_name,
                      pageNo:pageNo
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
        getDropDown: function() {//获取下拉项
          var vm = this;
          getFlowSelect({}).then(ret => {//流程下拉列表
              if (ret.code == 200) {
                // console.log(JSON.stringify(ret));
                vm.flowList = ret.data.flowList;
              } else {
                layer.alert(ret.data, { closeBtn: 0 });
              }
          }).catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
          });
        },
        detailBack:function () {
          var vm=this;
          let module_name=this.$route.query.module_name;
          let pageNo=this.$route.query.pageNo;
          this.$router.push({
            name: "switchList",
            query: {
              module_name:module_name,
              pageNo:pageNo
            }
          });
        }
      },
      mounted() {
        this.getDropDown();
      }
    };
</script>

<style scoped>

</style>
