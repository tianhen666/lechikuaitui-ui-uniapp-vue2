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

// 全局唯一标识符
export function guid(len = 32, firstU = true, radix = null) {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  let uuid = [];
  radix = radix || chars.length;
  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (let i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    let r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}


// 删除指定url中参数
export function removeUrlParameters(url, parameters) {
  // 将URL分解为基本部分和查询字符串
  var urlParts = url.split("?");
  if (urlParts.length >= 2) {
    // 将查询字符串分解为参数数组
    var params = urlParts[1].split("&");
    // 构造新的查询字符串
    var newParams = [];
    for (var i = 0; i < params.length; i++) {
      var paramParts = params[i].split("=");
      if (!parameters.includes(paramParts[0])) {
        newParams.push(params[i]);
      }
    }
    // 如果有新的查询字符串，则将其添加到基本URL中
    if (newParams.length > 0) {
      return urlParts[0] + "?" + newParams.join("&");
    } else {
      return urlParts[0];
    }
  } else {
    // 如果没有查询字符串，则返回原始URL
    return url;
  }
}

// 延时函数
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}