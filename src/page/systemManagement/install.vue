<template>
  <div class="menuManage operationLog">
    <div>
      <div class="btn btn-add" @click="getList(0);">
        <img src="../../../static/images/search.png" alt="">
        <label>查找</label>
      </div>
    </div>
    <div class="lookup">
      操作时间：
      <input type="text" class="select-time Wdate" onclick="WdatePicker({maxDate:'%y-%M-%d'})" id="startTime" >
      至
      <input type="text" class="select-time Wdate excision" onclick="WdatePicker({maxDate:'%y-%M-%d'})" id="endTime" >
      操作人：
      <input type="text" class="select-time" v-model="postData.userName" >
    </div>
</template>

<script>
    export default {
        name: "install"
    }
    from '@/api/login'
    export default {
      name: 'roleManage',
      data () {
        return {
          postData:{
            startTime:'',
            endTime:'',
            userName:'',
            pageSize:10,
            pageNo:0
          },
          listData:'',
          sortOrder:'0',//0 顺序，1 倒序
        }
      },
      methods: {
        changeSortOrder:function () {
          var vm=this;
          vm.listData.reverse();
        },
        getList:function (pageNo) {//获取列表
          var vm=this;
          vm.postData.pageNo=pageNo;
          vm.postData.startTime=$('#startTime').val();
          vm.postData.endTime=$('#endTime').val();
          layer.load(2);
          logList(vm.postData).then(ret=>{
            layer.closeAll('loading');
            if (ret.code==200) {
              vm.listData=ret.data.dataList;
              laypage({//分页
                cont: 'PageBar',//容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                pages: ret.page.totalPages,//通过后台拿到的总页数
                curr:pageNo,
                skin: '#95C93E',//加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                jump: function (obj, first) {//触发分页后的回调
                  if (!first)//一定要加此判断，否则初始时会无限刷新
                  {
                    vm.getList(obj.curr);
                  }
                }
              });
            }else{
              if (ret.code=='500'&&ret.data=='查询错误，没有数据') {
                vm.listData=[];
              }else{
                layer.alert(ret.data, { closeBtn: 0 });
              }
            }

          }).catch(err=>{
            layer.alert(err.message, { closeBtn: 0 });
          });
        }
      },
      mounted () {
        var vm=this;
        vm.getList(0);
      },
    }
</script>

<style scoped>

</style>
