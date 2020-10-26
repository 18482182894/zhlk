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
              <span v-if="postData.lossOverflowId">
                损溢编号：
                <input type="text" class="input-text" v-model="submitData.lossOverflowId" />
              </span>
              <span>
                仓房：
                <select
                  name
                  class="select-style"
                  v-model="storehouse"
                  @change="getWarehouse(1,storehouse)"
                >
                  <option v-for="item in storehouseList" :value="item" v-text="item.storehouseName"></option>
                </select>
              </span>
              <span>
                廒间：
                <select name class="select-style" v-model="warehouse">
                  <option v-for="item in granaryList" :value="item" v-text="item.warehouseName"></option>
                </select>
              </span>
              <span>
                盘点信息：
                <input
                  type="text"
                  class="input-text"
                  v-model="submitData.inventoryId"
                  readonly="readonly"
                  @click="showPopup();"
                />
              </span>
              <span>
                存粮性质：
                <input
                  type="text"
                  class="input-text"
                  v-model="submitData.grainAttribute"
                  readonly="readonly"
                />
              </span>
              <span>
                粮食品种：
                <input
                  type="text"
                  class="input-text"
                  v-model="submitData.grainKind"
                  readonly="readonly"
                />
              </span>
              <span>
                损溢数量（千克）：
                <input
                  type="text"
                  class="input-text"
                  v-model="submitData.lossOverflowNumber"
                />
              </span>
              <span>
                损溢率：
                <input type="text" class="input-text" v-model="submitData.lossOverflowRate" />
              </span>
              <span>
                损溢类型：
                <select name class="select-style" v-model="submitData.overflowType">
                  <option value="盘盈">盘盈</option>
                  <option value="盘亏">盘亏</option>
                </select>
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
    <!-- 选择弹出层 -->
    <div class="popup" :style="editPopup==1?'display:block;':''">
      <div class="popup-main planPopup-edit-main operationLog">
        <div class="popup-title">
          <label>选择盘点</label>
          <em class="popup-close" @click="closePopup('edit');">×</em>
        </div>
        <div class="popup-content">
          <div class="lookup">
            盘点仓库：
            <select
              name
              class="select-style excision"
              v-model="postListData.storehouseGbCode"
              @change="getWarehouse(2,postListData.warehouseGbCode)"
            >
              <option
                v-for="item in storehouseList"
                :value="item.storehouseGbCode"
                v-text="item.storehouseName"
              ></option>
            </select>
            盘点廒间：
            <select
              name
              class="select-style excision"
              v-model="postListData.warehouseGbCode"
            >
              <option
                v-for="item in granaryList"
                :value="item.warehouseGbCode"
                v-text="item.warehouseName"
              ></option>
            </select>
            盘点时间：
            <input
              type="text"
              class="input-text Wdate"
              onclick="WdatePicker({})"
              id="startTime"
            />至
            <input type="text" class="input-text Wdate" onclick="WdatePicker({})" id="endTime" />

            <div class="btn btn-add" @click="getList(1);">
              <img src="../../../../../static/images/search.png" alt />
              <label>查找</label>
            </div>
          </div>
          <table class="customTable">
            <thead>
              <tr>
                <th style="width: 5%;">
                  <input type="checkbox" />
                </th>
                <th style="width: 5%;">序号</th>
                <th style="width: 10%;">仓库</th>
                <th style="width: 15%;">廒间</th>
                <th style="width: 8%;">账面数量(千克)</th>
                <th style="width: 8%;">实际数量(千克)</th>
                <th style="width: 8%;">损溢数量(千克)</th>
                <th style="width: 5%;">损溢率</th>
                <th style="width: 8%;">盘点人</th>
                <th style="width: 10%;">盘点时间</th>
                <th style="width: 8%;">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,i) in listData">
                <td>
                  <input type="checkbox" />
                </td>
                <td v-text="i+1"></td>
                <td v-text="item.storehouseName"></td>
                <td v-text="item.warehouseName"></td>
                <td v-text="item.accountsInventoryWeight"></td>
                <td v-text="item.realInventoryWeight"></td>
                <td v-text="item.lossOverflowNumber"></td>
                <td v-text="item.lossOverflowRate"></td>
                <td v-text="item.inventoryPerson"></td>
                <td v-text="item.inventoryDate"></td>
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
</template>

