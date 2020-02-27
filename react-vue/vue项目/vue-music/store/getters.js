// 映射state
export const singer = state => state.singer
export const playing = state => state.playing
export const fullScreen = state => state.fullScreen
// 注意这里是大写
export const playList = state => state.playList
export const sequenceList = state => state.sequenceList
export const mode = state => state.mode
export const currentIndex = state => state.currentIndex
export const disc = state => state.disc
export const topList = state => state.topList
export const searchHistory = state => state.searchHistory
export const playHistory = state => state.playHistory
export const favoriteList = state => state.favoriteList

// 返回当前歌曲
export const currentSong = (state) => {
    return state.playList[state.currentIndex] || {}
}