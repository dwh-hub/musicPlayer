<template>
  <div id="m-header">
    <i class="icon"></i>
    <h1 class="title">MyMusic</h1>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin.styl"
  @import "~common/stylus/variable.styl"

  #m-header
    position relative
    height 44px
    text-align center
    color $color-theme
    font-size 0
    .icon
      display inline-block
      vertical-align top
      margin-top 6px
      margin-right 9px
      width 30px
      height 32px
      bg-image('logo')
      background-size 30px 30px
    .title
      display inline-block
      vertical-align top
      line-height 44px
      font-size $font-size-large
</style>
