<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">基础信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
                仓库:
                <select class="select-style excision" v-model="detail.storehouseGbCode">
                  <option
                    v-for="item in storehouseList"
                    :key="item.storehouseGbCode"
                    :value="item.storehouseGbCode"
                    v-text="item.storehouseName"/>
                </select>
              </span>
              <span>
                廒间：
                <select class="select-style excision" v-model="detail.warehouseGbCode">
                  <option
                    v-for="item in granaryList"
                    :key="item.warehouseGbCode"
                    :value="item.warehouseGbCode"
                    v-text="item.warehouseName"/>
                </select>
              </span>
              <span>
                检验类型：
                <select class="select-style excision" v-model="detail.testType">
                  <option value="">请选择</option>
                  <option value="01">入仓验收</option>
                  <option value="02">出仓检验</option>
                  <option value="03">3月末普检</option>
                  <option value="04">9月末普检</option>
                  <option value="05">入仓初检</option>
                  <option value="06">月度检查</option>
                  <option value="07">3月末库内普查</option>
                  <option value="08">9月末库内普查</option>
                </select>
              </span>
              <span>
                检验人：
                <input type="text" class="input-text" v-model="detail.testPerson">
              </span>
              <span>
                检验时间：
                <input type="text" class="input-text Wdate"
                       onclick="WdatePicker({dateFmt: 'yyyy-MM-dd HH:mm:ss',maxDate:'%y-%M-%d'})" id="testDate"/>
              </span>
              <span style="width: 100%">
                备注：
                <textarea class="edit-textarea" v-model="detail.memo"></textarea>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="edit-btn">
        <button class="edit-submit" @click="submitEvent();">提交</button>
        <button class="edit-back" @click="editBack();">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {addQualityTest, editQualityTest, fetchQualityTest} from "@/api/intelligentWarehous/qualityTest";
  import {granary, storehouse} from "@/api/systemManage/dropDown";

  export default {
    name: "qualityTesting",
    data() {
      return {
        detail: {
          applyRecordId: '',
          storehouseGbCode: '',
          warehouseGbCode: '',
          storehouseName: '',
          warehouseName: '',
          testType: '',
          testPerson: '',
          testDate: '',
          memo: '',
        },
        postData:{
          storehouseGbCode: this.$route.query.storehouseGbCode,
          warehouseGbCode: this.$route.query.warehouseGbCode,
          testType: this.$route.query.testType,
          grainKind: this.$route.query.grainKind,
          pageSize: 10,
          pageNo: this.$route.query.pageNo!=null?this.$route.query.pageNo:1,
          originalPageName:this.$route.query.originalPageName!=null?this.$route.query.originalPageName:'qualityTesting',
        },
        storehouseList: [],//仓房下拉列表
        granaryList: [],//廒间下拉列表
        //testTypeList: ['封仓质检', '在库保管化验', '满仓鉴定', '春季普检', '秋季普检', '出仓检验', '日常质检', '定期质检'],
      };
    },
    methods: {
      getDetail(id) {
        layer.load(2);
        fetchQualityTest(id)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              this.detail = ret.data.dataMap;
              document.getElementById('testDate').value = this.detail.testDate;
              this.storehouseGbCodeChangeByDetail = true;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      submitEvent: function () {
        this.detail.testDate = document.getElementById('testDate').value;
        if (!this.detail.storehouseGbCode) return layer.msg("请选择仓房");
        if (!this.detail.warehouseGbCode) return layer.msg("请选择仓廒");
        if (!this.detail.testType) return layer.msg("请选择检验类型");
        if (!this.detail.testPerson) return layer.msg("请填写检验人");
        if (!this.detail.testDate) return layer.msg("请填写检验时间");
        if (!this.detail.memo) return layer.msg("请填写备注");
        this.detail.storehouseName = this.storehouseList.find(storehouse => this.detail.storehouseGbCode === storehouse.storehouseGbCode).storehouseName;
        this.detail.warehouseName = this.granaryList.find(granary => this.detail.warehouseGbCode === granary.warehouseGbCode).warehouseName;
        const api = this.detail.applyRecordId ? editQualityTest : addQualityTest;
        layer.load(2);
        api(this.detail)
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("保存成功！");
              this.editBack();
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });

      },
      editBack() {
        this.$router.push({
          name: "qualityTesting",
          query: {
            storehouseGbCode: this.postData.storehouseGbCode,
            warehouseGbCode: this.postData.warehouseGbCode,
            testType: this.postData.testType,
            grainKind: this.postData.grainKind,
            pageNo: this.postData.pageNo,
            originalPageName:this.postData.originalPageName
          }
        });
      },
      getStorehouse() { // 获取仓房列表
        storehouse('')
          .then((ret) => {
            if (ret.code == 200) {
              this.storehouseList = ret.data.dataList;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getGranary(code) { // 获取廒间列表
        granary(code)
          .then((ret) => {
            if (ret.code == 200) {
              this.granaryList = ret.data.dataList;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      }

    },
    watch: {
      'detail.storehouseGbCode'(newCode, oldCode) { // 监听仓房变化获取廒间列表
        if (newCode && newCode !== oldCode) {
          if (!this.storehouseGbCodeChangeByDetail) {
            this.detail.warehouseGbCode = '';
          }
          this.storehouseGbCodeChangeByDetail = false;
          this.granaryList = [];
          this.getGranary(newCode);
        }
      }
    },
    mounted() {
      this.getStorehouse();
      if (this.$route.query.id) {
        this.getDetail(this.$route.query.id);
      }
    }
  };
</script>
