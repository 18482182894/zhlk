<template>
  <div class="content">
    <div class="menuManage operationLog priceManage">
      <div class="lookup">
        药品编码：
        <input class="select-style excision" v-model="postData.medicineId"/>
        药品名称：
        <input class="select-style excision" v-model="postData.medicineName"/>
        <div style="display: inline-block">
          <div class="btn btn-add" style="margin-top: -8%" @click="getList(1);">
            <img src="../../../../../static/images/search.png" alt="">
            <label>查找</label>
          </div>
        </div>
      </div>
      <div>
        <!--<div class="btn btn-add purchbtn" @click="jumpAdd();">
          <img src="../../../../../static/images/add.png" alt="">
          <label>新增采购</label>
        </div>-->
        <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value="">排序方式</option>
          <option value="0">正序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
        <tr>
          <th style="width:2.5%;"><input type="checkbox"/></th>
          <th style="width:2.5%;">序号</th>
          <th style="width:7.5%;">药品编码</th>
          <th style="width:7.5%;">药品名称</th>
          <th style="width:10%;">药剂种类</th>
          <th style="width:5%;">采购数量</th>
          <th style="width:5%;">单位</th>
          <th style="width:10%;">申请时间</th>
          <th style="width:10%;">编辑状态</th>
          <th style="width:10%;">审核状态</th>
          <th style="width:30%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox"/></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td v-text="item.medicineId"></td>
          <td v-text="item.medicineName"></td>
          <td v-text="item.medicineDosageFormValue"></td>
          <td v-text="item.buyNum"></td>
          <td v-text="item.meterUintValue"></td>
          <td v-text="item.applyDate"></td>
          <td v-text="draftStatusMap[item.draftStatus]"></td>
          <td v-text="auditStateMap[item.auditState]"></td>
          <td>
            <div class="table-btn btn-yellow"
                 @click="jumpDetail(item.purchaseApplyId)">详情
            </div>
            <div class="table-btn btn-submit"
                 @click="submitAudit(item.purchaseApplyId)" v-if="item.draftStatus==0">提交审核
            </div>
            <div class="table-btn btn-green"
                 @click="jumpEdit(item)" v-if="item.draftStatus==0">编辑
            </div>
            <div class="table-btn btn-red"
                 @click="delData(item.purchaseApplyId)" v-if="item.draftStatus==0">删除
            </div>
            <div class="table-btn btn-again"
                 @click="submitAudit(item.purchaseApplyId)" v-if="item.auditState==0">再次申请
            </div>
            <div class="table-btn btn-again"
                 @click="jumpPut(item)" v-if="item.auditState==99 && item.purchaseApplyStatus != 4">入库
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div id="PageBar"></div>
    </div>
		<div class="copyright">
			<p>Copyright © 四川百威智联科技有限公司 © 版权所有 电话：028-62631082</p>
		</div>
  </div>
</template>

<script>
  import {fetchPurchaseList, delPurchase, applyPurchase} from "@/api/intelligentWarehous/pharmacy";

  export default {
    name: "purchaseList",
    data() {
      return {
        sortOrder: "0", //0 顺序，1 倒序
        postData: {
          medicineId:this.$route.query.medicineId,
          medicineName:this.$route.query.medicineName,
          pageSize: 10,
          pageNo:this.$route.query.pageNo!=null?this.$route.query.pageNo:0,
		  originalPageName:this.$route.query.originalPageName!=null?this.$route.query.originalPageName:'purchaseList'
        },
        auditStateMap: {
          '-1': '尚未提交',
          '0': '审核不通过',
          '10': '未审核',
          '11': '审核中',
          '99': '审核通过'
        },
        draftStatusMap: {
          '0': '草稿',
          '1': '正式文档'
        },
        listData: [],
      };
    },
    methods: {
      changeSortOrder: function () {//倒序
        var vm = this;
        vm.listData.reverse();
      },
      getList(pageNo) {//获取列表
        var vm = this;
		
        vm.postData.pageNo = pageNo;
        layer.load(2);
        fetchPurchaseList(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.listData = ret.data.purchaseApplyList;
              laypage({
                //分页
                cont: "PageBar", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                pages: ret.page.totalPages, //通过后台拿到的总页数
                curr: pageNo,
                skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                jump: function (obj, first) {
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
                layer.alert(ret.data, {closeBtn: 0});
              }
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      jumpAdd() {
        this.$router.push({name: 'purchaseEdit'});
      },
      jumpEdit({purchaseApplyId, medicineDosageFormValue, meterUintValue}) {
		var vm = this;
        this.$router.push(
		     {name: 'purchaseEdit', 
			  query: {
				  purchaseApplyId, 
				  medicineDosageFormValue, 
				  meterUintValue,
				  medicineId:vm.postData.medicineId,
                  medicineName:vm.postData.medicineName,
                  pageNo:vm.postData.pageNo,
		          originalPageName:vm.postData.originalPageName
				  
			}});
      },
      jumpDetail(id) {
		var vm = this;
        this.$router.push(
		      {name: 'purchaseDetail', 
			   query: {
			   id,
			   medicineId:vm.postData.medicineId,
			   medicineName:vm.postData.medicineName,
			   pageNo:vm.postData.pageNo
	     }});
      },
      delData(purchaseApplyIds) {
        layer.confirm('确定删除？', {
          btn: ['确定', '取消'] //按钮
        }, () => {
          layer.load(2);
          delPurchase({purchaseApplyIds})
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("删除成功！");
                this.getList(1);
              } else {
                layer.alert(ret.data, {closeBtn: 0});
              }
            })
            .catch(err => {
              layer.closeAll("loading");
              layer.alert(err.message, {closeBtn: 0});
            });
        });
      },
      submitAudit(purchaseApplyId) {
        layer.load(2);
        applyPurchase({purchaseApplyId})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("提交成功！");
              this.getList(this.postData.pageNo);
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      jumpPut({purchaseApplyId,medicineId}) {
		var vm = this;
        this.$router.push(
		       {
				name: 'pharmacyPutEdit', 
				query: {
					 purchaseApplyId,
					 selectedMedicineId:medicineId,
					 medicineId:vm.postData.medicineId,
			         medicineName:vm.postData.medicineName,
			         pageNo:vm.postData.pageNo,
					 originalPageName:vm.postData.originalPageName
			       }
				})
      }
    },
    mounted() {
	  var vm = this;
      this.getList(vm.postData.pageNo);
    }
  };

</script>

<style scoped>

</style>