<script>
import {
  profitAndLossAdd,
  profitAndLossDetail,
  profitAndLossEdit
} from "@/api/business/warehousingStock/profitAndLoss";
import { stockChecksCheck } from "@/api/business/warehousingStock/stockChecks";
import { storehouse, granary, grainNature } from "@/api/systemManage/dropDown";
import { fetchWarehouse } from "@/api/intelligentWarehous/quantityDetection";
import { grainDetail } from "@/api/systemManage/basicData/grainVarieties";
export default {
  name: "warehouseEdit",
  data() {
    return {
      postData: {
        lossOverflowId: ""
      },
      postListData: {
        storehouseGbCode: "",
        warehouseGbCode: "",
        startTime: "",
        endTime: "",
        pageSize: 5,
        pageNo: 0
      },
      listData: [],
      storehouse: '',
      warehouse:'',
      submitData: {
        lossOverflowId: "",
        storehouseName: "",
        storehouseGbCode: "",
        warehouseGbCode: "",
        warehouseName: "",
        inventoryId: "",
        grainAttribute: "",
        grainKind: "",
        lossOverflowNumber: "",
        lossOverflowRate: "",
        overflowType: "",
        storagehouseAccountNo: ""
      },
      storehouseList: "", //仓房下拉
      granaryList: "", //廒间
      editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
      subGrainAttribute: '',
      subGrainKind: ''

    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      profitAndLossDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            console.log(ret)
            vm.submitData.lossOverflowId =
              ret.data.lossOverflowDetail.lossOverflowId;
            // vm.submitData.storehouseName = ret.data.lossOverflowDetail.storehouseName;
            // vm.submitData.storehouseGbCode = ret.data.lossOverflowDetail.storehouseGbCode;
            // vm.submitData.warehouseGbCode = ret.data.lossOverflowDetail.warehouseGbCode;
            // vm.submitData.warehouseName = ret.data.lossOverflowDetail.warehouseName;
            vm.storehouse = {
              storehouseGbCode: ret.data.lossOverflowDetail.storehouseGbCode,
              storehouseName: ret.data.lossOverflowDetail.storehouseName
            };
            vm.warehouse = {
              warehouseGbCode: ret.data.lossOverflowDetail.warehouseGbCode,
              warehouseName: ret.data.lossOverflowDetail.warehouseName
            };
            vm.submitData.inventoryId = ret.data.lossOverflowDetail.inventoryId;
            vm.submitData.grainAttribute =
              ret.data.lossOverflowDetail.grainAttribute;
            vm.submitData.grainKind = ret.data.lossOverflowDetail.grainKind;
            vm.submitData.lossOverflowNumber =
              ret.data.lossOverflowDetail.lossOverflowNumber;
            vm.submitData.lossOverflowRate =
              ret.data.lossOverflowDetail.lossOverflowRate;
            vm.submitData.overflowType =
              ret.data.lossOverflowDetail.overflowType;
            vm.submitData.storagehouseAccountNo =
              ret.data.lossOverflowDetail.storagehouseAccountNo;
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
      vm.submitData.storehouseGbCode = vm.storehouse.storehouseGbCode;
      vm.submitData.storehouseName = vm.storehouse.storehouseName;
      vm.submitData.warehouseGbCode = vm.warehouse.warehouseGbCode;
      vm.submitData.warehouseName = vm.warehouse.warehouseName;
      vm.submitData.grainAttribute = vm.subGrainAttribute;
      vm.submitData.grainKind = vm.subGrainKind;
    
      if (vm.submitData.storehouseGbCode == "") {
        layer.msg("请选择仓房");
        return;
      }
      if (vm.submitData.warehouseGbCode == "") {
        layer.msg("请选择廒间");
        return;
      }
      if (vm.submitData.inventoryId == "") {
        layer.msg("请选择盘点信息");
        return;
      }
      if (vm.submitData.overflowType == "") {
        layer.msg("请选择损益类型");
        return;
      }

      console.log(JSON.stringify(vm.submitData));
      if (this.$route.query.type == "edit") {
        layer.load(2);
        profitAndLossEdit(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("编辑损益成功！");
              this.$router.push({
                name: "profitAndLoss"
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
        profitAndLossAdd(vm.submitData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("新增损益成功！");
              this.$router.push({
                name: "profitAndLoss"
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
      if (vm.warehouse == "") {
        layer.msg("请选择廒间");
        return;
      }
      vm.getList(1);
      vm.editPopup = 1;
    },
    closePopup: function() {
      // 隐藏弹出层
      var vm = this;
      vm.editPopup = 0;
    },
    getList: function(pageNo) {
      //获取盘点列表
      var vm = this;
      vm.postListData.pageNo = pageNo;
      console.log(JSON.stringify(vm.storehouse));
      console.log(JSON.stringify(vm.warehouse));
      vm.postListData.storehouseGbCode = vm.storehouse.storehouseGbCode;
      vm.postListData.warehouseGbCode = vm.warehouse.warehouseGbCode;
      layer.load(2);
      stockChecksCheck(vm.postListData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.inventoryList;
            for (var i in vm.listData) {
              const inventoryTime = vm.listData[i].inventoryDate.slice(0, 10);
              vm.listData[i].inventoryDate = inventoryTime;
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
    checkDocument: function(data) {
      //选择盘点
      var vm = this;
      console.log(JSON.stringify(data));
      vm.submitData.inventoryId = data.inventoryId;
      // vm.submitData.grainAttribute=data.grainAttribute;
      // vm.submitData.grainKind=data.grainKind;
      vm.submitData.lossOverflowNumber = data.lossOverflowNumber;
      vm.submitData.lossOverflowRate = data.lossOverflowRate;
      vm.closePopup();
    },
    getWarehouse: function(num, data) {
      var vm = this;
      if (num == 1) {
        var id = data.storehouseGbCode;
		// vm.storehouse=this.$route.query.storehouseGbCode;
      } else {
        var id = data;
      }
      granary(id)
        .then(ret => {
          //廒间
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.granaryList = ret.data.dataList;
			// vm.warehouse=this.$route.query.warehouseGbCode;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getDropDown: function() {
      //获取下拉项
      var vm = this;
      storehouse("")
        .then(ret => {
          //仓房
          if (ret.code == 200) {
            // console.log(JSON.stringify(ret))
            vm.storehouseList = ret.data.dataList;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    detailBack: function() {
      this.$router.back(-1);
    }
  },
  watch: {
    warehouse(newCode, oldCode) {
      // 监听廒间code变化，根据廒间获取相应信息
      fetchWarehouse({ warehouseGbCode: newCode.warehouseGbCode })
        .then(ret => {
          if (ret.code == 200) {
            var vm = this;
            vm.listData = ret.data.dataMap;
            grainNature({})
              .then(ret => {
                //粮食性质
                if (ret.code == 200) {
                  // console.log(JSON.stringify(ret))
                  vm.grainNaturelList = ret.data.dataList;
                  for (var i = 0; i < vm.grainNaturelList.length; i++) {
                    //粮食性质
                    if (
                      vm.grainNaturelList[i].dicInfoCode ==
                      vm.submitData.grainAttribute
                    ) {
                      vm.submitData.grainAttribute =
                        vm.grainNaturelList[i].dicInfoValue;
                    }
                  }
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
            grainDetail({ grainVarietyId: ret.data.dataMap.grainKind })
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  vm.submitData.grainKind =
                    ret.data.grainVariety.grainVarietyName;
                } else {
                  layer.alert(err.message, { closeBtn: 0 });
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
            vm.submitData.grainAttribute = this.listData.grainAttribute;
            vm.submitData.grainKind = this.listData.grainKind;
            vm.subGrainAttribute = this.listData.grainAttribute;
            vm.subGrainKind = this.listData.grainKind;
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    }
  },
  mounted() {
    var vm = this;
    vm.getDropDown();
    if (this.$route.query.type == "edit") {
      vm.getDetail();
      vm.postData.lossOverflowId = this.$route.query.id;
    } else {
      vm.submitData.storagehouseAccountNo = this.$route.query.id;
    }
  }
};
</script>
