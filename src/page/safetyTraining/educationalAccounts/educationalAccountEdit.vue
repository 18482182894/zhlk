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
                <label>安全培训教育编码：</label>
                <input type="text" class="input-text" v-model="submitData.aqpxjybh"/>
              </span>
              <span>
                <label>授课日期：</label>
                <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})"  id="rq"/>
              </span>
              <span>
                <label>授课总时数：</label>
                <input type="text" class="input-text" v-model="submitData.skzss"/>
              </span>
              <span>
                <label>安全教育内容：</label>
                <input type="text" class="input-text" v-model="submitData.aqjynr"/>
              </span>
              <span>
                <label>库区编号：</label>
                <input type="text" class="input-text" v-model="submitData.kqbh"/>
              </span>
              <span>
                <label>授课人姓名：</label>
                <input type="text" class="input-text" v-model="submitData.skrxm"/>
              </span>
              <span>
                <label>参加人姓名：</label>
                <input type="text" class="input-text" v-model="submitData.xm"/>
              </span>
              <span>
                <label>性别：</label>
                <select v-model="submitData.xb" class="select-style">
                  <option value="1">男</option>
                  <option value="2">女</option>
                </select>
              </span>
              <span>
                <label>出生年月：</label>
                <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})"  id="csny"/>
              </span>
              <span>
                <label>工作年限：</label>
                <input type="text" class="input-text" v-model="submitData.gznx"/>
              </span>
              <span>
                <label>证件名称：</label>
                <input type="text" class="input-text" v-model="submitData.zjmc"/>
              </span>
              <span>
                <label>证件号码：</label>
                <input type="text" class="input-text" v-model="submitData.zjhm"/>
              </span> 
              <span>
                <label>现任岗位：</label>
                <input type="text" class="input-text" v-model="submitData.xrgw"/>
              </span>
              <span>
                <label>从事本岗位年限：</label>
                <input type="text" class="input-text" v-model="submitData.csbgwnx"/>
              </span>
              <span>
                <label>培训时间：</label>
                <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})"  id="pxsj"/>
              </span>
              <span>
                <label>复审时间：</label>
                <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})"  id="fssj"/>
              </span>
              <span>
                <label>考核成绩：</label>
                <input type="text" class="input-text" v-model="submitData.khcj"/>
              </span>
              <span>
                <label>发证单位：</label>
                <input type="text" class="input-text" v-model="submitData.fzdw"/>
              </span>
              <span>
                <label>发证时间：</label>
                <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})"  id="fzsj"/>
              </span>
              <span>
                <label>备注：</label>
                <input type="text" class="input-text" v-model="submitData.bz"/>
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
  addEducationalAccount,
  editEducationalAccount,
  getEducationalAccountDetail
 } from '../../../api/safetyTraining/educationalAccounts'
