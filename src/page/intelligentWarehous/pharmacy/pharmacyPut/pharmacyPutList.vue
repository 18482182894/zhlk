<template>
  <div class="content">
    <div class="menuManage operationLog priceManage">
      <div class="lookup">
        药品编码：
        <input class="select-style excision" v-model="postData.medicineId"/>
        药品名称：
        <input class="select-style excision" v-model="postData.medicineName"/>
        <div style="display: inline-block">
          <div class="btn btn-add" style="margin-top: -8%" @click="getList(1)">
            <img src="../../../../../static/images/search.png" alt="">
            <label>查找</label>
          </div>
        </div>
      </div>
      <div>
        <div class="btn btn-add" @click="jumpAdd()">
          <img src="../../../../../static/images/add.png" alt="">
          <label>新增入库</label>
        </div>
        <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value="">排序方式</option>
          <option value="0">正序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
        <tr>
          <th style="width:5%;"><input type="checkbox"/></th>
          <th style="width:5%;">序号</th>
          <th style="width:10%;">药品编码</th>
          <th style="width:10%;">药品名称</th>
          <th style="width:20%;">采购编码</th>
          <th style="width:10%;">药品种类</th>
          <th style="width:10%;">入库数量</th>
          <th style="width:10%;">采购价格</th>
          <th style="width:10%;">计量单位</th>
          <th style="width:10%;">入库时间</th>
          <th style="width:10%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox"></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td>{{item.medicineId}}</td>
          <td>{{item.medicineName}}</td>
          <td>{{item.purchaseApplyId}}</td>
          <td>{{item.medicineDosageFormValue}}</td>
          <td>{{item.importNum}}</td>
          <td>{{item.purchasePrice}}</td>
          <td>{{item.meterUintValue}}</td>
          <td>{{item.importDate.slice(0, 10)}}</td>
          <td>
            <div class="table-btn btn-yellow" @click="jumpDetail(item.id)">详情</div>
          </td>
        </tr>
        </tbody>
      </table>
      <div id="PageBar"></div>
    </div>
  </div>
</template>

<script>
  import {fetchImportList} from "@/api/intelligentWarehous/pharmacy";

  export default {
    name: "pharmacyPutList",
    data() {
      return {
        sortOrder: "0", //0 顺序，1 倒序
        postData: {
          medicineId:  this.$route.query.medicineId,
          medicineName:this.$route.query.medicineName,
          pageSize: 10,
          pageNo:this.$route.query.pageNo!=null?this.$route.query.pageNo:0,
		  originalPageName:this.$route.query.originalPageName!=null?this.$route.query.originalPageName:'pharmacyPutList'
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
        fetchImportList(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.listData = ret.data.importRecordList;
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
		var vm = this;
        this.$router.push({
          name: 'pharmacyPutEdit',
		  query:{
			 medicineId:vm.postData.medicineId,
             medicineName:vm.postData.medicineName,
			 pageNo:vm.postData.pageNo,
			 originalPageName:vm.postData.originalPageName
		  }
        })
      },
      jumpDetail(id) {
        //跳转到详情
		var vm = this;
		
        this.$router.push({
		  name: "pharmacyPutDetail",
          query: {
			  id:id,
			  medicineId:vm.postData.medicineId,
              medicineName:vm.postData.medicineName,
			  pageNo:vm.postData.pageNo			  
			 }
        });
      },
    },
    mounted() {
	  var vm = this;
      this.getList(vm.postData.pageNo);
    }
  };
</script>

<style scoped>

</style>
