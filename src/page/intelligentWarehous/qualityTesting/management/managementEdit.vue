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
                质检单ID：
                <input type="text" class="input-text" readonly v-model="qualityTest.applyRecordId">
              </span>
              <span>
                仓房：
                <input type="text" class="input-text" readonly v-model="qualityTest.storehouseName">
              </span>
              <span>
                廒间：
                <input type="text" class="input-text" readonly v-model="qualityTest.warehouseName">
              </span>
              <span>
                货位：
                <select class="select-style excision" v-model="detail.cargoPosition">
                  <option
                    v-for="item in cargoList"
                    :key="item.cargoPosition"
                    :value="item.cargoPosition"
                    v-text="item.cargoName"/>
                </select>
              </span>
              <!--<span>
                对应保管帐ID：
                <input type="number" class="input-text" v-model="submitData.grainNumber">
              </span>-->
              <span>
                检验类型：
                <input type="text" class="input-text" readonly v-model="qualityTest.testType">
              </span>
              <span>
                粮食品种：
                <input type="text" class="input-text" readonly v-model="qualityTest.grainKind">
              </span>
              <span>
                粮食等级：
                <input type="text" class="input-text" readonly v-model="qualityTest.grainLevel">
              </span>
              <!--<span>
                收获年度：
                <input type="number" class="input-text" v-model="qualityTest.grainNumber">
              </span>-->
              <!-- <span>
                 样品编码：
                 <input type="number" class="input-text" v-model="qualityTest.grainNumber">
               </span>-->
              <span>
                样品数量：
                <input type="number" class="input-text" v-model="detail.sampleNum">
              </span>
              <span>
                扦样人：
                <select class="select-style excision" v-model="detail.samplePersonId">
                  <option
                    v-for="item in staffListData"
                    :key="item.staff_id"
                    :value="item.staff_id"
                    v-text="item.staff_name"/>
                </select>
              </span>
              <span>
                检验单位：
                <input type="text" class="input-text" v-model="detail.sampleTestCompany">
              </span>
              <span>
                扦样时间：
                <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss', maxDate:'%y-%M-%d'})"
                       id="sampleDateTime">
              </span>
              <span>
                质检时间：
                <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss', maxDate:'%y-%M-%d'})"
                       id="checkDateTime">
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">第三方质检结果附件</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
                第三方质检结果附件：
                <div class="tag-box-content">
                  <div class="upload-pic">
                    <div id="uploadPic"></div>
                    <img :src="detail.fileUrl || '../../../../static/images/upload-pic.png'" alt="">
                    <!--<label class="fc-red">只支持.jpg格式</label>-->
                  </div>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">化验指标</div>
        </div>
        <div class="tag-box-content">
          <table class="customTable">
            <thead>
            <tr>
              <th>序号</th>
              <th>检验项目</th>
              <th>结果值</th>
              <th>检验结果</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,i) in storageIndexListData">
              <td v-text="i+1"></td>
              <td v-text="item.indicatorName"></td>
              <td><input type="number" class="input-text" v-model="item.testValue" @change="storageIndexChange(item)"/>
              </td>
              <td v-text="item.resultValue"></td>
              <td>
                <div class="table-btn btn-red" @click="delData(item.id, i)">删除</div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="edit-btn">
        <button class="edit-submit" @click="submitEvent();">提交</button>
        <button class="edit-back" @click="editBack();">返回</button>
      </div>
    </div>
  </div>
</template>

<style type="text/css" scoped>
  .tag-box .edit-btn {
    margin-top: 15px;
  }
