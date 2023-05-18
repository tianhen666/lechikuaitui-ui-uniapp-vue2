<template>
  <view class="imgPreview">
    <uni-popup ref="popup" type="center">
      <view class="perviewImg" @tap.stop="maskClick">
        <view class="warpperBox">
          <view class="close" @tap.stop="maskClick">
            <image class="img" src="/static/images/empty/close.png"></image>
          </view>
          <image
            @tap.stop="gotoPage(`/pages/generatePoster/generatePoster?id=${id}`)"
            class="img"
            :src="previewUrl"
            mode="aspectFill"
          ></image>
        </view>
        <button class="btn" @tap.stop="gotoPage(`/pages/generatePoster/generatePoster?id=${id}`)">
          生成我的专属海报
        </button>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'm-poster-preview',
  data() {
    return {};
  },
  computed: {
    ...mapState({
      preview: state => state.poster.preview,
      previewUrl: state => state.poster.previewUrl,
      id: state => state.poster.id
    })
  },
  watch: {
    preview(newVal) {
      if (newVal) {
        this.$refs.popup.open();
      } else {
        this.$refs.popup.close();
      }
    }
  },
  methods: {
    // 点击蒙版取消预览
    maskClick() {
      this.$store.commit('CANCEL_PREVIEW');
    },
    //跳转页面
    gotoPage(url) {
      uni.navigateTo({
        url: url
      });
      this.$store.commit('CANCEL_PREVIEW');
    }
  }
};
</script>

<style lang="scss" scoped>
.imgPreview {
  /deep/.uni-popup {
    z-index: 999;
  }
  .perviewImg {
    text-align: center;
    width: 100vw;
    height: 100vh;
    position: relative;

    .warpperBox {
      position: absolute;
      inset: 0;
      margin: auto;
      width: 500rpx;
      height: 800rpx;
      padding: 15rpx;
      background-color: #fff;
      border-radius: 10rpx;

      .close {
        position: absolute;
        top: -45rpx;
        right: -45rpx;

        .img {
          width: 45rpx;
          height: 45rpx;
          display: block;
        }
      }

      .img {
        border-radius: 10rpx;
        overflow: hidden;
        width: 100%;
        height: 100%;
        display: block;
      }
    }

    .btn {
      position: absolute;
      bottom: 0;
      width: 100%;
      margin-top: 100rpx;
      background-color: $main-color;
      color: #fff;
      font-size: 30rpx;
      height: 50px;
      line-height: 50px;
      border-radius: 0;
      &:after {
        border: none;
      }
    }
  }
}
</style>
