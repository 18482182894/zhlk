<template>
  <div class="content">
    <div class="menuManage operationLog company">
      <div class="lookup">
        摄像头编号：
        <input type="text" class="input-text excision" v-model="postData.cameraCodeCondition">
        
        <div class="btn btn-add" @click="getList(0);">
          <img src="../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div>
        <div class="btn btn-add" @click="jumpEdit();">
          <img src="../../../../static/images/add.png" alt="">
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
              <th style="width: 10%;">摄像头编号</th>
              <th style="width: 10%;">摄像头位置</th>
              <th style="width: 10%;">摄像头IP</th>
              <th style="width: 10%;">硬盘录像机名称</th>
              <th style="width: 5%;">通道名称</th>
              <th style="width: 5%;">是否有效</th>
              <th style="width: 20%;">操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,i) in listData">
                <td><input type="checkbox" ></td>
                <td v-if="sortOrder=='0'" v-text="i+1"></td>
                <td v-else v-text="listData.length-i"></td>
                <td v-text="item.cameraCode"></td>
                <td v-text="item.cameraPosition"></td>
                <td v-text="item.cameraIp"></td>
                <td v-text="item.dvrName"></td>
                <td v-text="item.channelName"></td>
                <td v-text="item.effictiveFlg"></td>
                <td>
                    <div class="table-btn btn-yellow" @click="jumpDetail(item.cameraCode);">详情</div>
                    <div class="table-btn btn-green" @click="jumpEdit(item.cameraCode);">编辑</div>
                </td>
            </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar"></div>
    </div>
  </div>
</template>
<style scoped>

</style>

<script>
import {ListCamera} from "../../../api/map/map";

    export default {
        name: "cameraList",
      data() {
        return {
          allChecked: false,
          sortOrder: "0", //0 顺序，1 倒序
          postData:{
			  cameraCodeCondition:this.$route.query.cameraCodeCondition,
              pageSize:10,
              pageNo:this.$route.query.pageNo!=null?this.$route.query.pageNo:0
          },
          listData: []
        };
      },
      methods: {
        getList: function(pageNo) {
          //获取列表
          var vm = this;
          vm.postData.pageNo=pageNo;
          layer.load(2);
          ListCamera(vm.postData)
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
        jumpEdit: function(id) {
          var vm = this;
          this.$router.push({
            name: "cameraEdit",
            query: {
              cameraCodeCondition:vm.postData.cameraCodeCondition,
			  cameraCode:id,
			  pageNo:vm.postData.pageNo
            }
          });
        },
        jumpDetail: function(id) {
          var vm = this;
          this.$router.push({
            name: "cameraDetail",
            query: {
              cameraCodeCondition:vm.postData.cameraCodeCondition,
			  cameraCode:id,
			  pageNo:vm.postData.pageNo
            }
          });
        }
      },
      mounted() {
        var vm = this;
        vm.getList(vm.postData.pageNo);
      }
    };
</script>

