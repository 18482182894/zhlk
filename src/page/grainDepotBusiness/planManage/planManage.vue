<template>
  <div class="content">
    <div class="menuManage operationLog">
      <div class="lookup">
        计划名称：
        <input type="text" class="input-text excision" v-model="postData.planName">
        计划类型：
        <select name class="select-style excision" v-model="postData.executeType">
          <option value=''>请选择</option>
          <option value="1">收储计划</option>
          <option value="2">销售计划</option>
          <option value="3">轮换计划</option>
        </select>
        粮食品种：
        <div class="grainVariety excision">
            <treeselect v-model="postData.grainKindId" :multiple="false" :options="grainVarietyList" />
        </div>
        粮食性质：
        <select name class="select-style" v-model="postData.grainAttributeId">
          <option value=''>请选择</option>
          <option
            v-for="item in grainNatureList"
            :value="item.dicInfoCode"
            v-text="item.dicInfoValue"
          ></option>
        </select>
          <div class="btn btn-add" @click="getList(0);">
            <img src="../../../../static/images/search.png" alt>
            <label>查找</label>
          </div>
      </div>
      <div>
        <div class="btn btn-add" @click="jumpEdit('','add');">
          <img src="../../../../static/images/add.png" alt>
          <label>新增</label>
        </div>
        <select name class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value>排序方式</option>
          <option value="0">正序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
          <tr>
            <th style="width:2.5%;">
              <input type="checkbox" v-model="allChecked" @change="checkAll();">
            </th>
            <th style="width:2.5%;">序号</th>
            <th style="width:5%;">计划名称</th>
            <th style="width:5%;">计划类型</th>
            <th style="width:5%;">粮食品种</th>
            <th style="width:5%;">粮食性质</th>
            <th style="width:5%;">粮食等级</th>
            <th style="width:8.5%;">要求数量（千克）</th>
            <th style="width:5%;">库点</th>
            <th style="width:5%;">计划状态</th>
            <th style="width:10%;">计划进度</th>
            <th style="width:5%;">编辑状态</th>
            <th style="width:7.5%;">审核状态</th>
            <th style="width:29%;">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in listData">
            <td>
              <input
                type="checkbox"
                :value="item.planId"
                v-model="planIdList"
                @change="clickChange();"
              >
            </td>
            <td v-if="sortOrder=='0'" v-text="i+1"></td>
            <td v-else v-text="listData.length-i"></td>
            <td v-text="item.planName"></td>
            <td>
              <label v-if="item.executeType==1">收储计划</label>
              <label v-if="item.executeType==2">销售计划</label>
              <label v-if="item.executeType==3">轮换计划</label>
            </td>
            <td v-text="item.grainKind"></td>
            <td v-text="item.grainAttribute"></td>
            <td v-text="item.grainOilLevel"></td>
            <td v-text="item.demandQuantity"></td>
            <td v-text="item.grainDepotName"></td>
            <td>
              <label v-if="item.planStatus==1">新建</label>
              <label v-if="item.planStatus==2">生效</label>
              <label v-if="item.planStatus==3">作废</label>
              <label v-if="item.planStatus==4">完成</label>
              <label v-if="item.planStatus==5">变更</label>
            </td>
            <td>
              <label v-text="item.planProgress"></label>
              <br>
              <div class="planProgress">
                <div class="planProgress-content" :style="'width:'+item.planProgress"></div>
              </div>
            </td>
            <td v-text="item.draftStatus==0?'草稿':'正式文档'"></td>
            <td>
              <label v-if="item.status==0" class="fc-red">审核不通过</label>
              <label v-if="item.status==10">未审核</label>
              <label v-if="item.status==11" class="fc-green">审核中</label>
              <label v-if="item.status==99" class="fc-green">审核通过</label>
            </td>
            <td>
              <div class="table-btn btn-yellow" @click="jumpDetail(item.planId);">详情</div>
              <div class="table-btn btn-green" @click="jumpEdit(item.planId,'edit');" v-if="item.draftStatus==0">编辑</div>
              <div class="table-btn btn-change" v-if="item.status==99&&item.planStatus!=3" @click="jumpEdit(item.planId,'edit');">变更计划</div>
              <div class="table-btn btn-submit" @click="submitAudit(item.planId);" v-if="item.draftStatus==0">提交审核</div>
              <div class="table-btn btn-again" v-if="item.status==0" @click="jumpEdit(item.planId,'add');">再次申请</div>
              <div class="table-btn btn-red" @click="delData(item.planId);" v-if="item.draftStatus==0">删除</div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar"></div>
    </div>
  </div>
