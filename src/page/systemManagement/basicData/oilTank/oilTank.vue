<template>
    <div class="content">
        <div class="menuManage operationLog oilTank">
            <div class="lookup">
                油罐名称：
                <input type="text" class="input-text excision" v-model="postData.oilcanName">
                油罐编码：
                <input type="text" class="input-text excision" v-model="postData.oilcanCode">

                <div class="btn btn-add" @click="getList(1);">
                    <img src="../../../../../static/images/search.png" alt="">
                    <label>查找</label>
                </div>
            </div>
            <div>
                <div class="btn btn-add" @click="jumpEdit();">
                    <img src="../../../../../static/images/add.png" alt="">
                    <label>新增</label>
                </div>
                <div class="btn btn-del" @click="delData();">
                    <img src="../../../../../static/images/del.png" alt="">
                    <label>删除</label>
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
                        <th><input type="checkbox" v-model="allChecked" @change="checkAll();"></th>
                        <th>序号</th>
                        <th>油罐名称</th>
                        <th>油罐编码</th>
                        <th>库点名称</th>
                        <th>库点编码</th>
                        <th>油罐状态</th>
                        <th>主要业务</th>
                        <th>企业编码</th>
                        <th>使用情况</th>
                        <th>审核状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in listData">
                        <td><input type="checkbox" :value="item.oilcanCode" v-model="delList.oilcanCodes" @change="clickChange();"></td>
                        <td v-if="sortOrder=='0'" v-text="i+1"></td>
                        <td v-else v-text="listData.length-i"></td>
                        <td v-text="item.oilcanName"></td>
                        <td v-text="item.oilcanCode"></td>
                        <td v-text="item.graindepotName"></td>
                        <td v-text="item.graindepotGbCode"></td>
                        <td v-text="item.ocState"></td>
                        <td v-text="item.primaryService"></td>
                        <td v-text="item.enterpriseCode"></td>
                        <td v-text="item.useState"></td>
                        <td>
                          <label v-if="item.auditstate==-1" class="fc-red">待审核</label>
                          <label v-if="item.auditstate==0" class="fc-red">审核不通过</label>
                          <label v-if="item.auditstate==10">未审核</label>
                          <label v-if="item.auditstate==11" class="fc-green">审核中</label>
                          <label v-if="item.auditstate==99" class="fc-green">审核通过</label>
                        </td>
                        <td>
                            <div class="table-btn btn-yellow" @click="jumpDetail(item.oilcanCode);">详情</div>
                            <div class="table-btn btn-green" @click="jumpEdit(item.oilcanCode,'edit');"  v-if="item.auditstate==-1">编辑</div>
                            <div class="table-btn btn-change" v-if="item.auditstate==99" @click="jumpEdit(item.oilcanCode,'change');">信息变更</div>
                            <div class="table-btn btn-submit" @click="submitAudit(item.oilcanCode);" v-if="item.auditstate==-1">提交审核</div>
                            <div class="table-btn btn-again" v-if="item.auditstate==0" @click="jumpEdit(item.oilcanCode,'add');">再次申请</div>
                            <div class="table-btn btn-red" @click="delData(item.oilcanCode);" v-if="item.auditstate==0">删除</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- 分页容器 -->
            <div id="PageBar"></div>
          <div class="detail-back">
            <button @click="detailBack()">返回</button>
          </div>
        </div>
    </div>
</template>

<script>
import { oilTankList, oilTankDel,oilTankApproval } from "@/api/systemManage/basicData/oilTank";
export default {
  name: "oilTank",
  data() {
    return {
      postData: {
        oilcanCode: this.$route.query.oilcanCode,
        oilcanName: this.$route.query.oilcanName,
        pageSize: 10,
        pageNo: 0
      },
      allChecked: false,
      sortOrder: "0", //0 顺序，1 倒序
      delList: {
        oilcanCodes: []
      },
      listData: []
    };
  },
  methods: {
    getList: function(pageNo) {
      //获取列表
      var vm = this;
      vm.postData.pageNo = pageNo;
      layer.load(2);
      oilTankList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            console.log(JSON.stringify(ret))
            vm.listData = ret.data.oilcanList;
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
    changeSortOrder: function() {
      //倒序
      var vm = this;
      vm.listData.reverse();
    },
    delData: function(id) {
      //删除
      var vm = this;
      if (id) {
        vm.delList.oilcanCodes = [];
        vm.delList.oilcanCodes.push(id);
      } else {
        if (vm.delList.oilcanCodes.length == []) {
          layer.msg("请至少选择一条数据！");
          return;
        }
      }
      layer.confirm('确定删除？', {
        btn: ['确定','取消'] //按钮
      }, function(){
      layer.load(2);
      var delStr = vm.delList.oilcanCodes.join(",");
      oilTankDel({ oilcanCodes: delStr })
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("删除成功！");
            vm.delList.oilcanCodes = [];
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
    checkAll: function() {
      //全选
      var vm = this;
      if (vm.allChecked) {
        for (var i = 0; i < vm.listData.length; i++) {
          vm.delList.oilcanCodes.push(vm.listData[i].oilcanCode);
        }
      } else {
        vm.delList.oilcanCodes = [];
      }
    },
    clickChange: function() {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (vm.delList.oilcanCodes.length == vm.listData.length) {
        vm.allChecked = true;
      } else {
        vm.allChecked = false;
      }
    },
    submitAudit: function(id) {
      //提交审核
      var vm = this;
      oilTankApproval({ oilcanCode: id })
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
    jumpEdit: function(id,type,oilcanName,oilcanCode,pageNo) {
      var vm = this;
      this.$router.push({
        name: "oilTankEdit",
        query: {
          id: id,
          type:type,
          oilcanCode:vm.postData.oilcanCode,
          oilcanName:vm.postData.oilcanName,
          pageNo:vm.postData.pageNo
        }
      });
    },
    jumpDetail: function(id,oilcanName,oilcanCode,pageNo) {
      var vm = this;
      this.$router.push({
        name: "oilTankDetail",
        query: {
          id: id,
          oilcanCode:vm.postData.oilcanCode,
          oilcanName:vm.postData.oilcanName,
          pageNo:vm.postData.pageNo
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
