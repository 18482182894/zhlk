<template>
  <div class="content">
    <div class="menuManage operationLog priceManage">
      <div class="lookup">
        检查编号：
        <input name="" class="select-style excision" v-model="postData.jcbh"/>

        <div class="btn btn-add"  @click="getList(0);">
          <img src="../../../../static/images/search.png" alt=""/>
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
          <th style="width:2.5%;">检查时间</th>
          <th style="width:2.5%;">检查类型</th>
          <th style="width:2.5%;">组织检查人</th>
          <th style="width:2%;">记录人</th>
          <th style="width:3.2%;">受检单位或部门</th>
          <th style="width:2.5%;">参加人员</th>
          <th style="width:3.2%;">检查情况及存在问题</th>
          <th style="width:2.5%;">处理措施及意见</th>
          <th style="width:2.5%;">被查单位负责人</th>
          <th style="width:2.5%;">检查负责人</th>
          <th style="width:11%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox" :value="item.planList"></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td v-text="item.jcbh" ></td>
          <td v-text="item.jcsj"></td>
          <td v-text="item.jclx"></td>
          <td v-text="item.zzjcr"></td>
          <td v-text="item.jlr"></td>
          <td v-text="item.scdwhbm"></td>
          <td v-text="item.cjry"></td>
          <td v-text="item.jcqkjczwt"></td>
          <td v-text="item.clcsjyj"></td>
          <td v-text="item.bjcdwfzr"></td>
          <td v-text="item.jcdwfzr"></td>
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
  import {checkList,checkDel } from "../../../api/safetyTraining/checklistAccount";

  export default {
    name: "checklistAccount",
    data() {
      return {
        sortOrder: "0", //0 顺序，1 倒序
        postData: {
          jcbh:'',
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
        checkList(vm.postData)
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
          name: "checklistAccountEdit",
          query: {}
        });
      },
      jumpDetail: function(jcbh) {
        //跳转到详情
        var vm = this;
        this.$router.push({
          name: "checklistAccountDetail",
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
          checkDel({jcbh:jcbh})
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
          name: "checklistAccountEdit",
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
