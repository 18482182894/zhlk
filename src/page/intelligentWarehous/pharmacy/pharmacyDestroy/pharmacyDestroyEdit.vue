<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">药剂销毁信息</div>
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
              </span>
              <br/>
              <span>
                销毁数量：
                <input type="text" class="input-text" v-model="detail.destroyNum"/>
              </span>
              <span>
                销毁日期：
                <input type="text" class="input-text Wdate"
                       onclick="WdatePicker({maxDate:'%y-%M-%d',dateFmt:'yyyy-MM-dd',})" id="destroyDate"/>
              </span>
              <span>
                销毁人：
                <select class="select-style excision" v-model="detail.destroyPersonId">
                 <option
                   v-for="item in staffListData"
                   :key="item.staff_id"
                   :value="item.staff_id"
                   v-text="item.staff_name"/>
                </select>
              </span>
              <span>
                见证人：
                <select class="select-style excision" v-model="detail.witnessPersonId">
                 <option
                   v-for="item in staffListData"
                   :key="item.staff_id"
                   :value="item.staff_id"
                   v-text="item.staff_name"/>
                </select>
              </span>
              <span style="width: 100%">
                销毁地点：
                <textarea class="edit-textarea" v-model="detail.destroyAddress"/>
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
  import {addDestroy, fetchMedicineDetail} from "@/api/intelligentWarehous/pharmacy";
  import {staffList} from "@/api/systemManage/staff";

  export default {
    name: "pharmacyDestroyEdit",
    data() {
      return {
        detail: {
          medicineId: '',
          medicineName: '',
          medicineDosageFormId: '',
          medicineDosageFormName: '',
          destroyNum: '',
          destroyDate: '',
          destroyPersonId: '',
          witnessPersonId: '',
          destroyAddress: '',
        },
		
		// 该数据结构用于存储从【药剂管理列表界面】传递来的查询条件参数
		postData:{
		  medicineId:this.$route.query.medicineId,
          medicineName:this.$route.query.medicineName,
          pageNo:this.$route.query.pageNo!=null?this.$route.query.pageNo:0
		},
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
      getMedicine(id) {
        layer.load(2);
        fetchMedicineDetail({id})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              const {storgeDetail} = ret.data;
              this.detail.medicineId = storgeDetail.medicineId;
              this.detail.medicineName = storgeDetail.medicineName;
              this.detail.medicineDosageFormId = storgeDetail.medicineDosageForm;
              this.detail.medicineDosageFormName = storgeDetail.medicineDosageFormName;
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
        this.detail.destroyDate = document.getElementById('destroyDate').value;
        if (!this.detail.medicineId) return layer.msg("请选择药剂");
        if (!this.detail.destroyNum) return layer.msg("请填写销毁数量");
        if (!this.detail.destroyDate) return layer.msg("请选择销毁日期");
        if (!this.detail.destroyPersonId) return layer.msg("请选择销毁人");
        if (!this.detail.witnessPersonId) return layer.msg("请选择见证人");
        if (!this.detail.destroyAddress) return layer.msg("请选择销毁地点");
        layer.load(2);
        addDestroy(this.detail)
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("保存成功！");
              this.$router.replace({name: 'pharmacyDestroyList'});
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
            name: "pharmacyMent",
            query: {
              medicineId:vm.postData.medicineId,
              medicineName:vm.postData.medicineName,
              pageNo:vm.postData.pageNo
            }
         });  
	  }  
	  
    },
    mounted() {
      this.getStaff();
      this.getMedicine(this.$route.query.id);
    }
  };
</script>

<style scoped>

</style>
