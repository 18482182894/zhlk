<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
            <div class="tag-box-top">
              <div class="tag-title">来文信息</div>
            </div>
            <div class="tag-box-content">
                  <div class="userManage-detail userManage-edit">
                    <div>
                      <span>
                            来文编号：
                            <input
                              type="text"
                              class="input-text"
                              readonly="readonly"
                              v-model="documentId[0]"
                              placeholder="选择来文"
                              @click="showPopup();"
                            >
                          </span>
                      <span>
                            来文名称：
                            <input type="text" class="input-text" v-model="documentName">
                          </span>
                    </div>
                  </div>
            </div>
      </div>
      <div class="tag-box">
            <div class="tag-box-top">
              <div class="tag-title">计划信息</div>
            </div>
            <div class="tag-box-content">
                  <div class="userManage-detail userManage-edit">
                        <div>
                          <span>
                                        计划名称：
                                        <input type="text" class="input-text" v-model="submitData.planName">
                                      </span>
                          <span>
                                        计划描述：
                                        <input type="text" class="input-text" v-model="submitData.planDesc">
                                      </span>
                          <span>
                                        计划类型：
                                        <select name class="select-style" v-model="submitData.executeType">
                                          <option value="1">收储计划</option>
                                          <option value="2">销售计划</option>
                                          <option value="3">轮换计划</option>
                                        </select>
                                      </span>
                        </div>
                  </div>
            </div>
      </div>
      <div class="tag-box">
            <div class="tag-box-top">
              <div class="tag-title">粮食信息</div>
            </div>
            <div class="tag-box-content">
              <div class="userManage-detail userManage-edit">
                    <div>
                      <span>
                                    粮食品种：
                                  <div class="edit-grainVariety">
                                    <treeselect v-model="submitData.grainKindId" :multiple="false" :options="grainVarietyList" />
                                  </div>
                                  </span>
                      <span>
                                    粮食年期：
                                    <input
                                      type="number"
                                      class="input-text"
                                      v-model="submitData.grainAnnual"
                                      min="1"
                                      max="99"
                                    >
                                  </span>
                      <span>
                                    粮食等级：
                                    <select name class="select-style" v-model="submitData.grainOilLevelId">
                                      <option
                                        :value="item.dicInfoCode"
                                        v-for="item in grainOilLevelList"
                                        v-text="item.dicInfoValue"
                                      ></option>
                                    </select>
                                  </span>
                      <span>
                                    要求数量(千克)：
                                    <input type="text" class="input-text" v-model="submitData.demandQuantity">
                                  </span>
                      <span>
                                    粮食性质：
                                    <select name class="select-style" v-model="submitData.grainAttributeId">
                                      <option
                                        :value="item.dicInfoCode"
                                        v-for="item in grainNaturelList"
                                        v-text="item.dicInfoValue"
                                      ></option>
                                    </select>
                                  </span>
                    </div>
              </div>
            </div>
      </div>
      <div class="tag-box">
            <div class="tag-box-top">
              <div class="tag-title">基础信息</div>
            </div>
            <div class="tag-box-content">
                <div class="userManage-detail userManage-edit">
                    <div>
                      <span v-if="submitData.executeType==1||submitData.executeType==3">
                                    计划粮收储单价(元/千克)：
                                    <input type="number" class="input-text" v-model="submitData.storagePrice">
                                </span>
                      <span  v-if="submitData.executeType==1||submitData.executeType==3">
                                    计划粮收储开始日期：
                                    <input type="text" class="input-text Wdate" onclick="WdatePicker()"  id="storageBeginTime" >
                                </span>
                      <span  v-if="submitData.executeType==1||submitData.executeType==3">
                                    计划粮收储截止日期：
                                    <input type="text" class="input-text Wdate" onclick="WdatePicker()"  id="storageEndTime" >
                                </span>
                      <span v-if="type!='edit'">
                          <label>企业编码：</label>
                          <select name="" class="select-style" v-model="submitData.enterpriseCode" @change="getGraindepotGb(submitData.enterpriseCode);">
                              <option>请选择企业</option>
                              <option v-for="item in companyDataList" :value="item.enterpriseCode" v-text="item.enterpriseName"></option>
                          </select>
                      </span>
                      <span>
                                    库点：
                                    <select name="" class="select-style" v-model="submitData.graindepotGbCode">
                                        <option :value="item.graindepotGbCode" v-for="item in graindepotList" v-text="item.graindepotName"></option>
                                    </select>
                                </span>
                      <span v-if="submitData.executeType==2||submitData.executeType==3">
                                    计划销售开始日期：
                                    <input type="text" class="input-text Wdate" onclick="WdatePicker()"  id="salesBeginTime" >
                                </span>
                      <span v-if="submitData.executeType==2||submitData.executeType==3">
                                    计划粮销售价格(元/千克)：
                                    <input type="number" class="input-text" v-model="submitData.salesPrice">
                                </span>
                      <!-- <span>
                                    销售完成数量：
                                    <input type="number" class="input-text" v-model="submitData.outstoreCount">
                                </span> -->
                      <span v-if="submitData.executeType==2||submitData.executeType==3">
                                    计划销售截止时间：
                                    <input type="text" class="input-text Wdate" onclick="WdatePicker()"  id="salesEndTime" >
                                </span>
                      <span>
                                    计划隶属分类编码：
                                    <select name="" class="select-style" v-model="submitData.planGroupId">
                                        <option :value="item.dicInfoCode" v-for="item in planTypeCodelList" v-text="item.dicInfoValue"></option>
                                    </select>
                                </span>
                      <!-- <span  v-if="type=='change'">
                                    原计划编号：
                                    <input type="text" class="input-text" v-model="submitData.originalPlanId">
                                </span> -->
                      <span>
                                    下达单位：
                                    <input type="text" class="input-text" v-model="submitData.planCustomer">
                                </span>
                      <!-- <span>
                                    创建人名称：
                                    <input type="text" class="input-text" v-model="submitData.creater">
                      </span>-->
                          <!-- <span>
                                        计划进度：
                                        <input type="number" class="input-text" v-model="submitData.planProgress">
                      </span>-->
                    </div>
                </div>
            </div>
        </div>
        <div class="edit-btn">
          <button class="edit-submit" @click="submitEvent();">提交</button>
          <button class="edit-back" @click="detailBack();">返回</button>
        </div>
    </div>
      <!-- 选择来文弹出层 -->
      <div class="popup" :style="editPopup==1?'display:block;':''">
        <div class="popup-main planPopup-edit-main operationLog">
          <div class="popup-title">
            <label>选择来文</label>
            <em class="popup-close" @click="closePopup('edit');">×</em>
          </div>
          <div class="popup-content">
            <div>
              <div class="btn btn-add" @click="getList(1);">
                <img src="../../../../static/images/search.png" alt>
                <label>查找</label>
              </div>
            </div>
            <div class="lookup">
              来文号：
              <input type="text" class="input-text excision" v-model="postListData.documentId">
              来文名称：
              <input type="text" class="input-text excision" v-model="postListData.fileName">
            </div>
            <div>
              <!--<div class="btn btn-add" @click="jumpEdit();">
                <img src="../../../../static/images/add.png" alt>
                <label>新增</label>
              </div>-->
              <select name class="select-style" v-model="sortOrder" @change="changeSortOrder();">
                <option value>排序方式</option>
                <option value="0">顺序</option>
                <option value="1">倒序</option>
              </select>
            </div>
            <div class="plan-document">
              <table class="customTable">
                <thead>
                  <tr>
                    <th style="width:5%;">
                      <input type="checkbox">
                    </th>
                    <th style="width:5%;">序号</th>
                    <th style="width:15%;">来文号</th>
                    <th style="width:15%;">文件编号</th>
                    <th style="width:20%;">文件名称</th>
                    <th style="width:20%;">发文日期</th>
                    <th style="width:10%;">类型</th>
                    <th style="width:10%;">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,i) in listData">
                    <td>
                      <input type="checkbox" :value="item.documentId" v-model="documentId">
                    </td>
                    <td v-if="sortOrder=='0'" v-text="i+1"></td>
                    <td v-else v-text="listData.length-i"></td>
                    <td v-text="item.documentId"></td>
                    <td v-text="item.fileId"></td>
                    <td v-text="item.fileName"></td>
                    <td v-text="item.releaseDate"></td>
                    <td v-text="item.Type"></td>
                    <td>
                      <div class="table-btn btn-yellow" @click="checkDocument(item);">选择</div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- 分页容器 -->
              <div id="PageBar"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<style type="text/css" scoped>
