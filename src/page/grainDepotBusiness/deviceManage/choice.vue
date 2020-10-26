<template>
  <div class="content">
    <div class="menuManage operationLog ">
      <div class="lookup">
        设备名称：
        <input type="text" class="input-text excision" v-model="postData.equipmentName">
        设备类型：
        <select name="" class="select-style excision" v-model="postData.equipmentType">
          <option value="">设备类型</option>
          <option value="0">计量设备</option>
          <option value="1">仓储设备</option>
        </select>

        
          <div class="btn btn-add" @click="getList(1);">
            <img src="../../../../static/images/search.png" alt="">
            <label>查找</label>
          </div>
      </div>
      <div>
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
          <th style="width:7.5%;">设备名称</th>
          <th style="width:7.5%;">设备类型</th>
          <th style="width:10%;">设备编号</th>
          <th style="width:10%;">设备条码</th>
          <th style="width:10%;">设备型号</th>
          <th style="width:15%;">设备规格</th>
          <th style="width:10%;">入库时间</th>
          <th style="width:10%;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i) in listData">
          <td><input type="checkbox"></td>
          <td v-if="sortOrder=='0'" v-text="i+1"></td>
          <td v-else v-text="listData.length-i"></td>
          <td v-text="item.equipmentName"></td>
          <td v-text="item.equipmentTypeName" ></td>
          <td v-text="item.equipmentId"></td>
          <!--<td v-text="item.debugFee"></td>-->
          <td v-text="item.equipmentCode"></td>
          <td v-text="item.equipmentModel"></td>
          <td v-text="item.equipmentSpecifications"></td>
          <td v-text="item.entryDatetime"></td>
          <td>
            <div class="table-btn btn-yellow" @click="addFlow(item);">选择</div>
          </td>
        </tr>
        </tbody>
      </table>
      <!-- 分页容器 -->
      <div id="PageBar"></div>
    </div>
    <div class="detail-back">
        <button @click="detailBack();">返回</button>
    </div>
  </div>
</template>

