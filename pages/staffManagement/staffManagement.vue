<template>
  <view class="myBox">
    <!-- <view class="tabs"><me-tabs v-model="tabIndex" :tabs="tabs"></me-tabs></view> -->

    <view class="itemBox">
      <view class="item" v-for="(item, index) in userList" :key="item.id">
        <view class="center">
          <view class="imgBox"><u-avatar :src="item.avatar || item.savatar"></u-avatar></view>

          <view class="info">
            <view class="name">
              <text class="namec">{{ item.nickname || item.snickName }}</text>
              <text class="role">{{ item.roleName }}</text>
            </view>
            <view class="position">
              <text class="positionc">职位：</text>
              <text>{{ item.postName }}</text>
            </view>
            <view class="position">
              <text class="positionc">注册时间：</text>
              <text>{{ mDayjs(item.createTime) }}</text>
            </view>
          </view>
        </view>
        <view class="me" v-if="userInfo.id === item.id">我</view>
      </view>
    </view>

    <view class="bottom-fixed">
      <button class="btn" @tap.stop="generateQRCode">邀请员工</button>
    </view>

    <u-popup :show="mShow" @close="mShow = false" mode="center" closeable round="10rpx">
      <view class="popupBox">
        <view class="title">{{ tenantInfo.name }}</view>
        <view class="desc">邀请同事一起使用口腔推</view>
        <uqrcode
          ref="uqrcode"
          canvas-id="qrcode"
          size="160"
          fileType="jpg"
          auto
          style="margin: auto;"
          :value="urlValue"
          :options="{ margin: 10 }"
          @complete="qrComplete"
          v-if="!codePath"
        ></uqrcode>
        <image
          v-else
          style="width: 160px;height: 160px;display: block;margin: auto;"
          :src="codePath"
        ></image>
        <view class="tips">请长按二维码,保存到手机</view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { getUserList } from '@/api/materialLibrary.js';
import dayjs from 'dayjs';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      tabs: [{ name: '员工管理' }, { name: '席位管理' }],
      tabIndex: 0, // 当前菜单下标

      userList: [],

      mShow: false,
      urlValue: '',
      codePath: ''
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      tenantInfo: state => state.tenant.info
    })
  },
  async onShow() {
    // 等待onLaunch执行完成
    await this.$onLaunched;

    this.mGetUserList();
  },
  methods: {
    async mGetUserList() {
      // 获取员工列表
      const res = await getUserList();
      this.userList = res.data;
    },
    mDayjs(val) {
      // 时间处理
      return dayjs(val).format('YYYY-MM-DD HH:ss:mm');
    },
    generateQRCode() {
      // 生成邀请二维码
      const protocol = window.location.protocol;
      const hostname = window.location.hostname;
      const newHref = `${protocol}//${hostname}/pages/inviteEmployees/inviteEmployees?tenantId=${
        this.tenantInfo.id
      }`;
      this.urlValue = newHref;
      // 生成二维码
      this.mShow = true;
    },
    qrComplete() {
      // 二维码生成完成
      this.$refs.uqrcode.toTempFilePath({
        success: res => {
          this.codePath = res.tempFilePath;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.tabs {
  /deep/ .me-tabs {
    height: 44px !important;
    line-height: 44px !important;
    border: none;
    background-color: #fff;
  }

  /deep/ .me-tabs .tab-item {
    padding: 0;
    height: 44px !important;
    line-height: 44px !important;
    font-size: 28rpx;
    font-weight: 600;
    font-family: PingFangSC-Semibold, PingFang SC;
  }
  /deep/ .me-tabs .tabs-item {
    padding-bottom: 0;
    transition: all 0.3s;
  }
  /deep/ .me-tabs .active {
    font-size: 30rpx !important;
    color: $main-color !important;
  }
  /deep/ .me-tabs .tabs-line {
    width: 22px;
    bottom: 3px;
    background-color: transparent;
    height: 6px;
    &:after {
      position: absolute;
      width: 100%;
      height: 100%;
      content: '';
      display: block;
      background-image: url('@/static/images/myimg/sicon.png');
      background-size: 100% auto;
      background-repeat: no-repeat;
    }
  }
}

.itemBox {
  overflow: hidden;
  .item {
    background-color: #fff;
    margin: 20rpx 20rpx;
    border-radius: 10rpx;
    padding: 0 20rpx;
    position: relative;

    .me {
      color: #fff;
      background-color: $main-color;
      position: absolute;
      top: 30rpx;
      right: 40rpx;
      font-size: 20rpx;
      padding: 3rpx 20rpx;
      border-radius: 50px;
    }
    .center {
      display: flex;
      align-items: center;
      padding: 30rpx 0;
      .imgBox {
        margin-right: 30rpx;
        flex: none;
      }
      .info {
        flex: 1;
        .name {
          display: flex;
          align-items: center;
          .namec {
            font-weight: bold;
            font-size: 28rpx;
            color: #333;
            margin-right: 20rpx;
          }
          .role {
            color: #c94950;
            border-radius: 50px;
            border: 1px solid #c94950;
            font-size: 10px;
            line-height: 1.6;
            text-align: center;
            padding: 0 14rpx;
          }
        }
        .position {
          margin-top: 10rpx;
          font-size: 25rpx;
          color: #999;
        }
      }
    }
  }
}
.bottom-fixed {
  z-index: 996;
  position: fixed;
  bottom: 30rpx;
  width: 100%;
  box-sizing: border-box;
  padding: 0 30rpx;
  .btn {
    color: #fff;
    background-color: $main-color;
    font-size: 28rpx;
    line-height: 2.7;
  }
}

.popupBox {
  width: 600rpx;
  text-align: center;
  .title {
    font-size: 34rpx;
    line-height: 1;
    padding: 30rpx 0;
  }
  .desc {
    margin: 20rpx 0;
    text-align: center;
    font-size: 28rpx;
  }
  .tips {
    color: #aaa;
    margin: 20rpx 0 40rpx;
    font-size: 28rpx;
  }
}
</style>
