<template>
  <view class="server-place">
    <map
      id="map"
      ref="map"
      v-bind:style="{ height: mapH + 'px' }"
      style="width: 100%;"
      :show-location="true"
      :latitude="latitude"
      :longitude="longitude"
      :controls="controls"
      @regionchange="mapChange"
    ></map>

    <!-- #ifndef APP-PLUS -->
    <cover-image
      v-bind:style="{ left: controlsLeft + 'px', top: controlsTop + 'px' }"
      class="controls-location"
      :src="positionIcon"
    ></cover-image>
    <!-- #endif -->

    <view class="map-tools">
      <view class="my-location" @tap="toMyLocation">
        <image class="left" :src="myPositionIcon" mode=""></image>
        <view class="right">
          <text class="title">我的位置</text>
          <text class="text">{{ myAddress }}</text>
        </view>
      </view>

      <view class="start-place">
        <view class="place">
          <text class="title">{{ tipText }}：</text>
          <text class="text">{{ addressObj.address }}</text>
        </view>
        <view class="tip">{{ descText }}</view>
        <button @tap="submitAdress" class="sure" type="primary">确认选择</button>
      </view>
    </view>
  </view>
</template>

<script>
import wx from '@/wxJsSDK/index.js';
const app = getApp();
var QQMapWX = require('./qqmap-wx-jssdk.min.js');
var qqmapsdk = new QQMapWX({
  key: 'LXCBZ-NNIKD-UZ64F-H6AFI-UNJLH-OCFGE'
});
export default {
  props: {
    tipText: {
      type: String,
      default: '选择位置'
    },
    descText: {
      type: String,
      default: '使用当前定位或在地图上标记位置'
    },
    positionIcon: {
      type: String,
      default: 'https://s2.ax1x.com/2020/03/10/8CvKmt.png'
    },
    myPositionIcon: {
      type: String,
      // default: '/static/mi-map/position2.png',
      default: 'https://s2.ax1x.com/2020/03/10/8CjxSJ.png'
    }
  },
  data() {
    return {
      mapH: 0, // 地图高度，可在initMapH()中设置高度
      mapW: 0, // 屏幕宽度
      longitude: 0, // 初始经度
      latitude: 0, // 初始纬度
      myAddress: '', // 初始地址信息
      addressObj: {
        // 地图选点信息
        longitude: '',
        latitude: '',
        address: '请选择集合地点'
      },

      // cover-image的默认 超出屏幕外 不然会有闪烁出现
      controlsLeft: 1000,
      controlsTop: 1000,
      controls: [] // 地图中心点图标, 可更换iconPath, 详情见官方文档关于map组件的介绍
    };
  },
  mounted() {
    // 微信jssdk初始化
    wx.initJssdk();

    // 获取当前坐标
    this.getLocation();

    // 稍微延迟一下
    setTimeout(() => {
      // 初始化地图尺寸
      this.initMapH();
      // 初始化图标
      this.initPositionIcon();
    }, 100);
  },
  methods: {
    // 初始化地图中心位置的定位图片
    initPositionIcon() {
      setTimeout(() => {
        // H5 微信小程序 使用<cover-image>
        // #ifndef APP-PLUS
        this.controlsLeft = this.mapW / 2 - 10;
        this.controlsTop = this.mapH / 2;
        // #endif

        // App使用map的controls
        // #ifdef APP-PLUS
        var controls = {
          id: '1',
          iconPath: this.positionIcon,
          position: {
            left: this.mapW / 2 - 10,
            top: this.mapH / 2 - 100,
            width: 30,
            height: 30
          },
          clickable: false
        };
        this.controls.push(controls);
        console.log(this.controls, '==========');
        // #endif
      }, 100);
    },

    // 查询现在的位置
    getLocation() {
      let this_ = this;
      // // 定位不准,
      // uni.getLocation({
      //   // type: 'gcj02', // 返回国测局坐标
      //   success: function(res) {
      //     // this_.initMap(res);
      //   },
      //   fail: function(e) {
      //     console.log(e);
      //     uni.showToast({
      //       icon: 'none',
      //       title: '获取地址失败, 请检查是否开启定位权限~~'
      //     });
      //   }
      // });

      // 使用微信 js Sdk
      wx.getLocation(res => {
        this_.initMap(res);
      });
    },

    // 初始化我的位置
    async initMap(res) {
      this.longitude = res.longitude;
      this.latitude = res.latitude;

      // 地图回到当前定位
      uni.createMapContext('map', this).moveToLocation({
        longitude: res.longitude,
        latitude: res.latitude
      });

      // 根据坐标获取详细地址
      this.myAddress = await this.getAddressName(res);

      this.addressObj = Object.assign({}, this.addressObj, {
        longitude: res.longitude,
        latitude: res.latitude,
        address: this.myAddress
      });
    },

    // 地图选择位置后 查询地点名称
    async checkMap(res) {
      this.addressObj = Object.assign({}, this.addressObj, {
        longitude: res.longitude,
        latitude: res.latitude,
        address: await this.getAddressName(res)
      });
      console.log('当前位置:' + res.latitude + '|' + res.longitude);
    },

    // 监听地图位置变化
    mapChange(e) {
      let that = this;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (e.type == 'regionchange' || e.type == 'end') {
          that.mapCtx = uni.createMapContext('map', this);
          that.mapCtx.getCenterLocation({
            success: res => {
              this.checkMap(res);
              console.log(res);
            },
            fail: err => {
              console.log(err);
            }
          });
        }
      }, 200);
    },

    // 查询地图中心点的名称
    getAddressName(addressObj) {
      return new Promise(res => {
        // #ifdef APP-PLUS
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: addressObj.latitude,
            longitude: addressObj.longitude
          },
          get_poi: 1,
          poi_options: 'page_size=1;page_index=1',
          output: 'jsonp',
          success: e => {
            res(e.result.formatted_addresses.recommend);
          },
          fail: err => {
            res(err);
          }
        });
        // #endif

        // #ifdef H5
        // ======================== jsonp跨域 ========================
        const KEY = 'F5NBZ-HL6KZ-EFBXM-Z2B6X-DKW75-CXBFC';
        let locationObj = addressObj.latitude + ',' + addressObj.longitude;
        let url =
          'https://apis.map.qq.com/ws/geocoder/v1?get_poi=1&output=jsonp&poi_options=page_size=1;page_index=1';
        this.$jsonp(url, {
          key: KEY,
          location: locationObj
        })
          .then(e => {
            res(e.result.address);
          })
          .catch(err => {
            res(err);
          });
        // #endif

        // #ifdef MP-WEIXIN
        console.log(addressObj, '======================');
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: addressObj.latitude,
            longitude: addressObj.longitude
          },
          get_poi: 1,
          poi_options: 'page_size=1;page_index=1',
          output: 'jsonp',
          success: e => {
            res(e.result.formatted_addresses.recommend);
          },
          fail: err => {
            res(err);
          }
        });
        // #endif
      });
    },

    // 计算地图的高度
    initMapH() {
      this.mapW = uni.getSystemInfoSync().windowWidth;

      // #ifndef APP-PLUS
      this.mapH = uni.getSystemInfoSync().windowHeight - 170;
      // #endif

      // #ifdef MP-WEIXIN
      this.mapH = uni.getSystemInfoSync().windowHeight - 210;
      // #endif

      // #ifdef H5
      this.mapH = uni.getSystemInfoSync().windowHeight - 210;
      // #endif
    },

    // 移动到我的位置
    toMyLocation() {
      this.getLocation();
    },

    // 提交
    submitAdress() {
      this.controls = [];
      setTimeout(() => {
        this.$emit('updateAddress', this.addressObj);
      }, 100);
    }
  }
};
</script>

