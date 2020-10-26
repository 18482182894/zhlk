<template>
  <div class="content">
    <div class="menuManage operationLog company">
      <div class="lookup">
        <span>仓房：</span>
        <select class="select-style excision" v-model="postData.storehouseGbCode">
          <option value>请选择</option>
          <option
            v-for="item in storehouseList"
            :key="item.storehouseGbCode"
            :value="item.storehouseGbCode"
            v-text="item.storehouseName"
          />
        </select>
        <span>廒间：</span>
        <select class="select-style excision" v-model="postData.warehouseGbCode">
          <option value>请选择</option>
          <option
            v-for="item in granaryList"
            :key="item.warehouseGbCode"
            :value="item.warehouseGbCode"
            v-text="item.warehouseName"
          />
        </select>
        <div class="btn btn-add" @click="getList(1)">
          <img src="../../../../static/images/search.png" alt />
          <label>查找</label>
        </div>
      </div>
      <div>
        <div class="btn btn-add" @click="jumpAdd">
          <img src="../../../../static/images/add.png" alt />
          <label>新增</label>
        </div>
        <select name class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value>排序方式</option>
          <option value="0">顺序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
          <tr>
            <th style="width: 5%">
              <input type="checkbox" />
            </th>
            <th style="width: 5%">序号</th>
            <th style="width: 10%">仓房</th>
            <th style="width: 10%">廒间</th>
            <th style="width: 15%">通风类型</th>
            <th style="width：15%">通风创建时间</th>
            <th style="width: 10%">通风负责人</th>
            <th style="width: 30%">操作</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, i) in listData" :key="item.warehouseGbCode">
            <td>
              <input type="checkbox" />
            </td>
            <td v-if="sortOrder=='0'" v-text="i+1"></td>
            <td v-else v-text="listData.length-i"></td>
            <td v-text="item.storehouseName"></td>
            <td v-text="item.warehouseName"></td>
            <td v-text="item.ventilateType"></td>
            <td v-text="item.createTime"></td>
            <td v-text="item.ventilatePerson"></td>
            <td>
              <div class="table-btn btn-yellow" @click="jumpDetail(item.ventilateId)">详情</div>
              <div class="table-btn btn-red" @click="removeRecord(item.ventilateId)">删除</div>
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
import { storehouse, granary } from "@/api/systemManage/dropDown";
import { getAerationList, deleteAerationRecord } from "@/api/intelligentWarehous/aerationList";

export default {
  name: "aerationList",
  data() {
    return {
      sortOrder: "0", //0 顺序，1 倒序
      postData: {
        storehouseGbCode: "",
        warehouseGbCode: "",
        pageSize: 10,
        pageNo: 1
      },
      listData: [],
      storehouseList: [], // 仓房下拉列表
      granaryList: [], // 廒间下拉列表
    };
  },
  methods: {
    changeSortOrder: function () {
      //倒序
      const vm = this;
      vm.listData.reverse();
    },
    getList(pageNo) {
      this.postData.pageNo = pageNo;
      layer.load(2)
      getAerationList(this.postData)
        .then((ret) => {
          layer.closeAll("loading");
          if (ret.code === "200") {
            this.listData = ret.data.DataList;
            this.listData.forEach((item) => {
              if (item.createTime) {
                let aerationCreateTime = item.createTime.slice(0, 10);
                item.createTime = aerationCreateTime;
              }
            });
            laypage({
              // 分页
              cont: "PageBar", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
              pages: ret.page.totalPages, //通过后台拿到的总页数
              curr: pageNo,
              skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
              jump(obj, first) {
                // 触发分页的回调
                if (!first) {
                  // 一定要加此判断，否则初始时会无限刷新
                  this.getList(obj.curr);
                }
              },
            });
          } else {
            if (ret.code == "500" && ret.data == "查询错误，没有数据") {
              layer.msg("暂无数据");
              this.listData = [];
            } else {
              layer.alert(ret.data, { closeBtn: 0 });
            }
          }
        })
        .catch((err) => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    // 获取仓房列表
    getStorehouse() {
      storehouse()
        .then((ret) => {
          if (ret.code == 200) {
            this.storehouseList = ret.data.dataList;
          } else {
            layer.msg("获取仓房信息失败！");
          }
        })
        .catch((err) => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    // 获取廒间列表
    getGranary(code) {
      granary(code)
        .then((ret) => {
          if (ret.code == 200) {
            this.granaryList = ret.data.dataList;
          } else {
            layer.msg("获取廒间信息失败！");
          }
        })
        .catch((err) => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    jumpAdd() {
      this.$router.push({
        name: "addAerationRecord",
      });
    },
    jumpDetail(id) {
      this.$router.push({
        name: "aerationRecordDetail",
        query: {
          id: id
        }
      });
    },
    removeRecord(id) {
      layer.confirm('确定删除？删除后数据不可恢复！', {
        btn: ['确定', '取消']
      }, () => {
        layer.load(2);
        deleteAerationRecord({ventilateId: id})
          .then(ret => {
            layer.closeAll("loading");
            if(ret.code === '200') {
              layer.msg(ret.data.result);
              this.getList(1);
            } else {
              layer.msg('删除记录失败！')
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      })
    },
  },
  watch: {
    "postData.storehouseGbCode"(newCode, oldCode) {
      if (newCode && newCode !== oldCode) {
        this.granaryList = [];
        this.warehouseGbCode = "";
        this.getGranary(newCode);
      }
    },
  },
  mounted() {
    this.getStorehouse();
    this.getGranary(this.postData.storehouseGbCode);
    this.getList(this.postData.pageNo);
  },
};
</script>

<style scoped>
</style>
