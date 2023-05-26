<template>
  <view class="mBox">
    <view class="myInfo">请完善个人信息,用于分享文章,等</view>
    <u--form
      labelPosition="top"
      labelWidth="auto"
      :model="modeData"
      :rules="rules"
      :labelStyle="{ color: '#666', fontSize: '28rpx' }"
      ref="uForm11"
    >
      <u-form-item label="头像上传" prop="userInfo.avatar" borderBottom>
        <u-upload
          :fileList="userInfoAvatarFileList"
          @afterRead="afterRead"
          :maxCount="1"
          @delete="deletePic"
        ></u-upload>
      </u-form-item>

      <u-form-item label="姓名" prop="userInfo.nickname" borderBottom>
        <u--input
          v-model="modeData.userInfo.nickname"
          placeholder="请填写姓名"
          border="none"
          clearable
          fontSize="14px"
          placeholderStyle="font-size:14px;color:#bbb;"
        ></u--input>
      </u-form-item>

      <u-form-item
        label="手机号码"
        @tap="smsCodeOpen"
        required
        prop="userInfo.contactMobile"
        borderBottom
      >
        <u--input
          type="number"
          v-model="modeData.userInfo.contactMobile"
          placeholder="请填写手机号"
          border="none"
          fontSize="14px"
          placeholderStyle="font-size:14px;color:#bbb;"
        ></u--input>
        <u-icon slot="right" name="arrow-right"></u-icon>
      </u-form-item>

      <u-form-item label="签名 (广告语)" prop="userInfo.slogan" borderBottom>
        <u-textarea
          v-model="modeData.userInfo.slogan"
          count
          placeholder="请填写签名"
          border="none"
          fontSize="14px"
          placeholderStyle="font-size:14px;color:#bbb;"
        ></u-textarea>
      </u-form-item>

      <u-form-item label="微信号" prop="userInfo.wxCode" borderBottom>
        <u--input
          v-model="modeData.userInfo.wxCode"
          placeholder="请填写微信号"
          border="none"
          fontSize="14px"
          placeholderStyle="font-size:14px;color:#bbb;"
        ></u--input>
      </u-form-item>

      <u-form-item required label="微信二维码上传" prop="userInfo.wechatCode" borderBottom>
        <u-upload
          :fileList="userInfoWechatCodeFileList"
          @afterRead="afterRead2"
          @delete="deletePic2"
          :maxCount="1"
          fontSize="14px"
          placeholderStyle="font-size:14px;color:#bbb;"
        ></u-upload>
      </u-form-item>

      <u-form-item label="微信二维码备注" prop="userInfo.remark" borderBottom>
        <u--input
          v-model="modeData.userInfo.remark"
          placeholder="请输入微信二维码备注"
          border="none"
          fontSize="14px"
          placeholderStyle="font-size:14px;color:#bbb;"
        ></u--input>
      </u-form-item>
    </u--form>

    <view class="mBottom">
      <view class="warpper">
        <button :loading="btnLoading" v-if="!newClinic" class="btn" @tap.stop="mSubmit">
          保存
        </button>
        <button :loading="btnLoading" v-else class="btn" @tap.stop="mSubmit">
          下一步,创建门诊
        </button>
      </view>
    </view>

    <!-- 验证手机弹窗 -->
    <uni-popup ref="smsCodePopup" type="center">
      <view class="smsCodeBox">
        <view class="close" @tap.stop="smsCodeClose">
          <image class="img" src="/static/images/empty/close.png"></image>
        </view>
        <u--form
          labelWidth="55px"
          :model="modeDataSmsCode"
          :rules="rulesSmsCode"
          :labelStyle="{ color: '#666', fontSize: '28rpx' }"
          ref="uFormSmsCode"
        >
          <u-form-item label="手机号:" prop="contactMobile">
            <u--input
              v-model="modeDataSmsCode.contactMobile"
              placeholder="请填写手机号"
              type="number"
              fontSize="14px"
              placeholderStyle="font-size:14px;color:#bbb;"
            >
              <template slot="suffix">
                <u-code
                  ref="uCode"
                  @change="smsCodeChange"
                  seconds="60"
                  changeText="X秒重新获取"
                ></u-code>
                <u-button
                  @tap="getCodeSms"
                  :text="smsCodeTips"
                  type="success"
                  size="mini"
                ></u-button>
              </template>
            </u--input>
          </u-form-item>

          <u-form-item label="验证码:" prop="code">
            <u--input
              v-model="modeDataSmsCode.code"
              placeholder="请输入验证码"
              type="number"
              fontSize="14px"
              placeholderStyle="font-size:14px;color:#bbb;"
            ></u--input>
          </u-form-item>
        </u--form>

        <view class="smsCodeBtn"><button @tap="verifyCodeSms" class="btn">确认</button></view>
      </view>
    </uni-popup>
    <u-toast ref="uToast"></u-toast>
  </view>