.popup-content {
  border-bottom: 0;
}

.plan-document {
  height: 480px;
  overflow-y: auto;
}

</style>
<script>
 // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { getPlanById, editPlan, addPlan } from "@/api/business/plan";
import { getDocReviceList } from "@/api/business/docRevices";
import {
  grainVariety,
  grainOilLevel,
  grainNature,
  planTypeCode,
  graindepot,companyList
} from "@/api/systemManage/dropDown";
export default {
  name: "planManageEdit",
  components: { Treeselect },
  data() {
    return {
      type: this.$route.query.type,
      sortOrder: "0", //0 顺序，1 倒序
      postData: {
        planId: this.$route.query.id,
        planName: this.$route.query.planName,
        executeType: this.$route.query.executeType,
        grainKindId: this.$route.query.grainKindId,
        grainAttributeId: this.$route.query.grainAttributeId,
        pageNo:this.$route.query.pageNo
      },
      postListData: {
        fileName: "",
        documentId: "",
        pageSize: 10,
        pageNo: 0
      },
      documentId: [],
      documentName: "",
      listData: [],
      grainVarietyList: [], //粮食品种
      grainOilLevelList: [], //粮食等级
      grainNaturelList: [], //粮食性质
      graindepotList: [], //库点
      companyDataList:[],//企业列表
      planTypeCodelList: [],
      submitData: {
        planId: "",
        planName: "",
        planDesc: "",
        executeType: "",
        enterpriseCode:'',
        demandQuantity: "",
        grainAnnual: "",
        storagePrice: "",
        storageBeginTime: "",
        storageEndTime: "",
        salesPrice: "",
        salesBeginTime: "",
        salesEndTime: "",
        grainKindId: null,
        planCustomer: "",
        planGroupId: "",
        grainAttributeId: "",
        graindepotGbCode: "",
        grainOilLevelId: "",
        originalPlanId: "",
        documentId: ""
      },
      editPopup: 0 // 控制菜单编辑弹出层的显影，1为显示
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      getPlanById(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            console.log(JSON.stringify(ret));
            vm.submitData.planId = ret.data.plan.planId;
            vm.submitData.planName = ret.data.plan.planName;
            vm.submitData.planDesc = ret.data.plan.planDesc;
            vm.submitData.executeType = ret.data.plan.executeType;
            vm.submitData.demandQuantity = ret.data.plan.demandQuantity;
            vm.submitData.grainAnnual = ret.data.plan.grainAnnual;
            vm.submitData.storagePrice = ret.data.plan.storagePrice;
            vm.submitData.salesPrice = ret.data.plan.salesPrice;


            vm.submitData.grainKindId = ret.data.plan.grainKind;

            vm.submitData.planCustomer = ret.data.plan.planCustomer;
            vm.submitData.planGroupId = ret.data.plan.planGroupId;
            vm.submitData.grainAttributeId = ret.data.plan.grainAttribute;
            vm.submitData.graindepotGbCode = ret.data.plan.graindepotGbCode;
            vm.submitData.grainOilLevelId = ret.data.plan.grainOilLevel;
            if (vm.type == 'change') {
              vm.submitData.originalPlanId = ret.data.plan.planId;
            } else {
              vm.submitData.originalPlanId = ret.data.plan.originalPlanId;
            }
            vm.submitData.documentId = ret.data.plan.documentId;
            vm.documentId[0] = ret.data.plan.fileId;
            vm.documentName = ret.data.plan.fileName;


            vm.$nextTick(function() {
              vm.getGraindepotGb(ret.data.plan.enterpriseCode);
            });

            vm.$nextTick(function() {

              vm.submitData.storageBeginTime = ret.data.plan.storageBeginTime.substr(0, 10);
              $('#storageBeginTime').val(ret.data.plan.storageBeginTime.substr(0, 10));
              vm.submitData.storageEndTime = ret.data.plan.storageEndTime.substr(0, 10);
              $('#storageEndTime').val(ret.data.plan.storageEndTime.substr(0, 10));
              vm.submitData.salesBeginTime = ret.data.plan.salesBeginTime.substr(0, 10);
              $('#salesBeginTime').val(ret.data.plan.salesBeginTime.substr(0, 10));
              vm.submitData.salesEndTime = ret.data.plan.salesEndTime.substr(0, 10);
              $('#salesEndTime').val(ret.data.plan.salesEndTime.substr(0, 10));
              vm.getDropDown();
            });
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    submitEvent: function() {
      var vm = this;
      vm.submitData.storageBeginTime = $('#storageBeginTime').val();
      vm.submitData.storageEndTime = $('#storageEndTime').val();
      vm.submitData.salesBeginTime = $('#salesBeginTime').val();
      vm.submitData.salesEndTime = $('#salesEndTime').val();

      if (vm.submitData.planName == "") {
        layer.msg("请填写计划名称");
        return;
      }
      if (vm.submitData.executeType == "") {
        layer.msg("请选择计划类型");
        return;
      }
      if (vm.submitData.demandQuantity == "") {
        layer.msg("请填写要求数量");
        return;
      }
      if (vm.submitData.grainAnnual == "") {
        layer.msg("请填写粮食年期");
        return;
      }
      if (vm.submitData.executeType == 1 || vm.submitData.executeType == 3) {
        if (vm.submitData.storagePrice == "") {
          layer.msg("请填写计划粮收储单价");
          return;
        }
        if (vm.submitData.storagePrice == "") {
          layer.msg("请填写计划粮收储开始日期");
          return;
        }
        if (vm.submitData.storagePrice == "") {
          layer.msg("请填写计划粮收储结束日期");
          return;
        }
      }
      if (vm.submitData.executeType == 2 || vm.submitData.executeType == 3) {
        if (vm.submitData.salesPrice == "") {
          layer.msg("请填写计划粮销售价格");
          return;
        }
        if (vm.submitData.salesBeginTime == "") {
          layer.msg("请填写计划销售开始日期");
          return;
        }
        if (vm.submitData.salesEndTime == "") {
          layer.msg("请填写计划销售截至日期");
          return;
        }
      }
      if (vm.submitData.planGroupId == "") {
        layer.msg("请填写计划隶属分类编码");
        return;
      }
      if (vm.submitData.grainKindId == "") {
        layer.msg("请填写粮食品种编号");
        return;
      }
      if (vm.submitData.grainAttributeId == "") {
        layer.msg("请填写粮食性质编号");
        return;
      }
      if (vm.submitData.graindepotGbCode == "") {
        layer.msg("请填写库点编号");
        return;
      }
      if (vm.submitData.grainOilLevelId == "") {
        layer.msg("请填写粮食等级编号");
        return;
      }
      if (vm.type == "edit") {
        layer.load(2);
        editPlan(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("编辑计划成功！");
              this.$router.push({
                name: "planManage",
                query: {
                  planName:vm.postData.planName,
                  executeType:vm.postData.executeType,
                  grainKindId:vm.postData.grainKindId,
                  grainAttributeId:vm.postData.grainAttributeId,
                  pageNo:vm.postData.pageNo
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
        vm.submitData.planId = "";
        layer.load(2);
        addPlan(vm.submitData)
          .then(ret => {
            console.log(JSON.stringify(ret))
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增计划成功！");
              this.$router.push({
                name: "planManage",
                query: {
                  planName:vm.postData.planName,
                  executeType:vm.postData.executeType,
                  grainKindId:vm.postData.grainKindId,
                  grainAttributeId:vm.postData.grainAttributeId,
                  pageNo:vm.postData.pageNo
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
    showPopup: function() {
      // 展示弹出层
      var vm = this;
      vm.getList(1);
      vm.editPopup = 1;
    },
    closePopup: function() {
      // 隐藏弹出层
      var vm = this;
      vm.editPopup = 0;
    },
    getList: function(pageNo) {
      //获取来文列表
      var vm = this;
      vm.postListData.pageNo = pageNo;
      layer.load(2);
      getDocReviceList(vm.postListData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.dataList;
            laypage({
              //分页
              cont: "PageBar", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
              pages: ret.page.totalPages, //通过后台拿到的总页数
              curr: pageNo,
              skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
              jump: function(obj, first) {
                //触发分页后的回调
                if (!first) {
                  //一定要加此判断，否则初始时会无限刷新
                  vm.getList(obj.curr);
                }
              }
            });
          } else {
            if (ret.code == "500" && ret.data == "查询错误，没有数据") {
              layer.msg("暂无数据");
              vm.listData = [];
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    changeSortOrder: function() {
      //倒序
      var vm = this;
      vm.listData.reverse();
    },
    checkDocument: function(data) {
      //选择来文
      var vm = this;
      vm.submitData.documentId = data.documentId;
      vm.documentId[0] = data.documentId;
      vm.documentName = data.fileName;
      vm.closePopup();
    },
    getGraindepotGb:function (id) {//获取库点
      var vm = this;
      layer.load(2);
        graindepot(id)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.graindepotList = ret.data.dataList;
          } else {
            if (ret.code == 500&&ret.data=='查询错误，没有数据') {
                vm.graindepotList=[];
            }else{
                layer.alert(ret.data, { closeBtn: 0 });
            }
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getDropDown: function() {
      //获取下拉项
      var vm = this;
      companyList({})
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.companyDataList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
      grainVariety({})
        .then(ret => {
          //粮食品种
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret));
            vm.grainVarietyList = ret.data.grainVarietyList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
      grainOilLevel({})
        .then(ret => {
          //粮食等级
          if (ret.code == 200) {
            vm.grainOilLevelList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
      grainNature({})
        .then(ret => {
          //粮食性质
          if (ret.code == 200) {
            vm.grainNaturelList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
      planTypeCode({})
        .then(ret => {
          //计划隶属分类编码
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret));
            vm.planTypeCodelList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    detailBack: function(id) {
      var vm = this;
      this.$router.push({
        name: "planManage",
        query: {
          id: id,
          planName:this.$route.query.planName,
          executeType:this.$route.query.executeType,
          grainKindId:this.$route.query.grainKindId,
          grainAttributeId:this.$route.query.grainAttributeId,
          pageNo:this.$route.query.pageNo
        }
      });
    }
  },
  mounted() {
    var vm = this;
    if (this.$route.query.id != "") {
      vm.getDetail();
    } else {
      vm.getDropDown();
    }
  }
};

</script>
