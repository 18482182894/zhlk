<template>
  <div class="content">
    <div class="menuManage operationLog ">
      <div class="lookup">
        设备类型：
        <select name="" class="select-style excision" v-model="postData.equipmentType">
          <option value="">设备类型</option>
          <option value="0">计量（检验）设备</option>
          <option value="1">仓储设备</option>
        </select>

        
          <div class="btn btn-add" @click="getList(1);">
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
          <option value="0">顺序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
        <tr>
          <th style="width:2.5%;"><input type="checkbox" v-model="allChecked" @change="checkAll();"></th>
          <th style="width:2.5%;">序号</th>
          <th style="width:7.5%;">设备名称</th>
          <th style="width:7.5%;">设备类型</th>
          <th style="width:7.5%;">设备规格</th>
          <th style="width:5%;">采购价格</th>
          <th style="width:10%;">生产厂家</th>
          <th style="width:5%;">入库数量</th>
          <th style="width:15%;">入库时间</th>
          <th style="width:20%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox" :value="item.equipmentEntryRecordId" v-model="delList.equipmentEntryRecordId" @change="clickChange();"></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td v-text="item.equipmentName"></td>
          <td v-text="item.equipmentKind" ></td>
          <td v-text="item.equipmentSpecifications"></td>
          <td v-text="item.procurementPrice"></td>
          <td v-text="item.manufacturer"></td>
          <td v-text="item.number"></td>
          <td v-text="item.entryDatetime"></td>
          <td>
            <div class="table-btn btn-yellow" @click="jumpDetail(item.equipmentEntryRecordId);">详情</div>
            <div class="table-btn btn-green" @click="jumpEdit(item.equipmentEntryRecordId);" >编辑</div>
            <!-- <div class="table-btn btn-red" @click="delData(item.equipmentEntryRecordId);">删除</div> -->
          </td>
        </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar"></div>
    </div>
    <div class="detail-back">
        <button @click="detailBack();">返回</button>
    </div>
  </div>
</template>

<script>
  import{ getEquipmentEntryRecordList , delEquipmentEntryRecord} from "../../../api/devicesManage/equipmentEntryRecord";

  export default {
        name:"putin",
    data() {
      return {
        sortOrder: "0", //0 顺序，1 倒序
        postData: {
          equipmentType: this.$route.query.equipmentType?this.$route.query.equipmentType:"",
          // district: "",
          pageSize: 10,
          pageNo: this.$route.query.pageNo?this.$route.query.pageNo:1,
          name:"putin"
        },
        grainVarietyList: "",
        grainOilLevelList: "",
        inventoryPropertyList: "",
        allChecked: false,
        delList: {
          equipmentEntryRecordId: []
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
        getEquipmentEntryRecordList(vm.postData)
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
      delData: function(id) {
        //删除
        var vm = this;
        if (id) {
          vm.delList.equipmentEntryRecordId = [];
          vm.delList.equipmentEntryRecordId.push(id);
        } else {
          if (vm.delList.equipmentEntryRecordId.length == []) {
            layer.msg("请至少选择一条数据！");
            return;
          }
        }
        layer.confirm('确定删除？', {
          btn: ['确定','取消'] //按钮
        }, function(){
          layer.load(2);
          var delStr = vm.delList.equipmentEntryRecordId.join(",");
          delEquipmentEntryRecord({ equipmentEntryRecordId: delStr })
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
            vm.delList.equipmentEntryRecordId.push(vm.listData[i].equipmentId);
          }
        } else {
          vm.delList.equipmentEntryRecordId = [];
        }
      },
    detailBack:function () {
        this.$router.push({
          name: "device"
        });
    },
      clickChange: function() {
        //监听input选中状态，控制全选input的选中
        var vm = this;
        if (vm.delList.equipmentEntryRecordId.length == vm.listData.length) {
          vm.allChecked = true;
        } else {
          vm.allChecked = false;
        }
      },
      jumpDetail: function(id) {
        //跳转到详情
        var vm = this;
        this.$router.push({
          name: "putinDetail",
          query: {
            id: id,
            equipmentType:vm.postData.equipmentType,
            name:vm.postData.name,
            pageNo:vm.postData.pageNo

          }
        });
      },
      jumpEdit: function(id) {
        //跳转到编辑或新增页面
        var vm = this;
        this.$router.push({
          name: "putinEdit",
          query: {
            id: id,
            equipmentType:vm.postData.equipmentType,
            name:vm.postData.name,
            pageNo:vm.postData.pageNo
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
