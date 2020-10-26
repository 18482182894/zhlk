<template>
    <div class="content">
        <div class="menuManage userManage">
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">基础信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail">
                        <div>
                            <span>
                                类型名称：
                                <label v-text="detailData.graindepotTypeName"></label>
                            </span>
                            <span>
                                备 注：
                                <label v-text="detailData.memo"></label>
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
import { libraryTypeDetail } from "@/api/systemManage/basicData/libraryType";
export default {
  name: "desktop",
  data() {
    return {
      postData: {
        graindepotTypeId: this.$route.query.id
      },
      detailData: ""
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      libraryTypeDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData = ret.data.grainDepotType;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    detailBack:function () {
       /* this.$router.back(-1);*/
      this.$router.push({
        name: "libraryType",
        query: {
          grainDepotTypeName:this.$route.query.grainDepotTypeName,
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
