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
      <u-form-item label="门诊logo上传" required prop="tenantInfo.tenantLog" borderBottom>
        <u-upload
          :fileList="tenantLogFileList"
          @afterRead="afterRead3"
          @delete="deletePic3"
          :maxCount="1"
        ></u-upload>
      </u-form-item>

      <u-form-item label="门诊名称" required prop="tenantInfo.name" borderBottom>
        <u--input
          v-model="modeData.tenantInfo.name"
          placeholderStyle="font-size:13px;color:#bbb;"
          fontSize="14px"
          placeholder="请填写门诊名称"
          border="none"
        ></u--input>
      </u-form-item>

      <u-form-item label="门诊电话" required prop="tenantInfo.contactMobile" borderBottom>
        <u--input
          v-model="modeData.tenantInfo.contactMobile"
          placeholderStyle="font-size:13px;color:#bbb;"
          fontSize="14px"
          placeholder="请填写门诊电话"
          border="none"
        ></u--input>
      </u-form-item>

      <u-form-item label="地址" required prop="tenantInfo.address" borderBottom>
        <u-textarea
          v-model="modeData.tenantInfo.address"
          placeholder="请填写门诊地址"
          border="none"
          fontSize="14px"
          placeholderStyle="font-size:13px;color:#bbb;"
        ></u-textarea>
      </u-form-item>

      <!-- <u-form-item label="社会信用代码" prop="tenantInfo.creditCode" borderBottom>
        <u--input
          v-model="modeData.tenantInfo.creditCode"
          placeholder="请填写社会信用代码"
          placeholderStyle="font-size:13px;color:#bbb;"
          border="none"
          fontSize="14px"
        ></u--input>
      </u-form-item> -->

      <!-- <u-form-item label="请上传营业执照" prop="tenantInfo.license">
        <u-upload
          :fileList="licenseFileList"
          @afterRead="afterRead4"
          @delete="deletePic4"
          :maxCount="1"
          width="690rpx"
          height="480rpx"
        >
          <image
            src="@/static/images/myimg/yyzz.jpeg"
            mode="aspectFill"
            style="width: 690rpx;height: 480rpx;overflow: hidden;"
          ></image>
        </u-upload>
      </u-form-item> -->
    </u--form>

    <!-- 底部按钮 -->
    <view class="mBottom">
      <view class="warpper">
        <view class="agreement">
          <u-checkbox-group shape="square" v-model="checkboxValue1" placement="row">
            <u-checkbox
              activeColor="#02a7f0"
              :customStyle="{ marginBottom: '8px' }"
              v-for="(item, index) in checkboxList1"
              :key="index"
              size="26rpx"
              labelSize="26rpx"
              :label="item.name"
              :name="item.name"
              style="flex: none;"
            ></u-checkbox>
          </u-checkbox-group>
          <text class="s12">口腔推使用协议</text>
        </view>

        <button class="btn" :loading="btnLoading" @tap.stop="mSubmit">保存</button>
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
      checkboxList1: [{ name: '同意' }],
      checkboxValue1: [],

      modeData: {
        tenantInfo: {
          name: '', // 门诊名称
          contactMobile: '', // 门诊电话
          tenantLog: '', // 门诊logo
          address: '', // 门诊地址
          lng: '', // 经度
          lat: '', // 维度
          license: '', // 营业执照
          creditCode: '', // 社会信用代码
          postIds: [1] // 超级管理员的职位列表
        }
      },
      rules: {
        'tenantInfo.name': {
          type: 'string',
          required: true,
          message: '请填写门诊名称',
          trigger: ['blur', 'change']
        },
        'tenantInfo.contactMobile': {
          type: 'string',
          required: true,
          message: '请填写门诊电话',
          trigger: ['blur', 'change']
        },
        'tenantInfo.address': {
          type: 'string',
          required: true,
          message: '请填写地址',
          trigger: ['blur', 'change']
        },
        'tenantInfo.tenantLog': {
          type: 'string',
          required: true,
          message: '请上传门诊logo',
          trigger: ['blur', 'change']
        }
      },
      tenantLogFileList: [],
      licenseFileList: [],

      tenantId: 0,
      btnLoading: false
    };
  },
  computed: {
    ...mapState({
      tenantInfo: state => state.tenant.info
    })
  },
  onLoad({ id }) {
    this.tenantId = Number(id);

    if (this.tenantId) {
      this.mGetOne();
    }
  },
  methods: {
    // 初始化门诊信息
    initInfo(tenantObj) {
      if (this.tenantId) {
        this.modeData.tenantInfo = tenantObj;

        // 设置图片显示列表
        if (this.modeData.tenantInfo.tenantLog) {
          this.tenantLogFileList = [
            {
              url: this.modeData.tenantInfo.tenantLog
            }
          ];
        }

        if (this.modeData.tenantInfo.license) {
          this.licenseFileList = [
            {
              url: this.modeData.tenantInfo.license
            }
          ];
        }
      }
    },

    // 删除图片
    deletePic3(event) {
      this.tenantLogFileList.splice(event.index, 1);
      this.modeData.tenantInfo.tenantLog = '';
    },
    async afterRead3(event) {
      // 上传店铺logo
      this.tenantLogFileList.push({
        ...event.file,
        status: 'uploading',
        message: '上传中'
      });
      const result = await this.uploadFilePromise(this.tenantLogFileList[0]);
      this.modeData.tenantInfo.tenantLog = result;
      // 上传成功
      this.tenantLogFileList.splice(
        0,
        1,
        Object.assign(this.tenantLogFileList[0], {
          status: 'success',
          message: '',
          url: result
        })
      );
    },

    // 删除图片
    deletePic4(event) {
      this.licenseFileList.splice(event.index, 1);
      this.modeData.tenantInfo.license = '';
    },
    async afterRead4(event) {
      // 上传店铺营业执照
      this.licenseFileList.push({
        ...event.file,
        status: 'uploading',
        message: '上传中'
      });
      const result = await this.uploadFilePromise(this.licenseFileList[0]);
      console.log(result);
      this.modeData.tenantInfo.license = result;
      // 上传成功
      this.licenseFileList.splice(
        0,
        1,
        Object.assign(this.licenseFileList[0], {
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

    async mGetOne() {
      // 获取指定门诊信息
      const res = await getOne({ tenantId: this.tenantId });
      this.initInfo(res.data);
    },
    mSubmit() {
      if (this.btnLoading) return;
      // 表单提交
      this.$refs.uForm11
        .validate()
        .then(async res => {
          if (this.checkboxValue1[0] === '同意') {
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
          } else {
            uni.$u.toast('请勾选协议');
          }
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
