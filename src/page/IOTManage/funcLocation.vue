<template>
  <div class="content">
    <div class="videoRetrieval">
      <div class="lookup">
        名称：
        <input type="text" class="input-text excision" v-model="postData.funcPositionName">
        编号：
        <input type="text" class="input-text excision" v-model="postData.funcPositionCode">
        仓房：
        <select class="select-style excision" v-model="postData.storehouseGbCode"  @change="getGranary(postData.storehouseGbCode);">
            <option value=''>请选择</option>
            <option :value="item.storehouseGbCode" v-for="item in storehouseList" v-text="item.storehouseName"></option>
        </select>
        廒间：
        <select class="select-style excision" v-model="postData.warehouseGbCode">
            <option value=''>请选择</option>
            <option :value="item.warehouseGbCode" v-for="item in granaryList" v-text="item.warehouseName"></option>
        </select>

        <div class="btn btn-add" @click="getList(0);">
          <img src="../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div>
        <div class="btn btn-add" @click="showPopup();">
          <img src="../../../static/images/add.png" alt="">
          <label>新增</label>
        </div>
        <div class="btn btn-del" @click="delData();">
            <img src="../../../static/images/del.png" alt="">
            <label>删除</label>
        </div>
        <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value="">排序方式</option>
          <option value="0">顺序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
          <tr>
            <th style="width:5%;"><input type="checkbox" v-model="allChecked" @change="checkAll();"></th>
            <th style="width:5%;">序号</th>
            <th style="width:15%;">功能位置名称</th>
            <th style="width:15%;">功能位置编号</th>
            <th style="width:15%;">位置类型</th>
            <th style="width:15%;">位置名称</th>
            <th style="width:30%;">操作</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(item,i) in listData">
                <td><input type="checkbox" :value="item.funcPositionCode" v-model="funcPositionCodeList" @change="clickChange();"></td>
                <td v-if="sortOrder=='0'" v-text="i+1"></td>
                <td v-else v-text="listData.length-i"></td>
                <td>{{item.funcPositionName}}</td>
                <td>{{item.funcPositionCode}}</td>
                <td>{{item.positionType}}</td>
                <td>{{item.storehouseName}}{{item.warehouseName}}</td>
                <td>
                  <div class="table-btn btn-yellow" @click="showPopup(item.funcPositionCode,'detail');">详情</div>
                  <div class="table-btn btn-red" @click="delData(item.funcPositionCode);">删除</div>
                </td>
            </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar"></div>
    </div>
        <!-- 选择来文弹出层 -->
        <div class="popup" :style="editPopup==1?'display:block;':''">
            <div class="popup-main IOTType-popup">
                <div class="popup-title">
                    <label>新增功能位置</label>
                    <em class="popup-close" @click="closePopup('edit');">×</em>
                </div>
                <div class="popup-content">
                    <p class="text-justify">
                        <label>功能位置名称：</label>
                        <label v-if="showType=='detail'" v-text="submitData.funcPositionName" ></label>
                        <input v-else type="text" v-model="submitData.funcPositionName" >
                    </p>
                    <p class="text-justify">
                        <label>功能位置编号：</label>
                        <label v-if="showType=='detail'" v-text="submitData.funcPositionCode" ></label>
                        <input v-else type="text" v-model="submitData.funcPositionCode">
                    </p>
                    <p class="text-justify">
                        <label>位置类型：</label>
                        <select v-if="showType=='detail'" class="newselect-style" disabled="disabled" v-model="submitData.positionType">
                          <option value="仓内">仓内</option>
                          <option value="仓外">仓外</option>
                        </select>
                        <select v-else class="newselect-style" v-model="submitData.positionType">
                          <option value="仓内">仓内</option>
                          <option value="仓外">仓外</option>
                        </select>
                    </p>
                    <div class="text-justify">
                        <label>位置名称：</label>
                        <div>
                            <label>仓房：</label>
                            <select v-if="showType=='detail'" disabled="disabled" class="select-style cangku" v-model="submitData.storehouseGbCode"  @change="getGranary(submitData.storehouseGbCode);">
                              <option :value="item.storehouseGbCode" v-for="(item,i) in storehouseList">{{item.storehouseName}}</option>
                            </select>
                            <select  v-else class="select-style cangku" v-model="submitData.storehouseGbCode"  @change="getGranary(submitData.storehouseGbCode);">
                              <option :value="item.storehouseGbCode" v-for="(item,i) in storehouseList">{{item.storehouseName}}</option>
                            </select>
                            <label>廒间：</label>
                            <select  v-if="showType=='detail'" disabled="disabled"  class="select-style aojian" v-model="submitData.warehouseGbCode">
                               <option :value="item.warehouseGbCode" v-for="(item,i) in granaryList">{{item.warehouseName}}</option>
                            </select>
                            <select v-else class="select-style aojian" v-model="submitData.warehouseGbCode">
                               <option :value="item.warehouseGbCode" v-for="(item,i) in granaryList">{{item.warehouseName}}</option>
                            </select>
                            <label>方向：</label>
                            <select v-if="showType=='detail'" disabled="disabled" class="select-style" v-model="submitData.direction">
                              <option value ="无">无</option>
                              <option value ="东">东</option>
                              <option value ="西">西</option>
                              <option value ="南">南</option>
                              <option value ="北">北</option>
                              <option value ="东南">东南</option>
                              <option value ="西南">西南</option>
                              <option value ="西北">西北</option>
                              <option value ="东北">东北</option>
                            </select> 
                            <select v-else class="select-style" v-model="submitData.direction">
                              <option value ="无">无</option>
                              <option value ="东">东</option>
                              <option value ="西">西</option>
                              <option value ="南">南</option>
                              <option value ="北">北</option>
                              <option value ="东南">东南</option>
                              <option value ="西南">西南</option>
                              <option value ="西北">西北</option>
                              <option value ="东北">东北</option>
                            </select> 
                        </div>
                    </div>
                    <p class="text-justify">
                        <label>位置描述：</label>
                        <label v-if="showType=='detail'" v-text="submitData.positionDesc" ></label>
                        <input v-else type="text" v-model="submitData.positionDesc">
                    </p>
                </div>
                <div>
                    <button v-if="showType==''" class="query" @click="submitEvent('edit');">确定</button>
                </div>
            </div>
        </div>
  </div>
