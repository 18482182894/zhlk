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
                姓 &nbsp; &nbsp; &nbsp; 名：
                <input
                  type="text"
                  class="input-text"
                  v-model="submitNewData.staffName"
                >
              </span>
              <span>
                性 &nbsp; &nbsp; &nbsp; 别：
                <select
                  name
                  class="select-style"
                  v-model="submitNewData.sex"
                >
                  <option value="0">女</option>
                  <option value="1">男</option>
                </select>
              </span>
              <span>
                身 &nbsp;份 &nbsp;证：
                <input
                  type="text"
                  class="input-text"
                  v-model="submitNewData.identityNo"
                >
              </span>
              <!-- <span>
                                状  &nbsp; &nbsp; &nbsp;  态：
                                <input type="text" class="input-text" >
              </span>-->
              <span>
                手 &nbsp;机 &nbsp;号：
                <input
                  type="text"
                  class="input-text"
                  v-model="submitNewData.tel"
                  @blur="check_Phone(submitNewData.tel);"
                >
              </span>
              <span>
                部 &nbsp; &nbsp; &nbsp; 门：
                <select
                  name
                  class="select-style"
                  v-model="departmentId"
                  @change="getPosition(departmentId);"
                >
                  <option
                    :key="item.departmentId"
                    :value="item.departmentId"
                    v-for="item in departmentData"
                    v-text="item.departmentName"
                  ></option>
                </select>
              </span>
              <span>
                岗 &nbsp; &nbsp; &nbsp; 位：
                <select
                  name
                  class="select-style"
                  v-model="submitNewData.positionId"
                >
                  <option
                    :key="item.position_id"
                    :value="item.position_id"
                    v-for="item in positionData"
                    v-text="item.position_name"
                  ></option>
                </select>
              </span>
              <span>
                出生日期：
                <input
                  type="text"
                  class="input-text Wdate"
                  onclick="WdatePicker({maxDate:'%y-%M-%d'})"
                  id="birthday"
                >
              </span>
              <span>
                入职时间：
                <input
                  type="text"
                  class="input-text Wdate"
                  onclick="WdatePicker({maxDate:'%y-%M-%d'})"
                  id="entryDate"
                >
              </span>
              <!-- 新增员工编号的input -->
              <span v-show="see">
                员工编号：
                <input type="text" class="input-text" v-model="submitNewData.staffId" v-show="see">
              </span>
              <!-- 编辑员工编号的input -->
              <span v-show="isShow">
                员工编号：
                <input type="text" class="input-text" v-model="submitNewData.staff_id" v-show="isShow">
              </span>
              <span>
                人员种类：
                <select
                  class="select-style"
                  v-model="submitNewData.personnelCategory"
                  ref="personnelCategory"
                >
                  <option 
                    v-for="option in options"
                    :key="option.value"
                    :value="option.value"
                  >
                  {{ option.text }}
                  </option>
                </select>
              </span>
              <!-- 新增状态下，员工年龄input框 -->
              <span v-if="isSee">
                员工年龄（新增）：
                <input type="text" class="input-text" v-model="submitNewData.age" @click="getAge">
              </span>
              <!-- 编辑状态下，员工年龄input框 -->
              <span v-else>
                员工年龄：
                <input type="text" class="input-text" v-model="submitNewData.age">
              </span>
              <span>
                员工籍贯：
                <input type="text" class="input-text" v-model="submitNewData.nativePlace">
              </span>
              <span>
                文化程度：
                <input type="text" class="input-text" v-model="submitNewData.culture">
              </span>
              <span class="longInput">
                资格证种类：(如有多项，请以逗号间隔)
                <input type="text" class="input-text" v-model="submitNewData.professionalType">
              </span>
              <span class="longInput">
                资格证编码：(如有多项，请以逗号间隔)
                <input type="text" class="input-text" v-model="submitNewData.professionalCode">
              </span>
              <span class="longInput">
                培训经历：(如有多项，请以逗号间隔)
                <input type="text" class="input-text" v-model="submitNewData.trainedExperience">
              </span>
              <span class="longInput">
                获奖经历：(如有多项，请以逗号间隔)
                <input type="text" class="input-text" v-model="submitNewData.winningExperience">
              </span>
            </div>
            
            <!-- <div v-else>
              <span>
                手 &nbsp;机 &nbsp;号：
                <input
                  type="text"
                  class="input-text"
                  v-model="submitEditData.mobile_no"
                  @blur="check_Phone(submitEditData.mobile_no);"
                >
              </span>
              <span>
                员工编号：
                <input
                  type="text"
                  class="input-text"
                  v-model="submitEditData.staff_id"
                  readonly="readonly"
                >
              </span>
            </div> -->
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
            <!-- <img :src="submitNewData.staffImage?submitNewData.staffImage:'../../../../static/images/upload-pic.png'" alt> -->
            <img v-if="postData.staff_id" :src="submitNewData.staffImage?submitNewData.staffImage:submitNewData.filePath" alt>
            <img v-else :src="submitNewData.staffImage?submitNewData.staffImage:'../../../../static/images/upload-pic.png'" alt>
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
<style scoped>
  .longInput {
    display: block;
  }
  .longInput .input-text {
    width: 1100px;
  } 
