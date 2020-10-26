<template>
  <div class="content">
    <div class="menuManage userManage">
      <form class="layui-form" action>
        <div class="tag-box">
          <div class="tag-box-top">
            <div class="tag-title">通风信息</div>
          </div>
          <div class="tag-box-content">
            <div class="userManage-detail userManage-edit">
              <div class="layui-form-item">
                <div class="layui-inline">
                  <label class="layui-form-label">通风作业单号</label>
                  <div class="layui-input-inline">
                    <input
                      type="text"
                      placeholder="请输入通风作业单号"
                      lay-verify="required"
                      lay-reqtext="通风作业单号是必填项"
                      autocomplete="off"
                      class="layui-input"
                      v-model="submitData.ventilateId"
                    />
                  </div>
                </div>
                <div class="layui-inline">
                  <label class="layui-form-label">仓房</label>
                  <div class="layui-input-inline">
                    <select
                      v-model="submitData.storehouseGbCode"
                      lay-verify="required"
                      lay-reqtext="仓房号是必选项"
                      lay-filter="storehouse"
                    >
                      <option value>请选择仓房</option>
                      <option
                        :key="item.storehouseGbCode"
                        :value="item.storehouseGbCode"
                        v-for="item in storehouseList"
                        v-text="item.storehouseName"
                      ></option>
                    </select>
                  </div>
                </div>
                <div class="layui-inline">
                  <label class="layui-form-label">廒间</label>
                  <div class="layui-input-inline">
                    <select
                      v-model="submitData.warehouseGbCode"
                      lay-verify="required"
                      lay-reqtext="廒间号是必选项"
                      lay-filter="warehouse"
                    >
                      <option value>请选择廒间</option>
                      <option
                        :key="item.warehouseGbCode"
                        :value="item.warehouseGbCode"
                        v-for="item in granaryList"
                        v-text="item.warehouseName"
                      ></option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="layui-form-item">
                <div class="layui-inline">
                  <label class="layui-form-label">通风目的</label>
                  <div class="layui-input-inline">
                    <input
                      type="text"
                      placeholder="请输入通风目的"
                      lay-verify="required"
                      lay-reqtext="通风目的是必填项"
                      autocomplete="off"
                      class="layui-input"
                      v-model="submitData.ventilatePurpose"
                    />
                  </div>
                </div>
                <div class="layui-inline">
                  <label class="layui-form-label">通风类型</label>
                  <div class="layui-input-inline">
                    <select
                      v-model="submitData.ventilateType"
                      lay-verify="required"
                      lay-reqtext="通风类型是必选项"
                      lay-filter="ventilateType"
                    >
                      <option value>请选择通风类型</option>
                      <option
                        :key="item.value"
                        :value="item.value"
                        v-for="item in ventilateTypeList"
                        v-text="item.text"
                      ></option>
                    </select>
                  </div>
                </div>
                <div class="layui-inline">
                  <label class="layui-form-label">风网类型</label>
                  <div class="layui-input-inline">
                    <select
                      v-model="submitData.ventilationType"
                      lay-verify="required"
                      lay-reqtext="风网类型是必选项"
                      lay-filter="ventilationType"
                    >
                      <option value>请选择通风类型</option>
                      <option
                        :key="item.value"
                        :value="item.value"
                        v-for="item in ventilationTypeList"
                        v-text="item.text"
                      ></option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="layui-form-item">
                <div class="layui-inline">
                  <label class="layui-form-label">通风机台数</label>
                  <div class="layui-input-inline">
                    <input
                      type="number"
                      placeholder="请输入通风机台数"
                      lay-verify="required"
                      lay-reqtext="通风机台数是必填项"
                      autocomplete="off"
                      class="layui-input"
                      v-model="submitData.fanNum"
                    />
                  </div>
                </div>
                <div class="layui-inline">
                  <label class="layui-form-label">通风作业人</label>
                  <div class="layui-input-inline">
                    <input
                      type="text"
                      placeholder="请输入通风作业人"
                      lay-verify="required"
                      lay-reqtext="通风作业人是必填项"
                      autocomplete="off"
                      class="layui-input"
                      v-model="submitData.ventilatePerson"
                    />
                  </div>
                </div>
                <div class="layui-inline">
                  <label class="layui-form-label">创建时间</label>
                  <div class="layui-input-inline">
                    <input
                      type="text"
                      name="date"
                      id="date"
                      lay-verify="date"
                      lay-reqtext="创建时间是必选项"
                      placeholder="请选择日期"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                </div>
              </div>
              <div class="layui-form-item">
                <div class="layui-inline">
                  <label class="layui-form-label">风网开孔率</label>
                  <div class="layui-input-inline">
                    <input
                      type="number"
                      placeholder="请输入风网开孔率"
                      lay-verify="required"
                      lay-reqtext="风网开孔率是必填项"
                      autocomplete="off"
                      class="layui-input"
                      v-model="submitData.ventilationHole"
                    />
                  </div>
                </div>
                <div class="layui-inline">
                  <label class="layui-form-label">通风机型号</label>
                  <div class="layui-input-inline">
                    <input
                      type="text"
                      placeholder="请输入通风机型号"
                      lay-verify="required"
                      lay-reqtext="通风机型号是必填项"
                      autocomplete="off"
                      class="layui-input"
                      v-model="submitData.fanType"
                    />
                  </div>
                </div>
                <div class="layui-inline">
                  <label class="layui-form-label">送风方式</label>
                  <div class="layui-input-inline">
                    <select
                      v-model="submitData.blowingType"
                      lay-verify="required"
                      lay-reqtext="送风方式是必选项"
                      lay-filter="blowingType"
                    >
                      <option value>请选择通风类型</option>
                      <option
                        :key="item.value"
                        :value="item.value"
                        v-for="item in blowingTypeList"
                        v-text="item.text"
                      ></option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="layui-form-item">
                <div class="layui-inline">
                  <label class="layui-form-label">作业前平均粮温(℃)</label>
                  <div class="layui-input-inline">
                    <input
                      type="number"
                      placeholder="请输入作业前平均气温"
                      lay-verify="required"
                      lay-reqtext="作业前平均粮温是必填项"
                      autocomplete="off"
                      class="layui-input"
                      v-model="submitData.beforeAvgTem"
                    />
                  </div>
                </div>
                <div class="layui-inline">
                  <label class="layui-form-label">作业后平均粮温(℃)</label>
                  <div class="layui-input-inline">
                    <input
                      type="number"
                      placeholder="请输入作业后平均气温"
                      lay-verify="required"
                      lay-reqtext="作业后平均粮温是必填项"
                      autocomplete="off"
                      class="layui-input"
                      v-model="submitData.aftetAvgTem"
                    />
                  </div>
                </div>
                <div class="layui-inline">
                  <label class="layui-form-label">降温幅度</label>
                  <div class="layui-input-inline">
                    <input
                      type="number"
                      placeholder="请输入降温幅度"
                      lay-verify="required"
                      lay-reqtext="降温幅度是必填项"
                      autocomplete="off"
                      class="layui-input"
                      v-model="submitData.coolingRange"
                    />
                  </div>
                </div>
              </div>
              <div class="layui-form-item">
                <div class="layui-inline">
                  <label class="layui-form-label">作业前平均水分</label>
                  <div class="layui-input-inline">
                    <input
                      type="number"
                      placeholder="请输入作业前平均水分"
                      lay-verify="required"
                      lay-reqtext="作业前平均水分是必填项"
                      autocomplete="off"
                      class="layui-input"
                      v-model="submitData.beforeAvgWater"
                    />
                  </div>
                </div>
                <div class="layui-inline">
                  <label class="layui-form-label">作业后平均水分</label>
                  <div class="layui-input-inline">
                    <input
                      type="number"
                      placeholder="请输入作业后平均水分"
                      lay-verify="required"
                      lay-reqtext="作业后平均水分是必填项"
                      autocomplete="off"
                      class="layui-input"
                      v-model="submitData.aftetAvgWater"
                    />
                  </div>
                </div>
                <div class="layui-inline">
                  <label class="layui-form-label">降水幅度</label>
                  <div class="layui-input-inline">
                    <input
                      type="number"
                      placeholder="请输入降水幅度"
                      lay-verify="required"
                      lay-reqtext="降水幅度是必填项"
                      autocomplete="off"
                      class="layui-input"
                      v-model="submitData.rainfallRange"
                    />
                  </div>
                </div>
              </div>
              <div class="layui-form-item">
                <div class="layui-inline">
                  <label class="layui-form-label">降温能耗</label>
                  <div class="layui-input-inline">
                    <input
                      type="number"
                      placeholder="请输入降温能耗"
                      lay-verify="required"
                      lay-reqtext="降温能耗是必填项"
                      autocomplete="off"
                      class="layui-input"
                      v-model="submitData.coolingEnergy"
                    />
                  </div>
                </div>
                <div class="layui-inline">
                  <label class="layui-form-label">吨粮降水能耗</label>
                  <div class="layui-input-inline">
                    <input
                      type="number"
                      placeholder="请输入吨降水能耗"
                      lay-verify="required"
                      lay-reqtext="吨降水能耗是必填项"
                      autocomplete="off"
                      class="layui-input"
                      v-model="submitData.rainfallEnergy"
                    />
                  </div>
                </div>
                <div class="layui-inline">
                  <label class="layui-form-label">失水率</label>
                  <div class="layui-input-inline">
                    <input
                      type="number"
                      placeholder="请输入失水率"
                      lay-verify="required"
                      lay-reqtext="失水率是必填项"
                      autocomplete="off"
                      class="layui-input"
                      v-model="submitData.watetLoss"
                    />
                  </div>
                </div>
              </div>
              <div class="layui-form-item">
                <div class="layui-inline">
                  <label class="layui-form-label avgtem">作业第一阶段平均气温(℃)</label>
                  <div class="layui-input-inline">
                    <input
                      type="number"
                      placeholder="请输入作业第一阶段平均气温"
                      lay-verify="required"
                      lay-reqtext="作业第一阶段平均气温是必填项"
                      autocomplete="off"
                      class="layui-input"
                      v-model="submitData.firstAvgTem"
                    />
                  </div>
                </div>
                <div class="layui-inline">
                  <label class="layui-form-label avgtem">作业第二阶段平均气温(℃)</label>
                  <div class="layui-input-inline">
                    <input
                      type="number"
                      placeholder="请输入作业第二阶段平均气温"
                      lay-verify="required"
                      lay-reqtext="作业第二阶段平均气温是必填项"
                      autocomplete="off"
                      class="layui-input"
                      v-model="submitData.secondAvgTem"
                    />
                  </div>
                </div>
              </div>
              <div class="layui-form-item">
                <div class="layui-inline">
                  <label class="layui-form-label avgtem">作业第三阶段平均气温(℃)</label>
                  <div class="layui-input-inline">
                    <input
                      type="number"
                      placeholder="请输入作业第三阶段平均气温"
                      lay-verify="required"
                      lay-reqtext="作业第三阶段平均气温是必填项"
                      autocomplete="off"
                      class="layui-input"
                      v-model="submitData.thirdAvgTem"
                    />
                  </div>
                </div>
                <div class="layui-inline">
                  <label class="layui-form-label avgtem">作业第四阶段平均气温(℃)</label>
                  <div class="layui-input-inline">
                    <input
                      type="number"
                      placeholder="请输入作业第四阶段平均气温"
                      lay-verify="required"
                      lay-reqtext="作业第四阶段平均气温是必填项"
                      autocomplete="off"
                      class="layui-input"
                      v-model="submitData.fourthAvgTem"
                    />
                  </div>
                </div>
              </div>
              <div class="layui-form-item layui-form-text">
                <label class="layui-form-label memo">备注</label>
                <div class="layui-input-block">
                  <textarea class="layui-textarea" v-model="submitData.memo"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="layui-form-item">
            <div class="edit-btn">
              <button
                type="submit"
                class="edit-submit"
                @click="submitEvent();"
                lay-submit=""
                lay-filter="submitForm"
              >提交</button>
              <button class="edit-back" @click="detailBack();">返回</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { storehouse, granary } from "@/api/systemManage/dropDown";
