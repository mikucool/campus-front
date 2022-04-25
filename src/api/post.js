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

// 帖子信息
export function getTopic(id) {
    return request({
        url: '/post',
        method: 'get',
        params: {
            id: id
        }
    })
}
//获取加精帖子
export function getEssenceTopic() {
    return request({
        url: '/post/getEssenceTopic',
        method: 'get',
    })
}

// 帖子详情中的推荐
export function getRecommendTopics(id) {
    return request({
        url: '/post/recommend',
        method: 'get',
        params: {
            topicId: id
        }
    })
}

// 编辑帖子
export function update(topic) {
    return request({
        url: '/post/update',
        method: 'post',
        data: topic
    })
}

// 删除帖子
export function deleteTopic(id) {
    return request({
        // es6 使用反引号`
        url: `/post/delete/${id}`,
        method: 'delete'
    })
}

