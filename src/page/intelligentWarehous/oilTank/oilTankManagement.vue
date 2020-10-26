<template>
  <div class="content" ref="contentRef">
    <ul class="oilBox">
      <li :class="[maxHeight < '1024' ? 'liBox' : 'li-big']" v-for="item in oilList" :key="item.oilcanCode" @click="jump(item.oilcanCode)">
        <!-- <div class="top">
          <div class="wave">
            <div class="card-logo"></div>
          </div>     
        </div>-->
        <div :class="[maxHeight < '1024' ? 'left-box' : 'left-box-big']">
          <!-- <div class="box">
            <div class="ellipse">
              <div class="ellipse-box"></div>
            </div>
          </div>
          <div class="mirrorRotateVertical">
            <div class="color-box">
              <div class="ellipse inside">
                <div class="ellipse-box inside-box" ref="percentBox"></div>
              </div>
            </div>
          </div> -->
          <div class="imgbox">
            <div class="heightbox">
              <div class="mirrorRotateVertical">
                  <div class="inside-box" ref="percentBox"></div>
              </div>
            </div>
          </div>
        </div>
        <div :class="[maxHeight < '1024' ? 'top-right' : 'top-right-big']">
          <div class="name">
            <span class="oil-name" v-text="item.oilName"></span>
          </div>
          <div class="liquid">
            <span class="liquid-height">液位高度：</span>
            <span class="liquid-color" v-text="item.liquidHeight"></span>
            <span class="liquid-color">m</span>
          </div>
          <div class="capacity">
            <span class="liquid-height">当前容量：</span>
            <span class="capacity-color" v-text="item.CurrentCapacity"></span>
            <span class="capacity-color">Kg</span>
          </div>
        </div>
        <div :class="[maxHeight < '1024' ? 'bottom' : 'bottom-big']">
          <div class="bottom-temperature">
            <span class="temperature-title">平均温度：</span>
            <span class="average-temperature" v-text="item.avgTemp"></span>
            <span class="average-temperature">℃</span>
          </div>
          <div class="bottom-temperature">
            <span class="temperature-title">最高温度：</span>
            <span class="peak-temperature" v-text="item.maxTemp"></span>
            <span class="peak-temperature">℃</span>
          </div>
          <div class="bottom-temperature">
            <span class="temperature-title">最低温度：</span>
            <span class="nadir-temperature" v-text="item.minTemp"></span>
            <span class="nadir-temperature">℃</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getOilList } from "@/api/intelligentWarehous/oilCan";

export default {
  name: "oilTankManagement",
  data() {
    return {
      oilList: [],
      percentHeight: [],
      maxHeight: ''
    };
  },
  methods: {
    getList() {
      let vm = this;
      getOilList({}).then(ret => {
        if (ret.code === "200") {
          vm.oilList = ret.data.dataList;
          for (let i = 0; i < vm.oilList.length; i++) {
            vm.oilList[i].avgTemp = vm.oilList[i].avgTemp.toFixed(2);
            vm.percentHeight.push(Math.round((vm.oilList[i].liquidHeight / vm.oilList[i].oilCanHeight) * 100.0) + "%")
            console.log(vm.percentHeight)           
          }
        }
        vm.$nextTick(() => {
          for(let j = 0; j < vm.$refs.percentBox.length; j++) {
            vm.$refs.percentBox[j].style.height = vm.percentHeight[j]
          }
        })
      });
    },
    jump(oilcanCode) {
      const vm = this;
      vm.$router.push({
        name: "oilTankTemperature",
        query: {
          oilcan_code: oilcanCode
        }
      });
    }
  },
  mounted() {
    const vm = this;
    vm.maxHeight = vm.$refs.contentRef.offsetHeight
    vm.getList();
  }
};
</script>

