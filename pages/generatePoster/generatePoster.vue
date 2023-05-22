<template>
  <view class="container">
    <view class="optionBox">
      <scroll-view style="white-space: nowrap;" scroll-x="true">
        <template v-for="(item, index) in option">
          <view class="optionItem" :class="{ currentItem: item.isChoose }" @tap.stop="btnTap(item)">
            <text>{{ item.name }}</text>
          </view>
        </template>
      </scroll-view>
    </view>

    <view class="diyPoster">
      <m-poster-diy
        :posterData="posterData"
        @changeIndex="changeIndex"
        @setPopup="setPopup"
        @del="toRemoveASingle"
        :movableViewIndex="movableViewIndex"
      ></m-poster-diy>
      <l-painter hidden :pixelRatio="3" :board="posterData" ref="painter"></l-painter>
    </view>

    <!-- 颜色选择器 -->
    <t-color-picker
      ref="colorPicker"
      @confirm="getPickerColor"
      :color="{ r: 255, g: 255, b: 255, a: 0 }"
    ></t-color-picker>

    <!-- 底部按钮 -->
    <view class="diyBtn">
      <view class="warpper">
        <view class="btn_box">
          <button class="btn" @tap.stop="posterEmpty">清空</button>
          <button class="btn s2" @tap.sotp="posterReset">重置海报</button>
          <button class="btn s1" @tap.stop="generateAPoster">生成海报</button>
        </view>
      </view>
    </view>
    <!-- 设置弹窗 -->
    <uni-popup ref="popupOptin" :safe-area="false" type="bottom">
      <view class="popupBox">
        <view class="popupItem">
          <text class="title">文字大小:</text>
          <view style="flex: auto;">
            <slider
              @change="fontChange"
              style="margin: 0;"
              block-size="16"
              show-value
              :max="60"
              :min="18"
              :value="currFontSize"
              step="1"
            />
          </view>
        </view>
        <view class="popupItem">
          <text class="title">文字颜色:</text>
          <view
            style="width: 40px;height: 40rpx;border-radius: 5px;border: 1px solid #bbb;"
            :style="{ background: currFontColor }"
            @tap.stop="seletColor"
          ></view>
        </view>
      </view>
    </uni-popup>

    <!-- 生成海报 -->
    <uni-popup type="center" ref="popupSavePoster">
      <view style="width: 500rpx;position: relative;">
        <view class="close" @tap.stop="posterClose">
          <image class="img" src="/static/images/empty/close.png"></image>
        </view>
        <view
          class="imgBox"
          style="padding:15rpx;border-radius: 10rpx;overflow: hidden;background-color: #fff;"
        >
          <image style="width: 100%;display: block;" mode="widthFix" :src="path"></image>
        </view>

        <text
          style="text-align: center;color: #fff;display: block;margin-top: 20rpx;font-size: 26rpx;"
        >
          长按图片,保存海报
        </text>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import { mapState } from 'vuex';
