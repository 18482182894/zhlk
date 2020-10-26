<template>
  <div class="content">
    <div class="menuManage operationLog ">
      <div class="lookup">
        仓房：
        <select class="select-style excision" v-model="postData.storehouseGbCode">
          <option
            v-for="item in storehouseList"
            :key="item.storehouseGbCode"
            :value="item.storehouseGbCode"
            v-text="item.storehouseName"/>
        </select>
        廒间：
        <select class="select-style excision" v-model="postData.warehouseGbCode">
          <option
            v-for="item in granaryList"
            :key="item.warehouseGbCode"
            :value="item.warehouseGbCode"
            v-text="item.warehouseName"/>
        </select>
		<div v-if="isShow==0" class="btn btn-add" @click="getList(1);">
		  <img src="../../../../../static/images/search.png" alt="">
		  <label>查找</label>
		</div>
		<div v-if="isShow==1" class="btn btn-add" @click="getArray();">
		  <img src="../../../../../static/images/search.png" alt="">
		  <label>查找</label>
		</div>
      </div>
      <div>
        <div class="btn btn-collect" @click="jumpEdit(postData.warehouseGbCode);">
          <label>采集</label>
        </div>
        <div class="btn btn-auto" @click="jumpStrategy();">
          <label>自动采集设置</label>
        </div>
        <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value="">排序方式</option>
          <option value="0">顺序</option>
          <option value="1">倒序</option>
        </select>
		<div v-if="isShow==1" class="btn btn-add btnDao" @click="daochu();">
			<label>导出</label>
		</div>
		<div class="btn btn-add btnDao" @click="getArray();">
			<label>查出所有数据</label>
		</div>
      </div>
      <table class="customTable" v-if="isShow==0">
        <thead>
        <tr>
          <th style="width:5%;"><input type="checkbox"></th>
          <th style="width:5%;">序号</th>
          <th style="width:10%;">仓房名称</th>
          <th style="width:10%;">廒间名称</th>
          <th style="width:10%;">氧气含量平均值%VOL</th>
          <!-- <th style="width:10%;">氮气含量平均值</th> -->
          <th style="width:10%;">二氧化碳含量平均值PPM</th>
          <th style="width:10%;">磷化氢含量平均值PPM</th>
          <th style="width:15%;">检测时间</th>
          <th style="width:10%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox"/></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td v-text="item.storehouseName"></td>
          <td v-text="item.warehouseName"></td>
          <td v-text="item.avO2"></td>
          <!-- <td v-text="item.avN2"></td> -->
          <td v-text="item.avCo2"></td>
          <td v-text="item.avPh3"></td>
          <td v-text="item.checkDatetime"></td>
          <td>
            <div class="table-btn btn-yellow" @click="jumpDetail(item);">详情</div>
          </td>
        </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar"></div>
	  <table class="customTable data-table" v-if="isShow==1">
	    <thead>
	    <tr>
	      <!-- <th style="width:5%;"><input type="checkbox"></th> -->
	      <th style="width:5%;">序号</th>
	      <th style="width:10%;">仓房名称</th>
	      <th style="width:10%;">廒间名称</th>
	      <th style="width:10%;">氧气含量平均值%VOL</th>
	      <!-- <th style="width:10%;">氮气含量平均值</th> -->
	      <th style="width:10%;">二氧化碳含量平均值PPM</th>
	      <th style="width:10%;">磷化氢含量平均值PPM</th>
	      <th style="width:15%;">检测时间</th>
	      <!-- <th style="width:10%;">操作</th> -->
	    </tr>
	    </thead>
	    <tbody>
	    <tr v-for="(item,i) in listDataArray">
	      <!-- <td><input type="checkbox"/></td> -->
	      <td v-text="i+1"></td>
	      <!-- <td v-else v-text="listData.length-i"></td> -->
	      <td v-text="item.storehouseName"></td>
	      <td v-text="item.warehouseName"></td>
	      <td v-text="item.avO2"></td>
	      <!-- <td v-text="item.avN2"></td> -->
	      <td v-text="item.avCo2"></td>
	      <td v-text="item.avPh3"></td>
	      <td v-text="item.checkDatetime"></td>
	      <!-- <td>
	        <div class="table-btn btn-yellow" @click="jumpDetail(item);">详情</div>
	      </td> -->
	    </tr>
	    </tbody>
	  </table>
    </div>
    <div class="detail-back">
      <button @click="$router.replace({name: 'grainSituation'})">返回</button>
    </div>
  </div>
