<template>
  <view class="container">
    <view class="optionBox">
      <view class="optionItem" v-for="(item, index) in option" :key="index">
        <text>{{ item.name }}</text>
      </view>
    </view>

    <view class="diyPoster">
      <view class="img_box">
        <image class="img" :src="posterObj.content" mode="widthFix"></image>
      </view>
    </view>

    <view class="diyBtn">
      <view class="warpper">
        <view class="btn_box">
          <button class="btn">取消</button>
          <button class="btn">重置海报</button>
          <button class="btn s1">生成海报</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  import {
    getSourceMaterialId
  } from '@/api/materialLibrary.js';
  export default {
    data() {
      return {
        posterObj: {},
        option: [{
            name: '二维码'
          },
          {
            name: '联系方式'
          },
          {
            name: '企业logo'
          },
          {
            name: '个人信息'
          },
          {
            name: '广告信息'
          }
        ]
      };
    },
    mounted() {},
    computed: {
      ...mapState({
        preview: state => state.poster.preview,
      })
    },
    onLoad({
      id
    }) {
      getSourceMaterialId({
        id
      }).then(res => {
        this.posterObj = res.data;
      });
    },
  };
</script>

<style lang="scss">
  .container {
    .optionBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx 20rpx;
      background-color: #fff;

      .optionItem {
        font-size: 25rpx;
        background-color: #eee;
        color: #666;
        border-radius: 10rpx;
        padding: 5rpx 16rpx;
      }

      .curr {
        background-color: $main-color;
        color: #fff;
      }
    }

    .diyPoster {
      padding: 20rpx;
      background-color: #fff;
      width: 500rpx;
      margin: auto;
      margin-top: 40rpx;
      border-radius: 10rpx;

      .img_box {
        width: 100%;

        .img {
          width: 100%;
        }
      }
    }

    .diyBtn {
      height: 160rpx;

      >.warpper {
        position: fixed;
        height: 120rpx;
        bottom: 0;
        background-color: #fff;
        width: 100%;

        .btn_box {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 60rpx;

          >.btn {
            display: inline-block;
            font-size: 25rpx;
            line-height: 2.3;
            margin: 0;
          }

          >.s1 {
            background-color: $main-color;
            color: #fff;
          }
        }
      }
    }
  }
</style>