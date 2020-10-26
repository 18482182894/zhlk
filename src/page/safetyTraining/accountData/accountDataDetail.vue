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
                会议编码：
                <label v-text="detailData.hybh"></label>
              </span>
              <span>
                会议时间：
                <label v-text="detailData.hysj"></label>
              </span>
              <span>
                会议地点：
                <label v-text="detailData.hydd"></label>
              </span>
              <span>
                库区编号：
                <label v-text="detailData.kqbh"></label>
              </span>
              <span>
                参会部门：
                <label v-text="detailData.chbm"></label>
              </span>
              <span>
                主持人：
                <label v-text="detailData.zcr"></label>
              </span>
              <span>
                记录人：
                <label v-text="detailData.jlr"></label>
              </span>
              <span>
                参加人员：
                <label v-text="detailData.cjry"></label>
              </span>
              <span>
                会议主题：
                <label v-text="detailData.hyzt"></label>
              </span>
              <span>
                会议主要内容:
                <label v-text="detailData.hyzynr"></label>
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
import { getAccountDataDetail } from '../../../api/safetyTraining/accountData'
export default {
  name: 'accountDataDetail',
  data () {
    return {
      postData: {
        hybh: this.$route.query.hybh,
      },
      detailData: ''
    }
  },
  methods: {
    getDetail: function() {
      layer.load(2)
      getAccountDataDetail(this.postData)
        .then(ret => {
          layer.closeAll("loading")
          if (ret.code == 200) {
            this.detailData = ret.data.sfSafetyInfo
            parseInt(this.detailData.sfsc) ? this.detailData.sfsc = '是' : this.detailData.sfsc = '否'
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
        name: "accountData",
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