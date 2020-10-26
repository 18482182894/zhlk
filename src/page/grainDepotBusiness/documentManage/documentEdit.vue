<template>
    <div class="content">
        <div class="menuManage roleManage">
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">来文信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail userManage-edit">
                        <div>
                            <span v-if="postData.documentId">
                                文件编号：
                                <input type="text" class="input-text" readonly="readonly" v-model="submitData.fileId" >
                            </span>
                            <span>
                                文件名称：
                                <input type="text" class="input-text" v-model="submitData.fileName">
                            </span>
                            <span>
                                发文日期：
                                <input type="text" class="input-text Wdate" onclick="WdatePicker({})"  id="releaseDate" >
                            </span>
                            <span>
                                类型：
                                <select name="" class="select-style" v-model="submitData.type">
                                    <option value="上级来文">上级来文</option>
                                    <option value="平级来文">平级来文</option>
                                    <option value="下级来文">下级来文</option>
                                    <option value="一般通知">一般通知</option>
                                    <option value="明传电报">明传电报</option>
                                </select>
                            </span>
                          <span id="documentRemarks">
                            备注：
                            <textarea cols="110" rows="2" v-model="submitData.remarks"></textarea>
                          </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">计划信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail userManage-edit">
                        <div>
                            <span>
                                计划名称：
                                <input type="text" class="input-text" v-model="submitData.planName">
                            </span>
                            <span>
                                计划类型：
                                <select name="" class="select-style" v-model="submitData.executeType">
                                    <option value="1">收储计划</option>
                                    <option value="2">销售计划</option>
                                    <option value="3">轮换计划</option>
                                </select>
                            </span>
                            <span>
                                粮食品种：
                                <div class="edit-grainVariety">
                                  <treeselect v-model="submitData.grainKind" :multiple="false" :options="grainVarietyList" />
                                </div>
                            </span>
                            <span>
                                粮食等级：
                                <select name="" class="select-style" v-model="submitData.grainOilLevel">
                                    <option :value="item.dicInfoValue" v-for="item in grainOilLevelList" v-text="item.dicInfoValue"></option>
                                </select>
                            </span>
                            <span>
                                粮食性质：
                                <select name="" class="select-style" v-model="submitData.grainAttribute">
                                    <option :value="item.dicInfoValue" v-for="item in grainNaturelList" v-text="item.dicInfoValue"></option>
                                </select>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">图片</div>
                </div>
                <div class="tag-box-content">
                    <div class="upload-pic">
                        <div id="uploadPic"></div>
                        <img :src="submitData.attachmentUrl?submitData.attachmentUrl:'../../../../static/images/upload-pic.png'" alt="">
                        <label class="fc-red">只支持.jpg格式</label>
                    </div>
                </div>
            </div>
            <div class="edit-btn">
                <button class="edit-submit" @click="submitEvent();">提交</button>
                <button class="edit-back" @click="detailBack();">返回</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
  #documentRemarks{
    display: block;
  }
</style>

<script>
 // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { getDocRevice,addDocRevice,editDocRevice } from "@/api/business/docRevices";
import {
  grainVariety,grainOilLevel,grainNature
} from "@/api/systemManage/dropDown";
import { checkPhone, uploadPic } from "@/utils/public";
export default {
  name: "planManageEdit",
  components: { Treeselect },
  data() {
    return {
      sortOrder: "0", //0 顺序，1 倒序
      postData: {
        documentId: this.$route.query.id,
        fileName: this.$route.query.fileName,
        document: this.$route.query.documentId
      },
      grainVarietyList:[],//粮食品种
      grainOilLevelList:[],//粮食等级
      grainNaturelList:[],//粮食性质
      submitData: {
        documentId: "",
        fileId: "",
        fileName: "",
        releaseDate: "",
        type: "",
        planName:'',
        executeType:'',
        grainKind:null,
        grainAttribute:'',
        grainOilLevel:'',
        attachmentFile:'',
        attachmentUrl:'',
        remarks:''
      },
      editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      getDocRevice(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.submitData.documentId = ret.data.receivedDocument.documentId;
            vm.submitData.fileId = ret.data.receivedDocument.fileId;
            vm.submitData.fileName = ret.data.receivedDocument.fileName;
            vm.submitData.releaseDate = ret.data.receivedDocument.releaseDate;
            $('#releaseDate').val(ret.data.receivedDocument.releaseDate);
            vm.submitData.type = ret.data.receivedDocument.type;
            vm.submitData.remarks= ret.data.receivedDocument.remarks;
            vm.submitData.planName = ret.data.receivedDocument.planName;
            vm.submitData.executeType = ret.data.receivedDocument.executeType;
            vm.submitData.grainKind = ret.data.receivedDocument.grainKind;
            vm.submitData.grainAttribute = ret.data.receivedDocument.grainAttribute;
            vm.submitData.grainOilLevel = ret.data.receivedDocument.grainOilLevel;
            vm.submitData.attachmentUrl = ret.data.receivedDocument.picture;
            vm.submitData.attachmentFile = ret.data.receivedDocument.picture.split('/').pop();
            vm.$nextTick(function() {
              vm.getDropDown();
            });
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
      vm.submitData.releaseDate=$('#releaseDate').val();
      if (this.$route.query.id) {
        layer.load(2);
        editDocRevice(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("编辑来文成功！");
              this.$router.push({
                name: "document",
                query: {
                  documentId:vm.postData.document,
                  fileName:vm.postData.fileName,
                  pageNo:vm.postData.pageNo
                }
              });
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      } else {
        vm.submitData.planId='';
        layer.load(2);
        addDocRevice(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增来文成功！");
              this.$router.push({
                name: "document",
                query: {
                  documentId:vm.postData.document,
                  fileName:vm.postData.fileName,
                  pageNo:vm.postData.pageNo
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
    getDropDown: function() {//获取下拉项
      var vm = this;
      grainVariety({}).then(ret => {//粮食品种
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret));
            vm.grainVarietyList = ret.data.grainVarietyList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
      }).catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
      });
      grainOilLevel({}).then(ret => {//粮食等级
          if (ret.code == 200) {
            vm.grainOilLevelList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
      }).catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
      });
      grainNature({}).then(ret => {//粮食性质
          if (ret.code == 200) {
            vm.grainNaturelList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
      }).catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
      });
    },
    detailBack:function (documentId,fileName,pageNo) {//返回
      var vm = this;
      this.$router.push({
        name: "document",
        query: {
          documentId:vm.postData.document,
          fileName:vm.postData.fileName,
          pageNo:vm.postData.pageNo
        }
      });
    }
  },
  mounted() {
    var vm = this;
    if (this.$route.query.id) {
        vm.getDetail();
    }else{
        vm.getDropDown();
    }
    uploadPic("uploadPic", function(ret) {
      if (ret.code == 200) {
        // console.log(JSON.stringify(ret))
        vm.submitData.attachmentFile=ret.data.fileName;
        vm.submitData.attachmentUrl=ret.data.fileUrl;
      } else {
        layer.alert("上传文件出错", { closeBtn: 0 });
      }
    });
  }
};
</script>
