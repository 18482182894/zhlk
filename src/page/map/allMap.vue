<template>
  <div class="content">
    <div class="allMap-left">
      硬盘录像机列表：
      <ul class="dvrList">
        <li
          :class="isChecked==item.dvrCode?'oncheck':''"
          v-for="item in listData"
          v-text="item.dvrName"
          @click="showCamera(item.dvrCode)"
        ></li>
      </ul>通道列表：
      <ul class="dvrList" style="height:450px;">
        <li
          :class="isChecked==item.dvrCode?'oncheck':''"
          v-for="item in dvrCamerasList"
          v-text="item.cameraName"
          @click="switchCamera(item.channelNo);"
        ></li>
      </ul>
    </div>
    <input type="hidden" id="message" />
    <div class="allMap-right">
      <iframe src="" id="iframe" ></iframe>
    </div>
  </div>
</template>
<style scoped>
.content {
  display: flex;
  font-size: 0;
}
.dvrList {
  padding: 0 15px;
  margin: 8px 0;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(232, 232, 232, 1);
  border-radius: 4px;
  height: 280px;
  overflow-y: auto;
}
</style>
<script>
import {
  ListDigitalVideoRecorder,
  detailDigitalVideoRecorder,
  dvrCameras
} from "../../api/map/map";
export default {
  name: "allMap",
  data() {
    return {
      isShow: 0, //0隐藏，1显示
      isChecked: "",
      postData: {
        dvrName: "",
        pageSize: 1000,
        pageNo: 0
      },
      listData: [], //库区摄像头列表
      dvrCamerasList: [], //通道列表
      oLiveView: {
        iProtocol: 1, // protocol 1：http, 2:https
        szIP: "", // protocol ip
        szPort: "", // protocol port
        szUsername: "", // device username
        szPassword: "", // device password
        iStreamType: 2, // stream 1：main stream  2：sub-stream  3：third stream  4：transcode stream
        iChannelID: 1, // channel no
        bZeroChannel: false, // zero channel
        ChannelList: [] //通道列表
      }
    };
  },
  methods: {
    getList: function() {
      //获取列表
      var vm = this;
      layer.load(2);
      ListDigitalVideoRecorder(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.dataList;
            // vm.isChecked= ret.data.dataList[0].dvrCode;
            dvrCameras({ dvrCode: ret.data.dataList[0].dvrCode })
              .then(ret => {
                console.log(JSON.stringify(ret.data))
                layer.closeAll("loading");
                if (ret.code == 200) {
                  vm.dvrCamerasList = ret.data.dataList;
                  vm.oLiveView.ChannelList = ret.data.dataList;
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
              })
              .catch(err => {
                layer.alert(err.data, { closeBtn: 0 });
              });
            vm.showCamera(ret.data.dataList[0].dvrCode);
            // console.log(JSON.stringify(vm.listData));
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    showCamera: function(id) {
      var vm = this;
      vm.isChecked = id;
      dvrCameras({ dvrCode: id })
        .then(ret => {
          //console.log(JSON.stringify(ret.data))
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.dvrCamerasList = ret.data.dataList;
            vm.oLiveView.ChannelList = ret.data.dataList;

            detailDigitalVideoRecorder({ dvrCode: id })
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  //console.log(ret)
                  vm.oLiveView.szIP = ret.data.data.dvrIp;
                  vm.oLiveView.szPort = ret.data.data.dvrPort;
                  vm.oLiveView.szUsername = ret.data.data.userName;
                  vm.oLiveView.szPassword = ret.data.data.userPwd;

                  vm.isShow = 1;
                  console.log(vm.oLiveView);
                  $("#message").val(JSON.stringify(vm.oLiveView));
                  document.querySelector('#iframe').src='../../../static/html/diskVideo.html';
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.data, { closeBtn: 0 });
        });
    },
    closeCamera: function() {
      var vm = this;
      vm.isShow = 0;
      //console.log(document.querySelector('#iframe').contentWindow)
      document.querySelector("#iframe").contentWindow.closeCamera();
    },
    switchCamera: function(id) {
      var vm = this;
      document.querySelector("#iframe").contentWindow.preview(id);
    }
  },
  mounted() {
    var vm = this;
    vm.getList();
  }
};
</script>

