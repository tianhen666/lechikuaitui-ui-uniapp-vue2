<template>
  <view class="commonlyUsedTools">
    <view class="title">
      <view class="left"><text>管理工具</text></view>
    </view>

    <view class="commonlyUsedToolsBox">
      <view
        class="warpper"
        v-for="(item, index) in managementTool"
        :key="index"
        @tap.stop="verifyIsMemberGoToPage(item.url)"
      >
        <image class="img" :src="item.imgUrl" mode="aspectFill"></image>
        <text class="name">{{ item.name }}</text>
        <!-- <text class="desc">{{ item.desc }}</text> -->
      </view>
    </view>

    <!-- 提示弹窗 -->
    <m-uni-popup
      ref="tipsPopupRef"
      :mPopupDesc="mPopupDesc"
      :mPopupBtn1="mPopupBtn1"
      @Btn1Fun="_$tipsPopupBtn1"
    ></m-uni-popup>
  </view>
</template>

<script>
export default {
  name: 'm-commonlyUsedTools',
  props: {
    itemData: Object
  },
  data() {
    return {
      // 弹窗提示
      mPopupDesc: '',
      mPopupBtn1: '',

      // 管理工具
      managementTool: [
        // { name: '企业官网', desc: '未创建', imgUrl: '/static/images/empty/us4.png', url: '' },
        {
          name: '门诊管理',
          desc: '未创建',
          imgUrl: '/static/images/empty/us5.png',
          url: '/pages/clinicManagement/clinicManagement'
        },
        {
          name: '员工管理',
          desc: '未创建',
          imgUrl: '/static/images/empty/us3.png',
          url: '/pages/staffManagement/staffManagement'
        },
        {
          name: '门诊环境',
          desc: '未创建',
          imgUrl: '/static/images/empty/us7.png',
          url: '/pages/photo/photo'
        }
        // {
        //   name: '订单管理',
        //   desc: '未创建',
        //   imgUrl: '/static/images/empty/us6.png',
        //   url: '/pages/myOrder/myOrder'
        // }
      ]
    };
  },
  methods: {
    // 验证是否为管理员,验证通过跳转
    verifyIsMemberGoToPage(path) {
      if (!this._$isMember) {
        this.mPopupDesc = '没有门诊, 请创建门诊';
        this.mPopupBtn1 = '免费创建门诊';
        this.$refs.tipsPopupRef.open();
        return false;
      }
      this._$goToPage(path);
    }
  }
};
</script>

<style lang="scss" scoped>
.commonlyUsedTools {
  padding: 10rpx 20rpx 30rpx;
  border-radius: 20rpx;
  background-color: #fff;
  border: 1px solid #f1f1f1;
  .commonlyUsedToolsBox {
    margin-top: 15rpx;
    display: grid;
    row-gap: 20rpx;
    justify-content: space-between;
    justify-items: center;
    grid-template-columns: repeat(4, 120rpx);
    padding-bottom: 30rpx;

    .warpper {
      text-align: center;
      .img {
        width: 75rpx;
        height: 75rpx;
      }
      .name {
        display: block;
        font-size: 24rpx;
        @include overHeiddenText(1);
      }
      .desc {
        display: block;
        font-size: 24rpx;
      }
    }
  }
}
</style>
