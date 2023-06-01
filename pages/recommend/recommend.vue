<template>
  <mescroll-body
    :up="{
      textNoMore: '没有更多了'
    }"
    :bottombar="false"
    @init="mescrollInit"
    @down="downCallback"
    @up="upCallback"
  >
    <view class="box">
      <template v-for="(item, index) in dataList">
        <m-article-style :item-data="item" v-if="item.type === 1 && item.content"></m-article-style>
        <m-picture-style :item-data="item" v-if="item.type === 3 && item.content"></m-picture-style>
        <m-video-style :item-data="item" v-if="item.type === 2 && item.content"></m-video-style>
      </template>
    </view>
  </mescroll-body>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
import { getshareEveryDay } from '@/api/materialLibrary.js';
export default {
  mixins: [MescrollMixin],
  data() {
    return {
      dataList: []
    };
  },
  methods: {
    //联网加载数据
    upCallback(page) {
      getshareEveryDay({
        pageNo: page.num,
        pageSize: page.size,
        type: 1
      })
        .then(res => {
          setTimeout(() => {
            this.mescroll.endBySize(res.data.list.length, res.data.total);
          }, 800);

          //设置列表数据
          if (page.num == 1) this.dataList.length = 0; //如果是第一页需手动制空列表
          this.dataList = this.dataList.concat(res.data.list); //追加新数据
        })
        .catch(() => {
          //联网失败, 结束加载
          this.mescroll.endErr();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  overflow: hidden;
}
page {
  background-color: #fff;
  background-image: url('@/static/images/myimg/bg.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
}
</style>