export default {
  name: 'educationalAccountEdit',
  data () {
    return {
      postData: {
        id: this.$route.query.id
      },
      submitData: {
        aqpxjybh: '',
        rq: '',
        skzss: '',
        aqjynr: '',
        kqbh: '',
        skrxm: '',
        xm: '',
        xb: '',
        csny: '',
        gznx: '',
        zjmc: '',
        zjhm: '',
        xrgw: '',
        csbgwnx: '',
        pxsj: '',
        fssj: '',
        khcj: '',
        fzdw: '',
        fzsj: '',
        bz: '',
        sfsc: 0,
        id: this.$route.query.id
      },
    }
  },
  methods: {
    getDetail: function() {
      layer.load(2)
      getEducationalAccountDetail(this.postData)
        .then(ret => {
          console.log(ret)
          layer.closeAll("loading")
          if (ret.code == 200) {
            this.submitData.aqpxjybh = ret.data.detail.aqpxjybh
            // 将yymmdd替换成yy-mm-dd
            $("#rq").val(ret.data.detail.rq.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3"))
            $("#pxsj").val(ret.data.detail.pxsj.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3"))
            $("#fssj").val(ret.data.detail.fssj.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3"))
            $("#fzsj").val(ret.data.detail.fzsj.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3"))
            $("#csny").val(ret.data.detail.csny.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3"))
            this.submitData.skzss = ret.data.detail.skzss
            this.submitData.aqjynr = ret.data.detail.aqjynr
            this.submitData.kqbh = ret.data.detail.kqbh
            this.submitData.skrxm = ret.data.detail.skrxm
            this.submitData.xm = ret.data.detail.xm
            this.submitData.xb = ret.data.detail.xb
            this.submitData.gznx = ret.data.detail.gznx
            this.submitData.zjmc = ret.data.detail.zjmc
            this.submitData.zjhm = ret.data.detail.zjhm
            this.submitData.xrgw = ret.data.detail.xrgw
            this.submitData.csbgwnx = ret.data.detail.csbgwnx
            this.submitData.khcj  = ret.data.detail.khcj
            this.submitData.fzdw = ret.data.detail.fzdw
            this.submitData.bz = ret.data.detail.bz
            this.submitData.sfsc = ret.data.detail.sfsc
          } else {
            layer.alert(ret.data, { closeBtn: 0 })
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        })
    },
    submitEvent: function() {
      // 将yy-mm-dd替换为yymmdd
      this.submitData.rq =  $("#rq").val().replace(/[^0-9]/gi, "")
      this.submitData.pxsj =  $("#pxsj").val().replace(/[^0-9]/gi, "")
      this.submitData.fssj =  $("#fssj").val().replace(/[^0-9]/gi, "")
      this.submitData.fzsj =  $("#fzsj").val().replace(/[^0-9]/gi, "")
      this.submitData.csny =  $("#csny").val().replace(/[^0-9]/gi, "")
      const pageNo=this.$route.query.pageNo ?  this.$route.query.pageNo : 0
     if(this.submitData.aqpxjybh == "") {
       layer.msg("请填写安全培训教育编码");
       return;
     }
     if(this.submitData.rq == "") {
       layer.msg("请填写授课日期");
       return;
     }
     if(this.submitData.skzss == "") {
       layer.msg("请填写授课总时数");
       return;
     }
     if(this.submitData.aqjynr == "") {
       layer.msg("请填写安全教育内容");
       return;
     }
     if(this.submitData.kqbh == "") {
       layer.msg("请填写库区编号");
       return;
     }
     if(this.submitData.skrxm == "") {
       layer.msg("请填写授课人姓名");
       return;
     }
     if(this.submitData.xm == "") {
       layer.msg("请填写参加人姓名");
       return;
     }
     if(this.submitData.xb === "") {
       layer.msg("请填写性别 ");
       return;
     }
     if(this.submitData.csny === "") {
       layer.msg("请填写出生年月");
       return;
     }
     if(this.submitData.gznx === "") {
       layer.msg("请填写工作年限");
       return;
     }
     if(this.submitData.zjmc === "") {
       layer.msg("请填写证件名称");
       return;
     }
     if(this.submitData.zjhm === "") {
       layer.msg("请填写证件号码");
       return;
     }
     if(this.submitData.xrgw === "") {
       layer.msg("请填写现任岗位");
       return;
     }
     if(this.submitData.csbgwnx === "") {
       layer.msg("请填写从事本岗位年限");
       return;
     }
     if(this.submitData.pxsj === "") {
       layer.msg("请填写培训时间");
       return;
     }
     if(this.submitData.fssj === "") {
       layer.msg("请填写复审时间");
       return;
     }
     if(this.submitData.khcj === "") {
       layer.msg("请填写考核成绩");
       return;
     }
     if(this.submitData.fzdw === "") {
       layer.msg("请填写发证单位");
       return;
     }
     if(this.submitData.fzsj === "") {
       layer.msg("请填写发证时间");
       return;
     }
     if(this.submitData.bz === "") {
       layer.msg("请填写备注");
       return;
     }
     if(this.submitData.sfsc === "") {
       layer.msg("请填写是否删除");
       return;
     }

     if(this.$route.query.id) {
       layer.load(2);
       editEducationalAccount(this.submitData)
         .then(ret => {
           layer.closeAll("loading")
           if(ret.code == 200) {
             layer.msg("编辑安全培训教育台账成功！")
             this.$router.push({
               name: "educationalAccounts",
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
          addEducationalAccount(this.submitData)
            .then(ret => {
              layer.closeAll("loading")
              if (ret.code == 200) {
                layer.msg("新增安全培训教育台账成功！")
                this.$router.push({
                  name: "educationalAccounts",
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
          name: 'educationalAccounts',
          query: {
            pageNo: pageNo
          }
        })
      }  
  },
  mounted () {
    if (this.$route.query.id) {
      this.getDetail()
    }
  }
}
</script>  
