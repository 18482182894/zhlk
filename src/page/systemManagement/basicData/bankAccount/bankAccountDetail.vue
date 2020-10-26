<template>
  <div class="content">
    <div class="menuManage userManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">基础信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail">
            <div>
              <span>
                银行名称：
                <label v-text="detailData.bankName"></label>
              </span>
              <span>
                开户行信息：
                <label v-text="detailData.bankInformation"></label>
              </span>
              <span>
                开户姓名：
                <label v-text="detailData.accountUserName"></label>
              </span>
              <span>
                账号：
                <label v-text="detailData.accountNo"></label>
              </span>
              <span>
                开户地址 ：
                <label v-text="detailData.bankInformationAddr"></label>
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
import { bankDetail } from "@/api/systemManage/bank";
export default {
  name: "bankDetail",
  data() {
    return {
      postData: {
        bankAccountId: this.$route.query.id
      },
      detailData: ""
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      bankDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData = ret.data.dataMap;
            // console.log(ret.data);
          } else {
            layer.alert(err.message, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },

    
    detailBack: function() {
     /* this.$router.back(-1);*/
      this.$router.push({
        name: "bankAccount",
        query: {
          bankInformation:this.$route.query.bankInformation,
          bankName:this.$route.query.bankName,
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
