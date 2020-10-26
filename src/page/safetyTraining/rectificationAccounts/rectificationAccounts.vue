<template>
  <div class="content">
    <div class="menuManage operationLog priceManage">
      <div class="lookup">
        检查编号：
        <input name="" class="select-style excision" v-model="postData.jcbh">
        通知单号：
        <input name="" class="select-style excision" v-model="postData.tzdh">
        <div class="btn btn-add"  @click="getList(0);">
          <img src="../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div>
        <div class="btn btn-add" @click="jumpEdit();">
          <img src="../../../../static/images/add.png" alt="">
          <label>新增</label>
        </div>
        <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value="">排序方式</option>
          <option value="0">正序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
        <tr>
          <th style="width:1.5%;"><input type="checkbox" v-model="allChecked" @change="checkAll();"></th>
          <th style="width:1.5%;">序号</th>
          <th style="width:2.5%;">检查编码</th>
          <th style="width:2.5%;">受查单位</th>
          <th style="width:2.5%;">受查日期</th>
          <th style="width:2.5%;">存在问题</th>
          <th style="width:2%;">检查人</th>
          <th style="width:3.2%;">整改负责人</th>
          <th style="width:2.5%;">检查处理意见</th>
          <th style="width:3.2%;">班组负责人</th>
          <th style="width:2.5%;">填表日期</th>
          <th style="width:2.5%;">通知单号</th>
          <th style="width:2.5%;">整改内容</th>
          <th style="width:2.5%;">整改措施</th>
          <th style="width:2.5%;">验收结果</th>
          <th style="width:2%;">验收人</th>
          <th style="width:11%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox" :value="item.planList"></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td v-text="item.jcbh" ></td>
          <td v-text="item.scdw"></td>
          <td v-text="item.scrq"></td>
          <td v-text="item.czwt"></td>
          <td v-text="item.jcr"></td>
          <td v-text="item.zgfzr"></td>
          <td v-text="item.jcclyj"></td>
          <td v-text="item.bzfzr"></td>
          <td v-text="item.tbrq"></td>
          <td v-text="item.tzdh"></td>
          <td v-text="item.zgnr"></td>
          <td v-text="item.zgcs"></td>
          <td v-text="item.ysjg"></td>
          <td v-text="item.ysr"></td>
          <td>
            <div class="table-btn btn-green" @click="modifyData(item.jcbh);">编辑</div>
            <div class="table-btn btn-red" @click="delData(item.jcbh);">删除</div>
            <div class="table-btn btn-yellow" @click="jumpDetail(item.jcbh);">详情</div>
          </td>
        </tr>
        </tbody>
      </table>
      <!--&lt;!&ndash; 分页容器 &ndash;&gt;-->
      <div id="PageBar"></div>
    </div>
  </div>
</template>

<style scoped>
  .table-btn{
    padding: 0 2px;
    margin: 2px 6px;
  }
</style>
<script>
  import {rectificationList,rectificationDel } from "../../../api/safetyTraining/rectificationAccounts";

  export default {
    name: "rectificationAccounts",
    data() {
      return {
        sortOrder: "0", //0 顺序，1 倒序
        postData: {
          jcbh:'',
          tzdh:'',
          pageSize: 10,
          pageNo:this.$route.query.pageNo ?  this.$route.query.pageNo : 0
        },
        allChecked: false,
        listData: [],
        planIdList:''
      };
    },
    methods: {
      changeSortOrder: function() {//倒序
        var vm = this;
        vm.listData.reverse();
      },
      getList: function(pageNo) {//获取列表
        var vm = this;
        vm.postData.pageNo = pageNo;
        layer.load(2);
        rectificationList(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              //console.log (ret);
              vm.listData = ret.data.dataList;
              laypage({
                //分页
                cont: "PageBar", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                pages: ret.page.totalPages, //通过后台拿到的总页数
                curr: pageNo,
                skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                jump: function(obj, first) {
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
                layer.alert(ret.data, { closeBtn: 0 });
              }
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      },
      jumpEdit: function(id) {
        //跳转到编辑或新增页面
        var vm = this;
        this.$router.push({
          name: "rectificationAccountsEdit",
          query: {
          }
        });
      },
      jumpDetail: function(jcbh) {
        //跳转到详情
        var vm = this;
        this.$router.push({
          name: "rectificationAccountsDetail",
          query: {
            jcbh:jcbh
          }
        });
      },
      delData: function(jcbh) {
       //删除
       var vm = this;
       layer.confirm('确定删除？', {
         btn: ['确定','取消'] //按钮
       }, function(){
         layer.load(2);
         //var delStr = vm.planIdList.join(",");
         rectificationDel({jcbh:jcbh})
           .then(ret => {
             layer.closeAll("loading");
             if (ret.code == 200) {
               layer.msg("删除成功！");
               vm.postData.pageNo = 1;
               vm.getList(vm.postData.pageNo);
             } else {
               layer.alert(ret.data, { closeBtn: 0 });
             }
           })
           .catch(err => {
             layer.alert(err.message, { closeBtn: 0 });
           });
       }, function(){
       });

     },
      modifyData:function (jcbh) {
        //跳转到编辑或新增页面
        var vm = this;
        this.$router.push({
          name: "rectificationAccountsEdit",
          query: {
            jcbh:jcbh
          }
        });
      }
    },
    mounted() {
      this.getList(this.postData.pageNo);
    }
  };
</script>
