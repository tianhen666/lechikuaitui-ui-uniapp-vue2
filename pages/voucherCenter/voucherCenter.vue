<template>
  <view>
    <button @tap="mCreateOrder(1)">套餐一</button>
    <button @tap="mCreateOrder(2)">套餐二</button>
    <button @tap="mCreateOrder(3)">套餐三</button>
  </view>
</template>

<script>
import { createOrder, payOrder } from '@/api/materialLibrary.js';
import wx from '@/wxJsSDK/index.js';
export default {
  data() {
    return {};
  },
  async onLoad() {
    // 等待onLaunch 加载完成
    await this.$onLaunched;

    // 微信jsdk初始化
    wx.initJssdk();
  },
  methods: {
    async mCreateOrder(type) {
      try {
        // 请求后端创建订单
        const res = await createOrder({ memberType: type });

        // 请求后端获取参数
        const res2 = await payOrder({ orderId: res.data });

        // 解析返回的参数信息
        const pay_info = JSON.parse(JSON.parse(res2.data.displayContent).pay_info);

        //唤醒支付界面
        wx.chooseWXPay(pay_info);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style lang="scss"></style>