<script>
  import { getDeviceListBySelect} from "../../../api/devicesManage/deviceSelect";

  export default {
        name: "choice",
    data() {
      return {
        type:this.$route.query.type,
        sortOrder: "0", //0 顺序，1 倒序
        postData: {
          equipmentName:this.$route.query.equipmentName?this.$route.query.equipmentName:"",
          equipmentType:this.$route.query.equipmentType?this.$route.query.equipmentType:"",
          equipmentId: "",
          equipmentCode: "",
          pageSize: 10,
          name:"choice",
          pageNo:this.$route.query.pageNo?this.$route.query.pageNo:0
        },
        grainVarietyList: "",
        grainOilLevelList: "",
        inventoryPropertyList: "",
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
        getDeviceListBySelect(vm.postData)
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.listData = ret.data.dataList;
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
                layer.alert(ret.data, { closeBtn: 0 });
              }
            }
          })
          .catch(err => {
            layer.alert(err.message, { closeBtn: 0 });
          });
      },
    detailBack:function () {
         //this.$router.back(-1);
        this.$router.push({
          name:this.$route.query.name,
          query: {
            equipmentName:this.$route.query.equipmentName,
            equipmentCode:this.$route.query.equipmentCode,
            equipmentType:this.$route.query.equipmentType,
            returnFlg:this.$route.query.returnFlg,
            pageNo:this.$route.query.pageNo
          }
        });
    },
      addFlow: function(data) {
        var vm = this;
        switch(vm.type){
          case 'csh':
            this.$router.push({//跳转到初始化
              name: "initializeEdit",
              query: {
                data: data,
                type:vm.type,
                equipmentName:this.$route.query.equipmentName,
                equipmentCode:this.$route.query.equipmentCode,
                equipmentType:this.$route.query.equipmentType,
                returnFlg:this.$route.query.returnFlg,
                name:this.$route.query.name,
                pageNo:this.$route.query.pageNo
              }
            });
            break;
          case 'az':
            this.$router.push({//跳转到安装
              name: "deviceEdit",
              query: {
                data: data,
                type:vm.type,
                equipmentName:this.$route.query.equipmentName,
                equipmentCode:this.$route.query.equipmentCode,
                equipmentType:this.$route.query.equipmentType,
                returnFlg:this.$route.query.returnFlg,
                name:this.$route.query.name,
                pageNo:this.$route.query.pageNo
              }
            });
            break;
          case 'ts':
            this.$router.push({//跳转到调试
              name: "debugEdit",
              query: {
                data: data,
                type:vm.type,
                equipmentName:this.$route.query.equipmentName,
                equipmentCode:this.$route.query.equipmentCode,
                equipmentType:this.$route.query.equipmentType,
                returnFlg:this.$route.query.returnFlg,
                name:this.$route.query.name,
                pageNo:this.$route.query.pageNo
              }
            });
            break;
          case 'ys':
            this.$router.push({//跳转到验收
              name: "checkEdit",
              query: {
                data: data,
                type:vm.type,
                equipmentName:this.$route.query.equipmentName,
                equipmentCode:this.$route.query.equipmentCode,
                equipmentType:this.$route.query.equipmentType,
                returnFlg:this.$route.query.returnFlg,
                name:this.$route.query.name,
                pageNo:this.$route.query.pageNo
              }
            });
            break;
          case 'by':
            this.$router.push({//跳转到保养
              name: "maintainEdit",
              query: {
                data: data,
                type:vm.type,
                equipmentName:this.$route.query.equipmentName,
                equipmentCode:this.$route.query.equipmentCode,
                equipmentType:this.$route.query.equipmentType,
                returnFlg:this.$route.query.returnFlg,
                name:this.$route.query.name,
                pageNo:this.$route.query.pageNo
              }
            });
            break;
          case 'jy':
            this.$router.push({//跳转到借用
              name: "returnEdit",
              query: {
                data: data,
                type:vm.type,
                equipmentName:this.$route.query.equipmentName,
                equipmentCode:this.$route.query.equipmentCode,
                equipmentType:this.$route.query.equipmentType,
                returnFlg:this.$route.query.returnFlg,
                name:this.$route.query.name,
                pageNo:this.$route.query.pageNo
              }
            });
            break;
          case 'gz':
            this.$router.push({//跳转到故障
              name: "faultEdit",
              query: {
                data: data,
                type:vm.type,
                equipmentName:this.$route.query.equipmentName,
                equipmentCode:this.$route.query.equipmentCode,
                equipmentType:this.$route.query.equipmentType,
                returnFlg:this.$route.query.returnFlg,
                name:this.$route.query.name,
                pageNo:this.$route.query.pageNo
              }
            });
            break;
          case 'wx':
            this.$router.push({//跳转到维修
              name: "repairEdit",
              query: {
                data: data,
                type:vm.type,
                equipmentName:this.$route.query.equipmentName,
                equipmentCode:this.$route.query.equipmentCode,
                equipmentType:this.$route.query.equipmentType,
                returnFlg:this.$route.query.returnFlg,
                name:this.$route.query.name,
                pageNo:this.$route.query.pageNo
              }
            });
            break;
          case 'bf':
            this.$router.push({//跳转到报废
              name: "scrapEdit",
              query: {
                data: data,
                type:vm.type,
                equipmentName:this.$route.query.equipmentName,
                equipmentCode:this.$route.query.equipmentCode,
                equipmentType:this.$route.query.equipmentType,
                returnFlg:this.$route.query.returnFlg,
                name:this.$route.query.name,
                pageNo:this.$route.query.pageNo
              }
            });
            break;
        }
      }
    },
    mounted() {
      this.getList(1);
    }
  };
</script>

<style scoped>

</style>