import { addAerationRecordService } from "@/api/intelligentWarehous/aerationList";
export default {
  name: "addAerationRecord",
  data() {
    return {
      submitData: {
        storehouseGbCode: "",
        warehouseGbCode: "",
        ventilateId: "", // 通风作业单号
        ventilatePurpose: "", // 通风目的
        ventilateType: "", // 通风类型
        ventilationType: "", // 风网类型
        ventilationHole: "", // 风网开孔率
        fanType: "", // 通风机型号
        blowingType: "", // 送风方式
        fanNum: "", // 通风机台数
        firstAvgTem: "", // 作业第一阶段平均气温
        secondAvgTem: "", // 作业第二阶段平均气温
        thirdAvgTem: "", // 作业第三阶段平均气温
        fourthAvgTem: "", // 作业第四阶段平均气温
        ventilatePerson: "", // 通风作业人
        createTime: "", // 创建时间
        beforeAvgTem: "", // 作业前平均气温
        aftetAvgTem: "", // 作业后平均气温
        coolingRange: "", // 降温幅度
        coolingEnergy: "", // 降温能耗
        beforeAvgWater: "", // 作业前平均水分
        aftetAvgWater: "", // 作业后平均水分
        rainfallRange: "", // 降水幅度
        rainfallEnergy: "", // 吨粮降水能耗
        watetLoss: "", // 失水率
        memo: "", // 备注
      },
      storehouseList: [],
      granaryList: [],
      ventilateTypeList: [
        // 通风类型列表
        { text: "自然空气通风", value: "1" },
        { text: "加热空气通风", value: "2" },
        { text: "冷却空气通风", value: "3" },
        { text: "内循环控温", value: "4" },
        { text: "空调控温通风", value: "5" },
        { text: "维持通风", value: "6" },
      ],
      ventilationTypeList: [
        // 风网类型列表
        { text: "地槽", value: "1" },
        { text: "地上笼", value: "2" },
        { text: "移动式", value: "3" },
        { text: "箱式", value: "4" },
        { text: "径向", value: "5" },
        { text: "夹底", value: "6" },
        { text: "其他", value: "9" },
      ],
      blowingTypeList: [
        // 送风方式列表
        { text: "压入式通风", value: "1" },
        { text: "吸出式通风", value: "2" },
        { text: "压入与吸出相结合式通风", value: "3" },
        { text: "环流通风", value: "4" },
        { text: "其他", value: "9" },
      ],
    };
  },
  methods: {
    submitEvent() {
      this.submitData.createTime = $("#date").val();
      layer.load(2);
      addAerationRecordService({ data: this.submitData })
        .then((ret) => {
          layer.closeAll("loading");
          if (ret.code === "200") {
            layer.msg("新增通风信息成功！");
            this.$router.push({
              name: "aerationList",
              query: {
                pageNo: 1,
              },
            });
          } else {
            // layer.msg("新增通风信息失败！");
          }
        })
        .catch((err) => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getStorehouse() {
      storehouse()
        .then((ret) => {
          if (ret.code === "200") {
            this.storehouseList = ret.data.dataList;
          } else {
            ayer.msg("获取仓房信息失败！");
          }
        })
        .catch((err) => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getGranary(code) {
      granary(code)
        .then((ret) => {
          if (ret.code == 200) {
            this.granaryList = ret.data.dataList;
          } else {
            layer.msg("获取廒间信息失败！");
          }
        })
        .catch((err) => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    detailBack() {
      this.$router.push({
        name: "aerationList",
      });
    },
  },
  watch: {
    "submitData.storehouseGbCode"(newValue, oldValue) {
      if (newValue && newValue !== oldValue) {
        this.getGranary(newValue);
      }
    },
  },
  mounted() {
    this.getStorehouse();
    layui.use("laydate", () => {
      const date = layui.laydate;
      date.render({
        elem: "#date",
      });
    });
  },
  updated() {
    this.$nextTick(() => {
      layui.use("form", () => {
        const form = layui.form;
        form.render("select");
        form.on("select(storehouse)", (data) => {
          this.submitData.storehouseGbCode = data.value;
        });
        form.on("select(warehouse)", (data) => {
          this.submitData.warehouseGbCode = data.value;
        });
        form.on("select(ventilateType)", (data) => {
          this.submitData.ventilateType = data.value;
        });
        form.on("select(ventilationType)", (data) => {
          this.submitData.ventilationType = data.value;
        });
        form.on("select(blowingType)", (data) => {
          this.submitData.blowingType = data.value;
        });
      });
    });
  },
};
</script>

<style scoped>
.tag-box,
.tag-box-content,
.userManage-detail > div {
  font-size: 14px;
}
.layui-form-label {
  width: 122px;
}
.layui-input-inline {
  width: 202px;
}
.avgtem {
  width: 164px;
}
.memo {
  text-align: left;
}
.layui-input-block {
  margin-left: 0px;
}
</style>