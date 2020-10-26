<template>
  <div class="content">
    <div class="menuManage operationLog ">
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
        <div class="btn btn-add" @click="getList(1);">
          <img src="../../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div>
        <div class="btn btn-add" @click="jumpEdit();">
          <img src="../../../../../static/images/add.png" alt="">
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
          <th style="width:7.5%;">仓房名称</th>
          <th style="width:7.5%;">廒间号</th>
          <th style="width:7.5%;">降氧目的</th>
          <th style="width:7.5%;">充气方式</th>
          <th style="width:10%;">操作时间</th>
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
          <td v-text="item.cdjyPurpose"></td>
          <td v-text="item.inflationMethod"></td>
          <td v-text="item.operateDate"></td>
          <td v-text="draftStatusMap[item.draftStatus]"></td>
          <td v-text="auditStateMap[item.auditState]"></td>
          <td>
            <div class="table-btn btn-yellow"
                 @click="jumpDetail(item.cdjyJobId)">详情</div>
            <div class="table-btn btn-submit"
                 @click="submitAudit(item.cdjyJobId)" v-if="item.draftStatus==0">提交审核</div>
            <div class="table-btn btn-green"
                 @click="jumpEdit(item.cdjyJobId)" v-if="item.draftStatus==0">编辑</div>
            <div class="table-btn btn-red"
                 @click="delData(item.cdjyJobId)" v-if="item.draftStatus==0">删除</div>
            <div class="table-btn btn-again"
                 @click="submitAudit(item.cdjyJobId)" v-if="item.auditState==0" >再次申请</div>
          </td>
        </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar"></div>
    </div>
    <div class="detail-back">
      <button @click="goback()">返回</button>
    </div>
  </div>
</template>
<style type="text/css" scoped>
  .lookup .excision {
    margin-right: 2rem;
  }
</style>
<script>
  import {fetchNitrogenAndOxygenList, delNitrogenAndOxygen, applyNitrogenAndOxygen} from "@/api/intelligentWarehous/atmosphere";
  import {storehouse, granary} from "@/api/systemManage/dropDown";

  export default {
    name: "nitrogenAndOxygen",
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
          storehouseGbCode:this.$route.query.storehouseGbCode,
          warehouseGbCode:this.$route.query.warehouseGbCode,
          pageSize: 10,
          pageNo:this.$route.query.pageNo!=null?this.$route.query.pageNo:1
        },
        listData: [],
        storehouseList: [],//仓房下拉列表
        granaryList: [],//廒间下拉列表
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
        fetchNitrogenAndOxygenList(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.listData = ret.data.dataList;
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
          name: 'nitrogenAndOxygenEdit',
          query: {
            storehouseGbCode:this.postData.storehouseGbCode,
            warehouseGbCode:this.postData.warehouseGbCode,
            pageNo:this.postData.pageNo
          }});
      },
      goback(){
        this.$router.push({
          name:'modifiedAtmosphere',
          query:{

          }
        });
      },
      jumpEdit(id) {
        this.$router.push({
          name: 'nitrogenAndOxygenEdit',
          query: {
            id:id,
            storehouseGbCode:this.postData.storehouseGbCode,
            warehouseGbCode:this.postData.warehouseGbCode,
            pageNo:this.postData.pageNo
          }});
      },
      jumpDetail(id) {
        this.$router.push({
          name: 'nitrogenAndOxygenDetail',
          query:{
            id:id,
            storehouseGbCode:this.postData.storehouseGbCode,
            warehouseGbCode:this.postData.warehouseGbCode,
            pageNo:this.postData.pageNo
          }});
      },
      submitAudit(id){
        layer.confirm(
          "确定提交申请？",
          {
            btn: ["确定", "取消"] //按钮
          },
          () => {
            layer.load(2);
            applyNitrogenAndOxygen({cdjyJobId: id})
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
          });

      },
      delData(id){
        layer.confirm(
          "确定删除？",
          {
            btn: ["确定", "取消"] //按钮
          },
          () => {
            layer.load(2);
            delNitrogenAndOxygen({cdjyJobIdList: id})
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
      'postData.storehouseGbCode'(newCode, oldCode) { // 监听仓房变化获取廒间列表
        if (newCode && newCode !== oldCode) {
          this.granaryList = [];
          this.postData.warehouseGbCode = '';
          this.getGranary(newCode);
        }
      }
    },
    mounted() {
      this.getStorehouse();
      if(this.postData.warehouseGbCode){
        this.getGranary(this.postData.storehouseGbCode);
      }
      this.getList(this.postData.pageNo);
    }
  };

</script>
