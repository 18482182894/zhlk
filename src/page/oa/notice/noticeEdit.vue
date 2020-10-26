<template>
  <div class="content">
    <div class="menuManage userManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">基础信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
                <label>类型：</label>
                <select class="select-style" v-model="submitData.noticeType">
                  <option value="1">通知</option>
                  <option value="2">通报</option>
                  <option value="3">决定</option>
                </select>
              </span>
              <span>
                <label>标题：</label>
                <input type="text" class="input-text" v-model="submitData.noticeTitle">
              </span>
              <span>
                <label>发布时间：</label>
                <input
                  type="text"
                  class="input-text Wdate"
                  onclick="WdatePicker({maxDate:'%y-%M-%d'})"
                  id="releaseDatetime"
                >
              </span>
              <span>
                <label>有效期开始时间：</label>
                <input
                  type="text"
                  class="input-text Wdate"
                  onclick="WdatePicker({maxDate:'%y-%M-%d'})"
                  id="effectiveStartDatetime"
                >
              </span>
              <span>
                <label>有效期结束时间：</label>
                <input
                  type="text"
                  class="input-text Wdate"
                  onclick="WdatePicker()"
                  id="effectiveEndDatetime"
                >
              </span>
              <br>
              <span>
                <label>公告内容：</label>
                <!-- <input type="text" class="input-text" v-model="submitData.noticeContents"> -->
              </span>
            </div>
          </div>
          <div id="wangEdit" style="font-size: 12px;"></div>
        </div>
      </div>
      <div class="edit-btn">
        <button class="edit-submit" @click="submitEvent();">提交</button>
        <button class="edit-back" @click="detailBack();">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import { editNotice, addNotice, noticeDetail } from "../../../api/oa/notice";
import E from "wangeditor";

var editor = new E("#wangEdit");
export default {
  name: "noticeEdit",
  data() {
    return {
      postData: {
        noticeId: this.$route.query.id
      },
      submitData: {
        noticeId: "",
        noticeTitle: "",
        noticeType: "",
        releaseDatetime: "",
        effectiveStartDatetime: "",
        effectiveEndDatetime: "",
        noticeContents: ""
      }
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      noticeDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.submitData.noticeId = ret.data.result.noticeId;
            vm.submitData.noticeTitle = ret.data.result.noticeTitle;
            vm.submitData.noticeType = ret.data.result.noticeType;
            $("#releaseDatetime").val(ret.data.result.releaseDatetime);
            $("#effectiveStartDatetime").val(
              ret.data.result.effectiveStartDatetime
            );
            $("#effectiveEndDatetime").val(
              ret.data.result.effectiveEndDatetime
            );

            vm.submitData.noticeContents = ret.data.result.noticeContents;
            editor.txt.html(ret.data.result.noticeContents);
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    submitEvent: function() {
      var vm = this;
      vm.submitData.releaseDatetime = $("#releaseDatetime").val();
      vm.submitData.effectiveStartDatetime = $("#effectiveStartDatetime").val();
      vm.submitData.effectiveEndDatetime = $("#effectiveEndDatetime").val();
      if (vm.submitData.noticeTitle == "") {
        layer.msg("请填写标题");
        return;
      }
      if (vm.submitData.noticeType == "") {
        layer.msg("请填写类型");
        return;
      }
      if (vm.submitData.releaseDatetime == "") {
        layer.msg("请填写发布时间");
        return;
      }
      if (vm.submitData.effectiveStartDatetime == "") {
        layer.msg("请填写有效期开始时间");
        return;
      }
      if (vm.submitData.effectiveEndDatetime == "") {
        layer.msg("请填写有效期结束时间");
        return;
      }
      if (vm.submitData.noticeContents == "") {
        layer.msg("请填写公告内容");
        return;
      }

      if (this.$route.query.id) {
        layer.load(2);
        editNotice(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("编辑公告成功！");
              this.$router.push({
                name: "noticeList",
              });
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      } else {
        layer.load(2);
        addNotice(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增公告成功！");
              let noticeTitle_transfer=this.$route.query.noticeTitle_transfer;
              let noticeType_transfer=this.$route.query.noticeType_transfer;
              let pageNo=this.$route.query.pageNo;
              this.$router.push({
                name: "noticeList",
                query: {
                  noticeTitle:noticeTitle_transfer,
                  noticeType:noticeType_transfer,
                  pageNo:pageNo
                }
              });
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      }
    },
    detailBack:function () {
      var vm=this;
      let noticeTitle_transfer=this.$route.query.noticeTitle_transfer;
      let noticeType_transfer=this.$route.query.noticeType_transfer;
      let pageNo=this.$route.query.pageNo;
      this.$router.push({
        name: "noticeList",
        query: {
          noticeTitle:noticeTitle_transfer,
          noticeType:noticeType_transfer,
          pageNo:pageNo
        }
      });
    }
  },
  mounted() {
    var vm = this;

    if (this.$route.query.id) {
      vm.getDetail();
    }

    editor.customConfig.uploadImgServer =
      process.env.BASE_API + "IGIP-BWZL-FILE/FileUploadServlet";
    // editor.customConfig.debug = true;
    editor.customConfig.uploadImgHooks = {
      customInsert: function(insertImg, result, editor) {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        // console.log(JSON.stringify(result));
        var url = result.data.fileUrl;
        insertImg(url);

        // result 必须是一个 JSON 格式字符串！！！否则报错
      }
    };
    editor.customConfig.onchange = html => {
      this.editorContent = html;
      vm.submitData.noticeContents = html;
    };
    editor.create();
  }
};
</script>

<style scoped>
</style>
