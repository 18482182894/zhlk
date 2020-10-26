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
                                记录编号：
                                <label v-if="step==7||step==8" v-text="detailData.registerNo"></label>
                                <label v-else v-text="detailData.registorNo"></label>
                            </span>
                            <span>
                                出入库类型：
                                <label v-text="detailData.noticeType==1?'入库':'出库'"></label>
                            </span>
                            <span>
                                出入库通知单：
                                <label v-text="detailData.billId"></label>
                            </span>
                            <span>
                                当前环节：
                                <label v-if="step==7||step==8" v-text="detailData.step"></label>
                                <label v-else v-text="detailData.businessStep"></label>
                            </span>
                            <span>
                                车牌号：
                                <label v-text="detailData.plateNumber"></label>
                            </span>
                            <!-- <span>
                                出入库单：
                                <label v-text="detailData.grainPrice"></label>
                            </span> -->
                            <span>
                                 操作人姓名：
                                <label v-if="step==7||step==8" v-text="detailData.opUser"></label>
                                <label v-else v-text="detailData.operator"></label>
                            </span>
                            <span>
                                操作时间：
                                <label v-if="step!=1&&step!=2" v-text="detailData.startDatetime"></label>
                                <label v-else v-text="detailData.registorDate"></label>
                            </span>
                            <span>
                                客户：
                                <label v-text="detailData.customerName"></label>
                            </span>
                            <span>
                                录像开始时间：
                                <label v-text="detailData.startDatetime"></label>
                            </span>
                            <span>
                                录像结束时间：
                                <label v-text="detailData.endDatetime"></label>
                            </span>
                            <span style="width:50%;">
                                 录像地址：
                                <label v-text="detailData.videoFile" style="word-break: break-all;"></label>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">视频</div>
                </div>
                <div class="tag-box-content">
                    <div class="upload-pic" style="width:420px;height:280px;border:0;" >
                        <video :src="detailData.videoFile" style="width:420px;height:280px;" controls="controls"></video>
                    </div>
                </div>
            </div>
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">视频部分截图</div>
                </div>
                <div class="tag-box-content">
                    <div class="upload-pic">
                        <img :src="detailData.ImgUrl" alt="">
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
import {registerListDetail , samplingListDetail , checkoutListDetail, grossWeightDetail, valueBinGuideList, tareWeightDetail, processReimbursementDetail, processPinCardDetail } from "../../../api/intelligentStorage/public";

export default {
    name: "documentDetail",
    data() {
        return {
            step:this.$route.query.step,
            postData: {
                registorNo: this.$route.query.id
            },
            postData1: {
                registerNo: this.$route.query.id,
                cardNo:this.$route.query.cardNo
            },
            registorNo:"",
            detailData: ""
        };
    },
    methods: {
        getDetail: function() {
            var vm = this;
            layer.load(2);
            switch(vm.step){
                case 1:
                    registerListDetail(vm.postData).then(ret => {
                        layer.closeAll("loading");
                        if (ret.code == 200) {
                            vm.detailData = ret.data.dataMap;
                        } else {
                            layer.alert(ret.data, { closeBtn: 0 });
                        }
                    })
                    .catch(err => {
                        layer.alert(err.data, { closeBtn: 0 });
                    });
                    break;
                case 2:
                    samplingListDetail(vm.postData).then(ret => {
                        layer.closeAll("loading");
                        if (ret.code == 200) {
                            vm.detailData = ret.data.dataMap;
                        } else {
                            layer.alert(ret.data, { closeBtn: 0 });
                        }
                    })
                    .catch(err => {
                        layer.alert(err.data, { closeBtn: 0 });
                    });
                    break;
                case 3:
                    checkoutListDetail(vm.postData).then(ret => {
                        layer.closeAll("loading");
                        if (ret.code == 200) {
                            vm.detailData = ret.data.dataMap;
                        } else {
                            layer.alert(ret.data, { closeBtn: 0 });
                        }
                    })
                    .catch(err => {
                        layer.alert(err.data, { closeBtn: 0 });
                    });
                    break;
                case 4:
                    grossWeightDetail(vm.postData).then(ret => {
                        layer.closeAll("loading");
                        if (ret.code == 200) {
                            vm.detailData = ret.data.operationProcessDetail;
                        } else {
                            layer.alert(ret.data, { closeBtn: 0 });
                        }
                    })
                    .catch(err => {
                        layer.alert(err.data, { closeBtn: 0 });
                    });
                    break;
                case 5:
                    valueBinGuideList(vm.postData).then(ret => {
                        layer.closeAll("loading");
                        if (ret.code == 200) {
                            vm.detailData = ret.data.operationProcessDetail;
                        } else {
                            layer.alert(ret.data, { closeBtn: 0 });
                        }
                    })
                    .catch(err => {
                        layer.alert(err.data, { closeBtn: 0 });
                    });
                    break;
                case 6:
                    tareWeightDetail(vm.postData).then(ret => {
                        layer.closeAll("loading");
                        if (ret.code == 200) {
                            vm.detailData = ret.data.operationProcessDetail;
                        } else {
                            layer.alert(ret.data, { closeBtn: 0 });
                        }
                    })
                    .catch(err => {
                        layer.alert(err.data, { closeBtn: 0 });
                    });
                    break;
                case 7:
                    processReimbursementDetail(vm.postData1).then(ret => {
                        layer.closeAll("loading");
                        if (ret.code == 200) {
                            vm.detailData = ret.data.detail;
                        } else {
                            layer.alert(ret.data, { closeBtn: 0 });
                        }
                    })
                    .catch(err => {
                        layer.alert(err.data, { closeBtn: 0 });
                    });
                    break;
                case 8:
                    processPinCardDetail(vm.postData1).then(ret => {
                        layer.closeAll("loading");
                        if (ret.code == 200) {
                            vm.detailData = ret.data.detail;
                        } else {
                            layer.alert(ret.data, { closeBtn: 0 });
                        }
                    })
                    .catch(err => {
                        layer.alert(err.data, { closeBtn: 0 });
                    });
                    break;
            }
            // console.log(JSON.stringify(vm.detailData))
        },

        detailBack:function () {
          var vm = this;
          this.$router.push({
            name: "guidance",
            query: {
                stepNumber:vm.step
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
