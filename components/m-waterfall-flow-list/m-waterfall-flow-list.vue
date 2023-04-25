<template>
  <view class="box">
    <pp-waterfall-flow
      :value="dataList"
      :columns="3"
      image-key="cover_image"
      :char-size="68"
      :itemBR="6"
      :list-type="listType"
      imageBR="0 0 6rpx 6rpx"
      @clickItem="itemClicK"
      @clickImage="itemClicK"
    ></pp-waterfall-flow>
  </view>
</template>

<script>
export default {
  name: 'm-post-list',
  emits: ['tapItem'],
  props: {
    listType: {
      type: [String],
      default: 'img'
    },
    dataList: {
      type: Array,
      default: () => [
        {
          name: '名称名称名称名称名称名称名称名称',
          cover_image:
            'http://rti7xphf4.hb-bkt.clouddn.com/postImg/WechatIMG5924.jpeg?imageView2/3/w/240/h/315/q/75',
          desc: '描述文字1'
        },
        {
          name: '名称名称名称名称名称名称名称名称',
          cover_image: 'http://rti7xphf4.hb-bkt.clouddn.com/postImg/WechatIMG5925.jpeg',
          desc: '描述文字1'
        },
        {
          name: '名称名称名称名称名称名称名称名称',
          cover_image:
            'http://rti7xphf4.hb-bkt.clouddn.com/postImg/WechatIMG5924.jpeg?imageView2/3/w/240/h/315/q/75',
          desc: '描述文字1'
        },
        {
          name: '名称名称名称名称名称名称名称名称',
          cover_image:
            'http://rti7xphf4.hb-bkt.clouddn.com/postImg/WechatIMG5924.jpeg?imageView2/3/w/240/h/315/q/75',
          desc: '描述文字1'
        },
        {
          name: '名称名称名称名称名称名称名称名称',
          cover_image: 'http://rti7xphf4.hb-bkt.clouddn.com/postImg/WechatIMG5925.jpeg',
          desc: '描述文字1'
        },
        {
          name: '名称名称名称名称名称名称名称名称',
          cover_image:
            'http://rti7xphf4.hb-bkt.clouddn.com/postImg/WechatIMG5924.jpeg?imageView2/3/w/240/h/315/q/75',
          desc: '描述文字1'
        }
      ]
    }
  },
  data() {
    return {};
  },
  methods: {
    itemClicK(index) {
      this.$emit('tapItem', this.dataList[index]);
    }
  }
};
</script>

<style lang="scss" scoped></style>
