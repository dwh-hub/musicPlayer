import * as types from './mutation-types'

/**
 * 设置播放器初始属性
 * @param {Array} list 要播放的列表
 * @param {Number} index 当前点击的歌曲的列表索引
 */
export const selectPlay = function ({commit, state}, {list, index}) {
   commit(types.SET_SEQUENCE_LIST, list)
   commit(types.SET_PLAYLIST, list)
   commit(types.SET_CURRENT_INDEX, index)
   commit(types.SET_FULL_SCREEN, true)
   commit(types.SET_PLAYING_STATE, true)
}
