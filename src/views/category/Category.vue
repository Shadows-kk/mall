<template>
  <div class="category">
    <nav-bar class="category_nav">
      <div slot="center">分类</div>
    </nav-bar>
    <div class="content">
      <category-list :category="category" @titleClick="titleClick"></category-list>
      <scroll class="tab-content"  ref="scroll" :probe-type="3" :pull-up-load="true">
        <div>
          <category-goods :subcategories="showSubcategory"></category-goods>
        </div>
    </scroll>
    </div>
    
  </div>

</template>

<script>
import { getCategoryList, getSubcategory } from "network/category";

import CategoryList from './childComps/categoryList'
import CategoryGoods from './childComps/categoryGoods'
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
export default {
  components: {
    CategoryList,
    NavBar,
    CategoryGoods,
    Scroll
  },
  data() {
    return {
      scroll: null,
      category: [],
      currentIndex: -1,
      categoryData: {},
    }
  },
  created() {
    this.getCategoryList()
  },
  computed:{
    showSubcategory(){
      if(this.currentIndex === -1) return{}
      return this.categoryData[this.currentIndex].subcategories
    }
  },
  methods: {
    getCategoryList() {
      getCategoryList().then(res => {
        // console.log(res);
        this.category = res.data.category.list
        //初始化每个类别的子数据
        for (let i = 0; i < this.category.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
          }
        }
      })
    },
    getCategoryGoods(index) {
      this.currentIndex = index
      const maitKey = this.category[index].maitKey;
      getSubcategory(maitKey).then(res => {
        // console.log(res);
        this.categoryData[index].subcategories = res.data
        //ES6中的json展开功能
        this.categoryData = { ...this.categoryData }
      })
    },
    //子组件点击
    titleClick(index) {
    this.getCategoryGoods(index)
  },
  },
  

}
</script>

<style scoped>
.category {
  height: calc(100vh - 49px);
  overflow: hidden;
  /* overflow-y: scroll; */
}
.category_nav {
  color: #fff;
  background-color: var(--color-tint);
}
.content{
  display: flex;
}
.tab-content{
  position: relative;
  height: calc(100vh - 44px - 49px);
  overflow: hidden;
}
</style>
