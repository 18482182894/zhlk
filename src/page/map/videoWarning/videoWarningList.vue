<template>
  <div class="content">
    <div class="menuManage operationLog company">
      <div class="lookup">
        报警类型：
        <select name="" class="select-style excision"  v-model="postData.warningType">
            <option value="" >请选择</option>
            <option value="非法入侵" >非法入侵</option>
            <option value="视频丢失" >视频丢失</option>
            <option value="摄像头遮挡" >摄像头遮挡</option>
            <option value="越界侦测" >越界侦测</option>
            <option value="区域入侵" >区域入侵</option>
            <option value="信号丢失" >信号丢失</option>
            <option value="图像模糊" >图像模糊</option>
            <option value="亮度异常" >亮度异常</option>
            <option value="图像偏色" >图像偏色</option>
            <option value="雪花噪声" >雪花噪声</option>
            <option value="条纹干扰" >条纹干扰</option>
            <option value="画面冻结" >画面冻结</option>
            <option value="PTZ失控" >PTZ失控</option>
        </select>
        
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
          <th style="width:2.5%;"><input type="checkbox" ></th>
          <th style="width:2.5%;">序号</th>
          <th style="width: 10%;">录像机</th>
          <th style="width: 7%;">通道号</th>
          <th style="width: 7%;">摄像头编号</th>
          <th style="width: 7%;">摄像头位置</th>
          <th style="width: 5%;">报警类型</th>
          <th style="width: 10%;">报警时间</th>
          <th style="width: 15%;">报警原因</th>

          <th style="width: 15%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
            <td><input type="checkbox" ></td>
            <td v-if="sortOrder=='0'" v-text="i+1"></td>
            <td v-else v-text="listData.length-i"></td>
            <td v-text="item.dvrName"></td>
            <td v-text="item.channelNo"></td>
            <td v-text="item.camereCode"></td>
            <td v-text="item.storehouseInside"></td>
            <td v-text="item.warningType"></td>
            <td v-text="item.warningDatetime"></td>
            <td v-text="item.warningReason"></td>
            <td>
                <div class="table-btn btn-yellow" @click="jumpDetail(item.warningId);">详情</div>
                <div class="table-btn btn-green" @click="jumpEdit(item.warningId);">编辑</div>
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
import {ListVideoAlarm} from "../../../api/map/map";
    export default {
        name: "videoWarningList",
      data() {
        return {
          allChecked: false,
          sortOrder: "0", //0 顺序，1 倒序
          postData:{
              warningType:this.$route.query.warningType,
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
          ListVideoAlarm(vm.postData)
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
            name: "videoWarningEdit",
            query: {
              id: id,
			  warningType:vm.postData.warningType,
			  pageNo:vm.postData.pageNo
            }
          });
        },
        jumpDetail: function(id) {
          var vm = this;
          this.$router.push({
            name: "videoWarningDetail",
            query: {
              id:id,
			  warningType:vm.postData.warningType
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