<style scoped>
.content {
  padding-bottom: 38px;
}
.oilBox {
  width: 100%;
  height: 100%;
}
.liBox {
  /* width: 29%; */
  width: 31.5%;
  height: 238px;
  /* height: 34.5%; */
  margin-top: 20px;
  position: relative;
  overflow: hidden;
  float: left;
  margin: 20px 10px 0 10px;
  cursor: pointer;
  border-radius: 4%;
  background: linear-gradient(rgb(105, 105, 105) 10%, rgb(192, 192, 192));
  box-shadow: 10px 10px 5px #888888;
}
/* .top {
  width: 100%;
  height: 86px;
  
}
.wave {
  width: 70px;
  height: 70px;
  border: 2px solid #FFFFFF;
  border-radius: 50%;
  margin-top: 10px;
  padding: 5px;
  margin-left: 10px;
  position: relative;
}
.card-logo {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
}
.card-logo::after {
  content: "";
  width: 70px;
  height: 70px;
  background-color: rgba(255, 255, 255, 0.8);
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -60%);
  border-radius: 40%;
  animation: wave 5s linear infinite;
}
@keyframes wave {
  100% {
    transform: translate(-50%, -60%) rotate(360deg);
  }
} */
.left-box {
  /* width: 55%; */
  width: 45%;
  /* height: 216px;
  margin-top: 10px; */
  height: 100%;
}
.box {
  position: relative;
  top: -32px;
  margin-left: 36px;
  z-index: 10;
}
.imgbox {
  /* position: absolute;
  top: -4px;
  left: -22px; */
  width: 100%;
  height: 100%;
  background: url(../../../../static/images/yg.png) no-repeat 14% 15%;
  background-size: 190% 120%;
}
.heightbox {
  position: absolute;
  /* top: 53px; */
  /* left: 75px; */
  top: 23%;
  left: 13%;
  width: 14%;
  height: 70%;
  background-color: #fff;
}

.mirrorRotateVertical {
  /* 垂直镜像翻转 */
  -moz-transform: scaleY(-1);
  -webkit-transform: scaleY(-1);
  -o-transform: scaleY(-1);
  transform: scaleY(-1);
  /*兼容IE*/
  filter: FlipV;
  width: 100%;
  height: 100%;
}
.inside-box {
  width: 100%;
  opacity: 0.5;
  background-color: #e9952c;
}
.name,
.liquid,
.capacity {
  width: 230px;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
}
.liquid-height,
.oil-name {
  color: white;
}
.liquid-color {
  color: skyblue;
}
.capacity-color {
  color: #dbff00e6;
}
.bottom-temperature {
  margin-top: 15px;
  font-size: 18px;
  font-weight: bold;
}
.temperature-title {
  display: inline-block;
  color: #fffafa;
}
.average-temperature {
  color: #00ff7f;
}
.peak-temperature {
  color: #ff0000;
}
.nadir-temperature {
  color: #4169e1;
}
.top-right {
  position: absolute;
  /* top: 9px; */
  /* left: 12.5rem; */
  top: 4%;
  left: 45%;
  width: 200px;
  height: 100px;
}
.bottom {
  position: absolute;
  /* top: 108px; */
  /* left: 12.5rem; */
  top: 47%;
  left: 45%;
  width: 200px;
  height: 100px;
}
.li-big {
  /* width: 29%; */
  width: 31%;
  height: 300px;
  margin-top: 20px;
  position: relative;
  overflow: hidden;
  float: left;
  margin: 20px 20px 0 20px;
  cursor: pointer;
  border-radius: 4%;
  background: linear-gradient(rgb(105, 105, 105) 10%, rgb(192, 192, 192));
  box-shadow: 10px 10px 5px #888888;
}
.left-box-big {
  /* width: 55%;
  height: 180px;
  margin-top: 38px;
  margin-left: 30px; */
  width: 45%;
  height: 100%;
}
.top-right-big {
  position: relative;
  /* top: -168px;
  left: 22rem; */
  top: -83%;
  left: 50%;
  width: 230px;
  height: 100px;
}
.bottom-big {
  position: relative;
  /* top: -170px;
  left: 22rem; */
  top: -82%;
  left: 50%;
  width: 230px;
  height: 100px;
}
</style>