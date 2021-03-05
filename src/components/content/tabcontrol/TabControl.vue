<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="index"
     class="tab-control-item" 
     :class="{active: index === currentIndex}"
     @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tab-control' ,
  props:{
    titles: Array,
    default(){
      return []
    }
  },
  data(){
    return {
      // 记录当前谁被选中
      currentIndex: 0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index;
      // 向外传递点击事件
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style scoped>
.tab-control{
  display: flex;
  text-align: center;
  font-size: 18px;
}
.tab-control-item{
  flex: 1;
  line-height: 40px;
  height: 40px;
}
.active{
  color: var(--color-high-text);
}
.active span{
  border-bottom: 3px solid var(--color-tint); 
}
.tab-control-item span{
  padding: 4px;
}
</style> 