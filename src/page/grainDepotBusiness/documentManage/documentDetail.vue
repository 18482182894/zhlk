<template>
    <div class="content">
        <div class="menuManage roleManage">
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">基础信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail">
                        <div>
                            <span>
                                来文号：
                                <label v-text="detailData.documentId"></label>
                            </span>
                            <span>
                                文件编号：
                                <label v-text="detailData.fileId"></label>
                            </span>
                            <span>
                                文件名称：
                                <label v-text="detailData.fileName"></label>
                            </span>
                            <span>
                                发文日期：
                                <label v-text="detailData.releaseDate"></label>
                            </span>
                            <span>
                                类型：
                                <label v-text="detailData.type"></label>
                            </span>
                            <span>
                              备注：
                              <label v-text="detailData.remarks"></label>
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
                    <div class="userManage-detail">
                        <div>
                            <span>
                                计划名称：
                                <label v-text="detailData.planName"></label>
                            </span>
                            <span>
                                计划类型：
                                <label v-if="detailData.executeType==1">收储计划</label>
                                <label v-if="detailData.executeType==2">销售计划</label>
                                <label v-if="detailData.executeType==3">轮换计划</label>
                            </span>
                            <span>
                                粮食品种：
                                <label v-text="detailData.grainKind"></label>
                            </span>
                            <span>
                                粮食性质：
                                <label v-text="detailData.grainAttribute"></label>
                            </span>
                            <span>
                                粮食等级：
                                <label v-text="detailData.grainOilLevel"></label>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">附件</div>
                </div>
                <div class="tag-box-content">
                    <div class="upload-pic">
                        <img :src="detailData.picture" alt="">
                    </div>
                </div>
            </div>
            <div class="detail-back">
                <button @click="detailBack();">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
import { getDocRevice } from "@/api/business/docRevices";
import {
    grainDetail
} from '@/api/systemManage/basicData/grainVarieties'
export default {
  name: "documentDetail",
  data() {
    return {
      postData: {
        documentId: this.$route.query.id,
        fileName: this.$route.query.fileName,
        document: this.$route.query.documentId
      },
      detailData: ""
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
            vm.detailData = ret.data.receivedDocument;
            const releaseDate = vm.detailData.releaseDate.slice(0,10);
            vm.detailData.releaseDate = releaseDate;
             grainDetail({grainVarietyId:ret.data.receivedDocument.grainKind}).then(ret=>{
                  layer.closeAll('loading');
                  if (ret.code==200) {
                      vm.detailData.grainKind=ret.data.grainVariety.grainVarietyName;
                  }else{
                      layer.alert(err.message, { closeBtn: 0 });
                  }

              }).catch(err=>{
                  layer.alert(err.message, { closeBtn: 0 });
              });
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    detailBack:function (documentId,fileName,pageNo) {
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
    vm.getDetail();
  }
};
</script>
