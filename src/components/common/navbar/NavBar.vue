<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div> 
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
.nav-bar{
  display: flex;
  height: 44px;
  line-height: 44px;
  /* 文字居中 */
  text-align: center;
  box-shadow: 0,1px,1px rgba(100, 100, 100, 0.1); 
  border-bottom: 1px solid rgb(143, 143, 143);
}
.left,.right{
  width: 60px;
}
.center{
  flex: 1;
}
</style>