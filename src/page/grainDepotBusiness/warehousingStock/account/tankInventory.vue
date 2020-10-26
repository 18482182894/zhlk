<template>
  <div class="content">
    <div class="menuManage operationLog company">
      <div>
        <select
          name=""
          class="select-style"
          v-model="sortOrder"
          @change="changeSortOrder()"
        >
          <option value="">排序方式</option>
          <option value="0">顺序</option>
          <option value="1">倒序</option>
        </select>
        <table class="customTable">
          <thead>
            <tr>
              <th style="width: 5%"><input type="checkbox" /></th>
              <th style="width: 5%">序号</th>
              <th style="width: 10%">油罐</th>
              <th style="width: 10%">粮油品种</th>
              <th style="width: 10%">高度(米)</th>
              <th style="width: 10%">容量(千克)</th>
              <th style="width: 10%">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in listData" :key="i">
              <td><input type="checkbox" /></td>
              <td v-if="sortOrder == '0'" v-text="i + 1"></td>
              <td v-else v-text="listData.length - i"></td>
              <td v-text="item.oilcanName"></td>
              <td v-text="item.oilVariety"></td>
              <td v-text="item.ladeLineHeight"></td>
              <td v-text="item.remark"></td>
              <td>
                <div
                  class="table-btn btn-yellow"
                  @click="jumpDetail(item.initialTimeMonth)"
                >
                  出入库明细
                </div>
                <div class="table-btn btn-green" @click="jumpEdit(item)">
                  油罐编辑
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- 分页容器 -->
        <div id="PageBar"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { tankInventoryData } from "@/api/business/warehousingStock/account";
import { grainVariety } from "@/api/systemManage/dropDown";
export default {
  data() {
    return {
      postData: {
        pageSize: 10,
        pageNo: 1,
      },
      listData: [],
      oilVarieties: {},
      sortOrder: "0", //0 顺序，1 倒序
      oilVarietyList: [],
    };
  },
  methods: {
    getList(pageNo) {
      this.postData.pageNo = pageNo;
      layer.load(2);
      tankInventoryData(this.postData)
        .then((ret) => {
          layer.closeAll("loading");
          if (ret.code == "200") {
            this.listData = ret.data.dataList;
            this.getGrainVariety();
            laypage({
              //分页
              cont: "PageBar", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
              pages: ret.page.totalPages, //通过后台拿到的总页数
              curr: pageNo,
              skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
              jump: function (obj, first) {
                //触发分页后的回调
                if (!first) {
                  //一定要加此判断，否则初始时会无限刷新
                  this.getList(obj.curr);
                }
              },
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
        .catch((err) => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    changeSortOrder() {
      this.listData.reverse();
    },
    getGrainVariety() {
      grainVariety({})
        .then((ret) => {
          if (ret.code == "200") {
            const oilList = ret.data.grainVarietyList[1];
            this.oilVarieties = oilList.children[0];
            this.getLeafKeys(this.oilVarieties, this.oilVarietyList);
            this.listData.forEach((item) => {
              this.oilVarietyList.forEach((el) => {
                if (item.oilVariety == el.id) {
                  item.oilVariety = el.name;
                }
              });
            });
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch((err) => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    // 递归获取末端节点的id和label名称
    getLeafKeys(node, arr) {
      if (node.children == "") {
        const obj = {};
        obj.name = node.label;
        obj.id = node.id;
        return arr.push(obj);
      }
      node.children.forEach((item) => {
        this.getLeafKeys(item, arr);
      });
    },
    jumpEdit(data) {
      this.listData.forEach((item) => {
        this.oilVarietyList.forEach((el) => {
          if (item.oilVariety == el.name) {
            item.oilVariety = el.id;
          }
        });
      });
      this.$router.push({
        name: "tankInventoryEdit",
        query: {
          data: JSON.stringify(data),
        },
      });
    },
  },
  created() {
    this.getList(1);
  },
};
</script>

<style scoped>
</style>
