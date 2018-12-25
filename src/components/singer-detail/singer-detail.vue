<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from 'api/singer'
  import {createSong, getMusic} from 'common/js/song'
  import musicList from 'components/music-list/music-list'

  export default {
    name: 'singer-detail',
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getDetail()
    },
    components: {
      musicList
    },
    computed: {
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      },
      ...mapGetters([
        'singer'
      ])
    },
    methods: {
      _getDetail() {
        // let singerId = this.singer.id || this.$route.params.id
        if (!this.singer.id) {
          return this.$router.push('/singer')
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === 0) {
            this.songs = this._normalizeSongs(res.data.list)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          if (musicData.songid && musicData.albummid) {
            // ret.push(createSong(musicData))
            getMusic(musicData.songmid).then((res) => {
              if (res.code === 0) {
                const svkey = res.data.items
                const songVkey = svkey[0].vkey
                const newSong = createSong(musicData, songVkey)
                ret.push(newSong)
              }
            })
          }
        })
        return ret
      }
    }
  }
</script>

<style lang="stylus">
  @import '~common/stylus/variable'

  .slide-enter-active, .slide-leave-active
    transition all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0 ,0)
</style>
