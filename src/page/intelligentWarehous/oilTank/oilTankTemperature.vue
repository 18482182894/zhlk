<template>
  <div class="content" ref="contentRef">
	  <div style="position: relative;">
		  <div id="temperature3DLeft">
			  <h2 class="tittle">{{oilname}}</h2>
			  <h2 class="tittle">液位高度：{{liquidHeightValue}}米</h2>
			  <button class="ztwBtn" @click="getListOne();">油温采集</button>  
			  <div class="ygImg"><img src="../../../../static/images/yg.png"/></div>
			  <div :class="[maxHeight < '1190' ? 'YgBox mirrorRotateVertical' : 'YgBox-big mirrorRotateVertical']">
				  <div class="test" ref="testRef"></div>
			  </div>
			 <div :class="[maxHeight < '1190' ? 'storage-title' : 'storage-title-big']">
				<div class="storage-title-item" v-for="(item,i) in grainVarietyList">
				  <!-- <em class="sti-color" :style="'background: '+item.color+';'"></em> -->
				  <span class="border"></span>
				  <label class="ygText">第{{i+1}}层:{{item.grainVarietyName.temperatuer+'℃'}}</label>
				</div>
			  </div>
		  </div>
		  
		  <div id="temperature3D-Right">
		  		  <div id="temperature3D"></div>
		  		  <div id="temperature3DOne"></div>
		  </div>
		  <div class="tableCard">
			开始时间：
			<input style="width: 12rem;" type="text" class="input-text Wdate" id="startTime"
					  onclick="WdatePicker({dateFmt: 'yyyy-MM-dd HH:mm:ss',maxDate:'%y-%M-%d'})"/>~
			结束时间：
			<input style="width: 12rem;" type="text" class="input-text Wdate" id="endTime"
					  onclick="WdatePicker({dateFmt: 'yyyy-MM-dd HH:mm:ss',maxDate:'%y-%M-%d'})"/>
			<div class="btn btn-add" @click="getList(1);" style="margin-left: 2rem;">
			   <img src="../../../../static/images/search.png" alt="">
			   <label>查找</label>
			</div>
			<select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
			  <option value="">排序方式</option>
			  <option value="0">顺序</option>
			  <option value="1">倒序</option>
			</select>
		  <table class="customTable">
			  <thead>
				  <tr>
					  <!-- <th style="width:2.5%;"><input type="checkbox" v-model="allChecked" @change="checkAll();"/></th> -->
					  <th style="width:2.5%;"><input type="checkbox"/></th>
					  <th style="width:2.5%;">序号</th>
					  <th style="width:7.5%;">油罐名称</th>
					  <th style="width: 7.5%;">采集时间</th>
					  <th style="width:7.5%;">液位高度</th>
					  <!-- <th style="width: 7.5%;">最高温度</th>
					  <th style="width: 7.5%;">最底温度</th> -->
					  <th style="width:20%;">平均温度</th>
				  </tr>
			  </thead>
			  <tbody>
				  <tr v-for="(item, i) in listData">
					<!-- <td><input type="checkbox" @change="clickChange();"></td> -->
					<td><input type="checkbox"></td>
					<td v-if="sortOrder=='0'" v-text="i+1"></td>
					<td v-else v-text="listDataOne.length-i"></td>
					<td v-text="item.oilname"></td>
					<td v-text="item.createTime"></td>
					<td v-text="(item.liquidHeight)+'米'"></td>
					<!-- <td v-text="(item.maxTemperature)+'℃'"></td>
					<td v-text="(item.minTemperature)+'℃'"></td> -->
					<td v-text="(item.avgTemperature)+'℃'"></td>
				  </tr>
			  </tbody>
	     </table>
		 <!-- 分页容器 -->
		 <div id="PageBar"></div>
		 <div class="edit-btn">
		   <button class="edit-back" @click="detailBack();">返回</button>
		 </div>
		  </div>
	  </div>
  </div>
</template>

<script>

import 'echarts-gl';
import { getOilTemperatureList,getOilTemperatureListOne,getOilHeight } from "@/api/intelligentWarehous/oilCan";	
	
