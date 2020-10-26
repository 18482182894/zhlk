<template>
  <div class="content">
    <div class="videoRetrieval">
      <div>&nbsp;</div>
      <div class="lookup">
        仓房：
        <select class="select-style excision" v-model="postData.storehouseGbCode">
          <option value="">请选择</option>
          <option
            v-for="item in storehouseList"
            :key="item.storehouseGbCode"
            :value="item.storehouseGbCode"
            v-text="item.storehouseName"/>
        </select>
        廒间：
        <select class="select-style excision" v-model="postData.warehouseGbCode">
          <option value="">请选择</option>
          <option
            v-for="item in granaryList"
            :key="item.warehouseGbCode"
            :value="item.warehouseGbCode"
            v-text="item.warehouseName"/>
        </select>
		<div v-if="isShow==0" class="btn btn-add" @click="getList(1);">
          <img src="../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
		<div v-if="isShow==1" class="btn btn-add" @click="getArray();">
		  <img src="../../../../static/images/search.png" alt="">
		  <label>查找</label>
		</div>
      </div>
      <div>
        <div class="btn btn-add" @click="jumpAdd">
          <img src="../../../../static/images/add.png" alt="">
          <label>新增</label>
        </div>
        <div class="btn btn-auto" @click="jumpStrategy();">
          <label>自动采集设置</label>
        </div>
        <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value="">排序方式</option>
          <option value="0">顺序</option>
          <option value="1">倒序</option>
        </select>
		<div class="btn btn-add btnDao" @click="daochu();">
			<label>导出</label>
		</div>
		<div class="btn btn-add btnDao" @click="getArray();">
			<label>查出所有数据</label>
		</div>	
      </div>
      <table class="customTable" v-if='isShow==0'>
        <thead>
        <tr>
          <th style="width:2.5%;"><input type="checkbox"/></th>
          <th style="width:2.5%;">序号</th>
          <th style="width:7.5%;">仓房</th>
          <th style="width:7.5%;">廒间</th>
          <th style="width:7.5%;">仓房容量</th>
          <th style="width:7.5%;">账面数量</th>
          <th style="width:7.5%;">实测数量</th>
          <th style="width:7.5%;">差异率</th>
          <th style="width:7.5%;">收获年度</th>
          <th style="width:7.5%;">状态</th>
          <th style="width:10%;">检测时间</th>
          <th class="lastRow" style="width:20%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox"/></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td>{{item.storehouseName}}</td>
          <td>{{item.warehouseName}}</td>
          <td>{{item.memo}}</td>
          <td>{{item.storageNum}}</td>
          <td>{{item.checkNum}}</td>
          <td>{{item.difference}}</td>
          <td>{{item.harvestYear}}</td>
          <td>{{item.status}}</td>
          <td>{{item.testDatetime}}</td>
          <td class="lastRow">
            <div class="table-btn btn-yellow" @click="jumpDetail(item.id)">详情</div>
            <div class="table-btn btn-blue" @click="jumpEdit(item.id)">编辑</div>
          </td>
        </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar"></div>
	  <table class="data-table customTable" v-if='isShow==1'>
		  <thead>
		  <tr>
		    <!-- <th style="width:2.5%;"><input type="checkbox"/></th> -->
		    <th style="width:2.5%;">序号</th>
		    <th style="width:7.5%;">仓房</th>
		    <th style="width:7.5%;">廒间</th>
		    <th style="width:7.5%;">仓房容量</th>
		    <th style="width:7.5%;">账面数量</th>
		    <th style="width:7.5%;">实测数量</th>
		    <th style="width:7.5%;">差异率</th>
		    <th style="width:7.5%;">收获年度</th>
		    <th style="width:7.5%;">状态</th>
		    <th style="width:10%;">检测时间</th>
		    <!-- <th class="lastRow" style="width:20%;">操作</th> -->
		  </tr>
		  </thead>
		  <tbody>
		  <tr v-for="(item,i) in listDataArry">
		    <!-- <td><input type="checkbox"/></td> -->
		    <td v-text="i+1"></td>
		    <!-- <td v-else v-text="listDataArry.length-i"></td> -->
		    <td>{{item.storehouseName}}</td>
		    <td>{{item.warehouseName}}</td>
		    <td>{{item.memo}}</td>
		    <td>{{item.storageNum}}</td>
		    <td>{{item.checkNum}}</td>
		    <td>{{item.difference}}</td>
		    <td>{{item.harvestYear}}</td>
		    <td>{{item.status}}</td>
		    <td>{{item.testDatetime}}</td>
		    <!-- <td class="lastRow">
		      <div class="table-btn btn-yellow" @click="jumpDetail(item.id)">详情</div>
		      <div class="table-btn btn-blue" @click="jumpEdit(item.id)">编辑</div>
		    </td> -->
		  </tr>
		  </tbody>
	  </table>
    </div>
  </div>
</template>
<style type="text/css" scoped>
  .IOTType-popup {
    width: 600px;
    height: 400px;
  }

  .popup-content p input {
    width: 420px;
  }

  .popup-content .text-justify label {
    display: inline-block;
    vertical-align: middle;
    font-size: .875rem;
    text-align: center;
    text-align-last: initial;
  }

  .text-justify div {
    display: inline-block;
    width: 440px;
  }

  .text-justify div .select-style {
    width: 90px;
  }
  
  
