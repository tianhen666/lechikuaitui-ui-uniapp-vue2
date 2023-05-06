import jWeixin from 'weixin-js-sdk'
import {
  isWechat
} from '@/utils/index.js'
export default {

  /* 获取sdk初始化配置 */
  initJssdk(callback) {

    if (!isWechat()) {
      console.log("请用在微信内打开")
      return false
    }

    uni.$u.http.request({
      url: `/member/wx-mp/create-jsapi-signature`,
      method: "post",
      params: {
        url: window.location.href
      },
    }).then((res) => {
      jWeixin.config({
        debug: false, // 开启调试模式
        appId: res.data.appId, // 必填，公众号的唯一标识
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
        signature: res.data.signature, // 必填，签名
        jsApiList: ['openLocation', 'getLocation', 'updateAppMessageShareData',
          'updateTimelineShareData', 'onMenuShareAppMessage'
        ], // 必填，需要使用的JS接口列表
        openTagList: ['wx-open-launch-weapp'] // 非必填，
      });


      /* **  api检测 ** */
      jWeixin.checkJsApi({
        jsApiList: ['openLocation', 'getLocation', 'updateAppMessageShareData',
          'updateTimelineShareData', 'onMenuShareAppMessage'
        ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        openTagList: ['wx-open-launch-weapp'] // 需要检测的微信公众号开放标签,
      });

      if (callback) {
        callback(res.data);
      }
    })
  },
  //在需要定位页面调用
  getLocation: function(data) {
    jWeixin.ready(() => {
      jWeixin.getLocation({
        type: 'gcj02',
        // success: function(res) {
        //   callback(res)
        // },
        // fail: function(res) {
        //   console.log(res)
        // },
      });
    });
  },
  //打开位置
  openLocation: function(data) {
    jWeixin.ready(() => {
      jWeixin.openLocation({ //根据传入的坐标打开地图
        latitude: data.latitude,
        longitude: data.longitude,
        name: data.name, // 位置名
        address: data.address, // 地址详情说明
        scale: data.scale // 地图缩放级别,整型值,范围从1~28。默认为最大
      });
    });
  },

  // 分享给朋友
  updateAppMessageShareData(data) {
    jWeixin.ready(() => {
      jWeixin.updateAppMessageShareData({
        title: data.title, // 分享标题
        desc: data.desc, // 分享描述
        link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: data.imgUrl, // 分享图标
        success: () => {
          // 设置成功
          // console.log("朋友分享测试")
        }
      })
    });
  },

  // 分享到朋友圈
  updateTimelineShareData(data) {
    jWeixin.ready(() => {
      jWeixin.updateTimelineShareData({
        title: data.title, // 分享标题
        link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: data.imgUrl, // 分享图标
        success: () => {
          // 设置成功
          // console.log('朋友圈分享测试')
        }
      })
    });
  },

  // 点击按钮分享(即将废弃)
  onMenuShareAppMessage(data) {
    jWeixin.ready(() => {
      jWeixin.onMenuShareAppMessage({
        title: data.title, // 分享标题
        desc: data.desc, // 分享描述
        link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: data.imgUrl, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: () => {
          // 设置成功
          console.log('朋友分享测试')
        }
      })
    });
  }
}