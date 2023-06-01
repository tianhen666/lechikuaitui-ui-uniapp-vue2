<template>
  <view class="guide" v-if="showGuide" @touchmove.stop.prevent>
    <view :style="guideStyle" class="guide-box">
      <view class="tips guide-step-tips" :style="tipPosition">
        <view class="text">{{ guideInfo.tips }}</view>
        <view class="tool-btn">
          <text @click="skip">跳过</text>
          <view class="next" style="" @click="next">{{ guideInfo.next }}</view>
        </view>
      </view>
      <view class="arrow" :style="arrowTop"></view>
    </view>
    <!-- 遮罩层，防止点击 -->
    <view class="v-model"></view>
  </view>
</template>

<script>
export default {
  name: 'xky-guideStep',
  props: {
    step: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      stepName: 'step', //该提示步骤的名称，用于不在重复展示
      guideList: [
        {
          el: '',
          tips: '',
          next: '',
          style: ''
        }
      ],
      index: 0, // 当前展示的索引
      showGuide: false, // 是否显示引导
      guideStyle: '', // 默认样式
      arrowTop: '', //步骤提示三角形的定位
      tipPosition: '', //步骤提示的定位
      systemInfo: '', //屏幕宽度高度等信息
      tipWidth: 200 //步骤提示默认的宽度
    };
  },
  computed: {
    guideInfo() {
      let obj = this.guideList[this.index];
      // 如果有next属性的话，就要加按钮文字，为了兼容旧版本
      if (!obj.hasOwnProperty('next')) {
        // 如果guidlist的长度大于索引的话，就展示下一步，否则就展示完成
        if (this.guideList.length - 1 > this.index) {
          obj.next = '下一步';
        } else {
          obj.next = '完成';
        }
      }
      return obj;
    }
  },
  mounted() {
    this.guideList = this.step.guideList;
    this.stepName = this.step.name;
    const systemInfo = uni.getSystemInfoSync();
    this.systemInfo = systemInfo;
  },
  methods: {
    // 展示新手提示
    viewTips(data, scrollTop) {
      if (data) {
        // 如果dom宽度大于或者等于窗口宽度,需要重新调整dom展示宽度
        let newWidth = this.systemInfo.windowWidth - 20;
        if (data.width >= newWidth) {
          data.width = newWidth;
        }
        // 如果距离左边为0,自动增加一点左边距
        if (data.left == 0) {
          data.left = 10;
        }
        let domRW = this.systemInfo.windowWidth - data.left;
        let left = 0;
        // 如果dom距离右边没有tips的宽度大的话,就要让tips向左便宜
        if (domRW < this.tipWidth) {
          left = domRW - this.tipWidth - 30;
        }
        const index = this.index;
        // 步骤条展示的高度需要加上屏幕滚动的高度
        data.top += scrollTop;
        let obj = Object.assign(this.guideList[index], data);
        // 设置三角形高度
        let arrowTop = data.height + 9;
        //如果dom在屏幕底部的话，重新调整提示框和三角形的定位
        let newHeight = this.systemInfo.windowHeight - data.bottom;
        uni
          .createSelectorQuery()
          .in(this.$root)
          .select('.tips')
          .boundingClientRect(res => {
            if (newHeight > res.height + 5) {
              this.arrowTop = 'top:' + arrowTop + 'px;';
              // 设置提示框定位
              this.tipPosition =
                'top:' +
                (arrowTop + 5) +
                'px;left:' +
                left +
                'px;background: linear-gradient(180deg, #1cbbb4, #0081ff);';
            } else {
              this.arrowTop = 'top: -19px;';
              // 设置提示框定位
              this.tipPosition =
                'top: -14px;left:' +
                left +
                'px;transform: translateY(-100%);background: linear-gradient(0deg, #1cbbb4, #0081ff);';
            }
          })
          .exec();
        // 重新设置guideList的值
        this.guideList.splice(index, 1, obj);
        this.guideStyle = this.getStyle();
      } else {
        this.index += 1;
        this.getDomInfo();
      }
    },
    // 获取步骤提示的主要样式
    getStyle() {
      const { width, height, left, top, style = 'border-radius: 8rpx;margin: 0' } = this.guideInfo;
      let newstyle = 'width:' + width + 'px;';
      newstyle += 'height:' + height + 'px;';
      newstyle += 'left:' + left + 'px;';
      newstyle += 'top:' + top + 'px;';
      newstyle +=
        'box-shadow: rgb(33 33 33 / 80%) 0px 0px 0px 0px, rgb(33 33 33 / 50%) 0px 0px 0px 5000px;';
      newstyle += style;
      return newstyle;
    },
    // 获取dom信息
    getDomInfo() {
      this.showGuide = true;
      const { el } = this.guideInfo;
      const query = uni.createSelectorQuery().in(this.$root);
      this.$nextTick(function() {
        query.select(el).boundingClientRect();
        query.selectViewport().scrollOffset();
        var _this = this;
        query.exec(function(res) {
          // console.log('打印dom的元素的信息', JSON.stringify(res));
          let data = res[0]; // #the-id节点的上边界坐标
          let scrollTop = res[1].scrollTop; // 显示区域的竖直滚动位置

          // 滚动到合适的位置
          uni.pageScrollTo({
            scrollTop: scrollTop + data.top - 500,
            success: success => {
              _this.viewTips(data, scrollTop);
            }
          });
        });
      });
    },
    // 跳过新手提示
    skip() {
      this.showGuide = false;
      this.index = 0;
      this.guideStyle = this.getStyle();
    },
    // 下一步
    next() {
      if (this.index === this.guideList.length - 1) {
        this.showGuide = false;
        this.index = 0;
        this.guideStyle = this.getStyle();
      } else {
        this.index += 1;
        this.getDomInfo();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.v-model {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}

.guide {
  z-index: 1001;

  .guide-box {
    position: absolute;
    z-index: 10001;
    transition: all 0.2s;

    &::before {
      content: '';
      height: 100%;
      width: 100%;
      border: 1px dashed #fff;
      border-radius: 8rpx;
      position: absolute;
      top: -8rpx;
      left: -8rpx;
      padding: 7rpx;
    }

    .arrow {
      height: 20rpx;
      width: 20rpx;
      background: #1cbbb4;
      position: absolute;
      top: 144rpx;
      left: 45%;
      z-index: 10000;
      transform: rotate(45deg);
    }

    .tips {
      width: 400rpx;
      box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.1);
      color: #fff;
      position: absolute;
      top: 152rpx;
      left: -50%;
      z-index: 10001;
      padding: 15rpx 20rpx;
      font-size: 28rpx;
      border-radius: 12rpx;
      text-align: justify;

      .text {
      }

      .tool-btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 0rpx;
        margin-top: 20rpx;

        .next {
          background: #fff;
          height: 48rpx;
          width: 100rpx;
          text-align: center;
          border-radius: 8rpx;
          color: #666;
          line-height: 48rpx;
          font-size: 24rpx;
        }
      }
    }
  }
}
</style>
