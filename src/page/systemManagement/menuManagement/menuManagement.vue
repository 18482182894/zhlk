<template>
  <div class="content">
    <div class="menuManage">
      <div>
        <div class="btn btn-add" @click="showPopup('add');">
          <img src="../../../../static/images/add.png" alt>
          <label>新增</label>
        </div>
        <div class="btn btn-del" @click="delData();">
          <img src="../../../../static/images/del.png" alt>
          <label>删除</label>
        </div>
        <!-- <div class="btn btn-export">
                    <img src="../../../../static/images/export.png" alt="">
                    <label>导出</label>
        </div>-->
        <div class="btn btn-del" @click="goup()">
          <img src="../../../../static/images/gobtn.png" alt>
          <label>返回</label>
        </div>
      </div>
      <table class="customTable">
        <thead>
          <tr>
            <th>
              <input type="checkbox" v-model="allChecked" @change="checkAll();">
            </th>
            <th style="width:10%">序号</th>
            <th style="width:14%">菜单编号</th>
            <th style="width:40%">菜单名称</th>
            <th style="width:36%">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in listData">
            <td>
              <input
                type="checkbox"
                :value="item.module_id"
                v-model="delList.module_ids"
                @change="clickChange();"
              >
            </td>
            <td v-text="i+1"></td>
            <td v-text="item.module_id"></td>
            <td v-text="item.module_name"></td>
            <td>
              <div class="table-btn btn-green" @click="showPopup('edit',item.module_id);">编辑</div>
              <div class="table-btn btn-red" @click="delData(item.module_id);">删除</div>
              <div
                class="table-btn btn-blue"
                @click="jumpNext(item.module_id,item.module_name);"
              >下一级</div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar"></div>

      <!-- 菜单编辑弹出层 -->
      <div class="popup" :style="editPopup==1?'display:block;':''">
        <div class="popup-main menuPopup-edit-main">
          <div class="popup-title">
            <label>菜单编辑</label>
            <em class="popup-close" @click="closePopup('edit');">×</em>
          </div>
          <div class="popup-content">
            <p class="text-justify">
              <label>菜单编号:</label>
              <input type="text" v-model="postEditData.module_id" readonly="readonly">
            </p>
            <p class="text-justify">
              <label>菜单名称（简体中文）:</label>
              <input type="text" v-model="postEditData.module_name">
            </p>
            <p class="text-justify">
              <label>图片名:</label>
              <input type="text" v-model="postEditData.icon">
            </p>
          </div>
          <div>
            <button class="query" @click="submitEvent('edit');">确定</button>
          </div>
        </div>
      </div>
      <!-- 菜单新增弹出层 -->
      <div class="popup" :style="newPopup==1?'display:block;':''">
        <div class="popup-main menuPopup-new-main">
          <div class="popup-title">
            <label>增加菜单</label>
            <em class="popup-close" @click="closePopup('add');">×</em>
          </div>
          <div class="popup-content">
            <p class="text-justify">
              <label>上级菜单：</label>
              <input type="text" value="顶级菜单" readonly="readonly">
            </p>
            <p class="text-justify">
              <label>菜单编号</label>
              <input type="number" min="1000" max="10000" v-model="postNewsData.module_id">
              <!-- <label class="explain" v-text="'说明：1000\<菜单编号\<10000'"></label> -->
            </p>
            <p class="text-justify">
              <label>菜单名称（简体中文）:</label>
              <input type="text" v-model="postNewsData.module_name">
            </p>
            <p class="text-justify">
              <label>菜单模块路径:</label>
              <input type="text" v-model="postNewsData.module_url">
            </p>
            <p class="text-justify">
              <label>图标:</label>
              <input type="text" v-model="postNewsData.icon">
            </p>
            <p class="text-justify">
              <label>排序序号:</label>
              <input type="number" v-model="postNewsData.order_no">
            </p>
            <p class="text-justify">
              <label>备注:</label>
              <input type="text" v-model="postNewsData.memo">
            </p>
          </div>
          <div>
            <button class="query" @click="submitEvent('add');">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  menuList,
  menuDel,
  menuEdit,
  menuNew,
  menuDetail
} from "@/api/systemManage/menu";
export default {
  name: "menuManage",
  data() {
    return {
      postData: {
        module_name: "",
        module_id: "",
        parent_module_id: "",
        pageSize: 10,
        pageNo: 0
      },
      postNewsData: {
        module_id: "",
        module_name: "",
        module_url: "",
        icon: "",
        module_level: 1,
        parent_module_id: "",
        order_no: "",
        memo: ""
      },
      postEditData: {
        module_id: "",
        module_name: "",
        icon: "",
        memo: ""
      },
      postDetailData: {
        module_id: ""
      },
      listData: [],
      allChecked: false,
      delList: {
        module_ids: []
      },
      editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
      newPopup: 0 // 控制菜单新增弹出层的显影，1为显示
    };
  },
  methods: {
    goup: function() {
      this.$router.push("/");
    },
    jump() {
      var vm = this;
      var dom = event.currentTarget;
      var labelList = document.querySelectorAll(".menu-items label");
      for (var i = 0; i < labelList.length; i++) {
        labelList[i].className = "";
      }
      dom.className = "menu-item-on";
      var url = dom.getAttribute("toUrl");
      this.$router.push(url);
      vm.closeMenu();
    },
    getList: function(pageNo) {
      //获取列表
      var vm = this;
      vm.postData.pageNo = pageNo;
      layer.load(2);
      // console.log(JSON.stringify(vm.postData))
      menuList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.moduleList;
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
        vm.delList.module_ids = [];
        vm.delList.module_ids.push(id);
      } else {
        if (vm.delList.module_ids.length == 0) {
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
          var delstr = vm.delList.module_ids.join(",");
          menuDel({ module_ids: delstr })
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("删除成功！");
                vm.delList.module_ids = [];
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
    checkAll: function() {
      //全选
      var vm = this;
      if (vm.allChecked) {
        for (var i = 0; i < vm.listData.length; i++) {
          vm.delList.module_ids.push(vm.listData[i].module_id);
        }
      } else {
        vm.delList.module_ids = [];
      }
    },
    clickChange: function() {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (vm.delList.module_ids.length == vm.listData.length) {
        vm.allChecked = true;
      } else {
        vm.allChecked = false;
      }
    },
    showPopup: function(type, id) {
      // 展示弹出层
      var vm = this;
      switch (type) {
        case "edit":
          vm.editPopup = 1;
          vm.postDetailData.module_id = id;
          vm.getDetail();
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
    jumpNext: function(id, name) {
      var vm = this;
      // console.log(name);
      this.$router.push({
        name: "menuManageNext",
        query: {
          id: id,
          module_name: name
        }
      });
    },
    getDetail: function() {
      var vm = this;
      layer.load(2);
      menuDetail(vm.postDetailData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.postEditData.module_id = ret.data.moduleDetail.module_id;
            vm.postEditData.icon = ret.data.moduleDetail.icon;
            vm.postEditData.memo = ret.data.moduleDetail.memo;
            vm.postEditData.module_name = ret.data.moduleDetail.module_name;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    submitEvent: function(type) {
      //新增和编辑的提交
      var vm = this;
      if (type == "edit") {
        //编辑提交
        if (vm.postEditData.module_id == "") {
          layer.msg("请填写菜单编号");
          return;
        } else {
          if (
            parseInt(vm.postEditData.module_id) > 10000 ||
            parseInt(vm.postEditData.module_id) < 1000
          ) {
            layer.msg("菜单编号不合法");
            return;
          }
        }
        if (vm.postEditData.module_name == "") {
          layer.msg("请填写菜单名称");
          return;
        } else {
          if (vm.postEditData.module_name.length > 20) {
            layer.msg("菜单名称不得超过20字符");
            return;
          }
        }
        layer.load(2);
        menuEdit(vm.postEditData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("菜单编辑成功！");
              vm.closePopup("edit");
              vm.getList(0);
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.data, { closeBtn: 0 });
          });
      } else {
        if (vm.postNewsData.module_id == "") {
          layer.msg("请填写菜单编号");
          return;
        } else {
          if (
            parseInt(vm.postNewsData.module_id) > 10000 ||
            parseInt(vm.postNewsData.module_id) < 1000
          ) {
            layer.msg("菜单编号不合法");
            return;
          }
        }
        if (vm.postNewsData.module_name == "") {
          layer.msg("请填写菜单名称");
          return;
        } else {
          if (vm.postNewsData.module_name.length > 20) {
            layer.msg("菜单名称不得超过20字符");
            return;
          }
        }
        if (vm.postNewsData.module_url == "") {
          layer.msg("请填写资源路径");
          return;
        }
        if (vm.postNewsData.order_no == "") {
          layer.msg("请填写排序序号");
          return;
        }
        layer.load(2);
        menuNew(vm.postNewsData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增菜单成功！");
              vm.closePopup("add");
              vm.getList(0);
              vm.postNewsData = {
                module_id: "",
                module_name: "",
                module_url: "",
                icon: "",
                module_level: 1,
                parent_module_id: "",
                order_no: "",
                memo: ""
              };
              console.log(vm.postNewsData);

              // document.getElementsByClassName('popup-content').value=""
              // this.form={brand_right:0};
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.data, { closeBtn: 0 });
          });
      }
    }
  },
  mounted() {
    var vm = this;
    vm.getList(0);
  }
};
</script>
