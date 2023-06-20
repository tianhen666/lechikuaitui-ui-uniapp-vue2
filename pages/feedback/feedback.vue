<template>
  <view class="mBox">
    <u-picker
      :show="show"
      @cancel="show = false"
      @confirm="pickerConfirm"
      :columns="columns"
      keyName="name"
      title="问题类型"
    ></u-picker>
    <u--form
      labelWidth="auto"
      :model="modeData"
      :rules="rules"
      labelPosition="top"
      :errorType="'toast'"
      :labelStyle="{ color: '#333', fontSize: '30rpx' }"
      ref="uForm11"
    >
      <!-- 问题类型 -->
      <u-form-item label="问题类型" required prop="type" @tap="open">
        <u--input
          v-model="modeData.typeName"
          placeholderStyle="font-size:13px;color:#bbb;"
          fontSize="14px"
          placeholder="请选择问题类型"
        ></u--input>
        <u-icon slot="right" name="arrow-right"></u-icon>
      </u-form-item>

      <!-- 手机号码 -->
      <u-form-item label="手机号码" required prop="mobile">
        <u--input
          type="number"
          v-model="modeData.mobile"
          placeholderStyle="font-size:13px;color:#bbb;"
          fontSize="14px"
          placeholder="请填写手机号码"
        ></u--input>
      </u-form-item>

      <!-- 建议描述 -->
      <u-form-item label="建议描述" required prop="suggest">
        <u-textarea
          count
          maxlength="120"
          v-model="modeData.suggest"
          placeholder="对我们产品和服务, 请输入您的建议"
          fontSize="14px"
          placeholderStyle="font-size:13px;color:#bbb;"
        ></u-textarea>
      </u-form-item>
      <view class="tips" style="margin-bottom: 20rpx;">
        您对此产品的问题描述, 最多输入120个字符
      </view>

      <!-- 图片上传 -->
      <u-form-item label="图片上传" prop="uploadPictures">
        <u-upload
          :fileList="fileList.uploadPictures"
          @afterRead="afterRead"
          @delete="deletePic"
          :maxCount="4"
          @oversize="oversize"
          name="uploadPictures"
          :maxSize="1024 * 1024 * 5"
        ></u-upload>
      </u-form-item>
      <view class="tips">最多可以上传 4 张照片</view>
      <view class="tips" style="margin-bottom: 20rpx;">支持jpg,png格式, 每张照片最大5M</view>
    </u--form>

    <!-- 底部按钮 -->
    <view class="mBottom">
      <view class="warpper">
        <button class="btn" :loading="btnLoading" @tap.stop="mSubmit">提交反馈</button>
      </view>
    </view>
  </view>
</template>

<script>
import { getClassIfyList, saveOpinion } from '@/api/materialLibrary.js';
import { delay } from '@/utils/index.js';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      modeData: {
        type: '', // 问题类型
        typeName: '', // 描述名称
        mobile: '', // 手机号码
        suggest: '', // 描述
        uploadPictures: '' // 问题图片,
      },
      rules: {
        type: {
          type: 'number',
          required: true,
          message: '请选择问题类型',
          trigger: ['change']
        },
        mobile: [
          {
            type: 'string',
            required: true,
            message: '请输入门诊电话',
            trigger: ['change']
          }
        ],
        suggest: [
          {
            type: 'string',
            required: true,
            message: '请输入问题描述',
            trigger: ['change']
          }
        ]
      },
      // 回显列表
      fileList: {
        uploadPictures: []
      },

      // 提交加载
      btnLoading: false,

      // 选择反馈列表
      show: false,
      columns: []
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

    this.mGetClassIfyList();
  },
  methods: {
    /**
     * 打开类型选择器
     * */
    open() {
      this.show = true;
      this.hideKeyboard();
    },

    /** 超出限制 */
    oversize(e) {
      this._$showToast('文件大小超出1M限制');
    },

    /**
     * 获取反馈分类
     * */
    async mGetClassIfyList() {
      const res = await getClassIfyList({
        sourceMaterialType: 4 // 反馈分类
      });
      this.columns = [res.data];
    },

    /**
     * 移除图片
     * */
    deletePic(event) {
      this.fileList[event.name].splice(event.index, 1);
      this.modeData[event.name] = '';
    },

    /**
     * 上传图片
     * */
    async afterRead(event) {
      // 设置显示
      this.fileList[event.name].push({
        ...event.file,
        status: 'uploading',
        message: '上传中'
      });
      const result = await this._$uploadFilePromise(event.file.url);
      // 上传完成设置回显
      this.fileList[event.name].splice(
        event.index,
        1,
        Object.assign(event.file, {
          status: 'success',
          message: '上传成功',
          url: result
        })
      );
      // 显示数据赋值
      this.modeData[event.name] = this.fileList[event.name].map(item => item.url).join(',');
    },

    /**
     * 选择问题分类
     *
     * */
    pickerConfirm(e) {
      this.show = false;
      this.modeData.type = e.value[0].id;
      this.modeData.typeName = e.value[0].name;
    },

    /**
     * 表单提交
     * */
    async mSubmit() {
      if (this.btnLoading) return;

      // 前端表单验证
      try {
        await this.$refs.uForm11.validate();
      } catch (errors) {
        return;
      }

      try {
        // 加载中
        uni.showLoading({
          title: '正在保存中...'
        });
        this.btnLoading = true;

        // 发送修改用户信息请求
        await saveOpinion(this.modeData);
        this._$showToast('反馈提交成功~');

        await delay(2000);
        // 完成后跳转
        uni.switchTab({ url: '/pages/center/center' });
      } finally {
        setTimeout(res => {
          // 关闭loading
          this.btnLoading = false;
          uni.hideLoading();
        }, 500);
      }
    },
    // 不弹出输入法
    hideKeyboard() {
      uni.hideKeyboard();
    }
  },
  onReady() {
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
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    z-index: 5;
    left: 0;
    background-color: #f5f6f9;
    padding: 20rpx 30rpx 0;
    padding-bottom: calc(24rpx + env(safe-area-inset-bottom));

    .btn {
      background-color: $main-color;
      color: #fff;
      height: 70rpx;
      line-height: 70rpx;
      font-size: 28rpx;
      border-radius: 10rpx;
    }
  }
}

.tips {
  font-size: 22rpx;
  color: $main-color;
  line-height: 30rpx;
}
</style>
