<template>
  <div class="content">
    <div class="guide-top">
      <p class="guide-title">流程</p>
      <div class="guide-main">
        <div :class="stepNumber==1?'guide-item guide-item-on':'guide-item'" @click="stepTab(1);">登记</div>
        <div :class="stepNumber==2?'guide-item guide-item-on':'guide-item'" @click="stepTab(2);">扦样</div>
        <div :class="stepNumber==3?'guide-item guide-item-on':'guide-item'" @click="stepTab(3);">检验</div>
        <div :class="stepNumber==4?'guide-item guide-item-on':'guide-item'" @click="stepTab(4);">称毛</div>
        <div :class="stepNumber==5?'guide-item guide-item-on':'guide-item'" @click="stepTab(5);">值仓</div>
        <div :class="stepNumber==6?'guide-item guide-item-on':'guide-item'" @click="stepTab(6);">称皮</div>
        <div :class="stepNumber==7?'guide-item guide-item-on':'guide-item'" @click="stepTab(7);">结算</div>
        <div :class="stepNumber==8?'guide-item guide-item-on':'guide-item'" @click="stepTab(8);">销卡</div>
      </div>
    </div>
    <div class="menuManage operationLog ">
      <div class="lookup">
        车牌：
        <input type="text" class="input-text excision" v-model="postData.plateNumber">
        客户姓名：
        <input type="text" class="input-text excision" v-model="postData.customerName">

        <div class="btn btn-add" @click="getList(0);">
          <img src="../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div>
        <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value="">排序方式</option>
          <option value="0">顺序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
          <tr>
            <th style="width:5%;"><input type="checkbox" v-model="allChecked" @change="checkAll();" ></th>
            <th style="width:5%;">序号</th>
            <th style="width:7.5%;">出入库类型</th>
            <th style="width:7.5%;">出入库通知单</th>
            <th style="width:10%;">客户</th>
            <th style="width:10%;">车牌号</th>
            <th style="width:7.5%;">操作状态</th>
            <th style="width:7.5%;">操作人姓名</th>
            <th style="width:10%;">录像开始时间</th>
            <th style="width:10%;">录像结束时间</th>
            <th style="width:10%;">观看</th>
            <th style="width:10%;">操作</th>
          </tr>
        </thead>
        <tbody v-if="stepNumber==1||stepNumber==2||stepNumber==3">
            <tr v-for="(item,i) in listData">
              <td><input type="checkbox" :value="item.BillId"  v-model="dataList"   @change="clickChange();"></td>
              <td v-if="sortOrder=='0'" v-text="i+1"></td>
              <td v-else v-text="listData.length-i"></td>
              <td v-text="item.registorType"></td>
              <td v-text="item.BillId"></td>
              <td v-text="item.customerName"></td>
              <td v-text="item.plateNumber"></td>
              <td v-text="item.step"></td>
              <td v-text="item.operator"></td>
              <td v-text="item.startTime"></td>
              <td v-text="item.endTime"></td>
              <td>
                <div class="table-btn btn-green" @click="showPopup(item.videoFile);">播放按钮</div>
              </td>
              <td>
                <div class="table-btn btn-yellow" @click="jumpDetail(item.registorNo);">详情</div>
              </td>
            </tr>
        </tbody>
        <tbody v-if="stepNumber==4||stepNumber==5||stepNumber==6">
            <tr v-for="(item,i) in listData">
              <td><input type="checkbox" :value="item.BillId"  v-model="dataList"   @change="clickChange();"></td>
              <td v-if="sortOrder=='0'" v-text="i+1"></td>
              <td v-else v-text="listData.length-i"></td>
              <td v-text="item.registorType"></td>
              <td v-text="item.billId"></td>
              <td v-text="item.customerName"></td>
              <td v-text="item.plateNumber"></td>
              <td v-text="item.businessStep"></td>
              <td v-text="item.operator"></td>
              <td v-text="item.startDatetime"></td>
              <td v-text="item.endDatetime"></td>
              <td>
                <div class="table-btn btn-green" @click="showPopup(item.videoFile);">播放按钮</div>
              </td>
              <td>
                <div class="table-btn btn-yellow" @click="jumpDetail(item.registorNo);">详情</div>
              </td>
            </tr>
        </tbody>
        <tbody v-if="stepNumber==7||stepNumber==8">
            <tr v-for="(item,i) in listData">
              <td><input type="checkbox" :value="item.BillId"  v-model="dataList"   @change="clickChange();"></td>
              <td v-if="sortOrder=='0'" v-text="i+1"></td>
              <td v-else v-text="listData.length-i"></td>
              <td v-text="item.registerType"></td>
              <td v-text="item.billId"></td>
              <td v-text="item.customerName"></td>
              <td v-text="item.plateNumber"></td>
              <td v-text="item.step"></td>
              <td v-text="item.opUser"></td>
              <td v-text="item.startDatetime"></td>
              <td v-text="item.endDatetime"></td>
              <td>
                <div class="table-btn btn-green" @click="showPopup(item.videoFile);">播放按钮</div>
              </td>
              <td>
                <div class="table-btn btn-yellow" @click="jumpDetail(item.registerNo,item.cardNo);">详情</div>
              </td>
            </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar"></div>
    </div>
      <!-- 视频播放弹出层 -->
      <div class="popup" :style="editPopup==1?'display:block;':''">
        <div class="popup-main guidance-video" @click="closePopup">
          <div class="video-content">
              <video src="" id="guidanceVideo" autoplay="autoplay" controls="controls" ></video>
          </div>
        </div>
      </div>
  </div>
