<template>
  <div class="content">
    <div class="menuManage operationLog priceManage">
      <div class="lookup">
        卡号
        <input name="" class="select-style excision" v-model="postData.cardNo">

        
          <div class="btn btn-add"  @click="getList(0);">
            <img src="/static/images/search.png" alt="">
            <label>查找</label>
          </div>
      </div>

      <div>
        <div class="btn btn-add" @click="jumpEdit();">
          <img src="../../../../static/images/add.png" alt="">
          <label>新增</label>
        </div>
        <div class="btn btn-del" @click="delData();">
          <img src="../../../../static/images/del.png" alt>
          <label>删除</label>
        </div>
      </div>
      <table class="customTable">
        <thead>
          <tr>
            <th style="width:2.5%;"><input type="checkbox"  v-model="allChecked" @change="checkAll();"></th>
            <th style="width:2.5%;">序号</th>
            <th style="width:25%;">卡号</th>
            <th style="width:7.5%;">状态</th>
            <th style="width:20%;">创建时间</th>
            <th style="width:30%;">操作</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(item,i) in listData">
              <td><input type="checkbox" :value="item.cardNo" v-model="delList.cardNoList" @change="clickChange();"></td>
              <td v-if="sortOrder=='0'" v-text="i+1"></td>
              <td v-else v-text="listData.length-i"></td>
              <td v-text="item.cardNo"></td>
              <td v-text="item.cardStatus" ></td>
              <td v-text="item.createDatetime"></td>
              <td>
                  <div class="table-btn btn-red" @click="delData(item.cardNo);">删除</div>
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
import { cardList, cardDel } from "@/api/systemManage/basicData/card";
    export default {
        name: "cardList",
      data() {
        return {
          sortOrder: "0", //0 顺序，1 倒序
          requestData:'',
          postData: {
            cardNo: this.$route.query.cardNo?this.$route.query.cardNo:"",
            pageSize: 10,
            pageNo: this.$route.query.pageNo?this.$route.query.pageNo:0
          },
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
            cardNoList: []
          },
          detailData:'',
          listData: [],
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
        delData: function(id) {
          //删除
          var vm = this;
          if (id) {
            vm.delList.cardNoList = [];
            vm.delList.cardNoList.push(id);
          } else {
            if (vm.delList.cardNoList.length == []) {
              layer.msg("请至少选择一条数据！");
              return;
            }
          }
          layer.confirm('确定删除？', {
            btn: ['确定','取消'] //按钮
          }, function(){
            layer.load(2);
            var delStr = vm.delList.cardNoList.join(",");
            cardDel({ cardNoList: delStr })
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  layer.msg("删除成功！");
                  vm.postData.pageNo = 1;
                  vm.getList(1);
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
        checkAll: function() {
          //全选
          var vm = this;
          if (vm.allChecked) {
            for (var i = 0; i < vm.listData.length; i++) {
              vm.delList.cardNoList.push(vm.listData[i].cardNo);
            }
          } else {
            vm.delList.cardNoList = [];
          }
        },
        clickChange: function() {
          //监听input选中状态，控制全选input的选中
          var vm = this;
          if (vm.delList.cardNoList.length == vm.listData.length) {
            vm.allChecked = true;
          } else {
            vm.allChecked = false;
          }
        },
        getList: function(pageNo) {//获取列表
          var vm = this;
          vm.postData.pageNo = pageNo;
          layer.load(2);
          cardList(vm.postData)
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
        jumpEdit: function(id) {
          var vm = this;
          this.$router.push({
            name: "cardEdit",
            query: {
              id: id,
              //下面新增
              cardNo:vm.postData.cardNo,
              pageNo:vm.postData.pageNo
            }
          });
        }
      },
      mounted() {
        this.getList(this.postData.pageNo);
      }
    };
</script>
