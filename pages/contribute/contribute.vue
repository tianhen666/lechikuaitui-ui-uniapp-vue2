<template>
  <view class="contribute">
    <u--form labelPosition="top" labelWidth="auto" :model="formData" :rules="rules" ref="uForm11">
      <!-- 名称 -->
      <u-form-item label="名称" prop="name" required>
        <u--input v-model="formData.name" placeholder="请输入名称"></u--input>
      </u-form-item>

      <!-- 描述 -->
      <u-form-item label="描述" prop="description">
        <u--textarea
          v-model="formData.description"
          placeholder="请输入描述内容"
          count
        ></u--textarea>
      </u-form-item>

      <!-- 素材类型 -->
      <u-form-item label="素材类型" required>
        <u-radio-group v-model="formData.type" placement="row" @change="classGroupChange">
          <u-radio
            :customStyle="{ marginRight: '18px', marginTop: '10px' }"
            v-for="(item, index) in radiolist1"
            :key="index"
            :label="item.name"
            :name="item.type"
          ></u-radio>
        </u-radio-group>
      </u-form-item>

      <!-- 分类 -->
      <u-form-item
        label="素材子分类"
        @tap="
          classShow = true;
          hideKeyboard();
        "
        required
        prop="classId"
        borderBottom
      >
        <u--input :value="cpCurrentClass" placeholder="请选择分类" border="none"></u--input>
        <u-icon slot="right" name="arrow-right"></u-icon>
      </u-form-item>
      <u-picker
        :show="classShow"
        :columns="classColumns"
        @confirm="classConfirm"
        @cancel="classShow = false"
        @change="classChangeHandler"
        @close="classShow = false"
        closeOnClickOverlay
        ref="uPicker"
        keyName="name"
      ></u-picker>

      <!-- 上传海报 -->
      <u-form-item v-if="formData.type === 3" label="上传海报" required prop="content" borderBottom>
        <htz-image-upload
          mediaType="image"
          v-model="contentFileList"
          @chooseSuccess="afterRead1"
          @imgDelete="deletePic1"
          :dataType="1"
          :compress="false"
        ></htz-image-upload>
      </u-form-item>

      <!-- 上传视频 -->
      <u-form-item v-if="formData.type === 2" label="上传视频" required prop="content" borderBottom>
        <htz-image-upload
          mediaType="video"
          v-model="contentFileList"
          @chooseSuccess="afterRead1"
          @imgDelete="deletePic1"
          :dataType="1"
          :compress="false"
        ></htz-image-upload>
      </u-form-item>

      <!-- 上传文章封面图 -->
      <u-form-item v-if="formData.type === 1" label="上传文章封面图" required prop="coverImage">
        <htz-image-upload
          mediaType="image"
          v-model="coverImageList"
          @chooseSuccess="afterRead2"
          @imgDelete="deletePic2"
          :dataType="1"
          :compress="false"
        ></htz-image-upload>
      </u-form-item>

      <!-- 文章内容 -->
      <u-form-item v-if="formData.type === 1" required label="文章内容" prop="content">
        <u--textarea v-model="formData.content" placeholder="请输入文章内容内容"></u--textarea>
      </u-form-item>
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
import {
  getSourceMaterial,
  getClassIfyList,
  updateFileNamer,
  createSourceMaterial
} from '@/api/materialLibrary.js';
export default {
  data() {
    return {
      //  表单数据
      formData: {
        name: '',
        description: '',
        classId: '',
        type: 1,
        status: 0,
        content: '',
        coverImage: ''
      },
      //表单提交loading
      btnLoading: false,
      // 表单验证
      rules: {
        name: {
          type: 'string',
          required: true,
          message: '素材名称不能为空',
          trigger: ['change']
        },
        classId: {
          type: 'number',
          required: true,
          message: '分类ID不能为空',
          trigger: ['change']
        },
        content: {
          type: 'string',
          required: true,
          message: '素材内容不能为空',
          trigger: ['change']
        }
      },

      // 分类选择
      radiovalue1: 1,
      radiolist1: [{ name: '文章', type: 1 }, { name: '视频', type: 2 }, { name: '海报', type: 3 }],
      classShow: false,
      classColumns: [], // 子分类数据,
      currentClass: [], // 当前选中的分类

      // 上传内容的预览列表
      contentFileList: [],

      // 封面图上传列表
      coverImageList: []
    };
  },
  computed: {
    cpCurrentClass() {
      let str = '';
      if (this.currentClass[0]) {
        str += this.currentClass[0].name;
      }
      if (this.currentClass[1]) {
        str += `,${this.currentClass[1].name}`;
      }
      return str;
    }
  },
  methods: {
    // 不弹出输入法
    hideKeyboard() {
      uni.hideKeyboard();
    },
    // 选择大分类
    classGroupChange(e) {
      this.mGetClassIfyList(e);
      this.formData.content = '';
      this.formData.coverImage = '';
      this.coverImageList = [];
      this.contentFileList = [];
    },
    // 子分类选择
    classChangeHandler(e) {
      const { columnIndex, value, values, index, picker = this.$refs.uPicker } = e;
      if (columnIndex === 0) {
        picker.setColumnValues(1, this.classColumns[0][index].childrenList);
      }
    },
    // 选择分类确认
    classConfirm(e) {
      const { value } = e;
      if (value[1]) {
        this.formData.classId = value[1].id;
      } else {
        this.formData.classId = value[0].id;
      }
      this.currentClass = value;
      this.classShow = false;
    },
    // 获取分类数据
    async mGetClassIfyList(type) {
      const res = await getClassIfyList({
        sourceMaterialType: type
      });
      this.classColumns.splice(0, 1, res.data);
      this.classColumns.splice(1, 1, res.data[0].childrenList);
      this.currentClass = [];
      this.$refs.uPicker.setIndexs([0, 0]);
    },
    // 删除列表
    deletePic1(event) {
      this.formData.content = '';
    },
    deletePic2(event) {
      this.formData.coverImage = '';
    },

    // 上传内容
    async afterRead1(tempFilePaths, type) {
      uni.showLoading({
        title: '上传中'
      });
      const result = await this.uploadFilePromise(tempFilePaths[0]);

      // 上传成功,重新设置显示列表
      this.formData.content = result;
      if (this.formData.type === 3) {
        this.contentFileList.push({ type: 0, url: tempFilePaths[0] });
      } else if (this.formData.type === 2) {
        this.contentFileList.push({ type: 1, url: tempFilePaths[0] });
      }
      uni.hideLoading();
    },
    async afterRead2(tempFilePaths, type) {
      uni.showLoading({
        title: '上传中'
      });
      const result = await this.uploadFilePromise(tempFilePaths[0]);

      // 上传成功,重新设置显示列表
      this.formData.coverImage = result;
      this.coverImageList.push({ type: 0, url: tempFilePaths[0] });
      uni.hideLoading();
    },
    // 上传接口
    uploadFilePromise(url) {
      return new Promise((resolve, reject) => {
        updateFileNamer(url).then(res => {
          resolve(res);
        });
      });
    },

    // 表单提交
    mSubmit() {
      // 是否在加载中,防止多次提交
      if (this.btnLoading) return;

      this.$refs.uForm11
        .validate()
        .then(async res => {
          // 验证通过
          uni.showLoading({
            title: '正在保存中...'
          });
          this.btnLoading = true;

          // 数据提交
          const resObj = await createSourceMaterial(this.formData);

          setTimeout(() => {
            this.btnLoading = false;
            // 关闭loading
            uni.hideLoading();

            uni.navigateBack();
          }, 1000);
        })
        .catch(errors => {
          if (errors[0]) {
            uni.$u.toast(errors[0].message);
          }
        });
    }
  },
  onReady() {
    this.$refs.uForm11.setRules(this.rules);
    this.mGetClassIfyList(this.formData.type);
  }
};
</script>
<style scoped lang="scss">
page {
  background-color: #fff;
}
.contribute {
  padding: 0 30rpx;
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
</style>
