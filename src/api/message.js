import request from '@/utils/request'

// 记录消息
export function addMessage(message) {
  return request(({
    url: `/message/addMessage`,
    method: 'post',
    data: message
  }))
}
// 获取所有联系人
export function listContact() {
    return request(({
      url: `/message/listContact`,
      method: 'get',
    }))
}
// 获取消息，“我”为接收方
export function listMessage(friendName) {
    return request(({
      url: `/message/list`,
      method: 'get',
      params: { friendName }
    }))
}

// 聊天时上传文件
export function uploadFile(file) {
  return request(({
    url: `/message/uploadFile`,
    method: 'post',
    data: file,
    headers: {
      "Content-Type":"multipart/form-data"
    }
  }))
}