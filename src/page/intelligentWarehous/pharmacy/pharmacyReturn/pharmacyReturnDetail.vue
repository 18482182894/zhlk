<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">药剂归还详细</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
                领用申请单编码：
                <label v-text="detail.medicineUseApplyId"></label>
              </span>
              <span>
                药品名称：
                <label v-text="detail.medicineName"></label>
              </span>
              <span>
                药剂类型：
                <label>{{detail.medicineDosageForm | medicineDosageFormFormat}}</label>
              </span>
              <span>
                出库单号：
                <label v-text="detail.medicineExportRecordId"></label>
              </span>
              <span>
                归还数量：
                <label v-text="detail.giveBackNum"></label>
              </span>
              <span>
                空瓶处理数量：
                <label v-text="detail.emptyBottle"></label>
              </span>
              <span>
                归还人：
                <label v-text="detail.giveBackPerson"></label>
              </span>
              <span>
                签收人：
                <label v-text="detail.signPerson"></label>
              </span>
              <span>
                归还时间：
                <label v-text="detail.giveBackDatetime"></label>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="detail-back">
        <button @click="gobackTo()">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {fetchExport, fetchGiveBack} from "@/api/intelligentWarehous/pharmacy";
  export default {
    name: "pharmacyReturnDetail",
    data() {
      return {
        detail: {},
		postData:{
			medicineId:this.$route.query.medicineId,
            medicineName:this.$route.query.medicineName,
            pageNo:this.$route.query.pageNo!=null?this.$route.query.pageNo:1
		}
      };
    },
    methods: {
      getDetail(giveBackId) {
        var vm = this;
        layer.load(2);
        fetchGiveBack({giveBackId})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              const {giveBack} = ret.data;
              this.detail = giveBack;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
	  
	  gobackTo(){
		var vm = this;
		this.$router.push({
            name:"pharmacyReturnList",
            query: {
              medicineId:vm.postData.medicineId,
              medicineName:vm.postData.medicineName,
              pageNo:vm.postData.pageNo
            }
         });  
	  } 
    },
    mounted() {
      this.getDetail(this.$route.query.id);
    }
  };
</script>

<style scoped>

</style>
