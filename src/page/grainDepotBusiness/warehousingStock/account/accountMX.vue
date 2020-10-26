<template>
    <div class="content">
        <div class="account-qh">
          <div :class="editPopup==0?'account-item account-on':'account-item'">
            本期入仓详情
          </div>
          <div :class="editPopup==1?'account-item account-on':'account-item'">
            本期出仓详情
          </div>
        </div>
        <div v-if="editPopup==0" class="menuManage operationLog company">
            <div>
                <div class="btn btn-add">
                    <img src="../../../../../static/images/search.png" alt="">
                    <label>查找</label>
                </div>
            </div>
            <div class="lookup">
                入库时间：
                <input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})" id="startDate">
                入库类型：
                <select name="" class="select-style excision" >
                    <option v-text=""></option>
                </select>
            </div>
            <div>
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
                        <th style="width: 10%;">结算单号</th>
                        <th style="width: 5%;">入库类型</th>
                        <th style="width: 5%;">粮食品种</th>
                        <th style="width: 5%;">入库重量</th>
                        <th style="width: 5%;">入库时间</th>
                        <th style="width: 30%;">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- <tr v-for="(item,i) in listData">
                        <td><input type="checkbox" ></td>
                        <td v-if="sortOrder=='0'" v-text="i+1"></td>
                        <td v-else v-text="listData.length-i"></td>
                        <td v-text="item.enterpriseName"></td>
                        <td v-text="item.enterpriseCode"></td>
                        <td v-text="item.enterpriseProperty"></td>
                        <td>
                          <label v-text="item.progress"></label>
                          <br>
                          <div class="planProgress">
                            <div class="planProgress-content" :style="item.progress?'width:'+item.progress:'width:0;'"></div>
                          </div>
                        </td>
                        <td v-text="item.businessType"></td>
                        <td v-text="item.relateType"></td>
                        <td>
                            <div class="table-btn btn-yellow" @click="jumpDetail(item.enterpriseCode);">详情</div>
                            <div class="table-btn btn-green" @click="jumpEdit(item.enterpriseCode);">编辑</div>
                            <div class="table-btn btn-red" @click="delData(item.enterpriseCode);">删除</div>
                        </td>
                    </tr> -->
                    <tr>
                      <td><input type="checkbox" ></td>
                      <td>1</td>
                      <td>CF2394949</td>
                      <td>2号</td>
                      <td>小麦</td>
                      <td>储备粮</td>
                      <td>倒仓作业</td>
                      <td>
                        <div class="table-btn btn-yellow" @click="jumpDetail();">详情</div>
                      </td>
                    </tr>
                </tbody>
            </table>            
        </div>
        <div v-else class="menuManage operationLog company">
            <div>
                <div class="btn btn-add">
                    <img src="../../../../../static/images/search.png" alt="">
                    <label>查找</label>
                </div>
            </div>
            <div class="lookup">
                入库时间：
                <input type="text" class="input-text Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})" id="entryDate">
                入库类型：
                <select name="" class="select-style excision" >
                    <option v-text=""></option>
                </select>\
            </div>
            <div>
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
                        <th style="width: 10%;">结算单号</th>
                        <th style="width: 5%;">入库类型</th>
                        <th style="width: 5%;">粮食品种</th>
                        <th style="width: 5%;">入库重量</th>
                        <th style="width: 5%;">入库时间</th>
                        <th style="width: 30%;">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- <tr v-for="(item,i) in listData">
                        <td><input type="checkbox" ></td>
                        <td v-if="sortOrder=='0'" v-text="i+1"></td>
                        <td v-else v-text="listData.length-i"></td>
                        <td v-text="item.enterpriseName"></td>
                        <td v-text="item.enterpriseCode"></td>
                        <td v-text="item.enterpriseProperty"></td>
                        <td>
                          <label v-text="item.progress"></label>
                          <br>
                          <div class="planProgress">
                            <div class="planProgress-content" :style="item.progress?'width:'+item.progress:'width:0;'"></div>
                          </div>
                        </td>
                        <td v-text="item.businessType"></td>
                        <td v-text="item.relateType"></td>
                        <td>
                            <div class="table-btn btn-yellow" @click="jumpDetail(item.enterpriseCode);">详情</div>
                            <div class="table-btn btn-green" @click="jumpEdit(item.enterpriseCode);">编辑</div>
                            <div class="table-btn btn-red" @click="delData(item.enterpriseCode);">删除</div>
                        </td>
                    </tr> -->
                    <tr>
                      <td><input type="checkbox" ></td>
                      <td>1</td>
                      <td>CF2394949</td>
                      <td>2号</td>
                      <td>小麦</td>
                      <td>储备粮</td>
                      <td>倒仓作业</td>
                      <td>
                        <div class="table-btn btn-yellow" @click="jumpDetail();">详情</div>
                      </td>
                    </tr>
                </tbody>
            </table>            
        </div>
    </div>
</template>

<style type="text/css" scoped>
    .operationLog .lookup .excision{
      margin-right: 20px;
    }
</style>
<script>
  import { companyList, companyDel } from "@/api/systemManage/basicData/company";
  import { grainVariety } from "@/api/systemManage/dropDown";
  // import selectGrain from "../../../grainVaiety";
  export default {
    name: "company",
    // components:{selectGrain},
    data() {
      return {
        allChecked: false,
        sortOrder: "0", //0 顺序，1 倒序
        delList: {
          enterpriseCode: ""
        },
        listData: [],
        grainVarietyList:'',//粮食品种下拉
        editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
      };
    },
    methods: {
      getList: function() {
        //获取列表
        var vm = this;
        layer.load(2);
        companyList({})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.listData = ret.data.dataList;
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
        vm.delList.enterpriseCode = id;
        layer.load(2);
        layer.confirm('确定删除？', {
          btn: ['确定','取消'] //按钮
        }, function(){
        companyDel(vm.delList)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("删除成功！");
              vm.delList.enterpriseCode = "";
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
      jumpEdit: function(id) {
        var vm = this;
        this.$router.push({
          name: "stockChecksEdit",
          query: {
            id: id
          }
        });
      },
      jumpDetail: function(id) {
        var vm = this;
        this.$router.push({
          name: "stockChecksDetail",
          query: {
            id: id
          }
        });
      },
      showPopup: function() {// 展示弹出层
          var vm = this;
          vm.getList();
          vm.editPopup = 1;
      },
      closePopup: function() {// 隐藏弹出层
          var vm = this;
          vm.editPopup = 0;
      },
      getDropDown: function() {//获取下拉项
        var vm = this;
        grainVariety({}).then(ret => {//粮食品种
            if (ret.code == 200) {
              console.log(JSON.stringify(ret))
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
      // var vm = this;
      // vm.getList(1);
      // vm.getDropDown();
    }
  };
</script>
