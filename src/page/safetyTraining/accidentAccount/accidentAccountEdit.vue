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
              事故编码：
              <input type="number" class="input-text" v-model="submitData.sgbh"/>
              </span>
            <span>
              事故发生时间：
              <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" id="startDate">
              </span>
            <span>
              事故发生地点：
               <input type="text" class="input-text" v-model="submitData.sgfsdd"/>
              </span>
            <span>
              事故类别：
              <input type="text" class="input-text" v-model="submitData.sglb"/>
              </span>
            <span>
              事故性质：
              <input type="text" class="input-text" v-model="submitData.sgxz"/>
              </span>
            <span>
              事故负责人：
              <input type="text" class="input-text" v-model="submitData.sgfzr"/>
              </span>
            <span>
              事故经过：
              <input type="text" class="input-text" v-model="submitData.sgjg"/>
              </span>
            <span>
              事故损失及危害：
              <input type="text" class="input-text" v-model="submitData.sgss"/>
              </span>
            <span>
              防范措施：
              <input type="text" class="input-text" v-model="submitData.ffcs"/>
              </span>
            <span>
              会议时间：
              <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" id="endDate">
              </span>
            <span>
              会议地点：
              <input type="text" class="input-text" v-model="submitData.hydd"/>
              </span>
            <span>
              记录人：
              <input type="text" class="input-text" v-model="submitData.jlr"/>
              </span>
            <span>
              主持人：
              <input type="text" class="input-text" v-model="submitData.zcr"/>
              </span>
            <span>
              参会人员：
              <input type="text" class="input-text" v-model="submitData.chry"/>
              </span>
            <span>
              事故主要负责人：
              <input type="text" class="input-text" v-model="submitData.zyfzr"/>
              </span>
            <span>
              事故次要负责人：
              <input type="text" class="input-text" v-model="submitData.cyfzr"/>
              </span>
            <span>
              事故原因分析：
              <input type="text" class="input-text" v-model="submitData.sgyy"/>
              </span>
            <span>
              处理意见：
              <input type="text" class="input-text" v-model="submitData.clyj"/>
              </span>
            <span>
              备注：
              <input type="text" class="input-text" v-model="submitData.bz"/>
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
</style>

<script>
  import {accidentAdd,accidentDetail,accidentEdit} from "../../../api/safetyTraining/accidentAccount";

  export default {
    name: "accidentAccountEdit",
    data() {
      return {
        postData:{
          id:this.$route.query.id,
        },
        submitData: {
          id:'',
          sgbh:'',
          sgfssj:'',
          sgfsdd:'',
          sglb:'',
          sgxz:'',
          sgfzr:'',
          sgjg:'',
          sgss:'',
          ffcs:'',
          hysj:'',
          hydd:'',
          jlr:'',
          zcr:'',
          chry:'',
          zyfzr:'',
          cyfzr:'',
          sgyy:'',
          clyj:'',
          sfsc:0,
          bz:''
        },
        detailData:''
      };
    },
    methods: {
      getDetail: function() {
        var vm = this;
        layer.load(2);
        accidentDetail(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.detailData=ret.data.detail;
              vm.submitData.id=vm.detailData.id;
              vm.submitData.sgbh=vm.detailData.sgbh;
              $('#startDate').val(vm.detailData.sgfssj);
              vm.submitData.sgfsdd=vm.detailData.sgfsdd;
              vm.submitData.sglb=vm.detailData.sglb;
              vm.submitData.sgxz=vm.detailData.sgxz;
              vm.submitData.sgfzr=vm.detailData.sgfzr;
              vm.submitData.sgjg=vm.detailData.sgjg;
              vm.submitData.sgss=vm.detailData.sgss;
              vm.submitData.ffcs=vm.detailData.ffcs;
              $('#endDate').val(vm.detailData.hysj);
              vm.submitData.hydd=vm.detailData.hydd;
              vm.submitData.jlr=vm.detailData.jlr;
              vm.submitData.zcr=vm.detailData.zcr;
              vm.submitData.chry=vm.detailData.chry;
              vm.submitData.zyfzr=vm.detailData.zyfzr;
              vm.submitData.cyfzr=vm.detailData.cyfzr;
              vm.submitData.sgyy=vm.detailData.sgyy;
              vm.submitData.clyj=vm.detailData.clyj;
              vm.submitData.zcr=vm.detailData.zcr;
              vm.submitData.bz=vm.detailData.bz;
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
        vm.submitData.sgfssj= $('#startDate').val();
        vm.submitData.hysj=$('#endDate').val();
        if (vm.submitData.sgbh == "") {
          layer.msg("请填写事故编码！");
          return;
        }
        if (vm.submitData.sgfssj == "") {
          layer.msg("请填写事故发生时间！");
          return;
        }
        if (vm.submitData.sgfsdd == "") {
          layer.msg("请填写事故发生地点！");
          return;
        }
        if (vm.submitData.sglb == "") {
          layer.msg("请填写事故类别！");
          return;
        }
        if (vm.submitData.sgxz == "") {
          layer.msg("请填写事故性质！");
          return;
        }
        if (vm.submitData.sgfzr == "") {
          layer.msg("请填写事故负责人！");
          return;
        }
        if (vm.submitData.sgjg == "") {
          layer.msg("请填写事故经过！");
          return;
        }
        if (vm.submitData.sgss == "") {
          layer.msg("请填写事故损失及危害！");
          return;
        }
        if (vm.submitData.ffcs == "") {
          layer.msg("请填写防范措施！");
          return;
        }
        if (vm.submitData.hysj == "") {
          layer.msg("请填写会议时间！");
          return;
        }
        if (vm.submitData.hydd == "") {
          layer.msg("请填写会议地点！");
          return;
        }
        if (vm.submitData.jlr == "") {
          layer.msg("请填写记录人！");
          return;
        }
        if (vm.submitData.zcr == "") {
          layer.msg("请填写主持人！");
          return;
        }
        if (vm.submitData.chry == "") {
          layer.msg("请填写参会人员！");
          return;
        }
        if (vm.submitData.zyfzr == "") {
          layer.msg("请填写事故主要负责人！");
          return;
        }
        if (vm.submitData.cyfzr == "") {
          layer.msg("请填写事故次要负责人！");
          return;
        }
        if (vm.submitData.sgyy == "") {
          layer.msg("请填写事故原因分析！");
          return;
        }
        if (vm.submitData.clyj == "") {
          layer.msg("请填写处理意见！");
          return;
        }
        if (vm.submitData.bz == "") {
          layer.msg("请填写备注！");
          return;
        }
        if (this.$route.query.id) {
          layer.load(2);
          accidentEdit(vm.submitData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("修改成功！");
                this.$router.push({
                  name: "accidentAccount",
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
          accidentAdd(vm.submitData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                // console.log(JSON.stringify(ret))
                layer.msg("新增成功！");
                this.$router.push({
                  name: "accidentAccount",
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
          name: "accidentAccount",
        });
      }
    },
    mounted() {
      if (this.$route.query.id) {
        this.getDetail();
      }
    }
  };
</script>