</template>
<style type="text/css" scoped>
  .lookup .excision {
    margin-right: 2rem;
  }
</style>
<script>
  import {fetchGasList} from "@/api/intelligentWarehous/grainSituation";
  import {storehouse, granary} from "@/api/systemManage/dropDown";
  import { jumpData } from "@/api/intelligentWarehous/fumigation";
  export default {
    name: "contract",
    data() {
      return {
        sortOrder: "0", //0 顺序，1 倒序
        postData: {
          storehouseGbCode: '',
          warehouseGbCode: '',
          pageSize: 10,
          pageNo: this.$route.query.pageNo!=null?this.$route.query.pageNo:0
        },
        listData: [],
		isShow:0,//0表示显示10条，1表示任意条
		listDataArray:[],
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
		vm.isShow=0;
        vm.postData.pageNo = pageNo;
        layer.load(2);
        fetchGasList(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.listData = ret.data.gasMonitorList;
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
	  //获取列表
	    getArray(){
	  	var vm = this;
	  	vm.isShow=1;
	  	vm.postData.pageSize = 10000;
	  	$('#PageBar').css('display','none');
	  	layer.msg("请稍等,正在加载!");
	  	fetchGasList(vm.postData)
	  		.then(ret => {
	  		  layer.closeAll("loading");
	  		  if (ret.code == 200) {
	  			vm.listDataArray = ret.data.gasMonitorList;
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
	  			  vm.listDataArray = [];
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
	  	urlA.download = "气体监测表.xls";
	  	urlA.click();	
	    },
      jumpStrategy() {
        this.$router.push({name: 'gasDetectionAuto'});
      },
      jumpDetail({gasMonitor, storehouseGbCode, warehouseGbCode}) {
        this.$router.push({name: 'gasDetectionDetail', query: {gasMonitor, storehouseGbCode, warehouseGbCode}});
      },
      jumpEdit: function(warehouseGbCode) {
        var vm = this;
        if (!this.postData.storehouseGbCode) return layer.msg("请选择仓房");
        if (!this.postData.warehouseGbCode) return layer.msg("请选择熬间");
        layer.msg("气体采集中，大约需要2分钟");
        jumpData({
          warehouseGbCode: this.postData.warehouseGbCode,
          type: "气体采集"
        }).then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            console.log('发送采集命令成功')
          }
        });
      },
      getStorehouse() { // 获取仓房列表
        storehouse()
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
    },
    watch: {
      'postData.storehouseGbCode'(newCode, oldCode) { // 监听仓房变化获取廒间列表
        if (newCode && newCode !== oldCode) {
          if (!this.initStorehouseGbCodeByQuery) {
            this.postData.warehouseGbCode = '';
          }
          this.initStorehouseGbCodeByQuery = false;
          this.granaryList = [];
          this.getGranary(newCode);
        }
      }
    },
    mounted() {
	  var vm=this; 
      vm.initStorehouseGbCodeByQuery = true;
      vm.postData.storehouseGbCode = vm.$route.query.storehouseGbCode;
      vm.postData.warehouseGbCode = vm.$route.query.warehouseGbCode;
      vm.getStorehouse();
      if(vm.isShow=='0'){
		 vm.getList(vm.postData.pageNo); 
	  }
    }
  };

</script>
