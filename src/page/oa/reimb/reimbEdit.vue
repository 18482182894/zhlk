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
                <label>标题：</label>
                <input type="text" class="input-text" v-model="submitData.applyTitle">
              </span>
              <!-- <span>
                                <label>报销人：</label>
                                <input type="text" class="input-text" v-model="submitData.applyStaffId">
              </span>-->
            </div>
          </div>
        </div>
      </div>
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">报销信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
                <label>报销金额（元）：</label>
                <input type="number" class="input-text" v-model="addDetail.money">
              </span>
              <span>
                <label>报销类别：</label>
                <select name class="select-style" v-model="addDetail.reimbursementType">
                  <option value="1">交通费</option>
                  <option value="2">住宿费</option>
                </select>
              </span>
              <span>
                <label>费用明细：</label>
                <input type="text" class="input-text" v-model="addDetail.feeDetail">
              </span>
              <span>
                <label>发生时间：</label>
                <input
                  type="text"
                  class="input-text Wdate"
                  onclick="WdatePicker({maxDate:'%y-%M-%d',dateFmt:'yyyy-MM-dd'})"
                  id="feeHappenDatetime"
                >
              </span>
              <span style="width: 100%;">
                <label>报销事由：</label>
                <textarea class="edit-textarea" v-model="addDetail.reimbursementReason"></textarea>
              </span>
            </div>
            <div class="edit-btn">
              <button class="edit-submit" @click="saveEvent();">保存</button>
            </div>

            <table class="customTable">
              <thead>
                <tr>
                  <th style="width:5%;">
                    <input type="checkbox">
                  </th>
                  <th style="width:5%;">序号</th>
                  <th style="width:10%;">报销类别</th>
                  <th style="width:10%;">报销金额</th>
                  <th style="width:10%;">费用明细</th>
                  <th style="width:10%;">报销时间</th>
                  <th style="width:30%;">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,i) in submitData.detail.detailList">
                  <td>
                    <input type="checkbox">
                  </td>
                  <td v-text="i+1"></td>
                  <td v-text="item.reimbursementType"></td>
                  <td v-text="item.money"></td>
                  <td v-text="item.feeDetail"></td>
                  <td v-text="item.feeHappenDatetime"></td>
                  <td>
                    <button
                      class="table-btn btn-yellow"
                      @click="showPopup(item.reimbursementReason);"
                    >报销事由</button>
                    <button class="table-btn btn-red" @click="delData(i,item.money);">删除</button>
                  </td>
                </tr>
                <tr>
                  <td colspan="7" rowspan>
                    <span>
                      报销金额合计：
                      <label v-text="money"></label>元
                    </span> &nbsp; &nbsp;
                    <span>
                      大写：
                      <label v-text="greatMoney"></label>元
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">图片</div>
        </div>
        <div class="tag-box-content">
          <div class="upload-pic">
            <div id="uploadPic"></div>
            <img
              :src="submitData.imageFileUrl?submitData.imageFileUrl:'../../../../static/images/upload-pic.png'"
              alt
            >
          </div>
        </div>
      </div>

      <!-- 弹出层 -->
      <div class="popup" :style="editPopup==1?'display:block;':''">
        <div class="popup-main planPopup-edit-main operationLog">
          <div class="popup-title">
            <label>报销事由</label>
            <em class="popup-close" @click="closePopup('edit');">×</em>
          </div>
          <div class="popup-content">
            <pre v-text="reimbursementReason"></pre>
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

<style scoped>
.planPopup-edit-main {
  width: 40%;
  height: 300px;
}
</style>

<script>
import {
  addReimbursement,
  getReimbursement,
  editReimbursement
} from "../../../api/oa/reimbursement";
// import { graindepot, storehouse } from "@/api/systemManage/dropDown";
import { uploadPic, changeMoneyToChinese } from "@/utils/public";

