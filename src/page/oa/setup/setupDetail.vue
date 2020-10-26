<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">基础信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail">
            <div>
                            <span>
                                流程编号：
                                <label v-text="detailData.flow_id"></label>
                            </span>
              <span>
                                流程名称：
                                <label v-text="detailData.flow_name"></label>
                            </span>
              <span>
                                创建时间：
                                <label v-text="detailData.create_time"></label>
                            </span>
              <span>
                                修改时间：
                                <label v-text="detailData.update_time"></label>
                            </span>
              <span>
                                流程简述：
                                <label v-text="detailData.flow_desc"></label>
                            </span>
            </div>
          </div>
        </div>
      </div>
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">节点信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail">
            <div>
              <table class="customTable">
                <thead>
                <tr>
                  <th style="width:2.5%;"><input type="checkbox"></th>
                  <th style="width:2.5%;">序号</th>
                  <th style="width:7.5%;">节点名称</th>
                  <th style="width:7.5%;">节点重复次数</th>
                  <th style="width:10%;">节点类型</th>
                  <th style="width:10%;">节点排序号</th>
                  <th style="width:30%;">审批人</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,i) in detailData.nodeList">
                  <td><input type="checkbox"></td>
                  <td  v-text="i+1"></td>
                  <!--<td v-else v-text="listData.length-i"></td>-->
                  <td v-text="item.node_name"></td>
                  <td v-text="item.node_repeat_times" ></td>
                  <td v-text="item.node_type"></td>
                  <!--<td v-text="item.remark"></td>-->
                  <td v-text="item.node_sort_no"></td>
                   <td v-text="item.staff_names"></td>
                  <!--<td>-->
                    <!--<div class="table-btn btn-yellow" @click="showPopup('add');">报销事由</div>-->
                    <!--&lt;!&ndash;<div class="table-btn btn-change" v-if="item.status==99" @click="jumpEdit(item.customerId,'add');">信息变更</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;<div class="table-btn btn-blood" v-if="item.status==99" @click="jumpBadRecord(item.customerName);">不良记录</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;<div class="table-btn btn-submit" @click="submitAudit(item.equipmentInstall);" v-if="item.draftStatus==0">提交审核</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;<div class="table-btn btn-again" v-if="item.status==0" @click="jumpEdit(item.customerId,'add');">再次申请</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;<div class="table-btn btn-red" @click="delData(item.reimbursementId);">删除</div>&ndash;&gt;-->
                  <!--</td>-->
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!--<div class="tag-box">-->
        <!--<div class="tag-box-top">-->
          <!--<div class="tag-title">附件</div>-->
        <!--</div>-->
        <!--<div class="tag-box-content">-->
          <!--<div class="upload-pic">-->
            <!--<img :src="detailData.attachmentFile" alt="">-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <div class="detail-back">
        <button @click="detailBack();">返回</button>
      </div>
      <!--<div class="popup" :style="editPopup==1?'display:block;':''">-->
        <!--<div class="popup-main rolePopup-edit-main">-->
          <!--<div class="popup-title">-->
            <!--<label v-text="popupTitle"></label>-->
            <!--<em class="popup-close" @click="closePopup();">×</em>-->
          <!--</div>-->
          <!--<div class="popup-content">-->
            <!--<p class="text-justify">-->
              <!--&lt;!&ndash;<label>角色代码：</label>&ndash;&gt;-->
              <!--<input type="text" v-model="detailData.reimbursementReason" readonly="readonly">-->
              <!--&lt;!&ndash;<input type="text" v-model="postData.roleId" v-else>&ndash;&gt;-->
            <!--</p>-->
          <!--</div>-->
          <!--<div>-->
            <!--<button class="query" @click="closePopup();">确定</button>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  import {detailFlow} from "../../../api/workflow/flow";

  export default {
        name: "setupDetail",
    data() {
      return {
        postData: {
          flow_id: this.$route.query.id
        },
        // editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
        // allChecked: false,
        // popupTitle: "",
        detailData: "",
        listData: []
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
              vm.detailData = ret.data.flowDetail;
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      },
      // showPopup: function(type, data) {
      //   // 展示弹出层
      //   var vm = this;
      //   switch (type) {
      //     // case "edit":
      //     //   vm.popupTitle = "编辑角色";
      //     //   vm.postData.roleName = data.role_name;
      //     //   vm.postData.roleId = data.role_id;
      //     //   vm.postData.memo = data.memo;
      //     //   vm.submitType = 0;
      //     //   break;
      //     case "add":
      //       vm.popupTitle = "报销事由";
      //       // vm.postData.roleName = "";
      //       // vm.postData.roleId = "";
      //       // vm.postData.memo = "";
      //       // vm.submitType = 1;
      //       break;
      //   }
      //   vm.editPopup = 1;
      // },
      // closePopup: function() {
      //   // 隐藏弹出层
      //   var vm = this;
      //   vm.editPopup = 0;
      // },
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
      // console.log( vm)
      vm.getDetail();
    }
  };
</script>

<style scoped>

</style>
