<template>
  <view><mi-map @updateAddress="updateAddress"></mi-map></view>
</template>

<script>
export default {
  data() {
    return {};
  },
  onLoad() {},
  methods: {
    /** 返回详细地址 */
    updateAddress(res) {
      console.log(res);
      // 1. 获取当前页面栈实例（此时最后一个元素为当前页）
      let pages = getCurrentPages();

      // 2. 上一页面实例
      // 注意是length长度，所以要想得到上一页面的实例需要 -2
      // 若要返回上上页面的实例就 -3，以此类推
      let prevPage = pages[pages.length - 2];

      // 3. 给上一页面实例绑定setAddress()方法和参数（注意是$vm）
      prevPage.$vm.setAddress(res);

      // 4. 返回上一页面
      uni.navigateBack({
        delta: 1 // 返回的页面数
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.map {
  width: 750rpx;
  height: 100vh;
}
</style>
