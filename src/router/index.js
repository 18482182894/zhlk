import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/leftMenu'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/desktop',
      component: Index,
    },
    {
      path: '/system',
      name: 'system',
      component: Index,
      children: [
        //系统管理
        {
          path: '/desktop', name: 'desktop', component: () => import('@/page/desktop'), meta: {
          name: '首页',
          path: '/desktop'
        }
        },
        {
          path: '/system/menuManage', name: 'menuManage', component: () => import('@/page/systemManagement/menuManagement/menuManagement'), meta: {
          name: '系统管理系统>菜单管理',
          path: '/system/menuManage'
        }
        },
        {
          path: '/system/menuManage/Next', name: 'menuManageNext', component: () => import('@/page/systemManagement/menuManagement/menuManagementNext'), meta: {
          name: '系统管理系统>菜单管理',
          path: '/system/menuManage'
        }
        },
        {
          path: '/system/operationLog', name: 'operationLog', component: () => import('@/page/systemManagement/operationLog'), meta: {
          name: '系统管理系统>操作日志',
          path: '/system/operationLog'
        }
        },
        {
          path: '/system/roleManage', name: 'roleManage', component: () => import('@/page/systemManagement/roleManagement/roleManage'), meta: {
          name: '系统管理系统>角色与权限管理',
          path: '/system/roleManage'
        }
        },
        {
          path: '/system/changeRole', name: 'changeRole', component: () => import('@/page/systemManagement/roleManagement/changeRole'), meta: {
          name: '角色与权限管理>添加权限',
          path: '/system/changeRole'
        }
        },
        {
          path: '/system/userManage', name: 'userManage', component: () => import('@/page/systemManagement/userManagement/userManage'), meta: {
          name: '系统管理系统>用户管理',
          path: '/system/userManage'
        }
        },
        {
          path: '/system/userManage/Detail', name: 'userManageDetail', component: () => import('@/page/systemManagement/userManagement/userManageDetail'), meta: {
          name: ['系统管理系统>用户管理', '用户详情'],
          path: ['/system/userManage', '/system/userManage/Detail']
        }
        },
        {
          path: '/system/userManage/Edit', name: 'userManageEdit', component: () => import('@/page/systemManagement/userManagement/userManageEdit'), meta: {
          name: ['系统管理系统>用户管理', '用户编辑'],
          path: ['/system/userManage', '/system/userManagement/userManageEdit']
        }
        },
        {
          path: '/system/userManage/changePwd', name: 'userChangePassword', component: () => import('@/page/systemManagement/userManagement/userChangePassword'), meta: {
          name: ['用户管理', '更改密码'],
          path: ['/system/userManage', '/system/userManagement/userChangePassword']
        }
        },
        {
          path: '/system/priceManage', name: 'priceManage', component: () => import('@/page/systemManagement/priceManagement/priceManage'), meta: {
          name: '系统管理系统>价格管理',
          path: '/system/priceManage'
        }
        },
        {
          path: '/system/priceManage/Detail', name: 'priceManageDetail', component: () => import('@/page/systemManagement/priceManagement/priceManageDetail'), meta: {
          name: ['系统管理系统>价格管理', '价格详情'],
          path: ['/system/priceManage', '/system/priceManage/Detail']
        }
        },
        {
          path: '/system/priceManage/Edit', name: 'priceManageEdit', component: () => import('@/page/systemManagement/priceManagement/priceManageEdit'), meta: {
          name: ['系统管理系统>价格管理', '价格编辑'],
          path: ['/system/priceManage', '/system/priceManage/Edit']
        }
        },
        {
          path: '/system/testSetup', name: 'testSetup', component: () => import('@/page/systemManagement/testSetup/testSetup'), meta: {
          name: '系统管理系统>检化验标准',
          path: '/system/testSetup/testSetup'
        }
        },
        {
          path: '/system/testSetup/Detail', name: 'testSetupDetail', component: () => import('@/page/systemManagement/testSetup/testSetupDetail'), meta: {
          name: ['系统管理系统>检化验标准', '标准详情'],
          path: ['/system/testSetup/testSetup', '/system/testSetup/Detail']
        }
        },
        {
          path: '/system/testSetup/Edit', name: 'testSetupEdit', component: () => import('@/page/systemManagement/testSetup/testSetupEdit'), meta: {
          name: ['系统管理系统>检化验标准', '标准的编辑'],
          path: ['/system/testSetup/testSetup', '/system/testSetup/Edit']
        }
        },
        {
          path: '/system/testSetup/indexItem', name: 'indexItem', component: () => import('@/page/systemManagement/testSetup/indexItem'), meta: {
          name: ['系统管理系统>检化验标准', '指标项'],
          path: ['/system/testSetup/testSetup', '/system/testSetup/indexItem']
        }
        },
        {
          path: '/system/testSetup/IncreaseDeductionPreferences', name: 'IncreaseDeductionPreferences', component: () => import('@/page/systemManagement/testSetup/IncreaseDeductionPreferences'), meta: {
          name: ['系统管理系统>检化验标准', '增扣量参数配置'],
          path: ['/system/testSetup/testSetup', '/system/testSetup/IncreaseDeductionPreferences']
        }
        },
        {
          path: '/system/testSetup/indexItemPreferences', name: 'indexItemPreferences', component: () => import('@/page/systemManagement/testSetup/indexItemPreferences'), meta: {
          name: ['系统管理系统>检化验标准', '储存指标参数配置'],
          path: ['/system/testSetup/testSetup', '/system/testSetup/indexItemPreferences']
        }
        },

        {
          path: '/system/formula', name: 'formula', component: () => import('@/page/systemManagement/formulaManagement/formula'), meta: {
          name: '公式维护',
          path: '/system/formula'
        }
        },
        {
          path: '/system/formula/Detail', name: 'formulaDetail', component: () => import('@/page/systemManagement/formulaManagement/formulaDetail'), meta: {
          name: ['公式维护', '公式详情'],
          path: ['/system/formula', '/system/formula/Detail']
        }
        },
        {
          path: '/system/formula/Edit', name: 'formulaEdit', component: () => import('@/page/systemManagement/formulaManagement/formulaEdit'), meta: {
          name: ['公式维护', '公式编辑'],
          path: ['/system/formula', '/system/formula/Edit']
        }
        },
        {
          path: '/system/formula/formulaItem', name: 'formulaItem', component: () => import('@/page/systemManagement/formulaManagement/formulaItem'), meta: {
          name: ['公式维护', '计算项管理'],
          path: ['/system/formula', '/system/formula/formulaItem']
        }
        },
        {
          path: '/system/calculate', name: 'calculate', component: () => import('@/page/systemManagement/calculateItem/calculateItem'), meta: {
          name: '计算项',
          path: '/system/calculate'
        }
        },
        {
          path: '/system/department', name: 'department', component: () => import('@/page/systemManagement/departmentManagement/department'), meta: {
          name: '系统管理系统>部门管理',
          path: '/system/department'
        }
        },
        {
          path: '/system/department/Post', name: 'departmentPost', component: () => import('@/page/systemManagement/departmentManagement/departmentPost'), meta: {
          name: ['系统管理系统>部门管理', '岗位'],
          path: ['/system/department', '/system/department/Post']
        }
        },
        {
          path: '/system/staffManage', name: 'staffManage', component: () => import('@/page/systemManagement/staffManagement/staffManage'), meta: {
          name: '系统管理系统>员工管理',
          path: '/system/staffManage'
        }
        },
        {
          path: '/system/staffManage/Detail', name: 'staffManageDetail', component: () => import('@/page/systemManagement/staffManagement/staffManageDetail'), meta: {
          name: ['系统管理系统>员工管理', '员工详情'],
          path: ['/system/staffManage', '/system/staffManage/staffManageDetail']
        }
        },
        {
          path: '/system/staffManage/Edit', name: 'staffManageEdit', component: () => import('@/page/systemManagement/staffManagement/staffManageEdit'), meta: {
          name: ['系统管理系统>员工管理', '员工编辑'],
          path: ['/system/staffManage', '/system/staffManage/staffManageEdit']
        }
        },
        {
          path: '/system/staffManage/Departure',name: 'staffManageDeparture',component: () => import ('@/page/systemManagement/staffManagement/staffManageDeparture'),meta: {
          name: ['系统管理系统>员工管理', '员工离职'],
          path: ['/system/staffManage', '/system/staffManage/staffManageDeparture']
        }
        },
        {
          path: '/system/basicDataMain', name: 'basicDataMain', component: () => import('@/page/systemManagement/basicData/basicDataMain'), meta: {
          name: '系统管理系统>公共基础数据',
          path: '/system/basicDataMain'
        }
        },
        {
          path: '/system/cardList', name: 'cardList', component: () => import('@/page/systemManagement/cardManagement/cardList'), meta: {
          name: '系统管理系统>卡管理',
          path: '/system/cardList'
        }
        },
        {
          path: '/system/cardEdit', name: 'cardEdit', component: () => import('@/page/systemManagement/cardManagement/cardEdit'), meta: {
          name: ['系统管理系统>卡管理', '卡编辑'],
          path: ['/system/cardEdit', '/system/cardEdit']
        }
        },
        {
          path: '/system/bankAccount', name: 'bankAccount', component: () => import('@/page/systemManagement/basicData/bankAccount/bankAccount'), meta: {
          name: '系统管理系统>银行账户管理',
          path: '/system/bankAccount'
        }
        },
        {
          path: '/system/bankAccount/Detail', name: 'bankAccountDetail', component: () => import('@/page/systemManagement/basicData/bankAccount/bankAccountDetail'), meta: {
          name: ['系统管理系统>银行账户管理', '银行账户详情'],
          path: ['/system/bankAccount', '/system/bankAccount/bankAccountDetail']
        }
        },
        {
          path: '/system/bankAccount/Edit', name: 'bankAccountEdit', component: () => import('@/page/systemManagement/basicData/bankAccount/bankAccountEdit'), meta: {
          name: ['系统管理系统>银行账户管理', '银行账户编辑'],
          path: ['/system/bankAccount', '/system/bankAccount/bankAccountEdit']
        }
        },

        {
          path: '/system/libraryType', name: 'libraryType', component: () => import('@/page/systemManagement/basicData/libraryType/libraryType'), meta: {
          name: '系统管理系统>库点类型',
          path: '/system/basicData/libraryType'
        }
        },
        {
          path: '/system/libraryType/Detail', name: 'libraryTypeDetail', component: () => import('@/page/systemManagement/basicData/libraryType/libraryTypeDetail'), meta: {
          name: ['系统管理系统>库点类型', '库点类型详情'],
          path: ['/system/basicData/libraryType', '/system/libraryType/Detail']
        }
        },
        {
          path: '/system/libraryType/Edit', name: 'libraryTypeEdit', component: () => import('@/page/systemManagement/basicData/libraryType/libraryTypeEdit'), meta: {
          name: ['系统管理系统>库点类型', '库点类型编辑'],
          path: ['/system/basicData/libraryType', '/system/libraryType/Edit']
        }
        },
        {
          path: '/system/libraryManage', name: 'libraryManage', component: () => import('@/page/systemManagement/basicData/libraryManage/libraryManage'), meta: {
          name: '系统管理系统>库点管理',
          path: '/system/libraryManage'
        }
        },
        {
          path: '/system/libraryManage/Detail', name: 'libraryManageDetail', component: () => import('@/page/systemManagement/basicData/libraryManage/libraryManageDetail'), meta: {
          name: ['系统管理系统>库点管理', '库点详情'],
          path: ['/system/libraryManage', '/system/libraryManage/Detail']
        }
        },
        {
          path: '/system/libraryManage/Edit', name: 'libraryManageEdit', component: () => import('@/page/systemManagement/basicData/libraryManage/libraryManageEdit'), meta: {
          name: ['系统管理系统>库点管理', '库点编辑'],
          path: ['/system/libraryManage', '/system/libraryManage/Edit']
        }
        },
        // { path: '/system/gradeLY', name: 'gradeLY', component: () => import('@/page/systemManagement/basicData/gradeLY/gradeLY') },
        // { path: '/system/gradeLY/Detail', name: 'gradeLYDetail', component: () => import('@/page/systemManagement/basicData/gradeLY/gradeLYDetail') },
        // { path: '/system/gradeLY/Edit', name: 'gradeLYEdit', component: () => import('@/page/systemManagement/basicData/gradeLY/gradeLYEdit') },
        {
          path: '/system/grainVarieties', name: 'grainVarieties', component: () => import('@/page/systemManagement/basicData/grainVarieties/grainVarieties'), meta: {
          name: '系统管理系统>粮食品种',
          path: '/system/grainVarieties'
        }
        },
        {
          path: '/system/grainVarieties/Detail', name: 'grainVarietiesDetail', component: () => import('@/page/systemManagement/basicData/grainVarieties/grainVarietiesDetail'), meta: {
          name: ['系统管理系统>粮食品种', '品种详情'],
          path: ['/system/grainVarieties', '/system/grainVarieties/Detail']
        }
        },
        {
          path: '/system/grainVarieties/Edit', name: 'grainVarietiesEdit', component: () => import('@/page/systemManagement/basicData/grainVarieties/grainVarietiesEdit'), meta: {
          name: ['系统管理系统>粮食品种', '品种编辑'],
          path: ['/system/grainVarieties', '/system/grainVarieties/Edit']
        }
        },
        {
          path: '/system/grainVarieties/Next', name: 'grainVarietiesNext', component: () => import('@/page/systemManagement/basicData/grainVarieties/grainVarietiesNext'), meta: {
          name: '系统管理系统>粮食品种',
          path: '/system/grainVarieties/Next'
        }
        },
        {
          path: '/system/company', name: 'company', component: () => import('@/page/systemManagement/basicData/company/company'), meta: {
          name: '系统管理系统>仓储企业',
          path: '/system/company'
        }
        },
        {
          path: '/system/company/Detail', name: 'companyDetail', component: () => import('@/page/systemManagement/basicData/company/companyDetail'), meta: {
          name: ['系统管理系统>仓储企业', '仓储企业详情'],
          path: ['/system/company', '/system/company/Detail']
        }
        },
        {
          path: '/system/company/Edit', name: 'companyEdit', component: () => import('@/page/systemManagement/basicData/company/companyEdit'), meta: {
          name: ['系统管理系统>仓储企业', '仓储企业编辑'],
          path: ['/system/company', '/system/company/Edit']
        }
        },
        {
          path: '/system/warehouse', name: 'warehouse', component: () => import('@/page/systemManagement/basicData/warehouse/warehouse'), meta: {
          name: '系统管理系统>仓房管理',
          path: '/system/warehouse'
        }
        },
        {
          path: '/system/warehouse/Detail', name: 'warehouseDetail', component: () => import('@/page/systemManagement/basicData/warehouse/warehouseDetail'), meta: {
          name: ['系统管理系统>仓房管理', '仓房管理详情'],
          path: ['/system/warehouse', '/system/warehouse/Detail']
        }
        },
        {
          path: '/system/warehouse/Edit', name: 'warehouseEdit', component: () => import('@/page/systemManagement/basicData/warehouse/warehouseEdit'), meta: {
          name: ['系统管理系统>仓房管理', '仓房编辑'],
          path: ['/system/warehouse', '/system/warehouse/Edit']
        }
        },
        {
          path: '/system/granary', name: 'granary', component: () => import('@/page/systemManagement/basicData/granary/granary'), meta: {
          name: '系统管理系统>廒间管理',
          path: '/system/granary'
        }
        },
        {
          path: '/system/granary/Detail', name: 'granaryDetail', component: () => import('@/page/systemManagement/basicData/granary/granaryDetail'), meta: {
          name: ['系统管理系统>廒间管理', '廒间详情'],
          path: ['/system/granary', '/system/granary/Detail']
        }
        },
        {
          path: '/system/granary/Edit', name: 'granaryEdit', component: () => import('@/page/systemManagement/basicData/granary/granaryEdit'), meta: {
          name: ['系统管理系统>廒间管理', '廒间编辑'],
          path: ['/system/granary', '/system/granary/Edit']
        }
        },
        {
          path: '/system/goodsAllocation', name: 'goodsAllocation', component: () => import('@/page/systemManagement/basicData/goodsAllocation/goodsAllocation'), meta: {
          name: '系统管理系统>货位管理',
          path: '/system/goodsAllocation'
        }
        },
        {
          path: '/system/goodsAllocation/Detail', name: 'goodsAllocationDetail', component: () => import('@/page/systemManagement/basicData/goodsAllocation/goodsAllocationDetail'), meta: {
          name: ['系统管理系统>货位管理', '货位详情'],
          path: ['/system/goodsAllocation', '/system/goodsAllocation/Detail']
        }
        },
        {
          path: '/system/goodsAllocation/Edit', name: 'goodsAllocationEdit', component: () => import('@/page/systemManagement/basicData/goodsAllocation/goodsAllocationEdit'), meta: {
          name: ['系统管理系统>货位管理', '货位编辑'],
          path: ['/system/goodsAllocation', '/system/goodsAllocation/Edit']
        }
        },
        {
          path: '/system/oilTank', name: 'oilTank', component: () => import('@/page/systemManagement/basicData/oilTank/oilTank'), meta: {
          name: '系统管理系统>油罐管理',
          path: '/system/oilTank'
        }
        },
        {
          path: '/system/oilTank/Detail', name: 'oilTankDetail', component: () => import('@/page/systemManagement/basicData/oilTank/oilTankDetail'), meta: {
          name: ['系统管理系统>油罐管理', '油罐详情'],
          path: ['/system/oilTank', '/system/oilTank/Detail']
        }
        },
        {
          path: '/system/oilTank/Edit', name: 'oilTankEdit', component: () => import('@/page/systemManagement/basicData/oilTank/oilTankEdit'), meta: {
          name: ['系统管理系统>油罐管理', '油罐编辑'],
          path: ['/system/oilTank', '/system/oilTank/Edit']
        }
        },
        {
          path: '/system/dataList/uploadData', name: 'uploadDataList', component: () => import('@/page/systemManagement/dataListManagement/uploadDataList'), meta: {
          name: '上传数据列表',
          path: '/system/dataList/uploadData'
        }
        },
        {
          path: '/system/dataList/queryTableList', name: 'queryTableList', component: () => import('@/page/systemManagement/dataListManagement/queryTableList'), meta: {
          name: '查询表类型列表',
          path: '/system/dataList/queryTableList'
        }
        },

        //粮库业务
        {
          path: '/business/plan', name: 'planManage', component: () => import('@/page/grainDepotBusiness/planManage/planManage'), meta: {
          name: '粮库业务系统>计划管理',
          path: '/business/plan'
        }
        },
        {
          path: '/business/plan/detail', name: 'planManageDetail', component: () => import('@/page/grainDepotBusiness/planManage/planManageDetail'), meta: {
          name: ['粮库业务系统>计划管理', '计划详情'],
          path: ['/business/plan', '/business/plan/detail']
        }
        },
        {
          path: '/business/plan/edit', name: 'planManageEdit', component: () => import('@/page/grainDepotBusiness/planManage/planManageEdit'), meta: {
          name: ['粮库业务系统>计划管理', '计划编辑'],
          path: ['/business/plan', '/business/plan/edit']
        }
        },
        {
          path: '/business/document', name: 'document', component: () => import('@/page/grainDepotBusiness/documentManage/document'), meta: {
          name: '粮库业务系统>来文管理',
          path: '/grainDepotBusiness/documentManage/document'
        }
        },
        {
          path: '/business/document/detail', name: 'documentDetail', component: () => import('@/page/grainDepotBusiness/documentManage/documentDetail'), meta: {
          name: ['粮库业务系统>来文管理', '来文详情'],
          path: ['/business/document', '/business/document/detail']
        }
        },
        {
          path: '/business/document/edit', name: 'documentEdit', component: () => import('@/page/grainDepotBusiness/documentManage/documentEdit'), meta: {
          name: ['粮库业务系统>来文管理', '来文编辑'],
          path: ['/business/document', '/business/document/edit']
        }
        },
        //   name:'计划编辑',
        //   path: '/grainDepotBusiness/planManage/planManageEdit'
        // } },
        //  { path: '/business/plan', name: 'planManage', component: () => import('@/page/grainDepotBusiness/planManage/planManage') },
        // { path: '/business/plan/detail', name: 'planManageDetail', component: () => import('@/page/grainDepotBusiness/planManage/planManageDetail') },
        //  { path: '/business/plan/edit', name: 'planManageEdit', component: () => import('@/page/grainDepotBusiness/planManage/planManageEdit') },
        //   { path: '/business/document', name: 'document', component: () => import('@/page/grainDepotBusiness/documentManage/document') },
        //   { path: '/business/document/detail', name: 'documentDetail', component: () => import('@/page/grainDepotBusiness/documentManage/documentDetail') },
        //   { path: '/business/document/edit', name: 'documentEdit', component: () => import('@/page/grainDepotBusiness/documentManage/documentEdit') },
        //   { path: '/business/customer', name: 'customer', component: () => import('@/page/grainDepotBusiness/customerManage/customer') },
        //   { path: '/business/customer/detail', name: 'customerDetail', component: () => import('@/page/grainDepotBusiness/customerManage/customerDetail') },
        //   { path: '/business/customer/edit', name: 'customerEdit', component: () => import('@/page/grainDepotBusiness/customerManage/customerEdit') },
        //   { path: '/business/customer/badRecord', name: 'badRecord', component: () => import('@/page/grainDepotBusiness/customerManage/badRecord') },
        //   { path: '/business/customer/badRecord/add', name: 'badRecordAdd', component: () => import('@/page/grainDepotBusiness/customerManage/badRecordAdd') },
        //   { path: '/business/contract', name: 'contract', component: () => import('@/page/grainDepotBusiness/contractManage/contract') },
        //   { path: '/business/contract/detail', name: 'contractDetail', component: () => import('@/page/grainDepotBusiness/contractManage/contractDetail') },
        //   { path: '/business/contract/edit', name: 'contractEdit', component: () => import('@/page/grainDepotBusiness/contractManage/contractEdit') },
        //   { path: '/business/request', name: 'request', component: () => import('@/page/grainDepotBusiness/request/request') },
        //   { path: '/business/request/detail', name: 'requestDetail', component: () => import('@/page/grainDepotBusiness/request/requestDetail') },
        //   { path: '/business/request/edit', name: 'requestEdit', component: () => import('@/page/grainDepotBusiness/request/requestEdit') },
        //   { path: '/business/notice', name: 'notice', component: () => import('@/page/grainDepotBusiness/notice/notice') },

        {
          path: '/business/customer', name: 'customer', component: () => import('@/page/grainDepotBusiness/customerManage/customer'), meta: {
          name: '粮库业务系统>客户管理',
          path: '/business/customer'
        }
        },
        {
          path: '/business/customer/detail', name: 'customerDetail', component: () => import('@/page/grainDepotBusiness/customerManage/customerDetail'), meta: {
          name: ['粮库业务系统>客户管理', '客户详情'],
          path: ['/business/customer', '/business/customer/detail']
        }
        },
        {
          path: '/business/customer/edit', name: 'customerEdit', component: () => import('@/page/grainDepotBusiness/customerManage/customerEdit'), meta: {
          name: ['粮库业务系统>客户管理', '客户编辑'],
          path: ['/business/customer', '/business/customer/edit']
        }
        },
        {
          path: '/business/customer/badRecord', name: 'badRecord', component: () => import('@/page/grainDepotBusiness/customerManage/badRecord'), meta: {
          name: ['粮库业务系统>客户管理', '不良记录'],
          path: ['/business/customer', '/business/customer/badRecord']
        }
        },
        {
          path: '/business/customer/badRecord/add', name: 'badRecordAdd', component: () => import('@/page/grainDepotBusiness/customerManage/badRecordAdd'), meta: {
          name: ['粮库业务系统>客户管理', '不良记录', '新增不良记录'],
          path: ['/business/customer', '/business/customer/badRecord', '/business/customer/badRecord/add']
        }
        },
        {
          path: '/business/contract', name: 'contract', component: () => import('@/page/grainDepotBusiness/contractManage/contract'), meta: {
          name: '粮库业务系统>合同管理',
          path: '/business/contract'
        }
        },
        {
          path: '/business/contract/detail', name: 'contractDetail', component: () => import('@/page/grainDepotBusiness/contractManage/contractDetail'), meta: {
          name: ['粮库业务系统>合同管理', '合同详情'],
          path: ['/business/contract', '/business/contract/detail']
        }
        },
        {
          path: '/business/contract/edit', name: 'contractEdit', component: () => import('@/page/grainDepotBusiness/contractManage/contractEdit'), meta: {
          name: ['粮库业务系统>合同管理', '合同编辑'],
          path: ['/business/contract', '/business/contract/edit']
        }
        },
        {
          path: '/business/put_request', name: 'request', component: () => import('@/page/grainDepotBusiness/request/request'), meta: {
          name: '粮库业务系统>入库申请单管理',
          path: '/business/put_request',warehouseType:1
        },
        },
        {
          path: '/business/out_request', name: 'out_request', component: () => import('@/page/grainDepotBusiness/request/request'), meta: {
          name: '粮库业务系统>出库申请单管理',
          path: '/business/out_request',warehouseType:2
        }
        },
        {
          path: '/business/request/detail', name: 'requestDetail', component: () => import('@/page/grainDepotBusiness/request/requestDetail'), meta: {
          name: ['粮库业务系统>申请单管理', '申请单详情'],
          path: ['/business/request', '/business/request/detail']
        }
        },
        {
          path: '/business/request/edit', name: 'requestEdit', component: () => import('@/page/grainDepotBusiness/request/requestEdit'), meta: {
          name: ['粮库业务系统>申请单管理', '申请单编辑'],
          path: ['/business/request', '/business/request/edit']
        }
        },
        {
          path: '/business/notice', name: 'notice', component: () => import('@/page/grainDepotBusiness/notice/notice'), meta: {
          name: '粮库业务系统>通知单管理',
          path: '/business/notice'
        }
        },
        {
          path: '/business/warehousingStock/main', name: 'warehousMain', component: () => import('@/page/grainDepotBusiness/warehousingStock/main'), meta: {
          name: '粮库业务系统>粮食库存',
          path: '/business/warehousingStock/main'
        }
        },
        {
          path: '/business/warehousingStock/storageDetails', name: 'storageDetails', component: () => import('@/page/grainDepotBusiness/warehousingStock/storageDetails'), meta: {
          name: '粮库业务系统>粮食库存详情',
          path: '/business/warehousingStock/storageDetails'
        }
        },
        {
          path: '/business/warehousingStock/inventoryAccount', name: 'inventoryAccount', component: () => import('@/page/grainDepotBusiness/warehousingStock/inventoryAccount/inventoryAccount'), meta: {
          name: '粮库业务系统>粮食库存',
          path: '/business/warehousingStock/inventoryAccount'
        }
        },
        {
          path: '/devicesManage/device', name: 'device', component: () => import('@/page/grainDepotBusiness/deviceManage/device'), meta: {
          name: '粮库业务系统>设备管理',
          path: '/grainDepotBusiness/deviceManage/device'
        }
        },
        {
          path: '/devicesManage/device/build', name: 'build', component: () => import('@/page/grainDepotBusiness/deviceManage/build'), meta: {
          name: '粮库业务系统>设备安装',
          path: '/grainDepotBusiness/deviceManage/build'
        }
        },
        {
          path: '/devicesManage/device/maintain', name: 'maintain', component: () => import('@/page/grainDepotBusiness/deviceManage/maintain'), meta: {
          name: '粮库业务系统>设备保养',
          path: '/devicesManage/device/maintain'
        }
        },
        {
          path: '/devicesManage/device/maintain/maintainEdit', name: 'maintainEdit', component: () => import('@/page/grainDepotBusiness/deviceManage/maintainEdit'), meta: {
          name: ['粮库业务系统>设备保养', '设备保养编辑'],
          path: ['/devicesManage/device/maintain', '/devicesManage/device/maintain/maintainEdit']
        }
        },
        {
          path: '/devicesManage/device/maintain/maintainDetail', name: 'maintainDetail', component: () => import('@/page/grainDepotBusiness/deviceManage/maintainDetail'), meta: {
          name: ['粮库业务系统>设备保养', '设备保养详情'],
          path: ['/devicesManage/device/maintain', '/grainDepotBusiness/deviceManage/maintainDetail']
        }
        },
        {
          path: '/devicesManage/device/initialize', name: 'initialize', component: () => import('@/page/grainDepotBusiness/deviceManage/initialize'), meta: {
          name: '粮库业务系统>设备初始化',
          path: '/grainDepotBusiness/deviceManage/initialize'
        }
        },
        {
          path: '/devicesManage/device/initialize/intializeDetail', name: 'intializeDetail', component: () => import('@/page/grainDepotBusiness/deviceManage/intializeDetail'), meta: {
          name: ['粮库业务系统>设备初始化', '设备初始化详情'],
          path: ['/devicesManage/device/initialize', '/devicesManage/device/initialize/intializeDetail']
        }
        },
        {
          path: '/devicesManage/device/initialize/initializeEdit', name: 'initializeEdit', component: () => import('@/page/grainDepotBusiness/deviceManage/initializeEdit'), meta: {
          name: ['粮库业务系统>设备初始化', '设备初始化编辑'],
          path: ['/devicesManage/device/initialize', '/devicesManage/device/initialize/initializeEdit']
        }
        },
        {
          path: '/devicesManage/device/fault', name: 'fault', component: () => import('@/page/grainDepotBusiness/deviceManage/fault'), meta: {
          name: '粮库业务系统>设备故障',
          path: '/devicesManage/device/fault'
        }
        },
        {
          path: '/devicesManage/device/fault/faultDetail', name: 'faultDetail', component: () => import('@/page/grainDepotBusiness/deviceManage/faultDetail'), meta: {
          name: ['粮库业务系统>设备故障', '设备故障详情'],
          path: ['/devicesManage/device/fault', '/devicesManage/device/fault/faultDetail']
        }
        },
        {
          path: '/devicesManage/device/fault/faultEdit', name: 'faultEdit', component: () => import('@/page/grainDepotBusiness/deviceManage/faultEdit'), meta: {
          name: ['粮库业务系统>设备故障', '设备故障编辑'],
          path: ['/devicesManage/device/fault', '/devicesManage/device/fault/faultEdit']
        }
        },
        {
          path: '/devicesManage/device/basicinfo', name: 'basicinfo', component: () => import('@/page/grainDepotBusiness/deviceManage/basicinfo'), meta: {
          name: '粮库业务系统>设备基础信息',
          path: '/devicesManage/device/basicinfo'
        }
        },
        {
          path: '/devicesManage/device/basicinfo/basicinfoDetail', name: 'basicinfoDetail', component: () => import('@/page/grainDepotBusiness/deviceManage/basicinfoDetail'), meta: {
          name: ['粮库业务系统>设备基础信息', '基础信息详情'],
          path: ['/devicesManage/device/basicinfo', '/devicesManage/device/basicinfo/basicinfoDetail']
        }
        },
        {
          path: '/devicesManage/device/basicinfo/basicinfoEdit', name: 'basicinfoEdit', component: () => import('@/page/grainDepotBusiness/deviceManage/basicinfoEdit'), meta: {
          name: ['粮库业务系统>设备基础信息', '基础信息编辑'],
          path: ['/devicesManage/device/basicinfo', '/devicesManage/device/basicinfo/basicinfoEdit']
        }
        },
        {
          path: '/devicesManage/device/putin', name: 'putin', component: () => import('@/page/grainDepotBusiness/deviceManage/putin'), meta: {
          name: '粮库业务系统>设备入库',
          path: '/devicesManage/device/putin'
        }
        },
        {
          path: '/devicesManage/device/putin/putinDetail', name: 'putinDetail', component: () => import('@/page/grainDepotBusiness/deviceManage/putinDetail'), meta: {
          name: ['粮库业务系统>设备入库', '入库详情'],
          path: ['/devicesManage/device/putin', '/devicesManage/device/putin/putinDetail']
        }
        },
        {
          path: '/devicesManage/device/putin/putinEdit', name: 'putinEdit', component: () => import('@/page/grainDepotBusiness/deviceManage/putinEdit'), meta: {
          name: ['粮库业务系统>设备入库', '入库编辑'],
          path: ['/devicesManage/device/putin', '/devicesManage/device/putin/putinEdit']
        }
        },
        {
          path: '/devicesManage/device/standing', name: 'standing', component: () => import('@/page/grainDepotBusiness/deviceManage/standing'), meta: {
          name: '粮库业务系统>设备台账',
          path: '/grainDepotBusiness/deviceManage/standing'
        }
        },
        {
          path: '/devicesManage/device/standingEdit', name: 'standingEdit', component: () => import('@/page/grainDepotBusiness/deviceManage/standingEdit'), meta: {
          name: ['粮库业务系统>设备台账','设备台账编辑'],
          path: ['/grainDepotBusiness/deviceManage/standing','/devicesManage/device/standingEdit']
        }
        },
        {
          path: '/devicesManage/device/debug', name: 'debug', component: () => import('@/page/grainDepotBusiness/deviceManage/debug'), meta: {
          name: '粮库业务系统>设备调试',
          path: '/devicesManage/device/debug'
        }
        },
        {
          path: '/devicesManage/device/debug/debugDetail', name: 'debugDetail', component: () => import('@/page/grainDepotBusiness/deviceManage/debugDetail'), meta: {
          name: ['粮库业务系统>设备调试', '设备调试详情'],
          path: ['/devicesManage/device/debug', '/devicesManage/device/debug/debugDetail']
        }
        },
        {
          path: '/devicesManage/device/debug/debugEdit', name: 'debugEdit', component: () => import('@/page/grainDepotBusiness/deviceManage/debugEdit'), meta: {
          name: ['粮库业务系统>设备调试', '设备调试编辑'],
          path: ['/devicesManage/device/debug', '/devicesManage/device/debug/debugEdit']
        }
        },
        {
          path: '/devicesManage/device/repair', name: 'repair', component: () => import('@/page/grainDepotBusiness/deviceManage/repair'), meta: {
          name: '粮库业务系统>设备维修',
          path: '/devicesManage/device/repair'
        }
        },
        {
          path: '/devicesManage/device/repair/repairDetail', name: 'repairDetail', component: () => import('@/page/grainDepotBusiness/deviceManage/repairDetail'), meta: {
          name: ['粮库业务系统>设备维修', '维修详情'],
          path: ['/devicesManage/device/repair', '/devicesManage/device/repair/repairDetail'],
        }
        },
        {
          path: '/devicesManage/device/repair/repairEdit', name: 'repairEdit', component: () => import('@/page/grainDepotBusiness/deviceManage/repairEdit'), meta: {
          name: ['粮库业务系统>设备维修', '设备维修编辑'],
          path: ['/devicesManage/device/repair', '/devicesManage/device/repair/repairEdit'],
        }
        },

        {
          path: '/devicesManage/device/check', name: 'check', component: () => import('@/page/grainDepotBusiness/deviceManage/check'), meta: {
          name: '粮库业务系统>设备验收',
          path: '/devicesManage/device/check'
        }
        },
        {
          path: '/devicesManage/device/check/checkDetail', name: 'checkDetail', component: () => import('@/page/grainDepotBusiness/deviceManage/checkDetail'), meta: {
          name: ['粮库业务系统>设备验收', '验收详情'],
          path: ['/devicesManage/device/check', '/devicesManage/device/check/checkDetail']
        }
        },
        {
          path: '/devicesManage/device/check/checkEdit', name: 'checkEdit', component: () => import('@/page/grainDepotBusiness/deviceManage/checkEdit'), meta: {
          name: ['粮库业务系统>设备验收', '设备验收编辑'],
          path: ['/devicesManage/device/check', '/devicesManage/device/check/checkEdit']
        }
        },
        {
          path: '/devicesManage/device/build/deviceDetail', name: 'deviceDetail', component: () => import('@/page/grainDepotBusiness/deviceManage/deviceDetail'), meta: {
          name: '粮库业务系统>设备详情',
          path: '/grainDepotBusiness/deviceManage/deviceDetail'
        }
        },
        {
          path: '/devicesManage/device/build/deviceEdit', name: 'deviceEdit', component: () => import('@/page/grainDepotBusiness/deviceManage/deviceEdit'), meta: {
          name: '粮库业务系统>设备编辑',
          path: '/grainDepotBusiness/deviceManage/deviceEdit'
        }
        },
        {
          path: '/devicesManage/device/scrap', name: 'scrap', component: () => import('@/page/grainDepotBusiness/deviceManage/scrap'), meta: {
          name: '粮库业务系统>设备报废',
          path: '/devicesManage/device/scrap'
        }
        },
        {
          path: '/devicesManage/device/scrap/scrapDetail', name: 'scrapDetail', component: () => import('@/page/grainDepotBusiness/deviceManage/scrapDetail'), meta: {
          name: ['粮库业务系统>设备报废', '设备报废详情'],
          path: ['/devicesManage/device/scrap', '/devicesManage/device/scrap/scrapDetail']
        }
        },
        {
          path: '/devicesManage/device/scrap/scrapEdit', name: 'scrapEdit', component: () => import('@/page/grainDepotBusiness/deviceManage/scrapEdit'), meta: {
          name: ['粮库业务系统>设备报废', '设备报废编辑'],
          path: ['/devicesManage/device/scrap', '/devicesManage/device/scrap/scrapEdit']
        }
        },
        {
          path: '/devicesManage/device/return', name: 'return', component: () => import('@/page/grainDepotBusiness/deviceManage/return'), meta: {
          name: '粮库业务系统>设备借用记录',
          path: '/devicesManage/device/return'
        }
        },
        {
          path: '/devicesManage/device/return/returnDetail', name: 'returnDetail', component: () => import('@/page/grainDepotBusiness/deviceManage/returnDetail'), meta: {
          name: ['粮库业务系统>设备借用记录', '设备借用记录详情'],
          path: ['/devicesManage/device/return', '/devicesManage/device/return/returnDetail']
        }
        },
        {
          path: '/devicesManage/device/return/returnEdit', name: 'returnEdit', component: () => import('@/page/grainDepotBusiness/deviceManage/returnEdit'), meta: {
          name: ['粮库业务系统>设备借用记录', '设备借用记录编辑'],
          path: ['/devicesManage/device/return', '/devicesManage/device/return/returnEdit']
        }
        },
        {
          path: '/devicesManage/device/choice', name: 'choice', component: () => import('@/page/grainDepotBusiness/deviceManage/choice'), meta: {
          name: '粮库业务系统>设备选择',
          path: '/devicesManage/device/choice'
        }
        },
        // { path: '/devicesManage/device/repair/repairDetail', name: 'repairDetail', component: () => import('@/page/grainDepotBusiness/deviceManage/repairDetail'),meta:{
        //     name:'维修详情',
        //     path: '/grainDepotBusiness/deviceManage/repairDetail'
        //   } },
        // { path: '/devicesManage/device/build/checkEdit', name: 'checkEdit', component: () => import('@/page/grainDepotBusiness/deviceManage/checkDetail'),meta:{
        //     name:'验收详情',
        //     path: '/grainDepotBusiness/deviceManage/checkDetail'
        //   } }

        {
          path: '/oa/notice/noticeList', name: 'noticeList', component: () => import('@/page/oa/notice/noticeList'), meta: {
          name: '行政办公系统>公告',
          path: '/oa/notice/noticeList'
        }
        },
        {
          path: '/oa/notice/noticeList/noticeDetail', name: 'noticeDetail', component: () => import('@/page/oa/notice/noticeDetail'), meta: {
          name: ['行政办公系统>公告', '公告详情'],
          path: ['/oa/notice/noticeList', '/oa/notice/noticeList/noticeDetail']
        }
        },
        {
          path: '/oa/notice/noticeList/noticeEdit', name: 'noticeEdit', component: () => import('@/page/oa/notice/noticeEdit'), meta: {
          name: ['行政办公系统>公告', '公告编辑'],
          path: ['/oa/notice/noticeList', '/oa/notice/noticeList/noticeEdit']
        }
        },

        {
          path: '/oa/workplan/workplanList', name: 'workplanList', component: () => import('@/page/oa/workplan/workplanList'), meta: {
          name: '行政办公系统>工作计划列表',
          path: '/oa/workplan/workplanList'
        }
        },
        {
          path: '/oa/workplan/workplanList/workDetail', name: 'workDetail', component: () => import('@/page/oa/workplan/workDetail'), meta: {
          name: ['行政办公系统>计划列表', '计划详情'],
          path: ['/oa/workplan/workplanList', '/oa/workplan/workplanList/workDetail']
        }
        },
        {
          path: '/oa/workplan/workplanList/workEdit', name: 'workEdit', component: () => import('@/page/oa/workplan/workEdit'), meta: {
          name: ['行政办公系统>计划列表', '计划编辑'],
          path: ['/oa/workplan/workplanList', '/oa/workplan/workplanList/workEdit']
        }
        },
        {
          path: '/oa/approval/approvalList', name: 'approvalList', component: () => import('@/page/oa/approval/approvalList'), meta: {
          name: '行政办公系统>工作审批',
          path: '/oa/approval/approvalList'
        }
        },
        {
          path: '/oa/approval/approvalList/approvalDetail', name: 'approvalDetail', component: () => import('@/page/oa/approval/approvalDetail'), meta: {
          name: ['行政办公系统>工作审批', '审批详情'],
          path: ['/oa/approval/approvalList', '/oa/approval/approvalList/approvalDetail']
        }
        },
        {
          path: '/oa/approval/approvalList/approval', name: 'approval', component: () => import('@/page/oa/approval/approval'), meta: {
          name: ['行政办公系统>工作审批', '审批'],
          path: ['/oa/approval/approvalList', '/oa/approval/approvalList/approval']
        }
        },
        {
          path: '/oa/process/myProcess', name: 'myProcess', component: () => import('@/page/oa/process/myProcess'), meta: {
          name: '行政办公系统>我的流程',
          path: '/oa/process/myProcess'
        }
        },
        {
          path: '/oa/process/myProcess/addProcess', name: 'addProcess', component: () => import('@/page/oa/process/addProcess'), meta: {
          name: ['行政办公系统>我的流程', '添加流程'],
          path: ['/oa/process/myProcess', '/oa/process/myProcess/addProcess']
        }
        },
        {
          path: '/oa/leave/leaveList', name: 'leaveList', component: () => import('@/page/oa/leave/leaveList'), meta: {
          name: '行政办公系统>请假',
          path: '/oa/leave/leaveList'
        }
        },

        {
          path: '/oa/leave/leaveList/leaveDetail', name: 'leaveDetail', component: () => import('@/page/oa/leave/leaveDetail'), meta: {
          name: ['行政办公系统>请假', '请假详情'],
          path: ['/oa/leave/leaveList', '/oa/leave/leaveList/leaveDetail']
        }
        },
        {
          path: '/oa/leave/leaveList/leaveEdit', name: 'leaveEdit', component: () => import('@/page/oa/leave/leaveEdit'), meta: {
          name: ['行政办公系统>请假', '编辑请假申请'],
          path: ['/oa/leave/leaveList', '/oa/leave/leaveList/leaveEdit']
        }
        },
        {
          path: '/oa/reimb/reimbList', name: 'reimbList', component: () => import('@/page/oa/reimb/reimbList'), meta: {
          name: '行政办公系统>申请报销',
          path: '/oa/reimb/reimbList'
        }
        },
        {
          path: '/oa/reimb/reimbList/reimbDetail', name: 'reimbDetail', component: () => import('@/page/oa/reimb/reimbDetail'), meta: {
          name: ['行政办公系统>申请报销', '报销详情'],
          path: ['/oa/reimb/reimbList', '/oa/reimb/reimbList/reimbDetail']
        }
        },
        {
          path: '/oa/reimb/reimbList/reimbEdit', name: 'reimbEdit', component: () => import('@/page/oa/reimb/reimbEdit'), meta: {
          name: ['行政办公系统>申请报销', '申请报销编辑'],
          path: ['/oa/reimb/reimbList', '/oa/reimb/reimbList/reimbEdit']
        }
        },
        {
          path: '/oa/setup/setupList', name: 'setupList', component: () => import('@/page/oa/setup/setupList'), meta: {
          name: '行政办公系统>业务流程设置',
          path: '/oa/setup/setupList'
        }
        },
        {
          path: '/oa/setup/setupList/setupDetail', name: 'setupDetail', component: () => import('@/page/oa/setup/setupDetail'), meta: {
          name: ['行政办公系统>业务流程设置', '业务流程详情'],
          path: ['/oa/setup/setupList', '/oa/setup/setupList/setupDetail']
        }
        },
        {
          path: '/oa/setup/setupList/setupEdit', name: 'setupEdit', component: () => import('@/page/oa/setup/setupEdit'), meta: {
          name: ['行政办公系统>业务流程设置', '业务流程编辑'],
          path: ['/oa/setup/setupList', '/oa/setup/setupList/setupEdit']
        }
        },
        {
          path: '/oa/switch/switchList', name: 'switchList', component: () => import('@/page/oa/switch/switchList'), meta: {
          name: '行政办公系统>流程业务开关',
          path: '/oa/switch/switchList'
        }
        },
        {
          path: '/oa/switch/switchList/switchEdit', name: 'switchEdit', component: () => import('@/page/oa/switch/switchEdit'), meta: {
          name: ['行政办公系统>流程业务开关', '创建业务流程开关'],
          path: ['/oa/switch/switchList', '/oa/switch/switchList/switchEdit']
        }
        },

        {
          path: '/business/warehousingStock/inventoryAccount', name: 'inventoryAccount', component: () => import('@/page/grainDepotBusiness/warehousingStock/inventoryAccount/inventoryAccount'), meta: {
          name: ['粮食库存', '库存台账'],
          path: ['/business/warehousingStock/main', '/business/warehousingStock/inventoryAccount']
        }
        },
        {
          path: '/business/warehousingStock/inventoryAccount/detail', name: 'ledgerDetail', component: () => import('@/page/grainDepotBusiness/warehousingStock/inventoryAccount/ledgerDetail'), meta: {
          name: ['粮食库存', '库存台账', '台账详情'],
          path: ['/business/warehousingStock/main', '/business/warehousingStock/inventoryAccount', '/business/warehousingStock/inventoryAccount/detail']
        }
        },
        {
          path: '/business/warehousingStock/ledgerHistory', name: 'ledgerHistory', component: () => import('@/page/grainDepotBusiness/warehousingStock/inventoryAccount/ledgerHistory'), meta: {
          name: ['粮食库存', '历史台账'],
          path: ['/business/warehousingStock/main', '/business/warehousingStock/ledgerHistory']
        }
        },
        {
          path: '/business/warehousingStock/qualitative', name: 'qualitative', component: () => import('@/page/grainDepotBusiness/warehousingStock/qualitative/qualitative'), meta: {
          name: ['粮食库存', '定性管理'],
          path: ['/business/warehousingStock/main', '/business/warehousingStock/qualitative']
        }
        },
        {
          path: '/business/warehousingStock/qualitative/detail', name: 'qualitativeDetail', component: () => import('@/page/grainDepotBusiness/warehousingStock/qualitative/qualitativeDetail'), meta: {
          name: ['粮食库存', '定性管理', '定性详情'],
          path: ['/business/warehousingStock/main', '/business/warehousingStock/qualitative', '/business/warehousingStock/qualitative/detail']
        }
        },
        {
          path: '/business/warehousingStock/qualitative/edit', name: 'qualitativeEdit', component: () => import('@/page/grainDepotBusiness/warehousingStock/qualitative/qualitativeEdit'), meta: {
          name: ['粮食库存', '定性管理', '定性编辑'],
          path: ['/business/warehousingStock/main', '/business/warehousingStock/qualitative', '/business/warehousingStock/qualitative/edit']
        }
        },
        {
          path: '/business/warehousingStock/transfer', name: 'transfer', component: () => import('@/page/grainDepotBusiness/warehousingStock/transfer/transfer'), meta: {
          name: ['粮食库存', '移交管理'],
          path: ['/business/warehousingStock/main', '/business/warehousingStock/transfer']
        }
        },
        {
          path: '/business/warehousingStock/transfer/detail', name: 'transferDetail', component: () => import('@/page/grainDepotBusiness/warehousingStock/transfer/transferDetail'), meta: {
          name: ['粮食库存', '移交管理', '移交详情'],
          path: ['/business/warehousingStock/main', '/business/warehousingStock/transfer', '/business/warehousingStock/transfer/detail']
        }
        },
        {
          path: '/business/warehousingStock/transfer/edit', name: 'transferEdit', component: () => import('@/page/grainDepotBusiness/warehousingStock/transfer/transferEdit'), meta: {
          name: ['粮食库存', '移交管理', '移交编辑'],
          path: ['/business/warehousingStock/main', '/business/warehousingStock/transfer', '/business/warehousingStock/transfer/edit']
        }
        },
        {
          path: '/business/warehousingStock/profitAndLoss', name: 'profitAndLoss', component: () => import('@/page/grainDepotBusiness/warehousingStock/profitAndLoss/profitAndLoss'), meta: {
          name: ['粮食库存', '损益管理'],
          path: ['/business/warehousingStock/main', '/business/warehousingStock/profitAndLoss']
        }
        },
        {
          path: '/business/warehousingStock/profitAndLoss/detail', name: 'profitAndLossDetail', component: () => import('@/page/grainDepotBusiness/warehousingStock/profitAndLoss/profitAndLossDetail'), meta: {
          name: ['粮食库存', '损益管理', '损益详情'],
          path: ['/business/warehousingStock/main', '/business/warehousingStock/profitAndLoss', '/business/warehousingStock/profitAndLoss/detail']
        }
        },
        {
          path: '/business/warehousingStock/profitAndLoss/edit', name: 'profitAndLossEdit', component: () => import('@/page/grainDepotBusiness/warehousingStock/profitAndLoss/profitAndLossEdit'), meta: {
          name: ['粮食库存', '损益管理', '损益编辑'],
          path: ['/business/warehousingStock/main', '/business/warehousingStock/profitAndLoss', '/business/warehousingStock/profitAndLoss/edit']
        }
        },
        {
          path: '/business/warehousingStock/reverse', name: 'reverse', component: () => import('@/page/grainDepotBusiness/warehousingStock/reverse/reverse'), meta: {
          name: ['粮食库存', '倒仓作业'],
          path: ['/business/warehousingStock/main', '/business/warehousingStock/reverse']
        }
        },
        {
          path: '/business/warehousingStock/reverse/detail', name: 'reverseDetail', component: () => import('@/page/grainDepotBusiness/warehousingStock/reverse/reverseDetail'), meta: {
          name: ['粮食库存', '倒仓作业', '倒仓详情'],
          path: ['/business/warehousingStock/main', '/business/warehousingStock/reverse', '/business/warehousingStock/reverse/detail']
        }
        },
        {
          path: '/business/warehousingStock/reverse/edit', name: 'reverseEdit', component: () => import('@/page/grainDepotBusiness/warehousingStock/reverse/reverseEdit'), meta: {
          name: ['粮食库存', '倒仓作业', '倒仓编辑'],
          path: ['/business/warehousingStock/main', '/business/warehousingStock/reverse', '/business/warehousingStock/reverse/edit']
        }
        },
        {
          path: '/business/warehousingStock/stockChecks', name: 'stockChecks', component: () => import('@/page/grainDepotBusiness/warehousingStock/stockChecks/stockChecks'), meta: {
          name: ['粮食库存', '库存盘点'],
          path: ['/business/warehousingStock/main', '/business/warehousingStock/stockChecks']
        }
        },
        {
          path: '/business/warehousingStock/stockChecks/detail', name: 'stockChecksDetail', component: () => import('@/page/grainDepotBusiness/warehousingStock/stockChecks/stockChecksDetail'), meta: {
          name: ['粮食库存', '库存盘点', '库存盘点详情'],
          path: ['/business/warehousingStock/main', '/business/warehousingStock/stockChecks', '/business/warehousingStock/stockChecks/detail']
        }
        },
        {
          path: '/business/warehousingStock/stockChecks/edit', name: 'stockChecksEdit', component: () => import('@/page/grainDepotBusiness/warehousingStock/stockChecks/stockChecksEdit'), meta: {
          name: ['粮食库存', '库存盘点', '库存盘点新增'],
          path: ['/business/warehousingStock/main', '/business/warehousingStock/stockChecks', '/business/warehousingStock/stockChecks/edit']
        }
        },
        {
          path: '/business/warehousingStock/generalLedger', name: 'generalLedger', component: () => import('@/page/grainDepotBusiness/warehousingStock/account/generalLedger'), meta: {
          name: ['粮食库存', '库存总账'],
          path: ['/business/warehousingStock/main', '/business/warehousingStock/generalLedger']
        }
        },
        {
          path: '/business/warehousingStock/account', name: 'account', component: () => import('@/page/grainDepotBusiness/warehousingStock/account/account'), meta: {
          name: ['粮食库存', '分仓保管帐'],
          path: ['/business/warehousingStock/main', '/business/warehousingStock/account']
        }
        },
        {
          path: '/business/warehousingStock/settlementCycle', name: 'settlementCycle', component: () => import('@/page/grainDepotBusiness/warehousingStock/account/settlementCycle'), meta: {
          name: ['粮食库存', '分仓保管帐', '结算周期设置'],
          path: ['/business/warehousingStock/main', '/business/warehousingStock/account', '/business/warehousingStock/settlementCycle']
        }
        },
        {
          path: '/business/warehousingStock/stockSetup', name: 'stockSetup', component: () => import('@/page/grainDepotBusiness/warehousingStock/account/stockSetup'), meta: {
          name: ['粮食库存', '分仓保管帐', '初期库存设置'],
          path: ['/business/warehousingStock/main', '/business/warehousingStock/account', '/business/warehousingStock/stockSetup']
        }
        },
        // { path: '/business/warehousingStock/accountMX', name: 'accountMX', component: () => import('@/page/grainDepotBusiness/warehousingStock/account/accountMX'),meta:{
        //     name:['粮食库存','分仓保管帐','出入库明细'],
        //     path: ['/business/warehousingStock/main','/business/warehousingStock/account','/business/warehousingStock/accountMX']
        //   } },
        {
          path: '/business/warehousingStock/generalLedgerMX', name: 'generalLedgerMX', component: () => import('@/page/grainDepotBusiness/warehousingStock/account/generalLedgerMX'), meta: {
          name: ['粮食库存', '出入库明细'],
          path: ['/business/warehousingStock/main', '/business/warehousingStock/generalLedgerMX']
        }
        },
        // { path: '/business/warehousingStock/generalLedgerDetail', name: 'generalLedgerDetail', component: () => import('@/page/grainDepotBusiness/warehousingStock/account/generalLedgerDetail'),meta:{
        //     name:['粮食库存','库存总账','总账详情'],
        //     path: ['/business/warehousingStock/main','/business/warehousingStock/generalLedger','/business/warehousingStock/generalLedgerDetail']
        //   } },
        {
          path: '/business/warehousingStock/tankInventory', name: 'tankInventory', component: () => import('@/page/grainDepotBusiness/warehousingStock/account/tankInventory'), meta: {
          name: ['粮食库存', '油罐库存'],
          path: ['/business/warehousingStock/main', '/business/warehousingStock/tankInventory']
        }
        },
        {
          path: '/business/warehousingStock/tankInventoryEdit', name: 'tankInventoryEdit', component: () => import('@/page/grainDepotBusiness/warehousingStock/account/tankInventoryEdit'), meta: {
          name: ['粮食库存', '油罐库存编辑'],
          path: ['/business/warehousingStock/main', '/business/warehousingStock/tankInventoryEdit']
        }
        },
        {
          path: '/business/balance/balance', name: 'balance', component: () => import('@/page/grainDepotBusiness/balance/balance'), meta: {
          name: '粮库业务系统>商务结算',
          path: '/business/balance/main'
        }
        },
        {
          path: '/business/balance/balance/payDetail', name: 'balancePayDetail', component: () => import('@/page/grainDepotBusiness/balance/balancePayDetail'), meta: {
          name: ['粮库业务系统>商务结算', '付款通知单'],
          path: ['/business/balance/main', '/business/balance/balance/payDetail']
        }
        },
        {
          path: '/business/balance/balance/Pay', name: 'balancePay', component: () => import('@/page/grainDepotBusiness/balance/balancePay'), meta: {
          name: ['粮库业务系统>商务结算', '付款结算'],
          path: ['/business/balance/main', '/business/balance/balance/Pay']
        }
        },
        {
          path: '/business/balance/balance/receivables', name: 'receivables', component: () => import('@/page/grainDepotBusiness/balance/balanceReceivables'), meta: {
          name: ['粮库业务系统>商务结算', '收款结算'],
          path: ['/business/balance/main', '/business/balance/balance/receivables']
        }
        },
        {
          path: '/business/balance/balance/receivablesDetail', name: 'receivablesDetail', component: () => import('@/page/grainDepotBusiness/balance/balanceReceivablesDetail'), meta: {
          name: ['粮库业务系统>商务结算', '收款通知单'],
          path: ['/business/balance/main', '/business/balance/balance/receivablesDetail']
        }
        },
        {
          path: '/business/balance/balance/balanceDetail', name: 'balanceDetail', component: () => import('@/page/grainDepotBusiness/balance/balanceDetail'), meta: {
          name: ['粮库业务系统>商务结算', '结算详情'],
          path: ['/business/balance/main', '/business/balance/balance/balanceDetail']
        }
        },

        //智能出入库
        {
          path: '/intelligentStorage/guidance/guidance', name: 'guidance', component: () => import('@/page/intelligentStorage/guidance/guidance'), meta: {
          name: '智能出入库系统>作业引导',
          path: '/intelligentStorage/guidance/guidance'
        }
        },
        {
          path: '/intelligentStorage/nextStep', name: 'nextStep', component: () => import('@/page/intelligentStorage/nextStep'), meta: {
          name: '智能出入库系统>下一步',
          path: '/intelligentStorage/nextStep'
        }
        },
        {
          path: '/intelligentStorage/guidance/guidanceDetail', name: 'guidanceDetail', component: () => import('@/page/intelligentStorage/guidance/guidanceDetail'), meta: {
          name: ['智能出入库系统>作业引导', '作业引导详情'],
          path: ['/intelligentStorage/guidance/guidance', '/intelligentStorage/guidance/guidanceDetail']
        }
        },
        {
          path: '/intelligentStorage/videoRetrieval', name: 'videoRetrieval', component: () => import('@/page/intelligentStorage/videoRetrieval'), meta: {
          name: '智能出入库系统>视频检索及追溯',
          path: '/intelligentStorage/videoRetrieval'
        }
        },
        {
          path: '/intelligentStorage/storage/storageStep', name: 'storageStep', component: () => import('@/page/intelligentStorage/storage/storageStep'), meta: {
          name: '智能出入库系统>入库流程',
          path: '/intelligentStorage/storage/storageStep'
        }
        },
        // {
        //   path: '/safetyBackward/storage/storageStep', name: 'safetyBackward_storageStep', components: {default:() => import('@/page/foodSafe/foodDetail'),'safetyBackward':() => import('@/page/intelligentStorage/storage/storageStep')}, meta: {
        //       name: '入库流程',
        //       path: '/intelligentStorage/storage/storageStep'
        //     }
        // },
        {
          path: '/intelligentStorage/storage/register/registerEdit', name: 'registerEdit', component: () => import('@/page/intelligentStorage/storage/register/registerEdit'), meta: {
          name: ['智能出入库系统>入库流程', '登记编辑'],
          path: ['/intelligentStorage/storage/storageStep', '/intelligentStorage/storage/register/registerEdit']
        }
        },
        {
          path: '/intelligentStorage/storage/register/registerDetail', name: 'registerDetail', component: () => import('@/page/intelligentStorage/storage/register/registerDetail'), meta: {
          name: ['智能出入库系统>入库流程', '登记详情'],
          path: ['/intelligentStorage/storage/storageStep', '/intelligentStorage/storage/register/registerDetail']
        }
        },
        {
          path: '/intelligentStorage/storage/sampling/samplingEdit', name: 'samplingEdit', component: () => import('@/page/intelligentStorage/storage/sampling/samplingEdit'), meta: {
          name: ['智能出入库系统>入库流程', '扦样编辑'],
          path: ['/intelligentStorage/storage/storageStep', '/intelligentStorage/storage/sampling/samplingEdit']
        }
        },
        {
          path: '/intelligentStorage/storage/sampling/samplingDetail', name: 'samplingDetail', component: () => import('@/page/intelligentStorage/storage/sampling/samplingDetail'), meta: {
          name: ['智能出入库系统>入库流程', '扦样详情'],
          path: ['/intelligentStorage/storage/storageStep', '/intelligentStorage/storage/sampling/samplingDetail']
        }
        },
        {
          path: '/intelligentStorage/storage/checkout/checkout', name: 'checkout', component: () => import('@/page/intelligentStorage/storage/checkout/checkout'), meta: {
          name: ['智能出入库系统>入库流程', '检验管理'],
          path: ['/intelligentStorage/storage/storageStep', '/intelligentStorage/storage/checkout/checkout']
        }
        },
        {
          path: '/intelligentStorage/storage/checkout/checkoutItem', name: 'checkoutItem', component: () => import('@/page/intelligentStorage/storage/checkout/checkoutItem'), meta: {
          name: ['智能出入库系统>入库流程', '检验指标项'],
          path: ['/intelligentStorage/storage/storageStep', '/intelligentStorage/storage/checkout/checkoutItem']
        }
        },
        {
          path: '/intelligentStorage/storage/checkout/checkoutDetail', name: 'checkoutDetail', component: () => import('@/page/intelligentStorage/storage/checkout/checkoutDetail'), meta: {
          name: ['智能出入库系统>入库流程', '检验详情'],
          path: ['/intelligentStorage/storage/storageStep', '/intelligentStorage/storage/checkout/checkoutDetail']
        }
        },
        {
          path: '/intelligentStorage/storage/metering/meteringEdit', name: 'meteringEdit', component: () => import('@/page/intelligentStorage/storage/metering/meteringEdit'), meta: {
          name: ['智能出入库系统>入库流程', '计量编辑'],
          path: ['/intelligentStorage/storage/storageStep', '/intelligentStorage/storage/metering/meteringEdit']
        }
        },
        {
          path: '/intelligentStorage/storage/metering/meteringDetail', name: 'meteringDetail', component: () => import('@/page/intelligentStorage/storage/metering/meteringDetail'), meta: {
          name: ['智能出入库系统>入库流程', '计量详情'],
          path: ['/intelligentStorage/storage/storageStep', '/intelligentStorage/storage/metering/meteringDetail']
        }
        },
        {
          path: '/intelligentStorage/storage/valueBin/valueBinEdit', name: 'valueBinEdit', component: () => import('@/page/intelligentStorage/storage/valueBin/valueBinEdit'), meta: {
          name: ['智能出入库系统>入库流程', '值仓编辑'],
          path: ['/intelligentStorage/storage/storageStep', '/intelligentStorage/storage/valueBin/valueBinEdit']
        }
        },
        {
          path: '/intelligentStorage/storage/valueBin/valueBinDetail', name: 'valueBinDetail', component: () => import('@/page/intelligentStorage/storage/valueBin/valueBinDetail'), meta: {
          name: ['智能出入库系统>入库流程', '值仓详情'],
          path: ['/intelligentStorage/storage/storageStep', '/intelligentStorage/storage/valueBin/valueBinDetail']
        }
        },
        {
          path: '/intelligentStorage/storage/settle/settleEdit', name: 'settleEdit', component: () => import('@/page/intelligentStorage/storage/settle/settleEdit'), meta: {
          name: ['智能出入库系统>入库流程', '结算编辑'],
          path: ['/intelligentStorage/storage/storageStep', '/intelligentStorage/storage/settle/settleEdit']
        }
        },
        {
          path: '/intelligentStorage/storage/settle/settleDetail', name: 'settleDetail', component: () => import('@/page/intelligentStorage/storage/settle/settleDetail'), meta: {
          name: ['智能出入库系统>入库流程', '结算详情'],
          path: ['/intelligentStorage/storage/storageStep', '/intelligentStorage/storage/settle/settleDetail']
        }
        },

        {
          path: '/intelligentStorage/storage/inReceipt', name: 'inReceipt', component: () => import('@/page/intelligentStorage/storage/inReceipt'), meta: {
          name: ['智能出入库系统>入库流程', '入库单'],
          path: ['/intelligentStorage/storage/inReceipt', '/intelligentStorage/storage/inReceipt']
        }
        },
        {
          path: '/intelligentStorage/storage/outReceipt', name: 'outReceipt', component: () => import('@/page/intelligentStorage/storage/outReceipt'), meta: {
          name: ['智能出入库系统>入库流程', '出库单'],
          path: ['/intelligentStorage/storage/outReceipt', '/intelligentStorage/storage/outReceipt']
        }
        },
        {
          path: '/intelligentStorage/storage/inPoundList', name: 'inPoundList', component: () => import('@/page/intelligentStorage/storage/inPoundList'), meta: {
          name: ['智能出入库系统>入库流程', '入库磅单'],
          path: ['/intelligentStorage/storage/inPoundList', '/intelligentStorage/storage/inPoundList']
        }
        },
        {
          path: '/intelligentStorage/storage/outPoundList', name: 'outPoundList', component: () => import('@/page/intelligentStorage/storage/outPoundList'), meta: {
          name: ['智能出入库系统>入库流程', '出库磅单'],
          path: ['/intelligentStorage/storage/outPoundList', '/intelligentStorage/storage/outPoundList']
        }
        },

        {
          path: '/intelligentStorage/storage/pinCard/pinCard', name: 'pinCard', component: () => import('@/page/intelligentStorage/storage/pinCard/pinCard'), meta: {
          name: ['智能出入库系统>入库流程', '销卡管理'],
          path: ['/intelligentStorage/storage/storageStep', '/intelligentStorage/storage/pinCard/pinCard']
        }
        },
        {
          path: '/intelligentStorage/storage/pinCard/pinCardDetail', name: 'pinCardDetail', component: () => import('@/page/intelligentStorage/storage/pinCard/pinCardDetail'), meta: {
          name: ['智能出入库系统>入库流程', '销卡详情'],
          path: ['/intelligentStorage/storage/storageStep', '/intelligentStorage/storage/pinCard/pinCardDetail']
        }
        },
        {
          path: '/intelligentStorage/outOfStock/outOfStockStep', name: 'outOfStockStep', component: () => import('@/page/intelligentStorage/outOfStock/outOfStockStep'), meta: {
          name: '智能出入库系统>出库流程',
          path: '/intelligentStorage/outOfStock/outOfStockStep'
        }
        },
        {
          path: '/intelligentStorage/outOfStock/register/registerEdit', name: 'registerOutEdit', component: () => import('@/page/intelligentStorage/outOfStock/register/registerEdit'), meta: {
          name: ['智能出入库系统>出库流程', '登记编辑'],
          path: ['/intelligentStorage/outOfStock/outOfStockStep', '/intelligentStorage/outOfStock/register/registerEdit']
        }
        },
        {
          path: '/intelligentStorage/outOfStock/register/registerDetail', name: 'registerOutDetail', component: () => import('@/page/intelligentStorage/outOfStock/register/registerDetail'), meta: {
          name: ['智能出入库系统>出库流程', '登记详情'],
          path: ['/intelligentStorage/outOfStock/outOfStockStep', '/intelligentStorage/outOfStock/register/registerDetail']
        }
        },
        {
          path: '/intelligentStorage/outOfStock/metering/meteringEdit', name: 'meteringOutEdit', component: () => import('@/page/intelligentStorage/outOfStock/metering/meteringEdit'), meta: {
          name: ['智能出入库系统>出库流程', '计量编辑'],
          path: ['/intelligentStorage/outOfStock/outOfStockStep', '/intelligentStorage/outOfStock/metering/meteringEdit']
        }
        },
        {
          path: '/intelligentStorage/outOfStock/metering/meteringDetail', name: 'meteringOutDetail', component: () => import('@/page/intelligentStorage/outOfStock/metering/meteringDetail'), meta: {
          name: ['智能出入库系统>出库流程', '计量详情'],
          path: ['/intelligentStorage/outOfStock/outOfStockStep', '/intelligentStorage/outOfStock/metering/meteringDetail']
        }
        },
        {
          path: '/intelligentStorage/outOfStock/valueBin/valueBinEdit', name: 'valueBinOutEdit', component: () => import('@/page/intelligentStorage/outOfStock/valueBin/valueBinEdit'), meta: {
          name: ['智能出入库系统>出库流程', '值仓编辑'],
          path: ['/intelligentStorage/outOfStock/outOfStockStep', '/intelligentStorage/outOfStock/valueBin/valueBinEdit']
        }
        },
        {
          path: '/intelligentStorage/outOfStock/valueBin/valueBinDetail', name: 'valueBinOutDetail', component: () => import('@/page/intelligentStorage/outOfStock/valueBin/valueBinDetail'), meta: {
          name: ['智能出入库系统>出库流程', '值仓详情'],
          path: ['/intelligentStorage/outOfStock/outOfStockStep', '/intelligentStorage/outOfStock/valueBin/valueBinDetail']
        }
        },
        {
          path: '/intelligentStorage/outOfStock/settle/settleEdit', name: 'settleOutEdit', component: () => import('@/page/intelligentStorage/outOfStock/settle/settleEdit'), meta: {
          name: ['智能出入库系统>出库流程', '结算编辑'],
          path: ['/intelligentStorage/outOfStock/outOfStockStep', '/intelligentStorage/outOfStock/settle/settleEdit']
        }
        },
        {
          path: '/intelligentStorage/outOfStock/settle/settleDetail', name: 'settleOutDetail', component: () => import('@/page/intelligentStorage/outOfStock/settle/settleDetail'), meta: {
          name: ['智能出入库系统>出库流程', '结算详情'],
          path: ['/intelligentStorage/outOfStock/outOfStockStep', '/intelligentStorage/outOfStock/settle/settleDetail']
        }
        },
        {
          path: '/intelligentStorage/outOfStock/pinCard/pinCard', name: 'pinOutCard', component: () => import('@/page/intelligentStorage/outOfStock/pinCard/pinCard'), meta: {
          name: ['智能出入库系统>出库流程', '销卡管理'],
          path: ['/intelligentStorage/outOfStock/outOfStockStep', '/intelligentStorage/outOfStock/pinCard/pinCard']
        }
        },
        {
          path: '/intelligentStorage/outOfStock/pinCard/pinCardDetail', name: 'pinCardOutDetail', component: () => import('@/page/intelligentStorage/outOfStock/pinCard/pinCardDetail'), meta: {
          name: ['智能出入库系统>出库流程', '销卡详情'],
          path: ['/intelligentStorage/outOfStock/outOfStockStep', '/intelligentStorage/outOfStock/pinCard/pinCardDetail']
        }
        },
        {
          path: '/intelligentStorage/report/report', name: 'report', component: () => import('@/page/intelligentStorage/report/report'), meta: {
          name: '智能出入库系统>结算报表',
          path: '/intelligentStorage/report/report'
        }
        },
        // 油罐入库
        {
          path: '/intelligentStorage/oilStorage/oilStorageStep', name: 'oilStorageStep', component: () => import('@/page/intelligentStorage/oilStorage/oilStorageStep'), meta: {
          name: '智能出入库系统>粮油入库流程',
          path: '/intelligentStorage/oilStorage/oilStorageStep'
        }
        },
        {
          path: '/intelligentStorage/oilStorage/register/registerEdit', name: 'oilRegisterEdit', component: () => import('@/page/intelligentStorage/oilStorage/register/registerEdit'), meta: {
          name: ['智能出入库系统>粮油入库流程', '登记编辑'],
          path: ['/intelligentStorage/oilStorage/oilStorageStep', '/intelligentStorage/oilStorage/register/registerEdit']
        }
        },
        {
          path: '/intelligentStorage/oilStorage/register/registerDetail', name: 'oilRegisterDetail', component: () => import('@/page/intelligentStorage/oilStorage/register/registerDetail'), meta: {
          name: ['智能出入库系统>粮油入库流程', '登记详情'],
          path: ['/intelligentStorage/oilStorage/oilStorageStep', '/intelligentStorage/oilStorage/register/registerDetail']
        }
        },
        {
          path: '/intelligentStorage/oilStorage/sampling/samplingEdit', name: 'oilSamplingEdit', component: () => import('@/page/intelligentStorage/oilStorage/sampling/samplingEdit'), meta: {
          name: ['智能出入库系统>粮油入库流程', '扦样编辑'],
          path: ['/intelligentStorage/oilStorage/oilStorageStep', '/intelligentStorage/oilStorage/sampling/samplingEdit']
        }
        },
        {
          path: '/intelligentStorage/oilStorage/sampling/samplingDetail', name: 'oilSamplingDetail', component: () => import('@/page/intelligentStorage/oilStorage/sampling/samplingDetail'), meta: {
          name: ['智能出入库系统>粮油入库流程', '扦样详情'],
          path: ['/intelligentStorage/oilStorage/oilStorageStep', '/intelligentStorage/oilStorage/sampling/samplingDetail']
        }
        },
        {
          path: '/intelligentStorage/oilStorage/checkout/checkout', name: 'oilCheckout', component: () => import('@/page/intelligentStorage/oilStorage/checkout/checkout'), meta: {
          name: ['智能出入库系统>粮油入库流程', '检验管理'],
          path: ['/intelligentStorage/oilStorage/oilStorageStep', '/intelligentStorage/oilStorage/checkout/checkout']
        }
        },
        {
          path: '/intelligentStorage/oilStorage/checkout/checkoutItem', name: 'oilCheckoutItem', component: () => import('@/page/intelligentStorage/oilStorage/checkout/checkoutItem'), meta: {
          name: ['智能出入库系统>粮油入库流程', '检验指标项'],
          path: ['/intelligentStorage/oilStorage/oilStorageStep', '/intelligentStorage/oilStorage/checkout/checkoutItem']
        }
        },
        {
          path: '/intelligentStorage/oilStorage/checkout/checkoutDetail', name: 'oilCheckoutDetail', component: () => import('@/page/intelligentStorage/oilStorage/checkout/checkoutDetail'), meta: {
          name: ['智能出入库系统>粮油入库流程', '检验详情'],
          path: ['/intelligentStorage/oilStorage/oilStorageStep', '/intelligentStorage/oilStorage/checkout/checkoutDetail']
        }
        },
        {
          path: '/intelligentStorage/oilStorage/metering/meteringEdit', name: 'oilMeteringEdit', component: () => import('@/page/intelligentStorage/oilStorage/metering/meteringEdit'), meta: {
          name: ['智能出入库系统>粮油入库流程', '计量编辑'],
          path: ['/intelligentStorage/oilStorage/oilStorageStep', '/intelligentStorage/oilStorage/metering/meteringEdit']
        }
        },
    
        {
          path: '/intelligentStorage/oilStorage/metering/meteringDetail', name: 'oilMeteringDetail', component: () => import('@/page/intelligentStorage/oilStorage/metering/meteringDetail'), meta: {
          name: ['智能出入库系统>粮油入库流程', '计量详情'],
          path: ['/intelligentStorage/oilStorage/oilStorageStep', '/intelligentStorage/oilStorage/metering/meteringDetail']
        }
        },
        {
          path: '/intelligentStorage/oilStorage/valueBin/valueBinEdit', name: 'oilValueBinEdit', component: () => import('@/page/intelligentStorage/oilStorage/valueBin/valueBinEdit'), meta: {
          name: ['智能出入库系统>粮油入库流程', '值仓编辑'],
          path: ['/intelligentStorage/oilStorage/oilStorageStep', '/intelligentStorage/oilStorage/valueBin/valueBinEdit']
        }
        },
        {
          path: '/intelligentStorage/oilStorage/valueBin/valueBinDetail', name: 'oilValueBinDetail', component: () => import('@/page/intelligentStorage/oilStorage/valueBin/valueBinDetail'), meta: {
          name: ['智能出入库系统>粮油入库流程', '值仓详情'],
          path: ['/intelligentStorage/oilStorage/oilStorageStep', '/intelligentStorage/oilStorage/valueBin/valueBinDetail']
        }
        },
        {
          path: '/intelligentStorage/oilStorage/settle/settleEdit', name: 'oilSettleEdit', component: () => import('@/page/intelligentStorage/oilStorage/settle/settleEdit'), meta: {
          name: ['智能出入库系统>粮油入库流程', '结算编辑'],
          path: ['/intelligentStorage/oilStorage/oilStorageStep', '/intelligentStorage/oilStorage/settle/settleEdit']
        }
        },
        {
          path: '/intelligentStorage/oilStorage/settle/settleDetail', name: 'oilSettleDetail', component: () => import('@/page/intelligentStorage/oilStorage/settle/settleDetail'), meta: {
          name: ['智能出入库系统>粮油入库流程', '结算详情'],
          path: ['/intelligentStorage/oilStorage/oilStorageStep', '/intelligentStorage/oilStorage/settle/settleDetail']
        }
        },
        {
          path: '/intelligentStorage/oilStorage/pinCard/pinCard', name: 'oilPinCard', component: () => import('@/page/intelligentStorage/oilStorage/pinCard/pinCard'), meta: {
          name: ['智能出入库系统>粮油入库流程', '销卡管理'],
          path: ['/intelligentStorage/oilStorage/oilStorageStep', '/intelligentStorage/oilStorage/pinCard/pinCard']
        }
        },
        {
          path: '/intelligentStorage/oilStorage/pinCard/pinCardDetail', name: 'oilPinCardDetail', component: () => import('@/page/intelligentStorage/oilStorage/pinCard/pinCardDetail'), meta: {
          name: ['智能出入库系统>粮油入库流程', '销卡详情'],
          path: ['/intelligentStorage/oilStorage/oilStorageStep', '/intelligentStorage/oilStorage/pinCard/pinCardDetail']
        }
        },
        // 油罐出库
        {
          path: '/intelligentStorage/oilOutStorage/oilOutStorageStep', name: 'oilOutStorageStep', component: () => import('@/page/intelligentStorage/oilOutStorage/oilOutStorageStep'), meta: {
          name: '智能出入库系统>粮油出库流程',
          path: '/intelligentStorage/oilOutStorage/oilOutStorageStep'
        }
        },
        {
          path: '/intelligentStorage/oilOutStorage/register/registerEdit', name: 'oilRegisterOutEdit', component: () => import('@/page/intelligentStorage/oilOutStorage/register/registerEdit'), meta: {
          name: ['智能出入库系统>粮油出库流程', '登记编辑'],
          path: ['/intelligentStorage/oilOutStorage/oilOutStorageStep', '/intelligentStorage/oilOutStorage/register/registerEdit']
        }
        },
        {
          path: '/intelligentStorage/oilOutStorage/register/registerDetail', name: 'oilRegisterOutDetail', component: () => import('@/page/intelligentStorage/oilOutStorage/register/registerDetail'), meta: {
          name: ['智能出入库系统>粮油出库流程', '登记详情'],
          path: ['/intelligentStorage/oilOutStorage/oilOutStorageStep', '/intelligentStorage/oilOutStorage/register/registerDetail']
        }
        },
        {
          path: '/intelligentStorage/oilOutStorage/metering/meteringEdit', name: 'oilMeteringOutEdit', component: () => import('@/page/intelligentStorage/oilOutStorage/metering/meteringEdit'), meta: {
          name: ['智能出入库系统>粮油出库流程', '计量编辑'],
          path: ['/intelligentStorage/oilOutStorage/oilOutStorageStep', '/intelligentStorage/oilOutStorage/metering/meteringEdit']
        }
        },
        {
          path: '/intelligentStorage/oilOutStorage/metering/meteringDetail', name: 'oilMeteringOutDetail', component: () => import('@/page/intelligentStorage/oilOutStorage/metering/meteringDetail'), meta: {
          name: ['智能出入库系统>粮油出库流程', '计量详情'],
          path: ['/intelligentStorage/oilOutStorage/oilOutStorageStep', '/intelligentStorage/oilOutStorage/metering/meteringDetail']
        }
        },
        {
          path: '/intelligentStorage/oilOutStorage/valueBin/valueBinEdit', name: 'oilValueBinOutEdit', component: () => import('@/page/intelligentStorage/oilOutStorage/valueBin/valueBinEdit'), meta: {
          name: ['智能出入库系统>粮油出库流程', '值仓编辑'],
          path: ['/intelligentStorage/oilOutStorage/oilOutStorageStep', '/intelligentStorage/oilOutStorage/valueBin/valueBinEdit']
        }
        },
        {
          path: '/intelligentStorage/oilOutStorage/valueBin/valueBinDetail', name: 'oilValueBinOutDetail', component: () => import('@/page/intelligentStorage/oilOutStorage/valueBin/valueBinDetail'), meta: {
          name: ['智能出入库系统>粮油出库流程', '值仓详情'],
          path: ['/intelligentStorage/oilOutStorage/oilOutStorageStep', '/intelligentStorage/oilOutStorage/valueBin/valueBinDetail']
        }
        },
        {
          path: '/intelligentStorage/oilOutStorage/settle/settleEdit', name: 'oilSettleOutEdit', component: () => import('@/page/intelligentStorage/oilOutStorage/settle/settleEdit'), meta: {
          name: ['智能出入库系统>粮油出库流程', '结算编辑'],
          path: ['/intelligentStorage/oilOutStorage/oilOutStorageStep', '/intelligentStorage/oilOutStorage/settle/settleEdit']
        }
        },
        {
          path: '/intelligentStorage/oilOutStorage/settle/settleDetail', name: 'oilSettleOutDetail', component: () => import('@/page/intelligentStorage/oilOutStorage/settle/settleDetail'), meta: {
          name: ['智能出入库系统>粮油出库流程', '结算详情'],
          path: ['/intelligentStorage/oilOutStorage/oilOutStorageStep', '/intelligentStorage/oilOutStorage/settle/settleDetail']
        }
        },
        {
          path: '/intelligentStorage/oilOutStorage/pinCard/pinCard', name: 'oilPinOutCard', component: () => import('@/page/intelligentStorage/oilOutStorage/pinCard/pinCard'), meta: {
          name: ['智能出入库系统>粮油出库流程', '销卡管理'],
          path: ['/intelligentStorage/oilOutStorage/oilOutStorageStep', '/intelligentStorage/oilOutStorage/pinCard/pinCard']
        }
        },
        {
          path: '/intelligentStorage/oilOutStorage/pinCard/pinCardDetail', name: 'oilPinOutCardDetail', component: () => import('@/page/intelligentStorage/oilOutStorage/pinCard/pinCardDetail'), meta: {
          name: ['智能出入库系统>粮油出库流程', '销卡详情'],
          path: ['/intelligentStorage/oilOutStorage/oilOutStorageStep', '/intelligentStorage/oilOutStorage/pinCard/pinCardDetail']
        }
        },
        

        //物联管理
        {
          path: '/IOTManage/IOTType', name: 'IOTType', component: () => import('@/page/IOTManage/IOTType'), meta: {
          name: '物联管理系统>物联类型',
          path: '/IOTManage/IOTType'
        }
        },
        {
          path: '/IOTManage/IOTTypeDetail', name: 'IOTTypeDetail', component: () => import('@/page/IOTManage/IOTTypeDetail'), meta: {
          name: ['物联管理系统>物联类型','物联类型详情'],
          path: ['/IOTManage/IOTType','/IOTManage/IOTTypeDetail']
        }
        },
        {
          path: '/IOTManage/IOTTypeEdit', name: 'IOTTypeEdit', component: () => import('@/page/IOTManage/IOTTypeEdit'), meta: {
          name: ['物联管理系统>物联类型','物联类型详情'],
          path: ['/IOTManage/IOTType','/IOTManage/IOTTypeEdit']
        }
        },
        {
          path: '/IOTManage/funcLocation', name: 'funcLocation', component: () => import('@/page/IOTManage/funcLocation'), meta: {
          name: '物联管理系统>功能位置',
          path: '/IOTManage/funcLocation'
        }
        },
        {
          path: '/IOTManage/equipment', name: 'equipment', component: () => import('@/page/IOTManage/equipment'), meta: {
          name: '物联管理系统>物联设备',
          path: '/IOTManage/equipment'
        }
        },
        {
          path: '/IOTManage/equipmentDetail', name: 'equipmentDetail', component: () => import('@/page/IOTManage/equipmentDetail'), meta: {
          name: ['物联管理系统>物联设备', '设备详情'],
          path: ['/IOTManage/equipment', '/IOTManage/equipmentDetail']
        }
        },
        {
          path: '/IOTManage/equipmentEdit', name: 'equipmentEdit', component: () => import('@/page/IOTManage/equipmentEdit'), meta: {
          name: ['物联管理系统>物联设备', '设备新增'],
          path: ['/IOTManage/equipment', '/IOTManage/equipmentEdit']
        }
        },
        //智能仓储
        {
          path: '/intelligentWarehous/grainInspection', name: 'grainInspection', component: () => import('@/page/intelligentWarehous/grainInspection/grainInspection'), meta: {
          name: '智能仓储系统>粮情检查',
          path: '/intelligentWarehous/grainInspection'
        }
        },
        {
          path: '/intelligentWarehous/grainInspectionDetail', name: 'grainInspectionDetail', component: () => import('@/page/intelligentWarehous/grainInspection/grainInspectionDetail'), meta: {
          name: ['智能仓储系统>粮情检查', '粮情检查详情'],
          path: ['/intelligentWarehous/grainInspection', '/intelligentWarehous/grainInspectionDetail']
        }
        },
        {
          path: '/intelligentWarehous/grainInspectionEdit', name: 'grainInspectionEdit', component: () => import('@/page/intelligentWarehous/grainInspection/grainInspectionEdit'), meta: {
          name: ['智能仓储系统>粮情检查', '粮情检查编辑'],
          path: ['/intelligentWarehous/grainInspection', '/intelligentWarehous/grainInspectionEdit']
        }
        },
        {
          path: '/intelligentWarehous/aerationList', name: 'aerationList', component: () => import('@/page/intelligentWarehous/aerationList/aerationList'), meta: {
          name: '智能仓储系统>通风信息管理',
          path: '/intelligentWarehous/aerationList'
        }
        },
        {
          path: '/intelligentWarehous/aerationList/addAerationRecord', name: 'addAerationRecord', component: () => import('@/page/intelligentWarehous/aerationList/addAerationRecord'), meta: {
          name: ['智能仓储系统>通风信息管理', '新增通风信息'],
          path: ['/intelligentWarehous/aerationList', '/intelligentWarehous/aerationList/addAerationRecord']
        }
        },
        {
          path: '/intelligentWarehous/aerationList/aerationRecordDetail', name: 'aerationRecordDetail', component: () => import('@/page/intelligentWarehous/aerationList/aerationRecordDetail'), meta: {
          name: ['智能仓储系统>通风信息管理','通风信息详情'],
          path: ['/intelligentWarehous/aerationList','/intelligentWarehous/aerationList/aerationRecordDetail']
        }
        },
        {
          path: '/intelligentWarehous/aeration/aerationIndex', name: 'aerationIndex', component: () => import('@/page/intelligentWarehous/aeration/aerationIndex'), meta: {
          name: '智能仓储系统>智能通风',
          path: '/intelligentWarehous/aeration/aerationIndex'
        }
        },
        {
          path: '/intelligentWarehous/aeration/aerationSet', name: 'aerationSet', component: () => import('@/page/intelligentWarehous/aeration/aerationSet'), meta: {
          name: '智能仓储系统>通风方式',
          path: '/intelligentWarehous/aeration/aerationSet'
        }
        },
        {
          path: '/intelligentWarehous/aeration/aerationSetEdit', name: 'aerationSetEdit', component: () => import('@/page/intelligentWarehous/aeration/aerationSetEdit'), meta: {
          name: ['智能仓储系统>通风方式', '通风方式编辑'],
          path: ['/intelligentWarehous/aeration/aerationSet', '/intelligentWarehous/aeration/aerationSetEdit']

        }
        },
        {
          path: '/intelligentWarehous/aeration/aerationAuto', name: 'aerationAuto', component: () => import('@/page/intelligentWarehous/aeration/aerationAuto'), meta: {
          name: ['智能仓储系统>通风方式', '通风自动操作'],
          path: ['/intelligentWarehous/aeration/aerationSet', '/intelligentWarehous/aeration/aerationAuto']

        }
        },
        {
          path: '/intelligentWarehous/aeration/aerationAutoModeEdit', name: 'aerationAutoModeEdit', component: () => import('@/page/intelligentWarehous/aeration/aerationAutoModeEdit'), meta: {
          name: ['智能仓储系统>通风自动操作', '通风自动操作编辑'],
          path: ['/intelligentWarehous/aeration/aerationAuto', '/intelligentWarehous/aeration/aerationAutoModeEdit']

        }
        },
        {
          path: '/intelligentWarehous/aeration/aerationAutoEdit', name: 'aerationAutoEdit', component: () => import('@/page/intelligentWarehous/aeration/aerationAutoEdit'), meta: {
          name: ['智能仓储系统>自动通风模型', '编辑自动模型'],
          path: ['/intelligentWarehous/aeration/aerationSet', '/intelligentWarehous/aeration/aerationAutoEdit']
        }
        },
        {
          path: '/intelligentWarehous/pharmacy/purchase/purchaseList', name: 'purchaseList', component: () => import('@/page/intelligentWarehous/pharmacy/purchase/purchaseList'), meta: {
          name: '智能仓储系统>化学药剂采购',
          path: '/intelligentWarehous/pharmacy/purchase/purchaseList'
        }
        },
        {
          path: '/intelligentWarehous/pharmacy/purchase/purchaseDetail', name: 'purchaseDetail', component: () => import('@/page/intelligentWarehous/pharmacy/purchase/purchaseDetail'), meta: {
          name: ['智能仓储系统>化学药剂采购', '药剂采购详情'],
          path: ['/intelligentWarehous/pharmacy/purchase/purchaseList', '/intelligentWarehous/pharmacy/purchase/purchaseDetail']
        }
        },
        {
          path: '/intelligentWarehous/pharmacy/purchase/purchaseEdit', name: 'purchaseEdit', component: () => import('@/page/intelligentWarehous/pharmacy/purchase/purchaseEdit'), meta: {
          name: ['智能仓储系统>化学药剂采购', '药剂采购编辑'],
          path: ['/intelligentWarehous/pharmacy/purchase/purchaseList', '/intelligentWarehous/pharmacy/purchase/purchaseEdit']
        }
        },

        {
          path: '/intelligentWarehous/pharmacy/pharmacyOut/pharmacyOutList', name: 'pharmacyOutList', component: () => import('@/page/intelligentWarehous/pharmacy/pharmacyOut/pharmacyOutList'), meta: {
          name: '智能仓储系统>药剂出库',
          path: '/intelligentWarehous/pharmacy/pharmacyOut/pharmacyOutList'
        }
        },
        {
          path: '/intelligentWarehous/pharmacy/pharmacyOut/pharmacyOutDetail', name: 'pharmacyOutDetail', component: () => import('@/page/intelligentWarehous/pharmacy/pharmacyOut/pharmacyOutDetail'), meta: {
          name: ['智能仓储系统>药剂出库', '药剂出库详情'],
          path: ['/intelligentWarehous/pharmacy/pharmacyOut/pharmacyOutList', '/intelligentWarehous/pharmacy/pharmacyOut/pharmacyOutDetail']
        }
        },
        {
          path: '/intelligentWarehous/pharmacy/pharmacyOut/pharmacyOutEdit', name: 'pharmacyOutEdit', component: () => import('@/page/intelligentWarehous/pharmacy/pharmacyOut/pharmacyOutEdit'), meta: {
          name: ['智能仓储系统>药剂出库', '药剂出库编辑'],
          path: ['/intelligentWarehous/pharmacy/pharmacyOut/pharmacyOutList', '/intelligentWarehous/pharmacy/pharmacyOut/pharmacyOutEdit']
        }
        },

        {
          path: '/intelligentWarehous/pharmacy/pharmacyReturn/pharmacyReturnList', name: 'pharmacyReturnList', component: () => import('@/page/intelligentWarehous/pharmacy/pharmacyReturn/pharmacyReturnList'), meta: {
          name: '智能仓储系统>药剂归还',
          path: '/intelligentWarehous/pharmacy/pharmacyReturn/pharmacyReturnList'
        }
        },
        {
          path: '/intelligentWarehous/pharmacy/pharmacyReturn/pharmacyReturnDetail', name: 'pharmacyReturnDetail', component: () => import('@/page/intelligentWarehous/pharmacy/pharmacyReturn/pharmacyReturnDetail'), meta: {
          name: ['智能仓储系统>药剂归还', '药剂归还详情'],
          path: ['/intelligentWarehous/pharmacy/pharmacyReturn/pharmacyReturnList', '/intelligentWarehous/pharmacy/pharmacyReturn/pharmacyReturnDetail']
        }
        },

        {
          path: '/intelligentWarehous/pharmacy/pharmacyReturn/pharmacyReturnEdit', name: 'pharmacyReturnEdit', component: () => import('@/page/intelligentWarehous/pharmacy/pharmacyReturn/pharmacyReturnEdit'), meta: {
          name: ['智能仓储系统>药剂归还', '药剂归还编辑'],
          path: ['/intelligentWarehous/pharmacy/pharmacyReturn/pharmacyReturnList', '/intelligentWarehous/pharmacy/pharmacyReturn/pharmacyReturnEdit']
        }
        },

        {
          path: '/intelligentWarehous/pharmacy/collar/collarList', name: 'collarList', component: () => import('@/page/intelligentWarehous/pharmacy/collar/collarList'), meta: {
          name: '智能仓储系统>药剂领用',
          path: '/intelligentWarehous/pharmacy/collar/collarList'
        }
        },
        {
          path: '/intelligentWarehous/pharmacy/collar/collarDetail', name: 'collarDetail', component: () => import('@/page/intelligentWarehous/pharmacy/collar/collarDetail'), meta: {
          name: ['智能仓储系统>药剂领用', '药剂领用详情'],
          path: ['/intelligentWarehous/pharmacy/collar/collarList', '/intelligentWarehous/pharmacy/collar/collarDetail']
        }
        },
        {
          path: '/intelligentWarehous/pharmacy/collar/collarEdit', name: 'collarEdit', component: () => import('@/page/intelligentWarehous/pharmacy/collar/collarEdit'), meta: {
          name: ['智能仓储系统>药剂领用', '药剂领用编辑'],
          path: ['/intelligentWarehous/pharmacy/collar/collarList', '/intelligentWarehous/pharmacy/collar/collarEdit']
        }
        },

        {
          path: '/intelligentWarehous/pharmacy/pharmacyPut/pharmacyPutList', name: 'pharmacyPutList', component: () => import('@/page/intelligentWarehous/pharmacy/pharmacyPut/pharmacyPutList'), meta: {
          name: '智能仓储系统>药剂入库',
          path: '/intelligentWarehous/pharmacy/pharmacyPut/pharmacyPutList'
        }
        },
        {
          path: '/intelligentWarehous/pharmacy/pharmacyPut/pharmacyPutDetail', name: 'pharmacyPutDetail', component: () => import('@/page/intelligentWarehous/pharmacy/pharmacyPut/pharmacyPutDetail'), meta: {
          name: ['智能仓储系统>药剂入库', '药剂入库详情'],
          path: ['/intelligentWarehous/pharmacy/pharmacyPut/pharmacyPutList', '/intelligentWarehous/pharmacy/pharmacyPut/pharmacyPutDetail']
        }
        },
        {
          path: '/intelligentWarehous/pharmacy/pharmacyPut/pharmacyPutEdit', name: 'pharmacyPutEdit', component: () => import('@/page/intelligentWarehous/pharmacy/pharmacyPut/pharmacyPutEdit'), meta: {
          name: ['智能仓储系统>药剂入库', '药剂入库编辑'],
          path: ['/intelligentWarehous/pharmacy/pharmacyPut/pharmacyPutList', '/intelligentWarehous/pharmacy/pharmacyPut/pharmacyPutEdit']
        }
        },

        {
          path: '/intelligentWarehous/pharmacy/pharmacyDestroy/pharmacyDestroyList', name: 'pharmacyDestroyList', component: () => import('@/page/intelligentWarehous/pharmacy/pharmacyDestroy/pharmacyDestroyList'), meta: {
          name: '智能仓储系统>药剂销毁',
          path: '/intelligentWarehous/pharmacy/pharmacyDestroy/pharmacyDestroyList'
        }
        },
        {
          path: '/intelligentWarehous/pharmacy/pharmacyDestroy/pharmacyDestroyDetail', name: 'pharmacyDestroyDetail', component: () => import('@/page/intelligentWarehous/pharmacy/pharmacyDestroy/pharmacyDestroyDetail'), meta: {
          name: ['智能仓储系统>药剂销毁', '药剂销毁详情'],
          path: ['/intelligentWarehous/pharmacy/pharmacyDestroy/pharmacyDestroyList', '/intelligentWarehous/pharmacy/pharmacyDestroy/pharmacyDestroyDetail']
        }
        },
        {
          path: '/intelligentWarehous/pharmacy/pharmacyDestroy/pharmacyDestroyEdit', name: 'pharmacyDestroyEdit', component: () => import('@/page/intelligentWarehous/pharmacy/pharmacyDestroy/pharmacyDestroyEdit'), meta: {
          name: ['智能仓储系统>药剂销毁', '药剂销毁编辑'],
          path: ['/intelligentWarehous/pharmacy/pharmacyDestroy/pharmacyDestroyList', '/intelligentWarehous/pharmacy/pharmacyDestroy/pharmacyDestroyEdit']
        }
        },

        {
          path: '/intelligentWarehous/pharmacy/pharmacyMent', name: 'pharmacyMent', component: () => import('@/page/intelligentWarehous/pharmacy/pharmacyMent'), meta: {
          name: '智能仓储系统>化学药剂管理',
          path: '/intelligentWarehous/pharmacy/pharmacyMent'
        }
        },
        {
          path: '/intelligentWarehous/pharmacy/pharmacyInit', name: 'pharmacyInit', component: () => import('@/page/intelligentWarehous/pharmacy/pharmacyInit'), meta: {
          name: ['智能仓储系统>化学药剂管理', '药剂初始化'],
          path: ['/intelligentWarehous/pharmacy/pharmacyMent', '/intelligentWarehous/pharmacy/pharmacyInit']
        }
        },

        {
          path: '/foodSafe/foodSafety', name: 'foodSafety', component: () => import('@/page/foodSafe/foodSafety'), meta: {
          name: '粮食安全追溯系统>粮食追溯安全',
          path: '/foodSafe/foodSafety'
        }
        },

        {
          path: '/foodSafe/foodDetail', name: 'foodDetail', component: () => import('@/page/foodSafe/foodDetail'), meta: {
          name: ['粮食安全追溯系统>粮食追溯安全', '追溯安全详情'],
          path: ['/foodSafe/foodSafety', '/foodSafe/foodDetail']
        }
        },

        {
          path: '/warning/warningInfor/warningList', name: 'warningList', component: () => import('@/page/warning/warningInfor/warningList'), meta: {
          name: '预报警展示系统>报警策略',
          path: '/warning/warningInfor/warningList'
        }
        },
        /*{
          path: '/warning/warningInfor/warningDetail', name: 'warningDetail', component: () => import('@/page/warning/warningInfor/warningDetail'), meta: {
            name: ['报警策略', '策略详情'],
            path: ['/warning/warningInfor/warningList', '/warning/warningInfor/warningDetail']
          }
        },*/
        /*

        */
        {
          path: '/warning/warningInfor/warningTemperatureEdit', name: 'warningTemperatureEdit', component: () => import('@/page/warning/warningInfor/warningTemperatureEdit'), meta: {
          name: ['预报警展示系统>报警策略', '新增粮温策略'],
          path: ['/warning/warningInfor/warningList', '/warning/warningInfor/warningTemperatureEdit']
        }
        },
        {
          path: '/warning/warningInfor/warningTemperatureDatil', name: 'warningTemperatureDatil', component: () => import('@/page/warning/warningInfor/warningTemperatureDatil'), meta: {
          name: ['预报警展示系统>报警策略', '粮温报警策略详情'],
          path: ['/warning/warningInfor/warningList', '/warning/warningInfor/warningTemperatureDatil']
        }
        },
        {
          path: '/warning/warningInfor/warningGasEdit', name: 'warningGasEdit', component: () => import('@/page/warning/warningInfor/warningGasEdit'), meta: {
          name: ['预报警展示系统>报警策略', '新增气体策略'],
          path: ['/warning/warningInfor/warningList', '/warning/warningInfor/warningGasEdit']
        }
        },
        {
          path: '/warning/warningInfor/warningGasDatil', name: 'warningGasDatil', component: () => import('@/page/warning/warningInfor/warningGasDatil'), meta: {
          name: ['预报警展示系统>报警策略', '气体报警策略详情'],
          path: ['/warning/warningInfor/warningList', '/warning/warningInfor/warningGasDatil']
        }
        },
        {
          path: '/warning/warningInfor/warningInventoryEdit', name: 'warningInventoryEdit', component: () => import('@/page/warning/warningInfor/warningInventoryEdit'), meta: {
          name: ['预报警展示系统>报警策略', '新增倒仓策略'],
          path: ['/warning/warningInfor/warningList', '/warning/warningInfor/warningInventoryEdit']
        }
        },
        {
          path: '/warning/warningInfor/warningInventoryDatil', name: 'warningInventoryDatil', component: () => import('@/page/warning/warningInfor/warningInventoryDatil'), meta: {
          name: ['预报警展示系统>报警策略', '倒仓报警策略详情'],
          path: ['/warning/warningInfor/warningList', '/warning/warningInfor/warningInventoryDatil']
        }
        },
        {
          path: '/warning/warningInfor/warningInsectEdit', name: 'warningInsectEdit', component: () => import('@/page/warning/warningInfor/warningInsectEdit'), meta: {
          name: ['预报警展示系统>报警策略', '新增虫情策略'],
          path: ['/warning/warningInfor/warningList', '/warning/warningInfor/warningInsectEdit']
        }
        },
        {
          path: '/warning/warningInfor/warningOilEdit', name: 'warningOilEdit', component: () => import('@/page/warning/warningInfor/warningOilEdit'), meta: {
          name: ['预报警展示系统>报警策略', '新增油温报警策略'],
          path: ['/warning/warningInfor/warningList', '/warning/warningInfor/warningOilEdit']
        }
        },
        {
          path: '/warning/warningInfor/warningInsectDatil', name: 'warningInsectDatil', component: () => import('@/page/warning/warningInfor/warningInsectDatil'), meta: {
          name: ['预报警展示系统>报警策略', '虫情报警策略详情'],
          path: ['/warning/warningInfor/warningList', '/warning/warningInfor/warningInsectDatil']
        }
        },
        {
          path: '/warning/showWarning/showWarningList', name: 'showWarningList', component: () => import('@/page/warning/showWarning/showWarningList'), meta: {
          name: '预报警展示系统>预报警信息',
          path: '/warning/showWarning/showWarningList'
        }
        },

        //智能安防
        {
          path: '/map/mainMap', name: 'mainMap', component: () => import('@/page/map/mainMap'), meta: {
          name: '智能安防系统>电子地图',
          path: '/map/mainMap'
        }
        },
        {
          path: '/map/allMap', name: 'allMap', component: () => import('@/page/map/allMap'), meta: {
          name: '智能安防系统>全部监 控画面',
          path: '/map/allMap'
        }
        },
        {
          path: '/map/inMap', name: 'inMap', component: () => import('@/page/map/inMap'), meta: {
          name: '智能安防系统>仓内 监控管理',
          path: '/map/inMap'
        }
        },
        {
          path: '/map/libraryMap', name: 'libraryMap', component: () => import('@/page/map/libraryMap'), meta: {
          name: '智能安防系统>库区监控管理',
          path: '/map/libraryMap'
        }
        },
        {
          path: '/map/camera/cameraList', name: 'cameraList', component: () => import('@/page/map/camera/cameraList'), meta: {
          name: '智能安防系统>摄像头信息',
          path: '/map/camera/cameraList'
        }
        },
        {
          path: '/map/camera/cameraDetail', name: 'cameraDetail', component: () => import('@/page/map/camera/cameraDetail'), meta: {
          name: ['智能安防系统>摄像头信息', '摄像头详情'],
          path: ['/map/camera/cameraList', '/map/camera/cameraDetail']
        }
        },
        {
          path: '/map/camera/cameraEdit', name: 'cameraEdit', component: () => import('@/page/map/camera/cameraEdit'), meta: {
          name: ['智能安防系统>摄像头信息', '摄像头的编辑'],
          path: ['/map/camera/cameraList', '/map/camera/cameraEdit']
        }
        },
        {
          path: '/map/videoWarning/videoWarningList', name: 'videoWarning', component: () => import('@/page/map/videoWarning/videoWarningList'), meta: {
          name: '智能安防系统>视频报警信息',
          path: '/map/videoWarning/videoWarningList'
        }
        },
        {
          path: '/map/videoWarning/videoWarningDetail', name: 'videoWarningDetail', component: () => import('@/page/map/videoWarning/videoWarningDetail'), meta: {
          name: ['智能安防系统>视频报警信息', '视频报警详情'],
          path: ['/map/videoWarning/videoWarningList', '/map/videoWarning/videoWarningDetail']
        }
        },
        {
          path: '/map/videoWarning/videoWarningEdit', name: 'videoWarningEdit', component: () => import('@/page/map/videoWarning/videoWarningEdit'), meta: {
          name: ['智能安防系统>视频报警信息', '视频报警编辑'],
          path: ['/map/videoWarning/videoWarningList', '/map/videoWarning/videoWarningEdit']
        }
        },
        {
          path: '/map/diskVideo/diskList', name: 'diskList', component: () => import('@/page/map/diskVideo/diskList'), meta: {
          name: '智能安防系统>硬盘录像信息',
          path: '/map/diskVideo/diskList'
        }
        },
        {
          path: '/map/diskVideo/diskDetail', name: 'diskDetail', component: () => import('@/page/map/diskVideo/diskDetail'), meta: {
          name: ['智能安防系统>硬盘录像信息', '硬盘录像详情'],
          path: ['/map/diskVideo/diskList', '/map/diskVideo/diskDetail']
        }
        },
        {
          path: '/map/diskVideo/diskEdit', name: 'diskEdit', component: () => import('@/page/map/diskVideo/diskEdit'), meta: {
          name: ['智能安防系统>硬盘录像信息', '硬盘录像编辑'],
          path: ['/map/diskVideo/diskList', '/map/diskVideo/diskEdit']
        }
        },


        {
          path: '/intelligentWarehous/aeration/task', name: 'aerationTask', component: () => import('@/page/intelligentWarehous/aeration/task/task'), meta: {
          name: '通风作业',
          path: '/intelligentWarehous/aeration/task'
        }
        },
        {
          path: '/intelligentWarehous/aeration/taskDetail', name: 'aerationTaskDetail', component: () => import('@/page/intelligentWarehous/aeration/task/taskDetail'), meta: {
          name: ['通风作业', '通风作业详情'],
          path: ['/intelligentWarehous/aeration/task', '/intelligentWarehous/aeration/taskDetail']
        }
        },
        {
          path: '/intelligentWarehous/aeration/taskEdit', name: 'aerationTaskEdit', component: () => import('@/page/intelligentWarehous/aeration/task/taskEdit'), meta: {
          name: ['通风作业', '通风作业编辑'],
          path: ['/intelligentWarehous/aeration/task', '/intelligentWarehous/aeration/taskEdit']
        }
        },
        {
          path: '/intelligentWarehous/weather', name: 'weather', component: () => import('@/page/intelligentWarehous/weather/weather'), meta: {
          name: '智能仓储系统>智能气象',
          path: '/intelligentWarehous/weather'
        }
        },
        {
          path: '/intelligentWarehous/weatherEdit', name: 'weatherEdit', component: () => import('@/page/intelligentWarehous/weather/weatherEdit'), meta: {
          name: ['智能仓储系统>智能气象', '智能气象编辑'],
          path: ['/intelligentWarehous/weather', '/intelligentWarehous/weatherEdit']
        }
        },
        {
          path: '/intelligentWarehous/grainSituation', name: 'grainSituation', component: () => import('@/page/intelligentWarehous/grainSituation/grainSituation'), meta: {
          name: '智能仓储系统>粮情检测',
          path: '/intelligentWarehous/grainSituation'
        }
        },
        {
          path: '/intelligentWarehous/grainSituation/insectPest', name: 'insectPest', component: () => import('@/page/intelligentWarehous/grainSituation/insectPest/insectPest'), meta: {
          name: ['智能仓储系统', '虫情检测'],
          path: ['/intelligentWarehous/grainSituation', '/intelligentWarehous/grainSituation/insectPest']
        }
        },
        {
          path: '/intelligentWarehous/grainSituation/monitor', name: 'monitor', component: () => import('@/page/intelligentWarehous/grainSituation/insectPest/monitor'), meta: {
          name: ['智能仓储系统', '虫情检测', '实时监控'],
          path: ['/intelligentWarehous/grainSituation', '/intelligentWarehous/grainSituation/insectPest', '/intelligentWarehous/grainSituation/monitor']
        }
        },
        {
          path: '/intelligentWarehous/grainSituation/chart', name: 'insectChart', component: () => import('@/page/intelligentWarehous/grainSituation/insectPest/chart'), meta: {
          name: ['智能仓储系统', '虫情检测', '实时监控'],
          path: ['/intelligentWarehous/grainSituation', '/intelligentWarehous/grainSituation/insectPest', '/intelligentWarehous/grainSituation/chart']
        }
        },
        {
          path: '/intelligentWarehous/insectPest/strategy', name: 'insectPeststrategy', component: () => import('@/page/intelligentWarehous/grainSituation/insectPest/strategy'), meta: {
          name: ['智能仓储系统', '虫情检测', '策略设置'],
          path: ['/intelligentWarehous/grainSituation', '/intelligentWarehous/grainSituation/insectPest', '/intelligentWarehous/insectPest/strategy']
        }
        },

        {
          path: '/intelligentWarehous/grainSituation/temperature', name: 'temperature', component: () => import('@/page/intelligentWarehous/grainSituation/temperature/temperature'), meta: {
          name: ['智能仓储系统>粮情检测', '粮温详情'],
          path: ['/intelligentWarehous/grainSituation', '/intelligentWarehous/grainSituation/temperature']
        }
        },
        {
          path: '/intelligentWarehous/grainSituation/temperatureTrend', name: 'temperatureTrend', component: () => import('@/page/intelligentWarehous/grainSituation/temperature/temperatureTrend'), meta: {
          name: ['智能仓储系统', '粮温走势'],
          path: ['/intelligentWarehous/grainSituation', '/intelligentWarehous/grainSituation/temperatureTrend']
        }
        },
        {
          path: '/intelligentWarehous/grainSituation/strategy', name: 'grainSituationStrategy', component: () => import('@/page/intelligentWarehous/grainSituation/strategy/strategy'), meta: {
          name: ['智能仓储系统', '测温策略'],
          path: ['/intelligentWarehous/grainSituation', '/intelligentWarehous/grainSituation/strategy']
        }
        },
        {
          path: '/intelligentWarehous/grainSituation/gasDetection', name: 'gasDetection', component: () => import('@/page/intelligentWarehous/grainSituation/gasDetection/gasDetection'), meta: {
          name: ['智能仓储系统>粮情检测', '气体检测'],
          path: ['/intelligentWarehous/grainSituation', '/intelligentWarehous/grainSituation/gasDetection']
        }
        },
        {
          path: '/intelligentWarehous/grainSituation/gasDetectionDetail', name: 'gasDetectionDetail', component: () => import('@/page/intelligentWarehous/grainSituation/gasDetection/gasDetectionDetail'), meta: {
          name: ['智能仓储系统', '气体检测', '气体检测详情'],
          path: ['/intelligentWarehous/grainSituation', '/intelligentWarehous/grainSituation/gasDetection', '/intelligentWarehous/grainSituation/gasDetectionDetail']
        }
        },
        {
          path: '/intelligentWarehous/grainSituation/gasDetectionAuto', name: 'gasDetectionAuto', component: () => import('@/page/intelligentWarehous/grainSituation/gasDetection/gasDetectionAuto'), meta: {
          name: ['智能仓储系统', '气体检测', '策略设置'],
          path: ['/intelligentWarehous/grainSituation', '/intelligentWarehous/grainSituation/gasDetection', '/intelligentWarehous/grainSituation/gasDetectionAuto']
        }
        },

        {
          path: '/intelligentWarehous/lowTemperature', name: 'lowTemperature', component: () => import('@/page/intelligentWarehous/lowTemperature/lowTemperature'), meta: {
          name: '智能仓储系统>低温储粮',
          path: '/intelligentWarehous/lowTemperature'
        }
        },
        {
          path: '/intelligentWarehous/lowTemperatureAuto', name: 'lowTemperatureAuto', component: () => import('@/page/intelligentWarehous/lowTemperature/lowTemperatureAuto'), meta: {
          name: ['智能仓储系统>低温储粮', '自动模型'],
          path: ['/intelligentWarehous', '/intelligentWarehous/lowTemperatureAuto']
        }
        },
        {
          path: '/intelligentWarehous/lowTemperatureAutoEdit', name: 'lowTemperatureAutoEdit', component: () => import('@/page/intelligentWarehous/lowTemperature/lowTemperatureAutoEdit'), meta: {
          name: ['智能仓储系统>低温储粮', '自动模型新增'],
          path: ['/intelligentWarehous', '/intelligentWarehous/lowTemperatureAutoEdit']
        }
        },
        {
          path: '/intelligentWarehous/jobLog', name: 'jobLog', component: () => import('@/page/intelligentWarehous/lowTemperature/jobLog/jobLog'), meta: {
          name: ['智能仓储系统>低温储粮', '作业记录'],
          path: ['/intelligentWarehous', '/intelligentWarehous/jobLog']
        }
        },
        {
          path: '/intelligentWarehous/jobLogDetail', name: 'jobLogDetail', component: () => import('@/page/intelligentWarehous/lowTemperature/jobLog/jobLogDetail'), meta: {
          name: ['智能仓储系统>低温储粮', '作业记录'],
          path: ['/intelligentWarehous', '/intelligentWarehous/jobLogDetail']
        }
        },
        {
          path: '/intelligentWarehous/jobLogEdit', name: 'jobLogEdit', component: () => import('@/page/intelligentWarehous/lowTemperature/jobLog/jobLogEdit'), meta: {
          name: ['智能仓储系统>低温储粮', '作业记录'],
          path: ['/intelligentWarehous', '/intelligentWarehous/jobLogEdit']
        }
        },
        /*{
          path: '/intelligentWarehous/jobLogAdd', name: 'jobLogAdd', component: () => import('@/page/intelligentWarehous/lowTemperature/jobLog/jobLogAdd'), meta: {
          name: ['低温储粮', '作业记录'],
          path: ['/intelligentWarehous', '/intelligentWarehous/jobLogAdd']
        }
        },*/
        {
          path: '/intelligentWarehous/fumigation', name: 'fumigation', component: () => import('@/page/intelligentWarehous/fumigation/fumigation'), meta: {
          name: '熏蒸管理',
          path: '/intelligentWarehous/fumigation'
        }
        },
        {
          path: '/intelligentWarehous/gasStrength', name: 'fumigationGasStrength', component: () => import('@/page/intelligentWarehous/fumigation/gasStrength'), meta: {
          name: ['熏蒸管理', '气体浓度'],
          path: ['/intelligentWarehous/fumigation', '/intelligentWarehous/gasStrength']
        }
        },
        {
          path: '/intelligentWarehous/operation', name: 'fumigationOperation', component: () => import('@/page/intelligentWarehous/fumigation/operation/operation'), meta: {
          name: ['熏蒸管理', '熏蒸作业'],
          path: ['/intelligentWarehous/fumigation', '/intelligentWarehous/operation']
        }
        },
        {
          path: '/intelligentWarehous/operationDetail', name: 'fumigationOperationDetail', component: () => import('@/page/intelligentWarehous/fumigation/operation/operationDetail'), meta: {
          name: ['熏蒸管理', '熏蒸作业详情'],
          path: ['/intelligentWarehous/fumigation', '/intelligentWarehous/operationDetail']
        }
        },
        {
          path: '/intelligentWarehous/operationEdit', name: 'fumigationOperationEdit', component: () => import('@/page/intelligentWarehous/fumigation/operation/operationEdit'), meta: {
          name: ['熏蒸管理', '熏蒸作业编辑'],
          path: ['/intelligentWarehous/fumigation', '/intelligentWarehous/operationEdit']
        }
        },
        {
          path: '/intelligentWarehous/bulkGas', name: 'bulkGas', component: () => import('@/page/intelligentWarehous/fumigation/bulkGas/bulkGas'), meta: {
          name: ['熏蒸管理', '散气作业'],
          path: ['/intelligentWarehous/fumigation', '/intelligentWarehous/bulkGas']
        }
        },
        {
          path: '/intelligentWarehous/bulkGasDetail', name: 'bulkGasDetail', component: () => import('@/page/intelligentWarehous/fumigation/bulkGas/bulkGasDetail'), meta: {
          name: ['熏蒸管理', '散气作业详情'],
          path: ['/intelligentWarehous/fumigation', '/intelligentWarehous/bulkGasDetail']
        }
        },
        {
          path: '/intelligentWarehous/bulkGasEdit', name: 'bulkGasEdit', component: () => import('@/page/intelligentWarehous/fumigation/bulkGas/bulkGasEdit'), meta: {
          name: ['熏蒸管理', '散气作业编辑'],
          path: ['/intelligentWarehous/fumigation', '/intelligentWarehous/bulkGasEdit']
        }
        },
        {
          path: '/intelligentWarehous/workSheet', name: 'workSheet', component: () => import('@/page/intelligentWarehous/fumigation/workSheet/workSheet'), meta: {
          name: ['熏蒸管理', '作业单'],
          path: ['/intelligentWarehous/fumigation', '/intelligentWarehous/workSheet']
        }
        },
        {
          path: '/intelligentWarehous/workSheetEdit', name: 'workSheetEdit', component: () => import('@/page/intelligentWarehous/fumigation/workSheet/workSheetEdit'), meta: {
          name: ['熏蒸管理', '作业单新增'],
          path: ['/intelligentWarehous/fumigation', '/intelligentWarehous/workSheetEdit']
        }
        },
        {
          path: '/intelligentWarehous/workSheetDetail', name: 'workSheetDetail', component: () => import('@/page/intelligentWarehous/fumigation/workSheet/workSheetDetail'), meta: {
          name: ['熏蒸管理', '作业单详情'],
          path: ['/intelligentWarehous/fumigation', '/intelligentWarehous/workSheetDetail']
        }
        },
        {
          path: '/intelligentWarehous/fumigation/strategy', name: 'fumigationStrategy', component: () => import('@/page/intelligentWarehous/fumigation/strategy'), meta: {
          name: ['智能仓储系统>熏蒸管理', '策略设置'],
          path: ['/intelligentWarehous/fumigation', '/intelligentWarehous/fumigation/strategy']
        }
        },

        {
          path: '/intelligentWarehous/quantityDetection', name: 'quantityDetection', component: () => import('@/page/intelligentWarehous/quantityDetection/quantityDetection'), meta: {
          name: '智能仓储系统>粮食数量监测',
          path: '/intelligentWarehous/quantityDetection'
        }
        },
        {
          path: '/intelligentWarehous/quantityDetectionDetail', name: 'quantityDetectionDetail', component: () => import('@/page/intelligentWarehous/quantityDetection/quantityDetectionDetail'), meta: {
          name: ['智能仓储系统>粮食数量监测', '粮食数量监测详情'],
          path: ['/intelligentWarehous/quantityDetection', '/intelligentWarehous/quantityDetectionDetail']
        }
        },
        {
          path: '/intelligentWarehous/quantityDetectionAdd', name: 'quantityDetectionAdd', component: () => import('@/page/intelligentWarehous/quantityDetection/quantityDetectionAdd'), meta: {
          name: ['智能仓储系统>粮食数量监测', '粮食数量监测新增'],
          path: ['/intelligentWarehous/quantityDetection', '/intelligentWarehous/quantityDetectionAdd']
        }
        },
        {
          path: '/intelligentWarehous/quantityDetectionEdit', name: 'quantityDetectionEdit', component: () => import('@/page/intelligentWarehous/quantityDetection/quantityDetectionEdit'), meta: {
          name: ['智能仓储系统>粮食数量监测', '粮食数量监测编辑'],
          path: ['/intelligentWarehous/quantityDetection', '/intelligentWarehous/quantityDetectionEdit']
        }
        },
        {
          path: '/intelligentWarehous/quantityDetectionStrategy', name: 'quantityDetectionStrategy', component: () => import('@/page/intelligentWarehous/quantityDetection/strategy'), meta: {
          name: ['智能仓储系统>粮食数量监测', '策略设置'],
          path: ['/intelligentWarehous/quantityDetection', '/intelligentWarehous/quantityDetectionStrategy']
        }
        },

        {
          path: '/intelligentWarehous/qualityTesting', name: 'qualityTesting', component: () => import('@/page/intelligentWarehous/qualityTesting/qualityTesting'), meta: {
          name: '智能仓储系统>在库粮油质检',
          path: '/intelligentWarehous/qualityTesting'
        }
        },
        {
          path: '/intelligentWarehous/qualityTestingApply', name: 'qualityTestingApply', component: () => import('@/page/intelligentWarehous/qualityTesting/qualityTestingApply'), meta: {
          name: ['智能仓储系统>在库粮油质检', '质检申请'],
          path: ['/intelligentWarehous/qualityTesting', '/intelligentWarehous/qualityTestingApply']
        }
        },
        {
          path: '/intelligentWarehous/qualityTestingDetail', name: 'qualityTestingDetail', component: () => import('@/page/intelligentWarehous/qualityTesting/qualityTestingDetail'), meta: {
          name: ['智能仓储系统>在库粮油质检', '质检申请'],
          path: ['/intelligentWarehous/qualityTesting', '/intelligentWarehous/qualityTestingApply']
        }
        },
        {
          path: '/intelligentWarehous/management', name: 'management', component: () => import('@/page/intelligentWarehous/qualityTesting/management/management'), meta: {
          name: ['智能仓储系统', '质检管理'],
          path: ['/intelligentWarehous/qualityTesting', '/intelligentWarehous/qualityTestingApply']
        }
        },
        {
          path: '/intelligentWarehous/managementEdit', name: 'managementEdit', component: () => import('@/page/intelligentWarehous/qualityTesting/management/managementEdit'), meta: {
          name: ['智能仓储系统', '创建质检'],
          path: ['/intelligentWarehous/management', '/intelligentWarehous/managementEdit']
        }
        },
        {
          path: '/intelligentWarehous/managementDetail', name: 'managementDetail', component: () => import('@/page/intelligentWarehous/qualityTesting/management/managementDetail'), meta: {
          name: ['智能仓储系统', '质检详情'],
          path: ['/intelligentWarehous/management', '/intelligentWarehous/managementDetail']
        }
        },
        {
          path: '/intelligentWarehous/ledger', name: 'qualityTestingLedger', component: () => import('@/page/intelligentWarehous/qualityTesting/ledger/ledger'), meta: {
          name: ['智能仓储系统', '质检台账'],
          path: ['/intelligentWarehous/qualityTesting', '/intelligentWarehous/ledger']
        }
        },
        {
          path: '/intelligentWarehous/ledgerEdit', name: 'qualityTestingLedgerEdit', component: () => import('@/page/intelligentWarehous/qualityTesting/ledger/ledgerEdit'), meta: {
          name: ['智能仓储系统', '台账编辑'],
          path: ['/intelligentWarehous/ledger', '/intelligentWarehous/ledgerEdit']
        }
        },
        {
          path: '/intelligentWarehous/ledgerDetail', name: 'qualityTestingLDetail', component: () => import('@/page/intelligentWarehous/qualityTesting/ledger/ledgerDetail'), meta: {
          name: ['智能仓储系统', '台账详情'],
          path: ['/intelligentWarehous/ledger', '/intelligentWarehous/ledgerDetail']
        }
        },
        {
          path: '/intelligentWarehous/modifiedAtmosphere', name: 'modifiedAtmosphere', component: () => import('@/page/intelligentWarehous/modifiedAtmosphere/modifiedAtmosphere'), meta: {
          name: '智能仓储系统>智能气调',
          path: '/intelligentWarehous/modifiedAtmosphere'
        }
        },
        {
          path: '/intelligentWarehous/modifiedAtmosphere/gasStrength', name: 'modifiedAtmosphereGasStrength', component: () => import('@/page/intelligentWarehous/modifiedAtmosphere/gasStrength'), meta: {
          name: ['智能仓储系统>智能气调', '气体浓度检测'],
          path: ['/intelligentWarehous/modifiedAtmosphere', '/intelligentWarehous/modifiedAtmosphere/gasStrength']
        }
        },
        {
          path: '/intelligentWarehous/nitrogenAndOxygen', name: 'nitrogenAndOxygen', component: () => import('@/page/intelligentWarehous/modifiedAtmosphere/nitrogenAndOxygen/nitrogenAndOxygen'), meta: {
          name: ['智能仓储系统>智能气调', '充氮降氧'],
          path: ['/intelligentWarehous/modifiedAtmosphere', '/intelligentWarehous/nitrogenAndOxygen']
        }
        },
        {
          path: '/intelligentWarehous/nitrogenAndOxygenDetail', name: 'nitrogenAndOxygenDetail', component: () => import('@/page/intelligentWarehous/modifiedAtmosphere/nitrogenAndOxygen/nitrogenAndOxygenDetail'), meta: {
          name: ['智能仓储系统>智能气调', '充氮降氧详情'],
          path: ['/intelligentWarehous/modifiedAtmosphere', '/intelligentWarehous/nitrogenAndOxygenDetail']
        }
        },
        {
          path: '/intelligentWarehous/nitrogenAndOxygenEdit', name: 'nitrogenAndOxygenEdit', component: () => import('@/page/intelligentWarehous/modifiedAtmosphere/nitrogenAndOxygen/nitrogenAndOxygenEdit'), meta: {
          name: ['智能仓储系统>智能气调', '充氮降氧编辑'],
          path: ['/intelligentWarehous/modifiedAtmosphere', '/intelligentWarehous/nitrogenAndOxygenEdit']
        }
        },
        {
          path: '/intelligentWarehous/exhaustingQi', name: 'exhaustingQi', component: () => import('@/page/intelligentWarehous/modifiedAtmosphere/exhaustingQi/exhaustingQi'), meta: {
          name: ['智能仓储系统>智能气调', '散气作业'],
          path: ['/intelligentWarehous/modifiedAtmosphere', '/intelligentWarehous/exhaustingQi']
        }
        },
        {
          path: '/intelligentWarehous/exhaustingQiDetail', name: 'exhaustingQiDetail', component: () => import('@/page/intelligentWarehous/modifiedAtmosphere/exhaustingQi/exhaustingQiDetail'), meta: {
          name: ['智能仓储系统>智能气调', '散气作业详情'],
          path: ['/intelligentWarehous/modifiedAtmosphere', '/intelligentWarehous/exhaustingQiDetail']
        }
        },
        {
          path: '/intelligentWarehous/exhaustingQiEdit', name: 'exhaustingQiEdit', component: () => import('@/page/intelligentWarehous/modifiedAtmosphere/exhaustingQi/exhaustingQiEdit'), meta: {
          name: ['智能仓储系统>智能气调', '散气作业编辑'],
          path: ['/intelligentWarehous/modifiedAtmosphere', '/intelligentWarehous/exhaustingQiEdit']
        }
        },
        {
          path: '/intelligentWarehous/modifiedAtmosphere/strategy', name: 'exhaustingQiStrategy', component: () => import('@/page/intelligentWarehous/modifiedAtmosphere/strategy'), meta: {
          name: ['智能仓储系统>智能气调', '策略设置'],
          path: ['/intelligentWarehous/modifiedAtmosphere', '/intelligentWarehous/modifiedAtmosphere/strategy']
        }
        },

        //耗能采集
        {
          path: '/consumeEnergy/electric', name: 'consumeEnergy_electric', component: () => import('@/page/consumeEnergy/electric/electric'), meta: {
          name: '能耗监测系统>耗能采集-电',
          path: '/consumeEnergy/electric'
        }
        },
        {
          path: '/consumeEnergy/electricDetail', name: 'consumeEnergy_electricDetail', component: () => import('@/page/consumeEnergy/electric/electricDetail'), meta: {
          name: ['能耗监测系统>耗能采集-电', '耗能采集-电详情'],
          path: ['/consumeEnergy/electric', '/consumeEnergy/electricDetail']
        }
        },
        {
          path: '/consumeEnergy/electricEdit', name: 'consumeEnergy_electricEdit', component: () => import('@/page/consumeEnergy/electric/electricEdit'), meta: {
          name: ['能耗监测系统>耗能采集-电', '耗能采集-电编辑'],
          path: ['/consumeEnergy/electric', '/consumeEnergy/electricEdit']
        }
        },
        {
          path: '/consumeEnergy/water', name: 'consumeEnergy_water', component: () => import('@/page/consumeEnergy/water/water'), meta: {
          name: '能耗监测系统>耗能采集-水',
          path: '/consumeEnergy/water'
        }
        },
        {
          path: '/consumeEnergy/waterEdit', name: 'consumeEnergy_waterEdit', component: () => import('@/page/consumeEnergy/water/waterEdit'), meta: {
          name: ['能耗监测系统>耗能采集-水', '耗能采集-水编辑'],
          path: ['/consumeEnergy/water', '/consumeEnergy/waterEdit']
        }
        },
        {
          path: '/consumeEnergy/waterDetail', name: 'consumeEnergy_waterDetail', component: () => import('@/page/consumeEnergy/water/waterDetail'), meta: {
          name: ['能耗监测系统>耗能采集-水', '耗能采集-水详情'],
          path: ['/consumeEnergy/water', '/consumeEnergy/waterDetail']
        }
        },
        {
          path: '/consumeEnergy/statistics', name: 'consumeEnergy_statisticsList', component: () => import('@/page/consumeEnergy/statistics/statistics'), meta: {
          name: '能耗监测系统>耗能统计列表',
          path: '/consumeEnergy/statistics'
        }
        },
        {
          path: '/consumeEnergy/statisticsChart', name: 'consumeEnergy_statisticsChart', component: () => import('@/page/consumeEnergy/statistics/statisticsChart'), meta: {
          name: '能耗监测系统>耗能统计图表',
          path: '/consumeEnergy/statisticsChart'
        }
        },
        {
          path: '/consumeEnergy/realtimeStatistics', name: 'consumeEnergy_realtimeStatistics', component: () => import('@/page/consumeEnergy/statistics/realtimeStatistics'), meta: {
          name: '能耗监测系统>实时能耗统计',
          path: '/consumeEnergy/realtimeStatistics'
        }
        },
        {
          path: '/consumeEnergy/borrowElectricity/borrowElectricity', name: 'borrowElectricity', component: () => import('@/page/consumeEnergy/borrowElectricity/borrowElectricity'), meta: {
          name: '能耗监测系统>借电管理',
          path: '/consumeEnergy/borrowElectricity/borrowElectricity'
        }
        },
        {
          path: '/consumeEnergy/borrowElectricity/borrowElectricityDetail', name: 'borrowElectricityDetail', component: () => import('@/page/consumeEnergy/borrowElectricity/borrowElectricityDetail'), meta: {
          name: ['能耗监测系统>借电管理', '借电详情'],
          path: ['/consumeEnergy/borrowElectricity/borrowElectricity', '/consumeEnergy/borrowElectricity/borrowElectricityDetail']
        }
        },
        {
          path: '/consumeEnergy/borrowElectricity/borrowElectricityEdit', name: 'borrowElectricityEdit', component: () => import('@/page/consumeEnergy/borrowElectricity/borrowElectricityEdit'), meta: {
          name: ['能耗监测系统>借电管理', '借电编辑'],
          path: ['/consumeEnergy/borrowElectricity/borrowElectricity', '/consumeEnergy/borrowElectricity/borrowElectricityEdit']
        }
        },


        //综合展示
        {
          path: '/integratedDisplay/integratedDisplay/3d', name: 'integratedDisplay', component: () => import('@/page/integratedDisplay/integratedDisplay-3d'), meta: {
          name: '综合展示系统>3d综合展示',
          path: '/integratedDisplay/integratedDisplay/3d'
        }
        },
        {
          path: '/integratedDisplay/integratedDisplay/2d', name: 'integratedDisplay', component: () => import('@/page/integratedDisplay/integratedDisplay-2d'), meta: {
          name: '综合展示系统>2d综合展示',
          path: '/integratedDisplay/integratedDisplay/2d'
        }
        },




        {
          path: '/decision/finance/classificationList', name: 'classificationList', component: () => import('@/page/decision/finance/classificationList'), meta: {
          name: ['辅助决策系统', '分类销售价格分析'],
          path: ['/decision/foodstuffList', '/decision/finance/classificationList']
        }
        },
        {
          path: '/decision/finance/classificationPurchase', name: 'classificationPurchase', component: () => import('@/page/decision/finance/classificationPurchase'), meta: {
          name: ['辅助决策系统', '分类采购价格分析'],
          path: ['/decision/foodstuffList', '/decision/finance/classificationPurchase']
        }
        },
        {
          path: '/decision/finance/payLoan', name: 'payLoan', component: () => import('@/page/decision/finance/payLoan'), meta: {
          name: ['辅助决策系统', '贷款支付情况分析'],
          path: ['/decision/foodstuffList', '/decision/finance/payLoan']
        }
        },
        {
          path: '/decision/finance/returnLoan', name: 'returnLoan', component: () => import('@/page/decision/finance/returnLoan'), meta: {
          name: ['辅助决策系统', '贷款回笼情况分析'],
          path: ['/decision/foodstuffList', '/decision/finance/returnLoan']
        }
        },

        {
          path: '/decision/contractPlan/implementPlan', name: 'implementPlan', component: () => import('@/page/decision/contractPlan/implementPlan'), meta: {
          name: ['辅助决策系统', '计划执行统计分析'],
          path: ['/decision/foodstuffList', '/decision/contractPlan/implementPlan']
        }
        },
        {
          path: '/decision/contractPlan/signContract', name: 'signContract', component: () => import('@/page/decision/contractPlan/signContract'), meta: {
          name: ['辅助决策系统', '合同签订情况统计分析'],
          path: ['/decision/foodstuffList', '/decision/contractPlan/signContract']
        }
        },

        {
          path: '/decision/outgoin/outContast', name: 'outContast', component: () => import('@/page/decision/outgoin/outContast'), meta: {
          name: ['辅助决策系统', '年度出库量对比表'],
          path: ['/decision/foodstuffList', '/decision/outgoin/outContast']
        }
        },
        {
          path: '/decision/outgoin/classContast', name: 'classContast', component: () => import('@/page/decision/outgoin/classContast'), meta: {
          name: ['辅助决策系统', '年度分类入库统计'],
          path: ['/decision/foodstuffList', '/decision/outgoin/classContast']
        }
        },
        {
          path: '/decision/outgoin/inContast', name: 'inContast', component: () => import('@/page/decision/outgoin/inContast'), meta: {
          name: ['辅助决策系统', '年度入库量对比表'],
          path: ['/decision/foodstuffList', '/decision/outgoin/inContast']
        }
        },
        {
          path: '/decision/outgoin/classOut', name: 'classOut', component: () => import('@/page/decision/outgoin/classOut'), meta: {
          name: ['辅助决策系统', '年度分类出库统计'],
          path: ['/decision/foodstuffList', '/decision/outgoin/classOut']
        }
        },

        {
          path: '/decision/energyStatistics/energyList', name: 'energyList', component: () => import('@/page/decision/energyStatistics/energyList'), meta: {
          name: '能耗统计报表',
          path: '/decision/energyStatistics/energyList'
        }
        },

        {
          path: '/decision/foodstuffList', name: 'foodstuffList', component: () => import('@/page/decision/foodstuffList'), meta: {
          name: '辅助决策系统',
          path: '/decision/foodstuffList'
        }
        },
        // 第三方系统
        {
          path: '/thirdparty/thirdpartysystemlst', name: 'thirdpartysystemlst', component: () =>import ('@/page/thirdparty/thirdpartysystemlst'), meta: {
          name: '应用系统>第三方系统接入',
          path: '/thirdparty/thirdpartysystemlst'
          }
        },
        {
          path: '/thirdparty/pluginDolwload', name: 'pluginDolwload', component: () =>import ('@/page/thirdparty/pluginDolwload'), meta: {
          name: '应用系统>第三方插件下载',
          path: '/thirdparty/pluginDolwload'
          }
        },

        //安全培训
        {
          path: '/safetyTraining/productionAccount/productionAccount', name: 'productionAccount', component: () => import('@/page/safetyTraining/productionAccount/productionAccount'), meta: {
          name: '安全生产台账',
          path: '/safetyTraining/productionAccount/productionAccount'
        }
        },
        {
          path: '/safetyTraining/productionAccount/productionAccountDetail', name: 'productionAccountDetail', component: () => import('@/page/safetyTraining/productionAccount/productionAccountDetail'), meta: {
          name: '安全生产台账详情',
          path: '/safetyTraining/productionAccount/productionAccountDetail'
        }
        },
        {
          path: '/safetyTraining/productionAccount/productionAccountEdit', name: 'productionAccountEdit', component: () => import('@/page/safetyTraining/productionAccount/productionAccountEdit'), meta: {
          name: '安全生产台账编辑',
          path: '/safetyTraining/productionAccount/productionAccountEdit'
        }
        },
        {
          path: '/safetyTraining/accountData/accountData', name: 'accountData', component: () => import('@/page/safetyTraining/accountData/accountData'), meta: {
          name: '安全会议台账数据',
          path: '/safetyTraining/accountData/accountData'
        }
        },
        {
          path: '/safetyTraining/accountData/accountDataDetail', name: 'accountDataDetail', component: () => import('@/page/safetyTraining/accountData/accountDataDetail'), meta: {
          name: '安全会议台账数据详情',
          path: '/safetyTraining/accountData/accountDataDetail'
        }
        },
        {
          path: '/safetyTraining/accountData/accountDataEdit', name: 'accountDataEdit', component: () => import('@/page/safetyTraining/accountData/accountDataEdit'), meta: {
          name: '安全会议台账数据编辑',
          path: '/safetyTraining/accountData/accountDataEdit'
        }
        },
        {
          path: '/safetyTraining/educationalAccounts/educationalAccounts', name: 'educationalAccounts', component: () => import('@/page/safetyTraining/educationalAccounts/educationalAccounts'), meta: {
          name: '安全培训教育台账',
          path: '/safetyTraining/educationalAccounts/educationalAccounts'
        }
        },
        {
          path: '/safetyTraining/educationalAccounts/educationalAccountDetail', name: 'educationalAccountDetail', component: () => import('@/page/safetyTraining/educationalAccounts/educationalAccountDetail'), meta: {
          name: '安全培训教育台账详情',
          path: '/safetyTraining/educationalAccounts/educationalAccountDetail'
        }
        },
        {
          path: '/safetyTraining/educationalAccounts/educationalAccountEdit', name: 'educationalAccountEdit', component: () => import('@/page/safetyTraining/educationalAccounts/educationalAccountEdit'), meta: {
          name: '安全培训教育台账编辑',
          path: '/safetyTraining/educationalAccounts/educationalAccountEdit'
        }
        },

        {
          path: '/safetyTraining/accidentAccount/accidentAccount', name: 'accidentAccount', component: () => import('@/page/safetyTraining/accidentAccount/accidentAccount'), meta: {
          name: '生产事故台账数据',
          path: '/safetyTraining/accidentAccount/accidentAccount'
        }
        },
        {
          path: '/safetyTraining/accidentAccount/accidentAccountEdit', name: 'accidentAccountEdit', component: () => import('@/page/safetyTraining/accidentAccount/accidentAccountEdit'), meta: {
          name: '生产事故台账数据新增和编辑',
          path: '/safetyTraining/accidentAccount/accidentAccountEdit'
        }
        },
        {
          path: '/safetyTraining/accidentAccount/accidentAccountDetail', name: 'accidentAccountDetail', component: () => import('@/page/safetyTraining/accidentAccount/accidentAccountDetail'), meta: {
          name: '生产事故台账数据详情',
          path: '/safetyTraining/accidentAccount/accidentAccountDetail'
        }
        },
        {
          path: '/safetyTraining/rectificationAccounts/rectificationAccounts', name: 'rectificationAccounts', component: () => import('@/page/safetyTraining/rectificationAccounts/rectificationAccounts'), meta: {
          name: '事故隐患整改台账数据',
          path: '/safetyTraining/rectificationAccounts/rectificationAccounts'
        }
        },
        {
          path: '/safetyTraining/rectificationAccounts/rectificationAccountsEdit', name: 'rectificationAccountsEdit', component: () => import('@/page/safetyTraining/rectificationAccounts/rectificationAccountsEdit'), meta: {
          name: '事故隐患整改台账数据新增和编辑',
          path: '/safetyTraining/rectificationAccounts/rectificationAccountsEdit'
        }
        },
        {
          path: '/safetyTraining/rectificationAccounts/rectificationAccountsDetail', name: 'rectificationAccountsDetail', component: () => import('@/page/safetyTraining/rectificationAccounts/rectificationAccountsDetail'), meta: {
          name: '事故隐患整改台账数据详情',
          path: '/safetyTraining/rectificationAccounts/rectificationAccountsDetail'
        }
        },
        {
          path: '/safetyTraining/checklistAccount/checklistAccount', name: 'checklistAccount', component: () => import('@/page/safetyTraining/checklistAccount/checklistAccount'), meta: {
          name: '安全生产检查台账数据',
          path: '/safetyTraining/checklistAccount/checklistAccount'
        }
        },
        {
          path: '/safetyTraining/checklistAccount/checklistAccountEdit', name: 'checklistAccountEdit', component: () => import('@/page/safetyTraining/checklistAccount/checklistAccountEdit'), meta: {
          name: '安全生产检查台账新增和修改',
          path: '/safetyTraining/checklistAccount/checklistAccountEdit'
        }
        },
        {
          path: '/safetyTraining/checklistAccount/checklistAccountDetail', name: 'checklistAccountDetail', component: () => import('@/page/safetyTraining/checklistAccount/checklistAccountDetail'), meta: {
          name: '安全生产检查台账详情',
          path: '/safetyTraining/checklistAccount/checklistAccountDetail'
        }
        },
        {
          path: '/intelligentStorage/stockDetail/warehousing',
          name: 'warehousingDetail',
          component: () =>
            import ('@/page/intelligentStorage/stockDetail/warehousing'),
          meta: {
            name: '智能出入库系统>入库单详情',
            path: '/intelligentStorage/stockDetail/warehousing'
          }
        },
        // 油罐入库单详情
        {
          path: '/intelligentStorage/oilStockBill/oilWarehousing',
          name: 'oilWarehousingDetail',
          component: () =>
            import ('@/page/intelligentStorage/oilStockBill/oilWarehousing'),
          meta: {
            name: ['智能出入库系统>粮油入库流程','粮油入库单详情'],
            path: ['/intelligentStorage/oilStorage/oilStorageStep','/intelligentStorage/oilStockBill/oilWarehousing']
          }
        },

        {
          path: '/intelligentStorage/stockDetail/outgoing',
          name: 'outgoingDetail',
          component: () =>
            import ('@/page/intelligentStorage/stockDetail/outgoing'),
          meta: {
            name: '智能出入库系统>出库单详情',
            path: '/intelligentStorage/stockDetail/outgoing'
          }
        },
        // 油罐出库单详情
        {
          path: '/intelligentStorage/oilStockBill/oilOutgoing',
          name: 'oilOutgoingDetail',
          component: () =>
            import ('@/page/intelligentStorage/oilStockBill/oilOutgoing'),
          meta: {
            name: ['智能出入库系统>粮油出库流程','粮油出库单详情'],
            path: ['/intelligentStorage/oilOutStorage/oilOutStorageStep','/intelligentStorage/oilStockBill/oilOutgoing']
          }
        },

        {
          path: '/intelligentStorage/stockDetail/weighDetail',
          name: 'weighDetail',
          component: () =>
            import ('@/page/intelligentStorage/stockDetail/weighDetail'),
          meta: {
            name: '智能出入库系统>入库过磅单详情',
            path: '/intelligentStorage/stockDetail/weighDetail'
          }
        },
        // 油罐入库过磅单详情
        {
          path: '/intelligentStorage/oilStockBill/oilWeighDetail',
          name: 'oilWeighDetail',
          component: () =>
            import ('@/page/intelligentStorage/oilStockBill/oilWeighDetail'),
          meta: {
            name: ['智能出入库系统>粮油入库流程','入库过磅单详情'],
            path: ['/intelligentStorage/oilStorage/oilStorageStep','/intelligentStorage/oilStockBill/oilWeighDetail']
          }
        },


        {
          path: '/intelligentStorage/stockDetail/outWeighDetail',
          name: 'outWeighDetail',
          component: () =>
            import ('@/page/intelligentStorage/stockDetail/outWeighDetail'),
          meta: {
            name: '智能出入库系统>出库过磅单详情',
            path: '/intelligentStorage/stockDetail/outWeighDetail'
          }
        },
        // 油罐出库过磅单详情
        {
          path: '/intelligentStorage/oilStockBill/oilOutWeighDetail',
          name: 'oilOutWeighDetail',
          component: () =>
            import ('@/page/intelligentStorage/oilStockBill/oilOutWeighDetail'),
          meta: {
            name:  ['智能出入库系统>粮油出库流程','出库过磅单详情'],
            path: ['/intelligentStorage/oilOutStorage/oilOutStorageStep','/intelligentStorage/oilStockBill/oilOutWeighDetail']
          }
        },


        {
          path: '/intelligentStorage/stockDetail/dailyStatement',
          name: 'dailyStatement',
          component: () =>
            import ('@/page/intelligentStorage/stockDetail/dailyStatement'),
          meta: {
            name: '智能出入库系统>日结单详情',
            path: '/intelligentStorage/stockDetail/dailyStatement'
          }
        },
        {
          path: '/intelligentStorage/stockDetail/monthlyStatement',
          name: 'monthlyStatement',
          component: () =>
            import ('@/page/intelligentStorage/stockDetail/monthlyStatement'),
          meta: {
            name: '智能出入库系统>月结单详情',
            path: '/intelligentStorage/stockDetail/monthlyStatement'
          }
        },
        {
          path: '/intelligentStorage/stockDetail/quarterlyStatement',
          name: 'quarterlyStatement',
          component: () =>
            import ('@/page/intelligentStorage/stockDetail/quarterlyStatement'),
          meta: {
            name: '智能出入库系统>季结单详情',
            path: '/intelligentStorage/stockDetail/quarterlyStatement'
          }
        },
        {
          path: '/intelligentStorage/stockDetail/annualStatement',
          name: 'annualStatement',
          component: () =>
            import ('@/page/intelligentStorage/stockDetail/annualStatement'),
          meta: {
            name: '智能出入库系统>年结单详情',
            path: '/intelligentStorage/stockDetail/annualStatement'
          }
        },
		{
          path: '/intelligentWarehous/oilTank/oilTankManagement', name: 'oilTankManagement', component: () => import('@/page/intelligentWarehous/oilTank/oilTankManagement'), meta: {
          name: '油罐管理',
          path: '/intelligentWarehous/oilTank/oilTankManagement'
        }
        },
        {
          path: '/intelligentWarehous/oilTank/oilTankTemperature', name: 'oilTankTemperature', component: () => import('@/page/intelligentWarehous/oilTank/oilTankTemperature'), meta: {
          name: ['油罐管理', '油罐温度详情'],
          path: ['/intelligentWarehous/oilTank/oilTankManagement', '/intelligentWarehous/oilTank/oilTankTemperature']
        }
        },



      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/page/login'),
    },
  ]
})
router.beforeEach((to, from, next) => {
  if (to.name != 'login') {         //如果需要跳转 ，往下走（1）
    if (localStorage.getItem("userInfo")) {            //判断是否登录过，如果有登陆过，说明有token,或者token未过期，可以跳过登录（2）
      if (to.path === '/login') {    //判断下一个路由是否为要验证的路由（3）
        next('/desktop');         // 如果是直接跳到首页，
      } else {             //如果该路由不需要验证，那么直接往后走
        next();
      }
    } else {
      console.log('没有');      //如果没有登陆过，或者token 过期， 那么跳转到登录页
      next('/login');
    }
  } else {                           //不需要跳转，直接往下走
    next();
  }
});

export default router;
