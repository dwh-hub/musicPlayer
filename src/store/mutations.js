// import * as types from './mutation-types'

const mutations = {
	setSinger (state, singer) {
		state.singer = singer
	},
	setPlayingState (state, flag) {
		state.palying = flag
	},
	setFullScreen (state, flag) {
		state.fullScreen = flag
	},
	setPlayList (state, list) {
		state.palyList = list
	},
	setSequenceList (state, list) {
		state.sequenceList = list
	},
	setPlayMode (state, mode) {
		state.mode = mode
	},
	setCurrentIndex (state, index) {
		state.currentIndex = index
	}
}

export default mutations