</template>
<style scoped>
  .guidance-video{
      background: rgba(0,0,0,0.7);
  }
  .video-content{
      width: 50%;
      height: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      background: #000;
  }
  .video-content video{
      width: 100%;
      height: 100%;
  }
</style>
<script>
import {registerList , samplingList ,checkoutList, tareWeightList, grossWeightList, valueBinList, processReimbursementList, processPinCardList, getVideoUrlByOne,getVideoUrlByTwo ,getVideoUrlByThree} from "../../../api/intelligentStorage/public";


export default {
  name: "document",
  data() {
    return {
      sortOrder: "0", //0 顺序，1 倒序
      stepNumber:this.$route.query.stepNumber?this.$route.query.stepNumber:1,
      requestData:this.$route.query.data,
      postData: {
        plateNumber: "",
        customerName:'',
        pageSize: 10,
        pageNo: 0
      },
      dataList:[],
      showType:'',
      allChecked: false,
      detailData:'',
      listData: [],
      editPopup: 0 // 控制菜单编辑弹出层的显影，1为显示
    };
  },
  methods: {
    changeSortOrder: function() {//倒序
      var vm = this;
      vm.listData.reverse();
    },
    showPopup: function(url) {
      // 展示弹出层
      var vm = this;
      console.log(url)
      vm.editPopup = 1;
      vm.playVideo(url);
    },
    closePopup: function() {
      // 隐藏弹出层
      var vm = this;
      vm.editPopup = 0;
      var video=document.querySelector('#guidanceVideo');
      video.pause();
    },
    getList: function(pageNo) {//获取列表
      var vm = this;
      vm.postData.pageNo=pageNo;
      layer.load(2);
      switch(vm.stepNumber)
      {
          case 1:
            registerList(vm.postData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  var dataList=ret.data.dataList;
                    for (let i = 0; i < dataList.length; i++) {
                      
                        getVideoUrlByOne({registorNo:dataList[i].registorNo}).then(ret => {
                            layer.closeAll("loading");
                            if (ret.code == 200) {
                                dataList[i].videoFile = ret.data.playUrl;
                            } else {
                                layer.alert(ret.data, { closeBtn: 0 });
                            }
                        })
                        .catch(err => {
                            layer.alert(err.data, { closeBtn: 0 });
                        });
                      
                    }
                  vm.listData = dataList;

                  laypage({
                      //分页
                      cont: "PageBar", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                      pages: ret.page.totalPages, //通过后台拿到的总页数
                      curr: pageNo,
                      skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                      jump: function(obj, first) {
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
                    layer.alert(ret.data, { closeBtn: 0 });
                  }
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
            break;
          case 2:
            samplingList(vm.postData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  var dataList=ret.data.dataList;
                    for (let i = 0; i < dataList.length; i++) {
                      
                        getVideoUrlByTwo({registorNo:dataList[i].registorNo}).then(ret => {
                            layer.closeAll("loading");
                            if (ret.code == 200) {
                                dataList[i].videoFile = ret.data.playUrl;
                            } else {
                                layer.alert(ret.data, { closeBtn: 0 });
                            }
                        })
                        .catch(err => {
                            layer.alert(err.data, { closeBtn: 0 });
                        });
                      
                    }
                  vm.listData = dataList;
                  laypage({
                      //分页
                      cont: "PageBar", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                      pages: ret.page.totalPages, //通过后台拿到的总页数
                      curr: pageNo,
                      skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                      jump: function(obj, first) {
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
                    layer.alert(ret.data, { closeBtn: 0 });
                  }
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
            break;
          case 3:
            checkoutList(vm.postData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  var dataList=ret.data.dataList;
                    for (let i = 0; i < dataList.length; i++) {
                      
                        getVideoUrlByThree({registorNo:dataList[i].registorNo}).then(ret => {
                            layer.closeAll("loading");
                            if (ret.code == 200) {
                                dataList[i].videoFile = ret.data.playUrl;
                            } else {
                                layer.alert(ret.data, { closeBtn: 0 });
                            }
                        })
                        .catch(err => {
                            layer.alert(err.data, { closeBtn: 0 });
                        });
                      
                    }
                  vm.listData = dataList;
                  laypage({
                      //分页
                      cont: "PageBar", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                      pages: ret.page.totalPages, //通过后台拿到的总页数
                      curr: pageNo,
                      skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                      jump: function(obj, first) {
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
                    layer.alert(ret.data, { closeBtn: 0 });
                  }
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
            break;
          case 4:
            grossWeightList(vm.postData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  vm.listData = ret.data.operationProcessList;
                  laypage({
                      //分页
                      cont: "PageBar", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                      pages: ret.page.totalPages, //通过后台拿到的总页数
                      curr: pageNo,
                      skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                      jump: function(obj, first) {
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
                    layer.alert(ret.data, { closeBtn: 0 });
                  }
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
            break;
          case 5:
            valueBinList(vm.postData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  vm.listData = ret.data.operationProcessList;
                  laypage({
                      //分页
                      cont: "PageBar", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                      pages: ret.page.totalPages, //通过后台拿到的总页数
                      curr: pageNo,
                      skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                      jump: function(obj, first) {
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
                    layer.alert(ret.data, { closeBtn: 0 });
                  }
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
            break;
          case 6:
            tareWeightList(vm.postData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  vm.listData = ret.data.operationProcessList;
                  laypage({
                      //分页
                      cont: "PageBar", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                      pages: ret.page.totalPages, //通过后台拿到的总页数
                      curr: pageNo,
                      skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                      jump: function(obj, first) {
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
                    layer.alert(ret.data, { closeBtn: 0 });
                  }
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
            break;
          case 7:
            processReimbursementList(vm.postData)
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
                      jump: function(obj, first) {
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
                    layer.alert(ret.data, { closeBtn: 0 });
                  }
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
            break;
          case 8:
            processPinCardList(vm.postData)
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
                      jump: function(obj, first) {
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
                    layer.alert(ret.data, { closeBtn: 0 });
                  }
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
            break;
      }
      // console.log(JSON.stringify(vm.listData))
    },
    jumpDetail: function(id,cardNo) {
      //跳转到详情
      var vm = this;
      this.$router.push({
        name: "guidanceDetail",
        query: {
          id: id,
          cardNo:cardNo,
          step:vm.stepNumber
        }
      });
    },
    checkAll: function() {
      //全选
      var vm = this;
      if (vm.allChecked) {
        for (var i = 0; i < vm.listData.length; i++) {
          vm.dataList.push(vm.listData[i].BillId);
        }
      } else {
        vm.dataList.BillId = [];
      }
    },
    clickChange: function() {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (vm.dataList.length == vm.listData.length) {
        vm.allChecked = true;
      } else {
        vm.allChecked = false;
      }
    },
    stepTab:function (num) {
      var vm=this;
      vm.stepNumber=num;
      vm.postData.plateNumber='';
      vm.postData.customerName='';
      vm.postData.pageNo=0;
      vm.getList(0);
    },
    playVideo: function(url) {
      //视频播放
      var vm = this;
      var video=document.querySelector('#guidanceVideo');
      video.src=url;
    },
  },
  mounted() {
    var vm = this;
    vm.getList(0);
  }
};

</script>
