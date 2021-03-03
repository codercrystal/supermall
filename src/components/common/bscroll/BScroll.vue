<template>
<div class="wrapper" ref="wrapper">
  <div class="content">
    <slot></slot>
  </div>
</div>
  
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'BScroll',
  props: {
    probeType: {
      type: Number,
      default(){
        return 0
      }
    },
    pullUpLoad: {
      type: Boolean,
      default(){
        return false
      }
    }
  },
  data(){
    return {
      scroll: null
    }
  },
  mounted(){
    // 1. 创建Scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })

    // 2. 监听滚动位置
    this.scroll.on('scroll', (position) => {
      // console.log(position);
      this.$emit('scroll', position)
    })

    // 3. 监听上拉加载更多
    this.scroll.on('pullingUp', () =>{
      this.$emit('pullingUp')
    })

    
      
  },
  methods: {
    scrollTo(x, y,time=300){
      this.scroll && this.scroll.scrollTo(x, y)
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      // console.log('+++++');
      this.scroll && this.scroll.refresh()
    },
    getScrollY(){
      return this.scroll?this.scroll.y:0
    }
  }
}
</script>

<style scoped>
.wrapper{
  overflow: hidden;
}
</style>