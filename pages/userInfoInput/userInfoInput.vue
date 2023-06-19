<template>
  <view class="mBox">
    <u-toast ref="uToast"></u-toast>

    <view class="myInfo">请完善个人信息,用于分享文章,等</view>
    <u--form
      labelPosition="top"
      labelWidth="auto"
      :model="modeData"
      :rules="rules"
      :labelStyle="{ color: '#666', fontSize: '30rpx' }"
      ref="uForm11"
    >
      <u-form-item label="头像上传" required prop="userInfo.avatar">
        <u-upload
          :fileList="fileList.avatar"
          @afterRead="afterRead"
          :maxCount="1"
          @delete="deletePic"
          name="avatar"
        ></u-upload>
      </u-form-item>

      <u-form-item label="姓名" required prop="userInfo.nickname">
        <u--input
          v-model="modeData.userInfo.nickname"
          placeholder="请填写姓名"
          clearable
          fontSize="14px"
          placeholderStyle="font-size:14px;color:#bbb;"
        ></u--input>
      </u-form-item>
      <view class="tips">字符长度,限制2-30字之间</view>

      <u-form-item label="手机号码" @tap="smsCodeOpen" required prop="userInfo.contactMobile">
        <u--input
          type="number"
          v-model="modeData.userInfo.contactMobile"
          placeholder="请填写手机号"
          fontSize="14px"
          placeholderStyle="font-size:14px;color:#bbb;"
        ></u--input>
        <!-- 箭头插槽 -->
        <view slot="right" style="margin-left: 30rpx;"><u-icon name="arrow-right"></u-icon></view>
      </u-form-item>

      <u-form-item label="个性签名" prop="userInfo.slogan">
        <u-textarea
          v-model="modeData.userInfo.slogan"
          count
          maxlength="30"
          placeholder="请填写签名"
          fontSize="14px"
          placeholderStyle="font-size:14px;color:#bbb;"
        ></u-textarea>
      </u-form-item>
      <view class="tips">显示您的个性签名, 可不填写</view>

      <u-form-item label="微信号" prop="userInfo.wxCode">
        <u--input
          v-model="modeData.userInfo.wxCode"
          placeholder="请填写微信号"
          fontSize="14px"
          placeholderStyle="font-size:14px;color:#bbb;"
        ></u--input>
      </u-form-item>
      <view class="tips">方便用户添加您的微信, 可不填写</view>

      <u-form-item required label="微信二维码上传" prop="userInfo.wechatCode">
        <u-upload
          :fileList="fileList.wechatCode"
          @afterRead="afterRead"
          @delete="deletePic"
          :maxCount="1"
          name="wechatCode"
          fontSize="14px"
          placeholderStyle="font-size:14px;color:#bbb;"
        ></u-upload>
      </u-form-item>
      <view class="tips">方便用户添加您的微信</view>

      <!-- <u-form-item label="微信二维码备注" prop="userInfo.remark" borderBottom>
        <u--input
          v-model="modeData.userInfo.remark"
          placeholder="请输入微信二维码备注"
          border="none"
          fontSize="14px"
          placeholderStyle="font-size:14px;color:#bbb;"
        ></u--input>
      </u-form-item> -->
    </u--form>

    <view class="mBottom">
      <view class="warpper">
        <button :loading="btnLoading" class="btn" @tap.stop="mSubmit">
          {{ newClinic ? '下一步, 创建门诊' : invitationTenantID ? '下一步,加入门诊' : '保存提交' }}
        </button>
      </view>
    </view>

    <!-- 验证手机弹窗 -->
    <uni-popup ref="smsCodePopup" type="center">
      <view class="smsCodeBox">
        <view class="close" @tap.stop="smsCodeClose">
          <image class="img" src="@/static/images/myimg/close.png"></image>
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
  </view>
</template>

