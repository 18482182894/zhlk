<template>
    <div class="content">
        <div class="menuManage userManage">
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">基础信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail">
                        <!-- <img src="../../../../static/images/user.png" alt=""> -->
                        <img :src="detailData.filePath ? detailData.filePath : '../../../../static/images/user.png'" alt="">
                        <div style="width: 82%;">
                            <span>
                                姓 &nbsp; &nbsp; &nbsp; 名：
                                <label v-text="detailData.staff_name?detailData.staff_name:''"></label>
                            </span>
                            <span>
                                性&nbsp; &nbsp; &nbsp;别：
                                <label v-text="detailData.sex==0?'女':'男'"></label>
                            </span>
                            <span>
                                身&nbsp;份&nbsp;证：
                                <label v-text="detailData.identity_no?detailData.identity_no:''"></label>
                            </span>
                            <span>
                                手&nbsp;机 &nbsp;号：
                                <label v-text="detailData.mobile_no?detailData.mobile_no:''"></label>
                            </span>
                            <span>
                                所属部门：
                                <label v-text="detailData.dept_name?detailData.dept_name:''"></label>
                            </span>
                            <span>
                                职位：
                                <label v-text="detailData.position_name?detailData.position_name:''"></label>
                            </span>
                            <span>
                                出生时间：
                                <label v-text="detailData.birthday?detailData.birthday:''"></label>
                            </span>
                            <span>
                                入职时间：
                                <label v-text="detailData.entry_date?detailData.entry_date:''"></label>
                            </span>
                            <span>
                              员工编号：
                              <label v-text="detailData.staff_id?detailData.staff_id:''"></label>
                            </span>
                            <span>
                              人员种类：
                              <label v-text="detailData.personnel_category?detailData.personnel_category:''"></label>
                            </span>
                            <span>
                                员工年龄：
                                <label v-text="detailData.age?detailData.age:''"></label>
                            </span>
                             <span>
                                员工籍贯：
                                <label v-text="detailData.native_place?detailData.native_place:''"></label>
                            </span>
                            <span>
                                文化程度：
                                <label v-text="detailData.culture?detailData.culture:''"></label>
                            </span>
                            <!-- <span>
                              资格证种类：
                              <label v-text="detailData.professional_type?detailData.professional_type:''"></label>
                            </span>
                            <span>
                              资格证编码：
                              <label v-text="detailData.professional_code?detailData.professional_code:''"></label>
                            </span> -->
                            <span>
                              培训经历：
                              <label v-text="detailData.trained_experience?detailData.trained_experience:''"></label>
                            </span>
                            <span>
                              获奖经历：
                              <label v-text="detailData.winning_experience?detailData.winning_experience:''"></label>
                            </span>
                            <span>
                                本单位工作时间：
                                <label v-text="detailData.now_job_time?detailData.now_job_time:''"></label>
                            </span>
                            <span class="professional">
                              资格证种类：
                              <label v-text="detailData.professional_type?detailData.professional_type:''"></label>
                            </span>
                            <span class="professional">
                              资格证编码：
                              <label v-text="detailData.professional_code?detailData.professional_code:''"></label>
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
<style scoped>
  .professional{
    width: 900px;   
  }
</style>
<script>
import { staffDetail } from "@/api/systemManage/staff";
export default {
  name: "staffManageDetail",
  data() {
    return {
      postData: {
        staff_id: this.$route.query.id,
      },
      detailData: "",
      options: [
          { text: '保管员', value: '1' },
          { text: '验质人员', value: '2' },
          { text: '企业管理人员', value: '3' },
          { text: '财会人员', value: '4' },
          { text: '统计人员', value: '5' },
          { text: '其他', value: '9' },
      ],
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      staffDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData = ret.data.staffDetail;
            const birthday = vm.detailData.birthday.slice(0,10);
            const entry_date = vm.detailData.entry_date.slice(0,10);
            vm.detailData.birthday = birthday;
            vm.detailData.entry_date = entry_date;
            vm.options.forEach(item => {
              if(vm.detailData.personnel_category == item.value) {
                vm.detailData.personnel_category = item.text
              }
            })
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
        name: "staffManage",
        query: {
          staff_id:this.$route.query.staff_id,
          staff_name:this.$route.query.staff_name,
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
