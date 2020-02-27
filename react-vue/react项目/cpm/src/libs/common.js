//获取用户头像需要
import React from 'react'
import storage from 'good-storage'
import GLOBAL from 'libs/config'
const baseURL = GLOBAL.BASE_URL

export function paginationTotal(total,page) {
    return <div>
        <span className="mr12">总记录数：{total}</span>
        <span className="mr12">当前页：{page}</span>
        <span className="mr12">总页数：{Math.ceil(total/30)}</span>
    </div>
}

export function getAvatar(cuid){
    return `${baseURL}users/getAuthUserImage/${cuid}?authorization=${storage.get('token')}`
}

//移交企业管理者权限、部门主管把自己管理的所有部门部门主管权限都已交给别人、401
export function authTimeout(){
    // storage.remove('token')
    // storage.remove('loginUser')
    storage.clear()
    window.location.href=GLOBAL.HOST
}