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
                熏蒸编号：
                <input type="text" class="input-text" placeholder="点击选择" readonly
                       v-model="detail.fumigationId" @click="isShowFumigationPopup=true">
              </span>
              <span>
                仓房：
                <input type="text" class="input-text" readonly v-model="detail.storehouseName">
              </span>
              <span>
                仓廒：
                <input type="text" class="input-text" readonly v-model="detail.warehouseName">
              </span>
              <span>
                操作日期：
                <input type="text" class="input-text Wdate"
                       onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" id="operateDatetime"/>
              </span>
              <br>
              <span style="width: 100%">
                准备工作要点：
                <textarea class="edit-textarea" v-model="detail.prepareJobMainpoint"/>
              </span>
              <br>
              <span style="width: 100%">
                散气作业方案：
                <textarea class="edit-textarea" v-model="detail.divergenceGasJobProgramme"/>
              </span>
              <br>
              <span style="width: 100%">
                操作步骤：
                <textarea class="edit-textarea" v-model="detail.operateStep"/>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="edit-btn">
        <button class="edit-submit" @click="submitEvent()">提交</button>
        <button class="edit-submit" @click="editBack">返回</button>
      </div>
    </div>
    <SelectTablePopup
      v-if="isShowFumigationPopup"
      title="请选择熏蒸单"
      list-key="fumigationRecordList"
      :search-data="{auditState: '99'}"
      :api="fetchFumigationBillList"
      @hide="isShowFumigationPopup=false">
      <template slot-scope="scope">
        <table class="customTable">
          <thead>
          <tr>
            <th style="width: 3%;">序号</th>
            <th style="width: 5%;">仓房</th>
            <th style="width: 5%;">廒间</th>
            <th style="width: 5%;">负责人</th>
            <th style="width: 5%;">药剂名称</th>
            <th style="width: 5%;">熏蒸方式</th>
            <th style="width: 5%;">申请时间</th>
            <th style="width: 5%;">编辑状态</th>
            <th style="width: 5%;">审核状态</th>
            <th style="width: 10%;">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,i) in scope.list">
            <td v-text="i+1"></td>
            <td v-text="item.storehouseName"></td>
            <td v-text="item.warehouseName"></td>
            <td v-text="item.responsiblePersonValue"></td>
            <td v-text="item.medicineName"></td>
            <td v-text="item.fumigationTypeVaule"></td>
            <td v-text="item.applyDate.slice(0,10)"></td>
            <td v-text="draftStatusMap[item.draftStatus]"></td>
            <td v-text="auditStateMap[item.auditState]"></td>
            <td>
              <div class="table-btn btn-green" @click="selectFumigation(item)">选择</div>
            </td>
          </tr>
          </tbody>
        </table>
      </template>
    </SelectTablePopup>
  </div>
</template>
<style type="text/css" scoped>
  .userManage-detail .edit-code {
    margin: 0;
  }

  span .table-btn {
    display: inline-block;
    vertical-align: bottom;
  }
</style>
<script>
  import SelectTablePopup from '@/components/SelectTablePopup';
  import {fetchFumigationBillList, fetchFumigationBill, fetchBulkGas, addBulkGas, editBulkGas} from "@/api/intelligentWarehous/fumigation";

  export default {
    name: "bulkGasEdit",
    components: {
      SelectTablePopup,
    },
    data() {
      return {
        postData:{
          storehouseGbCode:this.$route.query.storehouseGbCode,
          warehouseGbCode:this.$route.query.warehouseGbCode,
          pageNo:this.$route.query.pageNo
        },
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
          divergenceGasJobId: '',
          fumigationId: '',
          storehouseGbCode: '',
          storehouseName: '',
          warehouseGbCode: '',
          warehouseName: '',
          operateDatetime: '',
          prepareJobMainpoint: '',
          divergenceGasJobProgramme: '',
          operateStep: '',
        },
        isShowFumigationPopup: false,
      }
    },
    methods: {
      fetchFumigationBillList,
      getDetail(divergenceGasJobId) {
        layer.load(2);
        fetchBulkGas(divergenceGasJobId)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              const {divergenceGasJob, divergenceGasJobId} = ret.data;
              divergenceGasJob.divergenceGasJobId = divergenceGasJobId;
              this.detail = divergenceGasJob;
              document.getElementById('operateDatetime').value = divergenceGasJob.operateDatetime;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      editBack:function () {
        this.$router.push({
          name: "bulkGas",
          query: {
            storehouseGbCode:this.postData.storehouseGbCode,
            warehouseGbCode:this.postData.warehouseGbCode,
            pageNo:this.postData.pageNo
          }
        })
      },
      selectFumigation(item) {
        this.isShowFumigationPopup = false;
        this.detail.fumigationId = item.fumigationId;
        this.detail.storehouseGbCode = item.storehouseGbCode;
        this.detail.storehouseName = item.storehouseName;
        this.detail.warehouseGbCode = item.warehouseGbCode;
        this.detail.warehouseName = item.warehouseName;
      },
      submitEvent() {
        this.detail.operateDatetime = document.getElementById('operateDatetime').value;
        if (!this.detail.fumigationId) return layer.msg("请选择熏蒸");
        if (!this.detail.operateDatetime) return layer.msg("请选择操作时间");
        if (!this.detail.prepareJobMainpoint) return layer.msg("请填写准备工作要点");
        if (!this.detail.divergenceGasJobProgramme) return layer.msg("请填写散气作业方案");
        if (!this.detail.operateStep) return layer.msg("请填写操作步骤");
        const api = this.detail.divergenceGasJobId ? editBulkGas : addBulkGas;
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
    },
    mounted() {
      if (this.$route.query.id) {
        this.getDetail(this.$route.query.id);
      }
    }
  }
</script>
