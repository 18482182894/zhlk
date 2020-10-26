<template>
  <div class="content">
    <div class="menuManage operationLog ">
      <div class="lookup">
        设备名称：
        <input type="text" class="input-text excision" v-model="postData.equipmentName">
        设备条码:
        <input type="text" class="input-text excision" v-model="postData.equipmentCode">
        设备类型：
        <select name="" class="select-style  excision" v-model="postData.equipmentType">
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
        <!-- <div class="btn btn-add" @click="jumpEdit();">
          <img src="../../../../static/images/add.png" alt="">
          <label>新增</label>
        </div> -->
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
          <th style="width:7.5%;">设备编号</th>
          <th style="width:5%;">设备条码</th>
          <th style="width:5%;">业务状态</th>
          <th style="width:5%;">在库状态</th>
          <th style="width:40%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox" :value="item.equipmentRepairId" v-model="delList.equipmentRepairIdList" @change="clickChange();"></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td v-text="item.equipmentName"></td>
          <td v-text="item.equipmentId" ></td>
          <td v-text="item.equipmentCode"></td>
          <td>
            <label v-if="item.businessStatus==1">已入库</label>
            <label v-if="item.businessStatus==2">初始化</label>
            <label v-if="item.businessStatus==3">安装</label>
            <label v-if="item.businessStatus==4">调试</label>
            <label v-if="item.businessStatus==5">验收</label>
          </td>
          <td v-text="item.stata">
          </td>
          <td>
            <div class="table-btn btn-yellow" @click="jumpDetail(item.equipmentEntryRecordId);">详情</div>
            <div class="table-btn btn-green" @click="jumpEdit(item.equipmentEntryRecordId);" v-if="item.businessStatus==5&&item.status!=2" >编辑</div>
            <div class="table-btn btn-again" v-if="item.status!=2&&item.status!=3" @click="jumpCSH(item,'csh');">初始化</div>
            <div class="table-btn btn-submit" v-if="item.status!=2&&item.status!=3" @click="jumpAZ(item,'az')">安装</div>
            <div class="table-btn btn-green" v-if="item.status!=2&&item.status!=3" style="background: #F15C6F;" @click="jumpTS(item,'ts');">调试</div>
            <div class="table-btn btn-green" v-if="item.status!=2&&item.status!=3" style="background: #FBA752;" @click="jumpYS(item,'ys');">验收</div>
            <div class="table-btn btn-green" v-if="item.status!=2&&item.status!=3" style="background: #5ECA18;" @click="jumpBY(item,'by');">保养</div>
            <div class="table-btn btn-green" v-if="item.status==0" style="background: #9CEA6A;" @click="jumpJY(item,'jy');">借用</div>
            <!-- <div class="table-btn btn-green" v-if="item.status==1" style="background: #9CEA6A;" @click="submitBack(item.equipmentRepairId);">归还</div> -->
            <div class="table-btn btn-green" v-if="item.status!=2&&item.status!=3" style="background: #F8517E;" @click="jumpGZ(item,'gz');">故障</div>
            <div class="table-btn btn-blood"   style="background: #EFCD29;" @click="jumpWX(item,'wx');" v-if="item.status!=2">维修</div>
            <div class="table-btn btn-blood" v-if="item.status==0&&item.businessStatus==5" @click="jumpBF(item,'bf');" >报废</div>
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
  import { getEquipmentList } from "../../../api/devicesManage/equipmentEntryRecord";
  import {submitBackByCheck} from "../../../api/devicesManage/borrow";


  export default {
        name:"standing",
    data() {
      return {
        sortOrder: "0", //0 顺序，1 倒序
        postData: {
          equipmentName: this.$route.query.equipmentName?this.$route.query.equipmentName:"",
          equipmentCode: this.$route.query.equipmentCode?this.$route.query.equipmentCode:"",
          equipmentType: this.$route.query.equipmentType?this.$route.query.equipmentType:"",
          pageSize: 10,
          pageNo: this.$route.query.pageNo?this.$route.query.pageNo:1,
          name:"standing"
        },
        grainVarietyList: "",
        grainOilLevelList: "",
        inventoryPropertyList: "",
        allChecked: false,
        delList: {
          equipmentRepairIdList: []
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
        getEquipmentList(vm.postData)
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
      jumpDetail: function(id) {
        //跳转到详情
        var vm = this;
        this.$router.push({
          name: "putinDetail",
          query: {
            id: id,
            equipmentName:vm.postData.equipmentName,
            equipmentCode:vm.postData.equipmentCode,
            equipmentType:vm.postData.equipmentType,
            name:vm.postData.name,
            pageNo:vm.postData.pageNo


          }
        });
      },
      jumpCSH: function(data,type) {
        //跳转到初始化
        var vm = this;
        this.$router.push({
          name: "initializeEdit",
          query: {
            data: data,
            type:type,
            equipmentName:vm.postData.equipmentName,
            equipmentCode:vm.postData.equipmentCode,
            equipmentType:vm.postData.equipmentType,
            name:vm.postData.name,
            pageNo:vm.postData.pageNo
          }
        });
      },
      jumpAZ: function(data,type) {
        //跳转到安装
        var vm = this;
        this.$router.push({
          name: "deviceEdit",
          query: {
            data: data,
            type:type,
            equipmentName:vm.postData.equipmentName,
            equipmentCode:vm.postData.equipmentCode,
            equipmentType:vm.postData.equipmentType,
            name:vm.postData.name,
            pageNo:vm.postData.pageNo
          }
        });
      },
      jumpTS: function(data,type) {
        //跳转到调试
        var vm = this;
        this.$router.push({
          name: "debugEdit",
          query: {
            data: data,
            type:type,
            equipmentName:vm.postData.equipmentName,
            equipmentCode:vm.postData.equipmentCode,
            equipmentType:vm.postData.equipmentType,
            name:vm.postData.name,
            pageNo:vm.postData.pageNo
          }
        });
      },
      jumpYS: function(data,type) {
        //跳转到验收
        var vm = this;
        this.$router.push({
          name: "checkEdit",
          query: {
            data: data,
            type:type,
            equipmentName:vm.postData.equipmentName,
            equipmentCode:vm.postData.equipmentCode,
            equipmentType:vm.postData.equipmentType,
            name:vm.postData.name,
            pageNo:vm.postData.pageNo
          }
        });
      },
      jumpBY: function(data,type) {
        //跳转到保养
        var vm = this;
        this.$router.push({
          name: "maintainEdit",
          query: {
            data: data,
            type:type,
            equipmentName:vm.postData.equipmentName,
            equipmentCode:vm.postData.equipmentCode,
            equipmentType:vm.postData.equipmentType,
            name:vm.postData.name,
            pageNo:vm.postData.pageNo
          }
        });
      },
      jumpJY: function(data,type) {
        //跳转到借用
        var vm = this;
        this.$router.push({
          name: "returnEdit",
          query: {
            data: data,
            type:type,
            equipmentName:vm.postData.equipmentName,
            equipmentCode:vm.postData.equipmentCode,
            equipmentType:vm.postData.equipmentType,
            name:vm.postData.name,
            pageNo:vm.postData.pageNo
          }
        });
      },
      jumpGZ: function(data,type) {
        //跳转到故障
        var vm = this;
        this.$router.push({
          name: "faultEdit",
          query: {
            data: data,
            type:type,
            equipmentName:vm.postData.equipmentName,
            equipmentCode:vm.postData.equipmentCode,
            equipmentType:vm.postData.equipmentType,
            name:vm.postData.name,
            pageNo:vm.postData.pageNo
          }
        });
      },
      jumpWX: function(data,type) {
        //跳转到维修
        var vm = this;
        this.$router.push({
          name: "repairEdit",
          query: {
            data: data,
            type:type,
            equipmentName:vm.postData.equipmentName,
            equipmentCode:vm.postData.equipmentCode,
            equipmentType:vm.postData.equipmentType,
            name:vm.postData.name,
            pageNo:vm.postData.pageNo
          }
        });
      },
      jumpBF: function(data,type) {
        //跳转到报废
        var vm = this;
        this.$router.push({
          name: "scrapEdit",
          query: {
            data: data,
            type:type,
            equipmentName:vm.postData.equipmentName,
            equipmentCode:vm.postData.equipmentCode,
            equipmentType:vm.postData.equipmentType,
            name:vm.postData.name,
            pageNo:vm.postData.pageNo
          }
        });
      },
      jumpEdit:function (id) {
        var vm = this;
        this.$router.push({
          name: "standingEdit",
          query: {
            id: id,
            equipmentName:vm.postData.equipmentName,
            equipmentCode:vm.postData.equipmentCode,
            equipmentType:vm.postData.equipmentType,
            name:vm.postData.name,
            pageNo:vm.postData.pageNo
          }
        });
        
      },
      detailBack:function () {
          this.$router.push({
            name: "device"
          });
      },
    },
    mounted() {
      this.getList(this.postData.pageNo);
    }
  };
</script>

