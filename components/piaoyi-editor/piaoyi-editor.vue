<template>
  <view class="container-editor">
    <view class="textarea">
      <view class="page-body">
        <view class="wrapper">
          <PickerColor
            ref="colorPicker"
            :color="{ r: 255, g: 0, b: 0, a: 0.6 }"
            @confirm="confirm"
          ></PickerColor>
          <view class="toolbar" @tap="format">
            <view
              :class="formats.fontSize === '24px' ? 'ql-active' : ''"
              class="iconfont icon-font-size"
              data-name="fontSize"
              data-value="24px"
            ></view>
            <view
              :class="formats.color ? 'ql-active' : ''"
              class="iconfont icon-zitiyanse"
              data-name="color"
              :data-value="formats.color"
            ></view>
            <view
              :class="formats.header === 1 ? 'ql-active' : ''"
              class="iconfont icon-formatheader1"
              data-name="header"
              :data-value="1"
            ></view>
            <view
              :class="formats.header === 2 ? 'ql-active' : ''"
              class="iconfont icon-formatheader2"
              data-name="header"
              :data-value="2"
            ></view>
            <view
              :class="formats.bold ? 'ql-active' : ''"
              class="iconfont icon-zitijiacu"
              data-name="bold"
            ></view>
            <view
              :class="formats.italic ? 'ql-active' : ''"
              class="iconfont icon-zitixieti"
              data-name="italic"
            ></view>
            <view
              :class="formats.underline ? 'ql-active' : ''"
              class="iconfont icon-zitixiahuaxian"
              data-name="underline"
            ></view>
            <view
              :class="formats.strike ? 'ql-active' : ''"
              class="iconfont icon-shanchuxian"
              data-name="strike"
            ></view>
            <view
              :class="formats.align === 'left' ? 'ql-active' : ''"
              class="iconfont icon-zuoduiqi"
              data-name="align"
              data-value="left"
            ></view>
            <view
              :class="formats.align === 'center' ? 'ql-active' : ''"
              class="iconfont icon-juzhongduiqi"
              data-name="align"
              data-value="center"
            ></view>
            <view
              :class="formats.align === 'right' ? 'ql-active' : ''"
              class="iconfont icon-youduiqi"
              data-name="align"
              data-value="right"
            ></view>
            <view
              :class="formats.align === 'justify' ? 'ql-active' : ''"
              class="iconfont icon-zuoyouduiqi"
              data-name="align"
              data-value="justify"
            ></view>
            <view
              :class="formats.lineHeight ? 'ql-active' : ''"
              class="iconfont icon-LineHeight"
              data-name="lineHeight"
              data-value="2"
            ></view>
            <view
              :class="formats.letterSpacing ? 'ql-active' : ''"
              class="iconfont icon-Character-Spacing"
              data-name="letterSpacing"
              data-value="2em"
            ></view>
            <view
              :class="formats.marginTop ? 'ql-active' : ''"
              class="iconfont icon-duanqianju"
              data-name="marginTop"
              data-value="10px"
            ></view>
            <view
              :class="formats.previewarginBottom ? 'ql-active' : ''"
              class="iconfont icon-duanhouju"
              data-name="marginBottom"
              data-value="10px"
            ></view>
            <!-- <view class="iconfont icon-rili4" @tap="insertDate"></view> -->
            <view class="iconfont icon-checklist" data-name="list" data-value="check"></view>
            <view
              :class="formats.list === 'ordered' ? 'ql-active' : ''"
              class="iconfont icon-youxupailie"
              data-name="list"
              data-value="ordered"
            ></view>
            <view
              :class="formats.list === 'bullet' ? 'ql-active' : ''"
              class="iconfont icon-wuxupailie"
              data-name="list"
              data-value="bullet"
            ></view>
            <view class="iconfont icon-outdent" data-name="indent" data-value="-1"></view>
            <view class="iconfont icon-indent" data-name="indent" data-value="+1"></view>
            <view class="iconfont icon-fengexian" @tap="insertDivider"></view>
            <view class="iconfont icon-charutupian" @tap="insertImage"></view>
            <view class="iconfont icon-undo" @tap="undo"></view>
            <view class="iconfont icon-redo" @tap="redo"></view>
            <view class="iconfont icon-format" @tap="clear"></view>
          </view>
          <view style="height: 110px;"></view>
          <editor
            id="editor"
            class="editor"
            placeholder="开始输入..."
            showImgSize
            showImgToolbar
            showImgResize
            @statuschange="onStatusChange"
            :read-only="readOnly"
            @ready="onEditorReady"
            @input="saveContens"
          ></editor>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import PickerColor from './color-picker.vue';
