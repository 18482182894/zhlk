<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">药剂采购详细信息</div>
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
                规格描述：
                <label v-text="detail.specificationDescription"></label>
              </span>
              <span>
                购买数量：
                <label v-text="detail.buyNum"></label>
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
                采购负责人：
                <label v-text="detail.purchaseResponsibilityPerson"></label>
              </span>
              <span>
                生成许可证：
                <label v-text="detail.productionLicenseNo"></label>
              </span>
              <span>
                生产厂家：
                <label v-text="detail.productFactory"></label>
              </span>
              <br>
              <span>
                用途：
                <label v-text="detail.purpose"></label>
              </span>
              <br>
              <span>
                附件：
                <img :src="detail.imageFilePath" v-if="detail.imageFilePath"/>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="detail-back">
        <button @click="gobackTo()">返回</button>
      </div>
    </div>
		<div class="copyright">
			<p>Copyright © 四川百威智联科技有限公司 © 版权所有 电话：028-62631082</p>
		</div>
  </div>
</template>

<script>
  import {fetchPurchase} from "@/api/intelligentWarehous/pharmacy";
  import {staffDetail} from "@/api/systemManage/staff";
  import {unitsCode} from "@/api/systemManage/dropDown";

  export default {
    name: "purchaseDetail",
    data() {
      return {
        detail: {},
        medicineDosageForm: '',
        unit: '',
		postData:{
			medicineId:this.$route.query.medicineId,
			medicineName:this.$route.query.medicineName,
			pageNo:this.$route.query.pageNo
		}
      };
    },
    methods: {
      getDetail(purchaseApplyId) {
        var vm = this;
        layer.load(2);
        fetchPurchase({purchaseApplyId})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.detail = ret.data.purchaseApplyDetail;
              this.getUnitsCode(this.detail.meterUint);
              this.getStaffDetail(this.detail.purchaseResponsibilityPerson);
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
      getStaffDetail(staff_id) {
        staffDetail({staff_id})
          .then(ret => {
            if (ret.code == 200) {
              this.detail.purchaseResponsibilityPerson = ret.data.staffDetail.staff_name;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
	  
	  // 返回【药剂采购申请列表】界面
	  gobackTo(){
		var vm = this;
		this.$router.push({
            name: "purchaseList",
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
