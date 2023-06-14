<template>
  <view class="mBox">
    <u--form
      labelPosition="top"
      labelWidth="auto"
      :model="modeData"
      :rules="rules"
      :labelStyle="{ color: '#666', fontSize: '28rpx' }"
      ref="uForm11"
    >
      <u-form-item label="门诊环境照上传" required prop="tenantInfo.photograph">
        <u-upload
          :fileList="fileList.photograph"
          @afterRead="afterRead"
          @delete="deletePic"
          @oversize="oversize"
          :maxCount="8"
          :maxSize="1024 * 1024 * 5"
          name="photograph"
        ></u-upload>
      </u-form-item>
      <view class="tips">最多可以上传 8 张照片</view>
      <view class="tips">支持jpg,png格式, 每张照片最大5M</view>
    </u--form>
    <!-- 底部按钮 -->
    <view class="mBottom">
      <view class="warpper">
        <button class="btn" :loading="btnLoading" @tap.stop="mSubmit">保存</button>
      </view>
    </view>
  </view>
</template>

<script>
import { amendPhotograph, getShareTenant } from '@/api/materialLibrary.js';
import { delay } from '@/utils/index.js';
import wx from '@/wxJsSDK/index.js';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      modeData: {
        tenantInfo: {
          id: 0,
          photograph: ''
        }
      },
      rules: {
        'tenantInfo.photograph': {
          type: 'string',
          required: true,
          message: '环境照不能为空',
          trigger: ['change']
        }
      },

      // 上传的文件列表
      fileList: {
        photograph: []
      },

      tenantId: 0, // 门诊ID
      btnLoading: false
    };
  },
  computed: {
    ...mapState({
      tenantInfo: state => state.tenant.info
    })
  },
  async onLoad() {
    // 等待onLaunch 加载完成
    await this.$onLaunched;

    this.$nextTick(() => {
      this.mGetShareTenant();
    });
  },
  methods: {
    // 初始化门诊信息
    initInfo(tenantObj) {
      this.modeData.tenantInfo.id = tenantObj.id;

      // 如果没有值返回
      if (!tenantObj.photograph) {
        return;
      }

      // 设置门诊环境照,回显
      const photographList = tenantObj.photograph.split(',');
      photographList.forEach(item => {
        if (item) {
          this.fileList.photograph.push({ url: item });
        }
      });
    },

    // 删除上传的图片
    deletePic(event) {
      this.fileList[event.name].splice(event.index, 1);
    },

    // 上传文件读取后执行
    async afterRead(event) {
      // 设置显示
      this.fileList[event.name].push({
        ...event.file,
        status: 'uploading',
        message: '上传中'
      });

      // 上传完成设置上传完成
      const result = await this._$uploadFilePromise(event.file.url);
      this.fileList[event.name].splice(
        event.index,
        1,
        Object.assign(event.file, {
          status: 'success',
          message: '上传成功',
          url: result
        })
      );

      // 数据赋值
      this.modeData.tenantInfo.photograph = this.fileList[event.name]
        .map(item => item.url)
        .join(',');
    },

    // 获取指定门诊信息
    async mGetShareTenant() {
      await delay(200);
      const res = await getShareTenant({ tenantId: this.tenantInfo.id });
      this.initInfo(res.data);
    },

    /** 超出限制 */
    oversize(e) {
      this._$showToast('文件大小超出1M限制');
    },

    // 表单提交
    mSubmit() {
      // 是否在加载中,防止多次提交
      if (this.btnLoading) return;

      this.$refs.uForm11
        .validate()
        .then(async res => {
          // 接口提交中
          this.btnLoading = true;

          // 合并图片列表
          const urls = this.fileList.photograph.map(obj => obj.url);
          const mPhotograph = urls.join(',');
          this.modeData.tenantInfo.photograph = mPhotograph;

          // 发送提交请求
          const resObj = await amendPhotograph(this.modeData.tenantInfo);

          this.btnLoading = false;

          const pages = getCurrentPages();
          if (pages.length > 1) {
            uni.navigateBack();
          } else {
            uni.switchTab({
              url: '/pages/center/center'
            });
          }
        })
        .catch(errors => {
          console.log(errors);
          // 表单验证失败
          this.btnLoading = false;
          if (errors[0]) {
            uni.$u.toast(errors[0].message);
          }
        });
    }
  },

  onReady() {
    // 绑定表单验证规则
    this.$refs.uForm11.setRules(this.rules);
  }
};
</script>

<style scoped lang="scss">
page {
  background-color: #fff;
}

.mBox {
  padding: 20rpx 30rpx;
}
.mBottom {
  height: 200rpx;
  .warpper {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 5;
    background-color: #f5f6f9;
    margin: 0 -30rpx;
    padding: 15rpx 30rpx 0;
    padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
    box-sizing: border-box;
    .btn {
      background-color: $main-color;
      color: #fff;
      line-height: 2.8;
      font-size: 28rpx;
      border-radius: 20rpx;
    }
  }
}
.u-textarea {
  padding: 9rpx 0;
}

.tips {
  font-size: 26rpx;
  color: $main-color;
  line-height: 40rpx;
}
</style>
