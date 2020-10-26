<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">药剂领用申请信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
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
				<input type="text" class="input-text" readonly v-model="detail.medicineDosageFormName"/>
				<input type="hidden" v-model="detail.medicineDosageForm" />
              </span>
              <span>
                单位：
                <input type="text" class="input-text" readonly v-model="detail.meterUintName"/>
				<input type="hidden" v-model="detail.meterUint" />
              </span>
              <span>
                领用数量：
                <input type="num" class="input-text" v-model="detail.useNum"/>
              </span>
              <span>
                作业时间：
                <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" id="jobDate"/>
              </span>
              <br>
              <span style="width: 100%">
                作业目的：
                <textarea class="edit-textarea" v-model="detail.jobPurpose"/>
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
  import {fetchMedicineDetail, addUse, editUse, fetchUse} from "@/api/intelligentWarehous/pharmacy";
  import {uploadPic} from "@/utils/public";
  import {unitsCode} from "@/api/systemManage/dropDown";

  export default {
    name: "purchaseEdit",
    data() {
      return {
        detail: {
          medicineId: '',
          medicineName: '',
          medicineDosageForm: '',
          medicineDosageFormName: '',
          meterUint: '',
          meterUintName: '',
          useNum: '',
          jobDate: '',
          jobPurpose: ''
        },
		
		// 该数据结构用于存储从【药剂管理列表界面】传递来的查询条件参数
		postData:{
		  medicineId:this.$route.query.medicineId,
          medicineName:this.$route.query.medicineName,
          pageNo:this.$route.query.pageNo!=null?this.$route.query.pageNo:0,
		  originalPageName:this.$route.query.originalPageName
		}
      };
    },
    methods: {
      getDetail(medicineUseApplyId) {
        layer.load(2);
        fetchUse({medicineUseApplyId})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              this.detail = ret.data.dataMap;
              this.detail.medicineDosageFormName = this.$route.query.medicineDosageFormValue;
              this.detail.meterUintName = this.$route.query.meterUintValue;
              document.getElementById('jobDate').value = this.detail.jobDate.slice(0, 10);
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      submitEvent() {
        this.detail.jobDate = document.getElementById('jobDate').value;
        if (!this.detail.useNum) return layer.msg("请填写领用数量");
        if (!this.detail.jobDate) return layer.msg("请选择作业时间");
        if (!this.detail.jobPurpose) return layer.msg("请填写作业目的");
        const api = this.detail.medicineUseApplyId ? editUse : addUse;
        layer.load(2);
        api(this.detail)
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("保存成功！");
              //this.$router.replace({name: 'collarList'});
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
      getMedicine(id) {
        layer.load(2);
        fetchMedicineDetail({id})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              const {storgeDetail} = ret.data;
              this.detail.medicineId = storgeDetail.medicineId;
              this.detail.medicineName = storgeDetail.medicineName;
              this.detail.medicineDosageForm = storgeDetail.medicineDosageForm;
              this.detail.medicineDosageFormName = storgeDetail.medicineDosageFormName;
              this.detail.meterUint = storgeDetail.meterUnit;
              this.detail.meterUintName = storgeDetail.meterUnitName;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
	  
	  // 返回【药剂管理列表】界面
	  gobackTo(){
		var vm = this;
		this.$router.push({
            name: vm.postData.originalPageName,
            query: {
              medicineId:vm.postData.medicineId,
              medicineName:vm.postData.medicineName,
              pageNo:vm.postData.pageNo,
			  originalPageName:vm.postData.originalPageName
            }
         });  
	  }
	  
    },
    mounted() {
      if (this.$route.query.id) {
        this.getMedicine(this.$route.query.id);
      } else if (this.$route.query.medicineUseApplyId) {
        this.getDetail(this.$route.query.medicineUseApplyId);
      }
    }
  };
</script>

<style scoped>

</style>
