<template>
  <div class="content">
    <div class="menuManage operationLog department">
      <!--<div>-->
      <!--<div class="btn btn-add" @click="getList(0);">-->
      <!--<img src="../../../../static/images/search.png" alt="">-->
      <!--<label>查找</label>-->
      <!--</div>-->
      <!--</div>-->
      <div class="lookup">
        部门名称：
        <input type="text" class="input-text excision" v-model="postData.departmentName">
          <div class="btn btn-add" @click="getList(0);">
            <img src="../../../../static/images/search.png" alt>
            <label>查找</label>
          </div>
      </div>
      <div>
        <div class="btn btn-add" @click="showPopup('add');">
          <img src="../../../../static/images/add.png" alt>
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
            <th>
              <input type="checkbox" v-model="allChecked" @change="checkAll();">
            </th>
            <th>序号</th>
            <th style="width: 20%">部门编号</th>
            <th style="width: 20%">部门名称</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in listData">
            <td>
              <input
                type="checkbox"
                :value="item.departmentId"
                v-model="delList.departmentIdList"
                @change="clickChange();"
              >
            </td>
            <td v-text="i+1"></td>
            <td>{{item.departmentId}}</td>
            <td v-text="item.departmentName"></td>
            <td>
              <div class="table-btn btn-green" @click="showPopup('edit',item.departmentId);">编辑</div>
              <div class="table-btn btn-gray" @click="jumpPost(item.departmentId);">岗位</div>
              <div class="table-btn btn-red" @click="delData(item.departmentId);">删除</div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar"></div>

      <!-- 部门编辑弹出层 -->
      <div class="popup" :style="editPopup==1?'display:block;':''">
        <div class="popup-main menuPopup-edit-main" style="height: 22rem;">
          <div class="popup-title">
            <label>部门编辑</label>
            <em class="popup-close" @click="closePopup('edit');">×</em>
          </div>
          <div class="popup-content">
            <p class="text-justify">
              <label style="margin-left: 10%">部门编号:</label>
              <input
                type="text"
                style="margin-right: 10%"
                v-model="postEditData.departmentId"
                readonly="readonly"
              >
            </p>
            <p class="text-justify">
              <label style="margin-left: 10%">部门名称：</label>
              <input type="text" style="margin-right: 10%" v-model="postEditData.departmentName">
            </p>
            <p class="text-justify">
              <label style="margin-left: 10%">备注:</label>
              <input type="text" style="margin-right: 10%" v-model="postEditData.memo">
            </p>
          </div>
          <div>
            <button class="query" @click="editDepartment();">确定</button>
          </div>
        </div>
      </div>
      <!-- 部门新增弹出层 -->
      <div class="popup" :style="newPopup==1?'display:block;':''">
        <div class="popup-main menuPopup-new-main">
          <div class="popup-title">
            <label>增加部门</label>
            <em class="popup-close" @click="closePopup('add');">×</em>
          </div>
          <div class="popup-content">
            <p class="text-justify">
              <label>部门编号：</label>
              <input type="text" v-model="postNewData.departmentId">
              <!--<label class="explain">说明：1000<部门编号<10000</label>-->
            </p>
            <p class="text-justify">
              <label>部门名称:</label>
              <input type="text" v-model="postNewData.departmentName">
            </p>
            <p class="text-justify">
              <label>备注:</label>
              <input type="text" v-model="postNewData.memo">
            </p>
          </div>
          <div>
            <button class="query" @click="addDepartment();">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  departmentList,
  departmentDetail,
  departmentDel,
  departmentNew,
  departmentEdit
} from "@/api/systemManage/department";
export default {
  name: "department",
  data() {
    return {
      postData: {
        departmentId: "",
        departmentName: "",
        pageSize: 10,
        pageNo: 0
      },
      postNewData: {
        departmentId: "",
        departmentName: "",
        memo: ""
      },
      postEditData: {
        departmentId: "",
        departmentName: "",
        memo: ""
      },
      postDetailData: {
        departmentId: ""
      },
      allChecked: false,
      delList: {
        departmentIdList: []
      },
      listData: [],
      editPopup: 0, // 控制编辑弹出层的显影，1为显示
      newPopup: 0 // 控制新增弹出层的显影，1为显示
    };
  },
  methods: {
    getList: function(pageNo) {
      //获取列表
      var vm = this;

      vm.postData.pageNo = pageNo;
      layer.load(2);
      departmentList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.departmentList;
            // console.log(vm.listData);

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
        vm.delList.departmentIdList = [];
        vm.delList.departmentIdList.push(id);
      } else {
        if (vm.delList.departmentIdList.length == []) {
          layer.msg("请至少选择一条数据！");
          return;
        }
      }
      layer.confirm(
        "确定删除？",
        {
          btn: ["确定", "取消"] //按钮
        },
        function() {
          layer.load(2);
          var delstr = vm.delList.departmentIdList.join(",");
          departmentDel({ departmentIdList: delstr })
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("删除成功！");
                vm.delList.departmentIdList = [];
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
    getDetail: function(id) {
      var vm = this;
      vm.postDetailData.departmentId = id;
      layer.load(2);
      departmentDetail(vm.postDetailData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.postEditData.departmentId = ret.data.department.deptId;
            vm.postEditData.departmentName = ret.data.department.deptName;
            vm.postEditData.memo = ret.data.department.memo;
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
          vm.delList.departmentIdList.push(vm.listData[i].departmentId);
        }
      } else {
        vm.delList.departmentIdList = [];
      }
    },
    clickChange: function() {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (vm.delList.departmentIdList.length == vm.listData.length) {
        vm.allChecked = true;
      } else {
        vm.allChecked = false;
      }
    },
    addDepartment: function() {
      var vm = this;
      if (vm.postNewData.departmentId == "") {
        layer.msg("请填写部门编号！");
        return;
      }
      if (vm.postNewData.departmentName == "") {
        layer.msg("请填写部门名称！");
        return;
      }
      layer.load(2);
      departmentNew(vm.postNewData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("添加成功！");
            vm.postData.pageNo = 0;
            vm.getList(0);
            vm.closePopup("add");
            vm.postNewData = {
              departmentId: "",
              departmentName: "",
              memo: ""
            };
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    editDepartment: function() {
      var vm = this;
      if (vm.postEditData.departmentId == "") {
        layer.msg("请填写部门编号！");
        return;
      }
      if (vm.postEditData.departmentName == "") {
        layer.msg("请填写部门名称！");
        return;
      }
      layer.load(2);
      departmentEdit(vm.postEditData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("修改成功！");
            vm.postData.pageNo = 0;
            vm.getList(0);
            vm.closePopup("edit");
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    showPopup: function(type, id) {
      // 展示弹出层
      var vm = this;
      switch (type) {
        case "edit":
          vm.editPopup = 1;
          vm.getDetail(id);
          break;
        case "add":
          vm.newPopup = 1;
          break;
      }
    },
    closePopup: function(type) {
      // 隐藏弹出层
      var vm = this;
      switch (type) {
        case "edit":
          vm.editPopup = 0;
          break;
        case "add":
          vm.newPopup = 0;
          break;
      }
    },
    jumpPost: function(id) {
      var vm = this;
      this.$router.push({
        name: "departmentPost",
        query: {
          id: id
        }
      });
    }
  },
  mounted() {
    var vm = this;
    vm.getList(0);
  }
};
</script>
