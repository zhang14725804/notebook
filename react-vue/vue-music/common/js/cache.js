// 本地缓存localStorage
// localStorage存储字符串
import storage from 'good-storage'
const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LENGTH = 200

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LENGTH = 200
// compare比较函数
function insertArray(arr, val, compare, maxLen) {
    // 查找是否已经存在
    const index = arr.findIndex(compare)
    // 第一条数据
    if (index === 0) {
        return
    }
    // 数据已经存在
    if (index > 0) {
        // 删除数据
        arr.splice(index, 1)
    }
    // 头部插入
    arr.unshift(val)
    if (maxLen && arr.length > maxLen) {
        arr.pop()
    }
}
function deleteFromArray(arr, compare) {
    const index = arr.findIndex(compare)
    if (index > -1) {
        arr.splice(index, 1)
    }
}
// 最新搜索的结果放在前面
export function saveSearch(query) {
    let searches = storage.get(SEARCH_KEY, [])
    insertArray(searches, query, (item) => {
        return item === query
    }, SEARCH_MAX_LENGTH)
    storage.set(SEARCH_KEY, searches)
    return searches
}
// 返回localstorage
export function loadSearch() {
    return storage.get(SEARCH_KEY, [])
}
// 删除历史记录，并返回新数组
export function deleteSearch(query) {
    let searches = storage.get(SEARCH_KEY, [])
    deleteFromArray(searches, (item) => {
        return item === query
    })
    storage.set(SEARCH_KEY, searches)
    return searches
}
// 清空搜索记录
export function clearSearch() {
    storage.remove(SEARCH_KEY)
    return []
}

export function savePlay(song) {
    // 拿到当前播放列表
    const songs = storage.get(PLAY_KEY, [])
    insertArray(songs, song, (item) => {
        return item.id === song.id
    }, PLAY_MAX_LENGTH)
    storage.set(PLAY_KEY, songs)
    return songs
}
export function loadPlay() {
    return storage.get(PLAY_KEY, [])
}
// 添加收藏
export function saveFavorite(song) {
    const songs = storage.get(FAVORITE_KEY, [])
    insertArray(songs, song, (item) => {
        return item.id === song.id
    }, FAVORITE_MAX_LENGTH)
    storage.set(FAVORITE_KEY, songs)
    return songs
}
export function deleteFavorite(song) {
    let songs = storage.get(FAVORITE_KEY, [])
    deleteFromArray(songs, (item) => {
        return item.id === song.id
    })
    storage.set(FAVORITE_KEY, songs)
    return songs
}
export function loadFavorite() {
    return storage.get(FAVORITE_KEY, [])
}