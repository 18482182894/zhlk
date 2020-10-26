<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">基础信息新增和编辑</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-edit userManage-detail">
            <span>
              检查编码：<u id="one">检查编码是唯一的不能修改！</u>
              <input type="number" class="input-text" v-model="submitData.jcbh"/>
              </span>
            <span>
              受查单位：
              <input type="text" class="input-text" v-model="submitData.scdw"/>
              </span>
            <span>
              受查日期：
               <input type="text" class="input-text Wdate" onclick="WdatePicker({})" id="startDate">
              </span>
            <span>
              存在问题：
              <input type="text" class="input-text" v-model="submitData.czwt"/>
              </span>
            <span>
              检查人：
              <input type="text" class="input-text" v-model="submitData.jcr"/>
              </span>
            <span>
              整改负责人：
              <input type="text" class="input-text" v-model="submitData.zgfzr"/>
              </span>
            <span>
              检查处理意见：
              <input type="text" class="input-text" v-model="submitData.jcclyj"/>
              </span>
            <span>
              受查单位意见：
              <input type="text" class="input-text" v-model="submitData.scdwyj"/>
              </span>
            <span>
              通知单号：
              <input type="number" class="input-text" v-model="submitData.tzdh"/>
              </span>
            <span>
              整改内容：
              <input type="text" class="input-text" v-model="submitData.zgnr"/>
              </span>
            <span>
              整改措施：
              <input type="text" class="input-text" v-model="submitData.zgcs"/>
              </span>
            <span>
              验收结果：
              <input type="text" class="input-text" v-model="submitData.ysjg"/>
              </span>
            <span>
              验收人：
              <input type="text" class="input-text" v-model="submitData.ysr"/>
              </span>
            <span>
              班组负责人：
              <input type="text" class="input-text" v-model="submitData.bzfzr"/>
              </span>
            <span>
              填表日期：
              <input type="text" class="input-text Wdate" onclick="WdatePicker({})" id="endDate">
              </span>
          </div>
        </div>
      </div>
      <div class="edit-btn" style="margin-bottom: 20px;">
        <button class="edit-submit" @click="submitEvent();">提交</button>
        <button class="edit-back" @click="detailBack();">返回</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .userManage-detail >span{
    font-size: 14px;
    color: #4A4A4A;
    display: inline-block;
    vertical-align: middle;
    width: 24%;
    min-width: 20%;
    padding: 15px 10px 15px 0;
    box-sizing: border-box;
  }
  .userManage-edit >span .input-text{
    display: block;
    width: 92%;
  }
  #one{
    font-size: 12px;
    color: #ff0000;
    display: none;
  }
</style>

