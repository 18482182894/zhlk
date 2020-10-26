<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">药剂采购申请信息</div>
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
              <span>
                单位：
                <input type="text" class="input-text" readonly v-model="detail.meterUintName"/>
              </span>
              <span>
                规格描述：
                <input type="text" class="input-text" v-model="detail.specificationDescription"/>
              </span>
              <span>
                购买数量：
                <input type="num" class="input-text" v-model="detail.buyNum"/>
              </span>
              <span>
                生产日期：
                <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})"
                       id="productDate"/>
              </span>
              <span>
                过期日期：
                <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})"
                       id="expireDate"/>
              </span>
              <span>
                采购负责人：
                <select class="select-style excision" v-model="detail.purchaseResponsibilityPerson">
                 <option
                   v-for="item in staffListData"
                   :key="item.staff_id"
                   :value="item.staff_id"
                   v-text="item.staff_name"/>
                </select>
              </span>
              <span>
                生产许可证：
                <input type="text" class="input-text" v-model="detail.productionLicenseNo"/>
              </span>
              <span>
                粮堆最高点温度：
                <input type="num" class="input-text" v-model="detail.productFactory"/>
              </span>
              <br>
              <span style="width: 100%">
                用途：
                <textarea class="edit-textarea" v-model="detail.purpose"/>
               </span>
            </div>
          </div>
        </div>
      </div>
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">图片</div>
        </div>
        <div class="tag-box-content">
          <div class="upload-pic">
            <div id="uploadPic"></div>
            <img :src="fileUrl || '../../../../../static/images/upload-pic.png'" alt=""/>
            <!--<label class="fc-red">只支持.jpg格式</label>-->
          </div>
        </div>
      </div>
      <div class="edit-btn">
        <button class="edit-submit" @click="submitEvent()">提交</button>
        <button class="edit-back" @click="gobackTo()">返回</button>
      </div>
    </div>
		<div class="copyright">
			<p>Copyright © 四川百威智联科技有限公司 © 版权所有 电话：028-62631082</p>
		</div>
  </div>
</template>

<script>
  import {fetchMedicineDetail, addPurchase, editPurchase, fetchPurchase} from "@/api/intelligentWarehous/pharmacy";
  import {staffList} from "@/api/systemManage/staff";
  import {uploadPic} from "@/utils/public";
  
  
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
          specificationDescription: '',
          buyNum: '',
          productDate: '',
          expireDate: '',
          purchaseResponsibilityPerson: '',
          productionLicenseNo: '',
          productFactory: '',
          purpose: '',
          imageFile: '',
        },
		// postData:该数据结构用于存储从【药剂管理列表界面】传递来的查询条件参数
		postData:{
		  medicineId:this.$route.query.medicineId,
          medicineName:this.$route.query.medicineName,
          pageNo:this.$route.query.pageNo!=null?this.$route.query.pageNo:0,
		  originalPageName:this.$route.query.originalPageName
		},
		
        fileUrl: '',
        staffListData: [],
      };
    },
    methods: {
      getDetail(purchaseApplyId) {
        layer.load(2);
        fetchPurchase({purchaseApplyId})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              this.detail = ret.data.purchaseApplyDetail;
              const {imageFilePath} = this.detail;
              this.detail.medicineDosageFormName = this.$route.query.medicineDosageFormValue;
              this.detail.meterUintName = this.$route.query.meterUintValue;
              if (imageFilePath) {
                this.detail.imageFile = imageFilePath.slice(imageFilePath.lastIndexOf('/') + 1);
                this.fileUrl = imageFilePath;
              }
              document.getElementById('productDate').value = this.detail.productDate.slice(0, 10);
              document.getElementById('expireDate').value = this.detail.expireDate.slice(0, 10);
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
        this.detail.productDate = document.getElementById('productDate').value;
        this.detail.expireDate = document.getElementById('expireDate').value;
        if (!this.detail.medicineId) return layer.msg("请选择药剂");
        if (!this.detail.meterUint) return layer.msg("请选择单位");
        if (!this.detail.specificationDescription) return layer.msg("请填写规格描述");
        if (!this.detail.buyNum) return layer.msg("请填写购买数量");
        if (!this.detail.productDate) return layer.msg("请选择生产日期");
        if (!this.detail.expireDate) return layer.msg("请选择过期日期");
        if (!this.detail.purchaseResponsibilityPerson) return layer.msg("请选择采购负责人");
        if (!this.detail.productionLicenseNo) return layer.msg("请填写生产许可证");
        if (!this.detail.productFactory) return layer.msg("请填写粮堆最高点温度生产厂家");
        if (!this.detail.purpose) return layer.msg("请填写用途");
        const api = this.detail.purchaseApplyId ? editPurchase : addPurchase;
        layer.load(2);
        api(this.detail)
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("保存成功！");
              //this.$router.replace({name: 'purchaseList'});
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
      initUpload() {
        uploadPic("uploadPic", (ret) => {
          if (ret.code == 200) {
            this.detail.imageFile = ret.data.fileName;
            this.fileUrl = ret.data.fileUrl;
          } else {
            layer.alert("上传文件出错", {closeBtn: 0});
          }
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
      this.getStaff();
      this.initUpload();
      if (this.$route.query.id) {
        this.getMedicine(this.$route.query.id);
      } else if (this.$route.query.purchaseApplyId) {
        this.getDetail(this.$route.query.purchaseApplyId);
      }
    }
  };
</script>

<style scoped>

</style>
