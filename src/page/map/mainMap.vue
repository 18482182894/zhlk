<template>
  <div class="comprehensive-content">
    <div class="fictitious" id="fictitious">
      <img src="../../../static/images/show-2d.jpg" alt @click="closeCamera();" />
      <div
        class="Camera-item"
        v-for="item in listData"
        v-bind:style="item.style"
        @click="showCamera(item);"
      ></div>
    </div>
    <input type="hidden" id="message" />
    <div class="hover-div hover-div-monitor" v-show="isShow==1" id="hover">
      <iframe src id="iframe"></iframe>
    </div>
  </div>
</template>
<style scoped>
.comprehensive-content {
  top: 80px;
  overflow: auto;
}
.comprehensive-content .fictitious {
  position: relative;
  width: 1658px;
  height: 896px;
}
.comprehensive-content .fictitious .Camera-item {
  width: 30px;
  height: 30px;
  position: absolute;
  left: 1rem !important;
  top: 1rem !important;
  background: url(../../../static/images/monitor.png);
}
.btn-div {
  width: 35%;
  margin-left: 30px;
}
.use-div {
  display: flex;
  flex-direction: row;
  width: 700px;
  height: 350px;
  /*border: black 1px solid;*/
  /*background: #fff;*/
  /*box-shadow: gainsboro 0px 2px 5px 1px ;*/
}
#fictitious img {
  width: 100%;
  height: 100%;
}
</style>
<script>
import { reservoirMonitorList, detailCamera } from "../../api/map/map";
export default {
  name: "mainMap",
  data() {
    return {
      isShow: 0, //0隐藏，1显示
      postData: {
        cameraName: "",
        pageSize: 1000,
        pageNo: 0
      },
      listData: [], //库区摄像头列表
      oLiveView: {
        iProtocol: 1, // protocol 1：http, 2:https
        szIP: "", // protocol ip
        szPort: "", // protocol port
        szUsername: "", // device username
        szPassword: "", // device password
        iStreamType: 2, // stream 1：main stream  2：sub-stream  3：third stream  4：transcode stream
        iChannelID: 1, // channel no
        bZeroChannel: false // zero channel
      }
    };
  },
  methods: {
    getList: function() {
      //获取列表
      var vm = this;
      layer.load(2);
      reservoirMonitorList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            for (var i = 0; i < ret.data.dataList.length; i++) {
              ret.data.dataList[i]["style"] = {
                left: ret.data.dataList[i].cameraPosition.split(",")[0] + "rem",
                top: ret.data.dataList[i].cameraPosition.split(",")[1] + "rem"
              };
            }
            vm.listData = ret.data.dataList;
            console.log(JSON.stringify(vm.listData));
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    showCamera: function(data) {
      var vm = this;
      vm.oLiveView.szIP = data.dvrIp;
      vm.oLiveView.szPort = data.dvrPort;
      vm.oLiveView.szUsername = data.userName;
      vm.oLiveView.szPassword = data.userPwd;
      vm.oLiveView.iChannelID = data.channelNo;
      vm.isShow = 1;
      console.log(vm.oLiveView);
      $("#message").val(JSON.stringify(vm.oLiveView));
      document.querySelector("#iframe").src =
        "../../../static/html/camera.html";
    },
    closeCamera: function() {
      var vm = this;
      vm.isShow = 0;
      console.log(document.querySelector("#iframe").contentWindow);
      document.querySelector("#iframe").contentWindow.closeCamera();
    }
  },
  mounted() {
    var vm = this;
    vm.getList();
  }
};
</script>

