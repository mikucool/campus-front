import request from '@/utils/request'

export function userRegister(userDTO) {
    return request({
        url: '/campus/user/register',
        method: 'post',
        data: userDTO
    })
}

export function login(data) {
    return request({
        url: '/campus/user/login',
        method: 'post',
        data
    })
}

export function getUserInfo() {
    return request({
        url: '/campus/user/info',
        method: 'get',
    })
}
