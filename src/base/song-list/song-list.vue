<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(song, index)" v-for="(song, index) in songs" :key="index" class="item">
        <div class="content">
          <div class="name">{{song.name}}</div>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "music-list",
  props: {
    songs: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    getDesc(song) {
      return `${song.singer} - ${song.album}`
    },
    selectItem(item, index) {
      this.$emit('select', item, index)
    }
  }
};
</script>

<style lang="stylus">
  @import '~common/stylus/variable';
  @import '~common/stylus/mixin';

  .song-list
    .item
      display flex
      align-items center
      box-sizing border-box
      height 64px
      foint-size $font-size-medium
      .content
        flex 1
        line-height 20px
        overflow  hidden
        .name
          no-wrap()
          color $color-text
        .desc 
          no-wrap()
          margin-top 4px
          color $color-text-d
</style>
