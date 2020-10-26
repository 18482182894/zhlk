<template>
    <div class="content">
        <div class="menuManage operationLog priceManage">
            <div class="lookup">
                计算项名称：
                <input type="text" class="input-text excision" v-model="postData.calculateItemName">

              
                <div class="btn btn-add" @click="getList(0)">
                  <img src="../../../../static/images/search.png" alt="">
                  <label>查找</label>
                </div>
            </div>
            <div>
                <div class="btn btn-add" @click="showPopup();">
                    <img src="../../../../static/images/add.png" alt="">
                    <label>新增</label>
                </div>
                <div class="btn btn-del" @click="delData();">
                    <img src="../../../../static/images/del.png" alt="">
                    <label>删除</label>
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
         <!-- 弹出层 -->
            <div class="popup" :style="editPopup==1?'display:block;':''">
                <div class="popup-main menuPopup-edit-main" style="height: 15rem;">
                    <div class="popup-title">
                        <label>新增计算项</label>
                        <em class="popup-close" @click="closePopup();">×</em>
                    </div>
                    <div class="popup-content">
                        <p class="text-justify">
                            <label>指标项:</label>
                            <input type="text" v-model="submitData.calculateItemName" >
                        </p>
                    </div>
                    <div>
                        <button class="query" @click="submitEvent();">确定</button>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
import { formulaItemNew, formulaItemDel,formulaItemList } from "@/api/systemManage/basicData/formula";
export default {
  name: "formula",
  data() {
    return {
      postData: {
        calculateItemName:this.$route.query.calculateItemName?this.$route.query.calculateItemName:"",
        pageSize: 10,
        pageNo: this.$route.query.pageNo?this.$route.query.pageNo:0
      },
      allChecked: false,
      delList: {
        calculateItemIdList: []
      },
      submitData:{
        calculateItemName:''
      },
      listData: [],
      editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
    };
  },
  methods: {
    getList: function(pageNo) {
      //获取列表
      var vm = this;
      vm.postData.pageNo = pageNo;
      layer.load(2);
      formulaItemList(vm.postData)
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
    showPopup: function() {
      // 展示弹出层
      var vm = this;
          vm.editPopup = 1;
    },
    closePopup: function() {
      // 隐藏弹出层
      var vm = this;
          vm.editPopup = 0;
          vm.submitData.calculateItemName='';
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
      formulaItemDel({ calculateItemIdList: delstr })
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
    submitEvent:function () {
      var vm=this;

      if (vm.submitData.calculateItemName == "") {
        layer.msg("请填写计算项项");
        return;
      }
      formulaItemNew(vm.submitData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("新增成功！");
            vm.postData.pageNo = 0;
            vm.getList(vm.postData.pageNo);
            vm.closePopup();
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    jumpDetail: function(id) {
      var vm = this;
      this.$router.push({
        name: "formulaDetail",
        query: {
          id: id,
          //新增的
          calculateItemName:vm.postData.calculateItemName,
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
          //新增的
          calculateItemName:vm.postData.calculateItemName,
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