export default {
  components: {
    PickerColor
  },
  props: {
    api: {
      type: String,
      default: ''
    },
    photoUrl: {
      type: String,
      default: ''
    },
    values: {
      type: String,
      default: ''
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      currentTab: 0,
      curColor: '#000000',
      show: true,
      hdid: '',
      myHtml: '',
      formats: {}
    };
  },
  methods: {
    showPicker() {
      this.$refs.colorPicker.open();
    },
    confirm(e) {
      this.editorCtx.format('color', e.hex);
    },
    saveContens() {
      let that = this;
      let maxlength = parseInt(that.maxlength);
      that.editorCtx.getContents({
        success: function(res) {
          let html_text = res.html;
          let html_length = html_text.length;
          if (html_length > maxlength) {
            uni.showModal({
              title: '最多只能输入' + maxlength + '字',
              confirmText: '确定',
              showCancel: false,
              success(res) {
                that.$emit('changes', {
                  html: res.html,
                  length: html_length
                });
              }
            });
          } else {
            that.$emit('changes', {
              html: res.html,
              length: html_length
            });
          }
        }
      });
    },
    update() {
      //获取一下是否有数据
      let that = this;
      setTimeout(() => {
        that.editorCtx.setContents({
          html: that.values
        });
      }, 10);
    },
    onEditorReady() {
      let that = this;
      uni
        .createSelectorQuery()
        .in(this)
        .select('#editor')
        .context(res => {
          // 获取编辑器对象
          console.log(res);
          that.editorCtx = res.context;
          that.update();
        })
        .exec(result => {});
    },
    undo() {
      this.editorCtx.undo();
    },
    redo() {
      this.editorCtx.redo();
    },
    format(e) {
      let { name, value } = e.target.dataset;
      if (!name) return;
      if (name == 'color') {
        this.showPicker();
      } else {
        this.editorCtx.format(name, value);
      }
    },
    onStatusChange(e) {
      const formats = e.detail;
      this.formats = formats;
    },
    insertDivider() {
      this.editorCtx.insertDivider();
    },
    clear() {
      this.editorCtx.clear();
      // this.$emit();
    },
    insertDate() {
      const date = new Date();
      const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
      this.editorCtx.insertText({
        text: formatDate
      });
    },
    insertImage() {
      let that = this;
      uni.chooseImage({
        count: 1,
        success: res => {
          //上传文件的临时路径
          const tempFilePaths = res.tempFilePaths;
          if (!this.api || this.photoUrl) {
            that.editorCtx.insertImage({
              src: tempFilePaths[0],
              alt: '图像',
              success: function() {}
            });
            console.log(tempFilePaths[0]);
            uni.showToast({
              title: '未传入api字段或者photoUrl字段，此为临时图片路径',
              duration: 3000,
              icon: 'none'
            });
          } else {
            uni.uploadFile(this.api, tempFilePaths[0]).then(uploadFileRes => {
              const back = uploadFileRes.datas;
              if (uploadFileRes.status == 200) {
                let url = that.photoUrl + back.fileNewName;
                that.editorCtx.insertImage({
                  src: url,
                  alt: '图像',
                  success: function() {}
                });
              } else {
                that.showToast(uploadFileRes.message);
              }
            });
          }
        }
      });
    }
  }
};
</script>

<style>
@import url('iconfont.css');

.tabs {
  display: flex;
  justify-content: space-around;
  background-color: #ffffff;
}

.tabs .current {
  border-bottom: 2px solid #0369d6;
}

.tabs .tab {
  font-size: 32upx;
}

.main {
  padding: 20upx;
  background-color: #ffffff;
}

.main .item {
  display: flex;
  justify-content: space-between;
  line-height: 80upx;
  border-bottom: 1px solid #f2f2f2;
}

.main .item .left {
  min-width: 200upx;
}

.main .title {
  padding-bottom: 20upx;
  font-weight: bold;
  border-bottom: 1px solid #f2f2f2;
}

.main .textarea {
  border: 1px solid #f2f2f2;
}

.wrapper {
  padding: 0 10upx;
}

.iconfont {
  display: inline-block;
  width: 9%;
  cursor: pointer;
  font-size: 40upx !important;
  text-align: center;
  padding: 10upx 0;
}

.icon-rili4 {
  font-size: 48upx !important;
}

.icon-duanqianju,
.icon-duanhouju,
.icon-zitijiacu,
.icon-zitixieti,
.icon-zitixiahuaxian,
.icon-shanchuxian {
  font-size: 36upx !important;
}

.toolbar {
  box-sizing: border-box;
  border-bottom: 0;
  margin-bottom: 10upx;
  position: fixed;
  z-index: 10;
  background-color: #eee;
}

.ql-container {
  box-sizing: border-box;
  width: 100%;
  min-height: 300upx;
  height: auto;
  background: #fff;
  font-size: 32upx;
  line-height: 1;
}

/deep/ .ql-editor.ql-blank:before {
  font-size: 28upx;
  font-style: inherit;
}

.ql-active {
  color: #ff0000;
}

button {
  width: 150upx;
  font-size: 30upx;
}

.editor {
  color: #333;
}
</style>
