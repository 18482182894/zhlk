<template>
  <div class="content">
    <div class="menuManage userManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">基础信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
                油罐：
                <input type="text" class="input-text" v-model="oilName" readonly />
              </span>
              <span>
                粮油品种：
                <div class="edit-grainVariety">
                  <treeselect v-model="submitData.oilVariety" :multiple="false" :options="grainVarietyList"/>
                </div>  
              </span>
              <span>
                当前容量(Kg)：
                <input type="text" class="input-text" v-model="submitData.remark"/>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="edit-btn">
      <button class="edit-submit" @click="submitEvent()">提交</button>
      <button class="edit-back" @click="detailBack()">返回</button>
    </div>
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { getOilList } from "@/api/intelligentWarehous/oilCan"
import { grainVariety } from '@/api/systemManage/dropDown'
import { tankInventoryEdit } from "@/api/business/warehousingStock/account"
export default {
  components: { Treeselect },
  data() {
    return {
      submitData: {
        oilVariety: null,
        oilcanCode: "",
        remark: "",
      },
      oilName: "",
      oilCanInfo: {},
      grainVarietyList: [],
      oilVarietyList: [],
      oilVarieties: [],
      oilVarietyName: ''
    };
  },
  methods: {
    getOilCanData() {
      getOilList({}).then((ret) => {
        console.log(ret);
        if (ret.code == "200") {
          ret.data.dataList.forEach((item) => {
            if (item.oilcanCode == this.oilCanInfo.oilcanCode) {
              this.oilName = item.oilName;
              this.submitData.oilcanCode = item.oilcanCode;
              this.submitData.remark = item.CurrentCapacity;
              this.oilVarietyName = item.variety
            }
          });
        }
      });
    },
    getData() {
      this.oilCanInfo = JSON.parse(this.$route.query.data);
      console.log(this.oilCanInfo);
    },
    getDropDown() {
      grainVariety({})
        .then(ret => {
          //粮食品种
          if (ret.code == 200) {
            this.grainVarietyList = ret.data.grainVarietyList[1].children[0].children;
            this.oilVarieties = ret.data.grainVarietyList[1].children[0]
            this.getLeafKeys(this.oilVarieties, this.oilVarietyList);
            this.oilVarietyList.forEach(item => {
              if(this.oilVarietyName == item.name) {
                this.submitData.oilVariety = item.id
              }
            })
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
     // 递归获取末端节点的id和label名称
    getLeafKeys(node, arr) {
      if (node.children == "") {
        const obj = {};
        obj.name = node.label;
        obj.id = node.id;
        return arr.push(obj);
      }
      node.children.forEach((item) => {
        this.getLeafKeys(item, arr);
      });
    },
    submitEvent() {
      console.log(this.submitData)
      tankInventoryEdit(this.submitData).then(ret => {
        if(ret.code == '200') {
          layer.msg("编辑信息成功！");
          this.detailBack();
        } else {
          layer.alert(ret.data, { closeBtn: 0 });
        }
      })
      .catch(err => {
        layer.alert(err.message, { closeBtn: 0 });
      });
    },
    detailBack() {
      this.$router.push({
        name: 'tankInventory'
      })
    }
  },
  created() {
    this.getOilCanData();
    this.getData();
    this.getDropDown();
  },
};
</script>

<style>
</style>