import {
  VentilationMethod,
  VentilationMode,
  VentilationPurpose,
  VentilationMechanics,
  grainVariety,
  storehouse,
  granary,
  cargo,
} from '@/api/systemManage/dropDown';
import {staffList} from "@/api/systemManage/staff";

export default {
  data() {
    return {
      ventilationMethodList: [],
      ventilationModeList: [],
      ventilationPurposeList: [],
      ventilationMechanicsList: [],
      grainVarietyList: [],
      storehouseList: [],
      granaryList: [],
      cargoList: [],
      staffList: [],
    }
  },
  methods: {
    getVentilationMethodList() {
      VentilationMethod()
        .then((ret) => {
          if (ret.code == 200) {
            const {dataList} = ret.data;
            this.ventilationMethodList = dataList;
          } else {
            layer.alert(ret.data, {closeBtn: 0});
          }
        })
        .catch((err) => {
          layer.alert(err.message, {closeBtn: 0});
        });
    },
    getVentilationModeList() {
      VentilationMode()
        .then((ret) => {
          if (ret.code == 200) {
            const {dataList} = ret.data;
            this.ventilationModeList = dataList;
          } else {
            layer.alert(ret.data, {closeBtn: 0});
          }
        })
        .catch((err) => {
          layer.alert(err.message, {closeBtn: 0});
        });
    },
    getVentilationPurposeList() {
      VentilationPurpose()
        .then((ret) => {
          if (ret.code == 200) {
            const {dataList} = ret.data;
            this.ventilationPurposeList = dataList;
          } else {
            layer.alert(ret.data, {closeBtn: 0});
          }
        })
        .catch((err) => {
          layer.alert(err.message, {closeBtn: 0});
        });
    },
    getVentilationMechanicsList() {
      VentilationMechanics()
        .then((ret) => {
          if (ret.code == 200) {
            const {dataList} = ret.data;
            this.ventilationMechanicsList = dataList;
          } else {
            layer.alert(ret.data, {closeBtn: 0});
          }
        })
        .catch((err) => {
          layer.alert(err.message, {closeBtn: 0});
        });
    },
    getGrainVariety() { //获取粮食品种
      grainVariety({})
        .then(ret => {//粮食品种
          if (ret.code == 200) {
            this.grainVarietyList = ret.data.grainVarietyList;
          } else {
            layer.alert(ret.data, {closeBtn: 0});
          }
        }).catch(err => {
        layer.alert(err.message, {closeBtn: 0});
      });
    },
    getStorehouse() { // 获取仓房列表
      return new Promise(((resolve, reject) => {
        storehouse()
          .then((ret) => {
            if (ret.code == 200) {
              this.storehouseList = ret.data.dataList;
              resolve(this.storehouseList);
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      }))
    },
    getGranary(code) { // 获取廒间列表
      console.log(code)
      return new Promise(((resolve, reject) => {
        granary(code)
          .then((ret) => {
            if (ret.code == 200) {
              this.granaryList = ret.data.dataList;
              resolve(this.granaryList);
            } else {
              layer.alert(ret.data, {closeBtn: 0});
            }
          })
          .catch(err => {
            layer.alert(err.message, {closeBtn: 0});
          });
      }))
    },
    getCargo(warehouseGbCode) {
      cargo(warehouseGbCode)
        .then(ret => {
          if (ret.code == 200) {
            this.cargoList = ret.data.cargoList;
          } else {
            layer.alert(ret.data, {closeBtn: 0});
          }
        }).catch(err => {
        layer.alert(err.message, {closeBtn: 0});
      });
    },
    getStaff() {
      staffList({pageNo: 1, pageSize: 1000})
        .then((ret) => {
          if (ret.code == 200) {
            this.staffList = ret.data.staffList;
          } else {
            layer.alert(ret.data, {closeBtn: 0});
          }
        })
        .catch(err => {
          layer.alert(err.message, {closeBtn: 0});
        });
    },
  },
}
