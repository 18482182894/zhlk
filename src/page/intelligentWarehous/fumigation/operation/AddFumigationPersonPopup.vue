<template>
  <div class="popup" style="display: block">
    <div class="popup-main planPopup-edit-main operationLog">
      <div class="popup-title">
        <label>新增熏蒸人员</label>
        <em class="popup-close" @click="hide">×</em>
      </div>
      <div class="popup-content">
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
                姓名：
                <input type="text" class="input-text" v-model="detail.staffName"/>
              </span>
              <span>
                职务：
                <input type="text" class="input-text" v-model="detail.staffPosition"/>
              </span>
              <span>
                职业资质：
                <input type="text" class="input-text" v-model="detail.vocationalQualifications"/>
              </span>
              <br>
              <span>
                身体状态：
                <input type="text" class="input-text" v-model="detail.bodyStatus"/>
              </span>
              <span>
                任务分工：
                <input type="text" class="input-text" v-model="detail.taskDivision"/>
              </span>
              <span>
                是否外请人员：
                <select class="select-style excision" v-model="detail.outsourceFlag">
                  <option :value="0">正式</option>
                  <option :value="1">外包</option>
                </select>
              </span>
              <span style="width: 100%;">
                备注：
                <textarea class="edit-textarea" v-model="detail.memo"></textarea>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="edit-btn">
        <button class="edit-submit" @click="submitEvent">提交</button>
        <button class="edit-back" @click="hide">返回</button>
      </div>
    </div>
  </div>
</template>
<script>
  import {addFumigationStaff} from "@/api/intelligentWarehous/fumigation";

  export default {
    name: "AddFumigationPersonPopup",
    data() {
      return {
        detail: {
          staffName: '',
          staffPosition: '',
          vocationalQualifications: '',
          bodyStatus: '',
          taskDivision: '',
          outsourceFlag: '',
          memo: '',
        },
      }
    },
    methods: {
      hide() {
        this.$emit('hide');
      },
      submitEvent() {
        if (!this.detail.staffName) return layer.msg("请填写姓名");
        if (!this.detail.staffPosition) return layer.msg("请填写职务");
        if (!this.detail.vocationalQualifications) return layer.msg("请填写职业资质");
        if (!this.detail.bodyStatus) return layer.msg("请填写身体状态");
        if (!this.detail.taskDivision) return layer.msg("请填写任务分工");
        if (this.detail.outsourceFlag !== 0 && this.detail.outsourceFlag !== 1) return layer.msg("请选择是否外请人员");
        layer.load(2);
        addFumigationStaff(this.detail)
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("保存成功！");
              this.hide();
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
