<template>
  <view class="mBox">
    <u-toast ref="uToast"></u-toast>
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

      <u-form-item label="姓名" prop="userInfo.nickName" borderBottom>
        <u--input
          v-model="modeData.userInfo.nickName"
          placeholder="请填写姓名"
          border="none"
          clearable
          fontSize="14px"
          placeholderStyle="font-size:14px;color:#bbb;"
        ></u--input>
      </u-form-item>

      <u-form-item label="手机号码" required prop="userInfo.mobile" borderBottom>
        <u--input
          type="number"
          v-model="modeData.userInfo.mobile"
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

      <u-form-item label="微信二维码提示信息" prop="userInfo.remark" borderBottom>
        <u--input
          v-model="modeData.userInfo.remark"
          placeholder="请填写微信二维码提示信息"
          border="none"
          fontSize="14px"
          placeholderStyle="font-size:14px;color:#bbb;"
        ></u--input>
      </u-form-item>
    </u--form>

    <view class="mBottom">
      <view class="warpper">
        <button :loading="btnLoading" class="btn" @tap.stop="mSubmit">保存</button>
      </view>
    </view>
  </view>
</template>

<script>
import { updateFileNamer, createinviteUser } from '@/api/materialLibrary.js';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      invitationTenantID: 0, // 需要加入的门诊ID

      modeData: {
        userInfo: {
          id: 0,
          nickName: '',
          avatar: '',
          mobile: '',
          slogan: '',
          wxCode: '',
          wechatCode: '',
          remark: '',
          postIds: [],
          position: '',
          tenantId: 0 // 必填
        }
      },
      rules: {
        'userInfo.mobile': [
          {
            type: 'string',
            required: true,
            message: '请填写手机号',
            trigger: ['blur', 'change']
          },
          {
            validator: (rule, value, callback) => {
              return uni.$u.test.mobile(value);
            },
            message: '手机号码不正确',
            trigger: ['change', 'blur']
          }
        ],
        'userInfo.wechatCode': [
          {
            type: 'string',
            required: true,
            message: '请上传微信二维码',
            trigger: ['blur', 'change']
          }
        ]
      },
      userInfoAvatarFileList: [],
      userInfoWechatCodeFileList: [],
      btnLoading: false
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
            nickName: newValue.nickname || newValue.snickName,
            avatar: newValue.avatar || newValue.savatar,
            mobile: newValue.mobile,
            slogan: newValue.slogan || '关爱您的每一颗牙',
            wxCode: newValue.wxCode,
            wechatCode: newValue.wechatCode,
            remark: newValue.remark || '长按识别添加微信',
            postIds: [],
            position: '',
            tenantId: 0
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
  onLoad({ invitationID, invitationTenantID }) {
    console.log(`邀请人ID-${invitationID}`);
    console.log(`需要加入的门诊ID-${invitationTenantID}`);

    // 设置邀请人的ID
    this.invitationID = Number(invitationID) || 0;
    // 邀请的门诊ID
    this.invitationTenantID = Number(invitationTenantID) || 0;
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
      this.$refs.uForm11
        .validate()
        .then(res => {
          // 加载中
          uni.showLoading({
            title: '正在保存中...'
          });
          this.btnLoading = true;

          // 需要加入哪家门诊 赋值门诊ID
          this.modeData.userInfo.tenantId = this.invitationTenantID;
          createinviteUser(this.modeData.userInfo).then(res => {
            setTimeout(res => {
              this.btnLoading = false;
              // 关闭loading
              uni.hideLoading();

              // 清空缓存,应为邀请员工成功后会自动切换门诊
              uni.clearStorage();

              // 设置切换的缓存
              uni.setStorageSync('TENANTID', this.invitationTenantID);

              // 重新打开当前网页
              const protocol = window.location.protocol;
              const host = window.location.host;

              // 重定向到个人中心
              const newHref = protocol + '//' + host + '/pages/center/center';

              //重新获取授权链接
              this.$store
                .dispatch('getWXSocialAuthRedirect', { type: 31, redirectUri: newHref })
                .then(res => {
                  window.location.href = res;
                });
            }, 1000);
          });
        })
        .catch(errors => {
          this.btnLoading = false;
          uni.$u.toast(errors[0].message);
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
