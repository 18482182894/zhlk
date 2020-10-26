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
                充氮降氧单号：
                <input type="text" class="input-text" placeholder="点击选择" readonly
                       v-model="detail.cdjyJobId" @click="isShowNitrogenAndOxygenPopup=true">
              </span>
              <span>
                仓房：
                <input type="text" class="input-text" readonly v-model="detail.storehouseName">
              </span>
              <span>
                廒间：
                <input type="text" class="input-text" readonly v-model="detail.warehouseName">
              </span>
              <span>
                操作日期：
                <input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})"
                       id="operateDate">
              </span>
              <br>
              <span style="width: 100%">
                准备工作要点：
                <textarea class="edit-textarea" v-model="detail.prepareJobMainpoint"></textarea>
              </span>
              <br>
              <span style="width: 100%">
                散气作业方案：
                <textarea class="edit-textarea" v-model="detail.divergenceGasJobProgramme"></textarea>
              </span>
              <br>
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
        <button class="edit-back" @click="detailBack();">返回</button>
      </div>
    </div>
    <SelectTablePopup
      v-if="isShowNitrogenAndOxygenPopup"
      title="请选择充氮降氧作业"
      list-key="dataList"
      :search-data="{auditState: '99'}"
      :api="fetchNitrogenAndOxygenList"
      @hide="isShowNitrogenAndOxygenPopup=false">
      <template slot-scope="scope">
        <table class="customTable">
          <thead>
          <tr>
            <th style="width:5%;">序号</th>
            <th style="width:7.5%;">仓房</th>
            <th style="width:7.5%;">廒间</th>
            <th style="width:7.5%;">降氧目的</th>
            <th style="width:7.5%;">充气方式</th>
            <th style="width:10%;">操作时间</th>
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
            <td v-text="item.cdjyPurpose"></td>
            <td v-text="item.inflationMethod"></td>
            <td v-text="item.operateDate"></td>
            <td v-text="draftStatusMap[item.draftStatus]"></td>
            <td v-text="auditStateMap[item.auditState]"></td>
            <td>
              <div class="table-btn btn-green" @click="selectNitrogenAndOxygen(item)">选择</div>
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
  import {fetchNitrogenAndOxygenList, fetchExhaustingQi, addExhaustingQi, editExhaustingQi} from "@/api/intelligentWarehous/atmosphere";

  export default {
    name: "exhaustingQiEdit",
    components: {
      SelectTablePopup,
    },
    data() {
      return {
        isShowNitrogenAndOxygenPopup: false,
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
          cdjyJobId: '',
          warehouseGbCode: '',
          operateDate: '',
          prepareJobMainpoint: '',
          divergenceGasJobProgramme: '',
          operateStep: '',
        },
        postData:{
          storehouseGbCode:this.$route.query.storehouseGbCode,
          warehouseGbCode:this.$route.query.warehouseGbCode,
          pageNo:this.$route.query.pageNo
        }
      }
    },
    methods: {
      fetchNitrogenAndOxygenList,
      getDetail(kichoDivergenceGasJobId) {
        layer.load(2);
        fetchExhaustingQi({kichoDivergenceGasJobId})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              this.detail = ret.data.kichoDivergenceGasJob;
              document.getElementById('operateDate').value = this.detail.operateDate.slice(0, 10);
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
        if (!this.detail.cdjyJobId) return layer.msg("请选择粮情分析记录");
        if (!this.detail.operateDate) return layer.msg("请选择操作日期");
        if (!this.detail.prepareJobMainpoint) return layer.msg("请填写准备工作要点");
        if (!this.detail.divergenceGasJobProgramme) return layer.msg("请填写散气作业方案");
        if (!this.detail.operateStep) return layer.msg("请填写操作步骤");
        const api = this.detail.kichoDivergenceGasJobId ? editExhaustingQi : addExhaustingQi;
        layer.load(2);
        api(this.detail)
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("保存成功！");
              this.detailBack();
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      selectNitrogenAndOxygen(item) {
        this.detail.cdjyJobId = item.cdjyJobId;
        this.detail.storehouseGbCode = item.storehouseGbCode;
        this.detail.storehouseName = item.storehouseName;
        this.detail.warehouseGbCode = item.warehouseGbCode;
        this.detail.warehouseName = item.warehouseName;
        this.isShowNitrogenAndOxygenPopup = false;
      },
      detailBack: function () {
        this.$router.push({
          name: "exhaustingQi",
          query: {
            storehouseGbCode:this.postData.storehouseGbCode,
            warehouseGbCode:this.postData.warehouseGbCode,
            pageNo:this.postData.pageNo
          }
        });
      }
    },
    mounted() {
      if (this.$route.query.id) {
        this.getDetail(this.$route.query.id);
      }
    }
  }
</script>
