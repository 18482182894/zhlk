<template>
  <div class="content">
    <div class="menuManage operationLog department">
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
              <input type="checkbox" @change="checkAll()" v-model="allChecked">
            </th>
            <th>序号</th>
            <th style="width: 20%">编号</th>
            <th style="width: 20%">岗位</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in listData">
            <!-- <td v-if="i==0">
              <input type="checkbox">
            </td>-->
            <!-- <td v-else> -->
            <td>
              <input
                type="checkbox"
                :value="item.position_id"
                v-model="delList.position_ids"
                @change="clickChange();"
              >
            </td>
            <td v-text="i+1"></td>
            <td>{{item.position_id}}</td>
            <td v-text="item.position_name"></td>
            <td>
              <div class="table-btn btn-green" @click="showPopup('edit',item.position_id);">编辑</div>
              <div class="table-btn btn-red" @click="delData(item.position_id);">删除</div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar"></div>

      <!-- 岗位新增弹出层 -->
      <div class="popup" :style="newPopup==1?'display:block;':''">
        <div class="popup-main menuPopup-edit-main">
          <div class="popup-title">
            <label>新增</label>
            <em class="popup-close" @click="closePopup('add');">×</em>
          </div>
          <div class="popup-content">
            <p class="text-justify">
              <label>岗位编码:</label>
              <input type="text" v-model="postNewData.position_id">
            </p>
            <p class="text-justify">
              <label>岗位名称：</label>
              <input type="text" v-model="postNewData.position_name">
            </p>
            <p class="text-justify">
              <label>备注:</label>
              <input type="text" v-model="postNewData.memo">
            </p>
          </div>
          <div>
            <button class="query" @click="addPost();">确定</button>
          </div>
        </div>
      </div>
      <!-- 岗位编辑弹出层 -->
      <div class="popup" :style="editPopup==1?'display:block;':''">
        <div class="popup-main menuPopup-edit-main">
          <div class="popup-title">
            <label>岗位编辑</label>
            <em class="popup-close" @click="closePopup('edit');">×</em>
          </div>
          <div class="popup-content">
            <p class="text-justify">
              <label style="margin-left: 10%">岗位编码:</label>
              <input
                type="text"
                style="margin-right: 10%"
                v-model="postEditData.position_id"
                readonly="readonly"
              >
            </p>
            <p class="text-justify">
              <label style="margin-left: 10%">岗位名称：</label>
              <input type="text" style="margin-right: 10%" v-model="postEditData.position_name">
            </p>
            <p class="text-justify">
              <label style="margin-left: 10%">备注:</label>
              <textarea style="resize:none;margin-right: 10%"></textarea>
            </p>
          </div>
          <div>
            <button class="query" @click="editPost();">确定</button>
          </div>
        </div>
      </div>

      <div class="detail-back">
        <button @click="detailBack();">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  postList,
  postDetail,
  postDel,
  postNew,
  postEdit
} from "@/api/systemManage/post";
export default {
  name: "departmentPost",
  data() {
    return {
      postData: {
        dept_id: this.$route.query.id,
        position_id: "",
        position_name: "",
        pageSize: 10,
        pageNo: 0
      },
      postNewData: {
        position_id: "",
        position_name: "",
        position_type_id: -1,
        dept_id: this.$route.query.id,
        memo: ""
      },
      postEditData: {
        position_id: "",
        position_name: "",
        position_type_id: -1,
        dept_id: this.$route.query.id,
        memo: ""
      },
      postDetailData: {
        position_id: ""
      },
      delList: {
        position_ids: []
      },
      listData: [],
      editPopup: 0, // 控制编辑弹出层的显影，1为显示
      newPopup: 0, // 控制新增弹出层的显影，1为显示
      allChecked: false
    };
  },
  methods: {
    getList: function(pageNo) {
      //获取列表
      var vm = this;
      vm.postData.pageNo = pageNo;
      layer.load(2);
      postList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.positionList;
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
                  vm.getData(obj.curr);
                }
              }
            });
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
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
        vm.delList.position_ids = [];
        vm.delList.position_ids.push(id);
      } else {
        if (vm.delList.position_ids.length == []) {
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
          var delstr = vm.delList.position_ids.join(",");
          postDel({ position_ids: delstr })
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("删除成功！");
                vm.delList.position_ids = [];
                vm.postData.pageNo = 0;
                vm.getList(0);
              } else {
                layer.alert(err.message, { closeBtn: 0 });
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
      vm.postDetailData.position_id = id;
      layer.load(2);
      postDetail(vm.postDetailData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.postEditData.position_name =
              ret.data.positionDetail.position_name;
            vm.postEditData.position_id = ret.data.positionDetail.position_id;
            vm.postEditData.memo = ret.data.positionDetail.memo;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    addPost: function() {
      var vm = this;
      if (vm.postNewData.position_id == "") {
        layer.msg("请填写岗位编号！");
        return;
      }
      if (vm.postNewData.position_name == "") {
        layer.msg("请填写岗位名称！");
        return;
      }
      layer.load(2);
      postNew(vm.postNewData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("添加成功！");
            vm.postData.pageNo = 0;
            vm.getList(0);
            vm.closePopup("add");
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    editPost: function() {
      var vm = this;
      if (vm.postEditData.position_id == "") {
        layer.msg("请填写岗位编号！");
        return;
      }
      if (vm.postEditData.position_name == "") {
        layer.msg("请填写岗位名称！");
        return;
      }
      layer.load(2);
      postEdit(vm.postEditData)
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

    checkAll: function() {
      //全选
      var vm = this;
      if (vm.allChecked) {
        for (var i = 0; i < vm.listData.length; i++) {
          vm.delList.position_ids.push(vm.listData[i].position_id);
        }
      } else {
        vm.delList.position_ids = [];
      }
    },
    clickChange: function() {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (vm.delList.position_ids.length == vm.listData.length) {
        vm.allChecked = true;
      } else {
        vm.allChecked = false;
      }
    },
    detailBack: function() {
      this.$router.back(-1);
    }
  },
  mounted() {
    var vm = this;
    vm.getList(0);
  }
};
</script>
