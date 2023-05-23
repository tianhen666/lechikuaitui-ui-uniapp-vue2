<template>
  <view>
    <piaoyi-editor
      :values="values"
      :maxlength="30000"
      @changes="saveContens"
      :readOnly="readOnly"
      :photoUrl="photoUrl"
      :api="api"
    />
  </view>
</template>

<script>
export default {
  data() {
    return {
      readOnly: false, //是否只读
      photoUrl: '', //服务器图片域名或者ip
      api: '', //上传图片接口地址
      values: ''
    };
  },
  methods: {
    saveContens(e) {
      console.log(e);
    }
  }
};
</script>

<style></style>
