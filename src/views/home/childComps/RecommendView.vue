<template>
  <div class="recommends">
    <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>

    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  },
  
}
</script>

<style scoped>
  .recommends{
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 14px;

    padding: 10px 0 20px;
    border-bottom: 10px solid #eee; 
  }
  .recommend-item{
    flex: 1;
  }
  .recommend-item img{
    width: 68px;
    height: 68px;
    margin-bottom: 10px;
    
  }
</style>