<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">基础信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail">
            <div>
                <span>
                    审批单号：
                    <label v-text="detailData.billId"></label>
                </span>
                <span>
                    申请人名称：
                    <label v-text="detailData.applicantName"></label>
                </span>
                <span>
                    申请人时间：
                    <label v-text="detailData.updateTime"></label>
                </span>
                <span>
                    审批单名称：
                    <label v-text="detailData.billName"></label>
                </span>
                <span style="width: 100%">
                    审批备注：
                    <label v-text="detailData.memo"></label>
                </span>
            </div>
          </div>
        </div>
      </div>
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">审核日志</div>
        </div>
        <div class="tag-box-content">
          <div class="audit-box">
              <div class="audit-item" v-for="item in auditList">
                <div class="audit-item-top">
                  <div class="top-left">业务经理：<label v-text="item.approver!='Null'?item.approver:'无'"></label></div>
                  <div class="top-right">节点：<label v-text="item.nodeName"></label></div>
                </div>
                <div class="audit-item-content">
                  <div class="content-top"><img :src="item.approveResult==1?'../../../../../../static/images/agree.png':(item.approveResult==2?'../../../../../../static/images/disagree.png':'')" alt=""> <label v-text="item.approveResult==1?'同意':(item.approveResult==2?'不同意':'待审核')"></label></div>
                  <div class="content-middle">
                    <p><span>审核意见：</span><label v-text="item.approvalOpinion"></label></p>
                    <p><span>备注：</span><label v-text="item.memo"></label></p>
                  </div>
                  <div class="content-bottom">
                    <p><span>审核时间：</span><label v-text="item.approveTime"></label></p>
                  </div>
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
  import {getCheckeDoc} from "../../../api/workflow/checkDoc";

  export default {
        name: "approvalDetail",
    data() {
      return {
        postData: {
          billId: this.$route.query.id,
          overFlg:this.$route.query.overFlg_transfer,
          billName:this.$route.query.billName_transfer,
          beginCreateTime:this.$route.query.beginCreateTime_transfer ,
          endCreateTime: this.$route.query.endCreateTime_transfer,
          pageNo:this.$route.query.pageNo
        },
        detailData: "",
        auditList:''
      };
    },
    methods: {
      getDetail: function() {
        var vm = this;
        layer.load(2);
        getCheckeDoc(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              console.log(JSON.stringify(ret))
              vm.detailData = ret.data.billInfo;
              vm.auditList = ret.data.recordList;
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      },
      detailBack:function () {
        var vm=this;
        let billName_transfer=this.$route.query.billName_transfer;
        let overFlg_transfer=this.$route.query.overFlg_transfer;
        let beginCreateTime_transfer=this.$route.query.beginCreateTime_transfer;
        let endCreateTime_transfer=this.$route.query.endCreateTime_transfer;
        let pageNo=this.$route.query.pageNo;
        this.$router.push({
          name: "approvalList",
          query: {
            billName:billName_transfer,
            overFlg:overFlg_transfer,
            beginCreateTime:beginCreateTime_transfer,
            endCreateTime:endCreateTime_transfer,
            pageNo:pageNo
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

<style scoped>

</style>
