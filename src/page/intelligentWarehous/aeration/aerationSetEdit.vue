<template>
  <div class="content">
    <div class="aerationSet">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">编辑通风方式配置</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail userManage-edit">
            <div>
              <span>
                通风方式（*）：
                <select class="select-style excision" v-model="detail.aerationMode">
                  <option :value="item.dicInfoCode" v-for="item in ventilationModeList" v-text="item.dicInfoValue"/>
                </select>
              </span>
              <span>
                仓房：
                <select class="select-style excision" v-model="detail.storehouseGbCode" @change="storehouseChangeHandler($event)">
                  <option
                    v-for="item in storehouseList"
                    :key="item.storehouseGbCode"
                    :value="item.storehouseGbCode"
                    v-text="item.storehouseName"/>
                </select>
              </span>
              <span>
                廒间：
                <select class="select-style excision" v-model="detail.warehouseGbCode" @change="warehouseChangeHandler($event)">
                  <option
                    v-for="item in granaryList"
                    :key="item.warehouseGbCode"
                    :value="item.warehouseGbCode"
                    v-text="item.warehouseName"/>
                </select>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="granary-pic">
      <img src="../../../../static/images/warehouse-device.png"/>
    </div>

    <DeviceList :deviceList="deviceTypeList"/>

    <div class="edit-btn">
      <button class="edit-submit" @click="submitEvent">提交</button>
      <button class="edit-back" @click="editBack">返回</button>
    </div>
  </div>
</template>
<style type="text/css" scoped>
  .granary-pic {
    margin-top: 0;
    padding-bottom: 25.67%;
    height: auto;
    position: relative;
  }

  .granary-pic img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .edit-btn{
    margin-bottom: 34px;
  }
</style>
<script>
  import DeviceList from '../DeviceList';
  import dictListMixin from '@/mixin/dictList';
  import {addAerationMode, editAerationMode, fetchAerationMode} from "@/api/intelligentWarehous/aeration";
  import {fetchEquipmentListByWarehouse} from "@/api/IOT/iot";

  export default {
    name: "aerationSetEdit",
    components: {
      DeviceList,
    },
    mixins: [dictListMixin],
    data() {
      return {
        detail: {
          aerationMode: '',
          storehouseGbCode: '',
          warehouseGbCode: '',
        },
        postData:{
          storehouseGbCode:this.$route.query.storehouseGbCode,
          warehouseGbCode: this.$route.query.warehouseGbCode,
          pageNo:this.$route.query.pageNo!=null?this.$route.query.pageNo:1,
          tabIndex:this.$route.query.tabIndex,
        },
        deviceTypeList: [],
      };
    },
    methods: {
      getDetail (aerationModeId) {
        layer.load(2);
        fetchAerationMode({aerationModeId})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              const {dataMap} = ret.data;
              this.detail = {
                aerationModeId: dataMap.aerationModeId,
                aerationMode: dataMap.aerationMode,
                storehouseGbCode: dataMap.storehouseGbCode,
                storehouseName: dataMap.storehouseName,
                warehouseGbCode: dataMap.warehouseGbCode,
                warehouseName: dataMap.warehouseName,
              };
              this.deviceTypeList = (dataMap.deviceList || []).map((device) => ({
                ...device,
                remote: true,
              }));
              this.getGranary(dataMap.storehouseGbCode);
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      submitEvent() {
        if (!this.detail.aerationMode) return layer.msg("请选择通风方式");
        if (!this.detail.storehouseGbCode) return layer.msg("请选择仓房");
        if (!this.detail.warehouseGbCode) return layer.msg("请选择廒间");
        this.detail.storehouseName = this.storehouseList.find(storehouse => this.detail.storehouseGbCode === storehouse.storehouseGbCode).storehouseName;
        this.detail.warehouseName = this.granaryList.find(granary => this.detail.warehouseGbCode === granary.warehouseGbCode).warehouseName;
        const api = this.detail.aerationModeId ? editAerationMode : addAerationMode;
        console.log(JSON.stringify(this.deviceTypeList));
        layer.load(2);
        api({...this.detail, deviceTypeList: JSON.stringify(this.deviceTypeList)})
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              layer.msg("保存成功！");
              this.editBack();
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      editBack:function () {
        this.$router.push({
          name: "aerationSet",
          query: {
            storehouseGbCode:this.postData.storehouseGbCode,
            warehouseGbCode: this.postData.warehouseGbCode,
            pageNo:this.postData.pageNo,
            tabIndex:this.postData.tabIndex,
          }
        })
      },
      getEquipmentList(warehouseGbCode) {
        layer.load(2);
        fetchEquipmentListByWarehouse({warehouseGbCode, funcPositionName: '通风'})
          .then((ret) => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              this.deviceTypeList = (ret.data.dataList || []).map((device) => ({
                ...device,
                remote: true,
                onOffSwitch: '0',
                type: '0',
              }));
            } else {
              this.deviceTypeList = [];
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      storehouseChangeHandler(e) {
        this.detail.storehouseGbCode = e.target.value;
        this.detail.warehouseGbCode = '';
        this.granaryList = [];
        this.getGranary(e.target.value);
      },
      warehouseChangeHandler(e) {
        this.detail.warehouseGbCode = e.target.value;
        this.getEquipmentList(e.target.value);
      },
    },
    mounted() {
      this.getStorehouse();
      this.getVentilationModeList();
      if (this.$route.query.id) {
        this.getDetail(this.$route.query.id);
      }
    }
  };

</script>
