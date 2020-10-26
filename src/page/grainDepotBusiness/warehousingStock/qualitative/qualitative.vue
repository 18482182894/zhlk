<template>
    <div class="content">
        <div class="menuManage operationLog company">
            <div class="lookup">
                仓房：
                <select name="" class="select-style excision" v-model="postData.storehouseGbCode" >
                    <option value="">请选择</option>
                    <option v-for="item in storehouseList" :value="item.storehouseGbCode" v-text="item.storehouseName">
                    </option>
                </select>
                存粮品种：
                <div class="grainVariety excision">
                    <treeselect v-model="postData.grainKind" :multiple="false" :options="grainVarietyList" />
                </div>
                存粮性质：
                <select name="" class="select-style excision" v-model="postData.grainAttribute">
                    <option value="">请选择</option>
                    <option v-for="item in grainNatureList" :value="item.dicInfoCode" v-text="item.dicInfoValue">
                    </option>
                </select>
                <br>
                定性日期：
                <input type="text" class="input-text Wdate excision" onclick="WdatePicker({maxDate:'%y-%M-%d'})" id="startTime">至<label class="excision"></label>
                <input type="text" class="input-text Wdate excision" onclick="WdatePicker({maxDate:'%y-%M-%d'})" id="endTime">

                <div class="btn btn-add" @click="getList(1);">
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
                        <th style="width: 10%;">定性编号</th>
                        <th style="width: 5%;">仓房</th>
                        <th style="width: 7.5%;">存粮性质</th>
                        <th style="width: 7.5%;">粮食品种</th>
                        <th style="width: 5%;">数量(千克)</th>
                        <th style="width: 10%;">定性日期</th>
                        <th style="width: 5%;">编辑状态</th>
                        <th style="width: 5%;">审核状态</th>
                        <th style="width: 30%;">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in listData">
                        <td><input type="checkbox" :value="item.qualitativeId" v-model="delList.qualitativeIds" @change="clickChange();"></td>
                        <td v-if="sortOrder=='0'" v-text="i+1"></td>
                        <td v-else v-text="listData.length-i"></td>
                        <td v-text="item.qualitativeId"></td>
                        <td v-text="item.storehouseName"></td>
                        <td v-text="item.grainAttributeValue"></td>
                        <td v-text="item.grainKindValue"></td>
                        <td v-text="item.grainNumber"></td>
                        <td v-text="item.qualitativeDate"></td>
                        <td v-text="item.draftStatus==0?'草稿':'正式文档'"></td>
                        <td v-text="item.statusValue">
                        </td>
                        <td>
                            <div class="table-btn btn-yellow" @click="jumpDetail(item.qualitativeId);">详情</div>
                            <div class="table-btn btn-green" @click="jumpEdit(item.qualitativeId);" v-if="item.draftStatus==0">编辑</div>
                            <div class="table-btn btn-submit" @click="submitAudit(item.qualitativeId);" v-if="item.draftStatus==0">提交流程</div>
                            <div class="table-btn btn-again" v-if="item.status==0" @click="submitAudit(item.qualitativeId);">再次申请</div>
                            <div class="table-btn btn-red" @click="delData(item.qualitativeId);" v-if="item.draftStatus==0">删除</div>
                        </td>
                    </tr>                    
                </tbody>
            </table> 
            <!-- 分页容器 -->
            <div id="PageBar"></div>           
        </div>
    </div>
</template>

<style type="text/css" scoped>
    .operationLog .lookup .excision{
      margin-right: 4rem;
    }
