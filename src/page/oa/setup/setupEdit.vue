<template>
  <div class="content">
    <div class="menuManage userManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">基础信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
                            <span>
                                <label>流程编号：</label>
                                <input type="text" class="input-text" v-model="submitData.flow_id">
                            </span>
              <span>
                                <label>流程名称：</label>
                                <input type="text" class="input-text" v-model="submitData.flow_name">
                            </span>
              <span>
                                <label>流程简述：</label>
                                <input type="text" class="input-text" v-model="submitData.flow_desc">
                            </span>
              <span>
                                <label>备注：</label>
                                <input type="text" class="input-text" v-model="submitData.memo">
                            </span>
            </div>
          </div>
        </div>
      </div>
      <div class="tag-box" v-if="postData.flow_id">
        <div class="tag-box-top">
          <div class="tag-title">节点信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
                            <span>
                                <label>节点名称：</label>
                                <input type="text" class="input-text"  v-model="nodeDetail.node_name">
                            </span>
              <span>
                                <label>节点编号：</label>
                                <input type="text" class="input-text" v-model="nodeDetail.node_id">
                            </span>
              <span>
                                <label>节点重复次数：</label>
                                <input type="text" class="input-text" v-model="nodeDetail.node_repeat_times">
                            </span>

              <span>
                                <label>节点状态值：</label>
                                <input type="text" class="input-text" v-model="nodeDetail.node_status">
                            </span>
              <span>
                                <label>节点类型：</label>
                                <select name="" class="select-style" v-model="nodeDetail.node_type">
                                    <option value="0">串行</option>
                                    <option value="1">并行</option>
                                </select>
                            </span>
              <span>
                                <label>节点描述：</label>
                                <input type="text" class="input-text" v-model="nodeDetail.node_desc">
                            </span>
            </div>
            <div class="edit-btn">
              <button class="edit-submit" @click="submitNode();" v-text="btnText"></button>
            </div>
          </div>
        </div>
      </div>
      <div class="tag-box"  v-if="postData.flow_id">
        <div class="tag-box-top">
          <div class="tag-title">信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <table class="customTable">
                <thead>
                <tr>
                  <th style="width:2.5%;"><input type="checkbox"></th>
                  <th style="width:2.5%;">序号</th>
                  <th style="width:7.5%;">节点名称</th>
                  <th style="width:7.5%;">重复次数</th>
                  <th style="width:10%;">节点类型</th>
                  <th style="width:10%;">节点排序号</th>
                  <th style="width:10%;">审批人</th>
                  <th style="width:30%;">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,i) in nodeList">
                  <td><input type="checkbox"></td>
                  <td  v-text="i+1"></td>
                  <td v-text="item.node_name"></td>
                  <td v-text="item.node_repeat_times" ></td>
                  <td v-text="item.node_type"></td>
                  <td v-text="item.node_sort_no"></td>
                   <td v-text="item.staff_names"></td>
                  <td>
                    <div class="table-btn btn-yellow newbtn" @click="editEvent(item);">编辑</div>
                    <div class="table-btn btn-submit newbtn" @click="showPopup(item.node_id,'');">添加审核人</div>
                    <div class="table-btn btn-red newbtn" v-if="item.staff_names!=''" @click="showPopup(item.node_id,'del');">删除</div>
                    <div class="table-btn btn-red newbtn" v-else @click="delNode(item.node_id,postData.flow_id,item.node_sort_no);">删除</div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>

        <!-- 弹出层 -->
        <div class="popup" :style="editPopup==1?'display:block;':''">
            <div class="popup-main planPopup-edit-main operationLog">
                <div class="popup-title">
                    <label v-if="popupType=='del'">删除审批人</label>
                    <label v-else>选择审批人</label>
                    <em class="popup-close" @click="closePopup('edit');">×</em>
                </div>
                <div class="popup-content" v-if="popupType=='del'">
                    <div class="plan-document">
                        <table class="customTable">
                            <thead>
                              <tr>
                                <th style="width:5%;"><input type="checkbox"></th>
                                <th style="width:5%;">序号</th>
                                <th style="width:15%;">姓名</th>
                                <th style="width:15%;">岗位</th>
                                <th style="width:20%;">电话</th>
                                <th style="width:10%;">操作</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(item,i) in approverList">
                                <td><input type="checkbox"></td>
                                <td v-text="i+1"></td>
                                <td v-text="item.staffName"></td>
                                <td v-text="item.positionName"></td>
                                <td v-text="item.mobileNo"></td>
                                <td>
                                  <div class="table-btn btn-yellow" @click="checkStaff(item.staffId);">删除</div>
                                </td>
                              </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="popup-content" v-else >
                    <div class="plan-document">
                        <table class="customTable">
                            <thead>
                              <tr>
                                <th style="width:5%;"><input type="checkbox"></th>
                                <th style="width:5%;">序号</th>
                                <th style="width:15%;">姓名</th>
                                <th style="width:15%;">岗位</th>
                                <th style="width:20%;">电话</th>
                                <th style="width:10%;">操作</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(item,i) in staffList">
                                <td><input type="checkbox"></td>
                                <td v-text="i+1"></td>
                                <td v-text="item.staffName"></td>
                                <td v-text="item.positionName"></td>
                                <td v-text="item.mobileNo"></td>
                                <td>
                                  <div class="table-btn btn-yellow" @click="checkStaff(item.staffId);">选择</div>
                                </td>
                              </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
      <div class="edit-btn">
        <button class="edit-submit" @click="submitEvent();">提交</button>
        <button class="edit-back" @click="detailBack();">返回</button>
      </div>
    </div>
  </div>
