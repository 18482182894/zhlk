<template>
  <div class="content">
    <div class="videoRetrieval">
      <div>

      </div>
      <div class="lookup">
        仓房：
        <select class="select-style excision" v-model="postData.storehouseGbCode">
          <option value="">请选择</option>
          <option
            v-for="item in storehouseList"
            :key="item.storehouseGbCode"
            :value="item.storehouseGbCode"
            v-text="item.storehouseName"/>
        </select>
        廒间：
        <select class="select-style excision" v-model="postData.warehouseGbCode">
          <option value="">请选择</option>
          <option
            v-for="item in granaryList"
            :key="item.warehouseGbCode"
            :value="item.warehouseGbCode"
            v-text="item.warehouseName"/>
        </select>
        质检类型：
        <select class="select-style excision" v-model="postData.testType">
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
        粮食品种：
        <div class="grainVariety excision">
          <treeselect v-model="postData.grainKind" :multiple="false" :options="grainVarietyList" placeholder="请选择粮食品种"/>
        </div>
        <div class="btn btn-add" @click="getList(1)">
          <img src="../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div>
        <div class="btn btn-add" @click="jumpAdd">
          <img src="../../../../static/images/add.png" alt="">
          <label>新增</label>
        </div>
        <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value="">排序方式</option>
          <option value="0">顺序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
        <tr>
          <th style="width:2.5%;"><input type="checkbox"></th>
          <th style="width:2.5%;">序号</th>
          <th style="width:7.5%;">仓房</th>
          <th style="width:7.5%;">廒间</th>
          <th style="width:7.5%;">质检类型</th>
          <th style="width:7.5%;">粮食品种</th>
          <th style="width:7.5%;">粮食等级</th>
          <th style="width:10%;">申请时间</th>
          <th style="width:7.5%;">编辑状态</th>
          <th style="width:7.5%;">审核状态</th>
          <th style="width:30%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox"/></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td v-text="item.storehouseName"></td>
          <td v-text="item.warehouseName"></td>
          <td v-if="item.testType == '01' ">{{ '入仓验收' }}</td>
          <td v-if="item.testType == '02' ">{{ '出仓检验' }}</td>
          <td v-if="item.testType == '03' ">{{ '3月末普检' }}</td>
          <td v-if="item.testType == '04' ">{{ '9月末普检' }}</td>
          <td v-if="item.testType == '05' ">{{ '入仓初检' }}</td>
          <td v-if="item.testType == '06' ">{{ '月度检查' }}</td>
          <td v-if="item.testType == '07' ">{{ '3月末库内普查' }}</td>
          <td v-if="item.testType == '08' ">{{ '9月末库内普查' }}</td>
          <td v-text="item.grainKind"></td>
          <td v-text="item.grainLevel"></td>
          <td v-text="item.testDate"></td>
          <td v-text="draftStatusMap[item.draftStatus]"></td>
          <td v-text="auditStateMap[item.auditState]"></td>
          <td>
            <div class="table-btn btn-yellow"
                 @click="jumpDetail(item)">详情
            </div>
            <div class="table-btn btn-submit"
                 @click="submitAudit(item.applyRecordId)" v-if="item.draftStatus==0">提交审核
            </div>
            <div class="table-btn btn-green"
                 @click="jumpEdit(item.applyRecordId)" v-if="item.draftStatus==0">编辑
            </div>
            <div class="table-btn btn-red"
                 @click="delData(item.applyRecordId)" v-if="item.draftStatus==0">删除
            </div>
            <div class="table-btn btn-again"
                 @click="submitAudit(item.applyRecordId)" v-if="item.auditState==0">再次申请
            </div>
            <div class="table-btn btn-again"
                 @click="jumpManagement(item)" v-if="item.auditState==99">质检信息
            </div>
            <div class="table-btn btn-again"
                 @click="jumpLedger(item)" v-if="item.auditState==99 && item.qualityBillId">质检台账
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar"></div>
    </div>
  </div>
</template>
<style type="text/css" scoped>
  .IOTType-popup {
    width: 600px;
    height: 400px;
  }

  .popup-content p input {
    width: 420px;
  }

  .popup-content .text-justify label {
    display: inline-block;
    vertical-align: middle;
    font-size: .875rem;
    text-align: center;
    text-align-last: initial;
  }

  .text-justify div {
    display: inline-block;
    width: 440px;
  }

  .text-justify div .select-style {
    width: 90px;
  }
