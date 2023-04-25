//1.{}里包裹的是每一个视频的参数
const userList = [{ //1
  "_id": "60ee559d9dad850001bf5956", //1.每一个视频独有 id （自定义）
  "username": "意识到", //2.视频拥有者名称
  "href": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-2908110e-6da2-4899-8b44-d45c153457ad/247c9ea8-c708-440b-9dbf-3c3facb728ee.png", //3.头像
  "title": "标题123131", //4.第一行标题
  "msg": "#mood", //5.第二行内容
  "state": "pause", //6.初始状态标志（不改）
  "like": 0, //7.是否是自己喜欢，0不喜欢，1喜欢。默认不喜欢
  "like_n": 0, //8.喜欢数量
  "sms_n": 0, //9.评论数
  "src": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-2908110e-6da2-4899-8b44-d45c153457ad/710b0cf7-bed9-4805-a2fb-0b703483dbec.MOV", //10.视频链接
  "playNumber": 0, //11.播放视频的数量
  "pinlun": [], //12.评论
  "playIng": false, //13.播放（默认这个即可）
  "isShowimage": false, //14.是否显示封面（默认这个即可）
  "isShowProgressBarTime": false, //15.是否显示进度条（默认这个即可）
  "isplay": true //16.是否播放音频（默认这个即可）
}, { //2
  "_id": "60eddc3e9dad850001bdaa56",
  "username": "阿水的哈",
  "href": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-2908110e-6da2-4899-8b44-d45c153457ad/247c9ea8-c708-440b-9dbf-3c3facb728ee.png",
  "title": "11111111",
  "msg": "像不像你妈看见你打游戏时的样子",
  "state": "pause",
  "like": 0,
  "like_n": 0,
  "sms_n": 4,
  "src": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-2908110e-6da2-4899-8b44-d45c153457ad/ec383f81-6896-4274-8861-e329ae1376b4.mp4",
  "playNumber": 0,
  "pinlun": [],
  "playIng": false,
  "isShowimage": false,
  "isShowProgressBarTime": false,
  "isplay": true
}, { //3
  "_id": "60edc229f3ff4f000138cb76",
  "username": "阿斯达达",
  "href": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-2908110e-6da2-4899-8b44-d45c153457ad/247c9ea8-c708-440b-9dbf-3c3facb728ee.png",
  "title": "",
  "msg": "最向往的地方-林俊杰",
  "state": "pause",
  "like": 0,
  "like_n": 0,
  "sms_n": 0,
  "src": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-0455454d-b373-4768-aa39-dc1226fc1362/53543262-55f5-4685-a5e3-b56ce75bcb88.mp4",
  "playNumber": 0,
  "pinlun": [],
  "playIng": false,
  "isShowimage": false,
  "isShowProgressBarTime": false,
  "isplay": true
}, { //4
  "_id": "60edc16570f7740001aa165a",
  "username": "阿斯顿",
  "href": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-2908110e-6da2-4899-8b44-d45c153457ad/247c9ea8-c708-440b-9dbf-3c3facb728ee.png",
  "title": "",
  "msg": "Ring Ring Ring",
  "state": "pause",
  "like": 0,
  "like_n": 0,
  "sms_n": 0,
  "src": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-0455454d-b373-4768-aa39-dc1226fc1362/bfc86ab8-bb3b-4cef-a5d2-8c5edce4ef17.mp4",
  "playNumber": 0,
  "pinlun": [],
  "playIng": false,
  "isShowimage": false,
  "isShowProgressBarTime": false,
  "isplay": true
}, { //5
  "_id": "60edbacf5e31f50001a66f9c",
  "username": "史蒂夫",
  "href": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-2908110e-6da2-4899-8b44-d45c153457ad/247c9ea8-c708-440b-9dbf-3c3facb728ee.png",
  "title": "",
  "msg": "有何不可",
  "state": "pause",
  "like": 0,
  "like_n": 0,
  "sms_n": 3,
  "src": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-0455454d-b373-4768-aa39-dc1226fc1362/5017a17a-389b-45e0-8d91-711c9dc76759.mp4",
  "playNumber": 0,
  "pinlun": [],
  "playIng": false,
  "isShowimage": false,
  "isShowProgressBarTime": false,
  "isplay": true
}, { //6
  "_id": "60ed95fa01033700016f1acf",
  "username": "阿斯达",
  "href": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-2908110e-6da2-4899-8b44-d45c153457ad/247c9ea8-c708-440b-9dbf-3c3facb728ee.png",
  "title": "",
  "msg": "破茧",
  "state": "pause",
  "like": 0,
  "like_n": 0,
  "sms_n": 2,
  "src": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-0455454d-b373-4768-aa39-dc1226fc1362/209180d8-3dfd-42ea-9ef5-5f98ae0d95e1.mp4",
  "playNumber": 0,
  "pinlun": [],
  "playIng": false,
  "isShowimage": false,
  "isShowProgressBarTime": false,
  "isplay": true
}, { //7
  "_id": "60e8dd308a69dc0001f1435a",
  "username": "很久很久",
  "href": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-2908110e-6da2-4899-8b44-d45c153457ad/247c9ea8-c708-440b-9dbf-3c3facb728ee.png",
  "title": "",
  "msg": "后会无期-徐良-汪苏泷",
  "state": "pause",
  "like": 0,
  "like_n": 0,
  "sms_n": 1,
  "src": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-0455454d-b373-4768-aa39-dc1226fc1362/c8f7a17f-6eb8-453a-9f43-944ecc7a9f11.mp4",
  "playNumber": 0,
  "pinlun": [],
  "playIng": false,
  "isShowimage": false,
  "isShowProgressBarTime": false,
  "isplay": true
}, { //8
  "_id": "60e86d052881d300012eb3e9",
  "username": "哈哈哈哈哈",
  "href": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-2908110e-6da2-4899-8b44-d45c153457ad/247c9ea8-c708-440b-9dbf-3c3facb728ee.png",
  "title": "",
  "msg": "笑死了哈哈哈哈哈",
  "state": "pause",
  "like": 0,
  "like_n": 0,
  "sms_n": 0,
  "src": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-2908110e-6da2-4899-8b44-d45c153457ad/f905c750-c70e-46b2-aaa6-37778d308f13.mp4",
  "playNumber": 0,
  "pinlun": [],
  "playIng": false,
  "isShowimage": false,
  "isShowProgressBarTime": false,
  "isplay": true
}, { //9
  "_id": "60e86b658a69dc0001f003ae",
  "username": "望·即",
  "href": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-2908110e-6da2-4899-8b44-d45c153457ad/247c9ea8-c708-440b-9dbf-3c3facb728ee.png",
  "title": "",
  "msg": "Justin Biber- As long as you love me",
  "state": "pause",
  "like": 0,
  "like_n": 0,
  "sms_n": 0,
  "src": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-0455454d-b373-4768-aa39-dc1226fc1362/9392e85c-36db-473f-8ec3-4f8ed83a382a.mp4",
  "playNumber": 0,
  "pinlun": [],
  "playIng": false,
  "isShowimage": false,
  "isShowProgressBarTime": false,
  "isplay": true
}, { //10
  "_id": "60e86a9e9056cd000110da51",
  "username": "user",
  "href": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-2908110e-6da2-4899-8b44-d45c153457ad/247c9ea8-c708-440b-9dbf-3c3facb728ee.png",
  "title": "",
  "msg": "苹果2019年发布会开场动画",
  "state": "pause",
  "like": 0,
  "like_n": 0,
  "sms_n": 0,
  "src": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-0455454d-b373-4768-aa39-dc1226fc1362/e1cd785e-56ae-4c96-a713-126bf2950e19.mp4",
  "playNumber": 0,
  "pinlun": [],
  "playIng": false,
  "isShowimage": false,
  "isShowProgressBarTime": false,
  "isplay": true
}, {
  //11
  "_id": "60e86a9e9056cd000110da5q",
  "username": "user",
  "href": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-2908110e-6da2-4899-8b44-d45c153457ad/247c9ea8-c708-440b-9dbf-3c3facb728ee.png",
  "title": "",
  "msg": "每天笑一笑",
  "state": "pause",
  "like": 0,
  "like_n": 0,
  "sms_n": 0,
  "src": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-2908110e-6da2-4899-8b44-d45c153457ad/97b50a6d-f77d-4418-b38d-844e0b9eec97.mp4",
  "playNumber": 0,
  "pinlun": [],
  "playIng": false,
  "isShowimage": false,
  "isShowProgressBarTime": false,
  "isplay": true
}, {
  //12
  "_id": "60e86a9e9026cd000119da5q",
  "username": "user",
  "href": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-2908110e-6da2-4899-8b44-d45c153457ad/247c9ea8-c708-440b-9dbf-3c3facb728ee.png",
  "title": "",
  "msg": "老外真会玩",
  "state": "pause",
  "like": 0,
  "like_n": 0,
  "sms_n": 0,
  "src": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-2908110e-6da2-4899-8b44-d45c153457ad/c061b07a-4b34-4d6d-aa1a-2cf41679f17c.mp4",
  "playNumber": 0,
  "pinlun": [],
  "playIng": false,
  "isShowimage": false,
  "isShowProgressBarTime": false,
  "isplay": true
}]
export default userList;