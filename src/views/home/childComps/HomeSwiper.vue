<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
  name: 'home-swiper',
  props:{
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data(){
    return {
      isLoad: false
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods:{
    imageLoad(){
       if(!this.isLoad){
         this.$emit('swiperImageLoad')
         this.isLoad = true
       }
    },
    stopTimer() {
        this.$refs.swiper.stopTimer()
    },
    startTimer() {
        if (this.$refs.swiper) {
            this.$refs.swiper.startTimer()
        }
    },
  }
}
</script>

<style scoped>
/* 手写
 */
</style>