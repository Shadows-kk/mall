<template>
<!-- 引入 -->
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" 
                      @tabClick="tabClick"
                      ref="tabControl1"
                      class="tab-class"
                      v-show="isTabFixed"/>
      <scroll class="content" 
              ref="scroll" 
              :probe-type="3" 
              @scroll="contentScroll"
              :pull-up-load="true"
              @pullingUp="loadMore">

              
        <home-swiper 
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"/>
        <recommend-view :recommends="recommends"/> 
        <feature-view/>
        <tab-control :titles="['流行','新款','精选']" 
                      @tabClick="tabClick"
                      ref="tabControl2"
                      v-show="!isTabFixed"/>
        <goods-list :goods="showGoods"/>
      </scroll>  
      <!-- 监听组件的原生事件，需要用click.native -->
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
    
     
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from 'components/content/tabcontrol/TabControl';
  import GoodsList from 'components/content/goods/GoodsList';
  import Scroll from 'components/common/scroll/Scroll';
  

  import HomeSwiper from './childComps/HomeSwiper';
  import RecommendView from './childComps/RecommendView';
  import FeatureView from './childComps/FeatureView';

  import {getHomeMultidata, getHomeGoods} from "network/home";
  import {debounce} from "common/utils";
  import {backTopMixin} from 'common/mixin'

  

  export default {
    name: "Home",
    components: { 
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      // BackTop,

      HomeSwiper,
      RecommendView,
      FeatureView,
      
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods:{
          'pop':{page: 0, list:[]},
          'new':{page: 0, list:[]},
          'sell':{page: 0, list:[]}
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
        itemImgListener: null
      }
    },
    mixins:[backTopMixin],
    created() {

      // 1.请求多个数据
      this.getHomeMultidata();   

      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      // 1.图片加载完的事件监听
      const refresh = debounce(this.$refs.scroll.refresh, 500)
      this.itemImgListener = () => {refresh()}
        
      // .监听item中图片架载完成
      this.$bus.$on('itemImageLoad',this.itemImgListener)
      // 监听到图片加载完成再调用Scroll中的refresh函数,重新计算高度
      // this.$refs.scroll.refresh()
        
    },
    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh() 
    }, 
    deactivated(){ 
      // 1.保存y值
      this.saveY = this.$refs.scroll.getScrollY();
      // 2.取消全局事件的监听
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    methods: {

      // 1.网络请求相关方法
      getHomeMultidata(){
        getHomeMultidata().then(res => {
        // this.result = res;
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        })
      }, 
      getHomeGoods(type){
        // 动态给一个page
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      },


      // 2.事件监听相关方法
      tabClick(index){
        switch(index){
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'  
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex  = index; 
      },
      
      contentScroll(position){
        // 1.判断backtop是否显示
        this.listenShowBackTop(position) 

        // 2. 决定tabcontrol是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      
      loadMore(){
        console.log('加载更多图片...'); 
        // 调用函数加载下一页的数据
        this.getHomeGoods(this.currentType) 
      },
      swiperImageLoad(){
      // 获取tabControl的 offsetTop
      // 所有组件中都有一个属性 $el: 用于获取组件中的元素
       this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      // console.log(this.$refs.tabControl.$el.offsetTop);
      },  
    }
  } 
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    /* vh视口高度100% */
    height: 100vh; 
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* width: 100%; */

    /* 使用原生滚动时，为了使导航不一起滚动给的position */
    /* position: fixed; 
    left: 0; 
    right: 0;
    top: 0; 
    z-index: 9; */
  }
  /*   
      position: relative;
      z-index: 9;
  } */
  /* 内容区高度方案1 */
  .content{
    height: calc(100% - 50px);
    overflow: hidden;
  }

  /* 方案2 */
  /* .content{
    position: absolute; 
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;

  } */
</style>
