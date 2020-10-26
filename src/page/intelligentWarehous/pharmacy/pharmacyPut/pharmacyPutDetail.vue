<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">药剂入库详细信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
                采购单编码：
                <label v-text="detail.purchaseApplyId"></label>
              </span>
              <span>
                药品编码：
                <label v-text="detail.medicineId"></label>
              </span>
              <span>
                药剂名称：
                <label v-text="detail.medicineName"></label>
              </span>
              <span>
                药剂类型：
                <label v-text="detail.medicineDosageForm"></label>
              </span>
              <span>
                单位：
                <label v-text="detail.meterUnit"></label>
              </span>
              <span>
                入库数量：
                <label v-text="detail.importNum"></label>
              </span>
              <span>
                采购价格：
                <label v-text="detail.purchasePrice"></label>
              </span>
              <span>
                生产日期：
                <label v-text="detail.productDate && detail.productDate.slice(0,10)"></label>
              </span>
              <span>
                过期日期：
                <label v-text="detail.expireDate && detail.expireDate.slice(0,10)"></label>
              </span>
              <span>
                入库负责人：
                <label v-text="detail.importResponsibilityPerson"></label>
              </span>
              <span>
                签收人：
                <label v-text="detail.signPerson"></label>
              </span>
              <br>
              <span>
                存放地点：
                <label v-text="detail.archivesAddress"></label>
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
  import {fetchImport} from "@/api/intelligentWarehous/pharmacy";
  import {staffDetail} from "@/api/systemManage/staff";
  import {unitsCode,medicineCode} from "@/api/systemManage/dropDown";

  export default {
    name: "pharmacyPutDetail",
    data() {
      return {
        detail: {},
		postData:{
			medicineId:  this.$route.query.medicineId,
            medicineName:this.$route.query.medicineName,
            pageNo:this.$route.query.pageNo!=null?this.$route.query.pageNo:0			
		}
      };
    },
    methods: {
      getDetail(id) {
        layer.load(2);
        fetchImport({id})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              this.detail = ret.data.importRecordDetail;
              this.getUnitsCode(this.detail.meterUint);
			  this.getMedicineCode(this.detail.medicineDosageForm);
              this.getStaffDetail(this.detail.importResponsibilityPerson, 'importResponsibilityPerson');
              this.getStaffDetail(this.detail.signPerson, 'signPerson');
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getStaffDetail(staff_id, key) {
        staffDetail({staff_id})
          .then(ret => {
            if (ret.code == 200) {
              this.detail[key] = ret.data.staffDetail.staff_name;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getUnitsCode(unit) {
        unitsCode()
          .then(ret => {
            if (ret.code == 200) {
              this.detail.meterUnit = ret.data.dataList.find(u => u.dicInfoCode = unit).dicInfoValue;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
	  
	  getMedicineCode(mcode){
		medicineCode()
		   .then(ret=>{
			    if (ret.code == 200) {
              this.detail.medicineDosageForm = ret.data.dataList.find(u => u.dicInfoCode = mcode).dicInfoValue;
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
            name: "pharmacyPutList",
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
