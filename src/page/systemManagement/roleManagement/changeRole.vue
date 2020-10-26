<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top" v-if="sorts=='user'">
          <div class="tag-title" v-text="roletype=='add'?'添加权限':'删除权限'"></div>用户：
          <label v-text="userName"></label>
        </div>
        <div class="tag-box-top" v-else>
          <div class="tag-title" v-text="roletype=='add'?'添加权限':'删除权限'"></div>
          <!--<button class="btn-submit" @click="goup()">返回</button>-->
          角色：
          <label v-text="roleName"></label>
        </div>
        <div class="tag-box-content" v-if="roletype=='add'">
          <!-- <div class="addRole-item">
                        <label><input type="checkbox" v-model="addCheckAll" @change="checkAll('add');">
                        全部勾选</label>
          </div>-->
          <div class="addRole-box-item" v-for="item in UnassignedList">
            <div class="addRole-item" style="text-align: center">
              <label>{{item.assortment}}</label>
            </div>
            <div class="addRole-item" v-for="list in item.moduleList">
              <label>
                <input
                  type="checkbox"
                  :value="list.moduleId"
                  v-model="addPostList"
                  @change="clickChange('add');"
                >
                {{list.moduleName}}
              </label>
            </div>
          </div>
        </div>
        <div class="tag-box-content" v-else>
          <!--  <div class="addRole-item">
                        <label><input type="checkbox" v-model="delCheckAll" @change="checkAll('del');">
                        全部勾选</label>
          </div>-->
          <div class="addRole-box-item" v-for="item in AllocatedList">
            <!-- <div class="addRole-item" v-for="list in item.modeleList">
                            <label><input type="checkbox"  :value="list.moduleId" v-model="delPostList" @change="clickChange('del');">
                            {{list.moduleName}}</label>
            </div>-->
            <div class="addRole-item" style="text-align: center">
              <label>{{item.assortment}}</label>
            </div>
            <div class="addRole-item" v-for="list in item.moduleList">
              <label>
                <input
                  type="checkbox"
                  :value="list.moduleId"
                  v-model="delPostList"
                  @change="clickChange('del');"
                >
                {{list.moduleName}}
              </label>
            </div>
          </div>
        </div>
      </div>
      <!-- <button v-if="sorts=='role'" class="query" @click="roleSubmitEvent();">提交</button>
      <button v-else class="query" @click="userSubmitEvent();">提交</button>-->
      <div class="edit-btn">
        <button v-if="sorts=='role'" class="edit-submit" @click="roleSubmitEvent();">提交</button>
        <button v-else class="edit-submit" @click="userSubmitEvent();">提交</button>
        <button class="edit-back" @click="detailBack();">返回</button>
      </div>
    </div>
  </div>
</template>

