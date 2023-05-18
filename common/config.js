module.exports = {
  //后端接口地址 http://192.168.5.113:48080/app-api
  baseUrl: process.env.NODE_ENV === 'development' ? 'http://api.lechiwl.cn/app-api' : 'http://api.lechiwl.cn/app-api',
  // 超时
  timeout: 30000,
  // 禁用 Cookie 等信息
  withCredentials: false,
  header: {
    //租户ID
    'tenant-id': uni.getStorageSync('TENANTID') || 1
  }
}