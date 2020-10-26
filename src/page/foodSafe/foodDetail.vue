<template>
  <div class="content">
    <div class="menuManage roleManage">
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">基础信息</div>
        </div>
        <div class="tag-box-content">
          <div class="userManage-detail">
            <div>
              <span>
                粮食品种：
                <label v-text="detailData.grainKind"></label>
              </span>
              <span>
                粮食性质：
                <label v-text="detailData.grainAttribute"></label>
              </span>
              <span>
                当前数量（千克）：
                <label v-text="detailData.currentQuantity"></label>
              </span>
              <span>
                累计入库（千克）：
                <label v-text="detailData.accumulativeInput"></label>
              </span>
              <span>
                粮食等级：
                <label v-text="detailData.grainLevel"></label>
              </span>
              <span>
                开始日期：
                <label v-text="detailData.startDate"></label>
              </span>
              <span>
                结束日期：
                <label v-text="detailData.endDate"></label>
              </span>
              <span>
                仓库：
                <label v-text="detailData.storehouseName"></label>
              </span>
              <span>
                保管者ID：
                <label v-text="detailData.warehouseKeepingAccountId"></label>
              </span>
              <span>
                库存识别码：
                <label v-text="detailData.stockIdentificationCode"></label>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="tag-box">
        <div class="tag-box-top">
          <div class="tag-title">数据列表</div>
        </div>
        <div class="tag-box-content">
          <div class="message-div">
            <div class="left-div">
              <div class="left-item_2">
                <div class="left-item_1">追溯类型</div>
                <select name class="select-style" v-model="traceabilityType">
                  <option value="0">保管期</option>
                  <option value="1">入库</option>
                  <option value="2">出库</option>
                </select>
              </div>
            </div>
            <div class="right-div">
              <div class="item-1" v-if="traceabilityType=='0'">
                <label :class="traceabilityItem=='1'?'choice-div choice-div-on':'choice-div'">
                  <input type="radio" value="1" @change="jumpList()" v-model="traceabilityItem" />粮情检查
                </label>
                <label :class="traceabilityItem=='2'?'choice-div choice-div-on':'choice-div'">
                  <input type="radio" value="2" @change="jumpList()" v-model="traceabilityItem" />通风记录
                </label>
                <label :class="traceabilityItem=='3'?'choice-div choice-div-on':'choice-div'">
                  <input type="radio" value="3" @change="jumpList()" v-model="traceabilityItem" />气象记录
                </label>
                <!--<label :class="traceabilityItem=='4'?'choice-div choice-div-on':'choice-div'" ><input type="radio" value="4"  @change="jumpList()" v-model="traceabilityItem">虫情检测</label>-->
                <label :class="traceabilityItem=='5'?'choice-div choice-div-on':'choice-div'">
                  <input type="radio" value="5" @change="jumpList()" v-model="traceabilityItem" />粮温监测
                </label>
                <label :class="traceabilityItem=='6'?'choice-div choice-div-on':'choice-div'">
                  <input type="radio" value="6" @change="jumpList()" v-model="traceabilityItem" />气体检测
                </label>
                <label :class="traceabilityItem=='7'?'choice-div choice-div-on':'choice-div'">
                  <input type="radio" value="7" @change="jumpList()" v-model="traceabilityItem" />熏蒸记录
                </label>
                <label :class="traceabilityItem=='8'?'choice-div choice-div-on':'choice-div'">
                  <input type="radio" value="8" @change="jumpList()" v-model="traceabilityItem" />质检记录
                </label>
                <label :class="traceabilityItem=='9'?'choice-div choice-div-on':'choice-div'">
                  <input type="radio" value="9" @change="jumpList()" v-model="traceabilityItem" />气调记录
                </label>
              </div>
              <div class="item-1" v-if="traceabilityType=='1'">
                <label :class="traceabilityItem=='10'?'choice-div choice-div-on':'choice-div'">
                  <input type="radio" value="10" @change="jumpList()" v-model="traceabilityItem" />登记记录
                </label>
                <label :class="traceabilityItem=='11'?'choice-div choice-div-on':'choice-div'">
                  <input type="radio" value="11" @change="jumpList()" v-model="traceabilityItem" />仟样信息
                </label>
                <label :class="traceabilityItem=='12'?'choice-div choice-div-on':'choice-div'">
                  <input type="radio" value="12" @change="jumpList()" v-model="traceabilityItem" />检验信息
                </label>
                <label :class="traceabilityItem=='13'?'choice-div choice-div-on':'choice-div'">
                  <input type="radio" value="13" @change="jumpList()" v-model="traceabilityItem" />计量信息
                </label>
                <label :class="traceabilityItem=='14'?'choice-div choice-div-on':'choice-div'">
                  <input type="radio" value="14" @change="jumpList()" v-model="traceabilityItem" />值仓信息
                </label>
                <label :class="traceabilityItem=='15'?'choice-div choice-div-on':'choice-div'">
                  <input type="radio" value="15" @change="jumpList()" v-model="traceabilityItem" />结算信息
                </label>
              </div>
              <div class="item-1" v-if="traceabilityType=='2'">
                <label :class="traceabilityItem=='16'?'choice-div choice-div-on':'choice-div'">
                  <input type="radio" value="16" @change="jumpList()" v-model="traceabilityItem" />登记信息
                </label>
                <label :class="traceabilityItem=='17'?'choice-div choice-div-on':'choice-div'">
                  <input type="radio" value="17" @change="jumpList()" v-model="traceabilityItem" />计量信息
                </label>
                <label :class="traceabilityItem=='18'?'choice-div choice-div-on':'choice-div'">
                  <input type="radio" value="18" @change="jumpList()" v-model="traceabilityItem" />值仓信息
                </label>
                <label :class="traceabilityItem=='19'?'choice-div choice-div-on':'choice-div'">
                  <input type="radio" value="19" @change="jumpList()" v-model="traceabilityItem" />结算信息
                </label>
              </div>
            </div>
          </div>
          <div class="userManage-detail">
            <div v-if="traceabilityItem=='1'">
              <div class="videoRetrieval">
                <table class="customTable">
                  <thead>
                    <tr>
                      <th style="width:2.5%;">
                        <input type="checkbox" />
                      </th>
                      <th style="width:2.5%;">序号</th>
                      <th style="width:7.5%;">仓房</th>
                      <th style="width:7.5%;">廒间</th>
                      <th style="width:7.5%;">粮堆最高点温度</th>
                      <th style="width:7.5%;">粮堆最低点温度</th>
                      <th style="width:7.5%;">整仓平均粮温</th>
                      <th style="width:7.5%;">检查人员</th>
                      <th style="width:7.5%;">检查时间</th>
                      <th style="width:7.5%;">编辑状态</th>
                      <th style="width:7.5%;">审核状态</th>
                      <th style="width:30%;">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,i) in listData">
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td v-text="i+1"></td>
                      <td v-text="item.storehouseName"></td>
                      <td v-text="item.warehouseName"></td>
                      <td v-text="item.grainHeapMaxTemperature"></td>
                      <td v-text="item.grainHeapMinTemperature"></td>
                      <td v-text="item.wholeAvgGrainTemperature"></td>
                      <td v-text="item.checkMan"></td>
                      <td v-text="item.checkDatetime"></td>
                      <td v-text="draftStatusMap[item.draftStatus]"></td>
                      <td v-text="auditStateMap[item.auditState]"></td>
                      <td>
                        <div
                          class="table-btn btn-yellow"
                          @click="jumpDetail(item.grainCheckRecordId)"
                        >详情</div>
                        <div
                          class="table-btn btn-submit"
                          @click="submitAudit(item.grainCheckRecordId)"
                          v-if="item.draftStatus==0"
                        >提交审核</div>
                        <div
                          class="table-btn btn-green"
                          @click="jumpEdit(item.grainCheckRecordId)"
                          v-if="item.draftStatus==0"
                        >编辑</div>
                        <div
                          class="table-btn btn-red"
                          @click="delData(item.grainCheckRecordId)"
                          v-if="item.draftStatus==0"
                        >删除</div>
                        <div
                          class="table-btn btn-again"
                          @click="submitAudit(item.grainCheckRecordId)"
                          v-if="item.auditState==0"
                        >再次申请</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- 分页容器 -->
                <div id="PageBar"></div>
              </div>
            </div>
            <div v-if="traceabilityItem=='2'">
              <div class="videoRetrieval">
                <table class="customTable">
                  <thead>
                    <tr>
                      <th style="width: 5%;">
                        <input type="checkbox" />
                      </th>
                      <th style="width: 5%;">序号</th>
                      <th style="width: 10%;">仓房</th>
                      <th style="width: 10%;">廒间</th>
                      <th style="width: 10%;">通风操作方式</th>
                      <th style="width: 10%;">通风类型</th>
                      <th style="width: 5%;">通风目的</th>
                      <th style="width: 10%;">通风开始时间</th>
                      <th style="width: 10%;">通风结束时间</th>
                      <th style="width: 5%;">通风时长</th>
                      <th style="width: 20%;">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,i) in listData">
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td v-text="i+1"></td>
                      <td v-text="item.storehouseName"></td>
                      <td v-text="item.warehouseName"></td>
                      <td v-text="item.aerationMode"></td>
                      <td v-text="item.aerationType"></td>
                      <td v-text="item.aerationPurpose"></td>
                      <td v-text="item.aerationStartDatetime"></td>
                      <td v-text="item.aerationEndDatetime"></td>
                      <td v-text="item.aerationDuration"></td>
                      <td>
                        <div
                          class="table-btn btn-yellow"
                          @click="jumpDetail(item.aerationJobRecordId)"
                        >详情</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- 分页容器 -->
                <div id="PageBar"></div>
              </div>
            </div>
            <div v-if="traceabilityItem=='3'">
              <div class="videoRetrieval">
                <table class="customTable">
                  <thead>
                    <tr>
                      <th style="width:2.5%;">
                        <input type="checkbox" />
                      </th>
                      <th style="width:2.5%;">序号</th>
                      <th style="width:7.5%;">检测时间</th>
                      <th style="width:7.5%;">温度</th>
                      <th style="width:10%;">湿度</th>
                      <th style="width:5%;">风速</th>
                      <th style="width:5%;">雨量</th>
                      <th style="width:5%;">气压</th>
                      <th style="width:5%;">风向</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,i) in listData">
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td v-text="i+1"></td>
                      <td v-text="item.checkDatetime"></td>
                      <td v-text="item.temperature"></td>
                      <td v-text="item.humidity"></td>
                      <td v-text="item.windSpeed"></td>
                      <td v-text="item.rainNum"></td>
                      <td v-text="item.pressure"></td>
                      <td v-text="item.windDirection"></td>
                    </tr>
                  </tbody>
                </table>
                <!-- 分页容器 -->
                <div id="PageBar"></div>
              </div>
            </div>
            <div v-if="traceabilityItem=='4'">
              <div class="videoRetrieval">
                <table class="customTable">
                  <thead>
                    <tr>
                      <th style="width: 5%;">
                        <input type="checkbox" />
                      </th>
                      <th style="width: 5%;">序号</th>
                      <th style="width: 10%;">仓库名称</th>
                      <th style="width: 10%;">廒间名称</th>
                      <th style="width: 20%;">存粮</th>
                      <th style="width: 10%;">虫种</th>
                      <th style="width: 10%;">数量</th>
                      <th style="width: 10%;">密度</th>
                      <th style="width: 10%;">点位</th>
                      <th style="width: 10%;">时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,i) in listData">
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td v-text="i+1"></td>
                      <td v-text="item.storehouseName"></td>
                      <td v-text="item.warehouseName"></td>
                      <td>
                        <span>{{item.grainVariety}}</span>
                        <br />
                        <span>{{item.grainProperty}} | {{item.weight}}千克</span>
                      </td>
                      <td v-text="item.insectKind"></td>
                      <td v-text="item.quantity"></td>
                      <td v-text="item.density"></td>
                      <td v-text="item.pointPosition"></td>
                      <td v-text="item.monitorDatetime"></td>
                    </tr>
                  </tbody>
                </table>
                <!-- 分页容器 -->
                <div id="PageBar"></div>
              </div>
            </div>
            <div v-if="traceabilityItem=='5'">
              <div class="videoRetrieval">
                <table class="customTable">
                  <thead>
                    <tr>
                      <th style="width:2.5%;">
                        <input type="checkbox" />
                      </th>
                      <th style="width:2.5%;">序号</th>
                      <th style="width:7.5%;">仓房名称</th>
                      <th style="width:7.5%;">廒间号</th>
                      <th style="width:20%;">存粮</th>
                      <th style="width:8%;">
                        粮温
                        <p class="flex-around">
                          <label>最高</label>
                          <label>平均</label>
                          <label>最低</label>
                        </p>
                      </th>
                      <th style="width:10%;">时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, i) in listData">
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td v-if="sortOrder=='0'" v-text="i+1"></td>
                      <td v-else v-text="listData.length-i"></td>
                      <td v-text="item.storehouseName"></td>
                      <td v-text="item.warehouseName"></td>
                      <td>
                        <span>{{item.grainProperty}}</span>
                        <br />
                        <span>{{item.grainVariety}} | {{item.weight}}千克</span>
                      </td>
                      <td>
                        <p class="flex-around">
                          <label v-text="item.maxTemperature"></label>
                          <label v-text="item.avgTemperature"></label>
                          <label v-text="item.minTemperature"></label>
                        </p>
                      </td>
                      <td v-text="item.searchTime.slice(0, 10)"></td>
                    </tr>
                  </tbody>
                </table>
                <!-- 分页容器 -->
                <div id="PageBar"></div>
              </div>
            </div>
            <div v-if="traceabilityItem=='6'">
              <div class="videoRetrieval">
                <table class="customTable">
                  <thead>
                    <tr>
                      <th style="width:5%;">
                        <input type="checkbox" />
                      </th>
                      <th style="width:5%;">序号</th>
                      <th style="width:10%;">仓房名称</th>
                      <th style="width:10%;">廒间名称</th>
                      <th style="width:10%;">氧气含量平均值%VOL</th>
                      <!-- <th style="width:10%;">氮气含量平均值</th> -->
                      <th style="width:10%;">二氧化碳含量平均值PPM</th>
                      <th style="width:10%;">磷化氢含量平均值PPM</th>
                      <th style="width:15%;">检测时间</th>
                      <th style="width:10%;">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,i) in listData">
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td v-text="i+1"></td>
                      <td v-text="item.storehouseName"></td>
                      <td v-text="item.warehouseName"></td>
                      <td v-text="item.avO2"></td>
                      <!-- <td v-text="item.avN2"></td> -->
                      <td v-text="item.avCo2"></td>
                      <td v-text="item.avPh3"></td>
                      <td v-text="item.checkDatetime"></td>
                      <td>
                        <div class="table-btn btn-yellow" @click="jumpDetail(item.gasMonitor);">详情</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- 分页容器 -->
                <div id="PageBar"></div>
              </div>
            </div>
            <div v-if="traceabilityItem=='7'">
              <div class="videoRetrieval">
                <table class="customTable">
                  <thead>
                    <tr>
                      <th style="width: 5%;">
                        <input type="checkbox" />
                      </th>
                      <th style="width: 5%;">序号</th>
                      <th style="width: 10%;">作业仓房</th>
                      <th style="width: 10%;">作业廒间</th>
                      <th style="width: 10%;">作业编号</th>
                      <th style="width: 10%;">负责人</th>
                      <th style="width: 10%;">熏蒸过程</th>
                      <th style="width: 10%;">作业时间</th>
                      <th style="width: 15%;">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,i) in listData">
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td v-text="i+1"></td>
                      <td v-text="item.storehouseName"></td>
                      <td v-text="item.warehouseName"></td>
                      <td v-text="item.jobBillId"></td>
                      <td v-text="item.responsiblePersonValue"></td>
                      <td v-text="item.fumigationProcess"></td>
                      <td v-text="item.jobDatetime"></td>
                      <td>
                        <div class="table-btn btn-yellow" @click="jumpDetail(item.jobBillId)">详情</div>
                        <!-- <div class="table-btn btn-green" @click="jumpEdit(item.jobBillId)">编辑</div> -->
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- 分页容器 -->
                <div id="PageBar"></div>
              </div>
            </div>
            <div v-if="traceabilityItem=='8'">
              <div class="videoRetrieval">
                <table class="customTable">
                  <thead>
                    <tr>
                      <th style="width:5%;">
                        <input type="checkbox" />
                      </th>
                      <th style="width:5%;">序号</th>
                      <th style="width:10%;">仓房</th>
                      <th style="width:10%;">廒间</th>
                      <th style="width:10%;">质检类型</th>
                      <th style="width:10%;">粮食品种</th>
                      <th style="width:10%;">粮食等级</th>
                      <th style="width:10%;">收获年度</th>
                      <th style="width:10%;">扦样时间</th>
                      <th style="width:10%;">质检时间</th>
                      <th style="width:15%;">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,i) in listData">
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td v-text="i+1"></td>
                      <td v-text="item.storehouseName"></td>
                      <td v-text="item.warehouseName"></td>
                      <td v-text="item.testType"></td>
                      <td v-text="item.grainKind"></td>
                      <td v-text="item.grainLevel"></td>
                      <td v-text="item.collectionYear"></td>
                      <td v-text="item.sampleDateTime"></td>
                      <td v-text="item.checkDateTime"></td>
                      <td>
                        <div class="table-btn btn-yellow" @click="jumpDetail(item)">详情</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- 分页容器 -->
                <div id="PageBar"></div>
              </div>
            </div>
            <div v-if="traceabilityItem=='9'">
              <div class="videoRetrieval">
                <table class="customTable">
                  <thead>
                    <tr>
                      <th style="width:2.5%;">
                        <input type="checkbox" />
                      </th>
                      <th style="width:2.5%;">序号</th>
                      <th style="width:7.5%;">仓房名称</th>
                      <th style="width:7.5%;">廒间号</th>
                      <th style="width:7.5%;">降氧目的</th>
                      <th style="width:7.5%;">充气方式</th>
                      <th style="width:10%;">操作时间</th>
                      <th style="width:7.5%;">编辑状态</th>
                      <th style="width:7.5%;">审核状态</th>
                      <th style="width:30%;">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,i) in listData">
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td v-text="i+1"></td>
                      <td v-text="item.storehouseName"></td>
                      <td v-text="item.warehouseName"></td>
                      <td v-text="item.cdjyPurpose"></td>
                      <td v-text="item.inflationMethod"></td>
                      <td v-text="item.operateDate"></td>
                      <td v-text="draftStatusMap[item.draftStatus]"></td>
                      <td v-text="auditStateMap[item.auditState]"></td>
                      <td>
                        <div class="table-btn btn-yellow" @click="jumpDetail(item.cdjyJobId)">详情</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- 分页容器 -->
                <div id="PageBar"></div>
              </div>
            </div>
            <div
              v-if="traceabilityItem=='10'||traceabilityItem=='11'||traceabilityItem=='12'||traceabilityItem=='13'||traceabilityItem=='14'||traceabilityItem=='15'"
            >
              <div v-if="guideStep==1" class="menuManage operationLog">
                <table class="customTable">
                  <thead>
                    <tr>
                      <th style="width:10%;">
                        <input type="checkbox" />
                      </th>
                      <th style="width:10%;">序号</th>
                      <th style="width:10%;">客户名称</th>
                      <th style="width:10%;">承运人</th>
                      <th style="width:10%;">车牌号</th>
                      <th style="width:15%;">日期</th>
                      <th style="width:30%;">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,i) in listData">
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td v-text="i+1"></td>
                      <td v-text="item.customerName"></td>
                      <td v-text="item.carrier"></td>
                      <td v-text="item.plateNumber"></td>
                      <td v-text="item.registorDate"></td>
                      <td>
                        <div class="table-btn btn-yellow" @click="jumpDetail(item.registorNo);">详情</div>
                        <!-- <div class="table-btn btn-green" @click="jumpEdit(item.registorNo);">编辑</div> -->
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- 分页容器 -->
                <div id="PageBar1" class="PageBar"></div>
              </div>
              <div v-if="guideStep==2" class="menuManage operationLog">
                <table class="customTable">
                  <thead>
                    <tr>
                      <th style="width:10%;">
                        <input type="checkbox" />
                      </th>
                      <th style="width:10%;">序号</th>
                      <th style="width:10%;">扦样编号</th>
                      <th style="width:10%;">样品状态</th>
                      <th style="width:10%;">粮食品种</th>
                      <th style="width:10%;">粮食性质</th>
                      <th style="width:30%;">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,i) in listData">
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td v-text="i+1"></td>
                      <td v-text="item.samplingId"></td>
                      <td>有效</td>
                      <td v-text="item.grainVariety"></td>
                      <td v-text="item.grainAttributeName"></td>
                      <td>
                        <div
                          class="table-btn btn-yellow"
                          @click="jumpDetail(item.registorNo,item.grainVariety);"
                        >详情</div>
                        <!-- <div class="table-btn btn-green" @click="jumpEdit(item.samplingId);">编辑</div> -->
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- 分页容器 -->
                <div id="PageBar2" class="PageBar"></div>
              </div>
              <div v-if="guideStep==3" class="menuManage operationLog">
                <table class="customTable">
                  <thead>
                    <tr>
                      <th style="width:10%;">
                        <input type="checkbox" />
                      </th>
                      <th style="width:10%;">序号</th>
                      <th style="width:10%;">检验人</th>
                      <th style="width:20%;">检验结果</th>
                      <th style="width:10%;">车牌号</th>
                      <th style="width:20%;">粮食品种</th>
                      <th style="width:20%;">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,i) in listData">
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td v-text="i+1"></td>
                      <td v-text="item.testPerson"></td>
                      <td v-text="item.totalLevel"></td>
                      <td v-text="item.plateNumber"></td>
                      <td v-text="item.grainVariety"></td>
                      <td>
                        <div class="table-btn btn-yellow" @click="jumpDetail(item.registorNo);">详情</div>
                        <!-- <div class="table-btn btn-green" @click="jumpEdit(item.testRecordId);">编辑</div> -->
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- 分页容器 -->
                <div id="PageBar3" class="PageBar"></div>
              </div>
              <div v-if="guideStep==4" class="menuManage operationLog">
                <table class="customTable">
                  <thead>
                    <tr>
                      <th style="width:5%;">
                        <input type="checkbox" />
                      </th>
                      <th style="width:5%;">序号</th>
                      <th style="width:10%;">计量名称</th>
                      <th style="width:10%;">毛重(千克)</th>
                      <th style="width:10%;">皮重(千克)</th>
                      <th style="width:10%;">净重(千克)</th>
                      <th style="width:10%;">扣量总计(千克)</th>
                      <th style="width:10%;">车牌号</th>
                      <th style="width:20%;">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,i) in listData">
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td v-text="i+1"></td>
                      <td v-text="item.grainVariety"></td>
                      <td v-text="item.grossWeight"></td>
                      <td v-text="item.tareWeight"></td>
                      <td v-text="item.netWeight"></td>
                      <td v-text="item.incrementDecrementTotal"></td>
                      <td v-text="item.plateNumber"></td>
                      <td>
                        <div class="table-btn btn-yellow" @click="jumpDetail(item.registorNo);">详情</div>
                        <!-- <div class="table-btn btn-green" @click="jumpEdit(item.registorNo);">编辑</div> -->
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- 分页容器 -->
                <div id="PageBar4" class="PageBar"></div>
              </div>
              <div v-if="guideStep==5" class="menuManage operationLog">
                <p class="table-name">未值仓出入库单</p>
                <table class="customTable">
                  <thead>
                    <tr>
                      <th style="width:5%;">
                        <input type="checkbox" />
                      </th>
                      <th style="width:5%;">序号</th>
                      <th style="width:7.5%;">入库单号</th>
                      <th style="width:7.5%;">入库类型</th>
                      <th style="width:7.5%;">粮食性质</th>
                      <th style="width:7.5%;">粮食品种</th>
                      <th style="width:7.5%;">粮食等级</th>
                      <th style="width:7.5%;">仓房</th>
                      <th style="width:7.5%;">廒间</th>
                      <th style="width:7.5%;">货位</th>
                      <th style="width:10%;">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,i) in noListData">
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td v-text="i+1"></td>
                      <td v-text="item.registorNo"></td>
                      <td v-text="item.registorType"></td>
                      <td v-text="item.grainAttributeValue"></td>
                      <td v-text="item.grainVarietyValue"></td>
                      <td v-text="item.totalLevel"></td>
                      <td v-text="item.storehouseName  "></td>
                      <td v-text="item.warehouseName"></td>
                      <td v-text="item.cargoName"></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
                <!-- 分页容器 -->
                <div id="PageBar5_a" class="PageBar"></div>
                <p class="table-name">已值仓出入库单</p>
                <table class="customTable">
                  <thead>
                    <tr>
                      <th style="width:5%;">
                        <input type="checkbox" />
                      </th>
                      <th style="width:5%;">序号</th>
                      <th style="width:7.5%;">入库单号</th>
                      <th style="width:7.5%;">入库类型</th>
                      <th style="width:7.5%;">粮食性质</th>
                      <th style="width:7.5%;">粮食品种</th>
                      <th style="width:7.5%;">粮食等级</th>
                      <th style="width:7.5%;">仓房</th>
                      <th style="width:7.5%;">廒间</th>
                      <th style="width:7.5%;">货位</th>
                      <th style="width:10%;">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,i) in alreadyListData">
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td v-text="i+1"></td>
                      <td v-text="item.registorNo"></td>
                      <td v-text="item.registorType"></td>
                      <td v-text="item.grainAttributeValue"></td>
                      <td v-text="item.grainVarietyValue"></td>
                      <td v-text="item.totalLevel"></td>
                      <td v-text="item.storehouseName  "></td>
                      <td v-text="item.warehouseName"></td>
                      <td v-text="item.cargoName"></td>
                      <td>
                        <div class="table-btn btn-yellow" @click="jumpDetail(item.registorNo);">详情</div>
                        <!-- <div class="table-btn btn-green" @click="jumpEdit(item.registorNo);">编辑</div> -->
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- 分页容器 -->
                <div id="PageBar5_b" class="PageBar"></div>
              </div>
              <div v-if="guideStep==6" class="menuManage operationLog">
                <table class="customTable">
                  <thead>
                    <tr>
                      <th style="width:5%;">
                        <input type="checkbox" />
                      </th>
                      <th style="width:5%;">序号</th>
                      <th style="width:10%;">结算单号</th>
                      <th style="width:10%;">入库类型</th>
                      <th style="width:10%;">粮食品种</th>
                      <th style="width:10%;">结算重量(千克)</th>
                      <th style="width:30%;">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,i) in listData">
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td v-text="i+1"></td>
                      <td v-text="item.billId"></td>
                      <td v-text="item.registerType"></td>
                      <td v-text="item.grainKind"></td>
                      <td v-text="item.totalWeight"></td>
                      <td>
                        <div
                          class="table-btn btn-yellow"
                          v-if="item.settlementId"
                          @click="jumpDetail(item.settlementId);"
                        >详情</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- 分页容器 -->
                <div id="PageBar6" class="PageBar"></div>
              </div>
              <div v-if="guideStep==7" class="menuManage operationLog">
                <table class="customTable">
                  <thead>
                    <tr>
                      <th style="width:5%;">
                        <input type="checkbox" />
                      </th>
                      <th style="width:5%;">序号</th>
                      <th style="width:20%;">卡号</th>
                      <th style="width:20%;">入库单号</th>
                      <th style="width:20%;">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,i) in listData">
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td v-text="i+1"></td>
                      <td v-text="item.cardNo"></td>
                      <td v-text="item.registerNo"></td>
                      <td>
                        <div class="table-btn btn-yellow" @click="jumpDetail('',item);">详情</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- 分页容器 -->
                <div id="PageBar7" class="PageBar"></div>
              </div>
            </div>
            <div
              v-if="traceabilityItem=='16'||traceabilityItem=='17'||traceabilityItem=='18'||traceabilityItem=='19'"
            >
              <div v-if="guideStep==1" class="menuManage operationLog">
                <table class="customTable">
                  <thead>
                    <tr>
                      <th style="width:10%;">
                        <input type="checkbox" />
                      </th>
                      <th style="width:10%;">序号</th>
                      <th style="width:10%;">客户名称</th>
                      <th style="width:10%;">承运人</th>
                      <th style="width:10%;">车牌号</th>
                      <th style="width:15%;">日期</th>
                      <th style="width:30%;">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,i) in listData">
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td v-text="i+1"></td>
                      <td v-text="item.customerName"></td>
                      <td v-text="item.carrier"></td>
                      <td v-text="item.plateNumber"></td>
                      <td v-text="item.registorDate"></td>
                      <td>
                        <div class="table-btn btn-yellow" @click="jumpDetail(item.registorNo);">详情</div>
                        <!-- <div class="table-btn btn-green" @click="jumpEdit(item.registorNo);">编辑</div> -->
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- 分页容器 -->
                <div id="PageBar1" class="PageBar"></div>
              </div>
              <div v-if="guideStep==4" class="menuManage operationLog">
                <table class="customTable">
                  <thead>
                    <tr>
                      <th style="width:5%;">
                        <input type="checkbox" />
                      </th>
                      <th style="width:5%;">序号</th>
                      <th style="width:10%;">计量名称</th>
                      <th style="width:10%;">毛重(千克)</th>
                      <th style="width:10%;">皮重(千克)</th>
                      <th style="width:10%;">净重(千克)</th>
                      <th style="width:10%;">扣量总计(千克)</th>
                      <th style="width:10%;">车牌号</th>
                      <th style="width:20%;">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,i) in listData">
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td v-text="i+1"></td>
                      <td v-text="item.grainVariety"></td>
                      <td v-text="item.grossWeight"></td>
                      <td v-text="item.tareWeight"></td>
                      <td v-text="item.netWeight"></td>
                      <td v-text="item.incrementDecrementTotal"></td>
                      <td v-text="item.plateNumber"></td>
                      <td>
                        <div class="table-btn btn-yellow" @click="jumpDetail(item.registorNo);">详情</div>
                        <!-- <div class="table-btn btn-green" @click="jumpEdit(item.registorNo);">编辑</div> -->
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- 分页容器 -->
                <div id="PageBar4" class="PageBar"></div>
              </div>
              <div v-if="guideStep==5" class="menuManage operationLog">
                <p class="table-name">未值仓出入库单</p>
                <table class="customTable">
                  <thead>
                    <tr>
                      <th style="width:5%;">
                        <input type="checkbox" />
                      </th>
                      <th style="width:5%;">序号</th>
                      <th style="width:7.5%;">入库单号</th>
                      <th style="width:7.5%;">入库类型</th>
                      <th style="width:7.5%;">粮食性质</th>
                      <th style="width:7.5%;">粮食品种</th>
                      <th style="width:7.5%;">粮食等级</th>
                      <th style="width:7.5%;">仓房</th>
                      <th style="width:7.5%;">廒间</th>
                      <th style="width:7.5%;">货位</th>
                      <th style="width:10%;">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,i) in noListData">
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td v-text="i+1"></td>
                      <td v-text="item.registorNo"></td>
                      <td v-text="item.registorType"></td>
                      <td v-text="item.grainAttributeValue"></td>
                      <td v-text="item.grainVarietyValue"></td>
                      <td v-text="item.totalLevel"></td>
                      <td v-text="item.storehouseName  "></td>
                      <td v-text="item.warehouseName"></td>
                      <td v-text="item.cargoName"></td>
                      <td>
                        <!-- <div class="table-btn btn-green" @click="jumpEdit(item.registorNo);">值仓</div> -->
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- 分页容器 -->
                <div id="PageBar5_a" class="PageBar"></div>
                <p class="table-name">已值仓出入库单</p>
                <table class="customTable">
                  <thead>
                    <tr>
                      <th style="width:5%;">
                        <input type="checkbox" />
                      </th>
                      <th style="width:5%;">序号</th>
                      <th style="width:7.5%;">入库单号</th>
                      <th style="width:7.5%;">入库类型</th>
                      <th style="width:7.5%;">粮食性质</th>
                      <th style="width:7.5%;">粮食品种</th>
                      <th style="width:7.5%;">粮食等级</th>
                      <th style="width:7.5%;">仓房</th>
                      <th style="width:7.5%;">廒间</th>
                      <th style="width:7.5%;">货位</th>
                      <th style="width:10%;">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,i) in alreadyListData">
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td v-text="i+1"></td>
                      <td v-text="item.registorNo"></td>
                      <td v-text="item.registorType"></td>
                      <td v-text="item.grainAttributeValue"></td>
                      <td v-text="item.grainVarietyValue"></td>
                      <td v-text="item.totalLevel"></td>
                      <td v-text="item.storehouseName  "></td>
                      <td v-text="item.warehouseName"></td>
                      <td v-text="item.cargoName"></td>
                      <td>
                        <div class="table-btn btn-yellow" @click="jumpDetail(item.registorNo);">详情</div>
                        <!-- <div class="table-btn btn-green" @click="jumpEdit(item.registorNo);">编辑</div> -->
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- 分页容器 -->
                <div id="PageBar5_b" class="PageBar"></div>
              </div>
              <div v-if="guideStep==6" class="menuManage operationLog">
                <table class="customTable">
                  <thead>
                    <tr>
                      <th style="width:5%;">
                        <input type="checkbox" />
                      </th>
                      <th style="width:5%;">序号</th>
                      <th style="width:10%;">结算单号</th>
                      <th style="width:10%;">入库类型</th>
                      <th style="width:10%;">粮食品种</th>
                      <th style="width:10%;">结算重量(千克)</th>
                      <th style="width:30%;">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,i) in listData">
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td v-text="i+1"></td>
                      <td v-text="item.billId"></td>
                      <td v-text="item.registerType"></td>
                      <td v-text="item.grainKind"></td>
                      <td v-text="item.totalWeight"></td>
                      <td>
                        <div
                          class="table-btn btn-yellow"
                          v-if="item.settlementId"
                          @click="jumpDetail(item.settlementId);"
                        >详情</div>
                        <!-- <div class="table-btn btn-green" v-else @click="jumpEdit();">结算</div> -->
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- 分页容器 -->
                <div id="PageBar6" class="PageBar"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="detail-back">
        <button @click="detailBack();">返回</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.left-div {
  width: 20%;
  height: 100%;
  display: flex;
}
.left-item_1 {
  width: 30%;
}
.left-item_2 {
  width: 70%;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
}

