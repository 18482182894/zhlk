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
                        <th style="width: 15%;">品种</th>
                        <th style="width: 15%;">指标项目</th>
                        <th style="width: 10%;">宜存</th>
                        <th style="width: 15%;">不宜存</th>
                        <th style="width: 10%;">陈化</th>
                        <th style="width: 20%;">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in listData">
                        <td><input type="checkbox" :value="item.id" v-model="delList.storageIndicatorList" @change="clickChange();"></td>
                        <td v-text="i+1"></td>
                        <td v-text="item.grainVarietyName"></td>
                        <td v-text="item.indicatorName"></td>
                        <td v-text="item.storagable"></td>
                        <td v-text="item.unstoragable"></td>
                        <td v-text="item.ageing"></td>
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
                        <label v-text="type=='edit'?'编辑存储指标':'新增存储指标'"></label>
                        <em class="popup-close" @click="closePopup();">×</em>
                    </div>
                    <div class="popup-content">
                        <div class="text-justify">
                            <label>粮食品种:</label>
                            <div class="edit-grainVariety" style="width: 85%;display: inline-block;text-align: left;text-align-last: left;">
                              <treeselect v-model="submitData.grainVarietyId" :multiple="false" :options="grainVarietyList" />
                            </div>
                        </div>
                        <p class="text-justify">
                            <label>指标项目:</label>
                            <input type="text" v-model="submitData.indicatorName">
                        </p>
                        <div class="text-justify">
                            <label>宜存:</label>
                            <div>
                                <select class="config" v-model="submitData.storagableFlag">
                                  <option value=">">></option>
                                  <option value=">=">>=</option>
                                  <option value="<"><</option>
                                  <option value="<="><=</option>
                                </select>
                                <input type="text" v-model="submitData.storagableValue">
                            </div>
                        </div>
                        <div class="text-justify">
                            <label>不宜存:</label>
                            <div>
                                <select class="config"  v-model="submitData.unstoragableStartFlag">
                                  <option value=">">></option>
                                  <option value=">=">>=</option>
                                  <option value="<"><</option>
                                  <option value="<="><=</option>
                                </select>
                                <input type="text" style="width:16%;"  v-model="submitData.unstoragableStartValue">~
                                <select class="config"  v-model="submitData.unstoragableEndFlag">
                                  <option value=">">></option>
                                  <option value=">=">>=</option>
                                  <option value="<"><</option>
                                  <option value="<="><=</option>
                                </select>
                                <input type="text" style="width:16%;"  v-model="submitData.unstoragableEndValue">
                            </div>
                        </div>
                        <div class="text-justify">
                            <label>陈化:</label>
                            <div>
                                <select class="config"  v-model="submitData.agingFlag">
                                  <option value=">">></option>
                                  <option value=">=">>=</option>
                                  <option value="<"><</option>
                                  <option value="<="><=</option>
                                </select>
                                <input type="text"  v-model="submitData.ageingValue">
                            </div>
                        </div>
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
    width: 35rem;
    height: 30rem;
  }
  .popup-content .text-justify label{
    display: inline-block;
    vertical-align: middle;
    font-size: .875rem;
    text-align: center;
    text-align-last: initial;
  }
  .popup-content .text-justify input{
    display: inline-block;
    vertical-align: middle;
    font-size: .875rem;
    width: 80%;
    height: 2.25rem;
    border-radius: .25rem;
    border: 1px solid #B9B9B9;
    background: none;
    padding: 0 .625rem;
  }
  .popup-content div.text-justify input{
    width: 70%
  }
  .text-justify{
    display: flex;
    height: 3.75rem;
    justify-content: space-between;
    align-items: center;
  }
  .text-justify>div{
    width: 85%;
  }
  .text-justify .config{
    display: inline-block;
    vertical-align: middle;
    font-size: .875rem;
    width: 20%;
    height: 2.25rem;
    border-radius: .25rem;
    border: 1px solid #B9B9B9;
    background: #EEEEEE;
    padding: 0 .2rem;

  }
