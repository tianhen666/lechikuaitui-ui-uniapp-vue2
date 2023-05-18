<template>
  <view class="mBox">
    <u-picker :show="show" :columns="columns"></u-picker>

    <u--form
      labelPosition="left"
      labelWidth="auto"
      :model="modeData"
      :rules="rules"
      :labelStyle="{ color: '#666', fontSize: '28rpx' }"
      ref="uForm11"
    >
      <u-form-item label="客户类型" required prop="type" borderBottom>
        <text>{{ modeData.type }}</text>
        <u-icon slot="right" name="arrow-right"></u-icon>
      </u-form-item>

      <u-form-item label="手机号码" required prop="mobile" borderBottom>
        <u--input
          v-model="modeData.mobile"
          placeholderStyle="font-size:13px;color:#bbb;"
          fontSize="14px"
          placeholder="请填写手机号码"
          border="none"
        ></u--input>
      </u-form-item>

      <u-form-item label="建议描述" prop="describe" borderBottom>
        <u-textarea
          v-model="modeData.describe"
          placeholder="对我们产品和服务, 请输入你的建议"
          border="none"
          fontSize="14px"
          placeholderStyle="font-size:13px;color:#bbb;"
        ></u-textarea>
      </u-form-item>

      <u-form-item labelPosition="top" label="图片上传" prop="uploadPictures" borderBottom>
        <u-upload
          :fileList="uploadPicturesFileList"
          @afterRead="afterRead1"
          @delete="deletePic1"
          :maxCount="1"
        ></u-upload>
      </u-form-item>
    </u--form>
    <!-- 底部按钮 -->
    <view class="mBottom">
      <view class="warpper">
        <button class="btn" :loading="btnLoading" @tap.stop="mSubmit">提交</button>
      </view>
    </view>
  </view>
</template>

<script>
import { updateFileNamer, saveTenant, updateTenant, getOne } from '@/api/materialLibrary.js';
import { mapState } from 'vuex';
import color from '../../uni_modules/uview-ui/libs/config/color';
export default {
  data() {
    return {
      modeData: {
        type: '', // 问题类型
        mobile: '', // 手机号码
        describe: '', // 描述
        uploadPictures: '' // 问题图片
      },
      rules: {
        'modeData.type': {
          type: 'string',
          required: true,
          message: '请输入问题类型',
          trigger: ['blur', 'change']
        },
        'modeData.mobile': [
          {
            type: 'string',
            required: true,
            message: '请输入门诊电话',
            trigger: ['blur', 'change']
          }
        ]
      },
      uploadPicturesFileList: [],

      btnLoading: false,

      show: false,
      columns: [['中国', '美国', '日本']]
    };
  },
  computed: {
    ...mapState({
      tenantInfo: state => state.tenant.info
    })
  },

  methods: {
    // 删除图片
    deletePic1(event) {
      this.uploadPicturesFileList.splice(event.index, 1);
      this.modeData.uploadPictures = '';
    },
    async afterRead1(event) {
      // 上传图片
      this.uploadPicturesFileList.push({
        ...event.file,
        status: 'uploading',
        message: '上传中'
      });
      const result = await this.uploadFilePromise(this.uploadPicturesFileList[0]);
      this.modeData.uploadPictures = result;
      // 上传成功
      this.uploadPicturesFileList.splice(
        0,
        1,
        Object.assign(this.uploadPicturesFileList[0], {
          status: 'success',
          message: '',
          url: result
        })
      );
    },
    uploadFilePromise(item) {
      // 上传图片
      return new Promise((resolve, reject) => {
        updateFileNamer(item.url).then(res => {
          resolve(res);
        });
      });
    },

    mSubmit() {
      if (this.btnLoading) return;
      // 表单提交
      this.$refs.uForm11
        .validate()
        .then(async res => {
          // 加载中
          uni.showLoading({
            title: '正在保存中...'
          });
          this.btnLoading = true;

          let resObj = {};
          // 判断是修改,还是新建
          if (this.tenantId) {
            this.$set(this.modeData.tenantInfo, 'deleted', 0);
            resObj = await updateTenant(this.modeData.tenantInfo);
          } else {
            resObj = await saveTenant(this.modeData.tenantInfo);
          }

          setTimeout(resObj => {
            this.btnLoading = false;
            // 关闭loading
            uni.hideLoading();

            // 修改完成跳转
            const pages = getCurrentPages();
            if (pages.length > 1) {
              uni.navigateBack();
            } else {
              uni.switchTab({
                url: '/pages/center/center'
              });
            }
          }, 1000);
        })
        .catch(errors => {
          this.btnLoading = false;
          if (errors[0]) {
            uni.$u.toast(errors[0].message);
          }
        });
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
    position: fixed;
    bottom: 0;
    z-index: 5;
    background-color: #f5f6f9;
    margin: 0 -30rpx;
    padding: 15rpx 30rpx 40rpx;
    box-sizing: border-box;
    .agreement {
      font-size: 26rpx;
      margin-bottom: 20rpx;
      display: flex;
      align-items: center;

      .s12 {
        color: $main-color;
        padding-left: 10rpx;
      }
      .u-checkbox-group {
        flex: none;
        .u-checkbox {
          margin-bottom: 0 !important;
        }
      }
    }
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

.outpatientService {
  background-color: #ddd;
  margin: 0 -30rpx;
  padding: 20rpx 30rpx;
  font-size: 30rpx;
  color: #888;
}
</style>