</template>

<script>
import { updateFileNamer, updateMember, sendSmsCode, useSmsCode } from '@/api/materialLibrary.js';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      modeData: {
        userInfo: {
          id: 0,
          nickname: '',
          avatar: '',
          contactMobile: '',
          slogan: '关爱您的每一颗牙',
          wechatCode: '',
          wxCode: '',
          remark: '长按识别添加微信',
          tenantId: 0,
          name: '',
          address: '',
          position: '',
          creditCode: '',
          license: '',
          postIds: [],
          tenantLog: ''
        }
      },
      rules: {
        'userInfo.contactMobile': [
          {
            required: true,
            message: '请填写手机号'
          },
          {
            validator: (rule, value, callback) => {
              return uni.$u.test.mobile(value);
            },
            message: '手机号码不正确'
          }
        ],
        'userInfo.wechatCode': [
          {
            required: true,
            message: '请上传微信二维码',
            trigger: ['blur', 'change']
          }
        ]
      },
      userInfoAvatarFileList: [],
      userInfoWechatCodeFileList: [],
      btnLoading: false,

      // 新建门诊
      newClinic: false,

      //验证手机
      smsCodeShow: false,
      smsCodeTips: '获取验证码',
      modeDataSmsCode: {
        contactMobile: '',
        code: ''
      },
      rulesSmsCode: {
        contactMobile: [
          {
            required: true,
            message: '请填写手机号'
          },
          {
            validator: (rule, value, callback) => {
              return uni.$u.test.mobile(value);
            },
            message: '手机号码不正确'
          }
        ],
        code: [
          {
            type: 'number',
            message: '验证码不正确'
          },
          {
            required: true,
            message: '请输入验证码'
          },
          {
            len: 4,
            message: '验证码不正确'
          }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  watch: {
    userInfo: {
      handler: function(newValue, oldValue) {
        if (newValue.id) {
          this.modeData.userInfo = {
            id: newValue.id,
            avatar: newValue.avatar || newValue.savatar,
            nickname: newValue.nickname || newValue.snickName,
            contactMobile: newValue.mobile,
            slogan: newValue.slogan || '关爱您的每一颗牙',
            wxCode: newValue.wxCode,
            wechatCode: newValue.wechatCode,
            remark: newValue.remark || '长按识别添加微信'
          };

          // 设置回显头像
          if (this.modeData.userInfo.avatar) {
            this.userInfoAvatarFileList = [{ url: this.modeData.userInfo.avatar }];
          }
          // 设置回显二维码
          if (this.modeData.userInfo.wechatCode) {
            this.userInfoWechatCodeFileList = [{ url: this.modeData.userInfo.wechatCode }];
          }
        }
      },
      immediate: true
    }
  },
  onLoad({ newClinic }) {
    // 新建门诊,需要补全用户个人信息
    if (Number(newClinic) === 1) {
      this.newClinic = true;
    }
  },
  methods: {
    // 删除头像
    deletePic(event) {
      this.userInfoAvatarFileList.splice(event.index, 1);
      this.modeData.userInfo.avatar = '';
    },
    async afterRead(event) {
      // 上传头像
      this.userInfoAvatarFileList.push({ ...event.file, status: 'uploading', message: '上传中' });
      const result = await this.uploadFilePromise(this.userInfoAvatarFileList[0]);
      this.modeData.userInfo.avatar = result;
      // 上传成功
      this.userInfoAvatarFileList.splice(
        0,
        1,
        Object.assign(this.userInfoAvatarFileList[0], {
          status: 'success',
          message: '',
          url: result
        })
      );
    },
    // 删除二维码
    deletePic2(event) {
      this.userInfoWechatCodeFileList.splice(event.index, 1);
      this.modeData.userInfo.wechatCode = '';
    },
    async afterRead2(event) {
      // 上传二维码
      this.userInfoWechatCodeFileList.push({
        ...event.file,
        status: 'uploading',
        message: '上传中'
      });
      const result = await this.uploadFilePromise(this.userInfoWechatCodeFileList[0]);
      this.modeData.userInfo.wechatCode = result;
      // 上传成功
      this.userInfoWechatCodeFileList.splice(
        0,
        1,
        Object.assign(this.userInfoWechatCodeFileList[0], {
          status: 'success',
          message: '',
          url: result
        })
      );
    },
    uploadFilePromise(item) {
      return new Promise((resolve, reject) => {
        updateFileNamer(item.url).then(res => {
          resolve(res);
        });
      });
    },
    mSubmit() {
      if (this.btnLoading) return;

      // 表单验证
      this.$refs.uForm11
        .validate()
        .then(res => {
          // 加载中
          uni.showLoading({
            title: '正在保存中...'
          });
          this.btnLoading = true;

          // 数据提交
          updateMember(this.modeData.userInfo).then(res => {
            setTimeout(res => {
              this.btnLoading = false;
              // 关闭loading
              uni.hideLoading();

              // 重新获取用户信息
              this.$store.dispatch('ObtainUserInfo');

              // 完成后跳转
              if (this.newClinic) {
                uni.redirectTo({
                  url: '/pages/tenantInfoInput/tenantInfoInput'
                });
              } else {
                const pages = getCurrentPages();
                if (pages.length > 1) {
                  uni.navigateBack();
                } else {
                  uni.switchTab({
                    url: '/pages/center/center'
                  });
                }
              }
            }, 1000);
          });
        })
        .catch(errors => {
          this.btnLoading = false;
          uni.$u.toast(errors[0].message);
        });
    },
    // 获取验证码
    getCodeSms() {
      this.$refs.uFormSmsCode.validateField('contactMobile', async errorsRes => {
        // 手机号验证失败
        if (errorsRes.length > 0) {
          return;
        }

        // 验证通过发送短信验证码
        const resSmsCode = await sendSmsCode({ mobile: this.modeDataSmsCode.contactMobile });
        this.$refs.uCode.start();
      });
    },
    //验证验证码
    verifyCodeSms() {
      // 表单验证
      this.$refs.uFormSmsCode
        .validate()
        .then(async res => {
          // 接口验证
          const resSmsCode = await useSmsCode({
            mobile: this.modeDataSmsCode.contactMobile,
            code: this.modeDataSmsCode.code
          });

          //验证通过后重新赋值
          this.modeData.userInfo.contactMobile = this.modeDataSmsCode.contactMobile;

          this.$refs.smsCodePopup.close();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 设置验证码文字
    smsCodeChange(text) {
      this.smsCodeTips = text;
    },
    // 验证码弹窗关闭
    smsCodeClose() {
      this.$refs.smsCodePopup.close();
    },
    // 验证码打开
    smsCodeOpen() {
      this.$refs.smsCodePopup.open();
      this.hideKeyboard();
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

<style lang="scss" scoped>
page {
  background-color: #fff;
}

.mBox {
  padding: 0 20rpx 0;
}
.myInfo {
  background-color: $main-color;
  margin: 0 -30rpx;
  padding: 30rpx 30rpx;
  font-size: 26rpx;
  color: #fff;
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
    .btn {
      background-color: $main-color;
      color: #fff;
      line-height: 2.8;
      font-size: 28rpx;
      border-radius: 20rpx;
    }
  }
}
/deep/ .u-textarea {
  padding: 9rpx 0;
}

.smsCodeBox {
  position: relative;
  width: 600rpx;
  padding: 40rpx 30rpx;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 10rpx;
  .close {
    position: absolute;
    top: -45rpx;
    right: -45rpx;

    .img {
      width: 45rpx;
      height: 45rpx;
      display: block;
    }
  }
  .smsCodeBtn {
    .btn {
      color: #fff;
      background-color: $main-color;
      font-size: 28rpx;
      height: 65rpx;
      line-height: 65rpx;
      margin-top: 20rpx;
    }
  }
}
</style>
