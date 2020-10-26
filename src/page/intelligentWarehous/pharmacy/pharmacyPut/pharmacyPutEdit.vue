<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">药剂入库信息编辑</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
                采购单编号：
                <select class="select-style excision" v-model="detail.purchaseApplyId">
                 <option
                   v-for="item in purchaseList"
                   :key="item.purchaseApplyId"
                   :value="item.purchaseApplyId"
                   v-text="item.purchaseApplyId"/>
                </select>
              </span>
              <span>
                药品编码：
                <input type="text" class="input-text" readonly v-model="detail.medicineId"/>
              </span>
              <span>
                药品名称：
                <input type="text" class="input-text" readonly v-model="detail.medicineName"/>
              </span>
              <span>
                药剂类型：
                <input type="text" class="input-text" readonly v-model="detail.medicineDosageFormValue"/>
              </span>
              <span>
                单位：
                <input type="text" class="input-text" readonly v-model="detail.meterUintValue"/>
              </span>
              <span>
                入库数量：
                <input type="num" class="input-text" v-model="detail.importNum"/>
              </span>
              <span>
                采购价格：
                <input type="num" class="input-text" v-model="detail.purchasePrice"/>
              </span>
              <span>
                生产日期：
                <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',})" id="productDate"/>
              </span>
              <span>
                过期日期：
                <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',})" id="expireDate"/>
              </span>
              <span>
                入库负责人：
                <select class="select-style excision" v-model="detail.importResponsibilityPerson">
                 <option
                   v-for="item in staffListData"
                   :key="item.staff_id"
                   :value="item.staff_id"
                   v-text="item.staff_name"/>
                </select>
              </span>
              <span>
                签收人：
                <select class="select-style excision" v-model="detail.signPerson">
                 <option
                   v-for="item in staffListData"
                   :key="item.staff_id"
                   :value="item.staff_id"
                   v-text="item.staff_name"/>
                </select>
              </span>
              <br>
              <span style="width: 100%">
                存放地点：
                <textarea class="edit-textarea" v-model="detail.archivesAddress"/>
               </span>
            </div>
          </div>
        </div>
      </div>
      <div class="edit-btn">
        <button class="edit-submit" @click="submitEvent();">提交</button>
        <button class="edit-back" @click="gobackTo()">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {fetchPurchaseList, fetchPurchase, addImport} from "@/api/intelligentWarehous/pharmacy";
  import {staffList} from "@/api/systemManage/staff";

  export default {
    name: "pharmacyPutEdit",
    data() {
      return {
        detail: {
          purchaseApplyId: '',
          medicineId: '',
          medicineName: '',
          medicineDosageForm: '',
          medicineDosageFormValue: '',
          meterUint: '',
          meterUintValue: '',
          importNum: '',
          purchasePrice: '',
          productDate: '',
          expireDate: '',
          importResponsibilityPerson: '',
          signPerson: '',
          archivesAddress: '',
        },
		postData:{
			medicineId:this.$route.query.medicineId,
            medicineName:this.$route.query.medicineName,
            pageNo:this.$route.query.pageNo!=null?this.$route.query.pageNo:0,
            originalPageName:this.$route.query.originalPageName		
		},
        purchaseList: [],
        staffListData: [],
      };
    },
    methods: {
      getStaff() { // 获取检查人员列表
        staffList({pageNo: 1, pageSize: 1000})
          .then((ret) => {
            if (ret.code == 200) {
              this.staffListData = ret.data.staffList;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getPurchaseList() {
        fetchPurchaseList({pageNo: 1, pageSize: 1000})
          .then((ret) => {
            if (ret.code == 200) {
              
              if (this.$route.query.purchaseApplyId) {
                this.getPurchase(this.$route.query.purchaseApplyId);
				
				this.purchaseList = ret.data.purchaseApplyList.filter(p => p.purchaseApplyStatus == 2
				    && p.medicineId==this.$route.query.selectedMedicineId);
				
              }else{
				this.purchaseList = ret.data.purchaseApplyList.filter(p => p.purchaseApplyStatus == 2);
			  }
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
			
			
			
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getPurchase(purchaseApplyId) {
        fetchPurchase({purchaseApplyId})
          .then((ret) => {
            if (ret.code == 200) {
              const {purchaseApplyDetail} = ret.data;
              this.detail.purchaseApplyId = purchaseApplyDetail.purchaseApplyId;
			  return purchaseApplyDetail.medicineId;
			  
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      submitEvent() {
        this.detail.productDate = document.getElementById('productDate').value;
        this.detail.expireDate = document.getElementById('expireDate').value;
        if (!this.detail.importNum) return layer.msg("请填写入库数量");
        if (!this.detail.purchasePrice) return layer.msg("请填写采购价格");
        if (!this.detail.productDate) return layer.msg("请选择生产日期");
        if (!this.detail.expireDate) return layer.msg("请选择过期日期");
        if (!this.detail.importResponsibilityPerson) return layer.msg("请入选择库负责人");
        if (!this.detail.signPerson) return layer.msg("请选择签收人");
        layer.load(2);
        addImport(this.detail)
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("保存成功！");
              this.gobackTo();
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
            name:vm.postData.originalPageName,
            query: {
              medicineId:vm.postData.medicineId,
              medicineName:vm.postData.medicineName,
              pageNo:vm.postData.pageNo,
			  originalPageName:vm.postData.originalPageName
            }
         });  
	  }  
    },
    watch: {
      'detail.purchaseApplyId'(purchaseApplyId) {
        const purchase = this.purchaseList.find(p => p.purchaseApplyId === purchaseApplyId);
        this.detail.medicineId = purchase.medicineId;
        this.detail.medicineName = purchase.medicineName;
        this.detail.medicineDosageForm = purchase.medicineDosageForm;
        this.detail.medicineDosageFormValue = purchase.medicineDosageFormValue;
        this.detail.meterUint = purchase.meterUint;
        this.detail.meterUintValue = purchase.meterUintValue;
      }
    },
    mounted() {
      this.getStaff();
      this.getPurchaseList();
    }
  };
</script>

<style scoped>

</style>
