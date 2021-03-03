<template>
  <div>
    <detail-nav-bar/>
    <detail-swiper :top-images="topImages" />
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'

import {getDetail} from 'networks/detail'

export default {
  name: 'detail',
  data(){
    return {
      iid: null,
      topImages: []
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper
    
  },
  created(){
    // 1. 获取iid
    this.iid = this.$route.params.iid
    // 2. 根据iid请求数据
    getDetail(this.iid).then(res => {
      console.log(res);
      this.topImages = res.result.itemInfo.topImages
    })
  }
}
</script>

<style scoped>

</style>