</template>
<style scoped >
  .newbtn{
    width: auto;
    min-width: 60px;
    padding: 0 10px;
    font-size: 15px;
    color: white;
  }

</style>


<script>
  import {customFlow, editFlow , detailFlow} from "../../../api/workflow/flow";
  import { getNodeList, addNewNode, editNode, deleNode } from "../../../api/workflow/specialNode";
  import { addChecker, deleChecker } from "../../../api/workflow/checker";
  import { getCheckerList } from "../../../api/workflow/checkDoc";

  export default {
        name: "setupEdit",
      data() {
        return {
          postData: {
            flow_id: this.$route.query.id
          },
          editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
          submitData: {
            flow_id: "",
            flow_name: "",
            flow_desc: "",
            memo:'',
          },
          nodeDetail:{
              node_id:'',
              flow_id:this.$route.query.id,
              node_name:'',
              node_desc:'',
              node_status:'',
              node_repeat_times:'',
              node_type:'',
          },
          nodeId:'',
          nodeList:'',
          popupType:'',
          staffList:'',
          approverList:'',
          btnText:'添加节点'
        };
      },
      methods: {
        getDetail: function() {
          var vm = this;
          layer.load(2);
          detailFlow(vm.postData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                console.log(JSON.stringify(ret.data.flowDetail))
                vm.submitData.flow_id = ret.data.flowDetail.flow_id;
                vm.submitData.flow_name = ret.data.flowDetail.flow_name;
                vm.submitData.flow_desc = ret.data.flowDetail.flow_desc;
                vm.submitData.memo = ret.data.flowDetail.memo;
                vm.nodeList = ret.data.flowDetail.nodeList;
                // vm.$nextTick(function() {
                //   vm.getDropDown();
                // });
              } else {
                layer.alert(err.message, { closeBtn: 0 });
              }
            })
            .catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
            });
        },
        getNodeList: function() {
          var vm = this;
          layer.load(2);
          getNodeList(vm.postData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                // console.log(JSON.stringify(ret))
                vm.nodeList=ret.data.dataList;
              } else {
                layer.alert(err.message, { closeBtn: 0 });
              }
            })
            .catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
            });
        },
        showPopup: function(id,type) {// 展示弹出层
            var vm = this;
            vm.popupType=type;
            vm.nodeId=id;
            vm.getStaffNamesList(id);
            vm.editPopup = 1;
        },
        closePopup: function() {// 隐藏弹出层
            var vm = this;
            vm.editPopup = 0;
        },
        getStaffNamesList: function(id) {
          var vm = this;
          layer.load(2);
          getCheckerList({nodeId:id})
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                console.log(JSON.stringify(ret))
                vm.staffList=ret.data.candidateList;
                vm.approverList=ret.data.approverList;

              } else {
                layer.alert(ret.data, { closeBtn: 0 });
                vm.staffList='';
                vm.approverList='';
                vm.closePopup();
              }
            })
            .catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
            });
        },
        submitEvent: function() {//编辑流程
          let flow_name=this.$route.query.flow_name;
          let pageNo=this.$route.query.pageNo;
          var vm = this;
          if (vm.submitData.flow_id == "") {
            layer.msg("请填写流程编号");
            return;
          }
          if (vm.submitData.flow_name == "") {
            layer.msg("请填写流程简述");
            return;
          }
          if (vm.submitData.flow_desc == "") {
            layer.msg("请填写流程简述");
            return;
          }
          if (this.$route.query.id) {
            layer.load(2);
            editFlow(vm.submitData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  layer.msg("编辑申请报销成功！");
                  this.$router.push({
                    name: "setupList",
                    query: {
                      flow_name:flow_name,
                      pageNo:pageNo
                    }
                  });
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
          } else {
            layer.load(2);
            customFlow(vm.submitData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  layer.msg("新增申请报销成功！");
                  this.$router.push({
                    name: "setupList",
                    query: {
                      flow_name:flow_name,
                      pageNo:pageNo
                    }
                  });
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
          }
        },
        submitNode:function () {//编辑节点
          var vm=this;

          if (vm.nodeDetail.node_name == "") {
            layer.msg("请填写节点名称");
            return;
          }
          if (vm.nodeDetail.node_id == "") {
            layer.msg("请填写节点编号");
            return;
          }
          if (vm.nodeDetail.node_repeat_times == "") {
            layer.msg("请填写节点重复次数");
            return;
          }
          console.log(vm.nodeDetail.node_type)
          if (vm.nodeDetail.node_type === "") {
            layer.msg("请填写节点类型");
            return;
          }
          if (vm.nodeDetail.node_status == "") {
            layer.msg("请填写节点状态值");
            return;
          }
          if (vm.nodeDetail.node_desc == "") {
            layer.msg("请填写节点描述");
            return;
          }
          if (vm.btnText=='添加节点') {
            addNewNode(vm.nodeDetail)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  layer.msg("添加节点成功！");
                  vm.getDetail();
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
          }else{
            editNode(vm.nodeDetail)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  layer.msg("编辑节点成功！");
                  vm.getDetail();
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });

          }
        },
        checkStaff:function (id) {//选择删除审批人
          var vm=this;
          if (vm.popupType=='del') {
            deleChecker({nodeId:vm.nodeId,staffIdList:id})
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  layer.msg("删除审批人成功！");
                  vm.closePopup();
                  vm.getDetail();

                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
          }else{
            addChecker({nodeId:vm.nodeId,staffIdList:id})
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  layer.msg("编辑审批人成功！");
                  vm.closePopup();
                  vm.getDetail();

                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
          }
        },
        editEvent:function (item) {
          var vm=this;
          console.log(JSON.stringify(item))
          vm.nodeDetail.node_id=item.node_id;
          vm.nodeDetail.flow_id=vm.$route.query.id;
          vm.nodeDetail.node_name=item.node_name;
          vm.nodeDetail.node_desc=item.node_desc;
          vm.nodeDetail.node_status=item.node_status;
          vm.nodeDetail.node_repeat_times=item.node_repeat_times;
          vm.nodeDetail.node_type=item.node_type;
          vm.btnText='编辑节点';
        },
        delNode:function (node,flow,sort) {//删除节点
          var vm=this;
          deleNode({
            node_id:node,
            flow_id:flow,
            node_sort_no:sort
          }).then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                  layer.msg("删除节点成功！");
                  vm.getDetail();
              } else {
                layer.alert(ret.data, { closeBtn: 0 });
              }
            })
            .catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
            });

        },
        detailBack:function () {
          var vm=this;
          let flow_name=this.$route.query.flow_name;
          let pageNo=this.$route.query.pageNo;
          this.$router.push({
            name: "setupList",
            query: {
              flow_name:flow_name,
              pageNo:pageNo
            }
          });
        }
      },
      mounted() {
        var vm = this;
        // vm.getDropDown();
        if (this.$route.query.id) {
          vm.getDetail();
        }
      }
    };
</script>