<script>
  import {rectificationAdd,rectificationEdit,rectificationDetail} from "../../../api/safetyTraining/rectificationAccounts";

  export default {
    name: "rectificationAccountsEdit",
    data() {
      return {
        postData:{
          jcbh:this.$route.query.jcbh,
        },
        submitData: {
          jcbh:'',
          scdw:'',
          scrq:'',
          czwt:'',
          jcr:'',
          zgfzr:'',
          jcclyj:'',
          scdwyj:'',
          tzdh:'',
          zgnr:'',
          zgcs:'',
          ysjg:'',
          ysr:'',
          bzfzr:'',
          tbrq:''
        },
        detailData:''
      };
    },
    methods: {
      getDetail: function() {
        var vm = this;
        layer.load(2);
        rectificationDetail(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.detailData=ret.data.safetyAbarbeitung;
              vm.submitData.jcbh=vm.detailData.jcbh;
              vm.submitData.scdw=vm.detailData.scdw;
              vm.detailData.scrq=vm.detailData.scrq.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3");
              $('#startDate').val(vm.detailData.scrq);
              //vm.submitData.scrq=vm.detailData.scrq;
              vm.submitData.czwt=vm.detailData.czwt;
              vm.submitData.jcr=vm.detailData.jcr;
              vm.submitData.zgfzr=vm.detailData.zgfzr;
              vm.submitData.jcclyj=vm.detailData.jcclyj;
              vm.submitData.scdwyj=vm.detailData.scdwyj;
              vm.submitData.tzdh=vm.detailData.tzdh;
              vm.submitData.zgnr=vm.detailData.zgnr;
              vm.submitData.zgcs=vm.detailData.zgcs;
              vm.submitData.ysjg=vm.detailData.ysjg;
              vm.submitData.ysr=vm.detailData.ysr;
              vm.submitData.bzfzr=vm.detailData.bzfzr;
              vm.detailData.tbrq=vm.detailData.tbrq.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3");
              $('#endDate').val(vm.detailData.tbrq);
              //vm.submitData.tbrq=vm.detailData.tbrq;
              //console.log(vm.detailData);
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      },
      submitEvent:function () {
        var vm=this;
        /*var year=$('#startDate').val().split('-')[0];
        var month=$('#startDate').val().split('-')[1];
        var day=$('#startDate').val().split('-')[2];
        var endYear=$('#endDate').val().split('-')[0];
        var endMonth=$('#endDate').val().split('-')[1];
        var endDy=$('#endDate').val().split('-')[2];*/
        vm.submitData.scrq=$('#startDate').val().replace(/[^0-9]/gi, "");
        vm.submitData.tbrq=$('#endDate').val().replace(/[^0-9]/gi, "");
        //console.log(vm.submitData.scrq);
        if (vm.submitData.jcbh == "") {
          layer.msg("请填写检查编码！");
          return;
        }
        if (vm.submitData.scdw == "") {
          layer.msg("请填写受查单位！");
          return;
        }
        if (vm.submitData.scrq == "") {
          layer.msg("请填写受查日期！");
          return;
        }
        if (vm.submitData.czwt == "") {
          layer.msg("请填写存在问题！");
          return;
        }
        if (vm.submitData.jcr == "") {
          layer.msg("请填写检查人！");
          return;
        }
        if (vm.submitData.zgfzr == "") {
          layer.msg("请填写整改负责人！");
          return;
        }
        if (vm.submitData.jcclyj == "") {
          layer.msg("请填写检查处理意见！");
          return;
        }
        if (vm.submitData.scdwyj == "") {
          layer.msg("请填写受查单位意见！");
          return;
        }
        if (vm.submitData.tzdh == "") {
          layer.msg("请填写通知单号！");
          return;
        }
        if (vm.submitData.zgnr == "") {
          layer.msg("请填写整改内容！");
          return;
        }
        if (vm.submitData.zgcs == "") {
          layer.msg("请填写整改措施！");
          return;
        }
        if (vm.submitData.ysjg == "") {
          layer.msg("请填写验收结果！");
          return;
        }
        if (vm.submitData.ysr == "") {
          layer.msg("请填写验收人！");
          return;
        }
        if (vm.submitData.bzfzr == "") {
          layer.msg("请填写班组负责人！");
          return;
        }
        if (vm.submitData.tbrq == "") {
          layer.msg("请填写填表日期！");
          return;
        }

        if (this.$route.query.jcbh) {
          layer.load(2);
          rectificationEdit(vm.submitData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("修改成功！");
                this.$router.push({
                  name: "rectificationAccounts",
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
          // console.log(JSON.stringify(vm.submitData))
          rectificationAdd(vm.submitData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                // console.log(JSON.stringify(ret))
                layer.msg("新增成功！");
                this.$router.push({
                  name: "rectificationAccounts",
                });

              } else {
                layer.alert(ret.data, {closeBtn: 0});
              }
            })
            .catch(err => {
              layer.alert(err.message, {closeBtn: 0});
            });
        }
      },
      detailBack:function () {
        this.$router.push({
          name: "rectificationAccounts",
        });
      }
    },
    mounted() {
      if (this.$route.query.jcbh) {
        this.getDetail();
        $('#one').show();
      }

    }
  };
</script>

