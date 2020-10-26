<template>
    <div class="content">
        <div class="menuManage operationLog company">
            <div class="lookup">
                粮食品种：
                <div class="grainVariety excision">
                    <treeselect v-model="postData.grainKindId" :multiple="false" :options="grainVarietyList" />
                </div>
                创建日期：
                <!-- <input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})" id="startDate">至
                <input type="text" class="input-text Wdate excision" onclick="WdatePicker({maxDate:'%y-%M-%d'})" id="endDate"> -->
                <input type="text" class="input-text Wdate" onclick="WdatePicker({})" id="startDate">至
                <input type="text" class="input-text Wdate excision" onclick="WdatePicker({})" id="endDate">
                <div class="btn btn-add" @click="getList(1)">
                    <img src="../../../../../static/images/search.png" alt="">
                    <label>查找</label>
                </div>
            </div>
            <div>
                <div class="btn btn-add" @click="jumpEdit();">
                    <img src="../../../../../static/images/add.png" alt="">
                    <label>新增</label>
                </div>
                <!-- <select name="" class="select-style">
                    <option value="">显示条数</option>
                </select> -->
                <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
                    <option value="">排序方式</option>
                    <option value="0">顺序</option>
                    <option value="1">倒序</option>
                </select>
            </div>
            <table class="customTable">
                <thead>
                    <tr>
                        <th style="width: 5%;"><input type="checkbox" ></th>
                        <th style="width: 5%;">序号</th>
                        <th style="width: 10%;">倒仓单号</th>
                        <th style="width: 5%;">倒出仓</th>
                        <th style="width: 5%;">倒入仓</th>
                        <th style="width: 5%;">粮食品种</th>
                        <th style="width: 5%;">数量(千克)</th>
                        <th style="width: 10%;">创建日期</th>
                        <th style="width: 5%;">编辑状态</th>
                        <th style="width: 5%;">审核状态</th>
                        <th style="width: 30%;">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in listData">
                        <td><input type="checkbox" :value="item.reverseJobId" v-model="delList.reverseJobIdList" @change="clickChange();"></td>
                        <td v-if="sortOrder=='0'" v-text="i+1"></td>
                        <td v-else v-text="listData.length-i"></td>
                        <td v-text="item.reverseJobId"></td>
                        <td v-text="item.outStorehouseName"></td>
                        <td v-text="item.inStorehouseName"></td>
                        <td v-text="item.grainKind"></td>
                        <td v-text="item.grainNumber"></td>
                        <td v-text="item.createDate"></td>
                        <td v-text="item.draftStatus==0?'草稿':'正式文档'"></td>
                        <td>
                          <label v-if="item.status==0" class="fc-red">审核不通过</label>
                          <label v-if="item.status==10">未审核</label>
                          <label v-if="item.status==11" class="fc-green">审核中</label>
                          <label v-if="item.status==99" class="fc-green">审核通过</label>
                        </td>
                        <td>
                            <div class="table-btn btn-yellow" @click="jumpDetail(item.reverseJobId);">详情</div>
                            <div class="table-btn btn-green" @click="jumpEdit(item.reverseJobId);" v-if="item.draftStatus==0">编辑</div>
                            <div class="table-btn btn-submit" @click="submitAudit(item.reverseJobId);" v-if="item.draftStatus==0">提交流程</div>
                            <div class="table-btn btn-again" v-if="item.status==0" @click="submitAudit(item.reverseJobId);">再次申请</div>
                            <div class="table-btn btn-red" @click="delData(item.reverseJobId);" v-if="item.draftStatus==0">删除</div>
                        </td>
                    </tr>
                    
                </tbody>
            </table>    
            <!-- 分页容器 -->
            <div id="PageBar"></div>         
        </div>
    </div>
</template>

<script>
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import { reverseList, reverseDel, reverseApproval } from "@/api/business/warehousingStock/reverse";
  import { grainVariety } from "@/api/systemManage/dropDown";
  export default {
    name: "company",
    components: { Treeselect },
    data() {
      return {
        allChecked: false,
        sortOrder: "0", //0 顺序，1 倒序
        startDate: this.$route.query.startDate?this.$route.query.startDate:"",
        endDate: this.$route.query.endDate?this.$route.query.endDate:"",
        postData: {
          grainKindId: this.$route.query.grainKindId?this.$route.query.grainKindId:null,
          createStartDate: "",
          createEndDate: "",
          pageSize: 10,
          pageNo: this.$route.query.pageNo?this.$route.query.pageNo:0
        },
        delList: {
          reverseJobIdList: ""
        },
        listData: [],
        grainVarietyList:[],//粮食品种下拉
      };
    },
    methods: {
      getList: function(pageNo) {
        //获取列表
        var vm = this;
        vm.postData.pageNo = pageNo;
        vm.postData.createStartDate=$('#startDate').val();
        vm.postData.createEndDate=$('#endDate').val();
        layer.load(2);
        reverseList(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              console.log(JSON.stringify(ret))
              vm.listData = ret.data.dataList;
              for(var i in vm.listData) {
                const time = vm.listData[i].createDate.slice(0,10)
                vm.listData[i].createDate = time
              }
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
            }else {
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
        var vm = this;
        vm.listData.reverse();
      },
      delData: function(id) {
        //删除
        var vm = this;
        vm.delList.reverseJobIdList = id;
        layer.confirm('确定删除？', {
          btn: ['确定','取消'] //按钮
        }, function(){
        layer.load(2);
        reverseDel(vm.delList)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("删除成功！");
              vm.delList.reverseJobIdList = "";
              vm.getList(1);
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
        });
      },
      submitAudit:function (id) {
        var vm = this;
        reverseApproval({reverseJobId:id}).then(ret => {
            if (ret.code == 200) {
              layer.msg("提交成功！");              
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
        }).catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
        });        
      },
      jumpEdit: function(id) {
        var vm = this;
        this.$router.push({
          name: "reverseEdit",
          query: {
            id: id,
            pageNo:vm.postData.pageNo,
            grainKindId:vm.postData.grainKindId,
            startDate: document.getElementById("startDate").value,
            endDate: document.getElementById("endDate").value
          }
        });
      },
      jumpDetail: function(id) {
        var vm = this;
        this.$router.push({
          name: "reverseDetail",
          query: {
            id: id,
            pageNo:vm.postData.pageNo,
            grainKindId:vm.postData.grainKindId,
            startDate: document.getElementById("startDate").value,
            endDate: document.getElementById("endDate").value
          }
        });
      },
      getDropDown: function() {//获取下拉项
        var vm = this;
        grainVariety({}).then(ret => {//粮食品种
            if (ret.code == 200) {
              // console.log(JSON.stringify(ret))
              vm.grainVarietyList = ret.data.grainVarietyList;
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
      // document.getElementById('startDate').value=this.$route.query.startDate;
      // document.getElementById('endDate').value=this.$route.query.endDate;
      $('#startDate').val(vm.$route.query.startDate);
      $('#endDate').val(vm.$route.query.endDate);
      vm.getList(1);
      vm.getDropDown();
    }
  };
</script>