export default {
  name: "reimbEdit",
  data() {
    return {
      postData: {
        reimbursementId: this.$route.query.id
      },
      submitData: {
        applyTitle: "",
        totalFee: 0,
        detail: {
          detailList: []
        },
        imageFile: "",
        imageFileUrl: ""
      },
      greatMoney: "零",
      addDetail: {
        reimbursementType: "",
        money: "",
        feeDetail: "",
        feeHappenDatetime: "",
        reimbursementReason: ""
      },
      reimbursementReason: "",
      editPopup: 0 // 控制菜单编辑弹出层的显影，1为显示
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      getReimbursement(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            console.log(JSON.stringify(ret.data));
            // vm.submitData.reimbursementType = ret.data.reimbursementDetail.detailList.reimbursementType;
            // vm.submitData.money = ret.data.reimbursementDetail.detailList.money;
            // vm.submitData.feeDetail = ret.data.reimbursementDetail.detailList.feeDetail;
            vm.submitData.detail.detailList =
              ret.data.reimbursementDetail.detailList;
            // $("#feeHappenDatetime").val(ret.data.reimbursementDetail.detailList.feeHappenDatetime);
            // vm.submitData.reimbursementReason = ret.data.reimbursementDetail.detailList.reimbursementReason;
            // vm.submitData.country = ret.data.detailList.country;
            // vm.submitData.storehouseGbCode = ret.data.detailList.storehouseGbCode;
            // vm.submitData.enterpriseCode = ret.data.detailList.enterpriseCode;
            // vm.submitData.actualCapacity = ret.data.detailList.actualCapacity;
            // vm.submitData.newTypeOfSensor = ret.data.detailList.newTypeOfSensor;
            // vm.submitData.length = ret.data.detailList.length;
            // vm.submitData.width = ret.data.detailList.width;
            // vm.submitData.height = ret.data.detailList.height;
            // vm.submitData.picNameList = ret.data.detailList.picNameList;
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
    saveEvent: function() {
      var vm = this;
      vm.addDetail.feeHappenDatetime = $("#feeHappenDatetime").val();
      if (vm.addDetail.money == "") {
        layer.msg("请填写报销金额");
        return;
      }
      if (vm.addDetail.reimbursementType == "") {
        layer.msg("请填写报销类别");
        return;
      }
      if (vm.addDetail.feeDetail == "") {
        layer.msg("请填写报销明细");
        return;
      }
      if (vm.addDetail.feeHappenDatetime == "") {
        layer.msg("请填写发生时间");
        return;
      }
      if (vm.addDetail.reimbursementReason == "") {
        layer.msg("请填写报销事由");
        return;
      }
      vm.submitData.detail.detailList.push({
        reimbursementType: vm.addDetail.reimbursementType,
        money: vm.addDetail.money,
        feeDetail: vm.addDetail.feeDetail,
        feeHappenDatetime: vm.addDetail.feeHappenDatetime,
        reimbursementReason: vm.addDetail.reimbursementReason
      });

      vm.submitData.totalFee += parseInt(vm.addDetail.money);
      vm.greatMoney = changeMoneyToChinese(vm.submitData.totalFee);

      vm.addDetail.reimbursementType = "";
      vm.addDetail.money = "";
      vm.addDetail.feeDetail = "";
      $("#feeHappenDatetime").val("");
      vm.addDetail.feeHappenDatetime = "";
      vm.addDetail.reimbursementReason = "";
    },
    showPopup: function(reimbursementReason) {
      // 展示弹出层
      var vm = this;
      vm.reimbursementReason = reimbursementReason;
      vm.editPopup = 1;
    },
    closePopup: function() {
      // 隐藏弹出层
      var vm = this;
      vm.editPopup = 0;
      vm.reimbursementReason = "";
    },
    delData: function(e, money) {
      var vm = this;
      vm.submitData.detail.detailList.splice(e, 1);
      vm.submitData.totalFee -= parseInt(money);
      vm.greatMoney = changeMoneyToChinese(vm.submitData.totalFee);
    },
    submitEvent: function() {

      var vm = this;
      let applyTitle=this.$route.query.applyTitle;
      let totalFee=this.$route.query.totalFee;
      let pageNo=this.$route.query.pageNo;
      if (vm.submitData.applyTitle == "") {
        layer.msg("请填写标题");
        return;
      }
    //   console.log(JSON.stringify(vm.submitData));
      if (this.$route.query.id) {
        layer.load(2);
        editReimbursement(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("编辑申请报销成功！");
              this.$router.push({
                name: "reimbList"
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
        addReimbursement(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增申请报销成功！");
              this.$router.push({
                name: "reimbList",
                query: {
                  applyTitle:applyTitle,
                  totalFee:totalFee,
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
    detailBack:function () {
      var vm=this;
      let applyTitle=this.$route.query.applyTitle;
      let totalFee=this.$route.query.totalFee;
      let pageNo=this.$route.query.pageNo;
      this.$router.push({
        name: "reimbList",
        query: {
          applyTitle:applyTitle,
          totalFee:totalFee,
          pageNo:pageNo
        }
      });
    }
  },
  mounted() {
    var vm = this;
    if (this.$route.query.id) {
      vm.getDetail();
    }
    // vm.getDropDown();
    uploadPic("uploadPic", function(ret) {
      if (ret.code == 200) {
        vm.submitData.imageFile = ret.data.fileName;
        vm.submitData.imageFileUrl = ret.data.fileUrl;
      } else {
        layer.alert("上传文件出错", { closeBtn: 0 });
      }
    });
  }
};
</script>