</style>
<script>
  import {fetchQuantityDetectionList} from "@/api/intelligentWarehous/quantityDetection";
  import {storehouse, granary} from "@/api/systemManage/dropDown";

  export default {
    name: "quantityDetection",
    data() {
      return {
        sortOrder: "0", //0 顺序，1 倒序
        postData: {
          storehouseGbCode:this.$route.query.storehouseGbCode,
          warehouseGbCode:this.$route.query.warehouseGbCode,
          pageSize: 10,
          pageNo:this.$route.query.pageNo!=null?this.$route.query.pageNo:0
        },
        listData: [],
		isShow:0,//0为10条，1为任意条
		listDataArry:[],
        storehouseList: [],//仓房下拉列表
        granaryList: [],//廒间下拉列表
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
		vm.isShow=0;
        fetchQuantityDetectionList(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.listData = ret.data.dataList;
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
						this.$router.push(
							{
						name: 'quantityDetectionAdd',
							query:{
							storehouseGbCode:vm.postData.storehouseGbCode,
							warehouseGbCode:vm.postData.warehouseGbCode,
							pageNo:vm.postData.pageNo
						}	
						
					});
					},
      jumpDetail(id) {
				var vm = this;
						this.$router.push(
							{
						name: 'quantityDetectionDetail', 
						query: {
							id:id,
							storehouseGbCode:vm.postData.storehouseGbCode,
							warehouseGbCode:vm.postData.warehouseGbCode,
							pageNo:vm.postData.pageNo
						}
					 });
					},
      jumpEdit(id) {
				var vm = this;
						this.$router.push(
						 {
						 name: 'quantityDetectionEdit', 
						 query: {
							 id:id,
							 storehouseGbCode:vm.postData.storehouseGbCode,
							warehouseGbCode:vm.postData.warehouseGbCode,
							pageNo:vm.postData.pageNo
						 }
					 }
					);
					},
      jumpStrategy() {
        this.$router.push({name: 'quantityDetectionStrategy'});
      },
      getStorehouse() { // 获取仓房列表
        storehouse('')
          .then((ret) => {
            if (ret.code == 200) {
              this.storehouseList = ret.data.dataList;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      getGranary(code) { // 获取廒间列表
        granary(code)
          .then((ret) => {
            if (ret.code == 200) {
              this.granaryList = ret.data.dataList;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
	  //获取列表
	  getArray(){
		var vm = this;
		vm.isShow=1;
		vm.postData.pageSize = 10000;
		$('#PageBar').css('display','none');
		layer.msg("请稍等,正在加载!");
		fetchQuantityDetectionList(vm.postData)
			.then(ret => {
			  layer.closeAll("loading");
			  if (ret.code == 200) {
				vm.listDataArry = ret.data.dataList;
				/* laypage({
				  //分页
				  //cont: "PageBar", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
				  //pages: ret.page.totalPages, //通过后台拿到的总页数
				  //curr: pageNo,
				  pageSize:ret.page.totalRecordNum,
				  skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
				  /* jump: function (obj, first) {
					//触发分页后的回调
					if (!first) {
					  //一定要加此判断，否则初始时会无限刷新
					  vm.getList(obj.curr);
					}
				  } 
				}); */
			  } else {
				if (ret.code == "500" && ret.data == "查询错误，没有数据") {
				  layer.msg("暂无数据");
				  vm.listDataArry = [];
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
	daochu(){
		// 导出excel
		// 使用outerHTML属性获取整个table元素的HTML代码（包括<table>标签），然后包装成一个完整的HTML文档，设置charset为urf-8以防止中文乱码
		//获取表格
		var tableHtml = $('.data-table');
		//不能显示class的样式，所以自己重新添加样式 主要为设置边框 格子大小
		$(tableHtml).css({
			'border':'1px solid #d5d5d2',
			'text-align':'center',
			'border-collapse':'collapse',
		});
		$(tableHtml).find('tr td').css({
			'text-align':'center',
			'border':'1px solid #d5d5d2',
			'line-height':'30px',
			'padding':'0px 10px',
			'min-width':'80px'
		});
		var html = "<html><head><meta charset='utf-8' /></head><body>" + tableHtml[0].outerHTML + "</body></html>";
		// 实例化一个Blob对象，其构造函数的第一个参数是包含文件内容的数组，第二个参数是包含文件类型属性的对象
		var blob = new Blob([html], { type: "application/vnd.ms-excel" });
		var urlA = document.createElement('a');
		// 利用URL.createObjectURL()方法为a元素生成blob URL
		$('.table-btn-group').append(urlA);
		urlA.href = URL.createObjectURL(blob);
		// 设置文件名，目前只有Chrome和FireFox支持此属性
		urlA.download = "粮食数量在线监测表.xls";
		urlA.click();	
	  }
    },
    watch: {
      'postData.storehouseGbCode'(newCode, oldCode) { // 监听仓房变化获取廒间列表
        if (newCode && newCode !== oldCode) {
          this.granaryList = [];
          this.postData.warehouseGbCode = '';
          this.getGranary(newCode);
        }
      }
    },
    mounted() {
	  var vm = this;
	  if(vm.isShow=='0'){
		vm.getList(vm.postData.pageNo);
	  }
      vm.getStorehouse();
	  if(vm.postData.warehouseGbCode){
		  this.getGranary(vm.postData.storehouseGbCode);
	  }
	  
    }
  };

</script>
