 const stream = weex.requireModule('stream');
 const utils = require('./utils');

 const isWeixin = navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger";

 const getWeixinSDK = (callback) => {
   const data = {
     m: 'interface-weixin',
     do: 'sdk_signature_info',
     public_id: 'gh_f10ac97bb079',
     url: location.href,
     type: 'jsonp',
   };
   try {
     stream.fetch({
       method: 'GET',
       headers: {},
       url: '//xmt.www.mi.com/index.php?callback=?',
       body: 'm=interface-weixin&do=sdk_signature_info&public_id=gh_f10ac97bb079&url=' + encodeURIComponent(location.href) + '&type=jsonp',
       type: 'jsonp',
     }, function(rsp) {
       if (rsp.ok) {
         callback && callback(rsp.data);
       } else {
         callback && callback({ error: null, data: 2 });
       }
     });
   } catch (e) {}
 };

 const share = (opts) => {
   if (!isWeixin) return false;

   function shareOPtion() {
     try {
       getWeixinSDK((Auth) => {
         alert('auth');
         window.wx.config({
           appId: 'wx8388fce6cb5c6eca',
           timestamp: Auth.data.timestamp,
           nonceStr: Auth.data.nonce_str,
           signature: Auth.data.signature,
           jsApiList: [
             'onMenuShareTimeline',
             'onMenuShareAppMessage',
             'onMenuShareQQ',
             'onMenuShareWeibo',
             'hideAllNonBaseMenuItem',
           ]
         });
       });

       window.wx.ready(() => {
         window.wx.onMenuShareTimeline({
           title: opts.title,
           desc: opts.desc || '',
           link: opts.url,
           imgUrl: opts.image,
         });
         window.wx.onMenuShareAppMessage({
           title: opts.title,
           desc: opts.desc || '',
           link: opts.url,
           imgUrl: opts.image,
         });
         window.wx.onMenuShareQQ({
           title: opts.title,
           desc: opts.desc || '',
           link: opts.url,
           imgUrl: opts.image,
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



 const getJsWxSDK = (cb) => {
   utils.getScript('http://res.wx.qq.com/open/js/jweixin-1.0.0.js', () => {
     cb && cb();
   });
 };

 module.exports = {
   share,
 };
