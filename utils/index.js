// 判断是否微信环境
export function isWechat() {
  //获取user-agaent标识头
  var ua = window.navigator.userAgent.toLowerCase();
  //判断ua和微信浏览器的标识头是否匹配
  if (ua.match(/micromessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}

// 获取url中参数
export function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
  var context = "";
  if (r != null)
    context = decodeURIComponent(r[2]);
  reg = null;
  r = null;
  return context == null || context == "" || context == "undefined" ? "" : context;
}