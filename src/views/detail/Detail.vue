<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type='3 '>
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-params-info ref="params" :param-info="itemParams"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll> 
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template> 

<script>
import DetailNavBar from  './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamsInfo from './childComps/DetailParamsInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList/'
import {debounce} from 'common/utils'
import {itemListenerMixin,backTopMixin} from 'common/mixin'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'

import { mapActions } from 'vuex'

export default {
  name: 'detail',
  data(){
    return {
      iid: null,
      topImages:[],
      goods: {} ,
      shop: {},
      detailInfo:{},
      paramInfo: {},  
      itemParams: {},
      commentInfo: {},
      recommends: [],
      // itemImgListener: null,  
      themeTopYs: [0,1000,2000,3000], 
      getThemeTopY: null,
      currentIndex: 0
    }
  }, 
  mixins:[itemListenerMixin,backTopMixin], 
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,  
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo, 
    Scroll, 
    GoodsList,
    DetailBottomBar
  },
  created(){
    // 1.保存传入的id
    this.iid = this.$route.params.iid
    // console.log(this.$route.params.iid);
    
    // 2.根据id请求详情页数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.result
      // 2.1.获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages
      // 2.2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 2.3.获取商家信息
      this.shop = new Shop(data.shopInfo) 
      // 2.4.保存商品的详情信息
      this.detailInfo = data.detailInfo;
      // 2.5.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule) 
      // 2.6.取出参数的信息
      this.itemParams = data.itemParams 
      // 2.7.取出评论信息
      if(data.rate.cRate != 0) {
         this.commentInfo = data.rate.list[0]
      }
      /*this.$nextTick(() => {
          //获取不同组件的offsetTop
          this.titleTopY = [];
          this.titleTopY.push(0);
          this.titleTopY.push(this.$refs.param.$el.offsetTop - 44);
          this.titleTopY.push(this.$refs.comment.$el.offsetTop - 44);
          this.titleTopY.push(this.$refs.goodsList.$el.offsetTop - 44);
          console.log("我");   
        });
      */
    }) 
    // 3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list 
    })
    
    // 4.给getThemeTopY赋值(对赋值操作防抖) 
    //4.给getThemTopY赋值(对给getThemTopY进行赋值的操作进行防抖)
    this.getThemeTopY = debounce(() =>{
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)//参数的offsetTop
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)//评论的offsetTop
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)//推荐的offsetTop
      // console.log(this.themeTopYs);
    },100) 
  },
  mounted() {
      // 1.图片加载完的事件监听
      // const refresh = debounce(this.$refs.scroll.refresh, 500)
      // this.itemImgListener = () => {refresh()}
      // .监听item中图片架载完成
      // this.$bus.$on('itemImageLoad',this.itemImgListener) 
    },
  methods:{
    ... mapActions(['addCart']),
    // 1.图片加载
    imageLoad(){ 
       this.$refs.scroll.refresh();
       this.getThemeTopY()
    },
    // 2，点击标题
    titleClick(index){ 
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index]+44, 500 )
      // this.getThemeTopY
    },
    // 3.内容滚动
    contentScroll(position) {
    // 1.获取y值,这里加上顶部导航的宽度44，不然需要上滚一段才能切换索引值
      const positionY = -position.y+44
      let length = this.themeTopYs.length
      for (let i=0;i<length;i++) {
        // this.currentIndex != i 防止 赋值过于频繁
          if(this.currentIndex != i &&
           ((i<length - 1 && positionY >= this.themeTopYs[i] &&
           	 positionY < this.themeTopYs[i+1])|| 
           	 (i === length - 1 && 
           	 positionY >= this.themeTopYs[i]))){
                  this.currentIndex = i;
                  this.$refs.nav.currentIndex = this.currentIndex//实现联动，让索引值等于currentIndex值
             } 
      };

      // 2.判断backtop是否显示
      this.listenShowBackTop(position) 
      
    },
    // 4.添加购物车
    addToCart(){  
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title; 
      product.desc = this.goods.desc;  
      product.price = this.goods.realPrice; 
      product.iid = this.iid;
      // 2.将商品添加到购物车
      // （1）
      // this.$store.commit('addCart',product);
      // （2）
      // this.$store.dispatch('addCart',product).then(res => {
      //   console.log(res );
      // })
      // （3）
      this.addCart(product).then(res => {
        // console.log(res);
        this.$toast.show(res,1500)
      })
    }
  }, 
  destroyed(){
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
}
</script>
 
<style scoped>
  .detail {
      position: relative;
      z-index: 9;
      background-color: #fff; 
      height: 100vh;  
    }
 
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }
</style> 