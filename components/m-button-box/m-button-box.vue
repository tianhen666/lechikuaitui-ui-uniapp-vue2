<template>
  <view>
    <view class="btnBox">
      <scroll-view :scroll-x="true" style="white-space: nowrap;font-size: 0;">
        <view class="btnItem" v-for="item in bData" :key="item.id">
          <button class="btn" :class="{ cur: mIndexId === item.id }" @tap="btnTap(item.id)">
            {{ item.name }}
          </button>
        </view>
      </scroll-view>
      <view class="icon" @tap="open"><u-icon name="list" color="#333" size="44rpx"></u-icon></view>
    </view>

    <view
      class="openBg"
      @tap="close"
      :class="{ fade: isHide, 'fade-show': !isHide }"
      v-show="!isNone"
    >
      <view class="openContent" @tap.stop>
        <scroll-view
          class="scrolla"
          :class="{ 'scrolla-0': isHide, 'scrolla-300': !isHide }"
          :scroll-y="true"
        >
          <view class="btnItemBox_yiji" v-for="item in bData" :key="item.id">
            <view class="btnItem">
              <button class="btn" :class="{ cur: mIndexId === item.id }" @tap="btnTap(item.id)">
                {{ item.name }}
              </button>
            </view>

            <view class="btnItemBox_erji" v-if="item.childrenList && item.childrenList.length > 0">
              <view class="btnItem" v-for="subItem in item.childrenList" :key="subItem.id">
                <button
                  class="btn"
                  :class="{ cur: mIndexId === subItem.id }"
                  @tap="btnTap(subItem.id)"
                >
                  {{ subItem.name }}
                </button>
              </view>
            </view>

            <view class="btnItemBox_erji" v-else>
              <text style="font-size: 24rpx;color: #aaa;">无子分类</text>
            </view>
          </view>
        </scroll-view>

        <view class="tips"><text>上划显示更多分类</text></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'm-button-box',
  emits: ['switchClassification'],
  props: {
    bData: {
      type: Array,
      default: () => []
    },
    mIndexId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isHide: true,
      isNone: true
    };
  },
  methods: {
    btnTap(index) {
      this.$emit('switchClassification', index);
      this.close();
    },
    open() {
      this.isNone = false;
      setTimeout(() => {
        this.isHide = false;
      }, 10);
    },
    close() {
      setTimeout(() => {
        this.isNone = true;
      }, 350);
      this.isHide = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.btnBox {
  height: 50rpx;
  overflow: hidden;
  position: relative;
  padding-right: 60rpx;
  .icon {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-self: center;
  }
}

.btnItem {
  display: inline-block;
  margin: 0 10rpx 0;
  &:first-of-type {
    margin-left: 0;
  }
  &:last-of-type {
    margin-right: 0;
  }
  .btn {
    background-color: #fff;
    color: #666;
    font-size: 24rpx;
    height: 50rpx;
    line-height: 50rpx;
    padding: 0 20rpx;
    border-radius: 12rpx;
    &:after {
      border: none;
    }
  }
  .cur {
    background-color: $main-color !important;
    color: #fff !important;
  }
}

.btnItemBox_yiji {
  margin-bottom: 50rpx;
  font-size: 0;
  > .btnItem {
    display: inline-block;
    .btn {
      font-weight: bold;
      color: #333;
      background-color: #e1e1e1;
    }
  }
}
.btnItemBox_erji {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10rpx;
  > .btnItem {
    margin-top: 20rpx;
    margin-left: 0;
    .btn {
      background-color: #f1f1f1;
    }
  }
}

.openBg {
  position: fixed;
  inset: 0;
  z-index: 100;
  margin-top: 110rpx;
  .openContent {
    position: relative;
    box-sizing: border-box;
    padding: 60rpx 30rpx;
    margin: 12rpx 20rpx 0;
    background-color: #fff;
    border-radius: 10rpx;

    .tips {
      position: absolute;
      font-size: 26rpx;
      right: 20rpx;
      bottom: 20rpx;
      color: #aaa;
    }
  }
  transform: translateZ(1);
  transition: all 0.3s ease-in; /* 使用过渡属性设置渐变效果 */
}
.scrolla {
  transform: translateZ(1);
  transition: all 0.3s ease-in; /* 使用过渡属性设置渐变效果 */
}
.scrolla-0 {
  height: 0;
}
.scrolla-300 {
  height: 400px;
}

.fade {
  background: rgba(0, 0, 0, 0);
}

.fade-show {
  background: rgba(0, 0, 0, 0.4);
}
</style>
