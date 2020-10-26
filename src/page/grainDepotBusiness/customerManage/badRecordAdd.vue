<template>
    <div class="content">
        <div class="menuManage roleManage">
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">基本信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail userManage-edit">
                        <div>
                            <span>
                                客户编号:
                                <input type="text" class="input-text" readonly="readonly" placeholder="选择客户" @click="showPopup();" v-model="submitData.customerId">
                            </span>
                            <span>
                                客户名称:
                                <input type="text" class="input-text" v-model="submitData.customerName">
                            </span>
                            <span>
                                发生日期：
                                <input type="text" class="input-text Wdate" onclick="WdatePicker({})"  id="happenDate" >
                            </span>
                            <span>
                                记录类型：
                                <select name="" class="select-style" v-model="submitData.recordType">
                                    <option :value="item.dicInfoValue" v-for="item in badRecordTypeList" v-text="item.dicInfoValue"></option>
                                </select>
                            </span>
                            <span>
                                涉及金额：
                                <input type="number" class="input-text" v-model="submitData.money">
                            </span>
                            <span>
                                涉及数量：
                                <input type="number" class="input-text" v-model="submitData.quantity">
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="edit-btn">
                <button class="edit-submit" @click="submitEvent();">提交</button>
                <button class="edit-back" @click="detailBack();">返回</button>
            </div>
        </div>

        <!-- 选择客户弹出层 -->
        <div class="popup" :style="editPopup==1?'display:block;':''">
            <div class="popup-main planPopup-edit-main operationLog">
                <div class="popup-title">
                    <label>选择客户</label>
                    <em class="popup-close" @click="closePopup('edit');">×</em>
                </div>
                <div class="popup-content" >

                    <div class="lookup">
                      客户名称：
                      <input type="text" class="input-text excision" v-model="postData.customerName">
                      客户类型：
                      <select name="" class="select-style  excision" v-model="postData.classify">
                        <option value="">客户类型</option>
                        <option value="true">个人客户</option>
                        <option value="false">企业客户</option>
                      </select>
                      城 市：
                      <input type="text" class="input-text " v-model="postData.district">


                        <div class="btn btn-add"  @click="getList(1);">
                          <img src="../../../../static/images/search.png" alt="">
                          <label>查找</label>
                        </div>
                    </div>
                    <div class="plan-document">

                        <table class="customTable">
                          <thead>
                            <tr>
                              <th style="width:2.5%;"><input type="checkbox"></th>
                              <th style="width:2.5%;">序号</th>
                              <th style="width:7.5%;">客户名称</th>
                              <th style="width:7.5%;">客户类型</th>
                              <th style="width:10%;">企业性质</th>
                              <th style="width:5%;">城市</th>
                              <th style="width:10%;">联系电话</th>
                              <th style="width:10%;">客户描述</th>
                              <th style="width:30%;">操作</th>
                            </tr>
                          </thead>
                          <tbody>
                              <tr v-for="(item,i) in listData">
                                  <td><input type="checkbox" :value="item.customerId"  ></td>
                                  <td v-if="sortOrder=='0'" v-text="i+1"></td>
                                  <td v-else v-text="listData.length-i"></td>
                              <td v-text="item.customerName"></td>
                              <td v-text="item.classify=='true'?'个人客户':'企业客户'" ></td>
                              <td v-text="item.generalProperty"></td>
                              <td v-text="item.district"></td>
                              <td v-text="item.mobile"></td>
                              <td v-text="item.remark"></td>
                              <td>
                                  <div class="table-btn btn-yellow" @click="checkDocument(item);">选择</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!-- 分页容器 -->
                        <div id="PageBar"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {addCustomerBadLog } from "@/api/business/contract";
import { getCustomerList } from "@/api/business/customer";
import {
  badRecordType
} from "@/api/systemManage/dropDown";
import { checkPhone, uploadPic } from "@/utils/public";
export default {
  name: "planManageEdit",
  data() {
    return {
      postData: {
        customerName: this.$route.query.name,
        pageSize: 10,
        pageNo:1
      },
      sortOrder: "0", //0 顺序，1 倒序
      submitData: {
        customerId: "",
        customerName: "",
        happenDate: "",
        recordType: "",
        money: "",
        quantity:''
      },
      badRecordTypeList:[],
      editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
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
      getCustomerList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.customerList;
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
    showPopup: function() {// 展示弹出层
        var vm = this;
        vm.getList(1);
        vm.editPopup = 1;
    },
    closePopup: function() {// 隐藏弹出层
        var vm = this;
        vm.editPopup = 0;
    },
    checkDocument:function (data) {//选择客户
      var vm=this;
      vm.submitData.customerId=data.customerId;
      vm.submitData.customerName=data.customerName;
      vm.closePopup();
    },
    submitEvent: function() {
      var vm = this;
      if (vm.submitData.customerId == "") {
        layer.msg("请填写客户编号");
        return;
      }else{
        if (vm.submitData.customerId.length>20) {
          layer.msg("客户编号不得超过20个字符");
          return;
        }
      }
      if (vm.submitData.customerName == "") {
        layer.msg("请填写客户名");
        return;
      }else{
        if (vm.submitData.customerName.length>20) {
          layer.msg("客户名不得超过20个字符");
          return;
        }
      }
      vm.submitData.happenDate=$('#happenDate').val();
      if (vm.submitData.happenDate == "") {
        layer.msg("请填写发生日期");
        return;
      }
      addCustomerBadLog(vm.submitData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("新增不良记录成功！");
            this.$router.push({
              name: "badRecord",
              query: {
                customerName:vm.postData.customerName,
                pageNo:vm.postData.pageNo
              }
            });
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getDropDown: function() {//获取下拉项
      var vm = this;
      badRecordType({}).then(ret => {//不良记录类型
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret));
            vm.badRecordTypeList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
      }).catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
      });
    },
    detailBack:function (pageNo,customerName) {//返回
      var vm = this;
      this.$router.push({
        name: "badRecord",
        query: {
          customerName:vm.postData.customerName,
          pageNo:vm.postData.pageNo
        }
      });
    }
  },
  mounted() {
    var vm = this;
    vm.getList(1);
    vm.getDropDown();
  }
};
</script>
