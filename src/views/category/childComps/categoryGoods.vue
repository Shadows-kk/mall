<template>
  <div class="category_goods">
    <div class="item" v-for="(item,index) in subcategories.list" :key="index" >
      <a :href="item.link">
        <img class="item-img" :src="item.image" alt="">
        <div class="item-title">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    subcategories:{
      type:Object,
      default(){
        return {}
      }
    }
  },

}
</script>

<style scoped>
.category_goods{
  width: 75vw;
  height: 100vh;
  background-color: #eee;
  display: flex;
  flex-wrap: wrap;
}
.item{
  width: 33%;
  display: flex;
  box-sizing: border-box;
  padding: 5px;
  margin-bottom: 5px;
}
.item .item-img{
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 10px;
}
.item .item-title{
  margin-top: 4px;
  font-size: 15px;
  text-align: center;
}
</style>