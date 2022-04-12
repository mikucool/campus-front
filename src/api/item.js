import request from '@/utils/request'

export function getItem() {
    return request({
        url: '/activity/show',
        method: 'get'
    })
}