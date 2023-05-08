<template>
  <view>
    <template v-for="(item, index) in treeData">
      <my-tree v-if="item.views" :treeData="item.views"></my-tree>
      <text v-if="item.type === 'text'" :style="item.css">{{ item.text }}</text>
      <image v-if="item.type === 'image'" :style="item.css" :src="item.src"></image>
      <uqrcode
        v-if="item.type === 'qrcode'"
        :canvasId="'qrcode' + index"
        :value="item.text"
        :options="{ margin: 10 }"
      ></uqrcode>
    </template>
  </view>
</template>

<script>
export default {
  name: 'myTree',
  props: {
    treeData: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style></style>
