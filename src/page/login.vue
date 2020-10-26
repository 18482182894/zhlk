<template>
    <div class="login-body">
        <div class="login-main" style="opacity:0.8;">
            <div class="login-logo" style="overflow: inherit;">
                <img src="../../static/images/logo_big.png" alt="">
                <h1 class="logo_title">百威智联</h1>
            </div>
            <div class="login-middle">
                <div class="input-text">
                    <label>账号</label>
                    <input type="text" v-model="postData.userName">
                </div>
                <div class="input-text">
                    <label>密码</label>
                    <input type="password" v-model="postData.password" @keyup.enter="loginEvent()">
                </div>
                <div class="login-p text-justify">
                    <div>
                        <input type="checkbox" @keyup.enter="loginEvent()">
                        记住密码
                    </div>
                    <!-- <a href="" class="fc-blue" title="">忘记密码？</a> -->
                </div>
                <button class="query login-query" @click="loginEvent();">登录</button>
            </div>
        </div>
		<div class="copyright">
			<p>Copyright © 四川百威智联科技有限公司 © 版权所有</p>
		</div>
    </div>
</template>

<style type="text/css" scoped>
    .logo_title {
      position: relative;
      top: -70px;
      text-align: center;
      color: #CDA871;
      font-size: 38px;
      font-weight: normal;
      text-shadow: 1px 1px #cccc49;
    }
</style>

<script>
import { loginapi } from "@/api/login";
export default {
  name: "login",
  data() {
    return {
      postData: {
        userName: "",
        password: ""
      }
    };
  },
  methods: {
    loginEvent: function() {
      var vm = this;
      if (vm.postData.userName == "") {
        layer.msg("请填写用户名");
        return;
      }
      if (vm.postData.password == "") {
        layer.msg("请填写密码");
        return;
      }
      layer.load(2);
      loginapi(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            var str = JSON.stringify(ret.data);
            localStorage.setItem("userInfo", str);
            this.$router.push({ path: "/" }, function() {
              location.reload();
            });
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.data, { closeBtn: 0 });
        });
    }
  },
  mounted() {}
};
</script>
