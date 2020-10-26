<template>
  <div class="content">
    <div class="menuManage operationLog ">
      <div class="lookup">
        结算单号：
        <input type="text" class="input-text excision" v-model="postData.businessSettlementSheetNo">
        是否开票：
        <select name class="select-style excision" v-model="postData.hasOpenTicket">
          <option value=''>请选择</option>
          <option value='未开票'>未开票</option>
          <option value="已开票">已开票</option>
        </select>
        是否付款：
        <select name class="select-style excision" v-model="postData.noticeBillStatus">
          <option value='已收款'>已收款</option>
          <option value="已付款">已付款</option>
          <option value='未收款'>未收款</option>
          <option value="未付款">未付款</option>
        </select>

        <div class="btn btn-add" @click="getList(0);">
          <img src="../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div>
        <div class="btn btn-add" @click="jumpReceivables();">
          <img src="../../../../static/images/add.png" alt="">
          <label>创建收款结算</label>
        </div>
        <div class="btn btn-add" @click="jumpPay();">
          <img src="../../../../static/images/add.png" alt="">
          <label>创建付款结算</label>
        </div>
        <!-- <div class="btn btn-del" @click="delData();">
            <img src="../../../../static/images/del.png" alt="">
            <label>删除</label>
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
            <th style="width:5%;"><input type="checkbox" v-model="allChecked" @change="checkAll();"></th>
            <th style="width:5%;">序号</th>
            <th style="width:10%;">商务结算单号</th>
            <th style="width:10%;">结算客户</th>
            <th style="width:10%;">结算金额（元）</th>
            <th style="width:10%;">付款状态</th>
            <th style="width:7.5%;">开票状态</th>
            <th style="width:7.5%;">编辑状态</th>
            <th style="width:7.5%;">审核状态</th>
            <th style="width:25%;">操作</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(item,i) in listData">
                <td><input type="checkbox"></td>
                <td v-if="sortOrder=='0'" v-text="i+1"></td>
                <td v-else v-text="listData.length-i"></td>
                <td v-text="item.businessSettlementSheetNo"></td>
                <td v-text="item.customerArchives"></td>
                <td v-text="item.settlementMoney"></td>
                <td v-text="item.noticeBillStatus"></td>
                <td v-text="item.hasOpenTicket"></td>
                <td v-text="item.draftStatus==0?'草稿':'正式文档'"></td>
                <td>
                    <label v-if="item.auditState==0" class="fc-red">审核不通过</label>
                    <label v-if="item.auditState==10">未审核</label>
                    <label v-if="item.auditState==11" class="fc-green">审核中</label>
                    <label v-if="item.auditState==99" class="fc-green">审核通过</label>
                </td>
                <td>
                      <div class="table-btn btn-yellow" @click="jumpDetail(item.businessSettlementSheetNo);">详情</div>
                      <div class="table-btn btn-change" v-if="item.auditState==99&&item.noticeBillStatus=='未付款'" @click="jumpPayNotice(item.businessSettlementSheetNo);">付款</div>
                      <div class="table-btn btn-change" v-if="item.auditState==99&&item.noticeBillStatus=='未收款'"@click="jumpReceivablesNotice(item.businessSettlementSheetNo);">收款</div>
                      <!-- <div class="table-btn btn-again" v-if="item.auditState==0" @click="jumpDetail();">再次申请</div> -->
                      <!-- <div class="table-btn btn-green" v-if="item.draftStatus==0&&item.noticeBillStatus=='未付款'" @click="jumpPayNotice(item.businessSettlementSheetNo,'edit');">编辑</div>
                      <div class="table-btn btn-green" v-if="item.draftStatus==0&&item.noticeBillStatus=='未收款'" @click="jumpReceivablesNotice(item.businessSettlementSheetNo,'edit');">编辑</div> -->
                      <div class="table-btn btn-submit" v-if="item.draftStatus==0" @click="submitApproval(item.businessSettlementSheetNo);">提交审核</div>
                      <div class="table-btn btn-red" v-if="item.draftStatus==0" @click="delData();">删除</div>
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
  .userManage-detail div{
    line-height: 20px;
  }
  .planPopup-edit-main{
    height: 40%;
  }
  .popup .popup-content{
    border-bottom: 0;
  }
  .edit-btn button{
    margin-right: 60px;
  }
</style>
<script>
import { financeList, financeApproval} from "@/api/business/finance";

export default {
  name: "document",
  data() {
    return {
      sortOrder: "0", //0 顺序，1 倒序
      requestData:this.$route.query.data,
      postData: {
        businessSettlementSheetNo: "",
        hasOpenTicket:'',
        noticeBillStatus:'已收款',
        pageSize: 10,
        pageNo: 0
      },
      showType:'',
      grainVarietyList: "",
      grainOilLevelList: "",
      inventoryPropertyList: "",
      allChecked: false,
      delList: {
        billIdList: []
      },
      detailData:'',
      listData: [],
      graindepotList:[],//库点下拉列表
      storehouseList:[],//仓房下拉列表
      granaryList:[],//廒间下拉列表
      cargoList:[],//货位下拉列表
      editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
    };
  },
  methods: {
    changeSortOrder: function() {//倒序
      var vm = this;
      vm.listData.reverse();
    },
    getList: function() {//获取列表
      var vm = this;
      layer.load(2);
      financeList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.businessSettlementList;
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
        name: "balanceDetail",
        query: {
          id: id
        }
      });
    },
    jumpPay: function(id) {
      //跳转到付款页面
      var vm = this;
      this.$router.push({
        name: "balancePay",
        query: {
          id: id
        }
      });
    },
    jumpReceivables: function(id) {
      //跳转到收款页面
      var vm = this;
      this.$router.push({
        name: "receivables",
        query: {
          id: id
        }
      });
    },
    submitApproval:function (id) {
      var vm = this;
      financeApproval({businessSettlementSheetNo:id})
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
              layer.msg("提交成功！");
              console.info(JSON.stringify(ret))
              vm.getList(1);
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
    jumpPayNotice: function(id) {
      //跳转到付款页面
      var vm = this;
      this.$router.push({
        name: "balancePayDetail",
        query: {
          id: id
        }
      });
    },
    jumpReceivablesNotice: function(id) {
      //跳转到收款页面
      var vm = this;
      this.$router.push({
        name: "receivablesDetail",
        query: {
          id: id
        }
      });
    }
  },
  mounted() {
    this.getList(1);
  }
};

</script>