<script>
import {
  updateFileNamer,
  updateMember,
  sendSmsCode,
  useSmsCode,
  createinviteUser
} from '@/api/materialLibrary.js';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      // 表达数据
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
      // 验证规则
      rules: {
        'userInfo.contactMobile': [
          { required: true, message: '请填写手机号' },
          {
            validator: (rule, value, callback) => {
              return uni.$u.test.mobile(value);
            },
            message: '手机号码不正确'
          }
        ],
        'userInfo.wechatCode': [
          { required: true, message: '请上传微信二维码', trigger: ['blur', 'change'] }
        ],
        'userInfo.nickname': [
          { required: true, message: '请输入你的昵称', trigger: ['blur', 'change'] }
        ],
        'userInfo.avatar': [{ required: true, message: '请上传头像', trigger: ['blur', 'change'] }]
      },

      // 上传文件显示列表
      fileList: {
        avatar: [],
        wechatCode: []
      },

      // 表单提交中
      btnLoading: false,

      // 新建门诊
      newClinic: false,

      // 创建员工
      invitationID: 0, // 邀请人的ID
      invitationTenantID: 0, // 邀请门诊的ID

      //手机号验证码
      smsCodeShow: false,
      smsCodeTips: '获取验证码',
      modeDataSmsCode: { contactMobile: '', code: '' },
      rulesSmsCode: {
        contactMobile: [
          { required: true, message: '请填写手机号' },
          {
            validator: (rule, value, callback) => {
              return uni.$u.test.mobile(value);
            },
            message: '手机号码不正确'
          }
        ],
        code: [
          { type: 'number', message: '验证码不正确' },
          { required: true, message: '请输入验证码' },
          { len: 4, message: '验证码不正确' }
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
            this.fileList.avatar = [{ url: this.modeData.userInfo.avatar }];
          }
          // 设置回显二维码
          if (this.modeData.userInfo.wechatCode) {
            this.fileList.wechatCode = [{ url: this.modeData.userInfo.wechatCode }];
          }
        }
      },
      immediate: true
    }
  },
  onLoad({ newClinic, invitationID, invitationTenantID }) {
    console.log(`是否新增门诊-${newClinic}`);
    console.log(`邀请人ID-${invitationID}`);
    console.log(`需要加入的门诊ID-${invitationTenantID}`);

    // 新建门诊,需要补全用户个人信息
    if (Number(newClinic) == 1) {
      this.newClinic = true;
    }

    // 设置邀请人的ID
    this.invitationID = Number(invitationID) || 0;
    // 邀请的门诊ID
    this.invitationTenantID = Number(invitationTenantID) || 0;
  },
  methods: {
    // 移除图片
    deletePic(event) {
      this.fileList[event.name].splice(event.index, 1);
      this.modeData.userInfo[event.name] = '';
    },
    // 上传图片
    async afterRead(event) {
      // console.log(event);
      // 设置显示
      this.fileList[event.name].push({
        ...event.file,
        status: 'uploading',
        message: '上传中'
      });
      const result = await this._$uploadFilePromise(event.file.url);
      // 上传完成设置回显
      this.fileList[event.name].splice(
        0,
        1,
        Object.assign(event.file, {
          status: 'success',
          message: '上传成功',
          url: result
        })
      );
      // 显示数据赋值
      this.modeData.userInfo[event.name] = result;
    },

    // 表单提交
    async mSubmit() {
      if (this.btnLoading) return;

      // 前端表单验证
      try {
        await this.$refs.uForm11.validate();
      } catch (errors) {
        uni.$u.toast(errors[0].message);

        return;
      }

      try {
        // 加载中
        uni.showLoading({
          title: '正在保存中...'
        });
        this.btnLoading = true;

        // 创建新员工
        if (this.invitationID && this.invitationTenantID) {
          // 发送创建员工请求
          await createinviteUser(this.modeData.userInfo, {
            tenantId: this.invitationTenantID
          });
          // 员工创建完成后, 切换门诊
          const url =
            window.location.protocol + '//' + window.location.hostname + '/pages/center/center';
          this._$mCutTenant({ id: this.invitationTenantID }, url);
        } else {
          // 发送修改用户信息请求
          await updateMember(this.modeData.userInfo);
          // 重新获取用户信息
          this.$store.dispatch('ObtainUserInfo');
          // 完成后跳转
          if (this.newClinic) {
            uni.redirectTo({ url: '/pages/tenantInfoInput/tenantInfoInput' });
          } else {
            uni.switchTab({ url: '/pages/center/center' });
          }
        }
      } finally {
        setTimeout(res => {
          // 关闭loading
          this.btnLoading = false;
          uni.hideLoading();
        }, 500);
      }
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
  padding: 0 32rpx 0;
}
.myInfo {
  background-color: $main-color;
  margin: 0 -30rpx;
  padding: 20rpx 30rpx;
  font-size: 26rpx;
  color: #fff;
}

.mBottom {
  height: 240rpx;

  .warpper {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 5;
    background-color: #f5f6f9;
    padding: 20rpx 30rpx 0;
    padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
    box-sizing: border-box;
    .btn {
      background-color: $main-color;
      color: #fff;
      line-height: 2.8;
      font-size: 30rpx;
      border-radius: 20rpx;
    }
  }
}

/* 提示信息 */
.tips {
  margin-bottom: 20rpx;
  font-size: 26rpx;
  color: $main-color;
}

.smsCodeBox {
  position: relative;
  width: 600rpx;
  padding: 50rpx 30rpx 50rpx;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 10rpx;
  .close {
    position: absolute;
    top: 15rpx;
    right: 15rpx;
    .img {
      width: 35rpx;
      height: 35rpx;
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
