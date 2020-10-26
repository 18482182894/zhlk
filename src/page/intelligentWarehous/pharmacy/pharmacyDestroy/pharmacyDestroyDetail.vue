<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">药剂销毁详情</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
                药品编码：
                <label v-text="detail.medicineId"></label>
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
                销毁数量：
                <label v-text="detail.destoryNum"></label>
              </span>
              <span>
                销毁日期：
                <label v-text="detail.destoryDate.slice(0, 10)"></label>
              </span>
              <span>
                销毁人：
                <label v-text="detail.destoryPerson"></label>
              </span>
              <span>
                见证人：
                <label v-text="detail.witnessPerson"></label>
              </span>
              <span>
                销毁地点：
                <label v-text="detail.destoryAddress"></label>
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
  import {fetchDestroy} from "@/api/intelligentWarehous/pharmacy";

  export default {
    name: "pharmacyDestroyDetail",
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
      getDetail(medicineDestroyId) {
        layer.load(2);
        fetchDestroy({medicineDestroyId})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              this.detail = ret.data.destroy;
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
            name:"pharmacyDestroyList",
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
