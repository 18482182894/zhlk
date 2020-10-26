<template>
  <div class="content">
    <div class="menuManage operationLog priceManage">
      <div class="lookup">
        设备名称
        <input name="" class="select-style excision" v-model="postData.equipmentName">
        
        设备类型：
        <select name="" class="select-style excision" v-model="postData.equipmentType">
          <option value="">设备类型</option>
          <option value="0">计量（检验）设备</option>
          <option value="1">仓储设备</option>
        </select>

        
          <div class="btn btn-add"  @click="getList(0);">
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
          <th style="width:5%;"><input type="checkbox" v-model="allChecked" @change="checkAll();"></th>
          <th style="width:5%;">序号</th>
          <th style="width:10%;">设备名称</th>
          <th style="width:10%;">设备类型</th>
          <th style="width:20%;">设备规格描述</th>
          <th style="width:10%;">计量单位</th>
          <th style="width:30%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox" :value="item.equipmentId" v-model="delList.equipmentId" @change="clickChange();"></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td v-text="item.equipmentName"></td>
          <td v-text="item.equipmentTypeCH" ></td>
          <td v-text="item.equipmentSpecifications"></td>
          <td v-text="item.measuringUnitCodeCH"></td>
          <td>
            <div class="table-btn btn-yellow" @click="jumpDetail(item.equipmentId);">详情</div>
            <div class="table-btn btn-green" @click="jumpEdit(item.equipmentId);">编辑</div>
            <div class="table-btn btn-red" @click="delData(item.equipmentId);">删除</div>
          </td>
        </tr>
        </tbody>
      </table>
      <!--&lt;!&ndash; 分页容器 &ndash;&gt;-->
      <div id="PageBar"></div>
    </div>
    <div class="detail-back" style="margin-bottom: 1rem;">
        <button @click="detailBack();">返回</button>
    </div>
  </div>
</template>

<script>
  import{ getDeviceList , deleDevice} from "../../../api/devicesManage/device";

  export default {
        name: "basicinfo",
    data() {
      return {
        sortOrder: "0", //0 顺序，1 倒序
        postData: {
          equipmentName:this.$route.query.equipmentName?this.$route.query.equipmentName:"",
          equipmentType:this.$route.query.equipmentType?this.$route.query.equipmentType:"",
          // measuringUnitCode: "",
          pageSize: 10,
          pageNo: this.$route.query.pageNo?this.$route.query.pageNo:1
        },
        grainVarietyList: "",
        grainOilLevelList: "",
        inventoryPropertyList: "",
        allChecked: false,
        delList: {
          equipmentId: []
        },
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
        getDeviceList(vm.postData)
          .then(ret => {
            layer.closeAll("loading");

            // console.log (JSON.stringify(ret));
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
          vm.delList.equipmentId = [];
          vm.delList.equipmentId.push(id);
        } else {
          if (vm.delList.equipmentId.length == []) {
            layer.msg("请至少选择一条数据！");
            return;
          }
        }
        layer.confirm('确定删除？', {
          btn: ['确定','取消'] //按钮
        }, function(){
          layer.load(2);
          var delStr = vm.delList.equipmentId.join(",");
          deleDevice({ equipmentId: delStr })
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("删除成功！");
                vm.postData.pageNo = 1;
                vm.getList(1);
              } else {
                layer.alert(ret.data, { closeBtn: 0 });
              }
            })
            .catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
            });
        }, function(){
        });

      },
      checkAll: function() {
        //全选
        var vm = this;
        if (vm.allChecked) {
          for (var i = 0; i < vm.listData.length; i++) {
            vm.delList.equipmentId.push(vm.listData[i].equipmentId);
          }
        } else {
          vm.delList.equipmentId = [];
        }
      },
      clickChange: function() {
        //监听input选中状态，控制全选input的选中
        var vm = this;
        if (vm.delList.equipmentId.length == vm.listData.length) {
          vm.allChecked = true;
        } else {
          vm.allChecked = false;
        }
      },
    detailBack:function () {
        this.$router.push({
          name: "device"
        });
    },
      jumpDetail: function(id) {
        //跳转到详情
        var vm = this;
        this.$router.push({
          name: "basicinfoDetail",
          query: {
            id: id,
            equipmentName:vm.postData.equipmentName,
            equipmentType:vm.postData.equipmentType,
            pageNo:vm.postData.pageNo
          }
        });
      },
      jumpEdit: function(id) {
        //跳转到编辑或新增页面
        var vm = this;
        this.$router.push({
          name: "basicinfoEdit",
          query: {
            id: id,
            equipmentName:vm.postData.equipmentName,
            equipmentType:vm.postData.equipmentType,
            pageNo:vm.postData.pageNo
          }
        });
      },
      jumpBadRecord:function (name) {//跳转到不良记录
        var vm = this;
        this.$router.push({
          name: "badRecord",
          query: {
            name: name
          }
        });
      }
    },
    mounted() {
      this.getList(this.postData.pageNo);
    }
  };
</script>

<style scoped>
	
</style>
