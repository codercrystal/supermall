<template>
  <div id="home">

    <nav-bar class="home-bar"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @TabClick="TabClick"
                 ref="tabcontrol1"
                 v-show="isTabctrlFix"/>

    <b-scroll class="scroll" 
              ref="scroll" 
              :probe-type="3" 
              @scroll="contentScroll"
              :pull-up-load="true"
              @pullingUp="loadMore">
      <home-swiper :banners="banners" @swipImgLoad="swipImgLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']"
                   @TabClick="TabClick"
                   ref="tabcontrol2"/>
      <good-list :goods="goods[goodstype].list"/>
      
    </b-scroll>

    <back-top @click.native="backClick" v-show="isBackTopShow"/>

    
  </div>
</template>

<script>

import HomeSwiper from './childcomps/HomeSwiper'
import RecommendView from './childcomps/RecommendView'
import FeatureView from './childcomps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from "components/content/tabcontrol/TabControl"
import GoodList from 'components/content/goodlist/GoodList'
import BScroll from 'components/common/bscroll/BScroll'
import BackTop from 'components/content/backtop/BackTop'


import {getHomeMultidata, getHomeGoods} from 'networks/home'
import {debounce} from 'common/utils'



export default {
  components: { 
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList,
    BScroll,
    BackTop
  },
  name: 'home',
  data(){
    return {
      // result: null
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 1, list: []},
        'new': {page: 1, list: []},
        'sell': {page: 1, list: []}
      },
      goodstype: 'pop',
      // 下面这种写法为什么会报错，显示不能读‘list’
      // goodstype: {
      //   type: String,
      //   default(){
      //     return 'pop'
      //   }
      // },
      isBackTopShow: {
        type: Boolean,
        default(){
          return false
        }
      },
      isTabctrlFix: false,
      // isTabctrlFix: {
      //   type: Boolean,
      //   default(){
      //     return false
      //   }
      // }
      tabOffsetTop: 0,
      saveY: 0

    }
  },

  actived(){
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactived(){
    this.saveY = this.$refs.scroll.getScrollY()
  },

  created(){
    this._getHomeMultidata()

    this._getHomeGoods('pop')
    this._getHomeGoods('new')
    this._getHomeGoods('sell')

  },

  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200)

    this.$bus.$on('itemImageload', () => {
      // this.$refs.scroll.refresh()
      // console.log('----');
      refresh()
    })
    
  },

  methods: {

    /**
    * 事件监听相关的方法 
    */
    TabClick(index){
      switch(index){
        case 0:
          this.goodstype = 'pop'
          break
        case 1:
          this.goodstype = 'new'
          break
        case 2:
          this.goodstype = 'sell'
          break
      }
      // 让两个tabCtrl活跃状态同步
      this.$refs.tabcontrol1.currentIndex = index
      this.$refs.tabcontrol2.currentIndex = index
    },
    backClick(){
      this.$refs.scroll.scrollTo(0, 0)
    },

    contentScroll(position){
      this.isBackTopShow = -(position.y) > 1000
      this.isTabctrlFix = -(position.y) > this.tabOffsetTop
    },

    loadMore(){
      this._getHomeGoods(this.goodstype)
      
    },
    swipImgLoad(){
      // 等轮播图第一张图片加载完后获取offsetTop值
      this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop
    },
    

    /**
    * 网络请求相关的方法 
    */
    _getHomeMultidata(){
      getHomeMultidata().then(res => {
      // this.result = res.data
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      }).catch(err => {
        console.log(err);
      })
    },
    _getHomeGoods(type){
      const page = this.goods[type].page
      getHomeGoods(type, page).then(res => {      
        // console.log(res.data)
        const newList = res.data.list
        this.goods[type].list.push(...newList)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style  scoped>
  #home {
    /* padding-top: 44px; */
    position: relative;
    height: 100vh
  }

  .home-bar {
    /* display: flex;
    height: 44px;
    line-height: 44px;
    background-color: var(--color-tint);
    text-align: center;
    color: #fff;
    box-shadow: 0px 1px 1px rgba(100, 100, 100, .1);

    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    z-index: 9; */

    background-color: var(--color-tint);
    color: #fff;
    /* position:relative;
    z-index: 9; */
  
  }

  .scroll {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
  }

</style>