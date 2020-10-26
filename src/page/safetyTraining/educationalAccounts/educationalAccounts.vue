<template>
  <div class="content">
    <div class="menuManage operationLog priceManage">
      <div class="lookup">
        <div class="btn btn-add" @click="getList(0);">
          <img src="../../../../static/images/search.png" alt>
          <label>查找</label>
        </div>
      </div>
      <div>
        <div class="btn btn-add" @click="jumpEdit();">
          <img src="../../../../static/images/add.png" alt>
          <label>新增</label>
        </div>
        <select name class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value>排序方式</option>
          <option value="0">正序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
          <tr>
            <th style="width:2.5%;">
              <input type="checkbox" v-model="allChecked" @change="checkAll();">
            </th>
            <th style="width:2.5%;">序号</th>
            <th style="width:5%;">安全培训教育编码</th>
            <th style="width:5%;">授课日期</th>
            <th style="width:5%;">库区编号</th>
            <th style="width:5%;">授课人姓名</th>
            <th style="width:5%;">安全教育内容</th>
            <th style="width:5%;">参加人姓名</th>
            <th style="width:5%;">性别</th>
            <th style="width:5%;">工作年限</th>
            <th style="width:5%;">证件名称</th>
            <th style="width:5%;">证件号码</th>
            <th style="width:5%;">现任岗位</th>
            <th style="width:5%;">培训时间</th>
            <th style="width:5%;">发证单位</th>
            <th style="width:5%;">备注</th>
            <th style="width:20%;">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in listData">
            <td>
              <input
                type="checkbox"
                :value="item.id"
                v-model="delList.accountList"
                @change="clickChange();"
              >
            </td>
            <td v-if="sortOrder=='0'" v-text="i+1"></td>
            <td v-else v-text="listData.length-i"></td>
            <td v-text="item.aqpxjybh"></td>
            <td v-text="item.rq"></td>
            <td v-text="item.kqbh"></td>
            <td v-text="item.skrxm"></td>
            <td v-text="item.aqjynr"></td>
            <td v-text="item.xm"></td>
            <td v-text="item.xb"></td>
            <td v-text="item.gznx"></td>
            <td v-text="item.zjmc"></td>
            <td v-text="item.zjhm"></td>
            <td v-text="item.xrgw"></td>
            <td v-text="item.pxsj"></td>
            <td v-text="item.fzdw"></td>
            <td v-text="item.bz"></td>
            <td>
              <div
                class="table-btn btn-green"
                @click="jumpEdit(item.id);"
              >编辑</div>
              <div
                class="table-btn btn-red"
                @click="delData(item.id);"
              >删除</div>
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

<style scoped>
  .table-btn {
    min-width: 36px;
    padding: 0 9px;
  }
</style>
<script>
  import { 
    getEducationalAccountList,
    delEducationalAccount
  } from '../../../api/safetyTraining/educationalAccounts'
  export default {
    name: 'educationalAccounts',
    data () {
      return {
        sortOrder: "0", //0 顺序，1 倒序
        postData: {
          pageSize: 10,
          pageNo: this.$route.query.pageNo ?  this.$route.query.pageNo : 0,
        },
        allChecked: false,
        delList: {
          accountList: []
        },
        listData: []
      }
    },
    methods: {
      changeSortOrder: function() {
        //倒序
        this.listData.reverse();
      },
      getList: function(pageNo) {
        //获取列表
        const vm = this
        vm.postData.pageNo = pageNo;
        layer.load(2);
        getEducationalAccountList(this.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.listData = ret.data.dataList;
              for(var i in vm.listData) {
                if(vm.listData[i].xb == 1) {
                  vm.listData[i].xb = '男'
                } else if(vm.listData[i].xb == 2) {
                  vm.listData[i].xb = '女'
                }
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
        checkAll: function() {
          //全选
          if (this.allChecked) {
            for (var i = 0; i < this.listData.length; i++) {
              this.delList.accountList.push(this.listData[i].id);
            }
          } else {
            this.delList.accountList = [];
          }
        },
        clickChange: function() {
          //监听input选中状态，控制全选input的选中
          if (this.delList.accountList.length == this.listData.length) {
            this.allChecked = true;
          } else {
            this.allChecked = false;
          }
        },
        delData: function(id) {
          //删除
          var vm = this;
          layer.confirm('确定删除？', {
            btn: ['确定','取消'] //按钮
          },
          function(){
            layer.load(2);
            //var delStr = vm.planIdList.join(",");
            delEducationalAccount({id:id})
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
        jumpDetail: function(id) {
          //跳转到详情
          this.$router.push({
            name: "educationalAccountDetail",
            query: {
              id: id
            }
          })
        },
        jumpEdit: function(id) {
          //跳转到编辑或者新增页面
          this.$router.push({
            name: "educationalAccountEdit",
            query: {
              pageNo: this.postData.pageNo,
              id: id
            }
          })
        },
      },
      mounted () {
        this.getList(this.postData.pageNo)
      }
    } 
</script>
