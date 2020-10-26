<template>
  <div class="content">
    <div class="menuManage operationLog company">
      <div>
        <div class="btn btn-add" @click="getList(1)">
          <img src="../../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div class="lookup">
        仓房：
        <select class="select-style excision" v-model="postData.storehouseGbCode" @change="getGranary(postData.storehouseGbCode);">
          <option
            v-for="item in storehouseList"
            :key="item.storehouseGbCode"
            :value="item.storehouseGbCode"
            v-text="item.storehouseName"/>
        </select>
        廒间：
        <select class="select-style excision" v-model="postData.warehouseGbCode">
          <option
            v-for="item in granaryList"
            :key="item.warehouseGbCode"
            :value="item.warehouseGbCode"
            v-text="item.warehouseName"/>
        </select>
      </div>
      <div>
        <div class="btn btn-add" @click="jumpAdd()">
          <img src="../../../../../static/images/add.png" alt="">
          <label>新增</label>
        </div>
        <!-- <select name="" class="select-style">
            <option value="">显示条数</option>
        </select> -->
        <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder()">
          <option value="">排序方式</option>
          <option value="0">顺序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
        <tr>
          <th style="width: 3%;"><input type="checkbox"></th>
          <th style="width: 3%;">序号</th>
          <th style="width: 5%;">仓房</th>
          <th style="width: 5%;">廒间</th>
          <th style="width: 5%;">负责人</th>
          <th style="width: 5%;">药剂名称</th>
          <th style="width: 5%;">熏蒸方式</th>
          <th style="width: 5%;">申请时间</th>
          <th style="width: 5%;">编辑状态</th>
          <th style="width: 5%;">审核状态</th>
          <th style="width: 30%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox"/></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td v-text="item.storehouseName"></td>
          <td v-text="item.warehouseName"></td>
          <td v-text="item.responsiblePersonValue"></td>
          <td v-text="item.medicineName"></td>
          <td v-text="item.fumigationTypeVaule"></td>
          <td v-text="item.applyDate.slice(0,10)"></td>
          <td v-text="draftStatusMap[item.draftStatus]"></td>
          <td v-text="auditStateMap[item.auditState]"></td>
          <td>
            <div class="table-btn btn-yellow"
                 @click="jumpDetail(item.fumigationId)">详情
            </div>
            <div class="table-btn btn-submit"
                 @click="submitAudit(item.fumigationId)" v-if="item.draftStatus==0">提交审核
            </div>
            <div class="table-btn btn-green"
                 @click="jumpEdit(item.fumigationId)" v-if="item.draftStatus==0">编辑
            </div>
            <div class="table-btn btn-red"
                 @click="delData(item.fumigationId)" v-if="item.draftStatus==0">删除
            </div>
            <div class="table-btn btn-again"
                 @click="submitAudit(item.fumigationId)" v-if="item.auditState==0">再次申请
            </div>
            <div class="table-btn btn-change" v-if="item.auditState==99"
                 @click="jumpWorkSheet(item)">熏蒸作业单</div>
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
  .operationLog .lookup .excision {
    margin-right: 20px;
  }
</style>
<script>
  import {storehouse, granary} from "@/api/systemManage/dropDown";
  import {fetchFumigationBillList, delFumigationBill, applyFumigationBill} from "@/api/intelligentWarehous/fumigation";

  export default {
    name: "fumigationOperation",
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
          storehouseGbCode: '',
          warehouseGbCode: '',
          pageSize: 10,
          pageNo: 0,
        },
        listData: [],
        storehouseList: [],//仓房下拉列表
        granaryList: [],//廒间下拉列表
      };
    },
    methods: {
      changeSortOrder: function () {
        var vm = this;
        vm.listData.reverse();
      },
      getList(pageNo) {//获取列表
        var vm = this;
        vm.postData.pageNo = pageNo;
        layer.load(2);
        fetchFumigationBillList(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.listData = ret.data.fumigationRecordList;
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
          name: 'fumigationOperationEdit',
          query:{
            storehouseGbCode:this.postData.storehouseGbCode,
            warehouseGbCode:this.postData.warehouseGbCode,
            pageNo:this.postData.pageNo
          }
        });
      },
      jumpEdit(id) {
        this.$router.push({
          name: "fumigationOperationEdit",
          query: {
            id,
            storehouseGbCode:this.postData.storehouseGbCode,
            warehouseGbCode:this.postData.warehouseGbCode,
            pageNo:this.postData.pageNo
          }
        });
      },
      jumpDetail(id) {
        this.$router.push({
          name: "fumigationOperationDetail",
          query: {
            id,
            storehouseGbCode:this.postData.storehouseGbCode,
            warehouseGbCode:this.postData.warehouseGbCode,
            pageNo:this.postData.pageNo
          }
        });
      },
      jumpWorkSheet({storehouseGbCode, warehouseGbCode}) {
        this.$router.push({
          name: "workSheet",
          query: {storehouseGbCode, warehouseGbCode}
        });
      },
      submitAudit(fumigationId) {
        layer.load(2);
        applyFumigationBill({fumigationId})
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
      delData(fumigationId) {
        layer.confirm('确定删除？', {
          btn: ['确定', '取消'] //按钮
        }, () => {
          layer.load(2);
          delFumigationBill({fumigationId})
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
        })
      },
      getStorehouse() { // 获取仓房列表
        storehouse('')
          .then((ret) => {
            if (ret.code == 200) {
              this.storehouseList = ret.data.dataList;
              this.$nextTick(function () {
                if(this.$route.query.pageNo){
                  this.getGranary(this.postData.storehouseGbCode);
                }
              })

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
    },
/*    watch: {
      'postData.storehouseGbCode'(newCode, oldCode) { // 监听仓房变化获取廒间列表
        if (newCode && newCode !== oldCode) {
          this.granaryList = [];
          this.postData.warehouseGbCode = '';
          this.getGranary(newCode);
        }
      }
    },*/
    mounted() {

      if(this.$route.query.pageNo){
          this.postData.storehouseGbCode=this.$route.query.storehouseGbCode;
          this.postData.warehouseGbCode=this.$route.query.warehouseGbCode;
          this.postData.pageNo=this.$route.query.pageNo;
        this.getList(this.postData.pageNo);
        this.getStorehouse();
      }else {

        this.getList(1);
        this.getStorehouse();
      }

    }
  };
</script>
