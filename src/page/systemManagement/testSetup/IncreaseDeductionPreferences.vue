<template>
    <div class="content">
        <div class="menuManage operationLog">
            <div class="lookup">
                品  &nbsp; &nbsp; &nbsp;  种：
                <div class="grainVariety excision">
                    <treeselect v-model="postData.grainVarietyId" :multiple="false" :options="grainVarietyList" />
                </div>
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
                        <th style="width: 5%;"><input type="checkbox" v-model="allChecked" @change="checkAll();"></th>
                        <th style="width: 5%;">序号</th>
                        <th style="width: 10%;">品种</th>
                        <th style="width: 10%;">增扣项目</th>
                        <th style="width: 10%;">指标值</th>
                        <th style="width: 10%;">低于</th>
                        <th style="width: 10%;">低于处理</th>
                        <th style="width: 10%;">高于</th>
                        <th style="width: 10%;">高于处理</th>
                        <th style="width: 20%;">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in listData">
                        <td><input type="checkbox" :value="item.id" v-model="delList.id" @change="clickChange();"></td>
                        <td v-text="i+1"></td>
                        <td v-text="item.grainVarietyName"></td>
                        <td v-text="item.increaseDecreaseItemValue"></td>
                        <td v-text="item.standardValue"></td>
                        <td v-text="item.lowerValue"></td>
                        <td v-text="item.lowerValueProcess"></td>
                        <td v-text="item.upperValue"></td>
                        <td v-text="item.upperValueProcess"></td>
                        <td>
                            <div class="table-btn btn-green" @click="showPopup(item.id);">编辑</div>
                            <div class="table-btn btn-red" @click="delData(item.id);">删除</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- 分页容器 -->
            <div id="PageBar"></div>
        </div>
            <!-- 弹出层 -->
            <div class="popup" :style="editPopup==1?'display:block;':''">
                <div class="popup-main menuPopup-edit-main">
                    <div class="popup-title">
                        <label v-text="popupTitle"></label>
                        <em class="popup-close" @click="closePopup();">×</em>
                    </div>
                    <div class="popup-content">
                        <div class="text-justify">
                            <label>粮食品种:</label>
                            <div class="edit-grainVariety" style="width: 70%;display: inline-block;text-align: left;text-align-last: left;">
                              <treeselect v-model="submitData.grainVarietyId" :multiple="false" :options="grainVarietyList" />
                            </div>
                        </div>
                        <p class="text-justify">
                            <label>增扣项目:</label>

                                <select name="" class="select-style" style="padding: 0 .625rem;box-sizing: inherit;height: 2.25rem;" v-model="submitData.increaseDecreaseItem">
                                    <option v-for="item in indicatorList" :value="item.indicatorId" v-text="item.indicatorName"></option>
                                </select>
                        </p>
                        <p class="text-justify">
                            <label>指标值:</label>
                            <input type="number" v-model="submitData.standardValue">
                        </p>
                        <p class="text-justify">
                            <label>低于:</label>
                            <input type="number" v-model="submitData.lowerValue">
                        </p>
                        <p class="text-justify">
                            <label>低于处理:</label>
                            <input type="number" v-model="submitData.lowerValueProcess">
                        </p>
                        <p class="text-justify">
                            <label>最低值:</label>
                            <input type="number" v-model="submitData.minValue">
                        </p>
                        <p class="text-justify">
                            <label>高于:</label>
                            <input type="number" v-model="submitData.upperValue">
                        </p>
                        <p class="text-justify">
                            <label>高于处理:</label>
                            <input type="number" v-model="submitData.upperValueProcess">
                        </p>
                        <p class="text-justify">
                            <label>最高值:</label>
                            <input type="number" v-model="submitData.maxValue">
                        </p>
                    </div>
                    <div>
                        <button class="query" @click="submitEvent();">确定</button>
                    </div>
                </div>
            </div>
    </div>
</template>

<style type="text/css" scoped >
  .menuPopup-edit-main{
    height: 44rem;
  }
