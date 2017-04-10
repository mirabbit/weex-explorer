// { "framework": "Vue" }

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 * Cookies.js - 1.2.3
 * https://github.com/ScottHamper/Cookies
 *
 * This is free and unencumbered software released into the public domain.
 */
(function (global, undefined) {
    'use strict';

    var factory = function (window) {
        if (typeof window.document !== 'object') {
            throw new Error('Cookies.js requires a `window` with a `document` object');
        }

        var Cookies = function (key, value, options) {
            return arguments.length === 1 ?
                Cookies.get(key) : Cookies.set(key, value, options);
        };

        // Allows for setter injection in unit tests
        Cookies._document = window.document;

        // Used to ensure cookie keys do not collide with
        // built-in `Object` properties
        Cookies._cacheKeyPrefix = 'cookey.'; // Hurr hurr, :)
        
        Cookies._maxExpireDate = new Date('Fri, 31 Dec 9999 23:59:59 UTC');

        Cookies.defaults = {
            path: '/',
            secure: false
        };

        Cookies.get = function (key) {
            if (Cookies._cachedDocumentCookie !== Cookies._document.cookie) {
                Cookies._renewCache();
            }
            
            var value = Cookies._cache[Cookies._cacheKeyPrefix + key];

            return value === undefined ? undefined : decodeURIComponent(value);
        };

        Cookies.set = function (key, value, options) {
            options = Cookies._getExtendedOptions(options);
            options.expires = Cookies._getExpiresDate(value === undefined ? -1 : options.expires);

            Cookies._document.cookie = Cookies._generateCookieString(key, value, options);

            return Cookies;
        };

        Cookies.expire = function (key, options) {
            return Cookies.set(key, undefined, options);
        };

        Cookies._getExtendedOptions = function (options) {
            return {
                path: options && options.path || Cookies.defaults.path,
                domain: options && options.domain || Cookies.defaults.domain,
                expires: options && options.expires || Cookies.defaults.expires,
                secure: options && options.secure !== undefined ?  options.secure : Cookies.defaults.secure
            };
        };

        Cookies._isValidDate = function (date) {
            return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
        };

        Cookies._getExpiresDate = function (expires, now) {
            now = now || new Date();

            if (typeof expires === 'number') {
                expires = expires === Infinity ?
                    Cookies._maxExpireDate : new Date(now.getTime() + expires * 1000);
            } else if (typeof expires === 'string') {
                expires = new Date(expires);
            }

            if (expires && !Cookies._isValidDate(expires)) {
                throw new Error('`expires` parameter cannot be converted to a valid Date instance');
            }

            return expires;
        };

        Cookies._generateCookieString = function (key, value, options) {
            key = key.replace(/[^#$&+\^`|]/g, encodeURIComponent);
            key = key.replace(/\(/g, '%28').replace(/\)/g, '%29');
            value = (value + '').replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent);
            options = options || {};

            var cookieString = key + '=' + value;
            cookieString += options.path ? ';path=' + options.path : '';
            cookieString += options.domain ? ';domain=' + options.domain : '';
            cookieString += options.expires ? ';expires=' + options.expires.toUTCString() : '';
            cookieString += options.secure ? ';secure' : '';

            return cookieString;
        };

        Cookies._getCacheFromString = function (documentCookie) {
            var cookieCache = {};
            var cookiesArray = documentCookie ? documentCookie.split('; ') : [];

            for (var i = 0; i < cookiesArray.length; i++) {
                var cookieKvp = Cookies._getKeyValuePairFromCookieString(cookiesArray[i]);

                if (cookieCache[Cookies._cacheKeyPrefix + cookieKvp.key] === undefined) {
                    cookieCache[Cookies._cacheKeyPrefix + cookieKvp.key] = cookieKvp.value;
                }
            }

            return cookieCache;
        };

        Cookies._getKeyValuePairFromCookieString = function (cookieString) {
            // "=" is a valid character in a cookie value according to RFC6265, so cannot `split('=')`
            var separatorIndex = cookieString.indexOf('=');

            // IE omits the "=" when the cookie value is an empty string
            separatorIndex = separatorIndex < 0 ? cookieString.length : separatorIndex;

            var key = cookieString.substr(0, separatorIndex);
            var decodedKey;
            try {
                decodedKey = decodeURIComponent(key);
            } catch (e) {
                if (console && typeof console.error === 'function') {
                    console.error('Could not decode cookie with key "' + key + '"', e);
                }
            }
            
            return {
                key: decodedKey,
                value: cookieString.substr(separatorIndex + 1) // Defer decoding value until accessed
            };
        };

        Cookies._renewCache = function () {
            Cookies._cache = Cookies._getCacheFromString(Cookies._document.cookie);
            Cookies._cachedDocumentCookie = Cookies._document.cookie;
        };

        Cookies._areEnabled = function () {
            var testKey = 'cookies.js';
            var areEnabled = Cookies.set(testKey, 1).get(testKey) === '1';
            Cookies.expire(testKey);
            return areEnabled;
        };

        Cookies.enabled = Cookies._areEnabled();

        return Cookies;
    };
    var cookiesExport = (global && typeof global.document === 'object') ? factory(global) : factory;

    // AMD support
    if (true) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () { return cookiesExport; }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    // CommonJS/Node.js support
    } else if (typeof exports === 'object') {
        // Support Node.js specific `module.exports` (which can be a function)
        if (typeof module === 'object' && typeof module.exports === 'object') {
            exports = module.exports = cookiesExport;
        }
        // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
        exports.Cookies = cookiesExport;
    } else {
        global.Cookies = cookiesExport;
    }
})(typeof window === 'undefined' ? this : window);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

