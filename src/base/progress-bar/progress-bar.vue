<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-warpper" ref="progressBtn" 
          @touchstart.prevent="progressTouchStart"
          @touchmove.prevent="progressTouchMove"
          @touchend="progressTouchEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {prefixStyle} from 'common/js/dom'

const TRANSFORM = prefixStyle('transform')

export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  watch: {
    percent(newPercent) {
      if (newPercent >= 0 && this.touch.initiated == false) {
        // 16: 进度条按钮的宽度
        const barWidth = this.$refs.progressBar.clientWidth - 16
        const offectWidth = newPercent * barWidth
        this._offset(offectWidth)
      }
    }
  },
  created() {
    this.touch = {}
  },
  methods: {
    // 设置进度条与按钮的偏移量
    _offset(offectWidth) {
      this.$refs.progress.style.width = `${offectWidth}px`
        this.$refs.progressBtn.style[TRANSFORM] = `translate3d(${offectWidth}px, 0, 0)`
    },
    // 计算偏移百分比并抛出事件
    _triggerPercent() {
      const barWidth = this.$refs.progressBar.clientWidth - 16
      const percent = this.$refs.progress.clientWidth / barWidth
      this.$emit('percentChange', percent)
    },
    progressTouchStart(e) {
      this.touch.initiated = true
      // 记录触摸时按钮的初始偏移量
      this.touch.satarX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    progressTouchMove(e) {
      if (!this.touch.initiated) {
        return
      }
      // 横向偏移量
      const deltaX = e.touches[0].pageX - this.touch.satarX
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - 16 ,Math.max(0, this.touch.left + deltaX))
      this._offset(offsetWidth)
    },
    progressTouchEnd(e) {
      this.touch.initiated = false
      this._triggerPercent()
    },
    progressClick(e) {
      this._offset(e.offsetX)
      this._triggerPercent()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height 30px
    .bar-inner
      position relative
      top 13px
      height 4px
      background rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-warpper
        position absolute
        left -8px
        top -13px
        width 30px
        height 30px
        .progress-btn
          position relative
          top 7px
          left 7px
          box-sizing border-box
          width 16px
          height 16px
          border 3px solid $color-text
          border-radius 50%
          background $color-theme

</style>
