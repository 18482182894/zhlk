<template>
    <div class="content">
        <div class="menuManage operationLog warehouse">
            <!--<div>-->
                <!--<div class="btn btn-add" @click="getList(1);">-->
                    <!--<img src="../../../../../static/images/search.png" alt="">-->
                    <!--<label>查找</label>-->
                <!--</div>-->
            <!--</div>-->
            <div class="lookup">
                仓房名称：
                <input type="text" class="input-text excision" v-model="postData.storehouseName">
                仓房编号：
                <input type="text" class="input-text excision" v-model="postData.storehouseGbCode">
                <!-- 省 份：
                <input type="text" class="input-text excision" v-model="postData.provice">
                城 市：
                <input type="text" class="input-text excision" v-model="postData.city"> -->

                <div class="btn btn-add " @click="getList(1);">
                  <img src="../../../../../static/images/search.png" alt="">
                  <label>查找</label>
                </div>

            </div>
            <div>
                <div class="btn btn-add" @click="jumpEdit('','');">
                    <img src="../../../../../static/images/add.png" alt="">
                    <label>新增</label>
                </div>
                <div class="btn btn-del" @click="delData();">
                    <img src="../../../../../static/images/del.png" alt="">
                    <label>删除</label>
                </div>
                <!-- <select name="" class="select-style">
                    <option value="">显示条数</option>
                </select> -->
                <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
                    <option value="">排序方式</option>
                    <option value="0">正序</option>
                    <option value="1">倒序</option>
                </select>
            </div>
            <table class="customTable">
                <thead>
                    <tr>
                        <th><input type="checkbox" v-model="allChecked" @change="checkAll();"></th>
                        <th>序号</th>
                        <th>仓房名称</th>
                        <th>仓房编码</th>
                        <th>仓房类型</th>
                        <th>仓房状态</th>
                        <th>主要业务</th>
                        <th>储量方式</th>
                        <th>使用情况</th>
                        <th>储存类型</th>
                        <th style="width:5%;">编辑状态</th>
                        <th style="width:7.5%;">审核状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in listData">
                        <td><input type="checkbox" :value="item.storehouseGbCode" v-model="delList.storehouseIdList" @change="clickChange();"></td>
                        <td v-if="sortOrder=='0'" v-text="i+1"></td>
                        <td v-else v-text="listData.length-i"></td>
                        <td v-text="item.storehouseName"></td>
                        <td v-text="item.storehouseGbCode"></td>
                        <td v-text="item.storehouseType"></td>
                        <td v-text="item.storehouseState"></td>
                        <td v-text="item.primaryService"></td>
                        <td v-text="item.storeWay==1?'散装':'包装'"></td>
                        <td v-text="item.useType"></td>
                        <td v-text="item.storagetype"></td>
                        <td v-text="item.draftStatus==0?'草稿':'正式文档'"></td>
                        <td>
                          <label v-if="item.auditState==0" class="fc-red">审核不通过</label>
                          <label v-if="item.auditState==10">未审核</label>
                          <label v-if="item.auditState==11" class="fc-green">审核中</label>
                          <label v-if="item.auditState==99" class="fc-green">审核通过</label>
                        </td>
                        <td>
                            <div class="table-btn btn-yellow" @click="jumpDetail(item.storehouseGbCode);">详情</div>
                            <div class="table-btn btn-green" @click="jumpEdit(item.storehouseGbCode,'edit');" v-if="item.draftStatus==0">编辑</div>
                            <div class="table-btn btn-change" v-if="item.auditState==99" @click="jumpEdit(item.storehouseGbCode,'change');">信息变更</div>
                            <div class="table-btn btn-submit" @click="submitAudit(item.storehouseGbCode);" v-if="item.draftStatus==0">提交审核</div>
                            <div class="table-btn btn-again" v-if="item.auditState==0" @click="jumpEdit(item.storehouseGbCode,'add');">再次申请</div>
                            <div class="table-btn btn-red" @click="delData(item.storehouseGbCode);" v-if="item.draftStatus==0">删除</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- 分页容器 -->
            <div id="PageBar"></div>
          <div class="detail-back">
            <button @click="detailBack()">返回</button>
          </div>
        </div>
    </div>
</template>

<script>
import {
  warehouseList,
  warehouseDel,
  warehouseTypeDropdown,
  warehouseApproval
} from "@/api/systemManage/basicData/warehouse";
export default {
  name: "desktop",
  data() {
    return {
      postData: {
        storehouseGbCode:this.$route.query.storehouseGbCode?this.$route.query.storehouseGbCode:"",
        storehouseName:this.$route.query.storehouseName?this.$route.query.storehouseName:"",
       /*
        graindepotTypeId: "",*/
        pageSize: 10,
        pageNo: this.$route.query.pageNo?this.$route.query.pageNo:0
      /*  pageNo: 0*/
      },
      allChecked: false,
      sortOrder: "0", //0 顺序，1 倒序
      delList: {
        storehouseIdList: []
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
      warehouseList(vm.postData)
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
    changeSortOrder: function() {
      var vm = this;
      vm.listData.reverse();
    },
    delData: function(id) {
      //删除
      var vm = this;
      if (id) {
        vm.delList.storehouseIdList = [];
        vm.delList.storehouseIdList.push(id);
      } else {
        if (vm.delList.storehouseIdList.length == []) {
          layer.msg("请至少选择一条数据！");
          return;
        }
      }
      layer.confirm('确定删除？', {
        btn: ['确定','取消'] //按钮
      }, function(){
      layer.load(2);
      var delStr = vm.delList.storehouseIdList.join();
      warehouseDel({ storehouseIdList: delStr })
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("删除成功！");
            vm.delList.storehouseIdList = [];
            vm.getList(1);
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
          vm.delList.storehouseIdList.push(vm.listData[i].storehouseGbCode);
        }
      } else {
        vm.delList.storehouseIdList = [];
      }
    },
    clickChange: function() {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (vm.delList.storehouseIdList.length == vm.listData.length) {
        vm.allChecked = true;
      } else {
        vm.allChecked = false;
      }
    },
    submitAudit: function(id) {
      //提交审核
      var vm = this;
      warehouseApproval({ storehouseGbCode: id })
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("提交成功！");
            vm.getList(1);
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    jumpEdit: function(id,type) {
      var vm = this;
      this.$router.push({
        name: "warehouseEdit",
        query: {
          id: id,
          type:type,
          //下面新增
          storehouseGbCode:vm.postData.storehouseGbCode,
          storehouseName:vm.postData.storehouseName,
          pageNo: vm.postData.pageNo
        }
      });
    },
    jumpDetail: function(id) {
      var vm = this;
      this.$router.push({
        name: "warehouseDetail",
        query: {
          id: id,
      //下面新增
          storehouseGbCode:vm.postData.storehouseGbCode,
          storehouseName:vm.postData.storehouseName,
          pageNo: vm.postData.pageNo
        }
      });
    },
    detailBack: function() {
      this.$router.push({
        name: "basicDataMain"
      });
    }
  },
  mounted() {
    var vm = this;
    vm.getList(vm.postData.pageNo);
  }
};
</script>