import { guid } from '@/utils/index.js';
import { getSourceMaterialId } from '@/api/materialLibrary.js';
export default {
  data() {
    return {
      posterData: {
        css: {
          height: '500rpx',
          width: '750rpx',
          backgroundImage: ''
        },
        views: []
      }, // 生成海报的json信息
      posterObj: {}, //返回的素材信息
      initialData: [1, 6, 3, 5, 8], // 初始值
      option: [
        { key: 1, name: '昵称', isChoose: false },
        { key: 2, name: '门诊名称', isChoose: false },
        { key: 3, name: '电话', isChoose: false },
        { key: 4, name: '签名', isChoose: false },
        { key: 5, name: '职位', isChoose: false },
        { key: 6, name: '地址', isChoose: false },
        { key: 7, name: '门诊logo', isChoose: false },
        { key: 8, name: '个人二维码', isChoose: false }
      ],

      path: '', // 生成的海报地址
      movableViewIndex: '', // 当前选择的索引
      currFontSize: 0, // 当前字体大小,
      currFontColor: '#fff'
    };
  },
  mounted() {
    this.$nextTick(() => {
      // 初始化
      setTimeout(() => {
        this.posterInitial();
      }, 100);
    });
  },
  computed: {
    ...mapState({
      tenantInfo: state => state.tenant.info,
      userInfo: state => state.user.userInfo
    })
  },
  onLoad({ id }) {
    getSourceMaterialId({ id }).then(res => {
      this.posterObj = res.data;
      uni.getImageInfo({
        src: this.posterObj.content,
        success: image => {
          this.posterData.css.backgroundImage = `url(${this.posterObj.content})`;
          this.posterData.css.height =
            (image.height * uni.upx2px(750)) / image.width / (uni.upx2px(100) / 100) + 'rpx';
        }
      });
    });
  },
  methods: {
    /*设置文字大小*/
    fontChange(event) {
      const { value } = event.detail;
      const item = this.posterData.views[this.movableViewIndex].css;
      this.$set(item, 'fontSize', `${value}rpx`);
    },
    /* 获取颜色选择回调 */
    getPickerColor(color) {
      const item = this.posterData.views[this.movableViewIndex].css;
      this.currFontColor = color.hex;
      this.$set(item, 'color', `${color.hex}`);
    },
    // 设置颜色弹窗
    seletColor() {
      this.$refs.colorPicker.open();
    },
    // 设置弹窗打开
    setPopup() {
      const item = this.posterData.views[this.movableViewIndex];

      if (item.type === 'text') {
        this.currFontSize = parseInt(item.css.fontSize || 0);
        this.currFontColor = item.css.color;
        this.$refs.popupOptin.open();
      }
    },
    // 删除元素
    toRemoveASingle() {
      const index = this.option.findIndex(
        sub => sub.key === this.posterData.views[this.movableViewIndex].key
      );
      this.option[index].isChoose = false;
      this.posterData.views.splice(this.movableViewIndex, 1);
      this.movableViewIndex = '';
    },
    // 生成海报需要添加的信息
    btnTap(item) {
      // 如果选择了取消,没有选择则选择上
      item.isChoose = !item.isChoose;

      if (item.isChoose) {
        // 昵称
        if (item.key === 1) {
          let texts = this.userInfo.nickname || this.userInfo.snickName;
          if (this.option[4].isChoose) {
            texts += '| 咨询顾问';
          }

          this.posterData.views.push({
            key: item.key,
            type: 'text',
            text: texts,
            css: {
              color: '#333',
              position: 'absolute',
              bottom: '140rpx',
              fontSize: '28rpx',
              width: '300rpx',
              height: '44rpx',
              left: '50rpx'
            }
          });
        }

        // 门诊名称
        if (item.key === 2) {
          this.posterData.views.push({
            key: item.key,
            type: 'text',
            text: this.tenantInfo.name,
            css: {
              color: '#333',
              position: 'absolute',
              with: '300rpx',
              height: '44rpx',
              top: '80rpx',
              fontSize: '28rpx',
              left: '150rpx'
            }
          });
        }

        // 电话
        if (item.key === 3) {
          this.posterData.views.push({
            key: item.key,
            type: 'text',
            text: `咨询电话: ${this.userInfo.mobile || this.tenantInfo.contactMobile}`,
            css: {
              color: '#333',
              position: 'absolute',
              width: '360rpx',
              height: '44rpx',
              bottom: '92rpx',
              fontSize: '28rpx',
              left: '50rpx'
            }
          });
        }

        // 签名
        if (item.key === 4) {
          this.posterData.views.push({
            key: item.key,
            type: 'text',
            text: this.userInfo.slogan || this.tenantInfo.slogan,
            css: {
              position: 'absolute',
              top: '60rpx',
              width: '300rpx',
              height: '44rpx',
              fontSize: '28rpx',
              right: '50rpx',
              color: '#333'
            }
          });
        }

        // 职位
        if (item.key === 5) {
          const index = this.posterData.views.findIndex(sub => sub.key === 1);
          if (index < 0) {
            this.btnTap(this.option[0]);
            return;
          }
          this.posterData.views[index].text += ` | ${this.userInfo.postName}`;
        }

        // 地址
        if (item.key === 6) {
          this.posterData.views.push({
            key: item.key,
            type: 'text',
            text: `地址: ${this.tenantInfo.address}`,
            css: {
              color: '#333',
              width: '450rpx',
              height: '44rpx',
              position: 'absolute',
              bottom: '44rpx',
              fontSize: '28rpx',
              left: '50rpx'
            }
          });
        }

        // 门诊logo
        if (item.key === 7) {
          this.posterData.views.push({
            key: item.key,
            type: 'image',
            src: this.tenantInfo.tenantLog,
            css: {
              width: '80rpx',
              height: '80rpx',
              position: 'absolute',
              top: '50rpx',
              left: '50rpx',
              objectFit: 'contain'
            }
          });
        }

        // 个人二维码
        if (item.key === 8) {
          this.posterData.views.push({
            key: item.key,
            type: 'image',
            src: this.userInfo.wechatCode,
            css: {
              width: '200rpx',
              height: '200rpx',
              position: 'absolute',
              bottom: '20rpx',
              right: '20rpx',
              objectFit: 'contain'
            }
          });
        }
      } else {
        if (item.key === 5) {
          const index = this.posterData.views.findIndex(sub => sub.key === 1);
          this.posterData.views[index].text = this.userInfo.nickname || this.userInfo.snickName;
          return;
        }

        const index = this.posterData.views.findIndex(sub => sub.key === item.key);
        if (index >= 0) {
          this.posterData.views.splice(index, 1);
        }
      }
    },
    generateAPoster() {
      // 绘制海报
      this.$refs.painter.render(this.posterData);
      uni.showLoading({
        title: '海报绘制中'
      });
      // 生成图片
      this.$refs.painter.canvasToTempFilePathSync({
        fileType: 'jpg',
        pathType: 'base64',
        quality: 1,
        success: res => {
          uni.hideLoading();
          this.$refs.popupSavePoster.open();
          this.path = res.tempFilePath;
        }
      });
    },
    // 海报内容初始化
    posterInitial() {
      this.initialData.forEach(item => {
        const index = this.option.findIndex(sub => sub.key === item);
        this.btnTap(this.option[index]);
      });
    },
    // 重置海报
    posterReset() {
      this.posterEmpty();
      this.posterInitial();
      this.changeIndex('');
    },
    // 清空海报
    posterEmpty() {
      this.option.forEach(item => {
        item.isChoose = false;
      });
      this.$set(this.posterData, 'views', []);
      this.changeIndex('');
    },
    // 关闭海报弹窗
    posterClose() {
      this.$refs.popupSavePoster.close();
    },
    // 设置当前选中索引
    changeIndex(index) {
      this.movableViewIndex = index;
    }
  }
};
</script>

