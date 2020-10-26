<template>
    <div class="content">
        <div class="menuManage operationLog priceManage">
            <!--<div>-->
                <!--<div class="btn btn-add" @click="getList(0);">-->
                    <!--<img src="../../../../static/images/search.png" alt="">-->
                    <!--<label>查找</label>-->
                <!--</div>-->
            <!--</div>-->
            <div class="lookup">
                品  &nbsp; &nbsp; &nbsp;  种：
                <!-- <select name="" class="select-style excision" v-model="postData.grainVarietyId">
                    <option v-for="item in grainVarietyList" :value="item.grainVarietyId" v-text="item.grainVarietyName"></option>
                </select> -->
                <div class="grainVariety excision">
                    <treeselect v-model="postData.grainVarietyId" :multiple="false" :options="grainVarietyList" />
                </div>
                等  &nbsp; &nbsp; &nbsp;  级：
                <select name="" class="select-style excision" v-model="postData.grainLevelId">
                    <option v-for="item in grainOilLevelList" :value="item.dicInfoCode" v-text="item.dicInfoValue"></option>
                </select>
                粮食性质：
                <select name="" class="select-style excision" v-model="postData.grainAttributeId">
                    <option v-for="item in grainNatureList" :value="item.dicInfoCode" v-text="item.dicInfoValue"></option>
                </select>

              
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
                        <th>品种</th>
                        <th>粮食性质</th>
                        <th>等级</th>
                        <th>结算价格（元/千克）</th>
                        <th>备注</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in listData">
                        <td><input type="checkbox" :value="item.priceId" v-model="priceIdList" @change="clickChange();"></td>
                        <td v-text="i+1"></td>
                        <td v-text="item.grainVariety"></td>
                        <td v-text="item.grainAttribute"></td>
                        <td v-text="item.grainLevel"></td>
                        <td v-text="item.price"></td>
                        <td v-text="item.memo" style="overflow: auto"></td>
                        <td>
                            <div class="table-btn btn-yellow" @click="jumpDetail(item.priceId);">详情</div>
                            <div class="table-btn btn-green" @click="jumpEdit(item.priceId);">编辑</div>
                            <div class="table-btn btn-red" @click="delData(item.priceId);">删除</div>
                        </td>
                    </tr>

                    <!--</tr>-->
                </tbody>
            </table>
            <!-- 分页容器 -->
            <div id="PageBar"></div>
        </div>
    </div>
</template>

<script>  

  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

import { priceList, priceDel } from "@/api/systemManage/price";
import {
  grainVariety,
  grainOilLevel,
  grainNature,
} from "@/api/systemManage/dropDown";
export default {
  name: "priceManage",
  components: { Treeselect },
  data() {
    return {
      postData: {
        grainVarietyId:this.$route.query.grainVarietyId?this.$route.query.grainVarietyId:null,
        grainAttributeId: this.$route.query.grainAttributeId?this.$route.query.grainAttributeId:"",
        grainLevelId: this.$route.query.grainLevelId?this.$route.query.grainLevelId:"",
        pageSize: 10,
        pageNo: this.$route.query.pageNo?this.$route.query.pageNo:0
      },
      grainVarietyList: "",
      grainOilLevelList: "",
      grainNatureList: "",
      allChecked: false,
      priceIdList: [],
      listData: [],
    };
  },
  methods: {
    getList: function(pageNo) {
      //获取列表
      var vm = this;
      vm.postData.pageNo = pageNo;
      layer.load(2);
      priceList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.priceList;
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
        vm.priceIdList = [];
        vm.priceIdList.push(id);
      } else {
        if (vm.priceIdList.length == 0) {
          layer.msg("请至少选择一条数据！");
          return;
        }
      }
      layer.confirm('确定删除？', {
        btn: ['确定','取消'] //按钮
      }, function(){
      layer.load(2);
      var delstr = vm.priceIdList.join(",");
      priceDel({ priceIdList: delstr })
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("删除成功！");
            vm.priceIdList = [];
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
    getDropDown: function() {
      //获取下拉项
      var vm = this;
      grainVariety({})
        .then(ret => {
          //粮食品种
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret));
            vm.grainVarietyList = ret.data.grainVarietyList;

          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
      grainOilLevel({})
        .then(ret => {
          //粮油等级
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret));
            vm.grainOilLevelList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
      grainNature({})
        .then(ret => {
          //库存性质
          if (ret.code == 200) {
            vm.grainNatureList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    checkAll: function() {
      //全选
      var vm = this;
      if (vm.allChecked) {
        for (var i = 0; i < vm.listData.length; i++) {
          vm.priceIdList.push(vm.listData[i].priceId);
        }
      } else {
        vm.priceIdList = [];
      }
    },
    clickChange: function() {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (vm.priceIdList.length == vm.listData.length) {
        vm.allChecked = true;
      } else {
        vm.allChecked = false;
      }
    },
    jumpDetail: function(id) {
      //跳转到详情
      var vm = this;
      this.$router.push({
        name: "priceManageDetail",
        query: {
          id: id,
          //新增
          grainVarietyId:vm.postData.grainVarietyId,
          grainAttributeId:vm.postData.grainAttributeId,
          grainLevelId:vm.postData.grainLevelId,
          pageNo:vm.postData.pageNo
        }
      });
    },
    jumpEdit: function(id) {
      //跳转到编辑或新增页面
      var vm = this;
      this.$router.push({
        name: "priceManageEdit",
        query: {
          id: id,
          //新增
          grainVarietyId:vm.postData.grainVarietyId,
          grainAttributeId:vm.postData.grainAttributeId,
          grainLevelId:vm.postData.grainLevelId,
          pageNo:vm.postData.pageNo
        }
      });
    }
  },
  mounted() {
    this.getList(this.postData.pageNo);
    this.getDropDown();
  }
};
</script>
