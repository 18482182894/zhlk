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
                                所属库点国际编码：
                                <label v-text="detailData.graindepotGbCode"></label>
                            </span>
              <span>
                                设备类型：
                                <label v-text="detailData.equipmentTypeName"></label>
                            </span>
              <span>
                                设备名称：
                                <label v-text="detailData.equipmentName"></label>
                            </span>
              <span>
                                设备规格描述：
                                <label v-text="detailData.equipmentSpecifications"></label>
                            </span>
              <span>
                                计量单位编码:
                                <label v-text="detailData.measuringUnitCodeName"></label>
                            </span>
              <span>
                                原始记录ID：
                                <label v-text="detailData.originalId"></label>
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
  import{getDevice} from "../../../api/devicesManage/device";

  export default {
        name: "basicinfoDetail",
    data() {
      return {
        postData: {
          equipmentId: this.$route.query.id
        },
        detailData: ""
      };
    },
    methods: {
      getDetail: function() {
        var vm = this;
        layer.load(2);
        getDevice(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.detailData = ret.data.equipmentInfor;
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      },
      detailBack:function () {
        //this.$router.back(-1);
        this.$router.push({
          name: "basicinfo",
          query: {
            equipmentName:this.$route.query.equipmentName,
            equipmentType:this.$route.query.equipmentType,
            pageNo:this.$route.query.pageNo

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

<style scoped>

</style>
