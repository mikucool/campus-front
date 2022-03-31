import request from '@/utils/request'

// 帖子列表
export function getList(pageNo, size, tab) {
    return request({
        url: '/post/list',
        method: 'get',
        params: {pageNo: pageNo, size: size, tab: tab}
    })
}

// 发帖
export function post(topic) {
    return request({
        url: '/post/create',
        method: 'post',
        data: topic
    })
}
