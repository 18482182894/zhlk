<template>
  <div class="content">
    <div class="menuManage operationLog roleManage">
      <!--<div>-->
      <!--<div class="btn btn-add" @click="seachEvent();">-->
      <!--<img src="../../../../static/images/search.png" alt="">-->
      <!--<label>查找</label>-->
      <!--</div>-->
      <!--</div>-->
      <div class="lookup">
        角色名称：
        <input type="text" class="input-text excision" v-model="seachData.roleName">
        角色代码：
        <input type="text" class="input-text excision" v-model="seachData.roleId">

        <div style="display: inline-block">
          <div class="btn btn-add"  @click="getList(0);">
            <img src="../../../../static/images/search.png" alt>
            <label>查找</label>
          </div>
        </div>
      </div>
      <div>
        <div class="btn btn-add" @click="showPopup('add');">
          <img src="../../../../static/images/add.png" alt>
          <label>新增</label>
        </div>
        <div class="btn btn-export" @click="changeRole('add');">
          <img src="../../../../static/images/add.png" alt>
          <label>添加权限</label>
        </div>
        <div class="btn btn-del" @click="changeRole('del');">
          <img src="../../../../static/images/del.png" alt>
          <label>删除权限</label>
        </div>
      </div>
      <table class="customTable">
        <thead>
          <tr>
            <th>
              <input type="checkbox">
            </th>
            <th>序号</th>
            <th>角色代码</th>
            <th>角色名称</th>
            <th>备注</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in listData">
            <td>
              <input type="checkbox" :value="item" v-model="roleIdList">
            </td>
            <td v-text="i+1"></td>
            <td v-text="item.role_id"></td>
            <td v-text="item.role_name"></td>
            <td v-text="item.memo"></td>
            <td>
              <div class="table-btn btn-green" @click="showPopup('edit',item);">编辑</div>
              <div class="table-btn btn-red" @click="delData(item.role_id);">删除</div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar"></div>

      <!-- 菜单编辑弹出层 -->
      <div class="popup" :style="editPopup==1?'display:block;':''">
        <div class="popup-main rolePopup-edit-main">
          <div class="popup-title">
            <label v-text="popupTitle"></label>
            <em class="popup-close" @click="closePopup();">×</em>
          </div>
          <div class="popup-content">
            <p class="text-justify">
              <label>角色代码：</label>
              <input type="text" v-model="postData.roleId" v-if="submitType==0" readonly="readonly">
              <input type="text" v-model="postData.roleId" v-else>
            </p>
            <p class="text-justify">
              <label>角色名称：</label>
              <input type="text" v-model="postData.roleName">
            </p>
            <p class="text-justify">
              <label>备注：</label>
              <textarea name v-model="postData.memo" style="resize:none"></textarea>
            </p>
          </div>
          <div>
            <button class="query" @click="submitEvent();">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { roleList, roleEdit, roleNew, roleDel } from "@/api/systemManage/role";
export default {
  name: "desktop",
  data() {
    return {
      popupTitle: "",
      editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
      listData: "",
      seachData: {
        roleName: this.$route.query.roleName?this.$route.query.roleName:"",
        roleId: this.$route.query.roleId?this.$route.query.roleId:"",
        userName: this.$route.query.userName?this.$route.query.userName:"",
        pageSize: 10,
        pageNo: this.$route.query.pageNo?this.$route.query.pageNo:0
      },
      showDataList: [],
      submitType: "", //0表示编辑，1为新增
      postData: {
        roleName: this.$route.query.roleName?this.$route.query.roleName:"",
        roleId:this.$route.query.roleId?this.$route.query.roleId:"",
        userName: this.$route.query.userName?this.$route.query.userName:"",
        memo: ""
      },
      roleIdList: []
    };
  },
  methods: {
    getList: function(pageNo) {
      //获取列表
      var vm = this;
      vm.seachData.pageNo = pageNo;
      layer.load(2);
      roleList(vm.seachData)
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
    delData: function(id) {//删除
      //删除
      var vm = this;
      layer.confirm(
        "确定删除？",
        {
          btn: ["确定", "取消"] //按钮
        },
        function() {
          layer.load(2);
          roleDel({ roleId: id })
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("删除成功！");
                vm.planIdList = [];
                vm.getList(0);
              } else {
                layer.alert(ret.data, { closeBtn: 0 });
              }
            })
            .catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
            });
        },
        function() {}
      );
    },
    submitEvent: function() {
      //新增和编辑的提交
      var vm = this;
      if (vm.postData.roleId == "") {
        layer.msg("请填写角色代码");
        return;
      } else {
        if (vm.postData.roleId.length > 20) {
          layer.msg("角色代码不得超过20字符");
          return;
        }
      }
      if (vm.postData.roleName == "") {
        layer.msg("请填写角色名称");
        return;
      } else {
        if (vm.postData.roleName.length > 20) {
          layer.msg("角色名称不得超过20字符");
          return;
        }
      }
      if (vm.postData.memo.length > 100) {
        layer.msg("备注不得超过100字符");
        return;
      }
      if (vm.submitType == 0) {
        layer.load(2);
        roleEdit(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("角色编辑成功！");
              vm.closePopup();
              vm.getList(0);
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      } else {
        layer.load(2);
        roleNew(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增角色成功！");
              vm.closePopup();
              vm.getList(0);
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      }
    },
    showPopup: function(type, data) {
      // 展示弹出层
      var vm = this;
      switch (type) {
        case "edit":
          vm.popupTitle = "编辑角色";
          vm.postData.roleName = data.role_name;
          vm.postData.roleId = data.role_id;
          vm.postData.memo = data.memo;
          vm.submitType = 0;
          break;
        case "add":
          vm.popupTitle = "添加角色";
          vm.postData.roleName = "";
          vm.postData.roleId = "";
          vm.postData.memo = "";
          vm.submitType = 1;
          break;
      }
      vm.editPopup = 1;
    },
    closePopup: function() {
      // 隐藏弹出层
      var vm = this;
      vm.editPopup = 0;
    },
    changeRole: function(e) {
      var vm = this;
      if (vm.roleIdList == "") {
        layer.msg("请选择一条数据！");
        return;
      }
      if (vm.roleIdList.length > 1) {
        layer.msg("只能选择一条数据！");
        return;
      }
      this.$router.push({
        name: "changeRole",
        query: {
          type: e,
          sorts: "role",
          data: vm.roleIdList[0],

          pageNo:vm.seachData.pageNo,
          roleName: vm.seachData.roleName,
          roleId: vm.seachData.roleId,
          userName: vm.seachData.userName

        }
      });
    },
  },
  mounted() {
    var vm = this;
    vm.getList(vm.seachData.pageNo);
  }
};
</script>