if (weex.config.platform == 'Web') {
  const Cookies = __webpack_require__(0);
  //require('whatwg-fetch');
  //const fetchJsonp = require('fetch-jsonp');
  const stream = weex.requireModule('stream');
  var wxSDK = __webpack_require__(5);

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
              }, function (response) {
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
            location.href = "http://service.weibo.com/share/share.php?title=" + arg.text + "&pic=" + arg.image + "&url=" + arg.url || encodeURIComponent(location.href);
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
          }, function (response) {
            if (response.ok) {
              if (response.data.code === 0) {
                // 成功
                callback && callback({ error: null, data: 0 }); // 0 成功
              } else if (response.data.code === 10001002) {
                // 没有登录
                callback && callback({ error: null, data: 10001002 }); // 1 没有登录
              } else if (response.data.code === 10001008) {
                // 该接口不支持jsonp调用
                callback && callback({ error: null, data: 10001008 }); // 2 不支持jsonp调用
              } else if (response.data.code === 10001001) {
                // 未授权的应用
                callback && callback({ error: null, data: 10001001 });
              } else if (response.data.code === 2003009) {
                // 已达到最大购买数量
                callback && callback({ error: null, data: 2003009 });
              } else {
                // 添加手机失败
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
            image: arg.image
          });
        default:
          return false;
      }
    }
  });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(11)

