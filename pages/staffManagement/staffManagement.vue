<template>
  <view class="myBox">
    <!-- <view class="tabs"><me-tabs v-model="tabIndex" :tabs="tabs"></me-tabs></view> -->

    <view class="itemBox">
      <view class="item" v-for="(item, index) in userList" :key="item.id">
        <view class="center">
          <view class="imgBox">
            <u-avatar size="100rpx" :src="item.avatar || item.savatar"></u-avatar>
          </view>

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
              <text class="positionc">加入门诊时间：</text>
              <text>{{ _$mDayJs(item.adminCreateTime, 3) }}</text>
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
        <view class="desc">
          <text>共有</text>
          <text class="text">{{ tenantInfo.accountCount }}个</text>
          <text>名额, 剩余</text>
          <text class="text">{{ tenantInfo.accountCount - userList.length }}个</text>
        </view>
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
      // tabs: [{ name: '员工管理' }, { name: '席位管理' }],
      // tabIndex: 0, // 当前菜单下标

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

    //获取员工列表
    this.mGetUserList();
  },
  methods: {
    /**
     * 获取当前门诊下的员工列表
     * */
    async mGetUserList() {
      const res = await getUserList();
      // 如果找到了匹配的项，则将其移到列表的第一项
      let index = res.data.findIndex(item => item.roleName === '超级管理员');
      if (index !== -1) {
        let item = res.data.splice(index, 1)[0];
        res.data.unshift(item);
      }
      this.userList = res.data;
    },
    /**
     * 生成邀请二维码按钮
     * */
    generateQRCode() {
      const protocol = window.location.protocol;
      const host = window.location.host;
      const newHref = `${protocol}//${host}/pages/inviteEmployees/inviteEmployees?invitationTenantID=${
        this.tenantInfo.id
      }&invitationID=${this.userInfo.id}`;
      this.urlValue = newHref;
      console.log(`邀请员工二维码地址:${newHref}`);
      // 生成二维码
      this.mShow = true;
    },
    /**
     * 生成邀请二维码完成回调
     * */
    qrComplete() {
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
/** tab表 样式自定义*/
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
  margin: 0 32rpx;
  padding-top: 10rpx;
  .item {
    margin: 20rpx 0;
    background-color: #fff;
    border-radius: 10rpx;
    padding: 30rpx 20rpx;
    position: relative;

    .me {
      color: #fff;
      background-color: $main-color;
      position: absolute;
      top: 10rpx;
      right: 10rpx;
      font-size: 20rpx;
      padding: 3rpx 20rpx;
      border-radius: 50px;
    }

    .center {
      display: flex;
      align-items: center;
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
            margin-right: 30rpx;
            max-width: 260rpx;
            @include overHeiddenText(1);
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
    padding: 30rpx 0;
    line-height: 1;
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }
  .desc {
    margin: 20rpx 0;
    text-align: center;
    font-size: 28rpx;
    color: #999;
    .text {
      color: $sub-color;
      font-weight: 500;
    }
  }
  .tips {
    color: #aaa;
    margin: 20rpx 0 40rpx;
    font-size: 28rpx;
  }
}
</style>
