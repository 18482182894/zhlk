<template>
    <div class="content">
        <div class="menuManage roleManage">
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">基础信息</div>
                </div>
                <div class="tag-box-content">
                    <div class="userManage-detail userManage-edit">
                        <div>
                            <span>
                                公式编号：
                                <input type="text" class="input-text" placeholder="" disabled="disabled" v-model="submitData.formulaId">
                            </span>
                            <span>
                                公式名称：
                                <input type="text" class="input-text" v-model="submitData.formulaName">
                            </span>
                            <span>
                                公式状态：
                                <select name="" class="select-style" v-model="submitData.formulaStatus">
                                    <option value="0">停用</option>
                                    <option value="1">启用</option>
                                </select>
                            </span>
                            <span>
                                备注：
                                <input type="text" class="input-text" v-model="submitData.memo">
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tag-box">
                <div class="tag-box-top">
                    <div class="tag-title">公式设置</div>
                </div>
                <div class="tag-box-content">
                    <div class="formula-item">
                        <span>计算项：</span>
                        <div class="formula-right">
                            <label class="sign-item sign-item-js" @click="formulaInput();" v-for="item in calculateList" v-text="item.calculateItemName"></label>
                        </div>
                    </div>
                    <div class="formula-item">
                        <span>操作符：</span>
                        <div class="formula-right">
                            <label class="sign-item" @click="formulaInput();">+</label>
                            <label class="sign-item" @click="formulaInput();">-</label>
                            <label class="sign-item" @click="formulaInput();">*</label>
                            <label class="sign-item" @click="formulaInput();">/</label>
                            <label class="sign-item" @click="formulaInput();">（</label>
                            <label class="sign-item" @click="formulaInput();">）</label>
                            <br>
                            <label class="sign-item" @click="formulaInput();">0</label>
                            <label class="sign-item" @click="formulaInput();">1</label>
                            <label class="sign-item" @click="formulaInput();">2</label>
                            <label class="sign-item" @click="formulaInput();">3</label>
                            <label class="sign-item" @click="formulaInput();">4</label>
                            <label class="sign-item" @click="formulaInput();">5</label>
                            <label class="sign-item" @click="formulaInput();">6</label>
                            <label class="sign-item" @click="formulaInput();">7</label>
                            <label class="sign-item" @click="formulaInput();">8</label>
                            <label class="sign-item" @click="formulaInput();">9</label>
                            <label class="sign-item" @click="formulaInput();">.</label>
                        </div>
                    </div>
                    <div class="formula-item">
                        <span>公式输入框：</span>
                        <div class="formula-right">
                            <textarea readonly="readonly" class="custom-textarea" v-model="formulaLabel">

                            </textarea>
                        </div>
                        <button class="formula-button btn-empty" @click="clearFormula();">清空</button>
                        <button class="formula-button bun-back" @click="backFormula();">回退</button>
                    </div>
                    <button class="query" @click="submitEvent();">提交</button>
                    <div class="formula-item">
                        <span></span>
                        <div class="formula-right">
                            <div class="custom-textarea formula-test">
                                示例图<br>
                                杂质扣量公式=8*2（毛重-皮重）
                            </div>
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
import {
  formulaDetail,
  formulaEdit,
  formulaNew,formulaItem
} from "@/api/systemManage/basicData/formula";
export default {
  name: "desktop",
  data() {
    return {
      postData: {
        formulaId: this.$route.query.id
      },
      submitData: {
        formulaId: "",
        formulaName: "",
        formulaDetail: "",
        formulaStatus: "",
        memo: ""
      },
      calculateList:[],
      formulaList: [],
      formulaLabel: ""
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      formulaDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.submitData.formulaId = this.$route.query.id;
            vm.submitData.formulaName = ret.data.formula.formulaName;
            // vm.submitData.formulaDetail=ret.data.formula.formulaDetail;
            vm.submitData.formulaStatus = ret.data.formula.formulaStatus;
            vm.submitData.memo = ret.data.formula.memo;
            vm.formulaLabel = ret.data.formula.formulaDetail;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    formulaInput: function() {
      var vm = this;
      var dom = event.currentTarget;
      var text = dom.innerText;
      vm.formulaList.push(text);
      vm.formulaShow();
    },
    formulaShow: function() {
      var vm = this;
      vm.formulaLabel = "";
      for (var i = 0; i < vm.formulaList.length; i++) {
        vm.formulaLabel += vm.formulaList[i];
      }
    },
    clearFormula: function() {
      var vm = this;
      vm.formulaList = [];
      vm.formulaLabel = "";
    },
    backFormula: function() {
      var vm = this;
      vm.formulaList.pop();
      vm.formulaShow();
    },
    submitEvent: function() {
      var vm = this;
      vm.submitData.formulaDetail = vm.formulaLabel;
      if (this.$route.query.id) {
        if (vm.submitData.formulaId == "") {
          layer.msg("请填写公式编号");
          return;
        }
      }
      if (vm.submitData.formulaName == "") {
        layer.msg("请填写公式名称");
        return;
      }
      if (vm.submitData.formulaStatus == "") {
        layer.msg("请选择公式状态");
        return;
      }
      if (vm.submitData.formulaDetail == "") {
        layer.msg("请填写公式");
        return;
      }
      if (this.$route.query.id) {
        vm.submitData.formulaId = this.$route.query.id;
        layer.load(2);
        formulaEdit(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("编辑公式成功！");
              this.$router.push({
                name: "formula",
                query: {
                  formulaName:this.$route.query.formulaName,
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
        layer.load(2);
        formulaNew(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增公式成功！");
              this.$router.push({
                name: "formula",
                query: {
                  formulaName:this.$route.query.formulaName,
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
    detailBack:function () {
       /* this.$router.back(-1);*/
      this.$router.push({
        name: "formula",
        query: {
          formulaName:this.$route.query.formulaName,
          pageNo:this.$route.query.pageNo
        }
      });
    },
    getCalculate:function () {//获取计算项
      var vm=this;
      formulaItem({}).then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.calculateList=ret.data.calculateItemList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
      }).catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
      });
    }
  },
  mounted() {
    var vm = this;
    vm.getCalculate();
    if (this.$route.query.id) {
      vm.getDetail();
    }
  }
};
</script>
