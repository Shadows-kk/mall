<template>
  <div class="categorylist">
    <div class="category_title" :class="{active:index === isActive}" v-for="(item,index) in category" :key="index" @click="titleClick(index)">{{item.title}}</div>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isActive: 0
    }
  },
  methods: {
    titleClick(index) {
      this.isActive = index
      this.$emit('titleClick', index)
    }
  }
}
</script>

<style scoped>
.categorylist {
  width: 25vw;
  height: 100%;
  font-size: 18px;
}
.category_title {
  height: 44px;
  width: 100%;
  text-align: center;
  line-height: 44px;
}
.active {
  color: var(--color-tint);
  background-color: #eee;
  border-left: 3px solid var(--color-high-text);
}
</style>