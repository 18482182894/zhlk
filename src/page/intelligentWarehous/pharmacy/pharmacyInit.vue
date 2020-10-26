<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">药剂初始化信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
                药品名称：
                <select class="select-style excision" v-model="detail.medicineId">
                 <option
                   v-for="item in medicineCodeList"
                   :key="item.dicInfoCode"
                   :value="item.dicInfoCode"
                   v-text="item.dicInfoValue"/>
                </select>
              </span>
              <span>
                药品编码：
                <input type="text" class="input-text" readonly v-model="detail.medicineId"/>
              </span>
              <span>
                药剂类型编码：
                <input type="text" class="input-text" readonly v-model="detail.medicineDosageForm"/>
              </span>
              <span>
                初始化数量：
                <input type="num" class="input-text" v-model="detail.inventoryNum"/>
              </span>
              <span>
                价格：
                <input type="num" class="input-text" v-model="detail.price"/>
              </span>
              <span>
                单位：
                <select class="select-style excision" v-model="detail.meterUnit">
                 <option
                   v-for="item in unitsCodeList"
                   :key="item.dicInfoCode"
                   :value="item.dicInfoCode"
                   v-text="item.dicInfoValue"/>
                </select>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="edit-btn">
        <button class="edit-submit" @click="submitEvent()">提交</button>
        <button class="edit-back" @click="gobackTo()">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {initMedicine} from "@/api/intelligentWarehous/pharmacy";
  import {unitsCode, medicineCode} from "@/api/systemManage/dropDown";

  export default {
    name: "purchaseEdit",
    data() {
      return {
        detail: {
          medicineId: '',
          medicineName: '',
          inventoryNum: '',
          price: '',
          medicineDosageForm: '',
          meterUnit: '',
        },
		
		// 该数据结构用于存储从【药剂管理列表界面】传递来的查询条件参数
		postData:{
		  medicineId:this.$route.query.medicineId,
          medicineName:this.$route.query.medicineName,
          pageNo:this.$route.query.pageNo!=null?this.$route.query.pageNo:0
		},
        unitsCodeList: [],
        medicineCodeList: [],
      };
    },
    methods: {
      submitEvent() {
        if (!this.detail.medicineId) return layer.msg("请选择药剂");
        if (!this.detail.inventoryNum) return layer.msg("请填写初始化数量");
        if (!this.detail.price) return layer.msg("请填写价格");
        if (!this.detail.meterUnit) return layer.msg("请选择单位");
        layer.load(2);
        initMedicine(this.detail)
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("保存成功！");
              //this.$router.back();
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
      getUnitsCode() {
        unitsCode()
          .then((ret) => {
            if (ret.code == 200) {
              this.unitsCodeList = ret.data.dataList;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getMedicineCode() {
        medicineCode()
          .then((ret) => {
            if (ret.code == 200) {
              this.medicineCodeList = ret.data.dataList.filter(m => ['1', '2', '3'].indexOf(m.dicInfoCode) === -1);
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getMedicine(medicineId) {
        const medicine = this.medicineCodeList.find(m => m.dicInfoCode == medicineId);
        if (medicine) {
          this.detail.medicineName = medicine.dicInfoValue;
          const medicineDosageFormFormat = Vue.filter('medicineDosageFormFormat');
		  //this.detail.medicineDosageForm = medicineDosageFormFormat(medicineId.charAt(0));
		  this.detail.medicineDosageForm = medicineId.charAt(0);
        }
      },
	  
	  // 返回【药剂管理列表】界面
	  gobackTo(){
		var vm = this;
		this.$router.push({
            name: "pharmacyMent",
            query: {
              medicineId:vm.postData.medicineId,
              medicineName:vm.postData.medicineName,
              pageNo:vm.postData.pageNo
            }
         });  
	  }
    },
    watch: {
      'detail.medicineId'(medicineId) {
        if (medicineId) {
          this.getMedicine(medicineId);
        }
      }
    },
    mounted() {
      this.getUnitsCode();
      this.getMedicineCode();
    }
  };
</script>

<style scoped>

</style>
