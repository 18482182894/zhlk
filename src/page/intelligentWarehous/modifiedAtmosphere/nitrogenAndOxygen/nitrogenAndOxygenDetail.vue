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
                粮情检查分析：
                <label v-text="detail.grainInfoCheckAnalysis"></label>
              </span>
              <span>
                仓房：
                <label v-text="detail.storehouseName"></label>
              </span>
              <span>
                廒间：
                <label v-text="detail.warehouseName"></label>
              </span>
              <span>
                作业编号：
                <label v-text="detail.cdjyJobId"></label>
              </span>
              <span>
                降氧目的：
                <label v-text="detail.cdjyPurpose"></label>
              </span>
              <span>
                充气方式：
                <label v-text="detail.inflationMethod"></label>
              </span>
              <span>
                操作日期：
                <label v-text="detail.operateDate"></label>
              </span>
              <br>
              <span>
                准备工作要点：
                <label v-text="detail.prepareJobMainpoint"></label>
              </span>
              <br>
              <span>
                散气作业方案：
                <label v-text="detail.cdjyJobProgramme"></label>
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
  import {fetchNitrogenAndOxygen} from "@/api/intelligentWarehous/atmosphere";

  export default {
    name: "nitrogenAndOxygenDetail",
    data() {
      return {
        detail: {
        },
        postData:{
          storehouseGbCode:this.$route.query.storehouseGbCode,
          warehouseGbCode:this.$route.query.warehouseGbCode,
          pageNo:this.$route.query.pageNo
        }
      };
    },
    methods: {
      getDetail(cdjyJobId) {
        layer.load(2);
        fetchNitrogenAndOxygen({cdjyJobId})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              this.detail = ret.data.kichoCdjyJob;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      detailBack: function () {
        this.$router.push({
          name: "nitrogenAndOxygen",
          query: {
            storehouseGbCode:this.postData.storehouseGbCode,
            warehouseGbCode:this.postData.warehouseGbCode,
            pageNo:this.postData.pageNo
          }
        })
      }
    },
    mounted() {
      this.getDetail(this.$route.query.id);
    }
  };
</script>
