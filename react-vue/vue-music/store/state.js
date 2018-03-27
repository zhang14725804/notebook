import {playMode} from 'common/js/config'
import { loadSearch, loadPlay, loadFavorite } from 'common/js/cache'
// 存放状态
const state = {
    // 歌手
    singer: {},
    // 播放状态
    playing: false,
    // 是否全屏
    fullScreen: false,
    // 播放列表
    playList: [],
    // 顺序播放列表 如果是顺序播放playList=sequenceList
    sequenceList: [],
    // 播放模式
    mode: playMode.sequence,
    // 存放当前播放歌曲的索引
    currentIndex: -1,
    // 歌单对象
    disc: {},
    // 排行榜数据
    topList: {},
    // 搜索历史
    searchHistory: loadSearch(),
    // 播放历史
    playHistory: loadPlay(),
    // 个人收藏
    favoriteList: loadFavorite()
}
export default state