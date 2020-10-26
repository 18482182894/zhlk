<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">基础信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail">
            <!--<img src="../../../../static/images/user.png" alt="">-->
            <div>
              <span>
                安全培训教育编码：
                <label v-text="detailData.aqpxjybh"></label>
              </span>
              <span>
                授课日期：
                <label v-text="detailData.rq"></label>
              </span>
              <span>
                授课总时数：
                <label v-text="detailData.skzss"></label>
              </span>
              <span>
                安全教育内容：
                <label v-text="detailData.aqjynr"></label>
              </span>
              <span>
                库区编号：
                <label v-text="detailData.kqbh"></label>
              </span>
              <span>
                授课人姓名：
                <label v-text="detailData.skrxm"></label>
              </span>
              <span>
                参加人姓名：
                <label v-text="detailData.xm"></label>
              </span>
              <span>
                性别：
                <label v-text="detailData.xb"></label>
              </span>
              <span>
                出生年月：
                <label v-text="detailData.csny"></label>
              </span>
              <span>
                工作年限：
                <label v-text="detailData.gznx"></label>
              </span>
              <span>
                证件名称：
                <label v-text="detailData.zjmc"></label>
              </span>
              <span>
                证件号码：
                <label v-text="detailData.zjhm"></label>
              </span>
              <span>
                现任岗位：
                <label v-text="detailData.xrgw"></label>
              </span>
              <span>
                从事本岗位年限：
                <label v-text="detailData.csbgwnx"></label>
              </span>
              <span>
                培训时间：
                <label v-text="detailData.pxsj"></label>
              </span>
              <span>
                复审时间：
                <label v-text="detailData.fssj"></label>
              </span>
              <span>
                考核成绩：
                <label v-text="detailData.fssj"></label>
              </span>
              <span>
                发证单位：
                <label v-text="detailData.fzdw"></label>
              </span>
              <span>
                发证时间：
                <label v-text="detailData.fzsj"></label>
              </span>
              <span>
                备注：
                <label v-text="detailData.bz"></label>
              </span>
              <span>
                是否删除：
                <label v-text="detailData.sfsc"></label>
              </span>
            </div>
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
import { getEducationalAccountDetail } from '../../../api/safetyTraining/educationalAccounts'
export default {
  name: 'educationalAccountDetail',
  data () {
    return {
      postData: {
        id: this.$route.query.id,
      },
      detailData: ''
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
            this.detailData = ret.data.detail
            parseInt(this.detailData.sfsc) ? this.detailData.sfsc = '是' : this.detailData.sfsc = '否'
            if(this.detailData.xb == 1) {
              this.detailData.xb = '男'
            } else if(this.detailData.xb == 2) {
                this.detailData.xb = '女'
            }  
          } else {
            layer.alert(ret.data, { closeBtn: 0 })
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 })
        })
    },
    detailBack: function () {
      let pageNo=this.$route.query.pageNo;
      this.$router.push({
        name: "educationalAccounts",
        query: {
          pageNo:pageNo
        }
      });
    }
  },
  mounted () {
    this.getDetail()
  }
}
</script>