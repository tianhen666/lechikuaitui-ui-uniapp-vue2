<template>
  <!-- 移动区域 -->
  <view class="movableArea" @tap="movableAreaTap" :style="this.posterData.css">
    <!-- 修改 -->
    <view
      v-if="movableViewIndex !== ''"
      :style="styleRendering"
      class="tip"
      @tap.prevent.stop="edit"
    >
      点击修改
    </view>
    <!-- 删除 -->
    <!-- <view
      v-if="movableViewIndex !== ''"
      :style="styleRendering2"
      @tap.prevent.stop="del"
      class="del"
    >
      <image class="image" src="./images/del_1.png" mode="aspectFit" />
    </view> -->
    <!-- 缩放 -->
    <!-- <view :style="styleRendering3" v-if="movableViewIndex !== ''" class="zoom">
      <image class="image" src="./images/scale_icon.png" mode="aspectFit" />
    </view> -->

    <template v-for="(item, index) in posterData.views">
      <!-- 容器 -->
      <my-tree
        class="movableView"
        :id="`key${item.key}`"
        @touchstart.prevent.stop="handleTouchStart($event, item, index)"
        @touchmove.prevent.stop="
          movableViewIndex === index ? handleTouchMove($event, item, index) : ''
        "
        @touchend.prevent.stop="
          movableViewIndex === index ? handleTouchEnd($event, item, index) : ''
        "
        v-if="item.type === 'view' && item.views"
        :treeData="item.views"
      ></my-tree>

      <!-- 文本 -->
      <text
        class="movableView"
        :id="`key${item.key}`"
        @touchstart.prevent.stop="handleTouchStart($event, item, index)"
        @touchmove.prevent.stop="
          movableViewIndex === index ? handleTouchMove($event, item, index) : ''
        "
        @touchend.prevent.stop="
          movableViewIndex === index ? handleTouchEnd($event, item, index) : ''
        "
        v-if="item.type === 'text'"
        :style="item.css"
      >
        {{ item.text }}
      </text>

      <!-- 图片 -->
      <image
        class="movableView"
        :id="`key${item.key}`"
        @touchstart.prevent.stop="handleTouchStart($event, item, index)"
        @touchmove.prevent.stop="
          movableViewIndex === index ? handleTouchMove($event, item, index) : ''
        "
        @touchend.prevent.stop="
          movableViewIndex === index ? handleTouchEnd($event, item, index) : ''
        "
        v-if="item.type === 'image'"
        :style="item.css"
        :src="item.src"
        mode="aspectFit"
      ></image>

      <!-- 二维码 -->
      <uqrcode
        class="movableView"
        :id="`key${item.key}`"
        @touchstart.prevent.stop="handleTouchStart($event, item, index)"
        @touchmove.prevent.stop="
          movableViewIndex === index ? handleTouchMove($event, item, index) : ''
        "
        @touchend.prevent.stop="
          movableViewIndex === index ? handleTouchEnd($event, item, index) : ''
        "
        v-if="item.type === 'qrcode'"
        :canvasId="'qrcode' + index"
        :value="item.text"
        :options="{ margin: 10 }"
      ></uqrcode>
    </template>
  </view>
</template>

