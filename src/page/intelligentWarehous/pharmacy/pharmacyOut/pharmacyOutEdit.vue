<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">药剂出库信息编辑</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
                领用申请编码：
                <input type="num" class="input-text">
              </span>
              <span>
                药品名称：
                <input type="text" class="input-text">
              </span>
              <span>
                药剂类型：
                <input type="num" class="input-text">
              </span>
              <span>
                单位：
                <input type="text" class="input-text">
              </span>
              <span>
                规格描述：
                <input type="text" class="input-text">
              </span>
              <span>
                领用数量：
                <input type="num" class="input-text">
              </span>
              <span>
                申请人：
                <input type="text" class="input-text">
              </span>
              <span>
                申请部门：
                <input type="num" class="input-text">
              </span>
              <span>
                作业日期：
                <input type="text" class="input-text">
              </span>
              <br>
              <span style="width: 100%">
                作业目的：
                <textarea class="edit-textarea"></textarea>
               </span>
            </div>
          </div>
        </div>
      </div>
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">图片</div>
        </div>
        <div class="tag-box-content">
          <div class="upload-pic">
            <div id="uploadPic"></div>
            <img src="../../../../../static/images/upload-pic.png" alt="">
            <label class="fc-red">只支持.jpg格式</label>
          </div>
        </div>
      </div>
      <div class="edit-btn">
        <button class="edit-submit" @click="submitEvent();">提交</button>
        <button class="edit-back" @click="detailBack();">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {uploadPic} from "@/utils/public";

  export default {
    name: "pharmacyOutEdit",
    data() {
      return {
        postData: {
          priceId: this.$route.query.id
        },
        isShow: 0,
        detailData: "",
        submitNewData: {
          grainVarietyId: "",
          inventoryPropertyId: "",
          grainOilLevelId: "",
          price: "",
          memo: ""
        },
        submitEditData: {
          priceId: this.$route.query.id,
          price: "",
          memo: ""
        },
        grainVarietyList: "",
        grainOilLevelList: "",
        inventoryPropertyList: ""
      };
    },
    methods: {
      getDetail: function () {
        //获取编辑详情
        var vm = this;
        layer.load(2);
        priceDetail(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.detailData = ret.data.priceInfo;
              vm.submitEditData.price = ret.data.priceInfo.price;
              vm.submitEditData.memo = ret.data.priceInfo.memo;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      submitEvent: function () {
        //提交
        var vm = this;
        if (vm.postData.priceId) {
          //编辑提交
          if (vm.submitEditData.price == "") {
            layer.msg("请填写价格");
            return;
          }
          layer.load(2);
          priceEdit(vm.submitEditData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("编辑价格成功！");
                this.$router.push({
                  name: "pharmacyOutList"
                });
              } else {
                layer.alert(ret.data, {closeBtn: 0});
              }
            })
            .catch(err => {
              layer.alert(err.message, {closeBtn: 0});
            });
        } else {
          //新增提交
          if (vm.submitNewData.grainVarietyId == "") {
            layer.msg("请选择粮食品种");
            return;
          }
          if (vm.submitNewData.inventoryPropertyId == "") {
            layer.msg("请选择库存性质");
            return;
          }
          if (vm.submitNewData.grainOilLevelId == "") {
            layer.msg("请选择粮油等级");
            return;
          }
          if (vm.submitNewData.price == "") {
            layer.msg("请填写价格");
            return;
          }
          layer.load(2);
          priceNew(vm.submitNewData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("新增价格成功！");
                this.$router.push({
                  name: "pharmacyOutList"
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
      getDropDown: function () {
        //获取下拉项
        var vm = this;
        grainVariety({})
          .then(ret => {
            //粮食品种
            if (ret.code == 200) {
              vm.grainVarietyList = ret.data.grainVarietyList;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
        grainOilLevel({})
          .then(ret => {
            //粮油等级
            if (ret.code == 200) {
              vm.grainOilLevelList = ret.data.dataList;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
        inventoryProperty({})
          .then(ret => {
            //库存性质
            if (ret.code == 200) {
              vm.inventoryPropertyList = ret.data.dataList;
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      detailBack: function () {
        this.$router.back(-1);
      }
    },
    mounted() {
      var vm = this;
      // if (this.$route.query.id) {
      //   vm.isShow = 1;
      //   vm.getDetail();
      // } else {
      //   vm.getDropDown();
      // }

      uploadPic("uploadPic", function (ret) {
        if (ret.code == 200) {
        } else {
          layer.alert("上传文件出错", {closeBtn: 0});
        }
      });
    }
  };
</script>

<style scoped>

</style>
