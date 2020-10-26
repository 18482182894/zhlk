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
                <label>文号：</label>
                <input type="text" class="input-text" v-model="submitData.wh"/>
              </span>
              <span>
                <label>文件标题：</label>
                <input type="text" class="input-text" v-model="submitData.wjbt"/>
              </span>
              <span>
                <label>页数：</label>
                <input type="text" class="input-text" v-model="submitData.ys"/>
              </span>
              <span>
                <label>库区编号：</label>
                <input type="text" class="input-text" v-model="submitData.kqbh" ref="kqbh" disabled/>
              </span>
              <span>
                <label>发文序号：</label>
                <input type="text" class="input-text" v-model="submitData.fwxh"/>
              </span>
              <span>
                <label>发文日期：</label>
                <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})"  id="fwrq"/>
              </span>
              <span>
                <label>发文机关：</label>
                <input type="text" class="input-text" v-model="submitData.fwjg"/>
              </span>
              <span>
                <label>来文机关：</label>
                <input type="text" class="input-text" v-model="submitData.lwjg"/>
              </span>
              <span>
                <label>收文序号：</label>
                <input type="text" class="input-text" v-model="submitData.swxh"/>
              </span>
              <span>
                <label>收文日期：</label>
                <input type="text" class="input-text Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})"  id="swrq"/>
              </span>
              <span>
                <label>处理情况：</label>
                <input type="text" class="input-text" v-model="submitData.clqk"/>
              </span>
              <span>
                <label>主送部门：</label>
                <input type="text" class="input-text" v-model="submitData.zsbm"/>
              </span>
              <span>
                <label>抄送部门：</label>
                <input type="text" class="input-text" v-model="submitData.csbm"/>
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
  addProductionAccount,
  editProductionAccount,
  getProductionAccountDetail
 } from '../../../api/safetyTraining/productionAccount'
export default {
  name: 'productionAccountEdit',
  data () {
    return {
      postData: {
        id: this.$route.query.id
      },
      submitData: {
        wh: '',
        wjbt: '',
        ys: '',
        kqbh: '',
        fwxh: '',
        fwrq: '',
        fwjg: '',
        lwjg: '',
        swxh: '',
        swrq: '',
        clqk: '',
        zsbm: '',
        csbm: '',
        id: this.$route.query.id
      }
    }
  },
  methods: {
    getDetail: function() {
      layer.load(2)
      getProductionAccountDetail(this.postData)
        .then(ret => {
          layer.closeAll("loading")
          if (ret.code == 200) {
            // 将yymmdd替换为yy-mm-dd
            const dispatchTime = ret.data.sfSafetyBook.fwrq.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3")
            const receiptTime = ret.data.sfSafetyBook.swrq.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3")
            this.submitData.wh = ret.data.sfSafetyBook.wh
            this.submitData.wjbt = ret.data.sfSafetyBook.wjbt
            this.submitData.ys = ret.data.sfSafetyBook.ys
            this.submitData.kqbh = ret.data.sfSafetyBook.kqbh
            this.submitData.fwxh = ret.data.sfSafetyBook.fwxh
            this.submitData.fwjg  = ret.data.sfSafetyBook.fwjg
            this.submitData.lwjg = ret.data.sfSafetyBook.lwjg
            $("#fwrq").val(dispatchTime)
            $("#swrq").val(receiptTime)
            this.submitData.swxh = ret.data.sfSafetyBook.swxh
            this.submitData.clqk = ret.data.sfSafetyBook.clqk
            this.submitData.zsbm = ret.data.sfSafetyBook.zsbm
            this.submitData.csbm = ret.data.sfSafetyBook.csbm
          } else {
            layer.alert(ret.data, { closeBtn: 0 })
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        })
    },
    submitEvent: function() {
     this.submitData.fwrq =  $("#fwrq").val();
     this.submitData.swrq =  $("#swrq").val();
     const pageNo=this.$route.query.pageNo ?  this.$route.query.pageNo : 0
     if(this.submitData.wh == "") {
       layer.msg("请填写文号");
       return;
     }
     if(this.submitData.wjbt == "") {
       layer.msg("请填写文件标题");
       return;
     }
     if(this.submitData.ys == "") {
       layer.msg("请填写页数");
       return;
     }
     if(this.submitData.kqbh == "") {
       layer.msg("请填写库区编号");
       return;
     }
     if(this.submitData.fwxh == "") {
       layer.msg("请填写发文序号");
       return;
     }
     if(this.submitData.fwrq == "") {
       layer.msg("请填写发文日期");
       return;
     }
     if(this.submitData.fwjg === "") {
       layer.msg("请填写发文机关");
       return;
     }
     if(this.submitData.lwjg === "") {
       layer.msg("请填写来文机关");
       return;
     }
     if(this.submitData.swxh === "") {
       layer.msg("请填写收文序号");
       return;
     }
     if(this.submitData.swrq === "") {
       layer.msg("请填写收文日期");
       return;
     }
     if(this.submitData.clqk === "") {
       layer.msg("请填写处理情况");
       return;
     }
     if(this.submitData.zsbm === "") {
       layer.msg("请填写主送部门");
       return;
     }
     if(this.submitData.csbm === "") {
       layer.msg("请填写抄送部门");
       return;
     }

     if(this.$route.query.id) {
       layer.load(2);
       editProductionAccount(this.submitData)
         .then(ret => {
           layer.closeAll("loading")
           if(ret.code == 200) {
             layer.msg("编辑安全生产台账成功！")
             this.$router.push({
               name: "productionAccount",
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
          addProductionAccount(this.submitData)
            .then(ret => {
              layer.closeAll("loading")
              if (ret.code == 200) {
                layer.msg("新增安全生产台账成功！")
                this.$router.push({
                  name: "productionAccount",
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
          name: 'productionAccount',
          query: {
            pageNo: pageNo
          }
        })
      }
  },
  mounted () {
    if (this.$route.query.id) {
      this.getDetail()
    } else {
      this.$refs.kqbh.disabled = false
    }
  } 
}
</script>