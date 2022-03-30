import request from '@/utils/request'

// 注册
export function userRegister(userDTO) {
    return request({
        url: '/campus/user/register',
        method: 'post',
        data: userDTO
    })
}
// 登录
export function login(data) {
    return request({
        url: '/campus/user/login',
        method: 'post',
        data
    })
}
// 获取用户信息
export function getUserInfo() {
    return request({
        url: '/campus/user/info',
        method: 'get',
    })
}
// 退出登录
export function logout() {
    return request({
        url: '/campus/user/logout',
        method: 'get',
    })
}
