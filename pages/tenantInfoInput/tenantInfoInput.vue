<template>
  <view class="mBox">
    <u--form
      labelPosition="top"
      labelWidth="auto"
      :model="modeData"
      :rules="rules"
      :labelStyle="{ color: '#666', fontSize: '30rpx' }"
      ref="uForm11"
    >
      <u-form-item label="门诊logo上传" required prop="tenantInfo.tenantLog">
        <u-upload
          :fileList="fileList.tenantLog"
          @afterRead="afterRead"
          @delete="deletePic"
          :maxCount="1"
          name="tenantLog"
        ></u-upload>
      </u-form-item>

      <u-form-item label="门诊名称" required prop="tenantInfo.name">
        <u--input
          v-model="modeData.tenantInfo.name"
          placeholderStyle="font-size:13px;color:#bbb;"
          fontSize="14px"
          placeholder="请填写门诊名称"
        ></u--input>
      </u-form-item>
      <view class="tips"><text class="text1">字符长度, 限制2-30字之间</text></view>

      <u-form-item label="门诊联系方式" prop="tenantInfo.contactMobile" required>
        <u--input
          v-model="modeData.tenantInfo.contactMobile"
          placeholderStyle="font-size:13px;color:#bbb;"
          fontSize="14px"
          placeholder="请填写门诊电话"
        ></u--input>
      </u-form-item>
      <view class="tips"><text class="text1">方便用户通过此电话联系你的门店</text></view>

      <u-form-item label="地址" required prop="tenantInfo.address">
        <u-textarea
          @focus="focusAddress"
          @input="inputAddress"
          v-model="modeData.tenantInfo.address"
          placeholder="请填写门诊地址"
          fontSize="14px"
          placeholderStyle="font-size:13px;color:#bbb;"
        ></u-textarea>
      </u-form-item>
      <view class="tips">
        <text>
          {{ `经度:${modeData.tenantInfo.lng || 0}, 维度:${modeData.tenantInfo.lat || 0}` }}
        </text>
        <text class="text1" @tap="_$goToPage('/pages/chooseLocation/chooseLocation')">
          打开地图选择地址
        </text>
      </view>

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
        <button class="btn" :loading="btnLoading" @tap.stop="mSubmit">保存提交</button>
      </view>
    </view>
  </view>
</template>

<script>
import { saveTenant, updateTenant, getShareTenant } from '@/api/materialLibrary.js';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      checkboxList1: [{ name: '同意' }],
      checkboxValue1: [],

      // 表单数据
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

      // 表单验证规则
      rules: {
        'tenantInfo.name': {
          type: 'string',
          required: true,
          message: '请填写门诊名称',
          trigger: ['change']
        },
        'tenantInfo.contactMobile': {
          type: 'string',
          required: true,
          message: '门诊电话不能为空',
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
        event.index,
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
    async mSubmit() {
      // 是否在加载中,防止多次提交
      if (this.btnLoading) return;

      // 前端表单验证
      try {
        await this.$refs.uForm11.validate();
      } catch (errors) {
        uni.$u.toast(errors[0].message);

        return;
      }

      // 没有勾选协议
      if (this.checkboxValue1[0] != '同意') {
        uni.$u.toast('请勾选协议');
        return;
      }

      try {
        // 加载中
        uni.showLoading({
          title: '正在保存中...'
        });
        this.btnLoading = true;

        // 有门诊ID代表修改
        if (this.tenantId) {
          // 更新门诊接口
          await updateTenant(this.modeData.tenantInfo);
          // 跳转到个人中心
          uni.switchTab({ url: '/pages/center/center' });
          // 重新获取门诊信息
          this.$store.dispatch('getTenantInfo');
          return;
        } else {
          // 没有门诊ID代码新建

          // 调用新建门诊接口
          const resObj = await saveTenant(this.modeData.tenantInfo);

          // 新建完成后切换门诊逻辑
          const url =
            window.location.protocol + '//' + window.location.hostname + '/pages/center/center';
          this._$mCutTenant(resObj.data, url);
        }
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
    },
    /** 选择地址 */
    focusAddress(e) {
      if (!e.detail.value) {
        this._$goToPage('/pages/chooseLocation/chooseLocation');
      }
    },
    /** 选择地址 */
    inputAddress(e) {
      if (!e) {
        this._$goToPage('/pages/chooseLocation/chooseLocation');
      }
    },
    /**  设置地址 */
    setAddress(res) {
      this.modeData.tenantInfo.address = res.address;
      this.modeData.tenantInfo.lat = res.latitude;
      this.modeData.tenantInfo.lng = res.longitude;
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
  height: 240rpx;
  .warpper {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 5;
    background-color: #f5f6f9;
    padding: 20rpx 30rpx 0;
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

.tips {
  font-size: 26rpx;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx;
  .text1 {
    color: $main-color;
  }
}
</style>
