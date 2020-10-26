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
                <label>会议编码：</label>
                <input type="text" class="input-text" v-model="submitData.hybh" ref="hybh" disabled/>
              </span>
              <span>
                <label>会议时间：</label>
                <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"  id="hysj" ref="hysj" disabled/>
              </span>
              <span>
                <label>会议地点：</label>
                <input type="text" class="input-text" v-model="submitData.hydd"/>
              </span>
              <span>
                <label>库区编号：</label>
                <input type="text" class="input-text" v-model="submitData.kqbh"/>
              </span>
              <span>
                <label>参会部门：</label>
                <input type="text" class="input-text" v-model="submitData.chbm"/>
              </span>
              <span>
                <label>主持人：</label>
                <input type="text" class="input-text" v-model="submitData.zcr"/>
              </span>
              <span>
                <label>记录人：</label>
                <input type="text" class="input-text" v-model="submitData.jlr"/>
              </span>
              <span>
                <label>参加人员：</label>
                <input type="text" class="input-text" v-model="submitData.cjry"/>
              </span>
              <span>
                <label>会议主题：</label>
                <input type="text" class="input-text" v-model="submitData.hyzt"/>
              </span>
              <span>
                <label>会议主要内容：</label>
                <input type="text" class="input-text" v-model="submitData.hyzynr"/>
              </span> 
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="edit-btn">
      <button class="edit-submit" @click="submitEvent();">提交</button>
      <button class="edit-back" @click="detailBack();">返回</button>
    </div>
  </div>
</template>

<style scoped>

</style>

<script>
import { 
  addAccountData,
  editAccountData,
  getAccountDataDetail
 } from '../../../api/safetyTraining/accountData'
export default {
  name: 'accountDataEdit',
  data () {
    return {
      postData: {
        hybh: this.$route.query.hybh
      },
      submitData: {
        hybh: '',
        hysj: '',
        hydd: '',
        kqbh: '',
        chbm: '',
        zcr: '',
        jlr: '',
        cjry: '',
        hyzt: '',
        hyzynr: ''
      }
    }
  },
  methods: {
    getDetail: function() {
      layer.load(2)
      getAccountDataDetail(this.postData)
        .then(ret => {
          layer.closeAll("loading")
          if (ret.code == 200) {
            this.submitData.hybh = ret.data.sfSafetyInfo.hybh
            $("#hysj").val(ret.data.sfSafetyInfo.hysj)
            this.submitData.hydd = ret.data.sfSafetyInfo.hydd
            this.submitData.kqbh = ret.data.sfSafetyInfo.kqbh
            this.submitData.chbm = ret.data.sfSafetyInfo.chbm
            this.submitData.zcr = ret.data.sfSafetyInfo.zcr
            this.submitData.jlr  = ret.data.sfSafetyInfo.jlr
            this.submitData.cjry = ret.data.sfSafetyInfo.cjry
            this.submitData.hyzt = ret.data.sfSafetyInfo.hyzt
            this.submitData.hyzynr = ret.data.sfSafetyInfo.hyzynr
          } else {
            layer.alert(ret.data, { closeBtn: 0 })
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        })
    },
    submitEvent: function() {
     this.submitData.hysj =  $("#hysj").val();
     const pageNo=this.$route.query.pageNo ?  this.$route.query.pageNo : 0
     if(this.submitData.hybh == "") {
       layer.msg("请填写会议编码");
       return;
     }
     if(this.submitData.hysj == "") {
       layer.msg("请填写会议时间");
       return;
     }
     if(this.submitData.hydd == "") {
       layer.msg("请填写会议地点");
       return;
     }
     if(this.submitData.kqbh == "") {
       layer.msg("请填写库区编号");
       return;
     }
     if(this.submitData.zcr == "") {
       layer.msg("请填写主持人");
       return;
     }
     if(this.submitData.jlr == "") {
       layer.msg("请填写记录人");
       return;
     }
     if(this.submitData.cjry === "") {
       layer.msg("请填写参加人员");
       return;
     }
     if(this.submitData.hyzt === "") {
       layer.msg("请填写会议主题");
       return;
     }
     if(this.submitData.hyzynr === "") {
       layer.msg("请填写会议主要内容");
       return;
     }

     if(this.$route.query.hybh) {
       layer.load(2);
       editAccountData(this.submitData)
         .then(ret => {
           layer.closeAll("loading")
           if(ret.code == 200) {
             layer.msg("编辑安全会议台账成功！")
             this.$router.push({
               name: "accountData",
               query: {
                 pageNo:pageNo
               }
              })
            } else {
                layer.alert(ret.data, { closeBtn: 0 })
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 })
          });
      } else {
          layer.load(2);
          addAccountData(this.submitData)
            .then(ret => {
              layer.closeAll("loading")
              if (ret.code == 200) {
                layer.msg("新增安全会议台账成功！")
                this.$router.push({
                  name: "accountData",
                  query: {
                    pageNo:pageNo
                  }
                })
              } else {
                  layer.alert(ret.data, { closeBtn: 0 })
                }
            })
            .catch(err => {
              layer.alert(err.message, { closeBtn: 0 })
            })
          }
      },
      detailBack: function() {
        const pageNo=this.$route.query.pageNo ?  this.$route.query.pageNo : 0
        this.$router.push({
          name: 'accountData',
          query: {
            pageNo: pageNo
          }
        })
      }
  },
  mounted () {
    if (this.$route.query.hybh) {
      this.getDetail()
    } else {
      this.$refs.hybh.disabled = false
      this.$refs.hysj.disabled = false
    }
  } 
}
</script>