import storage from 'good-storage'

const CONFIG={
    HOST:storage.get('host'),//token失效之后跳转链接
    BASE_URL:`${storage.get('host')}/ecm/api/v2/`,
}

export default CONFIG