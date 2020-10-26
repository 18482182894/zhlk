<template>
    <div class="content">
        <div class="menuManage operationLog priceManage">
            <!--<div>-->
                <!--<div class="btn btn-add" @click="getList(0)">-->
                    <!--<img src="../../../../static/images/search.png" alt="">-->
                    <!--<label>查找</label>-->
                <!--</div>-->
            <!--</div>-->
            <div class="lookup">
                公式名称：
                <input type="text" class="input-text excision" v-model="postData.formulaName">

             
                <div class="btn btn-add" @click="getList(0)">
                  <img src="../../../../static/images/search.png" alt="">
                  <label>查找</label>
                </div>
            </div>
            <div>
                <div class="btn btn-add" @click="jumpEdit();">
                    <img src="../../../../static/images/add.png" alt="">
                    <label>新增</label>
                </div>
                <div class="btn btn-del" @click="delData();">
                    <img src="../../../../static/images/del.png" alt="">
                    <label>删除</label>
                </div>
                <div class="btn btn-print" @click="jumpItem();">
                    <label>计算项管理</label>
                </div>
            </div>
            <table class="customTable">
                <thead>
                    <tr>
                        <th><input type="checkbox" v-model="allChecked" @change="checkAll();"></th>
                        <th>序号</th>
                        <th>公式名称</th>
                        <th>公式</th>
                        <th>状态</th>
                        <th>备注</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in listData">
                        <td><input type="checkbox" :value="item.formulaId" v-model="delList.formulaIdList" @change="clickChange();"></td>
                        <td v-text="i+1"></td>
                        <td v-text="item.formulaName"></td>
                        <td v-text="item.formulaDetail"></td>
                        <td v-text="item.formulaStatus==0?'停止':'启用'"></td>
                        <td v-text="item.memo"></td>
                        <td>
                            <div class="table-btn btn-yellow" @click="jumpDetail(item.formulaId);">详情</div>
                            <div class="table-btn btn-green" @click="jumpEdit(item.formulaId);">编辑</div>
                            <div class="table-btn btn-red" @click="delData(item.formulaId);">删除</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- 分页容器 -->
            <div id="PageBar"></div>

        </div>
    </div>
</template>

<script>
import { formulaList, formulaDel } from "@/api/systemManage/basicData/formula";
export default {
  name: "formula",
  data() {
    return {
      postData: {
        formulaName: this.$route.query.formulaName?this.$route.query.formulaName:"",
        pageSize: 10,
        pageNo: this.$route.query.pageNo?this.$route.query.pageNo:0
      },
      allChecked: false,
      delList: {
        formulaIdList: []
      },
      listData: []
    };
  },
  methods: {
    getList: function(pageNo) {
      //获取列表
      var vm = this;
      vm.postData.pageNo = pageNo;
      layer.load(2);
      formulaList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.formulaList;
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
    delData: function(id) {
      //删除
      var vm = this;
      if (id) {
        vm.delList.formulaIdList = [];
        vm.delList.formulaIdList.push(id);
      } else {
        if (vm.delList.formulaIdList.length == []) {
          layer.msg("请至少选择一条数据！");
          return;
        }
      }
      layer.confirm('确定删除？', {
        btn: ['确定','取消'] //按钮
      }, function(){
      layer.load(2);
      var delstr = vm.delList.formulaIdList.join(",");
      formulaDel({ formulaIdList: delstr })
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("删除成功！");
            vm.postData.pageNo = 0;
            vm.getList(0);
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
      });
    },
    checkAll: function() {
      //全选
      var vm = this;
      if (vm.allChecked) {
        for (var i = 0; i < vm.listData.length; i++) {
          vm.delList.formulaIdList.push(vm.listData[i].formulaId);
        }
      } else {
        vm.delList.formulaIdList = [];
      }
    },
    clickChange: function() {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (vm.delList.formulaIdList.length == vm.listData.length) {
        vm.allChecked = true;
      } else {
        vm.allChecked = false;
      }
    },
    jumpItem:function () {
      var vm = this;
      this.$router.push({
        name: "formulaItem"
      });
      
    },
    jumpDetail: function(id) {
      var vm = this;
      this.$router.push({
        name: "formulaDetail",
        query: {
          id: id,
          //新增
          formulaName:vm.postData.formulaName,
          pageNo:vm.postData.pageNo
        }
      });
    },
    jumpEdit: function(id) {
      var vm = this;
      this.$router.push({
        name: "formulaEdit",
        query: {
          id: id,
          //新增
          formulaName:vm.postData.formulaName,
          pageNo:vm.postData.pageNo
        }
      });
    }
  },
  mounted() {
    var vm = this;
    vm.getList(vm.postData.pageNo);
  }
};
</script>
