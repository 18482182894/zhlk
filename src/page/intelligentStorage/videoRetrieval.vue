<template>
  <div class="content">
    <div class="videoRetrieval">
      <div class="lookup">
        车牌号：
        <input type="text" class="input-text excision" v-model="postData.plateNumber">
        出入库单号：
        <input type="text" class="input-text excision" v-model="postData.billId">
        视频日期：
        <input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})" id="videoStartTime">至
        <input type="text" class="input-text Wdate excision" onclick="WdatePicker({maxDate:'%y-%M-%d'})" id="videoEndTime">

        <div class="btn btn-add" @click="getList(1);">
          <img src="../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <table class="customTable simulation">
        <thead>
          <tr>
            <th style="width:5%;"><input type="checkbox" ></th>
            <th style="width:5%;">序号</th>
            <th style="width:10%;">出入库通知单</th>
            <th style="width:10%;">客户</th>
            <th style="width:10%;">车牌号</th>
            <th style="width:10%;">操作人姓名</th>
            <th style="width:10%;">录像开始时间</th>
            <th style="width:10%;">录像结束时间</th>
            <th style="width:10%;">审批单状态</th>
            <th style="width:20%;">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr  v-for="(item,i) in listData">
            <td colspan="10" rowspan="" >
              <div class="customTr">
                <div class="customTd" style="width:5%;" @click="showChild(i);"><label style="font-size:30px;" v-text="parseInt(showTr)==i?'-':'+'"></label></div>
                <div class="customTd" style="width:5%;" v-text="i+1"></div>
                <div class="customTd" style="width:10%;" v-text="item.billId"></div>
                <div class="customTd" style="width:10%;" v-text="item.customerName"></div>
                <div class="customTd" style="width:10%;" v-text="item.plateNumber"></div>
                <div class="customTd" style="width:10%;"></div>
                <div class="customTd" style="width:10%;" v-text="item.entryRegisterDatetime"></div>
                <div class="customTd" style="width:10%;" v-text="item.goOutDatetime"></div>
                <div class="customTd" style="width:10%;">
                    <div class="table-btn btn-green" v-if="item.videoComposeFile" @click="showPopup(item.videoComposeFile);">播放按钮</div>
                    <div class="table-btn btn-green" v-else @click="fusionVideo(item.registerNo);">汇总视频</div>
                </div>
                <div class="customTd" style="width:20%;">
                      <a class="table-btn btn-blue" v-if="item.videoComposeFile" :href="item.videoComposeFile" :download="item.registerNo+'_ALL_IN_ONE'">下载</a>
                </div>
              </div>

              <div class="customTr" v-if="parseInt(showTr)==i">
                <div class="customTd" style="width:5%;"></div>
                <div class="customTd" style="width:5%;">序号</div>
                <div class="customTd" style="width:30%;">操作环节</div>
                <div class="customTd" style="width:10%;">路线时长</div>
                <div class="customTd" style="width:10%;">路线开始时间</div>
                <div class="customTd" style="width:10%;">路线结束时间</div>
                <div class="customTd" style="width:10%;">观看</div>
                <div class="customTd" style="width:20%;">操作</div>
              </div>
              <div class="customTr" v-if="parseInt(showTr)==i" v-for="(child,j) in item.stepList">
                <div class="customTd" style="width:5%;"></div>
                <div class="customTd" style="width:5%;" v-text="j+1"></div>
                <div class="customTd" style="width:30%;" v-text="child.businessStep"></div>
                <div class="customTd" style="width:10%;" v-text="child.timeLength"></div>
                <div class="customTd" style="width:10%;" v-text="child.startDatetime"></div>
                <div class="customTd" style="width:10%;" v-text="child.endDatetime"></div>
                <div class="customTd" style="width:10%;">
                    <div class="table-btn btn-green" v-if="child.videoFile" @click="showPopup(child.videoFile);">播放按钮</div>
                </div>
                <div class="customTd" v-if="parseInt(showTr)==i" style="width:20%;">
                    <div class="table-btn btn-yellow" @click="jumpDetail(item.registerNo,item.cardNo,child.businessStep);">详情</div>
                      <a class="table-btn btn-blue" v-if="child.videoFile" :href="child.videoFile" :download="item.registerNo+'_ALL_IN_ONE'">下载</a>
                </div>
              </div>
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
import { videoRetrieval,videoFusion} from "@/api/intelligentStorage/public";  


export default {
  name: "document",
  data() {
    return {
      sortOrder: "0", //0 顺序，1 倒序
      postData: {
        plateNumber: "",
        billId:'',
        videoStartTime:'',
        videoEndTime:'',
        pageSize: 10,
        pageNo: 0
      },
      listData: [],
      showTr:'',//控制二级列表显隐
      editPopup: 0 // 控制菜单编辑弹出层的显影，1为显示
    };
  },
  methods: {
    changeSortOrder: function() {//倒序
      var vm = this;
      vm.listData.reverse();
    },
    getList: function(pageNo) {//获取列表
      var vm = this;
      vm.postData.videoStartTime=$('#videoStartTime').val();
      vm.postData.videoEndTime=$('#videoEndTime').val();
      vm.postData.pageNo = pageNo;
      layer.load(2);
      videoRetrieval(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.listData = ret.data.cardDetailList;
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
    },
    showPopup: function(url) {
      // 展示弹出层
      var vm = this;
      // console.log(url)
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
    fusionVideo:function (id) {
        var vm = this;
        layer.load(2);
        videoFusion({registorNo:id}).then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
                layer.msg("视频汇总成功！");
                vm.getList(1);
            } else {
                layer.alert(ret.data, { closeBtn: 0 });
            }
        })
        .catch(err => {
            layer.alert(err.data, { closeBtn: 0 });
        });
    },
    showChild:function(num){//展示二级列表
        var vm = this;
        if(parseInt(vm.showTr)==num){
            vm.showTr='';
        }else{
            vm.showTr=num;
        }
    },
    jumpDetail: function(id,cardNo,step) {
      //跳转到详情
      var vm = this;
      var stepNumber;
      switch (step) {
        case '入门登记':
            stepNumber=1;
          break;
        case '扦样':
            stepNumber=2;          
          break;
        case '检验':
            stepNumber=3;          
          break;
        case '值仓':
            stepNumber=5;          
          break;
        case '皮重':
            stepNumber=6;          
          break;
        case '毛重':
            stepNumber=4;          
          break;
        case '结算':
            stepNumber=7;          
          break;
        case '出门销卡':
            stepNumber=8;          
          break;
      }
      this.$router.push({
        name: "guidanceDetail",
        query: {
          id: id,
          cardNo:cardNo,
          step:stepNumber
        }
      });
    },
    playVideo: function(url) {
      //视频播放
      var vm = this;
      var video=document.querySelector('#guidanceVideo');
      video.src=url;
    },
  },
  mounted() {
    this.getList(1);
  }
};

</script>
