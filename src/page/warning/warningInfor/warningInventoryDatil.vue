<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">基础信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div class="detail-div_1">
                            <span class="detail-tittle">
                                报警类型：倒仓报警
                                <label v-text="detailData.grainVarietyName"></label>
                            </span>
              <div class="detail-content">
                <span>
                    到期时间：
                    <label v-text="detailData.inhouseExpiretimeJudgeMark"></label>
                    <label v-text="detailData.inhouseExpiretimeJudgeValue"></label>天
                </span>
                <br />
                <span style="width: 100%">
                  <h2>报警说明：</h2>
                  <p v-text="detailData.warningContent"></p>
                </span>
              </div>
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
  import {warningInventoryDatil} from "@/api/warning/warningList";
  export default {
    name: "warningInventoryDetail",
    data() {
      return {
        postData: {
          id: this.$route.query.id
        },
        detailData: {
          inhouseExpiretimeJudgeMark:'',
          inhouseExpiretimeJudgeValue:'',
          warningContent:''
        }
      };
    },
    methods: {
      getDetail: function() {
        var vm = this;
        layer.load(2);
        warningInventoryDatil(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.detailData = ret.data.reversePolicieDetail;
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      },
      detailBack:function () {
        this.$router.back(-1);
      }
    },
    mounted() {
      var vm = this;
      vm.getDetail();
    }
  };
</script>

<style scoped>
  .line{
    width: 60%;;
    height: 1px;
    background-color: gainsboro;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .detail-div_1{
    width: 85%;
    height: 550px;
    border: 1px gray solid;
    margin-left: 5%;
    padding-left: 5%;
  }
  .detail-div_2{
    width: 85%;
    border: 1px gray solid;
    margin-left: 5%;
    padding-left: 5%;
    margin-top: 50px;
  }
  .detail-content{
    margin-top: 50px;
  }
  .detail-div_3{
    padding-top: 50px;
    padding-bottom: 50px;
    width: 85%;
    border: 1px gray solid;
    margin-left: 5%;
    padding-left: 5%;
    margin-top: 50px;
  }
  .detail-content_2{
    margin-left: 25%;

  }
  .detail-tittle{
    margin-top: 50px;
  }
  .userManage-detail > div{
    font-size: 16px;
  }
</style>
