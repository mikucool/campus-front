import request from '@/utils/request'

// 用户主页
export function getInfoByName(username, page, size) {
  return request({
    url: '/campus/user/' + username,
    method: 'get',
    params: {
      pageNo: page,
      size: size
    }
  })
}
// 用户信息
export function getInfo() {
  return request({
    url: '/campus/user/info',
    method: 'get'
  })
}
// 更新
export function update(user) {
  return request({
    url: '/campus/user/update',
    method: 'post',
    data: user
  })
}

// 头像
export function updateAvatar(file) {
  return request({
    url: `/campus/user/updateAvatar`,
    method: 'post',
    data: file,
    headers: {
      "Content-Type":"multipart/form-data"
    }
  })
}


