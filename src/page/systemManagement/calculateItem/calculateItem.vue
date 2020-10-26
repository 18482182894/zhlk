<template>
    <div class="content">
        <div class="menuManage operationLog">
            <!--<div>-->
                <!--<div class="btn btn-add" @click="getList(0)">-->
                    <!--<img src="../../../../static/images/search.png" alt="">-->
                    <!--<label>查找</label>-->
                <!--</div>-->
            <!--</div>-->
            <div class="lookup">
                计算项名称：
                <input type="text" class="input-text excision" v-model="postData.formulaName">
              <div style="display: inline-block">
                <div class="btn btn-add" @click="getList(0)">
                  <img src="../../../../static/images/search.png" alt="">
                  <label>查找</label>
                </div>
              </div>
            </div>
            <div>
                <div class="btn btn-add" @click="showPopup();">
                    <img src="../../../../static/images/add.png" alt="">
                    <label>新增</label>
                </div>
            </div>
            <table class="customTable">
                <thead>
                    <tr>
                        <th><input type="checkbox" v-model="allChecked" @change="checkAll();"></th>
                        <th>序号</th>
                        <th>计算项名称</th>
                        <th>创建时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in listData">
                        <td><input type="checkbox" :value="item.calculateItemId" v-model="delList.calculateItemIdList" @change="clickChange();"></td>
                        <td v-text="i+1"></td>
                        <td v-text="item.calculateItemName"></td>
                        <td v-text="item.createTime"></td>
                        <td>
                            <div class="table-btn btn-red" @click="delData(item.calculateItemId);">删除</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- 分页容器 -->
            <div id="PageBar"></div>
        </div>
        <!-- 新增计算项弹出层 -->
        <div class="popup" :style="editPopup==1?'display:block;':''">
            <div class="popup-main menuPopup-edit-main">
                <div class="popup-title">
                    <label>新增计算项</label>
                    <em class="popup-close" @click="closePopup('edit');">×</em>
                </div>
                <div class="popup-content">
                    <p class="text-justify">
                        <label style="margin-left: 10%">计算项名称</label>
                        <input type="text" style="margin-right: 10%" v-model="postEditData.calculateItemName">
                    </p>
                </div>
                <div>
                    <button class="query" @click="addCalculate();">确定</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style type="text/css" scoped>
  .menuPopup-edit-main{
    height: 205px;
  }
  .popup .popup-content{
    border-bottom: 0;
  }
</style>
<script>
import { calculateItemList, calculateItemNew, calculateItemDel} from "@/api/systemManage/calculateItem";
export default {
  name: "calculateItem",
  data() {
    return {
      postData: {
        calculateItemName: this.$route.query.calculateItemName?this.$route.query.calculateItemName:"",
        pageSize: 10,
        pageNo: this.$route.query.pageNo?this.$route.query.pageNo:0
      },
      allChecked: false,
      delList: {
        calculateItemIdList: []
      },
      listData: [],
      editPopup: 0, 
      postEditData:{
        calculateItemName:''
      }
    };
  },
  methods: {
    getList: function(pageNo) {
      //获取列表
      var vm = this;
      vm.postData.pageNo = pageNo;
      layer.load(2);
      calculateItemList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.calculateItemList;
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
        vm.delList.calculateItemIdList = [];
        vm.delList.calculateItemIdList.push(id);
      } else {
        if (vm.delList.calculateItemIdList.length == []) {
          layer.msg("请至少选择一条数据！");
          return;
        }
      }
      layer.confirm('确定删除？', {
        btn: ['确定','取消'] //按钮
      }, function(){
        layer.load(2);
        var delstr = vm.delList.calculateItemIdList.join(",");
        calculateItemDel({ calculateItemIdList: delstr })
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
          vm.delList.calculateItemIdList.push(vm.listData[i].calculateItemId);
        }
      } else {
        vm.delList.calculateItemIdList = [];
      }
    },
    clickChange: function() {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (vm.delList.calculateItemIdList.length == vm.listData.length) {
        vm.allChecked = true;
      } else {
        vm.allChecked = false;
      }
    },
    showPopup: function() {
      // 展示弹出层
      var vm = this;
      vm.editPopup = 1;
    },
    closePopup: function() {
      // 隐藏弹出层
      var vm = this;
      vm.editPopup = 0;
    },
    addCalculate:function () {//新增
      var vm=this;
      if (vm.postEditData.calculateItemName=='') {
        layer.msg("请填写计算项名称!");
        return;
      }
      calculateItemNew(vm.postEditData).then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("新增计算项成功！");
            vm.getList(vm.postData.pageNo);
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
      }).catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
      });
    }
  },
  mounted() {
    var vm = this;
    vm.getList(vm.postData.pageNo);
  }
};
</script>
