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
                                操作类型：
                                <label v-text="detailData.equipmentName"></label>
                            </span>
                            <span>
                                设备名称：
                                <label v-text="detailData.equipmentName"></label>
                            </span>
              <span>
                                设备类型：
                                <label v-text="detailData.equipmentType=='0'?'计量(检验)设备':'仓储设备'"></label>
                            </span>
              <span>
                                设备编号：
                                <label v-text="detailData.equipmentId"></label>
                            </span>
              <span>
                                用途：
                                <label v-text="detailData.purpose"></label>
                            </span>
              <span>
                                借用时间:
                                <label v-text="detailData.borrowDatetime"></label>
                            </span>
              <span>
                                借用人：
                                <label v-text="detailData.borrowPersonName"></label>
                            </span>
              <span>
                                借用仓库：
                                <label v-text="detailData.borrowGraindepotName"></label>
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
  import { getBorrow } from "../../../api/devicesManage/borrow";

  export default {
        name: "returnDetail",
      data() {
        return {
          postData: {
            id: this.$route.query.id
          },
          detailData: ""
        };
      },
      methods: {
        getDetail: function() {
          var vm = this;
          layer.load(2);
          getBorrow(vm.postData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                vm.detailData = ret.data.dataMap;
              } else {
                layer.alert(ret.data, { closeBtn: 0 });
              }
            })
            .catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
            });
        },
        detailBack:function () {
          this.$router.push({
            name: "return",
            query: {
              equipmentType:this.$route.query.equipmentType,
              returnFlg:this.$route.query.returnFlg
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
