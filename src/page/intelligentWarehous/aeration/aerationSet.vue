<template>
  <div class="content">
    <div class="account-qh">
      <div :class="tabIndex === 0 ? 'account-item account-on':'account-item'" @click="tabAction(0)">
        通风方式
      </div>
      <div :class="tabIndex === 1 ? 'account-item account-on':'account-item'" @click="tabAction(1)">
        自动通风模型
      </div>
    </div>
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
        <template v-if="tabIndex===1">
          模型名称：
          <input type="text" class="input-text excision" v-model="postData.autoAerationName">
        </template>
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
        <!-- <select name="" class="select-style">
            <option value="">显示条数</option>
        </select> -->
        <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value="">排序方式</option>
          <option value="0">顺序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable" v-if="tabIndex===0">
        <thead>
        <tr>
          <th style="width: 5%;"><input type="checkbox"></th>
          <th style="width: 5%;">序号</th>
          <th style="width: 10%;">通风方式</th>
          <th style="width: 10%;">仓房</th>
          <th style="width: 10%;">廒间</th>
          <th style="width: 10%;">通风机械数量</th>
          <th style="width: 15%;">创建时间</th>
          <th style="width: 30%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox"></td>
          <td>{{i + 1}}</td>
          <td>{{item.aerationModeName}}</td>
          <td>{{item.storehouseName}}</td>
          <td>{{item.warehouseName}}</td>
          <td>{{item.aerationMachineNum}}</td>
          <td>{{item.createTime}}</td>
          <td>
            <div class="table-btn btn-yellow" @click="jumpCopy()">复制</div>
            <div class="table-btn btn-green" @click="jumpEdit(item.aerationModeId)">编辑</div>
            <div class="table-btn btn-red" @click="del(item.aerationModeId)">删除</div>
          </td>
        </tr>
        </tbody>
      </table>
      <table class="customTable" v-if="tabIndex===1">
        <thead>
        <tr>
          <th style="width: 5%;"><input type="checkbox"></th>
          <th style="width: 5%;">序号</th>
          <th style="width: 10%;">模型名称</th>
          <th style="width: 10%;">仓房</th>
          <th style="width: 10%;">廒间</th>
          <th style="width: 10%;">通风目的</th>
          <th style="width: 10%;">通风时长(h)</th>
          <th style="width: 15%;">创建时间</th>
          <th style="width: 30%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox"></td>
          <td>{{i + 1}}</td>
          <td>{{item.autoAerationName}}</td>
          <td>{{item.storehouseName}}</td>
          <td>{{item.warehouseName}}</td>
          <td>{{item.aerationPurpose}}</td>
          <td>{{item.aerationDuration}}</td>
          <td>{{item.createTime}}</td>
          <td>
            <div class="table-btn btn-yellow" @click="jumpCopy(item.autoAerationId)">复制</div>
            <div class="table-btn btn-green" @click="jumpEdit(item.autoAerationId)">编辑</div>
            <div class="table-btn btn-red" @click="del(item.autoAerationId)">删除</div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!-- 分页容器 -->
    <div id="PageBar"></div>
  </div>
</template>

<script>
  import {storehouse, granary} from "@/api/systemManage/dropDown";
  import dictListMixin from '@/mixin/dictList';
  import {
    fetchAerationModeList,
    delAerationMode,
    fetchAutoAerationModeList,
    delAutoAerationMode
  } from "@/api/intelligentWarehous/aeration";

  export default {
    name: "aerationSet",
    mixins: [dictListMixin],
    data() {
      return {
        sortOrder: "0", //0 顺序，1 倒序
        postData: {
          storehouseGbCode:this.$route.query.storehouseGbCode,
          warehouseGbCode: this.$route.query.warehouseGbCode,
          pageSize: 10,
          pageNo:this.$route.query.pageNo!=null?this.$route.query.pageNo:1,
          tabIndex:this.$route.query.tabIndex,
          autoAerationName:this.$route.query.autoAerationName,
        },
        listData: [],
        tabIndex:this.$route.query.tabIndex?this.$route.query.tabIndex:0,
        storehouseList: [],//仓房下拉列表
        granaryList: [],//廒间下拉列表
      };
    },
    methods: {
      tabAction(index) {
        if (index === this.tabIndex) return;
        this.sortOrder = "0"; //0 顺序，1 倒序
        this.postData.storehouseGbCode = '';
        this.postData.warehouseGbCode = '';
        this.listData = [];
        this.tabIndex = this.tabIndex === 0 ? 1 : 0;
        this.getList(1);
      },
      getList(pageNo) {
        //获取列表
        var vm = this;
        vm.postData.pageNo = pageNo;
        layer.load(2);
        const api = this.tabIndex === 0 ? fetchAerationModeList : fetchAutoAerationModeList;
        api(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.listData = ret.data.dataList || ret.data.autoAerationList || [];
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
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      changeSortOrder: function () {
        var vm = this;
        vm.listData.reverse();
      },
      jumpAdd() {
        this.$router.push({
          name: this.tabIndex === 0 ? 'aerationSetEdit' : 'aerationAutoEdit',
          query:{
            storehouseGbCode:this.postData.storehouseGbCode,
            warehouseGbCode: this.postData.warehouseGbCode,
            pageNo:this.postData.pageNo,
            tabIndex:this.postData.tabIndex,
            autoAerationName:this.postData.autoAerationName,
          }});
      },
      jumpCopy(id) {
        this.$router.push({
          name: this.tabIndex === 0 ? 'aerationSetEdit' : 'aerationAutoEdit',
          query:{
            id:id,
            storehouseGbCode:this.postData.storehouseGbCode,
            warehouseGbCode: this.postData.warehouseGbCode,
            pageNo:this.postData.pageNo,
            tabIndex:this.postData.tabIndex,
            autoAerationName:this.postData.autoAerationName,
          }});
      },
      jumpEdit(id) {
        this.$router.push({
          name: this.tabIndex === 0 ? 'aerationSetEdit' : 'aerationAutoEdit',
          query:{
            id:id,
            storehouseGbCode:this.postData.storehouseGbCode,
            warehouseGbCode: this.postData.warehouseGbCode,
            pageNo:this.postData.pageNo,
            tabIndex:this.tabIndex,
            autoAerationName:this.postData.autoAerationName,
          }});
      },
      del(id) {
        layer.confirm('确定删除？', {
          btn: ['确定', '取消'] //按钮
        }, () => {
          layer.load(2);
          const promise = this.tabIndex === 0 ? delAerationMode({aerationModeId: id}) : delAutoAerationMode({autoAerationId: id});
          promise
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("删除成功！");
                this.getList(1);
              } else {
                layer.alert(ret.data, {closeBtn: 0});
              }
            })
            .catch(err => {
              layer.closeAll("loading");
              layer.alert(err.message, {closeBtn: 0});
            });
        });
      },
    getStorehouse() { // 获取仓房列表
      storehouse('')
        .then((ret) => {
          if (ret.code == 200) {
            this.storehouseList = ret.data.dataList;
            if(this.$route.query.postData){
              this.postData=this.$route.query.postData;
              this.getGranary(this.postData.storehouseGbCode);
            }
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
            if(this.$route.query.postData){
              this.postData=this.$route.query.postData;
            }
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
      },
    },
    mounted() {
      console.log(JSON.stringify(this.postData))
      this.getStorehouse();
      if(this.postData.warehouseGbCode){
        this.getGranary(this.postData.storehouseGbCode);
      }
      this.getList(this.postData.pageNo)
    }
  };
</script>
