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
                标题：
                <label v-text="detailData.applyTitle"></label>
              </span>
              <span>
                报销人：
                <label v-text="detailData.applyStaffName"></label>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">报销信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail">
            <div>
              <table class="customTable">
                <thead>
                  <tr>
                    <th style="width:2.5%;">
                      <input type="checkbox">
                    </th>
                    <th style="width:2.5%;">序号</th>
                    <th style="width:7.5%;">报销级别</th>
                    <th style="width:7.5%;">报销金额</th>
                    <th style="width:10%;">费用明细</th>
                    <th style="width:10%;">报销时间</th>
                    <th style="width:30%;">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,i) in detailData.detailList">
                    <td>
                      <input type="checkbox">
                    </td>
                    <td v-text="i+1"></td>
                    <td v-text="item.reimbursementType"></td>
                    <td v-text="item.money"></td>
                    <td v-text="item.feeDetail"></td>
                    <td v-text="item.feeHappenDatetime"></td>
                    <td>
                      <div
                        class="table-btn btn-yellow newbtn"
                        @click="showPopup(item.reimbursementReason);"
                      >报销事由</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">附件</div>
        </div>
        <div class="tag-box-content">
          <div class="upload-pic">
            <img :src="detailData.imageFilePath" alt>
          </div>
        </div>
      </div>
      <div class="detail-back">
        <button @click="detailBack();">返回</button>
      </div>

      <!-- 弹出层 -->
      <div class="popup" :style="editPopup==1?'display:block;':''">
        <div class="popup-main planPopup-edit-main operationLog">
          <div class="popup-title">
            <label>报销事由</label>
            <em class="popup-close" @click="closePopup('edit');">×</em>
          </div>
          <div class="popup-content">
            <pre v-text="reimbursementReason"></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getReimbursement } from "../../../api/oa/reimbursement";

export default {
  name: "reimbDetail",
  data() {
    return {
      postData: {
        reimbursementId: this.$route.query.id
      },
      editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
      reimbursementReason: "",
      popupTitle: "",
      detailData: "",
      listData: []
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      getReimbursement(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            console.log(JSON.stringify(ret));
            vm.detailData = ret.data.reimbursementDetail;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    showPopup: function(reimbursementReason) {
      // 展示弹出层
      var vm = this;
      vm.reimbursementReason = reimbursementReason;
      vm.editPopup = 1;
    },
    closePopup: function() {
      // 隐藏弹出层
      var vm = this;
      vm.editPopup = 0;
      vm.reimbursementReason = "";
    },
    detailBack:function () {
      var vm=this;
      let applyTitle=this.$route.query.applyTitle;
      let totalFee=this.$route.query.totalFee;
      let pageNo=this.$route.query.pageNo;
      this.$router.push({
        name: "reimbList",
        query: {
          applyTitle:applyTitle,
          totalFee:totalFee,
          pageNo:pageNo
        }
      });
    }
  },
  mounted() {
    var vm = this;
    console.log(vm);
    vm.getDetail();
  }
};
</script>

<style scoped>
.newbtn {
  width: 15%;
  color: white !important;
  font-size: 15px;
}
</style>