<script>
import myTree from './my-tree.vue';
export default {
  emits: ['changeIndex'],
  components: { myTree },
  props: {
    posterData: Object,
    movableViewIndex: [Number, String]
  },
  data() {
    return {
      query: null,
      initialX: 0,
      initialY: 0,
      movableViewObj: {}
    };
  },
  computed: {
    styleRendering() {
      if (this.movableViewIndex === '') {
        return '';
      }
      let styleStr = `width:${this.movableViewObj.width}px;`;
      if (this.posterData.views[this.movableViewIndex].css.top) {
        styleStr += `top:${uni.upx2px(
          parseInt(this.posterData.views[this.movableViewIndex].css.top)
        ) - 18}px;`;
      } else {
        styleStr += `bottom:${uni.upx2px(
          parseInt(this.posterData.views[this.movableViewIndex].css.bottom)
        ) + this.movableViewObj.height}px;`;
      }

      if (this.posterData.views[this.movableViewIndex].css.left) {
        styleStr += `left:${this.posterData.views[this.movableViewIndex].css.left};`;
      } else {
        styleStr += `right:${this.posterData.views[this.movableViewIndex].css.right};`;
      }

      return styleStr;
    },
    styleRendering2() {
      if (this.movableViewIndex === '') {
        return '';
      }
      let styleStr = ``;
      if (this.posterData.views[this.movableViewIndex].css.top) {
        styleStr += `top:${uni.upx2px(
          parseInt(this.posterData.views[this.movableViewIndex].css.top)
        ) - 18}px;`;
      } else {
        styleStr += `bottom:${uni.upx2px(
          parseInt(this.posterData.views[this.movableViewIndex].css.bottom)
        ) + this.movableViewObj.height}px;`;
      }

      if (this.posterData.views[this.movableViewIndex].css.left) {
        styleStr += `left:${parseInt(this.posterData.views[this.movableViewIndex].css.left) -
          40}rpx;`;
      } else {
        styleStr += `right:${uni.upx2px(
          parseInt(this.posterData.views[this.movableViewIndex].css.right)
        ) +
          this.movableViewObj.width +
          5}px;`;
      }

      return styleStr;
    },
    styleRendering3() {
      if (this.movableViewIndex === '') {
        return '';
      }
      let styleStr = ``;
      if (this.posterData.views[this.movableViewIndex].css.top) {
        styleStr += `top:${uni.upx2px(
          parseInt(this.posterData.views[this.movableViewIndex].css.top)
        ) +
          this.movableViewObj.height -
          9}px;`;
      } else {
        styleStr += `bottom:${uni.upx2px(
          parseInt(this.posterData.views[this.movableViewIndex].css.bottom)
        ) - 9}px;`;
      }

      if (this.posterData.views[this.movableViewIndex].css.left) {
        styleStr += `left:${uni.upx2px(
          parseInt(this.posterData.views[this.movableViewIndex].css.left)
        ) +
          this.movableViewObj.width -
          9}px;`;
      } else {
        styleStr += `right:${uni.upx2px(
          parseInt(this.posterData.views[this.movableViewIndex].css.right)
        ) - 9}px;`;
      }

      return styleStr;
    }
  },
  methods: {
    movableAreaTap(e) {
      //移动区域点击事件
      this.$emit('changeIndex', '');
    },
    handleTouchStart(event, item, index) {
      // 如果有多个触摸点，执行相应的操作
      if (event.touches.length > 1) {
        return;
      }
      // 设置当前滑块
      this.$emit('changeIndex', index);

      // 获取节点信息
      this.query = uni.createSelectorQuery().in(this);
      this.query.select(`.movableArea`).boundingClientRect();
      this.query.select(`#key${item.key}`).boundingClientRect();
      this.query.exec(res => {
        // 保存移动前的属性
        this.movableViewObj = JSON.parse(JSON.stringify(res[1]));
      });
      // 设置触摸点位置
      this.initialX = event.changedTouches[0].pageX;
      this.initialY = event.changedTouches[0].pageY;
    },
    handleTouchMove(e, item, index) {
      // 如果有多个触摸点，执行相应的操作
      if (event.touches.length > 1) {
        return;
      }
      if (this.query) {
        event.preventDefault();
        this.query.exec(res => {
          const currentX = event.changedTouches[0].pageX - this.initialX;
          const currentY = event.changedTouches[0].pageY - this.initialY;

          let newLeft = this.movableViewObj.left - res[0].left + currentX;
          let newTop = this.movableViewObj.top - res[0].top + currentY;
          let newRight = res[0].right - this.movableViewObj.right - currentX;
          let newBottom = res[0].bottom - this.movableViewObj.bottom - currentY;

          if (newLeft < 0) {
            newLeft = 0;
            newRight = res[0].width - this.movableViewObj.width - 3;
          }
          if (newTop < 0) {
            newTop = 0;
            newBottom = res[0].height - this.movableViewObj.height - 3;
          }
          if (newRight < 0) {
            newRight = 0;
            newLeft = res[0].width - this.movableViewObj.width - 3;
          }
          if (newBottom < 0) {
            newBottom = 1;
            newTop = res[0].height - this.movableViewObj.height - 3;
          }

          if (item.css.left !== undefined) {
            item.css.left = `${newLeft / (uni.upx2px(100) / 100)}rpx`;
          } else {
            item.css.right = `${newRight / (uni.upx2px(100) / 100)}rpx`;
          }

          if (item.css.top !== undefined) {
            item.css.top = `${newTop / (uni.upx2px(100) / 100)}rpx`;
          } else {
            item.css.bottom = `${newBottom / (uni.upx2px(100) / 100)}rpx`;
          }
        });
      }
    },
    handleTouchEnd(e, item, index) {
      this.query = null;
    },
    del() {
      this.$emit('del', this.movableViewIndex);
    }
  }
};
</script>

<style lang="scss" scoped>
/*移动区域宽度*/
$movable-area-w: 320px;
/*移动区域高度*/
$movable-area-h: 560px;
/* 操作图标大小 */
$iocn-size: 15px;

.movableArea {
  position: relative;
  width: $movable-area-w;
  height: $movable-area-h;
  background-color: #fff;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin: auto;
  transform: translateZ(1rpx);
}
.movableView {
  border: 1px dashed red;
}
.movableArea .tip {
  font-size: 10px !important;
  background-color: rgba(0, 0, 0, 0.4);
  color: #ffffff;
  position: absolute;
  padding: 4rpx 8rpx;
  border-radius: 5rpx;
  height: 36rpx !important;
  box-sizing: border-box;
  text-align: center;
}

.del,
.zoom {
  position: absolute;
  z-index: 88;
  height: $iocn-size;
  width: $iocn-size;
  > .image {
    width: 100%;
    height: 100%;
  }
}
</style>
