<template>
  <div class="content">
    <div class="menuManage userManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">修改密码</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
                <label>用户名：</label>
                <input
                  type="text"
                  class="input-text"
                  readonly="readonly"
                  v-model="postData.user_name"
                />
              </span>
              <span>
                <label>密码：</label>
                <input type="text" class="input-text" v-model="postData.password" />
              </span>
              <span>
                <label>确认密码：</label>
                <input type="text" class="input-text" v-model="rePassword" />
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
import { changePwd } from "@/api/systemManage/user";
export default {
  name: "userManageChangePassword",
  data() {
    return {
      postData: {
        user_name: JSON.parse(localStorage.getItem("userInfo")).userName,
        password: "",
        access_token: JSON.parse(localStorage.getItem("userInfo")).access_token
      },
      rePassword: ""
    };
  },
  methods: {
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
      changePwd(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("密码修改成功！");
            console.log(vm.postData);
            this.$router.push({
              path: '/'
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
      this.$router.push({
        path: '/'
      });
    }
  }
};
</script>
