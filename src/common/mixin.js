import {debounce} from './utils'
import BackTop from 'components/content/backtop/BackTop'
// 1.图片加载完成
export const itemListenerMixin = {
  components:{},
  methods:{},
  data(){
    return {
      itemImgListener: null
    }
  },
  mounted() {
    // 1.图片加载完的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    this.itemImgListener = () => {refresh()}
      
    // .监听item中图片架载完成
    this.$bus.$on('itemImageLoad',this.itemImgListener)
    // console.log('我是mixin混入内容');
      
  },  
}
// 2.返回顶部
export const backTopMixin = {
   data(){
     return {
      isShowBackTop: false,
     }
   },
   methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    }, 
    // 回到顶部显示 
    listenShowBackTop(position){
      this.isShowBackTop = (-position.y) > 1000
    },
   }, 
   components:{
    BackTop, 
   }
}