<template>
  <div class="player" v-show="playList.length > 0">
    <transition name="normal">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <div class="icon-back"></div>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h1 class="subtitle" v-html="currentSong.singer"></h1>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper">
              <div class="cd" :class="cdClasss">
                <img class="image" :src="currentSong.image">
              </div>
            </div>
          </div>
        </div>  
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progreessBar></progreessBar>
            </div>
            <span class="time time-r">{{format(currentSong.durtaion)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-sequence"></i>
            </div>
            <div class="icon i-left" :class="disableClass">
              <i class="icon-prev"></i>
            </div>
            <div class="icon i-center" :class="disableClass">
              <i :class="playIcon" @click="togglePlaying"></i>
            </div>
            <div class="icon i-right" :class="disableClass">
              <i class="icon-next" @click="nextSong"></i>
            </div>
            <div class="icon i-right">
              <i class="icon icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img :class="cdClasss" width="40" height="40" :src="currentSong.image">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          <i :class="miniIcon" @click.stop="togglePlaying"></i>
        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio :src="currentSong.url" ref="audio" @canplay="ready" @error="error" @timeupdate="updateTime"></audio>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import progreessBar from 'base/progreess-bar/progreess-bar'

export default {
  name: 'player',
  data() {
     return {
       songReady: false,
       currentTime: 0
     }
  },
  components: {
    progreessBar
  },
  computed: {
    cdClasss() {
      return this.playing ? 'play' : 'play-pause'
    },
    playIcon() {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    miniIcon() {
      return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
    },
    disableClass() {
      return this.songReady ? '' : 'disable'
    },
    ...mapGetters([
      'fullScreen',
      'playList',
      'currentIndex',
      'playing'
    ]),
    currentSong() {
      return this.playList[this.currentIndex] || {}
    }
  },
  methods: {
    back() {
      this.setFullScreen(false)
    },
    open() {
      this.setFullScreen(true)
    },
    enter(el, done) {

    },
    afterEnter() {

    },
    leave(el, done) {

    },
    leaveEnter() {

    },
    togglePlaying() {
      this.setPlayingState(!this.playing)
    },
    prevSong() {
      if (!this.songReady) {
        return
      }
      let curIndex = this.currentIndex - 1
      if (curIndex === -1) {
        curIndex = this.playList.length - 1
      }
      this.setCueentIndex(curIndex)
      if (!this.playing) {
        this.togglePlaying()
      }
      this.songReady = false
    },
    nextSong() {
      if (!this.songReady) {
        return
      }
      let curIndex = this.currentIndex + 1
      if (curIndex === this.playList.length) {
        curIndex = 0
      }
      this.setCueentIndex(curIndex)
      if (!this.playing) {
        this.togglePlaying()
      }
      this.songReady = false
    },
    ready() {
      this.songReady = true
    },
    error() {
      this.songReady = true
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime
    },
    format(interval) {
      interval = interval | 0
      const minute = interval / 60 | 0
      const second = interval % 60
      return second < 10 ? `${minute}:0${second}` : `${minute}:${second}`
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCueentIndex: 'SET_CURRENT_INDEX'
    })
  },
  watch: {
    currentSong() {
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    },
    playing(newPlaying) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause()
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .player
    .normal-player
      position fixed
      left 0
      right 0
      top 0
      bottom 0
      z-index 150
      background $color-background
      .background
        position absolute
        left 0
        top 0
        width 100%
        height 100%
        z-index -1
        opacity 0.6
        filter blur(20px)
      .top
        position relative
        margin-bottom 25px
        .back
          position absolute
          top 0
          left 6px
          z-index 50
          .icon-back
            display block
            padding 9px
            font-size $font-size-large-x
            transform rotate(-90deg)
        .title
          width 70%
          margin 0 auto
          line-height 40px
          text-align center
          no-wrap()
          font-size $font-size-larger
          color $color-text
        .subtitle
          line-height 20px
          text-align center
          font-size $font-size-medium
          color $color-text
      .middle
        position fixed
        width 100%
        top 80px
        bottom 170px
        white-space nowrap
        font-sise 0
        .middle-l
          display inline-block
          vertical-align top
          position relative
          width 100%
          height 0
          padding-top 80%
          .cd-wrapper
            position absolute
            left 10%
            top 0
            width 80%
            height 100%
            .cd
              width 100%
              height 100%
              border-radius 50%
              &.play
                animation rotate 20s linear infinite
              &.play-pause
                animation-play-state paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                box-sizing border-box
                border-radius: 50%
                border 10px solid rgba(255, 255, 255, 0.1)
        .middle-r
          display inline-block
          vertical-align top
          width 100%
          height 100%
          overflow hidden
      .bottom
        position absolute
        bottom 50px
        width 100%
        .dot-wrapper
          text-align center
          font-size 0
        .progress-wrapper
          display flex
          align-items center
          width 80%
          margin 0 auto
          padding 10px 0
          .time
            color $color-text
            font-size $font-size-small
            flex 0 0 30px
            width 30px
            &.time-l
              text-align left
            &.time-radius
              text-align right
          .progress-bar-wrapper
            flex 1
        .operators
          display flex
          align-items center
          .icon
            flex 1
            color $color-theme
            &.disable
              color $color-theme-d
            i
              font-size 30px
              text-align center
          .i-left
            text-align right
          .i-center
            padding 0 20px
            text-align center
            i
              font-size 40px
          .i-right
            text-right left
          .icon-favorite
            color $color-sub-theme
      &.normal-enter-active, &.normal-leave-active
        transition all 0.4s
        .top, .bottom
          transition all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity 0
        .top
          transform translate3d(0, -100px, 0)
        .bottom
          transform translate3d(0, 100px, 0)
    .mini-player
      display flex
      align-items center
      position fixed
      left 0
      bottom 0
      z-index 180
      width 100%
      height 60px
      background $color-highlight-background
      &.mini-enter-avtive, &.mini-leave-active
        transition all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity 0
      .icon
        flex 0  0 40px
        width 40px
        padding 0 10px 0 20px
        img
          border-radius 50%
          &.play
            animation rotate 10s linear infinite
          &.play-pause
            animation-play-state paused
      .text
        display flex
        flex-direction column
        justify-content center
        flex 1
        line-height 20px
        overflow hidden
        .name
          margin-bottom 2px
          no-wrap()
          font-size $font-size-medium
          color $color-text
        .desc
          no-wrap()
          font-size $font-size-small
          color $color-text-d
      .control
        flex 0 0 30px
        width 30px
        padding 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size 30px
          color $color-theme-d
        .icon-mini
          font-size 32px
          position absolute
          left 0
          top 0
  
  @keyframes rotate
    0%
      transform rotate(0)
    100%
      transform rotate(360deg)
</style>
