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
              <span v-if="postData.user_id">
                <label>用户名：</label>
                <input
                  type="text"
                  class="input-text"
                  readonly="readonly"
                  v-model="postData.user_name"
                >
              </span>
              <span v-else>
                <label>用户名：</label>
                <input type="text" class="input-text" v-model="postData.user_name">
              </span>
              <span>
                <label>密码：</label>
                <input type="text" class="input-text" v-model="postData.password">
              </span>
              <span>
                <label>确认密码：</label>
                <input type="text" class="input-text" v-model="rePassword">
              </span>
              <span>
                <label>备注：</label>
                <input type="text" class="input-text" v-model="postData.memo">
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">添加角色</div>
        </div>
        <div class="tag-box-content" style="display:flex;flex-wrap:wrap">
          <!-- <div class="addRole-item">
                        <label><input type="checkbox" v-model="addCheckAll" @change="checkAll();">
                        全部勾选</label>
                    </div>
                    <div class="addRole-item" v-for="item in roleDataList">
                        <label><input type="checkbox"  :value="item.role_id" v-model="RoleList" @change="clickChange();" >
                        {{item.role_name}}</label>
          </div>-->
          <!-- <div class="addRole-box-item" v-for="item in UnassignedList">
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
          </div>-->
          <div v-for="item in roleList" class="userRole-item" style="width:20%;">
            <label>
              <input
                type="checkbox"
                :value="item.role_id"
                v-model="postData.roleIdList"
              >
              {{item.role_name}}
            </label>
          </div>
        </div>
      </div>

      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">图片</div>
        </div>
        <div class="tag-box-content">
          <div class="upload-pic">
            <div id="uploadPic"></div>
            <img :src="postData.imgUrl?postData.imgUrl:'../../../../static/images/upload-pic.png'" alt>
            <label class="fc-red">只支持.jpg格式</label>
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
  userDetail,
  userEdit,
  userNew,
  userBindingRole
} from "@/api/systemManage/user";
import { roleUnassigned, roleList } from "@/api/systemManage/role";
import { uploadPic } from "@/utils/public";
export default {
  name: "userManageEdit",
  data() {
    return {
      postData: {
        user_id: this.$route.query.id,
        user_name: "",
        password: "",
        roleIdList: [],
        img: "",
        imgUrl:'',
        memo: ""
      },
      type: "add",
      addCheckAll: false, //全选按钮
      // roleDataList:[],
      UnassignedList: [],
      rePassword: "",
      roleList: [],
      isShow: 0
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      userDetail({ userId: this.$route.query.id })
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret));
            vm.postData.user_name = ret.data.detail.user_name;
            vm.postData.user_id = ret.data.detail.user_id;
            vm.postData.img = ret.data.detail.img;
            vm.postData.memo = ret.data.detail.memo;
            
            // vm.postData.roleIdList = ret.data.detail.roleIdList;
            // console.log(ret.data);

            // vm.postData.memo = ret.data.detail.memo;
            // vm.postData.img=ret.data.user.img;
            // vm.getUnassignedList();
              vm.$nextTick(function() {
                if (ret.data.detail.roleId) {
                  vm.postData.roleIdList = ret.data.detail.roleId.split(',');
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
    getroleList: function() {
      var vm = this;
      roleList({
        pageSize: 10000,
        pageNo: 0
      })
        .then(ret => {
          if (ret.code == 200) {
            vm.roleList = ret.data.dataList;
            console.log(ret.data.dataList);
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    // getUnassignedList: function() {
    //   var vm = this;
    //   roleUnassigned({
    //     role_id: vm.role_id
    //   })
    //     .then(ret => {
    //       layer.closeAll("loading");
    //       if (ret.code == 200) {
    //         console.log(ret.data);
    //         // vm.UnassignedList = ret.data.dataMap;
    //         for (let i in ret.data.dataMap) {
    //           let o = {};
    //           o[i] = ret.data.dataMap[i];
    //           var list = {};
    //           for (let j in o) {
    //             list = {
    //               assortment: j,
    //               moduleList: o[j]
    //             };
    //           }
    //           vm.UnassignedList.push(list);
    //         }
    //       } else {
    //         layer.alert(ret.data, { closeBtn: 0 });
    //       }
    //     })
    //     .catch(err => {
    //       layer.alert(err.message, { closeBtn: 0 });
    //     });
    // },
    // checkAll: function() {
    //   //全选
    //   var vm = this;

    //   if (vm.addCheckAll) {
    //     for (var i = 0; i < vm.roleDataList.length; i++) {
    //       vm.RoleList.push(vm.roleDataList[i].role_id);
    //     }
    //   } else {
    //     vm.RoleList = [];
    //   }
    // },
    // clickChange: function() {
    //   //监听input选中状态，控制全选input的选中
    //   var vm = this;

    //   if (vm.RoleList.length == vm.roleDataList.length) {
    //     vm.addCheckAll = true;
    //   } else {
    //     vm.addCheckAll = false;
    //   }
    // },
    submitEvent: function() {
      //提交
      var vm = this;
        if (vm.postData.user_name == "") {
          layer.msg("请填写用户名");
          return;
        } else {
          if (vm.postData.user_name.length > 20) {
            layer.msg("用户名不得超过20个字符");
            return;
          }
        }
        if (vm.postData.password == "") {
          layer.msg("请填写密码");
          return;
        }
        if (vm.rePassword == "") {
          layer.msg("请再次填写密码");
          return;
        } else {
          if (vm.rePassword != vm.postData.password) {
            layer.msg("两次密码不一致");
            return;
          }
        }

        vm.postData.roleIdList = vm.postData.roleIdList.join(",");
      if (vm.$route.query.id) {
        layer.load(2);
        userEdit(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("编辑用户成功！");
              // console.log(vm.postData);
              this.$router.push({
                name: "userManage",
                query: {
                  userName:this.$route.query.userName,
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
        //新增提交
        layer.load(2);
        userNew(vm.postData)
          .then(ret => {
            console.log(ret.data);

            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增用户成功！");
              this.$router.push({
                name: "userManage",
                query: {
                  userName:this.$route.query.userName,
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
    detailBack: function() {
      this.$router.back(-1);

      this.$router.push({
        name: "userManage",
        query: {
          userName:this.$route.query.userName,
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
    vm.getroleList();
    uploadPic("uploadPic", function(ret) {
      if (ret.code == 200) {
        vm.postData.img=ret.data.fileName;
        vm.postData.imgUrl=ret.data.fileUrl;
      } else {
        layer.alert("上传文件出错", { closeBtn: 0 });
      }
    });
  }
};
</script>
