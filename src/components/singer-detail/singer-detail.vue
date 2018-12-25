<template>
  <transition name="slide">
    <div class="singer-detail">
    </div>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from 'api/singer'
  export default {
    name: 'singer-detail',
    created() {
      this._getDetail()
    },
    computed: {
      ...mapGetters([
        'singer'
      ])
    },
    methods: {
      _getDetail() {
        let singerId = this.singer.id || this.$route.params.id
        getSingerDetail(singerId).then((res) => {
          if (res.code === 0) {
            console.log(res.data.list)
          }
        })
      }
    }
  }
</script>

<style lang="stylus">
  @import '~common/stylus/variable'

  .singer-detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: $color-background
  .slide-enter-active, .slide-leave-active
    transition all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0 ,0)
</style>
