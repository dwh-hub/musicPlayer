<template>
  <div class="slider" ref="slider">
    <div class="slider-content" ref="sliderContent">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(dot, index) in dots" :dot="dot" :index="index" :key="dot" :class="{active: currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {addClass} from 'common/js/dom'
  export default {
  	props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
  	},
    data () {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
  	mounted () {
      setTimeout(() => {
        this._setSliderWidth()
        this._initSlider()
        this._initDots()
        if (this.autoPlay) {
          this._autoPlay()
        }
      }, 20)

      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        // this.slider.finishPullUp()
        this.slider.refresh()
      })
  	},
    methods: {
      _setSliderWidth (isResize) {
        this.children = this.$refs.sliderContent.children
        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth

        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }

        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderContent.style.width = width + 'px'
      },
      _initSlider () {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: true,
            threshold: 0.3,
            speed: 400
          }
        })

        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX
          this.currentPageIndex = pageIndex

          if (this.autoPlay) {
            this._autoPlay()
          }
        })

        this.slider.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },
      _initDots () {
        this.dots = new Array(this.children.length - 2)
      },
      _autoPlay () {
        let pageIndex = this.currentPageIndex + 1
        this.timer = setTimeout(() => {
          // 0代表Y方向
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    },
    activated () {
      if (this.autoPlay) {
        this._play()
      }
    },
    deactivated () {
      clearTimeout(this.timer)
    },
    beforeDestroy () {
      clearTimeout(this.timer)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl'

  .slider
    min-height 1px
    .slider-content
      position relative
      overflow hidden
      white-space nowrap
      .slider-item
        float left
        box-sizing border-box
        overflow hidden
        text-align center
        a
          display block
          width 100%
          overflow hidden
          text-decoration none
        img
          display block
          width 100%
    .dots
      position absolute
      right 0px
      left 0px
      bottom 12px
      text-align center
      font-size 0
      .dot
        display inline-block
        margin 0 4px
        width 8px
        height 8px
        border-radius 50%
        background $color-text-l
        &.active
          width 20px
          border-radius 5px
          background $color-text-ll
</style>
