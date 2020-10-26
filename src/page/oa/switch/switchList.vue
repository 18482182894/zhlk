<template>
  <div class="content">
    <div class="menuManage operationLog priceManage">
      <div class="lookup">
        业务模块名称：
        <input name="" class="select-style excision" v-model="postData.module_name">

          <div class="btn btn-add" @click="getList(0);">
            <img src="../../../../static/images/search.png" alt="">
            <label>查找</label>
          </div>
      </div>
      <div>
        <div class="btn btn-add" @click="jumpEdit();">
          <img src="../../../../static/images/add.png" alt="">
          <label>新增</label>
        </div>
        <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value="">排序方式</option>
          <option value="0">正序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
        <tr>
          <th style="width:2.5%;"><input type="checkbox" v-model="allChecked" @change="checkAll();"></th>
          <th style="width:2.5%;">序号</th>
          <th style="width:7.5%;">业务模块编号</th>
          <th style="width:7.5%;">业务模块名称</th>
          <th style="width:10%;">流程编号</th>
          <th style="width:15%;">流程名称</th>
          <th style="width:10%;">创建时间</th>
          <th style="width:15%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox" :value="item.moduleFlowConfigList" @change="clickChange();"></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td v-text="item.module_id"></td>
          <td v-text="item.module_name" ></td>
          <td v-text="item.flow_id"></td>
          <td v-text="item.flow_name"></td>
          <td v-text="item.create_time"></td>
          <td>
            <label class="switch-btn">
              <input type="checkbox" v-if="item.useful_flg==0" checked="checked" @change="changeSwitch(item);">
              <input type="checkbox" v-else @change="changeSwitch(item);">
              <i></i>
            </label>
          </td>
        </tr>
        </tbody>
      </table>
      <!--&lt;!&ndash; 分页容器 &ndash;&gt;-->
      <div id="PageBar"></div>
    </div>
  </div>
</template>

<style scoped>
  .switch-btn{
    display: inline-block;
    width: 63px;
    height: 27px;
    position: relative;
  }
  .switch-btn input{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .switch-btn i{
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    background: url(../../../../static/images/switch-off.png);
    background-size: 100% 100%;
  }
  .switch-btn input:checked + i{
    background: url(../../../../static/images/switch-on.png);
    background-size: 100% 100%;
  }

</style>

<script>
  import { getFlowPowerList ,editFlowPowerOpenOrClose} from "../../../api/workflow/flow";

  export default {
        name: "switchList",
      data() {
        return {
          sortOrder: "0", //0 顺序，1 倒序
          postData: {
            // applyTitle: "",
            // totalFee: "",
            module_name:this.$route.query.module_name ?  this.$route.query.module_name : "",
            pageNo:this.$route.query.pageNo ?  this.$route.query.pageNo : 0,
            pageSize: 10,
          },
          grainVarietyList: "",
          grainOilLevelList: "",
          inventoryPropertyList: "",
          allChecked: false,
          listData: []
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
          getFlowPowerList(vm.postData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                // console.log (JSON.stringify(ret.data.moduleFlowConfigList))
                vm.listData = ret.data.moduleFlowConfigList;
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
        checkAll: function() {
          //全选
          var vm = this;
          if (vm.allChecked) {
            for (var i = 0; i < vm.listData.length; i++) {
              vm.delList.moduleFlowConfigList.push(vm.listData[i].module_id);
            }
          } else {
            vm.delList.moduleFlowConfigList = [];
          }
        },
        clickChange: function() {
          //监听input选中状态，控制全选input的选中
          var vm = this;
          if (vm.delList.moduleFlowConfigList.length == vm.listData.length) {
            vm.allChecked = true;
          } else {
            vm.allChecked = false;
          }
        },
        jumpEdit: function(id) {
          //跳转到编辑或新增页面
          var vm = this;
          this.$router.push({
            name: "switchEdit",
            query: {
              id: id,
              module_name:vm.postData.module_name,
              pageNo:vm.postData.pageNo,
            }
          });
        },
        changeSwitch:function (item) {
          var vm=this;
          // console.log(JSON.stringify(item))
          editFlowPowerOpenOrClose({
            module_id:item.module_id,
            flow_id:item.flow_id,
            useful_flg:item.useful_flg==0?'1':'0'
          })
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                  if (item.useful_flg==0) {
                    layer.msg("已停用！");
                  }else{
                    layer.msg("已开启！");
                  }
                  vm.getList(1);

              } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                  vm.listData=[];
                  vm.getList(1);
              }
            })
            .catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
            });

        }
      },
      mounted() {
        this.getList(this.postData.pageNo);
      }
    };
</script>
