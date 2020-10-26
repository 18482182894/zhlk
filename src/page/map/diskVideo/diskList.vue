<template>
  <div class="content">
    <div class="menuManage operationLog company">
      <div class="lookup">
        硬盘录像机名称：
        <input type="text" class="input-text excision" v-model="postData.dvrName">
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
              <th style="width: 10%;">硬盘录像机名称</th>
              <th style="width: 10%;">硬盘录像机IP</th>
              <th style="width: 10%;">硬盘录像机端口</th>
              <th style="width: 10%;">摄像头数量</th>
              <th style="width: 5%;">是否流媒体</th>
              <th style="width: 20%;">操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,i) in listData">
                <td><input type="checkbox" ></td>
                <td v-if="sortOrder=='0'" v-text="i+1"></td>
                <td v-else v-text="listData.length-i"></td>
                <td v-text="item.dvrName"></td>
                <td v-text="item.dvrIp"></td>
                <td v-text="item.dvrPort"></td>
                <td v-text="item.videoCamera"></td>
                <td v-text="item.streamingMedia==1?'是':'否'"></td>
                <td>
                    <div class="table-btn btn-yellow" @click="jumpDetail(item.dvrCode);">详情</div>
                    <div class="table-btn btn-green" @click="jumpEdit(item.dvrCode);">编辑</div>
                    <!-- <div class="table-btn btn-red" @click="delData(item.dvrCode);">删除</div> -->
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
import {ListDigitalVideoRecorder, } from "../../../api/map/map";
    export default {
        name: "diskList",
      data() {
        return {
          allChecked: false,
          sortOrder: "0", //0 顺序，1 倒序
          postData:{
              dvrName:this.$route.query.dvrName,
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
          vm.postData.pageNo = pageNo ;
          layer.load(2);
          ListDigitalVideoRecorder(vm.postData)
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
        // delData: function(id) {
        //   //删除
        //   var vm = this;
        //   vm.delList.enterpriseCode = id;
        //   layer.load(2);
        //   layer.confirm('确定删除？', {
        //     btn: ['确定','取消'] //按钮
        //   }, function(){
        //     companyDel(vm.delList)
        //       .then(ret => {
        //         layer.closeAll("loading");
        //         if (ret.code == 200) {
        //           layer.msg("删除成功！");
        //           vm.delList.enterpriseCode = "";
        //           vm.getList(1);
        //         } else {
        //           layer.alert(ret.data, { closeBtn: 0 });
        //         }
        //       })
        //       .catch(err => {
        //         layer.alert(err.message, { closeBtn: 0 });
        //       });
        //   });
        // },
        jumpEdit: function(id) {
          var vm = this;
          this.$router.push({
            name: "diskEdit",
            query: {
              id: id,
			  dvrName:vm.postData.dvrName,
			  pageNo:vm.postData.pageNo
            }
          });
        },
        jumpDetail: function(id) {
          var vm = this;
          this.$router.push({
            name: "diskDetail",
            query: {
              id: id,
			  dvrName:vm.postData.dvrName,
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