</style>
<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import {fetchQualityTestList, removeQualityTest, verifyQualityTest} from "@/api/intelligentWarehous/qualityTest";
  import {storehouse, granary, grainVariety} from "@/api/systemManage/dropDown";

  export default {
    name: "document",
    components: {
      Treeselect
    },
    data() {
      return {
        sortOrder: "0", //0 顺序，1 倒序
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
        postData: {
          storehouseGbCode: this.$route.query.storehouseGbCode,
          warehouseGbCode: this.$route.query.warehouseGbCode,
          testType: this.$route.query.testType,
          grainKind: this.$route.query.grainKind,
          pageSize: 10,
          pageNo: this.$route.query.pageNo!=null?this.$route.query.pageNo:1,
          originalPageName:this.$route.query.originalPageName!=null?this.$route.query.originalPageName:'qualityTesting',
        },
        listData: [],
        storehouseList: [],//仓房下拉列表
        granaryList: [],//廒间下拉列表
        //testTypeList: ['封仓质检', '在库保管化验', '满仓鉴定', '春季普检', '秋季普检', '出仓检验', '日常质检', '定期质检'],
        //i:'01',
        grainVarietyList: [],
      };
    },
    methods: {
      changeSortOrder: function () {//倒序
        var vm = this;
        vm.listData.reverse();
      },
      getList(pageNo) {//获取列表
        var vm = this;
        vm.postData.pageNo = pageNo;
        layer.load(2);
        fetchQualityTestList(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.listData = ret.data.dataList;
              for(var i in vm.listData) {
                const time = vm.listData[i].testDate.slice(0,10)
                vm.listData[i].testDate = time
              }
              laypage({
                //分页
                cont: "PageBar", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                pages: ret.page.totalPages, //通过后台拿到的总页数
                curr: pageNo,
                skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                jump: function (obj, first) {
                  //触发分页后的回调
                  if (!first) {
                    //一定要加此判断，否则初始时会无限刷新
                    vm.getList(obj.curr);
                  }
                }
              });
            } else {
              if (ret.code == "500" && ret.data == "查询错误，没有数据") {
                layer.msg("暂无数据");
                vm.listData = [];
              } else {
                layer.alert(ret.data, {closeBtn: 0});
              }
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      jumpAdd() {
        this.$router.push({
          name: 'qualityTestingApply',
          query: {
            storehouseGbCode: this.postData.storehouseGbCode,
            warehouseGbCode: this.postData.warehouseGbCode,
            testType: this.postData.testType,
            grainKind: this.postData.grainKind,
            pageNo: this.postData.pageNo,
            originalPageName:this.postData.originalPageName
          }});
      },
      jumpEdit (id) {
        this.$router.push({
          name: "qualityTestingApply",
          query: {
            id:id,
            storehouseGbCode: this.postData.storehouseGbCode,
            warehouseGbCode: this.postData.warehouseGbCode,
            testType: this.postData.testType,
            grainKind: this.postData.grainKind,
            pageNo: this.postData.pageNo,
            originalPageName:this.postData.originalPageName
          }});
      },
      jumpLedger ({applyRecordId, qualityBillId, grainKind}) {
        this.$router.push({
          name: "qualityTestingLedgerEdit",
          query: {
            applyRecordId: applyRecordId,
            qualityBillId:qualityBillId,
            grainKind:grainKind,
            storehouseGbCode: this.postData.storehouseGbCode,
            warehouseGbCode: this.postData.warehouseGbCode,
            testType: this.postData.testType,
            grainKind: this.postData.grainKind,
            pageNo: this.postData.pageNo,
            originalPageName:this.postData.originalPageName
          }});
      },
      jumpManagement ({applyRecordId, grainKind, grainLevel, qualityBillId}) {
        if (qualityBillId) { // 质检单id存在进入详情界面不存在进入新增界面
          this.$router.push({
            name: "managementDetail",
            query: {
              qualityBillId:qualityBillId,
              storehouseGbCode: this.postData.storehouseGbCode,
              warehouseGbCode: this.postData.warehouseGbCode,
              testType: this.postData.testType,
              grainKind: this.postData.grainKind,
              pageNo: this.postData.pageNo,
              originalPageName:this.postData.originalPageName
            }});
        } else {
          this.$router.push({
            name: "managementEdit",
            query: {
              applyRecordId:applyRecordId,
              grainKind:grainKind,
              grainLevel:grainLevel,
              storehouseGbCode: this.postData.storehouseGbCode,
              warehouseGbCode: this.postData.warehouseGbCode,
              testType: this.postData.testType,
              grainKind: this.postData.grainKind,
              pageNo: this.postData.pageNo,
              originalPageName:this.postData.originalPageName
            }});
        }
      },
      jumpDetail ({applyRecordId}) {
        this.$router.push({
          name: "qualityTestingDetail",
          query: {
            applyRecordId:applyRecordId,
            storehouseGbCode: this.postData.storehouseGbCode,
            warehouseGbCode: this.postData.warehouseGbCode,
            testType: this.postData.testType,
            grainKind: this.postData.grainKind,
            pageNo: this.postData.pageNo,
            originalPageName:this.postData.originalPageName
          }});
      },
      submitAudit(id){
        layer.load(2);
        verifyQualityTest(id)
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              this.detail = ret.data;
              layer.alert('提交成功', {closeBtn: 0});
              this.getList(this.postData.pageNo);
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch((err) => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          })
      },
      delData(id){
        layer.load(2);
        removeQualityTest(id)
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              this.detail = ret.data;
              layer.alert('删除成功', {closeBtn: 0});
              this.getList(this.postData.pageNo);
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch((err) => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          })
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
      },
      getGrainVariety() { //获取粮食品种
        grainVariety({})
          .then(ret => {//粮食品种
            if (ret.code == 200) {
              this.grainVarietyList = ret.data.grainVarietyList;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          }).catch(err => {
          layer.alert(err.message, {closeBtn: 0});
        });
      },
    },
    watch: {
      'postData.storehouseGbCode'(newCode, oldCode) { // 监听仓房变化获取廒间列表
        if (newCode && newCode !== oldCode) {
          this.granaryList = [];
          this.postData.warehouseGbCode = '';
          this.getGranary(newCode);
        }
      }
    },
    mounted() {
      this.getGrainVariety();
      this.getStorehouse();
      this.getList(this.postData.pageNo);
      if(this.postData.warehouseGbCode){
        this.getGranary(this.postData.storehouseGbCode);
      }
    }
  };

</script>
