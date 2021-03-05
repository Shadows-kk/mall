import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  //mutations唯一的目的就是修改state中状态
  //mutations中的每个方法尽可能完成的事件比较单一一点
  // 数量加一
  [ADD_COUNTER](state,payload) {
    payload.count++
    console.log('同一件数量'+ payload.count);
  },
  [ADD_TO_CART](state,payload) {
    payload.checked = true;
    state.cartList.push(payload)
    console.log('总数' + this.state.cartList.length);
  }
}