<style lang="scss">
.container {
  .optionBox {
    padding: 20rpx 0;
    background-color: #444;

    .optionItem {
      display: inline-block;
      font-size: 25rpx;
      margin: 0 10rpx;
      background-color: #eee;
      color: #666;
      border-radius: 10rpx;
      padding: 5rpx 16rpx;
    }

    .currentItem {
      background-color: $main-color;
      color: #fff;
    }
  }

  .diyPoster {
  }

  .diyBtn {
    height: 80rpx;

    > .warpper {
      position: fixed;
      bottom: 0;
      background-color: #fff;
      width: 100%;

      .btn_box {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        > .btn {
          font-size: 28rpx;
          height: 80rpx;
          line-height: 70rpx;
          width: 33.3%;
          border-radius: 0;
          background-color: #fff;
          &:after {
            border-radius: 0;
          }
        }
        > .s1 {
          background-color: $main-color;
          color: #fff;
          &:after {
            border: 0;
          }
        }
        > .s2 {
          &:after {
            border-left: 0;
          }
        }
      }
    }
  }
}

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

.popupBox {
  background-color: #fff;
  padding: 40rpx 30rpx;
  box-sizing: border-box;
  .popupItem {
    display: flex;
    align-items: center;
    margin-bottom: 30rpx;
    &:last-of-type {
      margin-bottom: 0;
    }
    .title {
      color: #666;
      font-size: 28rpx;
      padding-right: 20rpx;
    }
  }
}
</style>
