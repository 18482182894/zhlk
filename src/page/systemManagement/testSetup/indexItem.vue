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
                指标分类：
                <select name="" class="select-style excision" v-model="postData.indicatorType" >
                    <option value="1" >质量指标</option>
                    <option value="2" >存储品质指标</option>
                </select>
                指标项：
                <input type="text" class="input-text excision" v-model="postData.indicatorName">
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
                <!-- <div class="btn btn-del" @click="delData();">
                    <img src="../../../../static/images/del.png" alt="">
                    <label>删除</label>
                </div> -->
            </div>
            <table class="customTable">
                <thead>
                    <tr>
                        <th style="width:10%;"><input type="checkbox" ></th>
                        <th style="width:10%;">序号</th>
                        <th style="width: 30%;">指标分类</th>
                        <th style="width: 20%;">指标项</th>
                        <th style="width: 30%;">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in listData">
                        <td><input type="checkbox" ></td>
                        <td v-text="i+1"></td>
                        <td v-text="item.indicatorType==1?'质量指标':'存储品质指标'"></td>
                        <td v-text="item.indicatorName"></td>
                        <td>
                            <div class="table-btn btn-green" @click="showPopup(item.indicatorId,item.indicatorType);">编辑</div>
                            <div class="table-btn btn-red" @click="delData(item.indicatorId,item.indicatorType);">删除</div>
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
                        <label>新增指标项</label>
                        <em class="popup-close" @click="closePopup();">×</em>
                    </div>
                    <div class="popup-content">
                        <p class="text-justify">
                            <label>指标分类:</label>
                            <select name="" class="select-style" v-model="submitData.indicatorType" >
                                <option value="1" >质量指标</option>
                                <option value="2" >存储品质指标</option>
                            </select>
                        </p>
                        <p class="text-justify">
                            <label>指标项:</label>
                            <input type="text" v-model="submitData.indicatorName" >
                                <!-- <select name="" class="select-style" v-model="submitData.indicatorId">
                                    <option v-for="item in indicatorList" :value="item.indicatorId" v-text="item.indicatorName"></option>
                                </select> -->
                        </p>
                        <p class="text-justify" >
                            <label>编码标准:</label>
                            <input type="text" v-model="submitData.indicatorId" v-if="type=='edit'" disabled="disabled">
                            <input type="text" v-model="submitData.indicatorId" v-else>
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
import {
  indexItemList,indexItemDel,indexItemDetail,indexItemNew,indexItemEdit
} from "@/api/systemManage/basicData/testSetup";
import { grainVariety, inventoryProperty } from "@/api/systemManage/dropDown";
export default {
  name: "testSetup",
  data() {
    return {
      postData: {
        indicatorType: "",
        indicatorName: "",
        pageSize: 10,
        pageNo: 0
      },
      allChecked: false,
      submitData:{
        indicatorId:'',
        indicatorName:'',
        indicatorType:'',
        memo:''
      },
      type:'',
      listData: [],
      grainVarietyList: [],
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
      indexItemList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            console.log(JSON.stringify(ret))
            vm.listData = ret.data.indicatorList;
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
    delData: function(id,type) {
      //删除
      var vm = this;
      layer.confirm('确定删除？', {
        btn: ['确定','取消'] //按钮
      }, function(){
        layer.load(2);
        indexItemDel({  indicatorId: id,indicatorType:type })
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
    getDetail:function (id, type) {
      var vm=this;
      indexItemDetail({ indicatorId: id,indicatorType:type })
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.submitData.indicatorId=ret.data.indicatorDetail.indicatorId;
              vm.submitData.indicatorName=ret.data.indicatorDetail.indicatorName;
              vm.submitData.indicatorType=ret.data.indicatorDetail.indicatorType;
              // vm.submitData.memo=ret.data.indicatorDetail.memo;
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

        indexItemEdit(vm.submitData)
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

          indexItemNew(vm.submitData)
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
    showPopup: function(id,type) {
      // 展示弹出层
      var vm = this;
          vm.editPopup = 1;
          if (id) {
            vm.type='edit';
            vm.getDetail(id,type);
          }else{
            vm.type='add';
          }
    },
    closePopup: function() {
      // 隐藏弹出层
      var vm = this;
          vm.editPopup = 0;
          vm.submitData.indicatorId='';
          vm.submitData.indicatorName='';
          vm.submitData.indicatorType='';
    },
    getDropDown: function() {
      //获取下拉项
      var vm = this;
      inventoryProperty({})
        .then(ret => {
          //库存性质
          if (ret.code == 200) {
            vm.inventoryPropertyList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    }
  },
  mounted() {
    var vm = this;
    vm.getList(0);
    vm.getDropDown();
  }
};
</script>