.choice-div {
  width: 8%;
  font-size: 10px;
  background-color: white;
  border: 1px rgb(149, 201, 62) solid;
  margin-left: 10px;
  border-radius: 5px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  position: relative;
}
.choice-div-on {
  color: white;
  background-color: rgb(149, 201, 62);
  border: 1px rgb(149, 201, 62) solid;
}
.choice-div input {
  opacity: 0;
  position: absolute;
}
.item-1 {
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  /*justify-content: space-around;*/
}
.right-div {
  width: 80%;
  display: flex;
  height: 100%;
}
.message-div {
  width: 100%;
  height: 75px;
  display: flex;
}
</style>
<script>
import { inventoryDetail } from "@/api/business/warehousingStock/inventory";
import { grainDetail } from "@/api/systemManage/basicData/grainVarieties";
import { grainNature, grainOilLevel } from "@/api/systemManage/dropDown";
import {
  registerFlowList,
  meteringOutFlowList,
  samplingFlowList,
  checkoutFlowList,
  meteringFlowList,
  noValueBinList,
  noValueBinOutList,
  alreadyValueBinList,
  alreadyValueBinOutList,
  settlementList
} from "@/api/intelligentStorage/public";
import {
  fetchGrainInspectionList,
  verifyGrainInspection,
  removeGrainInspection
} from "@/api/intelligentWarehous/grainInspection";
import { fetchAerationWorkList } from "@/api/intelligentWarehous/aeration";
import { fetchWeatherList } from "@/api/intelligentWarehous/weather";
import {
  fetchGasList,
  fetchGrainSituationList
} from "@/api/intelligentWarehous/grainSituation";
import { fetchApplyRecordList } from "@/api/intelligentWarehous/qualityTest";
import { fetchFumigationWorkBillList } from "@/api/intelligentWarehous/fumigation";
import { fetchNitrogenAndOxygenList } from "@/api/intelligentWarehous/atmosphere";
import { types } from "util";
export default {
  name: "foodDetail",
  data() {
    return {
      postData: {
        storagehouseAccountNo: this.$route.query.id
      },
      traceabilityType: "0", //追溯类型
      traceabilityItem: "",
      editPopup: 0, // 控制菜单编辑弹出层的显影，1为显示
      // allChecked: false,
      popupTitle: "",
      guideStep: 0,
      detailData: "",
      registerPostData: {
        customerName: "",
        plateNumber: "",
        noticeType: 1,
        pageSize: 10,
        pageNo: 0
      },
      samplingPostData: {
        grainVariety: null,
        plateNumber: "",
        pageSize: 10,
        pageNo: 0
      },
      checkPostData: {
        grainVariety: null,
        plateNumber: "",
        pageSize: 10,
        pageNo: 0
      },
      meteringPostData: {
        plateNumber: "",
        pageSize: 10,
        pageNo: 0
      },
      valueBinPostData: {
        grainVariety: null,
        pageSize: 10,
        pageNo: 0
      },
      postInsData: {
        storehouseGbCode: "",
        warehouseGbCode: "",
        pageSize: 10,
        pageNo: 0
      },
      auditStateMap: {
        "-1": "尚未提交",
        "0": "审核不通过",
        "10": "未审核",
        "11": "审核中",
        "99": "审核通过"
      },
      draftStatusMap: {
        "0": "草稿",
        "1": "正式文档"
      },
      settlementPostData: {
        plateNumber: "",
        customerName: "",
        noticeType: 1,
        pageSize: 10,
        pageNo: 0
      },
      alreadyListData: [], //已值仓列表
      noListData: [], //未值仓列表
      listData: [],
      see: false
    };
  },
  methods: {
    getDetail: function() {
      var vm = this;
      layer.load(2);
      inventoryDetail(vm.postData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.detailData = ret.data.dataMap;
            const startDate = vm.detailData.startDate.slice(0, 10);
            vm.detailData.startDate = startDate;
            if (vm.detailData.endDate) {
              const endDate = vm.detailData.endDate.slice(0, 10);
              vm.detailData.endDate = endDate;
            }
            grainNature({})
              .then(ret => {
                //粮食性质
                if (ret.code == 200) {
                  vm.grainNaturelList = ret.data.dataList;
                  for (var i = 0; i < vm.grainNaturelList.length; i++) {
                    //粮食性质
                    if (
                      vm.grainNaturelList[i].dicInfoCode ==
                      vm.detailData.grainAttribute
                    ) {
                      vm.detailData.grainAttribute =
                        vm.grainNaturelList[i].dicInfoValue;
                    }
                  }
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });

            grainDetail({ grainVarietyId: ret.data.dataMap.grainKind })
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  vm.detailData.grainKind =
                    ret.data.grainVariety.grainVarietyName;
                } else {
                  layer.alert(err.message, { closeBtn: 0 });
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });

            grainOilLevel({})
              .then(ret => {
                //粮食等级
                if (ret.code == 200) {
                  vm.grainOilLevelList = ret.data.dataList;
                  for (var i = 0; i < vm.grainOilLevelList.length; i++) {
                    //取粮食等级
                    if (
                      vm.grainOilLevelList[i].dicInfoCode ==
                      vm.detailData.grainLevel
                    ) {
                      vm.detailData.grainLevel =
                        vm.grainOilLevelList[i].dicInfoValue;
                    }
                  }
                } else {
                  layer.alert(ret.data, { closeBtn: 0 });
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
          } else {
            layer.alert(ret.data, { closeBtn: 0 });
          }
        })
        .catch(err => {
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getInsList(pageNo) {
      //获取粮情检查列表
      var vm = this;
      vm.postInsData.pageNo = pageNo;
      layer.load(2);
      fetchGrainInspectionList(vm.postInsData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.dataList;
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
                  vm.getInsList(obj.curr);
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
          layer.closeAll("loading");
          layer.alert(err.data, { closeBtn: 0 });
        });
    },
    getTaskList(pageNo) {
      //获取通风记录列表
      var vm = this;
      vm.postInsData.pageNo = pageNo;
      layer.load(2);
      fetchAerationWorkList(vm.postInsData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.dataList;
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
                  vm.getTaskList(obj.curr);
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
          layer.closeAll("loading");
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getWeatherList(pageNo) {
      //获取气象列表
      var vm = this;
      vm.postInsData.pageNo = pageNo;
      layer.load(2);
      fetchWeatherList(vm.postInsData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.dataList;
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
                  vm.getWeatherList(obj.curr);
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
          layer.closeAll("loading");
          layer.alert(err.data, { closeBtn: 0 });
        });
    },
    getGasList(pageNo) {
      //获取气体列表
      var vm = this;
      vm.postInsData.pageNo = pageNo;
      layer.load(2);
      fetchGasList(vm.postInsData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.gasMonitorList;
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
                  vm.getGasList(obj.curr);
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
          layer.closeAll("loading");
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getWormList: function(pageNo) {
      //获取虫情列表
      var vm = this;
      vm.postInsData.pageNo = pageNo;
      layer.load(2);
      fetchInsectPestList(vm.postInsData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.dataList;
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
                  vm.getWormList(obj.curr);
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
          layer.closeAll("loading");
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getQSList(pageNo) {
      //获取质检列表
      var vm = this;
      vm.postInsData.pageNo = pageNo;
      layer.load(2);
      fetchApplyRecordList(vm.postInsData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.dataList;
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
                  vm.getQSList(obj.curr);
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
          layer.closeAll("loading");
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getFumList(pageNo) {
      //获取熏蒸列表
      var vm = this;
      vm.postInsData.pageNo = pageNo;
      layer.load(2);
      fetchFumigationWorkBillList(vm.postInsData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.fumigationStaffList;
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
                  vm.getFumList(obj.curr);
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
          layer.closeAll("loading");
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getMapList(pageNo) {
      //获取气调列表
      var vm = this;
      vm.postInsData.pageNo = pageNo;
      layer.load(2);
      fetchNitrogenAndOxygenList(vm.postInsData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.dataList;
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
                  vm.getMapList(obj.curr);
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
          layer.closeAll("loading");
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getTempList(pageNo) {
      //获取粮温列表
      var vm = this;
      vm.postInsData.pageNo = pageNo;
      layer.load(2);
      fetchGrainSituationList(vm.postInsData)
        .then(ret => {
          layer.closeAll("loading");
          if (ret.code == 200) {
            vm.listData = ret.data.dataList;
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
                  vm.getTempList(obj.curr);
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
          layer.closeAll("loading");
          layer.alert(err.message, { closeBtn: 0 });
        });
    },
    getStorageList: function(pageNo, type) {
      //获取入库列表
      var vm = this;
      layer.load(2);
      switch (vm.guideStep) {
        case 1:
          vm.registerPostData.pageNo = pageNo;
          registerFlowList(vm.registerPostData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                vm.listData = ret.data.dataList;
                for (var i in vm.listData) {
                  const time = vm.listData[i].registorDate.slice(0, 10);
                  vm.listData[i].registorDate = time;
                }
                laypage({
                  //分页
                  cont: "PageBar1", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                  pages: ret.page.totalPages, //通过后台拿到的总页数
                  curr: pageNo,
                  skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                  jump: function(obj, first) {
                    //触发分页后的回调
                    if (!first) {
                      //一定要加此判断，否则初始时会无限刷新
                      vm.getStorageList(obj.curr);
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
          break;
        case 2:
          vm.samplingPostData.pageNo = pageNo;
          samplingFlowList(vm.samplingPostData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                console.log(JSON.stringify(ret));
                vm.listData = ret.data.dataList;
                laypage({
                  //分页
                  cont: "PageBar2", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                  pages: ret.page.totalPages, //通过后台拿到的总页数
                  curr: pageNo,
                  skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                  jump: function(obj, first) {
                    //触发分页后的回调
                    if (!first) {
                      //一定要加此判断，否则初始时会无限刷新
                      vm.getStorageList(obj.curr);
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
          break;
        case 3:
          vm.checkPostData.pageNo = pageNo;
          checkoutFlowList(vm.checkPostData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                vm.listData = ret.data.dataList;
                laypage({
                  //分页
                  cont: "PageBar3", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                  pages: ret.page.totalPages, //通过后台拿到的总页数
                  curr: pageNo,
                  skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                  jump: function(obj, first) {
                    //触发分页后的回调
                    if (!first) {
                      //一定要加此判断，否则初始时会无限刷新
                      vm.getStorageList(obj.curr);
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
          break;
        case 4:
          vm.meteringPostData.pageNo = pageNo;
          meteringFlowList(vm.meteringPostData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                vm.listData = ret.data.inWeighingList;
                laypage({
                  //分页
                  cont: "PageBar4", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                  pages: ret.page.totalPages, //通过后台拿到的总页数
                  curr: pageNo,
                  skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                  jump: function(obj, first) {
                    //触发分页后的回调
                    if (!first) {
                      //一定要加此判断，否则初始时会无限刷新
                      vm.getStorageList(obj.curr);
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
          break;
        case 5:
          vm.valueBinPostData.pageNo = pageNo;
          function noValueBin() {
            noValueBinList(vm.valueBinPostData)
              .then(ret => {
                layer.closeAll("loading");
                console.log(JSON.stringify(ret));
                if (ret.code == 200) {
                  vm.noListData = ret.data.inOndutyNList;
                  laypage({
                    //分页
                    cont: "PageBar5_a", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                    pages: ret.page.totalPages, //通过后台拿到的总页数
                    curr: pageNo,
                    skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                    jump: function(obj, first) {
                      //触发分页后的回调
                      if (!first) {
                        //一定要加此判断，否则初始时会无限刷新
                        vm.getStorageList(obj.curr, "no");
                      }
                    }
                  });
                } else {
                  if (ret.code == "500" && ret.data == "查询错误，没有数据") {
                    layer.msg("暂无数据");
                    vm.noListData = [];
                  } else {
                    layer.alert(ret.data, { closeBtn: 0 });
                  }
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
          }
          function alreadyValueBin() {
            alreadyValueBinList(vm.valueBinPostData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  vm.alreadyListData = ret.data.inOndutyYList;
                  laypage({
                    //分页
                    cont: "PageBar5_b", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                    pages: ret.page.totalPages, //通过后台拿到的总页数
                    curr: pageNo,
                    skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                    jump: function(obj, first) {
                      //触发分页后的回调
                      if (!first) {
                        //一定要加此判断，否则初始时会无限刷新
                        vm.getStorageList(obj.curr, "already");
                      }
                    }
                  });
                } else {
                  if (ret.code == "500" && ret.data == "查询错误，没有数据") {
                    layer.msg("暂无数据");
                    vm.alreadyListData = [];
                  } else {
                    layer.alert(ret.data, { closeBtn: 0 });
                  }
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
          }

          if (type) {
            if (type == "no") {
              noValueBin();
            } else {
              alreadyValueBin();
            }
          } else {
            noValueBin();
            alreadyValueBin();
          }
          break;
        case 6:
          vm.settlementPostData.pageNo = pageNo;
          settlementList(vm.settlementPostData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                vm.listData = ret.data.dataList;
                laypage({
                  //分页
                  cont: "PageBar6", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                  pages: ret.page.totalPages, //通过后台拿到的总页数
                  curr: pageNo,
                  skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                  jump: function(obj, first) {
                    //触发分页后的回调
                    if (!first) {
                      //一定要加此判断，否则初始时会无限刷新
                      vm.getStorageList(obj.curr, "already");
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
          break;
      }
    },
    jumpDetail: function(id, data) {
      //跳转到详情
      var vm = this;
      var url;
      switch (vm.guideStep) {
        case 1:
          url = "registerDetail";
          break;
        case 2:
          url = "samplingDetail";
          break;
        case 3:
          url = "checkoutDetail";
          break;
        case 4:
          url = "meteringDetail";
          break;
        case 5:
          url = "valueBinDetail";
          break;
        case 6:
          url = "settleDetail";
          break;
        case 7:
          url = "pinCardDetail";
          break;
      }
      this.$router.push({
        name: url,
        query: {
          id: id,
          data: data
        }
      });
    },
    getOutOfStorageList: function(pageNo, type) {
      //获取出库列表
      var vm = this;
      layer.load(2);
      switch (vm.guideStep) {
        case 1:
          vm.registerPostData.pageNo = pageNo;
          vm.registerPostData.noticeType = 2;
          registerFlowList(vm.registerPostData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                vm.listData = ret.data.dataList;
                for (var i in vm.listData) {
                  const time = vm.listData[i].registorDate.slice(0, 10);
                  vm.listData[i].registorDate = time;
                }
                laypage({
                  //分页
                  cont: "PageBar1", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                  pages: ret.page.totalPages, //通过后台拿到的总页数
                  curr: pageNo,
                  skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                  jump: function(obj, first) {
                    //触发分页后的回调
                    if (!first) {
                      //一定要加此判断，否则初始时会无限刷新
                      vm.getOutOfStorageList(obj.curr);
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
          break;
        case 4:
          vm.meteringPostData.pageNo = pageNo;
          meteringOutFlowList(vm.meteringPostData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                vm.listData = ret.data.outWeighingList;
                laypage({
                  //分页
                  cont: "PageBar4", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                  pages: ret.page.totalPages, //通过后台拿到的总页数
                  curr: pageNo,
                  skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                  jump: function(obj, first) {
                    //触发分页后的回调
                    if (!first) {
                      //一定要加此判断，否则初始时会无限刷新
                      vm.getOutOfStorageList(obj.curr);
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
          break;
        case 5:
          vm.valueBinPostData.pageNo = pageNo;
          function noValueBin() {
            noValueBinOutList(vm.valueBinPostData)
              .then(ret => {
                layer.closeAll("loading");
                console.log(JSON.stringify(ret));
                if (ret.code == 200) {
                  vm.noListData = ret.data.outOndutyNList;
                  laypage({
                    //分页
                    cont: "PageBar5_a", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                    pages: ret.page.totalPages, //通过后台拿到的总页数
                    curr: pageNo,
                    skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                    jump: function(obj, first) {
                      //触发分页后的回调
                      if (!first) {
                        //一定要加此判断，否则初始时会无限刷新
                        vm.getOutOfStorageList(obj.curr, "no");
                      }
                    }
                  });
                } else {
                  if (ret.code == "500" && ret.data == "查询错误，没有数据") {
                    layer.msg("暂无数据");
                    vm.noListData = [];
                  } else {
                    layer.alert(ret.data, { closeBtn: 0 });
                  }
                }
              })
              .catch(err => {
                layer.alert(err.message, { closeBtn: 0 });
              });
          }
          function alreadyValueBin() {
            alreadyValueBinOutList(vm.valueBinPostData)
              .then(ret => {
                layer.closeAll("loading");
                if (ret.code == 200) {
                  vm.alreadyListData = ret.data.outOndutyYList;
                  laypage({
                    //分页
                    cont: "PageBar5_b", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                    pages: ret.page.totalPages, //通过后台拿到的总页数
                    curr: pageNo,
                    skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                    jump: function(obj, first) {
                      //触发分页后的回调
                      if (!first) {
                        //一定要加此判断，否则初始时会无限刷新
                        vm.getOutOfStorageList(obj.curr, "already");
                      }
                    }
                  });
                } else {
                  if (ret.code == "500" && ret.data == "查询错误，没有数据") {
                    layer.msg("暂无数据");
                    vm.alreadyListData = [];
                  } else {
                    layer.alert(ret.data, { closeBtn: 0 });
                  }
                }
              })
              .catch(err => {
                layer.alert(err.data, { closeBtn: 0 });
              });
          }

          if (type == "no") {
            noValueBin();
          } else {
            if (type == "already") {
              alreadyValueBin();
            } else {
              noValueBin();
              alreadyValueBin();
            }
          }

          break;
        case 6:
          vm.settlementPostData.pageNo = pageNo;
          vm.settlementPostData.noticeType = 2;
          settlementList(vm.settlementPostData)
            .then(ret => {
              layer.closeAll("loading");
              if (ret.code == 200) {
                vm.listData = ret.data.dataList;
                laypage({
                  //分页
                  cont: "PageBar6", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                  pages: ret.page.totalPages, //通过后台拿到的总页数
                  curr: pageNo,
                  skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                  jump: function(obj, first) {
                    //触发分页后的回调
                    if (!first) {
                      //一定要加此判断，否则初始时会无限刷新
                      vm.getOutOfStorageList(obj.curr, "already");
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
          break;
      }
    },
    jumpList: function() {
      var vm = this;
      var j_path, step;
      // console.log(vm.traceabilityItem);
      switch (parseInt(vm.traceabilityItem)) {
        case 1:
          vm.getInsList(0);
          break;
        case 2:
          vm.getTaskList(0);
          break;
        case 3:
          vm.getWeatherList(0);
          break;
        case 4:
          vm.getWormList(0);
          break;
        case 5:
          vm.getTempList(1);
          break;
        case 6:
          vm.getGasList(0);
          break;
        case 7:
          vm.getFumList(0);
          break;
        case 8:
          vm.getQSList(0);
          break;
        case 9:
          vm.getMapList(0);
          break;
        case 10:
          vm.guideStep = 1;
          vm.getStorageList(0);
          break;
        case 11:
          vm.guideStep = 2;
          vm.getStorageList(0);
          break;
        case 12:
          vm.guideStep = 3;
          vm.getStorageList(0);
          break;
        case 13:
          vm.guideStep = 4;
          vm.getStorageList(0);
          break;
        case 14:
          vm.guideStep = 5;
          vm.getStorageList(0);
          break;
        case 15:
          vm.guideStep = 6;
          vm.getStorageList(0);
          break;
        case 16:
          vm.guideStep = 1;
          vm.getOutOfStorageList(0);
          break;
        case 17:
          vm.guideStep = 4;
          vm.getOutOfStorageList(0);
          break;
        case 18:
          vm.guideStep = 5;
          vm.getOutOfStorageList(0);
          break;
        case 19:
          vm.guideStep = 6;
          vm.getOutOfStorageList(0);
          break;
      }
    },
    jumpDetail: function(id, data) {
      //跳转到详情
      var vm = this;
      var url;
      if (vm.traceabilityType == "1") {
        switch (vm.guideStep) {
          case 1:
            url = "registerDetail";
            break;
          case 2:
            url = "samplingDetail";
            break;
          case 3:
            url = "checkoutDetail";
            break;
          case 4:
            url = "meteringDetail";
            break;
          case 5:
            url = "valueBinDetail";
            break;
          case 6:
            url = "settleDetail";
            break;
          case 7:
            url = "pinCardDetail";
            break;
        }
        this.$router.push({
          name: url,
          query: {
            id: id,
            data: data,
            type: "safe"
          }
        });
      }
      if (vm.traceabilityType == "2") {
        switch (vm.guideStep) {
          case 1:
            url = "registerOutDetail";
            break;
          case 4:
            url = "meteringOutDetail";
            break;
          case 5:
            url = "valueBinOutDetail";
            break;
          case 6:
            url = "settleOutDetail";
            break;
          case 7:
            url = "pinCardOutDetail";
            break;
        }
        this.$router.push({
          name: url,
          query: {
            id: id,
            data: data,
            type: "safe"
          }
        });
      }
      if (vm.traceabilityType == "0") {
        switch (parseInt(vm.traceabilityItem)) {
          case 1:
            url = "grainInspectionDetail";
            this.$router.push({
              name: url,
              query: {
                id: id
              }
            });
            break;
          case 2:
            url = "aerationTaskDetail";
            this.$router.push({
              name: url,
              query: {
                id: id
              }
            });
            break;
          case 6:
            url = "gasDetectionDetail";
            this.$router.push({
              name: url,
              query: {
                // id: id,
                gasMonitor: id
              }
            });
            break;
          case 7:
            url = "workSheetDetail";
            this.$router.push({
              name: url,
              query: {
                id: id
              }
            });
            break;
          case 8:
            url = "managementDetail";
            this.$router.push({
              name: url,
              query: {
                qualityBillId: id
              }
            });
            break;
          case 9:
            url = "nitrogenAndOxygenDetail";
            this.$router.push({
              name: url,
              query: {
                id: id
              }
            });
            break;
        }
      }
    },
    detailBack: function() {
      this.$router.back(-1);
    }
  },
  mounted() {
    var vm = this;
    vm.getDetail();
  }
};
</script>

