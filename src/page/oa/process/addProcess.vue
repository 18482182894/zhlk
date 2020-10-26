<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box-content">
        <div class="div-add">
          <div>
            <h1>请假申请</h1>
          </div>
          <button @click="goLeave();">新建</button>
        </div>
        <br />
        <div class="div-add">
          <div>
            <h1>报销申请</h1>
            <!-- </span> -->
          </div>
          <button @click="goReimb">新建</button>
        </div>
        <br />
        <div class="div-add">
          <div>
            <h1>流程申请</h1>
            <!-- </span> -->
          </div>
          <button @click="goSwitch">新建</button>
        </div>
        <br />
      </div>

      <div class="detail-back">
        <button @click="detailBack();">返回</button>
      </div>
    </div>
  </div>

  <!--<div class="div-add"></div>-->
  <!--<div class="div-add"></div>-->
  <!--<div class="div-add"></div>-->
  <!--<div class="div-add"></div>-->
</template>
<style scoped>
.div-add {
  background-color: rgb(250, 250, 250);

  padding-left: 40px;
  padding-bottom: 20px;
  padding-top: 20px;
  border: 2px #bbb5b5 solid;
  border-radius: 10px;
  border-left: 8px cadetblue solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.div-add h1 {
  font-size: 36px;
  color: grey;
}
.div-add span {
  font-size: 28px;
  color: grey;
}
.div-add button {
  color: white;
  background-color: rgb(52, 170, 70);
  border-radius: 5px;
  width: 6rem;
  height: 3rem;
  border: 0;
  margin-right: 150px;
}
</style>

<script>
export default {
  name: "addProcess",
  methods: {
    detailBack: function () {
      this.$router.back(-1);
    },
    goLeave: function () {
      this.$router.push({
        name: "leaveEdit",
      });
    },
    goReimb: function () {
      this.$router.push({
        name: "reimbEdit",
      });
    },
    goSwitch: function () {
      this.$router.push({
        name: "switchEdit",
      });
    },
  },
};
</script>


