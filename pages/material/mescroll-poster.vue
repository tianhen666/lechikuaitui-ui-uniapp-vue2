<template>
  <view class="warpper">
    <view class="boxTop">
      <view class="search">
        <u-search
          placeholder="输入关键字搜索海报"
          v-model="searchName"
          bgColor="#fff"
          :showAction="false"
          height="72rpx"
          @search="mySearch"
          @custom="mySearch"
        ></u-search>
      </view>
      <m-button-box
        v-if="classificationList.length > 0"
        :mIndexId="btnIndexId"
        :bData="classificationList"
        @switchClassification="switchClassification"
      ></m-button-box>
    </view>

    <mescroll-uni
      bottom="110px"
      @init="mescrollInit"
      :height="height"
      :bottombar="false"
      :disable-scroll="disableScroll"
      :down="downOption"
      @down="downCallback"
      :up="upOption"
      @up="upCallback"
      @emptyclick="emptyClick"
    >
      <view class="listBox">
        <pp-waterfall-flow
          :list="dataList"
          :columns="3"
          image-key="coverImage"
          :char-size="68"
          :itemBR="6"
          list-type="img"
          imageBR="0 0 6rpx 6rpx"
          @clickItem="itemClicK"
          @clickImage="itemClicK"
        ></pp-waterfall-flow>
      </view>
    </mescroll-uni>
  </view>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
import { apiGoods } from '@/api/mock.js';
import { mapState } from 'vuex';
import { getSourceMaterial, getClassIfyList } from '@/api/materialLibrary.js';

export default {
  mixins: [MescrollMixin],
  data() {
    return {
      // 下拉状态配置
      downOption: {
        auto: false
      },
      // 上拉状态配置
      upOption: {
        auto: false, // 初始完成后第一次不自动加载
        isBounce: true,
        empty: {
          tip: '~ 空空如也 ~' // 提示
        },
        textNoMore: '没有更多了'
      },

      classificationList: [], //分类列表
      btnIndexId: -1, // 分类索引

      searchName: '', //搜索名称
      dataList: [] //列表数据
    };
  },
  props: {
    i: {
      type: Number,
      default() {
        return 0;
      }
    },
    index: {
      type: Number,
      default() {
        return 0;
      }
    },
    tabs: {
      type: Array,
      default() {
        return [];
      }
    },
    height: [Number, String], // mescroll的高度
    disableScroll: Boolean // 是否禁止滚动, 默认false
  },
  async mounted() {
    // 等待onLaunch 加载完成
    await this.$onLaunched;

    // 获取分类
    this.mGetClassIfyList();
  },
  computed: {
    ...mapState({
      preview: state => state.poster.preview
    })
  },
  methods: {
    downCallback() {
      setTimeout(() => {
        this.mescroll.resetUpScroll(false);
      }, 500);
    },
    upCallback(page) {
      // let keyword = this.tabs[this.i].name;
      getSourceMaterial({
        pageNo: page.num,
        pageSize: page.size,
        name: this.searchName,
        classId: this.btnIndexId,
        type: 3 // 海报数据
      })
        .then(res => {
          //设置列表数据
          if (page.num == 1) this.dataList.length = 0;

          // 设置一些属性
          res.data.list.forEach(item => {
            item.coverImage = item.content + '?imageView2/0/w/300/h/360/q/75';
            item.guid = Date.now() + item.id;
            if (typeof item.showChar == 'undefined') item.showChar = true;
          });
          this.dataList.push(...res.data.list);
          // 当前页加载完成
          this.mescroll.endBySize(res.data.list.length, res.data.total);
        })
        .catch(() => {
          //联网失败, 结束加载
          this.mescroll.endErr();
        });
    },

    //点击空布局按钮的回调
    emptyClick() {
      uni.showToast({
        title: '点击了按钮,具体逻辑自行实现'
      });
    },

    // 切换分类索引
    switchClassification(index) {
      if (this.btnIndexId === index) return;
      this.btnIndexId = index;
      this.mescroll.scrollTo(0, 0);
      this.mescroll.resetUpScroll(false);
    },
    // 获取分类数据
    async mGetClassIfyList() {
      this.classificationList = [{ id: -1, name: '最多分享' }];
      const res = await getClassIfyList({
        sourceMaterialType: 3
      });
      this.classificationList.splice(1, 0, ...res.data);
      this.mescroll.resetUpScroll(false);
    },

    //点击单个项目
    itemClicK(index) {
      this.gotoPage(`/pages/generatePoster/generatePoster?id=${this.dataList[index].id}`);
      // this.$store.commit('SET_PREVIEW', this.dataList[index]);
    },

    //跳转页面
    gotoPage(url) {
      uni.navigateTo({
        url: url
      });
    },

    // 搜索
    mySearch(value) {
      this.mescroll.resetUpScroll(false);
    }
  }
};
</script>
<style scoped lang="scss">
.boxTop {
  padding: 20rpx 20rpx 20rpx;
  overflow: hidden;
  .search {
    margin-bottom: 30rpx;
  }
}

.listBox {
  padding: 0 20rpx;
}

.cover_pop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
