// 异步操作 封装mutations
import * as types from './mutation-types'
import { playMode } from 'common/js/config'
import {shuffle} from 'common/js/util'
import { saveSearch, deleteSearch, clearSearch, savePlay, saveFavorite, deleteFavorite } from 'common/js/cache'
// import { playList } from './getters'
// 查找列表中有没有这首歌曲
function findIndex(list, song) {
    return list.findIndex((item) => {
        return item.id === song.id
    })
}
// 解构赋值
export const selectPlay = function ({commit, state}, {list, index}) {
    commit(types.SET_SEQUENCE_LIST, list)
    if (state.mode === playMode.random) {
        let randomList = shuffle(list)
        commit(types.SET_PLAYLIST, randomList)
        index = findIndex(randomList, list[index])
    } else {
        commit(types.SET_PLAYLIST, list)
    }
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}
// 随机播放歌曲
export const randomPlay = function ({commit}, {list}) {
    commit(types.SET_PLAY_MODE, playMode.random)
    commit(types.SET_SEQUENCE_LIST, list)
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    commit(types.SET_CURRENT_INDEX, 0)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}
// 添加歌曲
export const insertSong = function ({commit, state}, song) {
    // 同时修改playlist currentIndex sequenceList
    // 我这里playList
    let playlist = state.playList.slice()
    let currentIndex = state.currentIndex
    let sequenceList = state.sequenceList.slice()
    // 记录当前歌曲
    let currentSong = playlist[currentIndex]
    // 当前播放列表是否存在 新插入的歌曲  返回索引
    let fpIndex = findIndex(playlist, song)
    // 插入歌曲index增加
    currentIndex++
    // 插入歌曲
    playlist.splice(currentIndex, 0, song)
    // 播放列表已经存在这首歌，，删除原来那首歌
    if (fpIndex > -1) {
        if (currentIndex > fpIndex) {
            playlist.splice(fpIndex, 1)
            currentIndex--
        } else {
            playlist.splice(fpIndex + 1, 1)
        }
    }
    let currentSIndex = findIndex(sequenceList, currentSong) + 1
    let fsIndex = findIndex(sequenceList, song)
    sequenceList.splice(currentSIndex, 0, song)
    if (fsIndex > -1) {
        if (currentSIndex > fsIndex) {
            sequenceList.splice(fsIndex, 1)
        } else {
            sequenceList.splice(fsIndex + 1, 1)
        }
    }
    commit(types.SET_PLAYLIST, playlist)
    commit(types.SET_SEQUENCE_LIST, sequenceList)
    commit(types.SET_CURRENT_INDEX, currentIndex)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}
// 搜索历史
export const saveSearchHistory = function ({commit}, query) {
    commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}
export const deleteSearchHistory = function ({ commit }, query) {
    commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}
export const clearSearchHistory = function ({ commit }, query) {
    commit(types.SET_SEARCH_HISTORY, clearSearch())
}
export const deleteSong = function ({commit, state}, song) {
    // playlist大小写变化，注意
    let playlist = state.playList.slice()
    let currentIndex = state.currentIndex
    let sequenceList = state.sequenceList.slice()

    let pIndex = findIndex(playlist, song)
    playlist.splice(pIndex, 1)

    let sIndex = findIndex(sequenceList, song)
    sequenceList.splice(sIndex, 1)

    if (currentIndex > pIndex || currentIndex === playlist.length) {
        currentIndex--
    }

    commit(types.SET_PLAYLIST, playlist)
    commit(types.SET_SEQUENCE_LIST, sequenceList)
    commit(types.SET_CURRENT_INDEX, currentIndex)

    const playingState = playlist.length > 0
    commit(types.SET_PLAYING_STATE, playingState)
}
// 清空播放列表
export const deleteSonglist = function({commit}) {
    commit(types.SET_PLAYLIST, [])
    commit(types.SET_SEQUENCE_LIST, [])
    commit(types.SET_CURRENT_INDEX, -1)
    commit(types.SET_PLAYING_STATE, false)
}

export const savePlayHistory = function({commit}, song) {
    commit(types.SET_PLAY_HISTORY, savePlay(song))
}
// 添加收藏
export const saveFavoriteList = function({commit}, song) {
    commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}
export const deleteFavoriteList = function ({ commit }, song) {
    commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
}