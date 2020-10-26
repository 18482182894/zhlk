<template>
  <div class="content">
    <div class="menuManage operationLog company">
      <div class="lookup">
        开户行：
        <input type="text" class="input-text excision" v-model="postData.bankName" />
        开户信息：
        <input
          type="text"
          class="input-text excision"
          v-model="postData.bankInformation"
        />

        <div class="btn btn-add" @click="getList(0);">
          <img src="../../../../../static/images/search.png" />
          <label>查找</label>
        </div>
      </div>
      <div>
        <div class="btn btn-add" @click="jumpEdit('','')">
          <img src="../../../../../static/images/add.png" alt />
          <label>新增</label>
        </div>
        <!-- <select name="" class="select-style">
                    <option value="">显示条数</option>
        </select>-->
        <select name class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value>排序方式</option>
          <option value="0">顺序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>序号</th>
            <th>开户银行</th>
            <th>开户行信息</th>
            <th>卡号</th>
            <th>编辑状态</th>
            <th>审核状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in listData">
            <td>
              <input type="checkbox" />
            </td>
            <td v-if="sortOrder=='0'" v-text="i+1"></td>
            <td v-else v-text="listData.length-i"></td>
            <td v-text="item.bankName"></td>
            <td v-text="item.bankInformation"></td>
            <td v-text="item.accountNo"></td>
            <td v-text="item.draftStatus==0?'草稿':'正式文档'"></td>
            <td>
              <label v-if="item.auditState==0" class="fc-red">审核不通过</label>
              <label v-if="item.auditState==10">未审核</label>
              <label v-if="item.auditState==11" class="fc-green">审核中</label>
              <label v-if="item.auditState==99" class="fc-green">审核通过</label>
            </td>
            <td>
              <div class="table-btn btn-yellow" @click="jumpDetail(item.bankAccountId);">详情</div>
              <div
                class="table-btn btn-green"
                @click="jumpEdit(item.bankAccountId,'edit');"
                v-if="item.draftStatus==0"
              >编辑</div>
              <div
                class="table-btn btn-submit"
                @click="submitAudit(item.bankAccountId);"
                v-if="item.draftStatus==0"
              >提交审核</div>
              <div
                class="table-btn btn-again"
                v-if="item.status==0"
                @click="jumpEdit(item.bankAccountId,'add');"
              >再次申请</div>
              <div
                class="table-btn btn-red"
                @click="delData(item.bankAccountId);"
                v-if="item.draftStatus==0||item.auditState==99"
              >删除</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { bankList, bankDel, bankAudit } from "@/api/systemManage/bank";
export default {
  name: "bank",
  data() {
    return {
      allChecked: false,
      sortOrder: "0", //0 顺序，1 倒序
      delList: {
        bankAccountId: "",
      },
      listData: [],
      postData: {
        bankInformation: this.$route.query.bankInformation
          ? this.$route.query.bankInformation
          : "",
        bankName: this.$route.query.bankName ? this.$route.query.bankName : "",
        pageSize: 10,
        pageNo: this.$route.query.pageNo ? this.$route.query.pageNo : 0,
      },
    };
  },
  methods: {
    getList: function (pageNo) {
      //获取列表
      var vm = this;
      vm.postData.pageNo = pageNo;

      layer.load(2);
      bankList(vm.postData)
        .then((ret) => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.dataList;
            // console.log(vm.listData);
          } else {
            if (ret.code == "500" && ret.data == "查询错误，没有数据") {
              layer.msg("暂无数据");
              vm.listData = [];
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          }
        })
        .catch((err) => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    changeSortOrder: function () {
      var vm = this;
      vm.listData.reverse();
    },

    delData: function (id) {
      //删除
      var vm = this;
      layer.load(2);
      layer.confirm(
        "确定删除？",
        {
          btn: ["确定", "取消"], //按钮
        },
        function () {
          bankDel({ bankAccountId: id })
            .then((ret) => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("删除成功！");
                // vm.delList.bankAccountId = "";
                vm.getList(1);
              } else {
                layer.alert(ret.data, { closeBtn: 0 });
              }
            })
            .catch((err) => {
              layer.alert(err.message, { closeBtn: 0 });
            });
        }
      );
    },
    submitAudit: function (id) {
      //提交审核
      var vm = this;
      bankAudit({ bankAccountId: id })
        .then((ret) => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("提交成功！");
            vm.getList(1);
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch((err) => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    jumpEdit: function (id, type) {
      var vm = this;
      this.$router.push({
        name: "bankAccountEdit",
        query: {
          id: id,
          type: type,
          //新增
          bankInformation: vm.postData.bankInformation,
          bankName: vm.postData.bankName,
          pageNo: vm.postData.pageNo,
        },
      });
    },
    jumpDetail: function (id) {
      var vm = this;
      this.$router.push({
        name: "bankAccountDetail",
        query: {
          id: id,
          //新增
          bankInformation: vm.postData.bankInformation,
          bankName: vm.postData.bankName,
          pageNo: vm.postData.pageNo,
        },
      });
    },
  },
  mounted() {
    var vm = this;
    vm.getList(vm.postData.pageNo);
  },
};
</script>