<style lang="scss" scoped>
.controls-location {
  height: 30px;
  width: 30px;
  position: absolute;
}
.server-place {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  background: #ffffff;
  z-index: 999;
  .map-tools {
    position: fixed;
    width: 100%;
    bottom: 30rpx;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .my-location {
      width: 90%;
      margin: 0 auto;
      height: 120rpx;
      box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.2);
      background: #fff;
      border-radius: 20rpx;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      overflow: hidden;
      .left {
        background: #3384ff;
        // flex: 20%;
        width: 120rpx;
        height: 100%;
      }
      .right {
        margin-left: 20rpx;
        color: #111;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        .title {
          font-size: 28rpx;
          font-weight: bold;
        }
        .text {
          font-size: 26rpx;
          width: 500rpx;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #3384ff;
          margin-top: 10rpx;
        }
      }
    }

    .start-place {
      width: 85%;
      margin: 0 auto;
      margin: 0 auto;
      margin-top: 20rpx;
      box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.2);
      background: #fff;
      border-radius: 20rpx;
      padding: 20rpx;
      .place {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .title {
          font-size: 28rpx;
          font-weight: bold;
          color: #111;
        }
        .text {
          font-size: 28rpx;
          color: #3384ff;
          font-weight: bold;
          width: 450rpx;
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .tip {
        font-size: 22rpx;
        color: #666;
        margin-top: 15rpx;
      }
      .sure {
        margin-top: 15rpx;
        color: #ffffff;
        background: #212121;
        font-weight: blod;
        font-size: 32rpx;
      }
    }
  }
}
</style>
