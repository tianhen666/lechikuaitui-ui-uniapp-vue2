<template>
  <view class="mBox">
    {{ modeData }}
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
          :fileList="fileList.tenantLog"
          @afterRead="afterRead"
          @delete="deletePic"
          :maxCount="1"
          name="tenantLog"
        ></u-upload>
      </u-form-item>

      <u-form-item label="门诊联系方式" required prop="tenantInfo.name" borderBottom>
        <u--input
          v-model="modeData.tenantInfo.name"
          placeholderStyle="font-size:13px;color:#bbb;"
          fontSize="14px"
          placeholder="请填写门诊名称"
          border="none"
        ></u--input>
      </u-form-item>

      <u-form-item label="门诊联系方式" prop="tenantInfo.contactMobile" borderBottom>
        <u--input
          v-model="modeData.tenantInfo.contactMobile"
          placeholderStyle="font-size:13px;color:#bbb;"
          fontSize="14px"
          placeholder="请填写门诊电话"
          border="none"
        ></u--input>
      </u-form-item>

      <u-form-item
        label="地址"
        @tap="selectAddress"
        required
        prop="tenantInfo.address"
        borderBottom
      >
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
          :fileList="fileList.license"
          @afterRead="afterRead"
          @delete="deletePic"
          :maxCount="1"
          name="license"
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
          <text class="s12" @tap.stop="_$goToPage('/pages/agreement/agreement')">
            口腔推使用协议
          </text>
        </view>
        <button class="btn" :loading="btnLoading" @tap.stop="mSubmit">保存</button>
      </view>
    </view>
  </view>
</template>

<script>
import { saveTenant, updateTenant, getShareTenant } from '@/api/materialLibrary.js';
import wx from '@/wxJsSDK/index.js';
import { mapState } from 'vuex';
import md5 from 'md5';
import { jsonp } from 'vue-jsonp';
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
          creditCode: '' // 社会信用代码
        }
      },
      rules: {
        'tenantInfo.name': {
          type: 'string',
          required: true,
          message: '请填写门诊名称',
          trigger: ['change']
        },
        'tenantInfo.address': {
          type: 'string',
          required: true,
          message: '请填写地址',
          trigger: ['change']
        },
        'tenantInfo.tenantLog': {
          type: 'string',
          required: true,
          message: '请上传门诊logo',
          trigger: ['change']
        }
      },

      // 上传的文件列表
      fileList: {
        tenantLog: [],
        license: []
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
  async onLoad({ id }) {
    // 等待onLaunch 加载完成
    await this.$onLaunched;

    // 赋值门诊ID,并且获取门诊新
    if (id) {
      this.tenantId = Number(id) || 0;
      this.mGetShareTenant();
    }

    // 微信jsdk初始化
    wx.initJssdk();
  },
  methods: {
    // 初始化门诊信息
    initInfo(tenantObj) {
      if (this.tenantId) {
        this.modeData.tenantInfo = tenantObj;
        this.$set(this.modeData.tenantInfo, 'deleted', 0);
        // 设置门诊logo回显列表
        if (this.modeData.tenantInfo.tenantLog) {
          this.fileList.tenantLog = [{ url: this.modeData.tenantInfo.tenantLog }];
        }

        // 设置营业执照回显
        if (this.modeData.tenantInfo.license) {
          this.fileList.license = [{ url: this.modeData.tenantInfo.license }];
        }
      }
    },

    // 删除上传的图片
    deletePic(event) {
      // console.log(event);
      this.fileList[event.name].splice(event.index, 1);
      this.modeData.tenantInfo[event.name] = '';
    },
    // 上传文件读取后执行
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
      this.modeData.tenantInfo[event.name] = result;
    },

    // 获取指定门诊信息
    async mGetShareTenant() {
      const res = await getShareTenant({ tenantId: this.tenantId });
      this.initInfo(res.data);
    },

    // 表单提交
    mSubmit() {
      // 是否在加载中,防止多次提交
      if (this.btnLoading) return;

      this.$refs.uForm11
        .validate()
        .then(async res => {
          // 验证协议
          if (this.checkboxValue1[0] === '同意') {
            // 接口提交中
            this.btnLoading = true;
            let resObj = {};
            // 有门诊ID代表修改
            if (this.tenantId) {
              resObj = await updateTenant(this.modeData.tenantInfo);
            } else {
              // 没有门诊ID代码新建
              resObj = await saveTenant(this.modeData.tenantInfo);
            }
            // 有门诊ID完成跳转逻辑
            if (this.tenantId) {
              const pages = getCurrentPages();
              if (pages.length > 1) {
                uni.navigateBack();
              } else {
                uni.switchTab({
                  url: '/pages/center/center'
                });
              }
            } else {
              // 没有门诊ID处理逻辑,完成切换逻辑
              this._$mCutTenant(resObj.data);
            }
          } else {
            uni.$u.toast('请勾选协议');
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
    },

    /** 选择地址 */
    selectAddress() {
      wx.getLocation(res => {
        this.getGeoCoder({
          key: 'V7JBZ-7TH3B-E5BUD-JK4VW-5ZMX3-5MFW7',
          SK: 'ibgtzO6SulorVO6BSxPqUVPtNIrY2my7',
          latitude: res.latitude,
          longitude: res.longitude,
          location: `${res.latitude},${res.longitude}`
        }).then(res111 => {
          console.log(res111);
        });
      });
    },

    /** 腾讯地图jsonp*/
    getGeoCoder(param) {
      let sig = md5(
        `/ws/geocoder/v1?callback=jsonpCallback&key=${param.key}&location=${param.latitude},${
          param.longitude
        }&output=jsonp${param.SK}`
      );
      // sig = encodeURI(sig); //url化一下
      let getData = {
        callbackQuery: 'callback',
        callbackName: 'jsonpCallback',
        key: param.key,
        location: param.location,
        output: 'jsonp',
        sig
      };
      //签名失败的解决办法 https://lbs.qq.com/faq/serverFaq/webServiceKey
      return jsonp('https://apis.map.qq.com/ws/geocoder/v1', getData);
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
