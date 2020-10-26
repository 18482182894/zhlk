<template>
  <div class="content">
    <div class="menuManage operationLog priceManage">
      <div class="lookup">
        公告名称
        <input name="" class="select-style excision" v-model="postData.noticeTitle">
        公告类型：
        <select name="" class="select-style excision" v-model="postData.noticeType">
          <option value="1">通知</option>
          <option value="2">通报</option>
          <option value="3">决定</option>
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
        <!--<div class="btn btn-blank" @click="jumpBadRecord();">-->
        <!--<label>不良记录</label>-->
        <!--</div>-->
        <select name="" class="select-style" v-model="sortOrder" @change="changeSortOrder();">
          <option value="">排序方式</option>
          <option value="0">正序</option>
          <option value="1">倒序</option>
        </select>
      </div>
      <table class="customTable">
        <thead>
        <tr>
          <th style="width:2.5%;"><input type="checkbox" v-model="allChecked" @change="checkAll();"></th>
          <th style="width:2.5%;">序号</th>
          <th style="width:5%;">发布人</th>
          <th style="width:5%;">类型</th>
          <th style="width:15%;">标题</th>
          <th style="width:10%;">发布日期</th>
          <th style="width:20%;">有效日期</th>
          <th style="width:5%;">状态</th>
          <th style="width:5%;">编辑状态</th>
          <th style="width:5%;">审核状态</th>
          <th style="width:30%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox" :value="item.noticeId" v-model="delList.noticeIdList" @change="clickChange();"></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td v-text="item.releasePersonName"></td>
          <td>
            <label v-if="item.noticeType==1">通知</label>
            <label v-if="item.noticeType==2">通报</label>
            <label v-if="item.noticeType==3">决定</label>
          </td>
          <td v-text="item.noticeTitle"></td>
          <td v-text="item.releaseDatetime"></td>
          <td v-text="item.effcetiveDate"></td>

          <td v-text="item.noticeStatus"></td>
          <td v-text="item.draftStatus==0?'草稿':'正式文档'"></td>
          <!-- <td v-text="item.customerStatus"></td> -->
          <td>
            <label v-if="item.status==0" class="fc-red">审核不通过</label>
            <label v-if="item.status==10">未审核</label>
            <label v-if="item.status==11" class="fc-green">审核中</label>
            <label v-if="item.status==99" class="fc-green">审核通过</label>
          </td>
          <td>
            <div class="table-btn btn-yellow" @click="jumpDetail(item.noticeId);">详情</div>
            <div class="table-btn btn-green" v-if="item.draftStatus==0" @click="jumpEdit(item.noticeId);">编辑</div>
            <!--<div class="table-btn btn-change" v-if="item.status==99" @click="jumpEdit(item.customerId,'add');">信息变更</div>-->
            <!--<div class="table-btn btn-blood" v-if="item.status==99" @click="jumpBadRecord(item.customerName);">不良记录</div>-->
            <div class="table-btn btn-submit" @click="submitAudit(item.noticeId);" v-if="item.draftStatus==0">提交审核</div>
            <div class="table-btn btn-again" v-if="item.status==0" @click="jumpEdit(item.customerId,'add');">再次申请</div>
            <div class="table-btn btn-red" @click="delData(item.noticeId);" v-if="item.draftStatus==0||item.status==99">删除</div>
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
  import {getNoticeList , deleNotice} from "../../../api/oa/notice";

  export default {
        name: "noticeList",
      data() {
        return {
          sortOrder: "0", //0 顺序，1 倒序
          postData: {
            pageSize: 10,
            noticeTitle:this.$route.query.noticeTitle ?  this.$route.query.noticeTitle : "",
            noticeType:this.$route.query.noticeType ?  this.$route.query.noticeType : "",
            pageNo:this.$route.query.pageNo ?  this.$route.query.pageNo : 0
          },

          // grainVarietyList: "",
          // grainOilLevelList: "",
          // inventoryPropertyList: "",
          allChecked: false,
          delList: {
            noticeIdList: [],
          },
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
          getNoticeList(vm.postData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                vm.listData = ret.data.noticeList;
                for(var i in vm.listData) {
                  const releaseTime = vm.listData[i].releaseDatetime.slice(0,10)
                  const effcetiveTime1 = vm.listData[i].effcetiveDate.slice(0,10)
                  const effcetiveTime2 = vm.listData[i].effcetiveDate.slice(19,20)
                  const effcetiveTime3 = vm.listData[i].effcetiveDate.slice(20,30)
                  vm.listData[i].releaseDatetime = releaseTime
                  vm.listData[i].effcetiveDate = effcetiveTime1 + effcetiveTime2 + effcetiveTime3
                }
                // console.log (JSON.stringify(vm.listData))
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
                  // layer.alert(ret.data, { closeBtn: 0 });
                   layer.open({
                    title: '提示',
                    content: '获取数据失败!'
                  })
                }
              }
            })
            .catch(err => {
              layer.alert(err.message, { closeBtn: 0 });
            });
        },
        delData: function(id) {
          //删除
          var vm = this;
          if (id) {
            vm.delList.noticeIdList = [];
            vm.delList.noticeIdList.push(id);
          } else {
            if (vm.delList.noticeIdList.length == []) {
              layer.msg("请至少选择一条数据！");
              return;
            }
          }
          layer.confirm('确定删除？', {
            btn: ['确定','取消'] //按钮
          }, function(){
            layer.load(2);
            var delStr = vm.delList.noticeIdList.join(",");
            deleNotice({ noticeIdList: delStr })
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  layer.msg("删除成功！");
                  vm.postData.pageNo = 1;
                  vm.getList(1);
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
          }, function(){
          });

        },
        checkAll: function() {
          //全选
          var vm = this;
          if (vm.allChecked) {
            for (var i = 0; i < vm.listData.length; i++) {
              vm.delList.noticeIdList.push(vm.listData[i].noticeId);
            }
          } else {
            vm.delList.noticeIdList = [];
          }
        },
        clickChange: function() {
          //监听input选中状态，控制全选input的选中
          var vm = this;
          if (vm.delList.noticeIdList.length == vm.listData.length) {
            vm.allChecked = true;
          } else {
            vm.allChecked = false;
          }
        },
        jumpDetail: function(id) {
          //跳转到详情
          var vm = this;
          this.$router.push({
            name: "noticeDetail",
            query: {
              id: id,
              noticeTitle_transfer:vm.postData.noticeTitle,
              noticeType_transfer:vm.postData.noticeType,
              pageNo:vm.postData.pageNo
            }
          });
        },
        jumpEdit: function(id) {
          //跳转到编辑或新增页面
          var vm = this;
          this.$router.push({
            name: "noticeEdit",
            query: {
              id: id,
              noticeTitle_transfer:vm.postData.noticeTitle,
              noticeType_transfer:vm.postData.noticeType,
              pageNo:vm.postData.pageNo
            }
          });
        },
        jumpBadRecord:function (name) {//跳转到不良记录
          var vm = this;
          this.$router.push({
            name: "badRecord",
            query: {
              name: name
            }
          });
        }
      },
      mounted() {
        this.getList(this.postData.pageNo);
      }
    };
</script>

<style scoped>

</style>
