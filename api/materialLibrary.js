//请求工具参考https://ext.dcloud.net.cn/plugin?id=392
const { http } = uni.$u

// 获取素材分页
export const getSourceMaterial = params => http.get('/yxx/source-material/page', { params })

// 获取分类
export const getClassIfyList = params => http.post('/yxx/source-material/getClassIfyList', {}, { params })

// 获取素材详情
export const getSourceMaterialId = params => http.get('/yxx/source-material/get', { params })

// 获取门诊租户详情
export const getTenant = params => http.get('/yxx/tenant/get', { params })

// 获取个人信息接口
export const getTenantUser = params => http.get('/yxx/tenant/getTenantUser', { params })


//获取每日分享
export const getshareEveryDay = data => http.post('/yxx/source-material/getshareEveryDay', data)

// 数据总揽
export const getSourceMaterialDataViewDO = data => http.post('/yxx/source-material/getSourceMaterialDataViewDO', data)

// 线索列表
export const getMemberUserList = data => http.post('/yxx/source-material/getMemberUserList', data)


// 根据用户查询看了哪些资源
export const getMemberUserOneList = params => http.post('/yxx/source-material/getMemberUserOneList', {}, { params })

// 根据资源,查询用户
export const getSourceMaterialDetailsViewDO = params => http.post(
  '/yxx/source-material/getSourceMaterialDetailsViewDO', {}, { params })

// 获取个人中心页面信息
export const getMemberUser = params => http.get('/yxx/memberUser/get', { params })


// 行为记录
export const getClueRecordBehavior = params => http.post('/yxx/source-material/getClueRecordBehavior', {}, { params })