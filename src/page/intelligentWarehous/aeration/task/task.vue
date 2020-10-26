<template>
  <div class="content">
    <div class="menuManage operationLog company">
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
        通风类型：
        <select class="select-style excision" v-model="postData.aerationType">
          <option value="">请选择</option>
          <option value="整仓通风">整仓通风</option>
          <option value="单管通风">单管通风</option>
          <option value="内环流通风">内环流通风</option>
          <option value="微风降温通风">微风降温通风</option>
          <option value="水源降温">水源降温</option>
          <option value="冷谷机降温">冷谷机降温</option>
          <option value="开窗通风">开窗通风</option>
          <option value="隔热层通风">隔热层通风</option>
          <option value="筒仓机械">筒仓机械</option>
          <option value="空调仓运行">空调仓运行</option>
        </select>
        <div class="btn btn-add" @click="getList(1)">
          <img src="../../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
        <br>
        时间：
        <input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})" id="leaveStartDate"/>~
        <input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})" id="leaveEndDate"/>
      </div>
      <div>
        <div class="btn btn-add" @click="jumpAdd">
          <img src="../../../../../static/images/add.png" alt="">
          <label>新增</label>
        </div>
        <!-- <select name="" class="select-style">
            <option value="">显示条数</option>
        </select> -->
        <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value="">排序方式</option>
          <option value="0">顺序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
        <tr>
          <th style="width: 5%;"><input type="checkbox"></th>
          <th style="width: 5%;">序号</th>
          <th style="width: 10%;">仓房</th>
          <th style="width: 10%;">廒间</th>
          <th style="width: 10%;">通风方式</th>
          <th style="width: 10%;">通风类型</th>
          <th style="width: 5%;">通风目的</th>
          <th style="width: 10%;">通风开始时间</th>
          <th style="width: 10%;">通风结束时间</th>
          <th style="width: 5%;">通风时长</th>
          <th style="width: 20%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox"/></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td v-text="item.storehouseName"></td>
          <td v-text="item.warehouseName"></td>
          <td v-text="item.aerationMode"></td>
          <td v-text="item.aerationType"></td>
          <td v-text="item.aerationPurpose"></td>
          <td v-text="item.aerationStartDatetime"></td>
          <td v-text="item.aerationEndDatetime"></td>
          <td v-text="item.aerationDuration"></td>
          <td>
            <div class="table-btn btn-yellow" @click="jumpDetail(item.aerationJobRecordId)">详情</div>
            <div class="table-btn btn-green" @click="jumpEdit(item.aerationJobRecordId)">编辑</div>
          </td>
        </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar"></div>
    </div>
	<div class="copyright">
		<p>Copyright © 四川百威智联科技有限公司 © 版权所有 电话：028-62631082</p>
	</div>
  </div>
</template>

<style type="text/css" scoped>
  .lookup .excision {
    margin-right: 2rem;
  }
</style>
<script>
  import {storehouse, granary} from "@/api/systemManage/dropDown";
  import {fetchAerationWorkList} from "@/api/intelligentWarehous/aeration";

  export default {
    name: "company",
    data() {
      return {
        sortOrder: "0", //0 顺序，1 倒序
        postData: {
          storehouseGbCode: this.$route.query.storehouseGbCode,
          warehouseGbCode: this.$route.query.warehouseGbCode,
          aerationType:this.$route.query.aerationType,
          leaveStartDate:this.$route.query.leaveStartDate,
          leaveEndDate:this.$route.query.leaveEndDate,
          pageSize: 10,
          pageNo:this.$route.query.pageNo!=null?this.$route.query.pageNo:1,
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
        vm.postData.leaveStartDate = $("#leaveStartDate").val();
        vm.postData.leaveEndDate = $("#leaveEndDate").val();

        layer.load(2);
        fetchAerationWorkList(vm.postData)
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
      jumpDetail(id) {
        this.$router.push({
          name: 'aerationTaskDetail',
          query: {
            id:id,
            storehouseGbCode: this.postData.storehouseGbCode,
            warehouseGbCode: this.postData.warehouseGbCode,
            aerationType:this.postData.aerationType,
            leaveStartDate:this.postData.leaveStartDate,
            leaveEndDate:this.postData.leaveEndDate,
            pageNo:this.postData.pageNo,
          }});
      },
      jumpAdd() {
        this.$router.push({
          name: 'aerationTaskEdit',
          query: {
            storehouseGbCode: this.postData.storehouseGbCode,
            warehouseGbCode: this.postData.warehouseGbCode,
            aerationType:this.postData.aerationType,
            leaveStartDate:this.postData.leaveStartDate,
            leaveEndDate:this.postData.leaveEndDate,
            pageNo: this.postData.pageNo,
          }});
      },
      jumpEdit(id) {
        this.$router.push({
          name: 'aerationTaskEdit',
          query: {
            id:id,
            storehouseGbCode: this.postData.storehouseGbCode,
            warehouseGbCode: this.postData.warehouseGbCode,
            aerationType:this.postData.aerationType,
            leaveStartDate:this.postData.leaveStartDate,
            leaveEndDate:this.postData.leaveEndDate,
            pageNo: this.postData.pageNo,
          }});
      },
      getStorehouse() { // 获取仓房列表
        storehouse()
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
    },
    watch: {
      'postData.storehouseGbCode'(newCode, oldCode) { // 监听仓房变化获取廒间列表
        if (newCode && newCode !== oldCode) {
          this.granaryList = [];
          this.postData.warehouseGbCode = '';
          this.getGranary(newCode);
        }
      },
    },
    mounted() {
      this.getStorehouse();
      if(this.postData.warehouseGbCode){
        this.getGranary(this.postData.storehouseGbCode);
        $("#leaveStartDate").val(this.postData.leaveStartDate);
        $("#leaveEndDate").val(this.postData.leaveEndDate);
      }
      this.getList(this.postData.pageNo);
    }
  };
</script>
