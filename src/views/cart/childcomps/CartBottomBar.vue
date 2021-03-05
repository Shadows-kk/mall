<template>
  <div class="bottom-bar"> 
    <div class="check-content"> 
      <check-button 
          class="check-button" 
          :is-checked="isSelectAll"
          @click.native="checkClick"/>  
      <span>全选</span>
    </div>

    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script> 
import { mapGetters } from 'vuex'
import CheckButton from '../../../components/content/checkButton/CheckButton.vue'
export default {
  name: 'CartBottomBar',
  components: { 
    CheckButton, 
  },
  methods:{
    checkClick(){
       if(this.isSelectAll){
         this.cartList.forEach(item => item.checked = false)  
       }else{  
         this.cartList.forEach(item => item.checked = true)   
       }
    } 
  }, 
  computed:{
   ...mapGetters(['cartList']),
   totalPrice(){
     return '¥' + this.$store.state.cartList.filter(item => {
       return item.checked
     }).reduce((preValue,item) => {
          return preValue + item.price * item.count
     },0).toFixed(2) 
   },
   checkLength(){
     return this.$store.state.cartList.filter(item => item.checked).length
   },
   isSelectAll(){
      if(this.cartList.length === 0) return false
      // 使用filter()
      return !this.cartList.find(item => !item.checked) 
      // 使用find() 
      // return !(this.cartList.filter(item => !item.checked).length) 
   }
  } 
}
</script>

<style scoped>
.bottom-bar{
   width: 100%;
   height: 40px;
   background-color: #eee;
   position: fixed;
   bottom: 49px; 
   line-height: 40px;
   display: flex; 
}
.check-content{
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 80px;
}
.check-button{ 
  width: 20px; 
  height: 20px;
  line-height: 20px;
  margin-right: 5px;  
} 
.price{
   margin-left: 30px;
   flex: 1 ;
}
.calculate{
  width: 110px;
  text-align: center;
  background-color: salmon; 
  color: #fff;  
}
</style> 