<template>
    <div class="content">
        <div class="menuManage operationLog ">
            <div class="lookup">
                库点编码：
                <input type="text" class="input-text excision" v-model="postData.graindepotGbCode">
                库点名称：
                <input type="text" class="input-text excision" v-model="postData.graindepotName">
                库点类型：
                <select name="" class="select-style excision" v-model="postData.graindepotTypeId">
                    <option value=''>请选择库点类型</option>
                    <option v-for="item in libraryTypeList" :value="item.graindepotTypeId" v-text="item.graindepotTypeName"></option>
                </select>

                <div class="btn btn-add" @click="getList(0);">
                    <img src="../../../../../static/images/search.png" alt="">
                    <label>查找</label>
                </div>
            </div>
            <div>
                <div class="btn btn-add" @click="jumpEdit('','add');">
                    <img src="../../../../../static/images/add.png" alt="">
                    <label>新增</label>
                </div>
                <div class="btn btn-del" @click="delData();">
                    <img src="../../../../../static/images/del.png" alt="">
                    <label>删除</label>
                </div>
               <!--  <select name="" class="select-style">
                    <option value="">显示条数</option>
                </select> -->
                <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
                    <option value="">排序方式</option>
                    <option value="0">顺序</option>
                    <option value="1">倒序</option>
                </select>
            </div>
            <table class="libraryManage customTable">
                <thead>
                    <tr>
                        <th style="width:5%;"><input type="checkbox" v-model="allChecked" @change="checkAll();" ></th>
                        <th style="width:5%;">序号</th>
                        <th style="width:10%;">库点名称</th>
                        <th style="width:10%;">省份</th>
                        <th style="width:10%;">城市</th>
                        <th style="width:10%;">行政区</th>
                        <th style="width:5%;">法人代表</th>
                        <th style="width:5%;">编辑状态</th>
                        <th style="width:7.5%;">审核状态</th>
                        <th style="width:30%;">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in listData">
                        <td><input type="checkbox" :value="item.graindepotGbCode" v-model="delList.graindepotIdList" @change="clickChange();"></td>
                        <td v-if="sortOrder=='0'" v-text="i+1"></td>
                        <td v-else v-text="listData.length-i"></td>
                        <td v-text="item.graindepotName"></td>
                        <td v-text="item.provinceName"></td>
                        <td v-text="item.cityName"></td>
                        <td v-text="item.countryName"></td>
                        <td v-text="item.corporation"></td>
                        <td v-text="item.draftStatus==0?'草稿':'正式文档'"></td>
                        <td>
                          <label v-if="item.auditState==0" class="fc-red">审核不通过</label>
                          <label v-if="item.auditState==10">未审核</label>
                          <label v-if="item.auditState==11" class="fc-green">审核中</label>
                          <label v-if="item.auditState==99" class="fc-green">审核通过</label>
                        </td>
                        <td>
                            <div class="table-btn btn-yellow" @click="jumpDetail(item.graindepotGbCode);">详情</div>
                            <div class="table-btn btn-green" @click="jumpEdit(item.graindepotGbCode,'edit');" v-if="item.draftStatus==0">编辑</div>
                            <div class="table-btn btn-change" v-if="item.auditState==99" @click="jumpEdit(item.graindepotGbCode,'change');">信息变更</div>
                            <div class="table-btn btn-submit" @click="submitAudit(item.graindepotGbCode);" v-if="item.draftStatus==0">提交审核</div>
                            <div class="table-btn btn-again" v-if="item.auditState==0" @click="jumpEdit(item.graindepotGbCode,'add');">再次申请</div>
                            <div class="table-btn btn-red" @click="delData(item.graindepotGbCode);" v-if="item.draftStatus==0">删除</div>
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
  libraryList,
  libraryDel,
  libraryTypeDropdown,
  libraryApproval
} from "@/api/systemManage/basicData/library";
export default {
  name: "library",
  data() {
    return {
      postData: {
        graindepotGbCode: this.$route.query.graindepotGbCode?this.$route.query.graindepotGbCode:"",
        graindepotName: this.$route.query.graindepotName?this.$route.query.graindepotName:"",
        graindepotTypeId: this.$route.query.graindepotTypeId?this.$route.query.graindepotTypeId:"",
        pageSize: 10,
        pageNo: this.$route.query.pageNo?this.$route.query.pageNo:0
      },
      allChecked: false,
      sortOrder: "0", //0 顺序，1 倒序
      delList: {
        graindepotIdList: []
      },
      libraryTypeList: "",
      listData: []
    };
  },
  methods: {
    getList: function(pageNo) {
      //获取列表
      var vm = this;
      vm.postData.pageNo = pageNo;
      layer.load(2);
      libraryList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
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
        vm.delList.graindepotIdList = [];
        vm.delList.graindepotIdList.push(id);
      } else {
        if (vm.delList.graindepotIdList.length == []) {
          layer.msg("请至少选择一条数据！");
          return;
        }
      }
      layer.confirm('确定删除？', {
        btn: ['确定','取消'] //按钮
      }, function(){
      layer.load(2);
      var delStr = vm.delList.graindepotIdList.join(",");
      libraryDel({ graindepotIdList: delStr })
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
          vm.delList.graindepotIdList.push(vm.listData[i].graindepotGbCode);
        }
      } else {
        vm.delList.graindepotIdList = [];
      }
    },
    clickChange: function() {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (vm.delList.graindepotIdList.length == vm.listData.length) {
        vm.allChecked = true;
      } else {
        vm.allChecked = false;
      }
    },
    getLibraryType: function() {
      var vm = this;
      libraryTypeDropdown({})
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.libraryTypeList = ret.data.grainDepotTypeList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    submitAudit: function(id) {
      //提交审核
      var vm = this;
      libraryApproval({ graindepotGbCode: id })
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
        name: "libraryManageEdit",
        query: {
          id: id,
          type:type,
          //下面新增
          graindepotGbCode:vm.postData.graindepotGbCode,
          graindepotName:vm.postData.graindepotName,
          graindepotTypeId:vm.postData.graindepotTypeId,
          pageNo:vm.postData.pageNo
        }
      });
    },
    jumpDetail: function(id) {
      var vm = this;
      this.$router.push({
        name: "libraryManageDetail",
        query: {
          id: id,
          //下面新增
          graindepotGbCode:vm.postData.graindepotGbCode,
          graindepotName:vm.postData.graindepotName,
          graindepotTypeId:vm.postData.graindepotTypeId,
          pageNo:vm.postData.pageNo
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
    vm.getList(this.postData.pageNo);
    vm.getLibraryType();
  }
};
</script>
