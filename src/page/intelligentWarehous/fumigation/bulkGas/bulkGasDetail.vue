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
                仓房：
                <label v-text="detail.storehouseName"></label>
              </span>
              <span>
                廒间：
                <label v-text="detail.warehouseName"></label>
              </span>
              <span>
                熏蒸散气单号：
                <label v-text="detail.divergenceGasJobId"></label>
              </span>
              <span>
                操作日期：
                <label v-text="detail.operateDatetime"></label>
              </span>
              <br>
              <span>
                准备工作要点：
                <label v-text="detail.prepareJobMainpoint"></label>
              </span>
              <br>
              <span>
                散气作业方案：
                <label v-text="detail.divergenceGasJobProgramme"></label>
              </span>
              <br>
              <span>
                操作步骤：
                <label v-text="detail.operateStep"></label>
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
  import {fetchBulkGas} from "@/api/intelligentWarehous/fumigation";

  export default {
    name: "bulkGasDetail",
    data() {
      return {
        detail: {},
        postData:{
          storehouseGbCode:this.$route.query.storehouseGbCode,
          warehouseGbCode:this.$route.query.warehouseGbCode,
          pageNo:this.$route.query.pageNo
        }
      };
    },
    methods: {
      getDetail(divergenceGasJobId) {
        layer.load(2);
        fetchBulkGas(divergenceGasJobId)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              const {divergenceGasJob, divergenceGasJobId} = ret.data;
              divergenceGasJob.divergenceGasJobId = divergenceGasJobId;
              this.detail = divergenceGasJob;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      detailBack:function () {
        this.$router.push({
          name: "bulkGas",
          query: {
            storehouseGbCode:this.postData.storehouseGbCode,
            warehouseGbCode:this.postData.warehouseGbCode,
            pageNo:this.postData.pageNo
          }
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