</style>
<script>
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import { qualitativeApi, qualitativeDelApi, qualitativeApprovalApi } from "@/api/business/warehousingStock/qualitative";
  import { grainVariety, storehouse, grainNature } from "@/api/systemManage/dropDown";
  export default {
    name: "company",
    components: { Treeselect },
    data() {
      return {
        allChecked: false,
        sortOrder: "0", //0 顺序，1 倒序
        startTime: this.$route.query.startTime?this.$route.query.startTime:"",
        endTime: this.$route.query.endTime?this.$route.query.endTime:"",
        postData: {
          storehouseGbCode: this.$route.query.storehouseGbCode?this.$route.query.storehouseGbCode:"",
          grainKind: this.$route.query.grainKind?this.$route.query.grainKind:null,
          grainAttribute: this.$route.query.grainAttribute?this.$route.query.grainAttribute:"",
          pageSize: 10,
          pageNo: this.$route.query.pageNo?this.$route.query.pageNo:0
        },
        delList: {
          qualitativeIds: ""
        },
        listData: [],
        grainVarietyList:[],//粮食品种下拉
        storehouseList:'',//仓房下拉
        grainNatureList:'',//粮食性质下拉
      };
    },
    methods: {
      getList: function(pageNo) {
        //获取列表
        var vm = this;
        vm.postData.pageNo = pageNo;
        vm.postData.startTime=$('#startTime').val();
        vm.postData.endTime=$('#endTime').val();
        layer.load(2);
        qualitativeApi(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.listData = ret.data.qualitativeList;
              for(var i in vm.listData) {
                const time = vm.listData[i].qualitativeDate.slice(0,10)
                vm.listData[i].qualitativeDate = time
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
      if (id) {
        vm.delList.qualitativeIds = [];
        vm.delList.qualitativeIds.push(id);
      } else {
        if (vm.delList.qualitativeIds.length == []) {
          layer.msg("请至少选择一条数据！");
          return;
        }
      }
      layer.confirm('确定删除？', {
        btn: ['确定','取消'] //按钮
      }, function(){
      layer.load(2);
      var delstr = vm.delList.qualitativeIds.join(",");
      qualitativeDelApi({ qualitativeIds: delstr })
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            layer.msg("删除成功！");
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
    checkAll: function() {
      //全选
      var vm = this;
      if (vm.allChecked) {
        for (var i = 0; i < vm.listData.length; i++) {
          vm.delList.qualitativeIds.push(vm.listData[i].qualitativeId);
        }
      } else {
        vm.delList.qualitativeIds = [];
      }
    },
    clickChange: function() {
      //监听input选中状态，控制全选input的选中
      var vm = this;
      if (vm.delList.qualitativeIds.length == vm.listData.length) {
        vm.allChecked = true;
      } else {
        vm.allChecked = false;
      }
    },
      jumpEdit: function(id) {
        var vm = this;
        this.$router.push({
          name: "qualitativeEdit",
          query: {
            id: id,
            storehouseGbCode: vm.postData.storehouseGbCode,
            grainKind: vm.postData.grainKind,
            grainAttribute: vm.postData.grainAttribute,
            startTime: document.getElementById('startTime').value,
            endTime: document.getElementById('endTime').value,
            pageNo: vm.postData.pageNo
          }
        });
        console.log('我传过去的时间是:'+this.query.startTime)
      },
      jumpDetail: function(id) {
        var vm = this;
        this.$router.push({
          name: "qualitativeDetail",
          query: {
            id: id,
            startTime: $('#startTime').val(),
            endTime: $('#endTime').val(),
            storehouseGbCode: vm.postData.storehouseGbCode,
            grainKind: vm.postData.grainKind,
            grainAttribute: vm.postData.grainAttribute,
            pageNo: vm.postData.pageNo
          }
        });
      },
      submitAudit:function (id) {
        var vm = this;
        qualitativeApprovalApi({qualitativeId:id}).then(ret => {
            if (ret.code == 200) {
              layer.msg("提交成功！");              
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
        }).catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
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
        storehouse('').then(ret => {//仓房
            if (ret.code == 200) {
              // console.log(JSON.stringify(ret))
              vm.storehouseList = ret.data.dataList;
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
        }).catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
        });
        grainNature({}).then(ret => {//粮食性质
            if (ret.code == 200) {
              // console.log(JSON.stringify(ret))
              vm.grainNatureList = ret.data.dataList;
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
      $('#startTime').val(this.$route.query.startTime);
      $('#endTime').val(this.$route.query.endTime);
      vm.getList(1);
      vm.getDropDown();

    }
  };
</script>
