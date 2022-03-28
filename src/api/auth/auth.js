import request from '@/utils/request'

export function userRegister(userDTO) {
    return request({
        url: '/campus/user/register',
        method: 'post',
        data: userDTO
    })
}