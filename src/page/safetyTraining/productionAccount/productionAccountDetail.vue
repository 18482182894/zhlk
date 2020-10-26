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
                文号：
                <label v-text="detailData.wh"></label>
              </span>
              <span>
                文件标题：
                <label v-text="detailData.wjbt"></label>
              </span>
              <span>
                页数：
                <label v-text="detailData.ys"></label>
              </span>
              <span>
                库区编号：
                <label v-text="detailData.kqbh"></label>
              </span>
              <span>
                发文序号：
                <label v-text="detailData.fwxh"></label>
              </span>
              <span>
                发文日期：
                <label v-text="detailData.fwrq"></label>
              </span>
              <span>
                发文机关：
                <label v-text="detailData.fwjg"></label>
              </span>
              <span>
                来文机关：
                <label v-text="detailData.lwjg"></label>
              </span>
              <span>
                收文序号:
                <label v-text="detailData.swxh"></label>
              </span>
              <span>
                收文日期：
                <label v-text="detailData.swrq"></label>
              </span>
              <span>
                处理情况：
                <label v-text="detailData.clqk"></label>
              </span>
              <span>
                是否删除：
                <label v-text="detailData.sfsc"></label>
              </span>
              <span>
                主送部门：
                <label v-text="detailData.zsbm"></label>
              </span>
              <span>
                抄送部门：
                <label v-text="detailData.csbm"></label>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-back">
      <button @click="detailBack();">返回</button>
    </div>
  </div>
</template>

<style scoped>

</style>

<script>
import { 
    getProductionAccountDetail
  } from '../../../api/safetyTraining/productionAccount'
export default {
  name: 'productionAccountDetail',
  data () {
    return {
      postData: {
        id: this.$route.query.id
      },
      detailData: ''
    }
  },
  methods: {
    getDetail: function() {
      layer.load(2)
      getProductionAccountDetail(this.postData)
        .then(ret => {
          layer.closeAll("loading")
          if (ret.code == 200) {
            this.detailData = ret.data.sfSafetyBook
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
        name: "productionAccount",
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
