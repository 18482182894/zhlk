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
              检查时间：
               <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" id="startDate">
              </span>
            <span>
              检查类型：
              <input type="text" class="input-text" v-model="submitData.jclx"/>
              </span>
            <span>
              组织检查人：
              <input type="text" class="input-text" v-model="submitData.zzjcr"/>
              </span>
            <span>
              记录人：
              <input type="text" class="input-text" v-model="submitData.jlr"/>
              </span>
            <span>
              受查单位或部门：
              <input type="text" class="input-text" v-model="submitData.scdwhbm"/>
              </span>
            <span>
              参加人员：
              <input type="text" class="input-text" v-model="submitData.cjry"/>
              </span>
            <span>
              检查情况及存在问题：
              <input type="text" class="input-text" v-model="submitData.jcqkjczwt"/>
              </span>
            <span>
              处理措施及意见：
              <input type="text" class="input-text" v-model="submitData.clcsjyj"/>
              </span>
            <span>
              被查单位负责人：
              <input type="text" class="input-text" v-model="submitData.bjcdwfzr"/>
              </span>
            <span>
              检查负责人：
              <input type="text" class="input-text" v-model="submitData.jcdwfzr"/>
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
  import {checkAdd,checkDetail,checkEdit} from "../../../api/safetyTraining/checklistAccount";

  export default {
    name: "checklistAccountEdit",
    data() {
      return {
        postData:{
          jcbh:this.$route.query.jcbh,
        },
        submitData: {
          jcbh:'',
          jcsj:'',
          jclx:'',
          zzjcr:'',
          jlr:'',
          scdwhbm:'',
          cjry:'',
          jcqkjczwt:'',
          clcsjyj:'',
          bjcdwfzr:'',
          jcdwfzr:'',
        },
        detailData:''
      };
    },
    methods: {
      getDetail: function() {
        var vm = this;
        layer.load(2);
        checkDetail(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.detailData=ret.data.safetyCheck;
              vm.submitData.jcbh=vm.detailData.jcbh;
              $('#startDate').val(vm.detailData.jcsj);
              vm.submitData.jclx=vm.detailData.jclx;
              vm.submitData.zzjcr=vm.detailData.zzjcr;
              vm.submitData.jlr=vm.detailData.jlr;
              vm.submitData.scdwhbm=vm.detailData.scdwhbm;
              vm.submitData.cjry=vm.detailData.cjry;
              vm.submitData.jcqkjczwt=vm.detailData.jcqkjczwt;
              vm.submitData.clcsjyj=vm.detailData.clcsjyj;
              vm.submitData.bjcdwfzr=vm.detailData.bjcdwfzr;
              vm.submitData.jcdwfzr=vm.detailData.jcdwfzr;
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
        vm.submitData.jcsj= $('#startDate').val();
        //console.log(vm.submitData.scrq);
        if (vm.submitData.jcbh == "") {
          layer.msg("请填写检查编码！");
          return;
        }
        if (vm.submitData.jcsj == "") {
          layer.msg("请填写检查时间！");
          return;
        }
        if (vm.submitData.jclx == "") {
          layer.msg("请填写检查类型！");
          return;
        }
        if (vm.submitData.zzjcr == "") {
          layer.msg("请填写组织检查人！");
          return;
        }
        if (vm.submitData.jlr == "") {
          layer.msg("请填写记录人！");
          return;
        }
        if (vm.submitData.scdwhbm == "") {
          layer.msg("请填写受查单位或部门！");
          return;
        }
        if (vm.submitData.cjry == "") {
          layer.msg("请填写参加人员！");
          return;
        }
        if (vm.submitData.jcqkjczwt == "") {
          layer.msg("请填写检查情况及存在问题！");
          return;
        }
        if (vm.submitData.clcsjyj == "") {
          layer.msg("请填写处理措施及意见！");
          return;
        }
        if (vm.submitData.bjcdwfzr == "") {
          layer.msg("请填写被查单位负责人！");
          return;
        }
        if (vm.submitData.jcdwfzr == "") {
          layer.msg("请填写检查负责人！");
          return;
        }
        if (this.$route.query.jcbh) {
          layer.load(2);
          checkEdit(vm.submitData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("修改成功！");
                this.$router.push({
                  name: "checklistAccount",
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
          checkAdd(vm.submitData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                // console.log(JSON.stringify(ret))
                layer.msg("新增成功！");
                this.$router.push({
                  name: "checklistAccount",
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
          name: "checklistAccount",
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

