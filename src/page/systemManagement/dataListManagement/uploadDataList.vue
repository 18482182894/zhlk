<template>
  <div class="content">
    <div class="menuManage operationLog priceManage">
      <div class="lookup">
        上传表编号：
        <input type="text" class="input-text excision" v-model="postData.tableNumber" ref="hyzt"/>
        <span class="notice" v-if="isShow">*请选择上传表类型</span>
        上传表类型：
        <select v-model="postData.tableType" class="select-style">
          <option value="0">基础数据</option>
          <option value="1">业务数据</option>
        </select>
        上传开始时间：
        <input
          type="text"
          class="input-text Wdate"
          onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"
          id="startDate"
        >
        上传结束时间
        <input
          type="text"
          class="input-text Wdate excision"
          onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"
          id="endDate"
        >

        <div class="btn btn-add" @click="getList(0);">
          <img src="../../../../static/images/search.png" alt>
          <label>查找</label>
        </div>
      </div>
      <div>
        <select name class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value>排序方式</option>
          <option value="0">正序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
          <tr>
            <th style="width:5%;"><input type="checkbox"></th>
            <th style="width:5%;">序号</th>
            <th style="width:7.5%;">上传类型</th>
            <th style="width:7.5%;">上传表名</th>
            <th style="width:7.5%;">上传表编号</th>
            <th style="width:7.5%;">是否成功</th>
            <th style="width:10%;">上传时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in listData">
            <td><input type="checkbox" ></td>
            <td v-if="sortOrder=='0'" v-text="i+1"></td>
            <td v-else v-text="listData.length-i"></td>
            <td v-text="item.tableType"></td>
            <td v-text="item.tableName"></td>
            <td v-text="item.tableNumber"></td>
            <td v-text="item.successful"></td>
            <td v-text="item.uploadingTime"></td>
          </tr>
        </tbody>
      </table>
      <!--&lt;!&ndash; 分页容器 &ndash;&gt;-->
      <div id="PageBar"></div>
    </div>
  </div>
</template>
<style type="text/css" scoped>
  .select-style{
    margin-right: 4rem;
  }
  .notice{
    color: red;
  }
  .Wdate{
    margin-right: 4rem;
  }
</style>
<script>
import { getUploadDataList } from '@/api/systemManage/dataListManagement'
export default {
  name: 'uploadDataList',
  data () {
    return {
      sortOrder: "0", //0 顺序，1 倒序
      postData: {
        tableType: '',
        tableNumber: '',
        startDate: '',
        endDate: '',
        pageSize: 10,
        pageNo:this.$route.query.pageNo ?  this.$route.query.pageNo : 0
      },
      listData: [],
      isShow: false
    }
  },
  methods: {
    changeSortOrder: function() {
      //倒序
      var vm = this;
      vm.listData.reverse();
    },
    getList: function(pageNo) {
      // 获取列表
      var vm = this;
      vm.postData.pageNo = pageNo;
      vm.postData.startDate=$('#startDate').val();
      vm.postData.endDate=$('#endDate').val();
      if (vm.postData.tableNumber.length > 0 && vm.postData.tableType.length == 0) {
        this.isShow = true
        return
      }
      layer.load(2);
      getUploadDataList(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
              vm.listData = ret.data.dataList;
              console.log(vm.listData)
              for(var i in vm.listData) {
                if(vm.listData[i].tableType == 1) {
                  vm.listData[i].tableType = '业务数据'
                } if(vm.listData[i].tableType == 0) {
                  vm.listData[i].tableType = '基础数据'
                } if(vm.listData[i].successful == 1) {
                  vm.listData[i].successful = '失败'
                } if(vm.listData[i].successful == 0) {
                  vm.listData[i].successful = '成功'
                }
              }
              vm.isShow = false
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
    }

  },
  mounted () {
    this.getList(0)
  }
}

</script>
