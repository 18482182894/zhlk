<template>
  <div class="content">
    <div class="menuManage operationLog priceManage">
      <div class="lookup">
        <div class="btn btn-add"  @click="getList(0);">
          <img src="../../../../static/images/search.png" alt="">
          <label>查找</label>
        </div>
      </div>
      <div>
        <div class="btn btn-add" @click="jumpEdit();">
          <img src="../../../../static/images/add.png" alt="">
          <label>新增</label>
        </div>
        <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value="">排序方式</option>
          <option value="0">正序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
        <tr>
          <th style="width:1.5%;"><input type="checkbox" v-model="allChecked" @change="checkAll();"></th>
          <th style="width:1.5%;">序号</th>
          <th style="width:2.5%;">事故编码</th>
          <th style="width:2.5%;">事故发生时间</th>
          <th style="width:2.5%;">事故发生地点</th>
          <th style="width:2.5%;">事故类别</th>
          <th style="width:2.5%;">事故性质</th>
          <th style="width:2.5%;">事故负责人</th>
          <th style="width:2%;">事故经过</th>
          <th style="width:3.2%;">事故损失及危害</th>
          <th style="width:2.5%;">防范措施</th>
          <th style="width:3.2%;">会议时间</th>
          <th style="width:2.5%;">会议地点</th>
          <th style="width:2.5%;">记录人</th>
          <th style="width:2.5%;">主持人</th>
          <th style="width:2.5%;">参会人员</th>
          <th style="width:2.5%;">事故主要负责人</th>
          <th style="width:2.5%;">事故次要负责人</th>
          <th style="width:2%;">事故原因分析</th>
          <th style="width:2.5%;">处理意见</th>
          <th style="width:2.5%;">备注</th>
          <th style="width:2.5%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox" :value="item.planList"></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td v-text="item.sgbh"></td>
          <td v-text="item.sgfssj" ></td>
          <td v-text="item.sgfsdd"></td>
          <td v-text="item.sglb"></td>
          <td v-text="item.sgxz"></td>
          <td v-text="item.sgfzr"></td>
          <td v-text="item.sgjg"></td>
          <td v-text="item.sgss"></td>
          <td v-text="item.ffcs"></td>
          <td v-text="item.hysj"></td>
          <td v-text="item.hydd"></td>
          <td v-text="item.jlr"></td>
          <td v-text="item.zcr"></td>
          <td v-text="item.chry"></td>
          <td v-text="item.zyfzr"></td>
          <td v-text="item.cyfzr"></td>
          <td v-text="item.sgyy"></td>
          <td v-text="item.clyj"></td>
          <td v-text="item.bz"></td>
          <td>
            <div class="table-btn btn-green" @click="modifyData(item.id);">编辑</div>
            <div class="table-btn btn-red" @click="delData(item.id);">删除</div>
            <div class="table-btn btn-yellow" @click="jumpDetail(item.id);">详情</div>
          </td>
        </tr>
        </tbody>
      </table>
      <!--&lt;!&ndash; 分页容器 &ndash;&gt;-->
      <div id="PageBar"></div>
    </div>
  </div>
</template>

<script>
  import {accidentList,accidentDel} from "../../../api/safetyTraining/accidentAccount";

  export default {
    name: "accidentAccount",
    data() {
      return {
        sortOrder: "0", //0 顺序，1 倒序
        postData: {
          pageSize: 10,
          pageNo:this.$route.query.pageNo ?  this.$route.query.pageNo : 0
        },
        allChecked: false,
        listData: []
      };
    },
    methods: {
      changeSortOrder: function() {//倒序
        var vm = this;
        vm.listData.reverse();
      },
      getList: function(pageNo) {//获取列表
        var vm = this;
        vm.postData.pageNo = pageNo;
        layer.load(2);
        accidentList(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.listData = ret.data.dataList;
              console.log (vm.listData);
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
      jumpDetail: function(id) {
        //跳转到详情
        var vm = this;
        this.$router.push({
          name: "accidentAccountDetail",
          query: {
            id:id
          }
        });
      },
      jumpEdit: function() {
        //跳转到编辑或新增页面
        var vm = this;
        this.$router.push({
          name: "accidentAccountEdit",
          query: {}
        });
      },
      delData: function(id) {
        //删除
        var vm = this;
        layer.confirm('确定删除？', {
          btn: ['确定','取消'] //按钮
        }, function(){
          layer.load(2);
          //var delStr = vm.planIdList.join(",");
          accidentDel({id:id})
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                layer.msg("删除成功！");
                vm.postData.pageNo = 1;
                vm.getList(vm.postData.pageNo);
              } else {
                layer.alert(ret.data, { closeBtn: 0 });
              }
            })
            .catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
            });
          },
        );

      },
      modifyData:function (id) {
        //跳转到编辑或新增页面
        var vm = this;
        this.$router.push({
          name: "accidentAccountEdit",
          query: {
            id:id
          }
        });
      }
    },
    mounted() {
      this.getList(this.postData.pageNo);
    }
  };
</script>

