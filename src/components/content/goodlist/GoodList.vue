<template>
  <div class="goods-list">
    <good-list-item class="item" v-for="item in goods" :goods-item="item">
    </good-list-item>
  </div>
</template>

<script>
import GoodListItem from './GoodListItem'

export default {
  name: 'GoodList',
  components: {
    GoodListItem
  },
  props: {
    goods: {
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>

.goods-list {
display: flex;
flex-wrap: wrap;
padding: 4px;
justify-content: space-around;
}

.goods-list .item {
  width: 48%;
}
</style>