if (weex.config.platform == 'Web') {
  const Cookies = require('cookies-js');
  //require('whatwg-fetch');
  //const fetchJsonp = require('fetch-jsonp');
  const stream = weex.requireModule('stream');
  var wxSDK = require('./wechatSDK');

  weex.registerModule('shopEvent', {
    trigger(eventName, arg, callback) {
      switch (eventName) {
        case 'login':
          let url = '';
          let protocol = location.protocol;

          if (arg == '') {
            url = "//m.mi.com/v1/authorize/sso?client_id=180100031013&callback=" + encodeURIComponent(location.href);
            location.href = url;
          } else {
            arg = JSON.parse(arg);
            if (arg.domain === 'i.huodong.mi.com') {
              url = "//m.mi.com/v1/authorize/sso?client_id=180100031013&callback=" + encodeURIComponent(protocol + '//i.huodong.mi.com/user/mjump?srcUrl=' + location.href);
              location.href = url;
            }
          }
          break;
        case 'showPlugin':
          arg = JSON.parse(arg);
          if (arg.type == 'product') {
            location.href = '//m.mi.com/#/product/view?product_id=' + arg.extra.commodityId;
          } else if (arg.type == 'list') {
            location.href = '//m.mi.com/#/product/list?id=' + arg.extra.extra_category_id;
          }
          break;
        case 'product':
          location.href = '//m.mi.com/#/product/view?product_id=' + arg;
          break;
        case 'goCart':
          location.href = '//m.mi.com/#/cart/index';
          break;
        case 'getDeviceid':
        case 'getHashDeviceid':
        case 'getPhones':
        case 'getEncryptUid':
        case 'getShopDeviceid':
          callback && callback({ error: null, data: '' });
          break;
        case 'hasLogin':
          if (arg == '') {
            if (Cookies('userId') || Cookies('cUserId')) {
              callback && callback({ error: null, data: true });
            } else {
              callback && callback({ error: null, data: false });
            }
          } else {
            arg = JSON.parse(arg);
            if (arg.domain === 'i.huodong.mi.com') {
              stream.fetch({
                method: 'GET',
                type: 'jsonp',
                headers: {},
                body: '',
                url: '//i.huodong.mi.com/site/islogin'
              }, function(response) {
                if (response.ok) {
                  if (response.data.code === 1) {
                    callback && callback({ error: null, data: 0 });
                  } else if (response.data.code === -1) {
                    callback && callback({ error: null, data: 1 });
                  }
                } else {
                  callback && callback({ error: null, data: 2 });
                }
              });
            }
          }
          break;
        case 'openBrowser':
          if (arg) {
            location.href = decodeURIComponent(arg);
          }
          break;
        case 'fCode':
          location.href = '//m.mi.com/#/fcode';
          break;
        case 'openCommunity':
          location.href = '//bbs.xiaomi.cn/';
          break;
        case 'goHome':
          location.href = '//m.mi.com/';
          break;
        case 'orderList':
          location.href = '//m.mi.com/#/order/list';
          break;
        case 'goCoupon':
          location.href = '//m.mi.com/#/user/coupon';
          break;
        case 'isWifi':
          callback && callback({ error: null, data: 2 });
          break;
        case 'weibo':
          if (arg) {
            arg = JSON.parse(arg);
            location.href = "http://service.weibo.com/share/share.php?title=" +
              arg.text +
              "&pic=" + arg.image +
              "&url=" + arg.url || encodeURIComponent(location.href);
          }
          break;
        case 'customTitle':
          document.title = arg;
          callback && callback({ error: null, data: null });
          break;
        case 'addCart':
          if (arg) {
            arg = JSON.parse(arg);
          }

          stream.fetch({
            method: 'GET',
            type: 'jsonp',
            headers: {},
            body: 'framework=weex&client_id=180100031051' + '&product_id=' + arg.product_id + '&consumption=' + arg.consumption,
            url: '//m.mi.com/v1/cart/add'
          }, function(response) {
            if (response.ok) {
              if (response.data.code === 0) { // 成功
                callback && callback({ error: null, data: 0 }); // 0 成功
              } else if (response.data.code === 10001002) { // 没有登录
                callback && callback({ error: null, data: 10001002 }); // 1 没有登录
              } else if (response.data.code === 10001008) { // 该接口不支持jsonp调用
                callback && callback({ error: null, data: 10001008 }); // 2 不支持jsonp调用
              } else if (response.data.code === 10001001) { // 未授权的应用
                callback && callback({ error: null, data: 10001001 });
              } else if (response.data.code === 2003009) { // 已达到最大购买数量
                callback && callback({ error: null, data: 2003009 });
              } else { // 添加手机失败
                callback && callback({ error: null, data: 1 }); // 4 添加失败
              }
            } else {
              callback && callback({ error: null, data: 2 });
            }
          });

          //let cartUrl = '//m.mi.com/v1/cart/add?client_id=180100031051';
          //cartUrl += '&product_id=' + arg.product_id;
          //cartUrl += '&consumption=' + arg.consumption;

          //fetchJsonp(cartUrl, {
          //jsonpCallback: 'callback',
          //timeout: 3000
          //})
          //.then(function(response) {
          //return response.json()
          //}).then(function(json) {
          //if(json.code === 0) { // 成功
          //callback && callback({error: null, data: 0}); // 0 成功
          //} else if(res.code === 10001002) { // 没有登录
          //callback && callback({error: null, data: 10001002}); // 1 没有登录
          //} else if(res.code === 10001008) { // 该接口不支持jsonp调用
          //callback && callback({error: null, data: 10001008}); // 2 不支持jsonp调用
          //} else if(res.code === 10001001) { // 未授权的应用
          //callback && callback({error: null, data: 10001001}); // 3 未授权的应用
          //} else { // 添加手机失败
          //callback && callback({error: null, data: 1}); // 4 添加失败
          //}
          //}).catch(function(ex) {
          //callback && callback(null, false);
          //});
          break;
        case 'sendWx': // TODO
        case 'showTitlebar':
        case 'hideTitlebar':
        case 'close':
        case 'clearWebCache':
        case 'callTel':
        case 'openNew':
        case 'openVideo':
        case 'openSnsDialog':
        case 'setMenuShareInfo':
        case 'wxShare':
          if (!arg) {
            return false;
          }
          try {
            arg = JSON.parse(arg);
          } catch (e) {
            return false;
          }

          wxSDK.share({
            title: arg.title,
            desc: arg.desc,
            url: arg.url,
            image: arg.image,
          });
        default:
          return false;
      }
    },
    //triggerSync (eventName) {
    //switch (eventName) {
    //case 'hasLogin':
    //if (!!Cookies('userId') || !!Cookies('cUserId')) {
    //return true;
    //}
    //return false;
    //break;
    //default:
    //return false;
    //}
    //}
  })
}
