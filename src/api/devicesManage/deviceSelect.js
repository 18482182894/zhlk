import request from '../../utils/request'

/**
 * 设备选择 API
 */

//设备选择页面查询分页列表服务接口
export function getDeviceListBySelect(data) {
    return request({
        url: 'IGIP-BWZL-DMS/API-GATEWAY?moduleId=BWZL_DMS_406',
        method: 'post',
        params: data
    })
}