</style>
<script>
import { staffEdit, staffDetail, staffNew } from "@/api/systemManage/staff";
import { positionList, departmentList } from "@/api/systemManage/dropDown";
import { checkPhone, uploadPic } from "@/utils/public";
export default {
  name: "staffManageEdit",
  data() {
    return {
      postData: {
        staff_id: this.$route.query.id
      },
      see: true,
      isSee: true,
      isShow: false,
      detailData: "",
      departmentData: "",
      positionData: "",
      submitNewData: {
        staff_id: "",
        staffId: '',
        companyId: "",
        staffName: "",
        tel: "",
        sex: "",
        birthday: "",
        entryDate: "",
        positionId: "",
        identityNo: "",
        staffImageUrl:'',
        staffImage:'',
        personnelCategory: '',
        age: '',
        nativePlace: '',
        culture: '',
        professionalType: '',
        professionalCode: '',
        trainedExperience: '',
        winningExperience: '',
      },
      options: [
          { text: '保管员', value: '1' },
          { text: '验质人员', value: '2' },
          { text: '企业管理人员', value: '3' },
          { text: '财会人员', value: '4' },
          { text: '统计人员', value: '5' },
          { text: '其他', value: '9' },
      ],
      departmentId: ''
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      staffDetail(vm.postData)
        .then(ret => {
          console.log(ret)
          layer.closeAll("loading");
          if (ret.code == 200) {
            // vm.detailData=ret.data.staffDetail;
            vm.submitNewData.staffName = ret.data.staffDetail.staff_name;
            vm.submitNewData.sex = ret.data.staffDetail.sex;
            vm.submitNewData.sex == 0 ? '女' : '男';
            vm.submitNewData.identityNo = ret.data.staffDetail.identity_no;
            vm.departmentId = ret.data.staffDetail.department_id; 
            vm.submitNewData.positionId = ret.data.staffDetail.position_id;
            vm.submitNewData.personnelCategory = ret.data.staffDetail.personnel_category;
            vm.submitNewData.age = ret.data.staffDetail.age;
            vm.submitNewData.nativePlace = ret.data.staffDetail.native_place;
            vm.submitNewData.culture = ret.data.staffDetail.culture;
            vm.submitNewData.professionalType = ret.data.staffDetail.professional_type;
            vm.submitNewData.professionalCode = ret.data.staffDetail.professional_code;
            vm.submitNewData.trainedExperience = ret.data.staffDetail.trained_experience;
            vm.submitNewData.winningExperience = ret.data.staffDetail.winning_experience;
            const birthday = ret.data.staffDetail.birthday.slice(0,10)
            const entryDate = ret.data.staffDetail.entry_date.slice(0,10)
            $("#birthday").val(birthday);
            $("#entryDate").val(entryDate);
            vm.submitNewData.tel = ret.data.staffDetail.mobile_no;
            vm.submitNewData.staff_id = ret.data.staffDetail.staff_id;
            vm.submitNewData.staffId = ret.data.staffDetail.staff_id;
            vm.submitNewData.filePath = ret.data.staffDetail.filePath;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getDepartmen: function() {
      //获取部门下拉数据
      var vm = this;
      layer.load(2);
      departmentList({})
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.departmentData = ret.data.departmentList;
            // console.log(vm.departmentData)
            // for(var i in vm.departmentData) {
            //   const dataId = vm.departmentData[i].departmentId
            //   console.log(dataId)
            // }
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getPosition: function() {
      //根据部门获取岗位下拉数据
      var vm = this;
      if (vm.departmentId == "") {
        layer.msg("请选择部门！");
        return;
      }
      layer.load(2);
      positionList({ dept_id: vm.departmentId })
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.positionData = ret.data.positionList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    check_Phone: function(tel) {
      var vm = this;
      if (!checkPhone(tel)) {
        layer.msg("请填写正确的手机号！");
      }
    },
    getAge() {
      var vm = this
      vm.submitNewData.birthday = $("#birthday").val();
      var birthday = new Date(vm.submitNewData.birthday .replace(/-/g, "\/"));
      var d=new Date(); 
      vm.submitNewData.age = d.getFullYear()-birthday.getFullYear()-((d.getMonth()<birthday.getMonth()|| d.getMonth()==birthday.getMonth() && d.getDate()<birthday.getDate())?1:0);
    },
    submitEvent: function() {
      //提交 
      var vm = this;
      if (vm.$route.query.id) {
        vm.isShow = true
        vm.see = false
        //编辑提交
        if (vm.submitNewData.staffName == "") {
          layer.msg("请填写姓名");
          return;
        } else {
          if (vm.submitNewData.staffName.length > 5) {
            layer.msg("姓名不得超过5个字符");
            return;
          }
        }
        if (vm.submitNewData.sex == "") {
          layer.msg("请选择性别");
          return;
        }
        if (vm.submitNewData.identityNo == "") {
          layer.msg("请填写身份证号");
          return;
        }
        if (vm.submitNewData.tel == "") {
          layer.msg("请填写手机号");
          return;
        } else {
          if (!checkPhone(vm.submitNewData.tel)) {
            layer.msg("请填写正确的手机号！");
            return;
          }
        }
        if (vm.departmentId == "") {
          layer.msg("请选择部门");
          return;
        }
        if (vm.submitNewData.positionId == "") {
          layer.msg("请选择岗位");
          return;
        }
        if ($("#birthday").val() == "") {
          layer.msg("请填写出生日期");
          return;
        } else {
          vm.submitNewData.birthday = $("#birthday").val();
        }
        if ($("#entryDate").val() == "") {
          layer.msg("请填写入职时间");
          return;
        } else {
          vm.submitNewData.entryDate = $("#entryDate").val();
        }
        if (vm.submitNewData.staff_id == "") {
          layer.msg("请填写员工编号");
          return;
        }
        if (vm.submitNewData.personnelCategory == "") {
          layer.msg("请选择人员种类");
          return;
        }
        if (vm.submitNewData.age == "") {
          layer.msg("请填写员工年龄");
          return;
        }
        if (vm.submitNewData.nativePlace == "") {
          layer.msg("请填写员工籍贯");
          return;
        }
        if (vm.submitNewData.culture == "") {
          layer.msg("请填写文化程度");
          return;
        }
        layer.load(2);
        vm.$set(vm.submitNewData,'departmentId',vm.departmentId)
        console.log(vm.submitNewData)
        staffEdit(vm.submitNewData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("编辑员工成功！");
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
      } else {
        //新增提交
        if (vm.submitNewData.staffName == "") {
          layer.msg("请填写姓名");
          return;
        } else {
          if (vm.submitNewData.staffName.length > 5) {
            layer.msg("姓名不得超过5个字符");
            return;
          }
        }
        if (vm.submitNewData.sex == "") {
          layer.msg("请选择性别");
          return;
        }
        if (vm.submitNewData.identityNo == "") {
          layer.msg("请填写身份证号");
          return;
        }
        if ($("#entryDate").val() == "") {
          layer.msg("请填写入职时间");
          return;
        } else {
          vm.submitNewData.entryDate = $("#entryDate").val();
        }
        if (vm.departmentId == "") {
          layer.msg("请选择部门");
          return;
        }
        if (vm.submitNewData.positionId == "") {
          layer.msg("请选择岗位");
          return;
        }
        if ($("#birthday").val() == "") {
          layer.msg("请填写出生日期");
          return;
        } else {
          vm.submitNewData.birthday = $("#birthday").val();
        }
        if (vm.submitNewData.tel == "") {
          layer.msg("请填写手机号");
          return;
        } else {
          if (!checkPhone(vm.submitNewData.tel)) {
            layer.msg("请填写正确的手机号！");
            return;
          }
        }
        if (vm.submitNewData.staffId == "") {
          layer.msg("请填写员工编号");
          return;
        }
        if (vm.submitNewData.personnelCategory == "") {
          layer.msg("请选择人员种类");
          return;
        }
        if (vm.submitNewData.age == "") {
          layer.msg("请填写员工年龄");
          return;
        }
        if (vm.submitNewData.nativePlace == "") {
          layer.msg("请填写员工籍贯");
          return;
        }
        if (vm.submitNewData.culture == "") {
          layer.msg("请填写文化程度");
          return;
        }
        layer.load(2);
        staffNew(vm.submitNewData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增员工成功！");
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
      }
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
  watch: {
    departmentId(newValue, oldValue) {
      if(oldValue === undefined) {
        this.getDepartmen()
      } else {
        this.getPosition(newValue)
      }
    }
  },
  mounted() {
    var vm = this;
    vm.getDepartmen();
    if (vm.$route.query.id) {
      vm.isShow = true
      vm.see = false
      vm.isSee = false
      vm.getDetail();
      // vm.getPosition();
    }
    uploadPic("uploadPic", function(ret) {
      if (ret.code == 200) {
        vm.submitNewData.staffImageUrl=ret.data.fileName;
        vm.submitNewData.staffImage=ret.data.fileUrl;
      } else {
        layer.alert("上传文件出错", { closeBtn: 0 });
      }
    });
  }
};
</script>
