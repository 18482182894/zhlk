<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">药剂归还编辑</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
                领用申请编码：
                <input type="text" class="input-text" readonly v-model="detail.medicineUseApplyId"/>
              </span>
              <span>
                药品名称：
                <input type="text" class="input-text" readonly v-model="detail.medicineName"/>
              </span>
              <span>
                药剂类型：
                <input type="text" class="input-text" readonly v-model="detail.medicineDosageFormName"/>
              </span>
              <span>
                出库单号：
                <input type="text" class="input-text" readonly v-model="detail.medicineExportRecordId"/>
              </span>
              <span>
                归还数量：
                <input type="num" class="input-text" v-model="detail.giveBackNum"/>
              </span>
              <span>
                空瓶处理数量：
                <input type="num" class="input-text" v-model="detail.emptyBottle">
              </span>
              <span>
                归还人：
                <select class="select-style excision" v-model="detail.giveBackPersonId">
                 <option
                   v-for="item in staffListData"
                   :key="item.staff_id"
                   :value="item.staff_id"
                   v-text="item.staff_name"/>
                </select>
              </span>
              <span>
                归还日期：
                <input type="text" class="input-text Wdate"
                       onclick="WdatePicker({maxDate:'%y-%M-%d', dateFmt:'yyyy-MM-dd HH:mm:ss'})"
                       id="giveBackDatetime"/>
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
  import {fetchExport, addGiveBack} from "@/api/intelligentWarehous/pharmacy";
  import {staffList} from "@/api/systemManage/staff";

  export default {
    name: "pharmacyReturnEdit",
    data() {
      return {
        detail: {
          medicineId: '',
          medicineName: '',
          medicineDosageForm: '',
          medicineDosageFormName: '',
          medicineUseApplyId: '',
          medicineExportRecordId: '',
          giveBackNum: '',
          emptyBottle: '',
          giveBackPersonId: '',
          giveBackDatetime: '',
        },
		postData:{
			medicineId:this.$route.query.medicineId,
            medicineName:this.$route.query.medicineName,
            pageNo:this.$route.query.pageNo!=null?this.$route.query.pageNo:1
		},
        staffListData: [],
      };
    },
    methods: {
      getExport(medicineExportRecordId) {
        var vm = this;
        layer.load(2);
        fetchExport({medicineExportRecordId})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              const {dataMap} = ret.data;
              this.detail.medicineUseApplyId = dataMap.medicineUseApplyId;
              this.detail.medicineExportRecordId = dataMap.medicineExportRecordId;
              this.detail.medicineId = dataMap.medicineId;
              this.detail.medicineName = dataMap.medicineName;
              this.detail.medicineDosageForm = dataMap.medicineDosageForm;
              this.detail.medicineDosageFormName = Vue.filter('medicineDosageFormFormat')(dataMap.medicineDosageForm);
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
        this.detail.giveBackDatetime = document.getElementById('giveBackDatetime').value;
        if (!this.detail.giveBackNum) return layer.msg("请填写归还数量");
        if (!this.detail.emptyBottle) return layer.msg("请填写空瓶处理数量");
        if (!this.detail.giveBackPersonId) return layer.msg("请选择归还人");
        if (!this.detail.giveBackDatetime) return layer.msg("请选择归还日期");
        layer.load(2);
        addGiveBack(this.detail)
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
      this.getStaff();
      this.getExport(this.$route.query.id);
    }
  };
</script>

<style scoped>

</style>
