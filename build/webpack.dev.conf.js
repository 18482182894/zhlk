'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const express = require('express')
const app = express()

// read test data from data dir
// var systemData = require('../data/system')

// var aojianData = require('../data/common/aojian')
// var cangChuKuCunData = require('../data/common/cangchukucun')
// var cangfangData = require('../data/common/cangfang')
// var gongshiData = require('../data/common/gongshi')
// var huoweiData = require('../data/common/huowei')
// var jiageData = require('../data/common/jiage')
// var kudianData = require('../data/common/kudian')
// var kudianleixingData = require('../data/common/kudianleixing')
// var liangshipinzhongData = require('../data/common/liangshipinzhong')
// var mabiaoData = require('../data/common/mabiao')
// var testSetupData = require('../data/common/testSetup')

// var businessContractData = require('../data/business/contract')
// var businessCustomerData = require('../data/business/customer')
// var businessDocReviceData = require('../data/business/docRevice')
// var businessNoticeData = require('../data/business/notice')
// var businessPlanData = require('../data/business/plan')
// var businessRequestNoteData = require('../data/business/requestNode')
// var businesswarehousingStock = require('../data/business/warehousingStock')

// var borrowData = require('../data/deviceManage/borrow')
// var debugData = require('../data/deviceManage/debug')
// var deviceData = require('../data/deviceManage/device')
// var deviceCheckData = require('../data/deviceManage/deviceCheck')
// var deviceManageData = require('../data/deviceManage/deviceManage')
// var deviceSelectData = require('../data/deviceManage/deviceSelect')
// var equipmentAbandonedData = require('../data/deviceManage/equipmentAbandoned')
// var equipmentEntryRecordData = require('../data/deviceManage/equipmentEntryRecord')
// var equimentFailureData = require('../data/deviceManage/equipmentFailure')
// var repairData = require('../data/deviceManage/repair')

// var oaLeaveApplicationData = require('../data/oa/leaveApplication')
// var oaNoticeData = require('../data/oa/notice')
// var oaPlanData = require('../data/oa/plan')
// var oaReimbursementData = require('../data/oa/reimbursement')

// var workflowData = require('../data/workflow/data')
// var intelligentStorage = require('../data/intelligentStorage/intelligentStorage')

// systemData = Object.assign({},
//   systemData,
//   aojianData,
//   cangChuKuCunData,
//   cangfangData,
//   gongshiData,
//   huoweiData,
//   jiageData,
//   kudianData,
//   kudianleixingData,
//   liangshipinzhongData,
//   mabiaoData,
//   testSetupData,
//   businessContractData,
//   businessCustomerData,
//   businessDocReviceData,
//   businessNoticeData,
//   businessPlanData,
//   businessRequestNoteData,
//   businesswarehousingStock,
//   borrowData,
//   debugData,
//   deviceData,
//   deviceCheckData,
//   deviceManageData,
//   deviceSelectData,
//   equipmentAbandonedData,
//   equipmentEntryRecordData,
//   equimentFailureData,
//   repairData,
//   oaLeaveApplicationData,
//   oaNoticeData,
//   oaPlanData,
//   oaReimbursementData,
//   workflowData,
//   intelligentStorage
//   );


// var apiRoutes = express.Router()
// app.use('/api/', apiRoutes)

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before(app) {
      // app.all('/api/allData', (req, res) => {
      //   res.json(systemData)
      // })
      // app.all('/api/*', (req, res) => {
      //   res.json(systemData[req.query.moduleId])
      // })
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
