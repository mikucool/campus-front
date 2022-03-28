import request from '@/utils/request'

export function getList() {
    return request({
        url: '/promotion/show',
        method: 'get'
    })
}