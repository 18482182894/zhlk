<template>
  <div class="content">
    <div class="menuManage operationLog priceManage">
      <div class="lookup">
       设备名称
        <input name="" class="select-style excision" v-model="postData.equipmentName">
          <!--<option v-for="item in grainVarietyList" :value="item.grainVarietyId" v-text="item.grainVarietyName"></option>-->

        <!--等  &nbsp; &nbsp; &nbsp;  级：-->
        <!--<select name="" class="select-style excision" v-model="postData.grainOilLevelId">-->
          <!--<option v-for="item in grainOilLevelList" :value="item.dicInfoCode" v-text="item.dicInfoValue"></option>-->
        <!--</select>-->
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
        <div class="btn btn-add" @click="jumpadd('','');">
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
          <th style="width:7.5%;">设备名称</th>
          <th style="width:7.5%;">设备类型</th>
          <th style="width:10%;">负责人</th>
          <th style="width:5%;">维修电话</th>
          <th style="width:10%;">设备安装时间</th>
          <th style="width:10%;">编辑状态</th>
          <th style="width:10%;">审核状态</th>
          <th style="width:30%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox" :value="item.equipmentInstall" v-model="delList.equipmentInstalls" @change="clickChange();"></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td v-text="item.equipmentName"></td>
          <td v-text="item.equipmentTypeValue" ></td>
          <td v-text="item.installAdminName"></td>
          <td v-text="item.telephone"></td>
          <td v-text="item.createTime"></td>
          <!--<td v-text="item.remark"></td>-->
          <td v-text="item.draftStatus==0?'草稿':'正式文档'"></td>
          <!-- <td v-text="item.customerStatus"></td> -->
          <td>
            <label v-if="item.status==-1" class="fc-red">尚未提交</label>
            <label v-if="item.status==0" class="fc-red">审核不通过</label>
            <label v-if="item.status==10">未审核</label>
            <label v-if="item.status==11" class="fc-green">审核中</label>
            <label v-if="item.status==99" class="fc-green">审核通过</label>
          </td>
          <td>
            <div class="table-btn btn-yellow" @click="jumpDetail(item.equipmentInstall);">详情</div>
            <div class="table-btn btn-green" @click="jumpEdit(item.equipmentInstall,'edit');" v-if="item.draftStatus==0">编辑</div>
            <!--<div class="table-btn btn-change" v-if="item.status==99" @click="jumpEdit(item.customerId,'add');">信息变更</div>-->
            <!--<div class="table-btn btn-blood" v-if="item.status==99" @click="jumpBadRecord(item.customerName);">不良记录</div>-->
            <div class="table-btn btn-submit" @click="submitAudit(item.equipmentInstall);" v-if="item.draftStatus==0">提交审核</div>
            <!-- <div class="table-btn btn-again" v-if="item.status==0" @click="jumpEdit(item,'add');">再次申请</div> -->
            <div class="table-btn btn-red" @click="delData(item.equipmentInstall);" v-if="item.draftStatus==0">删除</div>
          </td>
        </tr>
        </tbody>
      </table>
      <!--&lt;!&ndash; 分页容器 &ndash;&gt;-->
      <div id="PageBar"></div>
    </div>
    <div class="detail-back">
        <button @click="detailBack();">返回</button>
    </div>
  </div>
</template>

<script>
  import { getDeviceInstallByList , deleDeviceInstall,submitDeviceInstallByCheck} from "../../../api/devicesManage/deviceManage";

  export default {
        name: "build",
      data() {
        return {
          sortOrder: "0", //0 顺序，1 倒序
          postData: {
            equipmentName:this.$route.query.equipmentName?this.$route.query.equipmentName:"",
            equipmentType:this.$route.query.equipmentType?this.$route.query.equipmentType:"",
            pageSize: 10,
            name:"build",
            pageNo:this.$route.query.pageNo?this.$route.query.pageNo:0
          },
          grainVarietyList: "",
          grainOilLevelList: "",
          inventoryPropertyList: "",
          allChecked: false,
          delList: {
            equipmentInstalls: [],
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
        getDeviceInstallByList(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.listData = ret.data.equipmentInstallList;
              // console.log (vm.listData)
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
          vm.delList.equipmentInstalls = [];
          vm.delList.equipmentInstalls.push(id);
        } else {
          if (vm.delList.customerIdList.length == []) {
            layer.msg("请至少选择一条数据！");
            return;
          }
        }
        layer.confirm('确定删除？', {
          btn: ['确定','取消'] //按钮
        }, function(){
          layer.load(2);
          var delStr = vm.delList.equipmentInstalls.join(",");
          deleDeviceInstall({ equipmentInstalls: delStr })
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
            vm.delList.equipmentInstalls.push(vm.listData[i].equipmentInstall);
          }
        } else {
          vm.delList.equipmentInstalls = [];
        }
      },
      clickChange: function() {
        //监听input选中状态，控制全选input的选中
        var vm = this;
        if (vm.delList.equipmentInstalls.length == vm.listData.length) {
          vm.allChecked = true;
        } else {
          vm.allChecked = false;
        }
      },
      jumpDetail: function(id) {
        //跳转到详情
        var vm = this;
        this.$router.push({
          name: "deviceDetail",
          query: {
            id: id,
            equipmentName:vm.postData.equipmentName,
            equipmentType:vm.postData.equipmentType,
            name:vm.postData.name,
            pageNo:vm.postData.pageNo
          }
        });
      },
      jumpEdit: function(id,type) {
        //跳转到编辑或新增页面
        var vm = this;
        this.$router.push({
          name: "deviceEdit",
          query: {
            id: id,
            type:type,
            equipmentName:vm.postData.equipmentName,
            equipmentType:vm.postData.equipmentType,
            name:vm.postData.name,
            pageNo:vm.postData.pageNo
          }
        });
      },
      jumpadd:function () {//跳转到设备选择界面
        var vm = this;
        this.$router.push({
          name: "choice",
          query: {
            type: 'az',
            equipmentName:vm.postData.equipmentName,
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
      submitAudit:function (id) {//提交审核
          var vm=this;
          submitDeviceInstallByCheck({ equipmentInstall: id }).then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("提交成功！");
                vm.getList(1);
              } else {
                layer.alert(ret.data, { closeBtn: 0 });
              }
          }).catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
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
