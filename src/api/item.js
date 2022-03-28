import request from '@/utils/request'

export function getItem() {
    return request({
        url: '/lostandfound/show',
        method: 'get'
    })
}