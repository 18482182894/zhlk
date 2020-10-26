<template>
  <div class="content">
    <div class="menuManage operationLog priceManage">
      <div class="lookup">
        报警类型
        <select class="select-style excision" v-model="postData.typeCode">
          <option value="1">粮温报警</option>
          <option value="2">气体报警</option>
          <option value="3">倒仓报警</option>
          <option value="4">虫情报警</option>
        </select>
        报警时间
        <input type="text" class="input-text Wdate" id="startTime" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" >-
        <input type="text" class="input-text Wdate excision" id="endTime" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" >

          <div class="btn btn-add"  @click="getList(0);">
            <img src="../../../../static/images/search.png" alt="">
            <label>查找</label>
          </div>
      </div>
      <div>
        <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value="">排序方式</option>
          <option value="0">正序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
        <tr>
          <th style="width:2.5%;"><input type="checkbox" v-model="allChecked" @change="checkAll();"></th>
          <th style="width:2.5%;">序号</th>
          <th style="width:7.5%;">报警类型</th>
          <th style="width:15%;">仓房</th>
          <th style="width:15%;">廒间</th>
          <th style="width:15%;">报警时间</th>
          <th style="width:20%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox" :value="item.id" v-model="delList.billIdList" @change="clickChange();"></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td v-if="item.warningType == 1">{{ '粮温报警' }}</td>
          <td v-if="item.warningType == 2">{{ '气体报警' }}</td>
          <td v-if="item.warningType == 3">{{ '倒仓报警' }}</td>
          <td v-if="item.warningType == 4">{{ '虫情报警' }}</td>
          <td v-text="item.storehouseName"></td>
          <td v-text="item.warehouseName"></td>
          <td v-text="item.warningDatetime"></td>
          <td>
            <div class="table-btn btn-yellow" @click="jumpDetail(1);">详情</div>
          </td>
        </tr>
        </tbody>
      </table>
      <!--&lt;!&ndash; 分页容器 &ndash;&gt;-->
      <div id="PageBar"></div>
    </div>
  </div>
</template>

<script>
  import {
    showWarningList
  } from "@/api/warning/showWarningList";
    export default {
        name: "showWarningList",
      data() {
        return {
          postData: {
            typeCode: 1,
            startTime:'',
            endTime:'',
            pageSize: 10,
            pageNo: 0
          },
          sortOrder: "0", //0 顺序，1 倒序
          requestData:'',
          showType:'',
          submitData:{
            applyId:'',
            graindepot:'',
            warehouse:'',
            granary:'',
            goodsLocation:'',
            shipingCount:'',
            memo:''
          },
          grainVarietyList: "",
          grainOilLevelList: "",
          inventoryPropertyList: "",
          allChecked: false,
          delList: {
            billIdList: []
          },
          detailData:'',
          listData: [],
          roleIdList:[],
          graindepotList:[],//库点下拉列表
          storehouseList:[],//仓房下拉列表
          granaryList:[],//廒间下拉列表
          cargoList:[],//货位下拉列表
          editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
        };
      },
      methods: {
        changeSortOrder: function() {//倒序
          var vm = this;
          vm.listData.reverse();
        },
        getList: function(pageNo) {//获取列表
          var vm = this;
          layer.load(2);
          vm.postData.pageNo = pageNo;
          vm.postData.startTime=$('#startTime').val();
          vm.postData.endTime=$('#endTime').val();
          showWarningList(vm.postData)
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
            vm.delList.billIdList = [];
            vm.delList.billIdList.push(id);
          } else {
            if (vm.delList.billIdList.length == 0) {
              layer.msg("请至少选择一条数据！");
              return;
            } else {
              if (vm.delList.billIdList.length > 1) {
                layer.msg("只能选择一条数据！");
                return;
              }
            }
          }
          layer.confirm(
            "确定删除？",
            {
              btn: ["确定", "取消"] //按钮
            },
            function() {
              layer.load(2);
              var delstr = vm.delList.billIdList.join(",");
              showWarningDel({ billId: delstr })
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
            }
          );
        },
        checkAll: function() {
          //全选
          var vm = this;
          if (vm.allChecked) {
            for (var i = 0; i < vm.listData.length; i++) {
              vm.delList.billIdList.push(vm.listData[i].id);
            }
          } else {
            vm.delList.billIdList = [];
          }
        },
        clickChange: function() {
          //监听input选中状态，控制全选input的选中
          var vm = this;
          if (vm.delList.billIdList.length == vm.listData.length) {
            vm.allChecked = true;
          } else {
            vm.allChecked = false;
          }
        },
        showPopup: function() {// 展示弹出层
          var vm = this;
          vm.getList();
          vm.editPopup = 1;
        },
        closePopup: function() {// 隐藏弹出层
          var vm = this;
          vm.editPopup = 0;
        },
        jumpDetail: function(num) {
          //跳转到详情
          var vm = this,name;
          if(num==1){
              name='grainSituation';
          }
          if(num==2){
              name='modifiedAtmosphereGasStrength';
          }
          if(num==3){
              name='inventoryAccount';
          }
          if(num==4){
              name='insectPest';
          }
          this.$router.push({
            name: name
          });
        },
      },
      mounted() {
         this.getList(1);
      }
    };
</script>

<style scoped>
.input-text{
  width: 12.25rem;
}
</style>