<style type="text/css" scoped >
.tag-box-content {
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
}
</style>
<script>
import {
  roleChange,
  roleAllocated,
  roleUnassigned,
  userChange
} from "@/api/systemManage/role";
export default {
  name: "desktop",
  data() {
    return {
      roletype: this.$route.query.type,
      roleName: this.$route.query.data.role_name,
      userName: this.$route.query.data.user_name,
      postData: {
        role_id: this.$route.query.data.role_id
      },
      submitData: {
        module_id_list: "",
        role_id: this.$route.query.data.role_id,
        flag: ""
      },
      usersubmitData: {
        module_id_list: "",
        user_id: this.$route.query.data.user_id,
        flag: ""
      },
      sorts: this.$route.query.sorts,
      UnassignedList: [],
      AllocatedList: [],
      addPostList: [],
      addCheckAll: false, //添加权限的全选按钮，true为选中
      delPostList: [],
      delCheckAll: false //删除权限的全选按钮，true为选中
    };
  },
  methods: {
    // goup:function(){
    //   this.$router.back(-1)
    // },
    getUnassignedList: function() {
      var vm = this;
      roleUnassigned(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            // vm.UnassignedList = ret.data.dataMap;
            for (let i in ret.data.dataMap) {
              let o = {};
              o[i] = ret.data.dataMap[i];
              var list = {};
              for (let j in o) {
                list = {
                  assortment: j,
                  moduleList: o[j]
                };
              }
              vm.UnassignedList.push(list);
            }
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getAllocatedList: function() {
      var vm = this;
      roleAllocated(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            // vm.AllocatedList = ret.data.dataMap;

            for (let i in ret.data.dataMap) {
              let o = {};
              o[i] = ret.data.dataMap[i];
              var list = [];
              for (let j in o) {
                list = {
                  assortment: j,
                  moduleList: o[j]
                };
              }
              vm.AllocatedList.push(list);
            }
            // console.log(JSON.stringify(vm.AllocatedList))
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    checkAll: function(type) {
      //全选
      var vm = this;
      if (type == "add") {
        if (vm.addCheckAll) {
          for (var i = 0; i < vm.UnassignedList.length; i++) {
            vm.addPostList.push(vm.UnassignedList[i][0]);
          }
        } else {
          vm.addPostList = [];
        }
      } else {
        if (vm.delCheckAll) {
          for (var i = 0; i < vm.AllocatedList.length; i++) {
            vm.delPostList.push(vm.AllocatedList[i][0]);
          }
        } else {
          vm.delPostList = [];
        }
      }
    },
    clickChange: function(type) {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (type == "add") {
        if (vm.addPostList.length == vm.UnassignedList.length) {
          vm.addCheckAll = true;
        } else {
          vm.addCheckAll = false;
        }
      } else {
        if (vm.delPostList.length == vm.AllocatedList.length) {
          vm.delCheckAll = true;
        } else {
          vm.delCheckAll = false;
        }
      }
    },
    roleSubmitEvent: function() {
      var vm = this;
      if (vm.roletype == "add") {
        if (vm.addPostList.length == 0) {
          layer.msg("至少选择一条权限");
          return;
        } else {
          for (var i = 0; i < vm.addPostList.length; i++) {
            if (vm.submitData.module_id_list == "") {
              vm.submitData.module_id_list += vm.addPostList[i];
            } else {
              vm.submitData.module_id_list += "," + vm.addPostList[i];
            }
          }
          // vm.submitData.module_id_list=vm.addPostList;
          vm.submitData.flag = 1;
        }
      } else {
        if (vm.delPostList.length == 0) {
          layer.msg("至少选择一条权限");
          return;
        } else {
          for (var i = 0; i < vm.delPostList.length; i++) {
            if (vm.submitData.module_id_list == "") {
              vm.submitData.module_id_list += vm.delPostList[i];
            } else {
              vm.submitData.module_id_list += "," + vm.delPostList[i];
            }
          }
          vm.submitData.flag = 0;
        }
      }
      roleChange(vm.submitData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("操作成功！");
            this.$router.push({
              name: "roleManage",
              query: {
                roleName:this.$route.query.roleName,
                roleId:this.$route.query.roleId,
                pageNo:this.$route.query.pageNo,
                userName: this.$route.query.user_name
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
    userSubmitEvent: function() {
      var vm = this;
      if (vm.roletype == "add") {
        if (vm.addPostList.length == 0) {
          layer.msg("至少选择一条权限");
          return;
        } else {
          for (var i = 0; i < vm.addPostList.length; i++) {
            if (vm.usersubmitData.module_id_list == "") {
              vm.usersubmitData.module_id_list += vm.addPostList[i];
            } else {
              vm.usersubmitData.module_id_list += "," + vm.addPostList[i];
            }
          }
          vm.usersubmitData.flag = 1;
        }
      } else {
        if (vm.delPostList.length == 0) {
          layer.msg("至少选择一条权限");
          return;
        } else {
          for (var i = 0; i < vm.delPostList.length; i++) {
            if (vm.usersubmitData.module_id_list == "") {
              vm.usersubmitData.module_id_list += vm.delPostList[i];
            } else {
              vm.usersubmitData.module_id_list += "," + vm.delPostList[i];
            }
          }
          vm.usersubmitData.flag = 0;
        }
      }
      // console.log(JSON.stringify(vm.usersubmitData))
      userChange(vm.usersubmitData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("操作成功！");
            this.$router.push({
              name: "userManage",
              query: {
                roleName:this.$route.query.roleName,
                roleId:this.$route.query.roleId,
                pageNo:this.$route.query.pageNo,
                userName: this.$route.query.user_name
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
    detailBack: function() {
      /*this.$router.back(-1);*/
      this.$router.push({
        name: "roleManage",
        query: {
          roleName:this.$route.query.roleName,
          roleId:this.$route.query.roleId,
          pageNo:this.$route.query.pageNo,
          userName: this.$route.query.user_name
        }
      });
    }
  },
  mounted() {
    var vm = this;
    // console.log(JSON.stringify(this.$route.query.data));
    if (this.$route.query.type == "add") {
      vm.getUnassignedList();
    } else {
      vm.getAllocatedList();
    }
  }
};
</script>
