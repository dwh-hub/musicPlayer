import * as types from './mutation-types'

const mutations = {
	// 当前歌手
	[types.SET_SINGER] (state, singer) {
		state.singer = singer
	},
	// 设置播放器状态
	[types.SET_PLAYING_STATE] (state, flag) {
		state.playing = flag
	},
	// 打开播放器
	[types.SET_FULL_SCREEN] (state, flag) {
		state.fullScreen = flag
	},
	// 播放器当前播放的列表
	[types.SET_PLAYLIST] (state, list) {
		state.playList = list
	},
	// 播放器当前播放的随机列表
	[types.SET_SEQUENCE_LIST] (state, list) {
		state.sequenceList = list
	},
	// 当前列表的播放状态（随机/顺序/循环）
	[types.SET_PLAY_MODE] (state, mode) {
		state.mode = mode
	},
	// 当前播放歌曲在列表的索引值
	[types.SET_CURRENT_INDEX] (state, index) {
		state.currentIndex = index
	}
}

export default mutations
