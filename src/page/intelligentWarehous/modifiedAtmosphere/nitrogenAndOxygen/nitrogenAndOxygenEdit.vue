<template>
  <div class="content">
    <div class="menuManage userManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">基础信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
                粮情分析记录：
                <input type="text" class="input-text" placeholder="点击选择" readonly
                       v-model="detail.grainInfoCheckAnalysis" @click="isShowGrainInspectionPopup=true">
              </span>
              <span>
                仓房：
                <input type="text" class="input-text" readonly v-model="detail.storehouseName">
              </span>
              <span>
                廒间：
                <input type="text" class="input-text" readonly v-model="detail.warehouseName">
              </span>
              <br>
              <span>
                降氧目的：
                <select class="select-style excision" v-model="detail.cdjyPurpose">
                  <option value="除虫">除虫</option>
                </select>
              </span>
              <span>
                充气方式：
                <input type="text" class="input-text" v-model="detail.inflationMethod">
              </span>
              <span>
                操作日期：
                <input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})"
                       id="operateDate">
              </span>
              <span style="width: 100%">
                准备工作要点：
                <textarea class="edit-textarea" v-model="detail.prepareJobMainpoint"></textarea>
              </span>
              <span style="width: 100%">
                降氧作业方案：
                <textarea class="edit-textarea" v-model="detail.cdjyJobProgramme"></textarea>
              </span>
              <span style="width: 100%">
                操作步骤：
                <textarea class="edit-textarea" v-model="detail.operateStep"></textarea>
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
    <SelectTablePopup
      v-if="isShowGrainInspectionPopup"
      title="请选择粮情检查分析"
      list-key="dataList"
      :api="fetchGrainInspectionList"
      @hide="isShowGrainInspectionPopup=false">
      <template slot-scope="scope">
        <table class="customTable">
          <thead>
          <tr>
            <th style="width:5%;">序号</th>
            <th style="width:7.5%;">仓房</th>
            <th style="width:7.5%;">廒间</th>
            <th style="width:7.5%;">粮堆最高点温度</th>
            <th style="width:7.5%;">粮堆最低点温度</th>
            <th style="width:7.5%;">整仓平均粮温</th>
            <th style="width:7.5%;">检查人员</th>
            <th style="width:7.5%;">检查时间</th>
            <th style="width:7.5%;">编辑状态</th>
            <th style="width:7.5%;">审核状态</th>
            <th style="width:10%;">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,i) in scope.list">
            <td v-text="i+1"></td>
            <td v-text="item.storehouseName"></td>
            <td v-text="item.warehouseName"></td>
            <td v-text="item.grainHeapMaxTemperature"></td>
            <td v-text="item.grainHeapMinTemperature"></td>
            <td v-text="item.wholeAvgGrainTemperature"></td>
            <td v-text="item.checkMan"></td>
            <td v-text="item.checkDatetime"></td>
            <td v-text="draftStatusMap[item.draftStatus]"></td>
            <td v-text="auditStateMap[item.auditState]"></td>
            <td>
              <div class="table-btn btn-green" @click="selectGrainInspection(item)">选择</div>
            </td>
          </tr>
          </tbody>
        </table>
      </template>
    </SelectTablePopup>
  </div>
</template>

<style type="text/css" scoped>
  .tag-box .edit-btn {
    margin-top: 15px;
  }
</style>
<script>
  import SelectTablePopup from '@/components/SelectTablePopup';
  import {fetchNitrogenAndOxygen, addNitrogenAndOxygen, editNitrogenAndOxygen} from "@/api/intelligentWarehous/atmosphere";
  import {fetchGrainInspectionList} from "@/api/intelligentWarehous/grainInspection";

  export default {
    name: "nitrogenAndOxygenEdit",
    components: {
      SelectTablePopup
    },
    data() {
      return {
        auditStateMap: {
          '-1': '尚未提交',
          '0': '审核不通过',
          '10': '未审核',
          '11': '审核中',
          '99': '审核通过'
        },
        draftStatusMap: {
          '0': '草稿',
          '1': '正式文档'
        },
        detail: {
          grainInfoCheckAnalysis: '',
          storehouseGbCode: '',
          storehouseName: '',
          warehouseGbCode: '',
          warehouseName: '',
          cdjyPurpose: '',
          inflationMethod: '',
          operateDate: '',
          prepareJobMainpoint: '',
          cdjyJobProgramme: '',
          operateStep: '',
        },
        postData:{
          storehouseGbCode:this.$route.query.storehouseGbCode,
          warehouseGbCode:this.$route.query.warehouseGbCode,
          pageNo:this.$route.query.pageNo
        },
        isShowGrainInspectionPopup: false,
      }
    },
    methods: {
      fetchGrainInspectionList,
      getDetail(cdjyJobId) {
        layer.load(2);
        fetchNitrogenAndOxygen({cdjyJobId})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              this.detail = ret.data.kichoCdjyJob;
              document.getElementById('operateDate').value = this.detail.operateDate;
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
        this.detail.operateDate = document.getElementById('operateDate').value;
        if (!this.detail.grainInfoCheckAnalysis) return layer.msg("请选择粮情分析记录");
        if (!this.detail.cdjyPurpose) return layer.msg("请填写降氧目的");
        if (!this.detail.inflationMethod) return layer.msg("请填写充气方式");
        if (!this.detail.operateDate) return layer.msg("请选择操作日期");
        if (!this.detail.prepareJobMainpoint) return layer.msg("请填写准备工作要点");
        if (!this.detail.cdjyJobProgramme) return layer.msg("请填写降氧作业方案");
        if (!this.detail.operateStep) return layer.msg("请填写操作步骤");
        const api = this.detail.cdjyJobId ? editNitrogenAndOxygen : addNitrogenAndOxygen;
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
      selectGrainInspection(item) {
        this.detail.grainInfoCheckAnalysis = item.grainCheckRecordId;
        this.detail.storehouseGbCode = item.storehouseGbCode;
        this.detail.storehouseName = item.storehouseName;
        this.detail.warehouseGbCode = item.warehouseGbCode;
        this.detail.warehouseName = item.warehouseName;
        this.isShowGrainInspectionPopup = false;
      },
      editBack: function () {
        this.$router.push({
          name: "nitrogenAndOxygen",
          query: {
            storehouseGbCode:this.postData.storehouseGbCode,
            warehouseGbCode:this.postData.warehouseGbCode,
            pageNo:this.postData.pageNo
          }
        })
      }
    },
    mounted() {
      if (this.$route.query.id) {
        this.getDetail(this.$route.query.id);
      }
    }
  }
</script>