</style>
<script>

  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import {
  storageIndexList,
  storageIndexDel,storageIndexDetail,storageIndexNew,storageIndexEdit
} from "@/api/systemManage/basicData/testSetup";
import { grainVariety, indicator } from "@/api/systemManage/dropDown";
export default {
  name: "testSetup",
  components: { Treeselect },
  data() {
    return {
      type:'',
      postData: {
        grainVarietyId: null,
        pageSize: 10,
        pageNo: 0
      },
      allChecked: false,
      delList: {
        storageIndicatorList: []
      },
      submitData:{
          grainVarietyId:null,
          indicatorName:'',
          storagableFlag:'',
          storagableValue:'',
          unstoragableStartFlag:'',
          unstoragableStartValue:'',
          unstoragableEndFlag:'',
          unstoragableEndValue:'',
          agingFlag:'',
          ageingValue:'',
          id:''
      },
      listData: [],
      grainVarietyList: [],
      indicatorList:[],
      inventoryPropertyList: [],
      editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
    };
  },
  methods: {
    getList: function(pageNo) {
      //获取列表
      var vm = this;
      vm.postData.pageNo = pageNo;
      layer.load(2);
      storageIndexList(vm.postData)
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
    getDetail:function (id) {
      var vm=this;
      storageIndexDetail({ id: id })
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.submitData.grainVarietyId=ret.data.dataMap.grainVarietyId;
              vm.submitData.indicatorName=ret.data.dataMap.indicatorName;
              vm.submitData.storagableFlag=ret.data.dataMap.storagableFlag;
              vm.submitData.storagableValue=ret.data.dataMap.storagableValue;
              vm.submitData.unstoragableStartFlag=ret.data.dataMap.unstoragableStartFlag;
              vm.submitData.unstoragableStartValue=ret.data.dataMap.unstoragableStartValue;
              vm.submitData.unstoragableEndFlag=ret.data.dataMap.unstoragableEndFlag;
              vm.submitData.unstoragableEndValue=ret.data.dataMap.unstoragableEndValue;
              vm.submitData.agingFlag=ret.data.dataMap.agingFlag;
              vm.submitData.ageingValue=ret.data.dataMap.ageingValue;
              vm.submitData.id=ret.data.dataMap.id;
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });

    },
    showPopup: function(id) {
      // 展示弹出层
      var vm = this;
          vm.editPopup = 1;
          if (id) {
            vm.type='edit';
            vm.getDetail(id);
          }else{
            vm.type='add';
          }
    },
    closePopup: function() {
      // 隐藏弹出层
      var vm = this;
          vm.editPopup = 0;
              vm.submitData.grainVarietyId=null;
              vm.submitData.indicatorName=''
              vm.submitData.storagableFlag=''
              vm.submitData.storagableValue=''
              vm.submitData.unstoragableStartFlag=''
              vm.submitData.unstoragableStartValue=''
              vm.submitData.unstoragableEndFlag=''
              vm.submitData.unstoragableEndValue=''
              vm.submitData.agingFlag=''
              vm.submitData.ageingValue=''
              vm.submitData.id=''
    },
    delData: function(id) {
      //删除
      var vm = this;
      if (id) {
        vm.delList.storageIndicatorList = [];
        vm.delList.storageIndicatorList.push(id);
      } else {
        if (vm.delList.storageIndicatorList.length == []) {
          layer.msg("请至少选择一条数据！");
          return;
        }
      }
      layer.confirm('确定删除？', {
        btn: ['确定','取消'] //按钮
      }, function(){
      layer.load(2);
      var delstr = vm.delList.storageIndicatorList.join(",");
      storageIndexDel({ storageIndicatorList: delstr })
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
    submitEvent:function () {
      var vm=this;

      if (vm.submitData.grainVarietyId == null) {
        layer.msg("请选择粮食品种");
        return;
      }
      if (vm.submitData.indicatorName == "") {
        layer.msg("请填写指标项目");
        return;
      }
      if (vm.type=='edit') {

        storageIndexEdit(vm.submitData)
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

          storageIndexNew(vm.submitData)
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
          vm.delList.storageIndicatorList.push(vm.listData[i].id);
        }
      } else {
        vm.delList.storageIndicatorList = [];
      }
    },
    clickChange: function() {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (vm.delList.storageIndicatorList.length == vm.listData.length) {
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