</style>
<script>

  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import {
  deductionQuantityList,deductionQuantityDel,deductionQuantityDetail,deductionQuantityNew,deductionQuantityEdit
} from "@/api/systemManage/basicData/testSetup";
import { grainVariety, grainNature,indicator } from "@/api/systemManage/dropDown";
export default {
  name: "testSetup",
  components: { Treeselect },
  data() {
    return {
      type:'',
      postData: {
        grainVarietyId: null,
        inventoryPropertyId: "",
        pageSize: 10,
        pageNo: 0
      },
      allChecked: false,
      delList: {
        id: []
      },
      submitData:{
          grainVarietyId:null,
          increaseDecreaseItem:'',
          standardValue:'',
          lowerValue:'',
          lowerValueProcess:'',
          upperValue:'',
          upperValueProcess:'',
          minValue:'',
          maxValue:'',
          memo:'',
          id:''
      },
      listData: [],
      grainVarietyList: [],
      indicatorList:[],
      grainNatureList: "",
      editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
      popupTitle:'新增增扣量'
    };
  },
  methods: {
    getList: function(pageNo) {
      //获取列表
      var vm = this;
      vm.postData.pageNo = pageNo;
      layer.load(2);
      deductionQuantityList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.increaseDecreaseConfigList;
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
    getDetail:function (id) {
      var vm=this;
      deductionQuantityDetail({ id: id })
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.submitData.grainVarietyId=ret.data.increaseDecreaseConfigDetail.grainVarietyId;
              vm.submitData.increaseDecreaseItem=ret.data.increaseDecreaseConfigDetail.increaseDecreaseItem;
              vm.submitData.standardValue=ret.data.increaseDecreaseConfigDetail.standardValue;
              vm.submitData.lowerValue=ret.data.increaseDecreaseConfigDetail.lowerValue;
              vm.submitData.lowerValueProcess=ret.data.increaseDecreaseConfigDetail.lowerValueProcess;
              vm.submitData.upperValue=ret.data.increaseDecreaseConfigDetail.upperValue;
              vm.submitData.upperValueProcess=ret.data.increaseDecreaseConfigDetail.upperValueProcess;
              vm.submitData.minValue=ret.data.increaseDecreaseConfigDetail.minValue;
              vm.submitData.maxValue=ret.data.increaseDecreaseConfigDetail.maxValue;
              vm.submitData.id=ret.data.increaseDecreaseConfigDetail.id;
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });

    },
    submitEvent:function () {
      var vm=this;

      if (vm.submitData.indicatorName == "") {
        layer.msg("请填写指标项");
        return;
      }
      if (vm.submitData.indicatorType == "") {
        layer.msg("请填写指标分类");
        return;
      }
      if (vm.submitData.indicatorId == "") {
        layer.msg("请填写编码");
        return;
      }
      if (vm.type=='edit') {

        deductionQuantityEdit(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("编辑成功！");
              vm.postData.pageNo = 0;
              vm.getList(0);
              vm.closePopup();
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      }else{

          deductionQuantityNew(vm.submitData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("新增成功！");
                vm.postData.pageNo = 0;
                vm.getList(0);
                vm.closePopup();
              } else {
                layer.alert(ret.data, { closeBtn: 0 });
              }
            })
            .catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
            });
        }
    },
    showPopup: function(id) {
      // 展示弹出层
      var vm = this;
          vm.editPopup = 1;
          if (id) {
            vm.type='edit';
            vm.getDetail(id);
            vm.popupTitle='编辑增扣量';
          }else{
            vm.type='add';
            vm.popupTitle='新增增扣量';
          }
    },
    closePopup: function() {
      // 隐藏弹出层
      var vm = this;
          vm.editPopup = 0;

              vm.submitData.grainVarietyId=null;
              vm.submitData.increaseDecreaseItem='';
              vm.submitData.standardValue='';
              vm.submitData.lowerValue='';
              vm.submitData.lowerValueProcess='';
              vm.submitData.upperValue='';
              vm.submitData.upperValueProcess='';
              vm.submitData.minValue='';
              vm.submitData.maxValue='';
              vm.submitData.id='';
    },
    delData: function(id) {
      //删除
      var vm = this;
      if (id) {
        vm.delList.id = [];
        vm.delList.id.push(id);
      } else {
        if (vm.delList.id.length == []) {
          layer.msg("请选择一条数据！");
          return;
        }
        if (vm.delList.id.length>1) {
          layer.msg("只能选择一条数据！");
          return;
        }
      }
      layer.confirm('确定删除？', {
        btn: ['确定','取消'] //按钮
      }, function(){
      layer.load(2);
      var delstr = vm.delList.id.join(",");
      deductionQuantityDel({ id: delstr })
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
    getDropDown: function() {
      //获取下拉项
      var vm = this;
      grainVariety({})
        .then(ret => {
          //粮食品种
          if (ret.code == 200) {
            console.log(JSON.stringify(ret));
            vm.grainVarietyList = ret.data.grainVarietyList;
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
      indicator({indicatorType:1})
        .then(ret => {//指标项
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.indicatorList = ret.data.indicatorList;
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
          vm.delList.id.push(vm.listData[i].id);
        }
      } else {
        vm.delList.id = [];
      }
    },
    clickChange: function() {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (vm.delList.id.length == vm.listData.length) {
        vm.allChecked = true;
      } else {
        vm.allChecked = false;
      }
    }
  },
  mounted() {
    var vm = this;
    vm.getList(0);
    vm.getDropDown();
  }
};
</script>
