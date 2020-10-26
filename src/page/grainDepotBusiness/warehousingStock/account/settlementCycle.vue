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
                            <p class="edit-p">
                                每月：
                                <select class="select-style" v-model="submitData.settelmentDate">
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                  <option value="9">9</option>
                                  <option value="10">10</option>
                                  <option value="11">11</option>
                                  <option value="12">12</option>
                                  <option value="13">13</option>
                                  <option value="14">14</option>
                                  <option value="15">15</option>
                                  <option value="16">16</option>
                                  <option value="17">17</option>
                                  <option value="18">18</option>
                                  <option value="19">19</option>
                                  <option value="20">20</option>
                                  <option value="21">21</option>
                                  <option value="22">22</option>
                                  <option value="23">23</option>
                                  <option value="24">24</option>
                                  <option value="25">25</option>
                                  <option value="26">26</option>
                                  <option value="27">27</option>
                                  <option value="28">28</option>
                                  <option value="29">29</option>
                                  <option value="30">30</option>
                                  <option value="31">31</option>
                                </select>号
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="edit-btn">
                <button class="edit-submit" @click="submitEvent();">提交</button>
                <button class="edit-back" @click="detailBack();">取消</button>
            </div>
        </div>
    </div>
</template>
<style type="text/css" scoped>
  .edit-p{
    text-align: center;
    font-size: 14px;
  }
</style>
<script>
  import { settlementCycle } from "@/api/business/warehousingStock/account";
export default {
  name: "warehouseEdit",
  data() {
    return {
        submitData:{
            settelmentDate:1
        }
    }
  },
  methods: {
    submitEvent: function() {
      var vm = this;
        layer.load(2);
        settlementCycle(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("设置成功！");
              this.$router.push({
                name: "account"
              });
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
    },
    detailBack:function () {
        this.$router.back(-1);
    }
  },
  mounted () {

  }
}
</script>
