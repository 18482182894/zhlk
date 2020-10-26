<template>
    <div class="content">
        <div class="menuManage operationLog company">
            <!-- <div>
                <div class="btn btn-add">
                    <img src="../../../../../static/images/search.png" alt="">
                    <label>查找</label>
                </div>
            </div>
            <div class="lookup">
                企业名称：
                <input type="text" class="input-text excision" name="" value="" placeholder="">
                企业编号：
                <input type="text" class="input-text excision" name="" value="" placeholder="">
                省 份：
                <input type="text" class="input-text excision" name="" value="" placeholder="">
                城 市：
                <input type="text" class="input-text excision" name="" value="" placeholder="">
            </div> -->
            <div>
                <div class="btn btn-add" @click="jumpEdit('','');">
                    <img src="../../../../../static/images/add.png" alt="">
                    <label>新增</label>
                </div>
                <!-- <select name="" class="select-style">
                    <option value="">显示条数</option>
                </select> -->
                <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
                    <option value="">排序方式</option>
                    <option value="0">顺序</option>
                    <option value="1">倒序</option>
                </select>
            </div>
            <table class="customTable">
                <thead>
                    <tr>
                        <th><input type="checkbox" ></th>
                        <th>序号</th>
                        <th>企业名称</th>
                        <th>企业编码</th>
                        <th>企业性质</th>
                        <th>隶属企业</th>
                        <th>业务类型</th>
                        <!-- <th style="width:5%;">编辑状态</th> -->
                        <th style="width:7.5%;">审核状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in listData">
                        <td><input type="checkbox" ></td>
                        <td v-if="sortOrder=='0'" v-text="i+1"></td>
                        <td v-else v-text="listData.length-i"></td>
                        <td v-text="item.enterpriseName"></td>
                        <td v-text="item.enterpriseCode"></td>
                        <td v-text="item.enterpriseProperty"></td>
                        <td v-text="item.relateType"></td>
                        <td v-text="item.businessType"></td>
                        <!-- <td v-text="item.draftStatus==0?'草稿':'正式文档'"></td> -->
                        <td>
                          <label v-if="item.auditState==-1">未提交</label>
                          <label v-if="item.auditState==0" class="fc-red">审核不通过</label>
                          <label v-if="item.auditState==10">未审核</label>
                          <label v-if="item.auditState==11" class="fc-green">审核中</label>
                          <label v-if="item.auditState==99" class="fc-green">审核通过</label>
                        </td>
                        <td>
                            <div class="table-btn btn-yellow" @click="jumpDetail(item.enterpriseCode);">详情</div>
                            <div class="table-btn btn-green" @click="jumpEdit(item.enterpriseCode,'edit');" v-if="item.auditState==-1">编辑</div>
                            <div class="table-btn btn-change" v-if="item.auditState==99" @click="jumpEdit(item.enterpriseCode,'change');">信息变更</div>
                            <div class="table-btn btn-submit" @click="submitAudit(item.enterpriseCode);" v-if="item.auditState==-1">提交审核</div>
                            <div class="table-btn btn-again" v-if="item.auditState==0" @click="jumpEdit(item.enterpriseCode,'add');">再次申请</div>
                            <div class="table-btn btn-red" @click="delData(item.enterpriseCode);" v-if="item.auditState==-1">删除</div>
                        </td>
                    </tr>
                </tbody>
            </table>
          <div class="detail-back">
            <button @click="detailBack()">返回</button>
          </div>
        </div>
    </div>
</template>

<script>
import { companyList, companyDel,companyApproval } from "@/api/systemManage/basicData/company";
export default {
  name: "company",
  data() {
    return {
      allChecked: false,
      sortOrder: "0", //0 顺序，1 倒序
      delList: {
        enterpriseCode: ""
      },
      listData: []
    };
  },
  methods: {
    getList: function() {
      //获取列表
      var vm = this;
      layer.load(2);
      companyList({})
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.dataList;
          }else {
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
    changeSortOrder: function() {
      var vm = this;
      vm.listData.reverse();
    },
    delData: function(id) {
      //删除
      var vm = this;
      vm.delList.enterpriseCode = id;
      layer.load(2);
      layer.confirm('确定删除？', {
        btn: ['确定','取消'] //按钮
      }, function(){
      companyDel(vm.delList)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("删除成功！");
            vm.delList.enterpriseCode = "";
            vm.getList(1);
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
      });
    },
    submitAudit: function(id) {
      //提交审核
      var vm = this;
      companyApproval({ enterpriseCode: id })
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
    },
    jumpEdit: function(id,type) {
      var vm = this;
      this.$router.push({
        name: "companyEdit",
        query: {
          id: id,
          type:type
        }
      });
    },
    jumpDetail: function(id) {
      var vm = this;
      this.$router.push({
        name: "companyDetail",
        query: {
          id: id
        }
      });
    },
    detailBack: function() {
      this.$router.push({
        name: "basicDataMain"
      });
    }
  },
  mounted() {
    var vm = this;
    vm.getList(1);
  }
};
</script>
