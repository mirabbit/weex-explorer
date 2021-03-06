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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(4)
)

/* script */
__vue_exports__ = __webpack_require__(3)

/* template */
var __vue_template__ = __webpack_require__(5)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/xugenshi/Documents/workspace/open-source/weex-explorer/src/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-166a3bcb"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_index_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__src_index_vue__);
// import miShop from './customized_modules/shopEvent.js'


if (weex.config.platform == 'Web') {
  if (window && !window.global) {
    // Stream.fetch jsonp调用失败，原因是找不到global
    window.global = window;
  }
}
__WEBPACK_IMPORTED_MODULE_0__src_index_vue___default.a.el = '#root';
/* harmony default export */ __webpack_exports__["default"] = (new Vue(__WEBPACK_IMPORTED_MODULE_0__src_index_vue___default.a));

/***/ }),
/* 2 */
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
/* 3 */
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
const Cookies = __webpack_require__(2);

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
/* 4 */
/***/ (function(module, exports) {

module.exports = {
  "mainbody": {
    "backgroundColor": "#ffffff"
  },
  "title": {
    "paddingTop": 20,
    "fontSize": 40,
    "lineHeight": 60,
    "color": "#000000",
    "marginBottom": 20
  }
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["body"]
  }, [_c('scroller', {
    staticClass: ["scroller"]
  }, [_c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.login()
      }
    }
  }, [_c('text', [_vm._v("登录 -- hasLogin & login")])]), _c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.activity()
      }
    }
  }, [_c('text', [_vm._v("调用一个ihuodong的接口")])]), _c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.product()
      }
    }
  }, [_c('text', [_vm._v("某个商品")])]), _c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.list()
      }
    }
  }, [_c('text', [_vm._v("某个列表 showPlugin")])]), _c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.goCart()
      }
    }
  }, [_c('text', [_vm._v("去购物车 --- goCart")])]), _c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.openNew()
      }
    }
  }, [_c('text', [_vm._v("openNew")])]), _c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.openBrowserInside()
      }
    }
  }, [_c('text', [_vm._v("openBrowserInside")])]), _c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.openBrowserOutside()
      }
    }
  }, [_c('text', [_vm._v("openBrowserOutside")])]), _c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.fCode()
      }
    }
  }, [_c('text', [_vm._v("F码")])]), _c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.orderList()
      }
    }
  }, [_c('text', [_vm._v("订单列表页面 -- orderList")])]), _c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.isWifi()
      }
    }
  }, [_c('text', [_vm._v("判断wifi是否已连上 -- isWifi")])]), _c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.weibo()
      }
    }
  }, [_c('text', [_vm._v("打开微博分享窗口 -- weibo")])]), _c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.showTitlebar()
      }
    }
  }, [_c('text', [_vm._v("显示标题栏 -- showTitlebar")])]), _c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.hideTitlebar()
      }
    }
  }, [_c('text', [_vm._v("隐藏标题栏 -- hideTitlebar")])]), _c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.customTitle()
      }
    }
  }, [_c('text', [_vm._v("设置题栏上的标题 -- customTitle")])]), _c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.goCoupon()
      }
    }
  }, [_c('text', [_vm._v("打开“我的优惠券”页面 -- goCoupon")])]), _c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.close()
      }
    }
  }, [_c('text', [_vm._v("关闭当前页面 -- close")])]), _c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.clearWebCache()
      }
    }
  }, [_c('text', [_vm._v("关闭当前页面 -- clearWebCache")])]), _c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.goHome()
      }
    }
  }, [_c('text', [_vm._v("跳转到首页 -- goHome")])]), _c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.callTel()
      }
    }
  }, [_c('text', [_vm._v("打电话 -- callTel")])]), _c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.addCart()
      }
    }
  }, [_c('text', [_vm._v("将商品加入到购物车 -- addCart")])]), _c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.sendWx()
      }
    }
  }, [_c('text', [_vm._v("打开微信分享页面 -- sendWx")])]), _c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.sendWxTimeline()
      }
    }
  }, [_c('text', [_vm._v("打开微信朋友圈分享页面 -- sendWxTimeline")])]), _c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.openVideo()
      }
    }
  }, [_c('text', [_vm._v("使用外部应用打开视频 -- openVideo")])]), _c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.openSnsDialog()
      }
    }
  }, [_c('text', [_vm._v("打开分享窗口，可以分享到微信、微博、卡片分享 -- openSnsDialog")])]), _c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.getDeviceid()
      }
    }
  }, [_c('text', [_vm._v("获取device id -- getDeviceid")])]), _c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.getHashDeviceid()
      }
    }
  }, [_c('text', [_vm._v("获取hash device id -- getHashDeviceid")])]), _c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.getPhones()
      }
    }
  }, [_c('text', [_vm._v("获取电话号码 -- getPhones")])]), _c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.getEncryptUid()
      }
    }
  }, [_c('text', [_vm._v("获取Encrypt User id -- getEncryptUid")])]), _c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.getShopDeviceid()
      }
    }
  }, [_c('text', [_vm._v("获取unique device id -- getShopDeviceid")])]), _c('div', {
    staticClass: ["title"],
    on: {
      "click": function($event) {
        _vm.setMenuShareInfo()
      }
    }
  }, [_c('text', [_vm._v("打开分享窗口，可以分享到微信、微博、卡片分享 -- setMenuShareInfo")])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })
/******/ ]);