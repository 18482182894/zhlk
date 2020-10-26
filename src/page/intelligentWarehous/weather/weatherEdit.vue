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
                温度：
                <input type="text" class="input-text" v-model="submitData.temperature">
              </span>
              <span>
                湿度：
                <input type="text" class="input-text" v-model="submitData.humidity">
              </span>
              <span>
                风速：
                <input type="text" class="input-text" v-model="submitData.windSpeed">
              </span>
              <span>
                雨量：
                <input type="text" class="input-text" v-model="submitData.rainNum">
              </span>
              <span>
                气压：
                <input type="text" class="input-text" v-model="submitData.pressure">
              </span>
              <span>
                风向：
                <input type="text" class="input-text" v-model="submitData.windDirection">
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="edit-btn">
        <button class="edit-submit" @click="submitEvent();">提交</button>
        <button class="edit-back" @click="addBack();">返回</button>
      </div>
    </div>
	<div class="copyright">
		<p>Copyright © 四川百威智联科技有限公司 © 版权所有 电话：028-62631082</p>
	</div>
  </div>
</template>
<script>
  import {addWeather} from "@/api/intelligentWarehous/weather";

  export default {
    name: "weatherEdit",
    data() {
      return {
        submitData: {
          temperature: "",
          humidity: "",
          windSpeed: "",
          rainNum: "",
          pressure: "",
          windDirection: '',
        },
      };
    },
    methods: {
      submitEvent() {
        if (!this.submitData.temperature) return layer.msg("请填写温度");
        if (!this.submitData.humidity) return layer.msg("请填写湿度");
        if (!this.submitData.windSpeed) return layer.msg("请填写风速");
        if (!this.submitData.rainNum) return layer.msg("请填写雨量");
        if (!this.submitData.pressure) return layer.msg("请填写气压");
        if (!this.submitData.windDirection) return layer.msg("请填写风向");
        layer.load(2);
        addWeather(this.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增智能气象成功！");
              this.addBack();
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      addBack: function () {//返回
        this.$router.push({
          name: "weather",
          query: {postData:this.$route.query.postData}
        })
      }
    },
    mounted() {
      if (this.$route.query.id) {
        this.getDetail(this.$route.query.id);
      }
    }
  };
</script>
