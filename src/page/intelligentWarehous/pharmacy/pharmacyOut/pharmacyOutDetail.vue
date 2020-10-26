<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">药剂出库详细信息</div>
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
                单位：
                <label v-text="unit"></label>
              </span>
              <span>
                作业时间：
                <label v-text="detail.jobDate && detail.jobDate.slice(0,10)"></label>
              </span>
              <span>
                领用数量：
                <label v-text="detail.useNum"></label>
              </span>
              <span>
                申请人：
                <label v-text="detail.applyPerson"></label>
              </span>
              <span>
                申请部门：
                <label v-text="detail.applyDept"></label>
              </span>
              <br>
              <span>
                作业目的：
                <label v-text="detail.jobPurpose"></label>
              </span>
              <br>
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
  import {fetchExport} from "@/api/intelligentWarehous/pharmacy";
  import {unitsCode} from "@/api/systemManage/dropDown";

  export default {
    name: "pharmacyOutDetail",
    data() {
      return {
        detail: {},
        medicineDosageForm: '',
        unit: '',
		postData:{
			medicineId:this.$route.query.medicineId,
            medicineName:this.$route.query.medicineName,
            pageNo:this.$route.query.pageNo!=null?this.$route.query.pageNo:1
		}
      };
    },
    methods: {
      getDetail(medicineExportRecordId) {
        var vm = this;
        layer.load(2);
        fetchExport({medicineExportRecordId})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.detail = ret.data.dataMap;
              this.getUnitsCode(this.detail.meterUint);
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getUnitsCode(unit) {
        unitsCode()
          .then(ret => {
            if (ret.code == 200) {
              this.unit = ret.data.dataList.find(u => u.dicInfoCode = unit).dicInfoValue;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
	  
	  gobackTo(){
		var vm = this;
		this.$router.push({
            name:"pharmacyOutList",
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