</template>
<style type="text/css" scoped>
    .IOTType-popup{
      width: 600px;
      height: 400px;
    }
    .popup-content p input{
      width: 420px;
    }
    .popup-content .text-justify label{
      display: inline-block;
      vertical-align: middle;
      font-size: .875rem;
      text-align: center;
      text-align-last: initial;
    }
    .text-justify div{
      display: inline-block;
      width: 440px;
    }
    .text-justify div .select-style{
      width: 90px;
    }
    .newselect-style{
      width:440px;
      height: 2rem;
      vertical-align: middle;
      border-radius: .25rem;
      border: 1px solid rgba(185,185,185,1);
      box-sizing: border-box;
      padding-left: 8px;
    }
</style>
<script>
import { graindepot, storehouse, granary, cargo} from "@/api/systemManage/dropDown";  
import { locationInfo,addlocationInfo,deltlocationInfo,querylocationInfo} from "@/api/IOT/iot.js";  

export default {
  name: "document",
  data() {
    return {
      sortOrder: "0", //0 顺序，1 倒序
      requestData:'',
      postData: {
        funcPositionName:"",
        funcPositionCode:"",
        storehouseGbCode:"",
        warehouseGbCode:"",
        pageSize:10,
        pageNo:1
      },
      showType:'',//是新增还是详情
      submitData:{
        funcPositionName:'',
        funcPositionCode:'',
        positionType:'仓内',
        warehouseGbCode:'',
        storehouseGbCode:'',
        direction:'无',
        positionDesc:''
      },
      inventoryPropertyList: "",
      allChecked: false,
      funcPositionCodeList: [],
      detailData:'',
      listData: [],
      storehouseList:[],//仓房下拉列表
      granaryList:[],//廒间下拉列表
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
      vm.postData.pageNo = pageNo;
      layer.load(2);
      locationInfo(vm.postData)
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
        vm.funcPositionCodeList = [];
        vm.funcPositionCodeList.push(id);
      } else {
        if (vm.funcPositionCodeList.length == 0) {
          layer.msg("请至少选择一条数据！");
          return;
        }
      }
      layer.confirm('确定删除？', {
        btn: ['确定','取消'] //按钮
      }, function(){
      layer.load(2);
      var delstr = vm.funcPositionCodeList.join(",");
      deltlocationInfo({ funcPositionCodeList: delstr })
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("删除成功！");
            vm.funcPositionCodeList = [];
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
          vm.funcPositionCodeList.push(vm.listData[i].funcPositionCode);
        }
      } else {
        vm.funcPositionCodeList = [];
      }
    },
    clickChange: function() {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (vm.funcPositionCodeList.length == vm.listData.length) {
        vm.allChecked = true;
      } else {
        vm.allChecked = false;
      }
    },
    getDetail: function(id) {
      var vm = this;
      layer.load(2);
      querylocationInfo({funcPositionCode:id})
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
              vm.submitData.funcPositionName = ret.data.funcPosition.funcPositionName;
              vm.submitData.funcPositionCode = ret.data.funcPosition.funcPositionCode;
              vm.submitData.positionType = ret.data.funcPosition.positionType;
              vm.submitData.warehouseGbCode = ret.data.funcPosition.warehouseGbCode;
              vm.submitData.storehouseGbCode = ret.data.funcPosition.storehouseGbCode;
              vm.getGranary(ret.data.funcPosition.storehouseGbCode);
              vm.submitData.direction = ret.data.funcPosition.direction;
              vm.submitData.positionDesc = ret.data.funcPosition.positionDesc;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    showPopup: function(id) {// 展示弹出层
        var vm = this;
        vm.granaryList=[];
        if (id) {
            vm.showType='detail';
            vm.getDetail(id);
        }
        vm.editPopup = 1;

    },
    closePopup: function() {// 隐藏弹出层
        var vm = this;
        vm.editPopup = 0;
        vm.showType='';
        vm.submitData={
          funcPositionName:"",
          funcPositionCode:"",
          positionType:"仓内",
          warehouseGbCode:"",
          storehouseGbCode:'',
          direction:"无",
          positionDesc:""
        }
    },
    submitEvent:function(){//添加提交
        var vm=this;

        if (vm.submitData.funcPositionName == "") {
          layer.msg("请填写库点功能位置名称");
          return;
        }
        if (vm.submitData.funcPositionCode == "") {
          layer.msg("请填写库点功能位置编号");
          return;
        }
        if (vm.submitData.positionType == "") {
          layer.msg("请选择位置类型");
          return;
        }
        if (vm.submitData.warehouseGbCode == "") {
          layer.msg("请选择廒间");
          return;
        }
        if (vm.submitData.direction == "") {
          layer.msg("请选择方向");
          return;
        }
        if (vm.submitData.positionDesc == "") {
          layer.msg("请填写位置描述");
          return;
        }
        addlocationInfo(vm.submitData).then(ret =>{
          if(ret.code == 200){
              layer.msg("添加成功!");
              vm.getList(1);
              vm.closePopup();            
          }else{
              layer.alert(ret.data, { closeBtn: 0 });
          }
        }).catch(err =>{
            layer.alert(err.message, { closeBtn: 0 });
        })
    },
    getStorehouse:function () {//仓房
      var vm = this;
      layer.load(2);
      storehouse()
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.storehouseList = ret.data.dataList;
          } else {
            if (ret.code == 500&&ret.data=='查询错误，没有数据') {
                vm.storehouseList=[];
            }else{
                layer.alert(ret.data, { closeBtn: 0 });
            }
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
        
    },
    getGranary:function (id) {//廒间下拉列表
      var vm = this;
      layer.load(2);
      granary(id).then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.granaryList = ret.data.dataList;
          } else {
            if (ret.code == 500&&ret.data=='查询错误，没有数据') {
                vm.granaryList=[];
            }else{
                layer.alert(ret.data, { closeBtn: 0 });
            }
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
        
    },
  },
  mounted() {
    var vm=this;
    vm.getList(1);
    vm.getStorehouse();
  }
};

</script>
