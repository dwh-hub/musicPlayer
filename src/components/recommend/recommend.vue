<template>
  <div id="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrap">
        	<slider>
        	  <div v-for="item in recommends" v-bind:key="item.id">
        	  	<a v-bind:href="item.linkUrl">
        	  	  <img v-on:load="imgLoad" v-bind:src="item.picUrl"/>
        	  	</a>
        	  </div>
        	</slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌曲推荐</h1>
          <ul>
            <li class="item" v-for="item in discList" v-bind:key="item.id">
              <div class="icon">
                <img v-lazy="item.imgurl" width="60" height="60">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
  import {getRcommend, getDiscList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'

  export default {
  	data () {
  	  return {
  	  	recommends: [],
        discList: []
  	  }
  	},
  	components: {
  	  Slider,
      Scroll,
      Loading
  	},
  	created () {
      this._getRecommend()
      this._getDiscList()
  	},
  	methods: {
  	  _getRecommend () {
  	  	getRcommend().then((res) => {
  	  	  if (res.code === ERR_OK) {
  	  	  	this.recommends = res.data.slider
  	  	  }
  	  	})
  	  },
      _getDiscList () {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
          }
        })
      },
      imgLoad () {
        if (!this.checkLoaded) {
          this.$refs.scroll.refresh()
          this.checkLoaded = true
        }
      }
  	}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl'

  #recommend
    position fixed
    width 100%
    top 88px
    bottom 0px
    .recommend-content
      height 100%
      overflow hidden
      .slider-wrap
      	position relative
      	width 100%
      	overflow hidden
      .recommend-list
      	.list-title
      	  height 65px
      	  line-height 65px
      	  text-align center
      	  font-size $font-size-medium
      	  color $color-theme
        .item
          display flex
          box-sizing border-box
          align-item center
          padding 0px 20px 20px 20px
          .icon
            flex 0 0 60px
            width 60px
            padding-right 20px
          .text
            display flex
            flex-direction column
            justify-content center
            felx 1
            line-height 20px
            overflow hidden
            // text-overflow ellipsis
            // white-space: nowrap
            font-size $font-size-mdeium
            .name
              margin-bottom 10px
              color $color-text
            .desc
              color $color-text-d
    .loading-container
      position absolute
      text-align center
      width 100%
      top 50%
      transform translateY(-50%)
</style>
