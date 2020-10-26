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
                离职时间：
                <input
                  type="text"
                  class="input-text Wdate"
                  onclick="WdatePicker({maxDate:'%y-%M-%d'})"
                  id="leavingDate"
                >
              </span>
              <span>
                离职原因：
                <input type="text"
                       class="input-text"
                       v-model="submitNewData.leave_reason">
              </span>
            </div>
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
import { staffDel } from "@/api/systemManage/staff";
export default {
  name: "staffManageDeparture",
  data() {
    return {
      submitNewData: {
        staff_id: this.$route.query.id,
        exit_date: "",
        leave_reason: ""
      }
    };
  },
  methods: {
    submitEvent: function() {
      //提交
      var vm = this;
        //离职提交
        if (vm.submitNewData.leave_reason == "") {
          layer.msg("请填写离职原因");
          return;
        }
        if ($("#leavingDate").val() == "") {
          layer.msg("请填写离职时间");
          return;
        } else {
          vm.submitNewData.exit_date = $("#leavingDate").val();
        }
        if (vm.submitNewData.staff_id == "") {
          layer.msg("请填写员工编号");
          return;
        }
        layer.load(2);
      staffDel(vm.submitNewData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("该员工成功离职！");
            this.$router.push({
              name: "staffManage",
              query: {
                staff_id:this.$route.query.staff_id,
                staff_name:this.$route.query.staff_name,
                pageNo:this.$route.query.pageNo
              }
            });
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    detailBack: function() {
      /*this.$router.back(-1);*/
      this.$router.push({
        name: "staffManage",
        query: {
          staff_id:this.$route.query.staff_id,
          staff_name:this.$route.query.staff_name,
          pageNo:this.$route.query.pageNo
        }
      });
    }
  },
  mounted() {}
};
</script>