</style>
<script>
  import {addApplyRecord, fetchQualityTest} from "@/api/intelligentWarehous/qualityTest";
  import {staffList} from "@/api/systemManage/staff";
  import {cargo} from "@/api/systemManage/dropDown";
  import {storageIndexList, storageIndexCheck, storageIndexDel} from "@/api/systemManage/basicData/testSetup";
  import {uploadPic} from "@/utils/public";
  import { grainDetail } from "@/api/systemManage/basicData/grainVarieties";
  export default {
    name: "warehouseEdit",
    data() {
      return {
        qualityTest: {},
        detail: {
          applyRecordId: '',
          cargoPosition: '',
          sampleNum: '',
          samplePersonId: '',
          sampleTestCompany: '',
          sampleDateTime: '',
          checkDateTime: '',
          threePartyAttachment: '',
          fileUrl: '',
          grainKind: ''
        },
        cargoList: [], // 货位列表
        staffListData: [], // 职员列表
        storageIndexListData: [], // 化验指标列表
      }
    },
    methods: {
      getQualityTestDetail(id) {
        layer.load(2);
        fetchQualityTest(id)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              this.qualityTest = ret.data.dataMap;
              this.getCargo(this.qualityTest.warehouseGbCode);
              this.getStorageIndex(this.qualityTest.grainKind);
              this.qualityTest.grainLevel = this.$route.query.grainLevel; 
              // this.qualityTest.grainKind = this.$route.query.grainKind;
              this.detail.grainKind = this.qualityTest.grainKind
              grainDetail({ grainVarietyId: ret.data.dataMap.grainKind })
                .then(ret => {
                  if (ret.code == 200) {
                    this.qualityTest.grainKind = ret.data.grainVariety.grainVarietyName;
                  } else {
                    layer.alert(err.message, { closeBtn: 0 });
                  }
                })
                .catch(err => {
                  layer.alert(err.message, { closeBtn: 0 });
                });
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      delData(id, index) {
        layer.load(2);
        storageIndexDel({storageIndicatorList: id})
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.alert('删除成功', {closeBtn: 0});
              this.storageIndexListData.splice(index, 1);
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch((err) => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          })
      },
      submitEvent() {
        this.detail.sampleDateTime = document.getElementById('sampleDateTime').value;
        this.detail.checkDateTime = document.getElementById('checkDateTime').value;
        if (!this.detail.cargoPosition) return layer.msg("请选择货位");
        if (!this.detail.sampleNum) return layer.msg("请填写样品数量");
        if (!this.detail.samplePersonId) return layer.msg("请选择扦样人");
        if (!this.detail.sampleTestCompany) return layer.msg("请填写检验单位");
        if (!this.detail.sampleDateTime) return layer.msg("请填写扦样时间");
        if (!this.detail.checkDateTime) return layer.msg("请填写质检时间");
        if (!this.detail.threePartyAttachment) return layer.msg("请上传附件");
        for (let i = 0; i < this.storageIndexListData.length; i++) {
          if (!this.storageIndexListData[i].testValue) {
            return layer.msg(`请填写检验项目【${this.storageIndexListData[i].indicatorName}】的结果值`);
          }
        }
        layer.load(2);
        addApplyRecord({
          applyRecordId: this.qualityTest.applyRecordId,
          cargoPosition: this.detail.cargoPosition,
          sampleNum: this.detail.sampleNum,
          samplePersonId: this.detail.samplePersonId,
          sampleTestCompany: this.detail.sampleTestCompany,
          sampleDateTime: this.detail.sampleDateTime,
          checkDateTime: this.detail.checkDateTime,
          threePartyAttachment: this.detail.threePartyAttachment,
          grainKind: this.detail.grainKind,
          storagableResultList: JSON.stringify(this.storageIndexListData.map(s => ({qualityItemId: s.id, resultValue: s.testValue}))),
        })
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("添加成功！");
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
      editBack:function () {
        this.$router.push({
          // name: this.postData.originalName,
          name: "qualityTesting",
          // query: {postData:this.$route.query.postData}
        })
      },
      initUpload() {
        uploadPic("uploadPic", (ret) => {
          if (ret.code == 200) {
            this.detail.threePartyAttachment = ret.data.fileName;
            this.detail.fileUrl = ret.data.fileUrl;
          } else {
            layer.alert("上传文件出错", {closeBtn: 0});
          }
        });
      },
      getStorageIndex(grainVarietyId) {
        storageIndexList({grainVarietyId, pageNo: 1, pageSize: 1000})
          .then(ret => {
            if (ret.code == 200) {
              this.storageIndexListData = ret.data.dataList.map(s => ({...s, testValue: '', resultValue: ''}));
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          }).catch(err => {
          layer.alert(err.message, {closeBtn: 0});
        });
      },
      storageIndexChange(item) {
        layer.load(2);
        storageIndexCheck({id: item.id, testValue: item.testValue})
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              item.resultValue = ret.data.result;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getCargo(warehouseGbCode) {
        cargo(warehouseGbCode)
          .then(ret => {
            if (ret.code == 200) {
              this.cargoList = ret.data.cargoList;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          }).catch(err => {
          layer.alert(err.message, {closeBtn: 0});
        });
      },
      getStaff() {
        staffList({pageNo: 1, pageSize: 1000})
          .then(ret => {
            if (ret.code == 200) {
              this.staffListData = ret.data.staffList;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          }).catch(err => {
          layer.alert(err.message, {closeBtn: 0});
        });
      },
    },
    mounted() {
      this.getStaff();
      this.initUpload();
      if (this.$route.query.applyRecordId) {
        this.getQualityTestDetail(this.$route.query.applyRecordId);
      }
    }
  }
</script>