var Component = __webpack_require__(9)(
  /* script */
  __webpack_require__(6),
  /* template */
  __webpack_require__(10),
  /* scopeId */
  "data-v-4c1ba3c5",
  /* cssModules */
  null
)
Component.options.__file = "/Users/xugenshi/Documents/workspace/open-source/weex-explorer/src/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4c1ba3c5", Component.options)
  } else {
    hotAPI.reload("data-v-4c1ba3c5", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__customized_modules_shopEvent_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__customized_modules_shopEvent_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__customized_modules_shopEvent_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_index_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__src_index_vue__);



if (weex.config.platform == 'Web') {
  if (window && !window.global) {
    // Stream.fetch jsonp调用失败，原因是找不到global
    window.global = window;
  }
}
__WEBPACK_IMPORTED_MODULE_1__src_index_vue___default.a.el = '#root';
/* harmony default export */ __webpack_exports__["default"] = (new Vue(__WEBPACK_IMPORTED_MODULE_1__src_index_vue___default.a));

/***/ }),
/* 4 */
/***/ (function(module, exports) {

const getScript = (src, func) => {
  let script = document.createElement('script');
  script.async = "async";
  script.src = src;
  if (func) {
    script.onload = func;
  }
  document.getElementsByTagName("head")[0].appendChild(script);
};

module.exports = {
  getScript
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const stream = weex.requireModule('stream');
const utils = __webpack_require__(4);

const isWeixin = navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger";

const getWeixinSDK = callback => {
  const data = {
    m: 'interface-weixin',
    do: 'sdk_signature_info',
    public_id: 'gh_f10ac97bb079',
    url: location.href,
    type: 'jsonp'
  };
  try {
    stream.fetch({
      method: 'GET',
      headers: {},
      url: '//xmt.www.mi.com/index.php?callback=?',
      body: 'm=interface-weixin&do=sdk_signature_info&public_id=gh_f10ac97bb079&url=' + encodeURIComponent(location.href) + '&type=jsonp',
      type: 'jsonp'
    }, function (rsp) {
      if (rsp.ok) {
        callback && callback(rsp.data);
      } else {
        callback && callback({ error: null, data: 2 });
      }
    });
  } catch (e) {}
};

const share = opts => {
  if (!isWeixin) return false;

  function shareOPtion() {
    try {
      getWeixinSDK(Auth => {
        alert('auth');
        window.wx.config({
          appId: 'wx8388fce6cb5c6eca',
          timestamp: Auth.data.timestamp,
          nonceStr: Auth.data.nonce_str,
          signature: Auth.data.signature,
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'hideAllNonBaseMenuItem']
        });
      });

      window.wx.ready(() => {
        window.wx.onMenuShareTimeline({
          title: opts.title,
          desc: opts.desc || '',
          link: opts.url,
          imgUrl: opts.image
        });
        window.wx.onMenuShareAppMessage({
          title: opts.title,
          desc: opts.desc || '',
          link: opts.url,
          imgUrl: opts.image
        });
        window.wx.onMenuShareQQ({
          title: opts.title,
          desc: opts.desc || '',
          link: opts.url,
          imgUrl: opts.image
        });
      });
    } catch (e) {
      return;
    }
  }

  if (window.wx && window.wx.ready) {
    shareOPtion();
  } else {
    getJsWxSDK(shareOPtion);
  }
};

const getJsWxSDK = cb => {
  utils.getScript('http://res.wx.qq.com/open/js/jweixin-1.0.0.js', () => {
    cb && cb();
  });
};

module.exports = {
  share
};

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


const modal = weex.requireModule('modal');
const miShop = weex.requireModule('shopEvent');
const stream = weex.requireModule('stream');
const Cookies = __webpack_require__(0);

function transformToJson(beforeData) {
  if (typeof beforeData === 'object') {
    return beforeData;
  }
  if (beforeData === '') {
    return null;
  }
  return JSON.parse(beforeData);
}

/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {};
  },
  mounted() {
    miShop.trigger('wxShare', JSON.stringify({
      title: '与刘诗诗、刘昊然疯抢1亿元',
      desc: '小米年货节，与刘诗诗、刘昊然疯抢1亿元红包，赶快来吧！',
      url: location.href,
      image: 'https://s1.mi.com/m/ghd/2016/1212game/static/milogo.png'
    }), response => {});
  },
  methods: {
    login() {
      miShop.trigger('hasLogin', '{"domain": "i.huodong.mi.com"}', response => {
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '登录失败请稍后再试',
            duration: 1
          });
          return;
        }

        // data == 0 已经登录，data == 1 未登录
        if (response.data === 1) {
          miShop.trigger('login', '{"domain": "i.huodong.mi.com"}', response => {
            response = transformToJson(response);
            if (response.error) {
              modal.toast({
                message: response.error.description,
                duration: 1
              });
            } else {
              // 执行登录后的逻辑
              if (response.data === 0) {
                modal.toast({
                  message: '登录成功',
                  duration: 1
                });
              } else if (response.data === 1) {
                modal.toast({
                  message: '登录失败',
                  duration: 1
                });
              } else {
                modal.toast({
                  message: '出错了请稍后再试',
                  duration: 1
                });
              }
            }
          });
        } else if (response.data === 0) {
          modal.toast({
            message: '已经登录',
            duration: 1
          });
        } else if (response.data == 2) {
          modal.toast({
            message: '网络问题，请稍后再试',
            duration: 1
          });
        } else {
          modal.toast({
            message: '出错了请稍后再试',
            duration: 1
          });
        }
      });
    },
    activity() {
      // let param = 'framework=weex&goods_id=2130100006&star=4&commentcontent=质量不错';
      // body: param
      stream.fetch({
        method: 'GET',
        type: 'jsonp',
        headers: {},
        body: 'framework=weex',
        url: 'http://i.huodong.mi.com/tv321/default/book/'
      }, function (response) {
        modal.toast({
          message: JSON.stringify(response),
          duration: 1
        });
      });
    },
    product() {
      // 进入商品详情页
      miShop.trigger('product', '4942', response => {
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        if (response.data === 0) {
          modal.toast({
            message: '进入商品详情页成功',
            duration: 1
          });
        } else if (response.data === 1) {
          modal.toast({
            message: '进入商品详情页失败',
            duration: 1
          });
        } else {
          modal.toast({
            message: '出错了请稍后再试',
            duration: 1
          });
        }
      });
    },
    openNew() {
      // 打开新的weex页面
      miShop.trigger('openNew', JSON.stringify({
        "url": encodeURIComponent('http://10.236.232.30:8080/dist/app.weex.js'), //必填，weex bundle的网址, 采用URL编码
        "show_titlebar": true, //选填，是否显示标题栏，默认为显示
        "show_statusbar": false, //选填，是否显示状态栏，默认为显示
        "title": "小米商城" //选填，标题栏的标题，默认为“小米商城”
      }), response => {
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        if (response.data === 0) {
          modal.toast({
            message: '打开新页面成功',
            duration: 1
          });
        } else if (response.data === 1) {
          modal.toast({
            message: '打开新页面失败',
            duration: 1
          });
        } else {
          modal.toast({
            message: '出错了请稍后再试',
            duration: 1
          });
        }
      });
    },
    openBrowserInside() {
      // 使用浏览器打开网页
      miShop.trigger('openBrowser', JSON.stringify({
        "type": "inside", // inside, outside
        "title": "我是页面标题", // outside of app打开的时候不用穿
        "url": encodeURIComponent('http://www.baidu.com/')
      }), response => {
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        if (response.data === 0) {
          modal.toast({
            message: '使用浏览器打开网页成功',
            duration: 1
          });
        } else if (response.data === 1) {
          modal.toast({
            message: '使用浏览器打开网页失败',
            duration: 1
          });
        } else {
          modal.toast({
            message: '出错了请稍后再试',
            duration: 1
          });
        }
      });
    },
    openBrowserOutside() {
      // 使用浏览器打开网页
      miShop.trigger('openBrowser', JSON.stringify({
        "type": "outside", // inside, outside
        "title": "我是页面标题", // outside of app打开的时候不用穿
        "url": encodeURIComponent('http://www.baidu.com/')
      }), response => {
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        if (response.data === 0) {
          modal.toast({
            message: '使用浏览器打开网页成功',
            duration: 1
          });
        } else if (response.data === 1) {
          modal.toast({
            message: '使用浏览器打开网页失败',
            duration: 1
          });
        } else {
          modal.toast({
            message: '出错了请稍后再试',
            duration: 1
          });
        }
      });
    },
    fCode() {
      // 打开F码页面
      miShop.trigger('fCode', '', response => {
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        if (response.data === 0) {
          modal.toast({
            message: '打开F码页面成功',
            duration: 1
          });
        } else if (response.data === 1) {
          modal.toast({
            message: '打开F码页面失败',
            duration: 1
          });
        } else {
          modal.toast({
            message: '出错了请稍后再试',
            duration: 1
          });
        }
      });
    },
    orderList() {
      // 进入“我的订单列表”页面
      miShop.trigger('orderList', '', response => {
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        if (response.data === 0) {
          modal.toast({
            message: '进入“我的订单列表”页面成功',
            duration: 1
          });
        } else if (response.data === 1) {
          modal.toast({
            message: '进入“我的订单列表”页面失败',
            duration: 1
          });
        } else {
          modal.toast({
            message: '出错了请稍后再试',
            duration: 1
          });
        }
      });
    },
    isWifi() {
      miShop.trigger('isWifi', '', response => {
        // 打开“我的订单列表”页面
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        if (response.data == 0) {
          // 这里可以去掉toast，添加WIFI连接情况下的逻辑
          modal.toast({
            message: 'WIFI已连接',
            duration: 1
          });
        } else if (response.data == 1) {
          // 这里可以去掉toast，添加WIFI未连接情况下的逻辑
          modal.toast({
            message: 'WIFI未连接',
            duration: 1
          });
        } else if (response.data == 2) {
          // 这种情况，绝大多数可能发生在浏览器中，无法得知用户网络情况
          modal.toast({
            message: '未知',
            duration: 1
          });
        }
      });
    },
    weibo() {
      // 打开微博分享窗口
      miShop.trigger('weibo', JSON.stringify({
        "text": encodeURIComponent("微博字符串"),
        "image": encodeURIComponent("http://i3.mifile.cn/a4/xmad_14890540335855_wTxbY.jpg"),
        "url": encodeURIComponent(typeof location != "undefined" ? location.href : "http://m.mi.com/") // App里面V8引擎不支持location
      }), response => {
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        // 打开微博分享窗口成功后
        if (response.data === 0) {
          modal.toast({
            message: '打开微博分享窗口成功',
            duration: 1
          });
        } else if (response.data === 1) {
          modal.toast({
            message: '打开微博分享窗口失败',
            duration: 1
          });
        } else {
          modal.toast({
            message: '出错了请稍后再试',
            duration: 1
          });
        }
      });
    },
    showTitlebar() {
      // 显示标题栏
      miShop.trigger('showTitlebar', '', response => {
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        // 添加显示标题栏的逻辑
        if (response.data === 0) {
          modal.toast({
            message: '显示标题栏成功',
            duration: 1
          });
        } else if (response.data === 1) {
          modal.toast({
            message: '显示标题栏失败',
            duration: 1
          });
        } else {
          modal.toast({
            message: '出错了请稍后再试',
            duration: 1
          });
        }
      });
    },
    hideTitlebar() {
      // 隐藏标题栏
      miShop.trigger('hideTitlebar', '', response => {
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        // 添加隐藏标题栏的逻辑
        if (response.data === 0) {
          modal.toast({
            message: '隐藏标题栏成功',
            duration: 1
          });
        } else if (response.data === 1) {
          modal.toast({
            message: '隐藏标题栏失败',
            duration: 1
          });
        } else {
          modal.toast({
            message: '出错了请稍后再试',
            duration: 1
          });
        }
      });
    },
    customTitle() {
      // 设置题栏上的标题
      miShop.trigger('customTitle', '我是标题', response => {
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        // 添加设置题栏上的标题成功后的逻辑
        if (response.data === 0) {
          modal.toast({
            message: '设置题栏上的标题成功',
            duration: 1
          });
        } else if (response.data === 1) {
          modal.toast({
            message: '设置题栏上的标题失败',
            duration: 1
          });
        } else {
          modal.toast({
            message: '出错了请稍后再试',
            duration: 1
          });
        }
      });
    },
    goCoupon() {
      // 打开“我的优惠券”页面
      miShop.trigger('goCoupon', '', response => {
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        // 添加打开“我的优惠券”页面成功后的逻辑
        if (response.data === 0) {
          modal.toast({
            message: '打开“我的优惠券”页面成功',
            duration: 1
          });
        } else if (response.data === 1) {
          modal.toast({
            message: '打开“我的优惠券”页面失败',
            duration: 1
          });
        } else {
          modal.toast({
            message: '出错了请稍后再试',
            duration: 1
          });
        }
      });
    },
    close() {
      // 关闭当前View
      miShop.trigger('close', '', response => {
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        // 添加关闭当前View成功后的逻辑
        if (response.data === 0) {
          modal.toast({
            message: '关闭当前页面成功',
            duration: 1
          });
        } else if (response.data === 1) {
          modal.toast({
            message: '关闭当前页面失败',
            duration: 1
          });
        } else {
          modal.toast({
            message: '出错了请稍后再试',
            duration: 1
          });
        }
      });
    },
    clearWebCache() {
      // 清空当前缓存
      miShop.trigger('clearWebCache', '', (err, data) => {
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        // 添加清空当前缓存成功后的逻辑
        if (response.data === 0) {
          modal.toast({
            message: '清空当前缓存成功',
            duration: 1
          });
        } else if (response.data === 1) {
          modal.toast({
            message: '清空当前缓存失败',
            duration: 1
          });
        } else {
          modal.toast({
            message: '出错了请稍后再试',
            duration: 1
          });
        }
      });
    },
    list() {
      miShop.trigger('showPlugin', JSON.stringify({ // 进入到列表页面
        "type": "list",
        "path": "ShopPlugin://com.xiaomi.shop.plugin.productlist.ui.ProductListFragment?pluginId=116",
        "extra": {
          "extra_category_id": "419",
          "extra_category_name": "小米 Note 2"
        }
      }), response => {
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        // 添加进入到列表页面成功后的逻辑
        if (response.data === 0) {
          modal.toast({
            message: '进入到列表页面成功',
            duration: 1
          });
        } else if (response.data === 1) {
          modal.toast({
            message: '进入到列表页面失败',
            duration: 1
          });
        } else {
          modal.toast({
            message: '出错了请稍后再试',
            duration: 1
          });
        }
      });
    },
    goCart() {
      // 打开购物车
      miShop.trigger('goCart', '', response => {
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        // 添加打开购物车成功后的逻辑
        if (response.data === 0) {
          modal.toast({
            message: '打开购物车成功',
            duration: 1
          });
        } else if (response.data === 1) {
          modal.toast({
            message: '打开购物车失败',
            duration: 1
          });
        } else {
          modal.toast({
            message: '出错了请稍后再试',
            duration: 1
          });
        }
      });
    },
    callTel() {
      // 打电话，跳转到拨号界面并填上电话号码
      miShop.trigger('callTel', '123456', response => {
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        // 添加跳转到拨号界面成功后的逻辑
        if (response.data === 0) {
          modal.toast({
            message: '拨打电话成功',
            duration: 1
          });
        } else if (response.data === 1) {
          modal.toast({
            message: '拨打电话失败',
            duration: 1
          });
        } else {
          modal.toast({
            message: '出错了请稍后再试',
            duration: 1
          });
        }
      });
    },
    addCart() {
      miShop.trigger('addCart', JSON.stringify({ // 添加购物车
        "product_id": "2171000004",
        "consumption": "1"
      }), response => {
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        if (response.data == 0) {
          // 添加购物车成功的逻辑
          modal.toast({
            message: '添加购物车成功',
            duration: 1
          });
        } else if (response.data == 1) {
          modal.toast({
            message: '添加失败，请稍后再试',
            duration: 1
          });
        } else if (response.data == 2) {
          modal.toast({
            message: '网络问题，请稍后再试',
            duration: 1
          });
        } else if (response.data == 10001008) {
          modal.toast({
            message: '不支持jsonp调用',
            duration: 1
          });
        } else if (response.data == 10001001) {
          modal.toast({
            message: '未授权的应用',
            duration: 1
          });
        } else if (response.data == 2003009) {
          modal.toast({
            message: '已达到最大购买数量',
            duration: 1
          });
        } else if (response.data == 10001002) {
          modal.toast({
            message: '没有登录', // 可以添加登录逻辑
            duration: 1
          });
        } else {
          modal.toast({
            message: '出错了请稍后再试',
            duration: 1
          });
        }
      });
    },
    goHome() {
      miShop.trigger('goHome', '', response => {
        // 跳转到App首页
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        // 添加跳转到App首页的逻辑
        if (response.data === 0) {
          modal.toast({
            message: '跳转到App首页成功',
            duration: 1
          });
        } else if (response.data === 1) {
          modal.toast({
            message: '跳转到App首页失败',
            duration: 1
          });
        } else {
          modal.toast({
            message: '出错了请稍后再试',
            duration: 1
          });
        }
      });
    },
    openCommunity() {
      miShop.trigger('openCommunity', '', response => {
        // 吊起小米社区
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        // 打开小米社区的逻辑
        if (response.data === 0) {
          modal.toast({
            message: '吊起小米社区成功',
            duration: 1
          });
        } else if (response.data === 1) {
          modal.toast({
            message: '吊起小米社区失败',
            duration: 1
          });
        } else {
          modal.toast({
            message: '出错了请稍后再试',
            duration: 1
          });
        }
      });
    },
    sendWx() {
      miShop.trigger('sendWx', JSON.stringify({ // 吊起微信分享页面
        "type": "text", //类型，可以为text、img、web
        "desc": "微信分享描述", //描述， 仅用于text和web类型
        "image": encodeURIComponent("http://h5.mi.com/p/ghd/2017/xgs0315/static/wx.jpg"), //分享图片地址，需URL编码，仅用于img和web类型
        "web_url": encodeURIComponent(typeof location != "undefined" ? location.href : "http://m.mi.com/") // App里面V8引擎不支持location
      }), response => {
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        // 吊起微信分享页面成功后的逻辑
        if (response.data === 0) {
          modal.toast({
            message: '打开微信分享页面成功',
            duration: 1
          });
        } else if (response.data === 1) {
          modal.toast({
            message: '打开微信分享页面失败',
            duration: 1
          });
        } else {
          modal.toast({
            message: '出错了请稍后再试',
            duration: 1
          });
        }
      });
    },
    sendWxTimeline() {
      miShop.trigger('sendWxTimeline', JSON.stringify({ // 打开微信朋友圈分享页面
        "type": "text", //类型，可以为text、img、web
        "desc": "微信分享描述", //描述， 仅用于text和web类型
        "image": encodeURIComponent("http://i3.mifile.cn/a4/xmad_14890540335855_wTxbY.jpg"), //分享图片地址，需URL编码，仅用于img和web类型
        "web_url": encodeURIComponent(typeof location != "undefined" ? location.href : "http://m.mi.com/") // App里面V8引擎不支持location
      }), response => {
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        // 打开微信朋友圈分享页面成功后的逻辑
        if (response.data === 0) {
          modal.toast({
            message: '打开微信朋友圈分享页面成功',
            duration: 1
          });
        } else if (response.data === 1) {
          modal.toast({
            message: '打开微信朋友圈分享页面失败',
            duration: 1
          });
        } else {
          modal.toast({
            message: '出错了请稍后再试',
            duration: 1
          });
        }
      });
    },
    openVideo() {
      miShop.trigger('openVideo', '//v.mifile.cn/b2c-mimall-media/5e3fb20ff329224cf15ca1d08d761736.mp4', response => {
        // 使用外部应用打开视频
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        // 使用外部应用打开视频的逻辑
        if (response.data === 0) {
          modal.toast({
            message: '视频打开成功',
            duration: 1
          });
        } else if (response.data === 1) {
          modal.toast({
            message: '视频打开失败',
            duration: 1
          });
        } else {
          modal.toast({
            message: '出错了请稍后再试',
            duration: 1
          });
        }
      });
    },
    openSnsDialog() {
      miShop.trigger('openSnsDialog', JSON.stringify({ // 打开分享窗口
        "wx_title": "微信分享标题",
        "wx_content": "微信分享描述",
        "wx_img": "http://i3.mifile.cn/a4/xmad_14890540335855_wTxbY.jpg", //分享图片地址
        "wx_link": typeof location != "undefined" ? location.href : "http://m.mi.com/", // App里面V8引擎不支持location
        "sina_img": "http://i3.mifile.cn/a4/xmad_14890540335855_wTxbY.jpg", //分享图片地址
        "sina_content": "新浪分享描述",
        "sina_link": typeof location != "undefined" ? location.href : "http://m.mi.com/" }), response => {
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        if (response.data === 0) {
          modal.toast({
            message: '打开分享窗口成功',
            duration: 1
          });
        } else if (response.data === 1) {
          modal.toast({
            message: '打开分享窗口失败',
            duration: 1
          });
        } else {
          modal.toast({
            message: '出错了请稍后再试',
            duration: 1
          });
        }
      });
    },
    setMenuShareInfo() {
      miShop.trigger('setMenuShareInfo', JSON.stringify({ // 打开分享窗口
        "wx_title": "微信分享标题",
        "wx_content": "微信分享描述",
        "wx_img": "http://i3.mifile.cn/a4/xmad_14890540335855_wTxbY.jpg", //分享图片地址
        "wx_link": typeof location != "undefined" ? location.href : "http://m.mi.com/", // App里面V8引擎不支持location
        "sina_img": "http://i3.mifile.cn/a4/xmad_14890540335855_wTxbY.jpg", //分享图片地址
        "sina_content": "新浪分享描述",
        "sina_link": typeof location != "undefined" ? location.href : "http://m.mi.com/" }), response => {
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        if (response.data === 0) {
          modal.toast({
            message: '打开分享窗口成功',
            duration: 1
          });
        } else if (response.data === 1) {
          modal.toast({
            message: '打开分享窗口失败',
            duration: 1
          });
        } else {
          modal.toast({
            message: '出错了请稍后再试',
            duration: 1
          });
        }
      });
    },
    getDeviceid() {
      miShop.trigger('getDeviceid', '', response => {
        // 获取device id
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        if (!response.data) {
          modal.toast({
            message: '没有获取到Device ID',
            duration: 1
          });
        } else {
          modal.toast({
            message: response.data,
            duration: 1
          });
        }
      });
    },
    getHashDeviceid() {
      miShop.trigger('getHashDeviceid', '', response => {
        // 获取hash device id
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        if (!response.data) {
          modal.toast({
            message: '没有获取到Hash Device ID',
            duration: 1
          });
        } else {
          modal.toast({
            message: response.data,
            duration: 1
          });
        }
      });
    },
    getPhones() {
      miShop.trigger('getPhones', '', response => {
        // 获取电话号码
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        if (!response.data) {
          modal.toast({
            message: '没有获取到电话号码',
            duration: 1
          });
        } else {
          modal.toast({
            message: response.data,
            duration: 1
          });
        }
      });
    },
    getEncryptUid() {
      miShop.trigger('getEncryptUid', '', response => {
        // 获取Encrypt User id
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        if (!response.data) {
          modal.toast({
            message: '没有获取到Encrypt User ID',
            duration: 1
          });
        } else {
          modal.toast({
            message: response.data,
            duration: 1
          });
        }
      });
    },
    getShopDeviceid() {
      miShop.trigger('getShopDeviceid', '', response => {
        // 获取unique device id
        response = transformToJson(response);
        if (response.error) {
          modal.toast({
            message: response.error.description || '出错了请稍后再试',
            duration: 1
          });
          return;
        }
        if (!response.data) {
          modal.toast({
            message: '没有获取到Unique Device ID',
            duration: 1
          });
        } else {
          modal.toast({
            message: response.data,
            duration: 1
          });
        }
      });
    },
    init() {}
  }
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/** {\n  color: #000;\n  font-size: 32px;\n  line-height: 40px;\n}*/\n.mainbody[data-v-4c1ba3c5] {\n  background-color: #fff;\n  /*padding: 20px;*/\n}\n.title[data-v-4c1ba3c5] {\n  padding-top: 20px;\n  font-size: 40px;\n  line-height: 60px;\n  color: #000;\n  /*background-color: red;*/\n  margin-bottom: 20px;\n}\n\n", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = options.computed || (options.computed = {})
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "body"
  }, [_c('scroller', {
    staticClass: "scroller"
  }, [_c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.login()
      }
    }
  }, [_c('text', [_vm._v("登录 -- hasLogin & login")])]), _vm._v(" "), _c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.activity()
      }
    }
  }, [_c('text', [_vm._v("调用一个ihuodong的接口")])]), _vm._v(" "), _c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.product()
      }
    }
  }, [_c('text', [_vm._v("某个商品")])]), _vm._v(" "), _c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.list()
      }
    }
  }, [_c('text', [_vm._v("某个列表 showPlugin")])]), _vm._v(" "), _c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.goCart()
      }
    }
  }, [_c('text', [_vm._v("去购物车 --- goCart")])]), _vm._v(" "), _c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.openNew()
      }
    }
  }, [_c('text', [_vm._v("openNew")])]), _vm._v(" "), _c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.openBrowserInside()
      }
    }
  }, [_c('text', [_vm._v("openBrowserInside")])]), _vm._v(" "), _c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.openBrowserOutside()
      }
    }
  }, [_c('text', [_vm._v("openBrowserOutside")])]), _vm._v(" "), _c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.fCode()
      }
    }
  }, [_c('text', [_vm._v("F码")])]), _vm._v(" "), _c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.orderList()
      }
    }
  }, [_c('text', [_vm._v("订单列表页面 -- orderList")])]), _vm._v(" "), _c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.isWifi()
      }
    }
  }, [_c('text', [_vm._v("判断wifi是否已连上 -- isWifi")])]), _vm._v(" "), _c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.weibo()
      }
    }
  }, [_c('text', [_vm._v("打开微博分享窗口 -- weibo")])]), _vm._v(" "), _c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.showTitlebar()
      }
    }
  }, [_c('text', [_vm._v("显示标题栏 -- showTitlebar")])]), _vm._v(" "), _c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.hideTitlebar()
      }
    }
  }, [_c('text', [_vm._v("隐藏标题栏 -- hideTitlebar")])]), _vm._v(" "), _c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.customTitle()
      }
    }
  }, [_c('text', [_vm._v("设置题栏上的标题 -- customTitle")])]), _vm._v(" "), _c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.goCoupon()
      }
    }
  }, [_c('text', [_vm._v("打开“我的优惠券”页面 -- goCoupon")])]), _vm._v(" "), _c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.close()
      }
    }
  }, [_c('text', [_vm._v("关闭当前页面 -- close")])]), _vm._v(" "), _c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.clearWebCache()
      }
    }
  }, [_c('text', [_vm._v("关闭当前页面 -- clearWebCache")])]), _vm._v(" "), _c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.goHome()
      }
    }
  }, [_c('text', [_vm._v("跳转到首页 -- goHome")])]), _vm._v(" "), _c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.callTel()
      }
    }
  }, [_c('text', [_vm._v("打电话 -- callTel")])]), _vm._v(" "), _c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.addCart()
      }
    }
  }, [_c('text', [_vm._v("将商品加入到购物车 -- addCart")])]), _vm._v(" "), _c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.sendWx()
      }
    }
  }, [_c('text', [_vm._v("打开微信分享页面 -- sendWx")])]), _vm._v(" "), _c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.sendWxTimeline()
      }
    }
  }, [_c('text', [_vm._v("打开微信朋友圈分享页面 -- sendWxTimeline")])]), _vm._v(" "), _c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.openVideo()
      }
    }
  }, [_c('text', [_vm._v("使用外部应用打开视频 -- openVideo")])]), _vm._v(" "), _c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.openSnsDialog()
      }
    }
  }, [_c('text', [_vm._v("打开分享窗口，可以分享到微信、微博、卡片分享 -- openSnsDialog")])]), _vm._v(" "), _c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.getDeviceid()
      }
    }
  }, [_c('text', [_vm._v("获取device id -- getDeviceid")])]), _vm._v(" "), _c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.getHashDeviceid()
      }
    }
  }, [_c('text', [_vm._v("获取hash device id -- getHashDeviceid")])]), _vm._v(" "), _c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.getPhones()
      }
    }
  }, [_c('text', [_vm._v("获取电话号码 -- getPhones")])]), _vm._v(" "), _c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.getEncryptUid()
      }
    }
  }, [_c('text', [_vm._v("获取Encrypt User id -- getEncryptUid")])]), _vm._v(" "), _c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.getShopDeviceid()
      }
    }
  }, [_c('text', [_vm._v("获取unique device id -- getShopDeviceid")])]), _vm._v(" "), _c('div', {
    staticClass: "title",
    on: {
      "click": function($event) {
        _vm.setMenuShareInfo()
      }
    }
  }, [_c('text', [_vm._v("打开分享窗口，可以分享到微信、微博、卡片分享 -- setMenuShareInfo")])])])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4c1ba3c5", module.exports)
  }
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(12)("27011946", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4c1ba3c5&scoped=true!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4c1ba3c5&scoped=true!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(13)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 13 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ })
/******/ ]);