export default {
	name:'oilTankDetail',
	data(){
		return{
			searchData: {
			  oilcanCode:this.$route.query.oilcan_code,
			  startTime:'',
			  endTime:'',
			  pageSize: 10,
			  pageNo: ''
			},
			maxHeight:'',
			colorList:['#005757','#ff0000','#8f00d2','#F2E252','#007AAE','#C785C8','#44000A','#808080','#BFB500','#00B0F0','#DAAADB'],
			grainVarietyList:[],
			sortOrder: "0", //0 顺序，1 倒序
			listData:[],
			listDataOne:[],
			listDataTwo:[],
			column:[],
			temperatureArr:[],
			liquidHeight:[],
			time:[],
			oilname:'',
			temperature:'',
			liquidHeightValue:'',
			allChecked: false,
			planIdList: [],
			getOilHeightValue:'',
			height: '',
			Ygvalue:0
		};
	},
	methods:{
		changeSortOrder () {//倒序
		  var vm = this;
		  vm.listData.reverse();
		},
		getList(pageNo){
			let vm=this;
			layer.load(2);
			vm.column=[];
			//vm.liquidHeight=[];
			vm.time=[];
			vm.temperatureArr=[];
			vm.searchData.pageNo = pageNo;
			let startTime=document.getElementById('startTime').value;
			let endTime=document.getElementById('endTime').value;		
			vm.searchData.startTime=startTime.slice(0,10);
			vm.searchData.endTime=endTime.slice(0,10);
			getOilTemperatureList(this.searchData)
			 .then((ret) => {
			   layer.closeAll("loading");
			   if (ret.code == 200) {
				 if(ret.data.DataInfo == null){
					 layer.msg("暂无数据");
				 }else{
					 vm.listData=ret.data.DataInfo;
				 }
				 console.log(vm.listData);
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
				       const str = JSON.stringify(obj.curr)
				       sessionStorage.setItem("pageNo", str)
				       vm.getList(obj.curr);
				     }
				   }
				 });
				 for(let i=0;i<vm.listData.length;i++){
					 vm.temperatureArr.push(vm.listData[i].avgTemperature);
					 vm.time.push((vm.listData[i].createTime).slice(0,10));
					 vm.liquidHeight.push(vm.listData[i].liquidHeight);
				 }
				 // 声明一个空的数组
				 let liquidHeightOne = new Array();
				 let s = 0;
				 //将原数据倒序输出，并赋值给新数组
				 for (let i = (vm.liquidHeight.length - 1); i > -1; i--) {
					 liquidHeightOne[s] = vm.liquidHeight[i];
					 s++;
				 }
				 this.$echarts
				   .init(document.getElementById('temperature3D'))
				   .setOption({
					   title: {
					   	  text: '每日液位变化图'
					   },
					tooltip: {
					   trigger: 'axis'
				    },
				   legend: {
					   data: ['历史液位高度']
				   },
				   toolbox: {
					   show: true,
					   feature: {
						   dataZoom: {
							   yAxisIndex: 'none'
						   },
						   dataView: {readOnly: false},
						   magicType: {type: ['line', 'bar']},
						   restore: {},
						   saveAsImage: {}
					   }
				   },
				   xAxis: {
					   type: 'category',
					   boundaryGap: false,
					   data:vm.time,
					   //data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
				   },
				   yAxis: {
					   type: 'value',
					   axisLabel: {
						   formatter: '{value} m'
					   }
				   },
				   series: [
					   {
						   name: '历史液位高度',
						   type: 'line',
						   data: vm.liquidHeight,
						   //data: [11, 11, 15, 13, 12, 13, 10],
						   markLine: {
							   data: [
								   {type: 'average', name: '平均值'}
							   ]
						   }
					   },
					  
				   ]
				 });
				 
				 this.$echarts
				   .init(document.getElementById('temperature3DOne'))
				   .setOption({
					title: {
						text: '每日液温(平均)变化图'
					},
					tooltip: {
						trigger: 'axis'
					},
					xAxis: {
						type: 'category',
						//data: ['1时', '2时', '3时', '4时', '5时', '6时', '7时']
						data:(vm.time),
						axisTick: {
						    alignWithLabel: true
						}
					},
					yAxis: {
						type: 'value',
						axisLabel: {
								formatter: '{value} °C'
							}
					},
					series: [{
						name: '每日平均温',
						//data: [20, 30, 25, 23, 26, 28, 30],
						data: vm.temperatureArr,
						type: 'line'
					}]
				 });
				}else {
				  if (ret.code == "500" && ret.data == "查询错误，没有数据") {
					layer.msg("暂无数据");
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
		getListOne(){
			let vm=this;
			vm.grainVarietyList=[];
			getOilTemperatureListOne(this.searchData)
			 .then((ret) => {
			   layer.closeAll("loading");
			   if (ret.code == 200) {
				   vm.listDataOne=ret.data.temperatureDetail;
				   vm.oilname=vm.listDataOne.oilcanName;
				   vm.liquidHeightValue=vm.listDataOne.liquidLevelHeight;
				   ret.data.temperatureArray.forEach((element,i) => {
				     vm.grainVarietyList.push({
				       grainVarietyName:element,
				       color:vm.colorList[i]
				     });
				   });
				   //console.log(vm.grainVarietyList);
				   
				   getOilHeight(this.searchData)
				    .then((ret) => {
				      layer.closeAll("loading");
				      if (ret.code == 200) {
				   	   vm.getOilHeightValue=ret.data.oilcanDetail;
				   	   //console.log(vm.liquidHeightValue);
				   	   //console.log(vm.getOilHeightValue.height);
				   	   vm.height = parseInt(vm.liquidHeightValue / vm.getOilHeightValue.height * 100) + '%';
				   	   //vm.Ygvalue=parseInt(vm.getOilHeightValue.height /2) * 1;
					   //console.log(vm.Ygvalue)
				   	   vm.$refs.testRef.style.height = vm.height
					   /* vm.grainVarietyList = vm.grainVarietyList.splice(0, 5)
					   console.log(vm.grainVarietyList) */
				      }else {
				   	  if (ret.code == "500" && ret.data == "查询错误，没有数据") {
				   		layer.msg("暂无数据");
				   	  } else {
				   		layer.alert(ret.data, {closeBtn: 0});
				   	  }
				      } 
				   	})
				   	.catch(err => {
				   	  layer.closeAll("loading");
				   	  layer.alert(err.message, {closeBtn: 0});
				   	});
			   }else {
				  if (ret.code == "500" && ret.data == "查询错误，没有数据") {
					layer.msg("暂无数据");
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
		getOilHeightOne(){
			let vm=this;
			getOilHeight(this.searchData)
			 .then((ret) => {
			   layer.closeAll("loading");
			   if (ret.code == 200) {
				   vm.getOilHeightValue=ret.data.oilcanDetail;
				   console.log(vm.liquidHeightValue);
				   console.log(vm.getOilHeightValue.height);
				   vm.height = parseInt(vm.liquidHeightValue / vm.getOilHeightValue.height * 100) + '%';
				   console.log(vm.height)
				   vm.$refs.testRef.style.height = vm.height
			   }else {
				  if (ret.code == "500" && ret.data == "查询错误，没有数据") {
					layer.msg("暂无数据");
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
		detailBack: function() {
		  var vm = this;
		  this.$router.push({
		    name: "oilTankManagement",
		  });
		}
	},
	mounted() {
		var vm=this;
		vm.maxHeight = vm.$refs.contentRef.offsetWidth
		console.log(vm.maxHeight)
		vm.getList(1);
		vm.getListOne();
	}
}
</script>

<style scoped>
   .content{
	  margin-bottom: 1%;
   }
   .tableCard {
	   width: 96%;
	   margin: 0 auto;
	   border: 1px solid #333;
	   padding: 2% 1%;
	   /* margin-top: -14.375rem; */
	   margin-bottom: 2rem;
   }
  #temperature3DLeft{
	  width: 39%;
	  height:43.6rem;
	  display:inline-block;
	  position: relative;
	  margin: 1%;
	  border: 1px solid #333;
	  background: linear-gradient(rgb(105, 105, 105) 10%, rgb(192, 192, 192));
  }
  
  .storage-title{
	  text-align: center;
	  height: 3rem;
	  position: absolute; 
	  top: 30.8%; 
	  left: 42%;
	  height: 22.6rem;
	  display: flex;
	  flex-direction: column;
	  justify-content: space-around;
  }
  
  .storage-title-big{
  	  text-align: center;
  	  height: 3rem;
  	  position: absolute; 
  	  top: 30.8%; 
  	  left: 28%;
	  height: 22.6rem;
	  display: flex;
	  flex-direction: column;
	  justify-content: space-around;
  }
  
  .storage-title-item{
	  height: auto;
  }
  
  .storage-title-item .sti-color{
	 height: 6rem; 
	 width: 8rem;
  }
  
  .storage-title-item label{
	  width: 8rem;
  }
  
  .ygImg{
	  display: inline-block;
	  height: 42rem;
	  width: 54rem;
	  position: absolute;
	  top: 10%;
	  left: 0%;
  }
  
  .ygImg img{
	  width: 100%;
	  height: 100%;
  }
  
  .YgBox{
  	  width: 5rem;
  	  height: 22.6rem;
	  background-color: #fff;
	  position: absolute;
	  top: 31%;
	  left: 30%;
  }
  
  .YgBox-big{
  	  width: 5rem;
  	  height: 22.6rem;
  	  background-color: #fff;
  	  position: absolute;
  	  top: 31%;
  	  left: 20%;
  }
  
  .tittle{
	  margin-top: 0.625rem;
	  text-align: center;
	  font-weight: bold;
	  color: #fff;
  }
  
  .ztwBtn{
	  position: absolute;
	  top: 0rem;
	  right: 0rem;
	  background: #95C93E;
	  color: #fff;
	  padding: 4px;
	  border-radius: 6px;
  }
  
  .border{
  	  display: inline-block;
  	  width: 3.25rem;
  	  border: 1px solid #ded4d4;
  }
  
  #temperature3D-Right{
	  width:57%;
	  height:43.6rem;
	  position: absolute;
	  display:inline-block;
	  margin:1%;
	  border:1px solid #333;
  }
  #temperature3D{
	  width: 100%;
	  height: 50%;
  }
  #temperature3DOne{
	  width: 100%;
	  height: 50%;
  }
  .test {
	 width: 100%;
	 background-color: #E4C39B;
  }
  .mirrorRotateVertical {
    /* 垂直镜像翻转 */
    -moz-transform: scaleY(-1);
    -webkit-transform: scaleY(-1);
    -o-transform: scaleY(-1);
    transform: scaleY(-1);
    /*兼容IE*/
    filter: FlipV;
  }
  .ygText{
	  display: inline-block;
	  height: 1.5rem;
	  line-height: 1.5rem;
	  color: #fff;
	  
  }
</style>