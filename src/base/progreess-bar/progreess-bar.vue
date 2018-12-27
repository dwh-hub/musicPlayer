<template>
  <div class="progreess-bar">
    <div class="bar-inner">
      <div class="progreess"></div>
      <div class="progreess-btn-warpper">
        <div class="progreess-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progreess-bar
    height 30px
    .bar-inner
      position relative
      top 13px
      height 4px
      background rgba(0, 0, 0, 0.3)
      .progreess
        position: absolute
        height: 100%
        background: $color-theme
      .progreess-btn-warpper
        position absolute
        left -8px
        top -13px
        width 30px
        height 30px
        .progreess-btn
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
