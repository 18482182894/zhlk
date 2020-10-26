<template>
  <div class="content">
    <div class="menuManage userManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">基础信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail">
            <img src="../../../../static/images/user.png" alt>
            <div class="userManage-detail-right">
              <span>
                <label>用户名：</label>
                <label v-text="detailData.user_name"></label>
              </span>
              <span>
                <label>角色名称：</label>
                <label v-text="detailData.roleName"></label>
              </span>
              <span>
                <label>注册时间：</label>
                <label v-text="detailData.create_time"></label>
              </span>
              <span>
                <label>备注：</label>
                <label
                  v-text="detailData.memo"
                  style="white-space:normal;
         word-break:break-all;
         word-wrap:break-word; "
                ></label>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="detail-back">
        <button @click="detailBack();">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import { userDetail } from "@/api/systemManage/user";
export default {
  name: "userManageDetail",
  data() {
    return {
      postData: {
        userId: this.$route.query.id
      },
      detailData: ""
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      userDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret));
            vm.detailData = ret.data.detail;
            // console.log(vm.detailData);
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    detailBack: function() {
     /* this.$router.back(-1);*/
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
    vm.getDetail();
  }
};
</script>