</template>
<style type="text/css" scoped>
.lookup .excision {
  margin-right: 1rem;
}
</style>
<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { getPlanList, delePlan, addPlanByCheck } from "@/api/business/plan";
import { grainVariety, grainNature } from "@/api/systemManage/dropDown";
export default {
  name: "planManage",
  components: { Treeselect },
  data() {
    return {
      sortOrder: "0", //0 顺序，1 倒序
      postData: {
        planName: this.$route.query.planName,
        executeType: this.$route.query.executeType,
        grainKindId: this.$route.query.grainKindId,
        grainAttributeId: this.$route.query.grainAttributeId,
        pageSize: 10,
        pageNo: 0
      },
      grainVarietyList: "",
      grainNatureList: "",
      inventoryPropertyList: "",
      allChecked: false,
      planIdList: [],
      listData: []
    };
  },
  methods: {
    changeSortOrder: function() {
      //倒序
      var vm = this;
      vm.listData.reverse();
    },
    getList: function(pageNo) {
      //获取列表
      var vm = this;
      vm.postData.pageNo = pageNo;
      layer.load(2);
      getPlanList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.planList;
            console.log(vm.listData)
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
        vm.planIdList = [];
        vm.planIdList.push(id);
      } else {
        if (vm.planIdList.length == 0) {
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
          var delstr = vm.planIdList.join(",");
          delePlan({ planIdList: delstr })
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
    getDropDown: function() {
      //获取下拉项
      var vm = this;
      grainVariety({})
        .then(ret => {
          //粮食品种
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret));
            vm.grainVarietyList = ret.data.grainVarietyList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });

      grainNature({})
        .then(ret => {
          //粮食性质
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.grainNatureList = ret.data.dataList;
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
          vm.planIdList.push(vm.listData[i].planId);
        }
      } else {
        vm.planIdList = [];
      }
    },
    clickChange: function() {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (vm.planIdList.length == vm.listData.length) {
        vm.allChecked = true;
      } else {
        vm.allChecked = false;
      }
    },
    jumpDetail: function(id,planName,executeType,grainKindId,pageNo,grainAttributeId) {
      //跳转到详情
      var vm = this;
      this.$router.push({
        name: "planManageDetail",
        query: {
          id: id,
          planName:vm.postData.planName,
          executeType:vm.postData.executeType,
          grainKindId:vm.postData.grainKindId,
          grainAttributeId:vm.postData.grainAttributeId,
          pageNo:vm.postData.pageNo
        }
      });
    },
    jumpEdit: function(id, type,planName,executeType,grainKindId,pageNo,grainAttributeId) {
      //跳转到编辑或新增页面
      var vm = this;
      this.$router.push({
        name: "planManageEdit",
        query: {
          id: id,
          type: type,
          planName:vm.postData.planName,
          executeType:vm.postData.executeType,
          grainKindId:vm.postData.grainKindId,
          grainAttributeId:vm.postData.grainAttributeId,
          pageNo:vm.postData.pageNo
        }
      });
    },
    submitAudit: function(id) {
      //提交审核
      var vm = this;
      addPlanByCheck({ planId: id })
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
    }
  },
  mounted() {
    this.getList(0);
    this.getDropDown();
  }
};
</script>
