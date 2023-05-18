<template>
  <view class="myBox">
    <view class="warpper">
      <u-cell-group>
        <u-cell title="智能通知" name="notice" label="VIP推送每日新增内容">
          <u-switch
            slot="right-icon"
            clickable
            inactiveColor="#e4e5e6"
            @input="noticeSet"
            v-model="notice"
          ></u-switch>
        </u-cell>
      </u-cell-group>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      notice: false
    };
  },
  methods: {
    noticeSet(val) {
      // 设置通知
      console.log(val);
    }
  }
};
</script>

<style lang="scss" scoped>
.myBox {
  .warpper {
    background-color: #fff;
  }
}
</style>
