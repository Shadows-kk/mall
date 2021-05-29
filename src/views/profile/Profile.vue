<template>
  <div>
    <nav-bar class="profile_nav">
      <div slot="center">个人中心</div>
    </nav-bar>
    <div class="profile">
      <div class="user"><img src="../../assets/img/profile/avatar.png" alt=""></div>
      <div class="info">
        <div class="login">登陆/注册</div>
        <div class="phone">暂未绑定手机号</div>
      </div>
      <div class="more">></div>
    </div>
    <div class="count">
      <div class="balance">
        <div><span>0.00</span>元</div>
        <div>我的余额</div>
      </div>
      <div class="sale">
        <div><span>0</span>个</div>
        <div>我的优惠</div>
      </div>
      <div class="grade">
        <div><span>0</span>分</div>
        <div>我的积分</div>
      </div>
    </div>
    <div class="list1">
      <div class="message">
        <img src="../../assets/img/profile/message.png" alt="">
        <div>我的消息</div>
      </div>
      <div class="shop">
        <img src="../../assets/img/profile/shop.png" alt="">
        <div>积分商城</div>
      </div>
      <div class="vip">
        <img src="../../assets/img/profile/vip.png" alt="">
        <div>会员卡</div>
      </div>
    </div>
    <div class="list1">
      <div class="cart">
        <img src="../../assets/img/profile/cart.png" alt="">
        <div>我的购物车</div>
      </div>
      <div class="dowm">
        <img src="../../assets/img/profile/down.png" alt="">
        <div>下载购物app</div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "Profile",
  components: {
    NavBar
  }
}
</script>

<style scoped>
.profile_nav {
  color: #fff;
  background-color: var(--color-tint);
}
.profile {
  width: 100vw;
  padding: 15px;
  color: #fff;
  background-color: var(--color-tint);
  display: flex;
  flex-direction: row;
  align-items: center;
}
.profile .user img {
  width: 55px;
  height: 55px;
}
.profile .info {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.9);
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 15px;
}
.profile .info div {
  margin: 10px;
  justify-content: center;
  align-items: center;
}
.profile .more {
  margin-left: auto;
}
.count {
  display: flex;
  align-items: center;
  border-bottom: 15px solid #eee;
  font-size: 18px;
}
.count .balance,
.sale,
.grade {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #eee;
  padding: 10px;
  line-height: 25px;
  flex: 1;
}
.count > div:last-child {
  border-right: none;
}
.count span {
  color: var(--color-tint);
  font-size: 28px;
}
.list1 {
  display: flex;
  flex-direction: column;
  border-bottom: 8px solid #eee;
}
.list1 img {
  width: 25px;
  height: 25px;
}
.list1 > div {
  display: flex;
  align-items: center;
  line-height: 20px;
  border-bottom: 1px solid #eee;
  padding: 10px;
  padding-left: 20px;
  font-size: 15px;
}
.list1 > div div {
  padding-left: 10px;
}
</style>
