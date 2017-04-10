<template>
  <div class="body">
    <scroller class="scroller">
      <div @click="login()" class="title">
        <text>登录 -- hasLogin & login</text>
      </div>
      <div @click="activity()" class="title">
        <text>调用一个ihuodong的接口</text>
      </div>
      <div @click="product()" class="title">
        <text>某个商品</text>
      </div>
      <div @click="list()" class="title">
        <text>某个列表 showPlugin</text>
      </div>
      <div @click="goCart()" class="title">
        <text>去购物车 --- goCart</text>
      </div>
      <div @click="openNew()" class="title">
        <text>openNew</text>
      </div>
      <div @click="openBrowserInside()" class="title">
        <text>openBrowserInside</text>
      </div>
      <div @click="openBrowserOutside()" class="title">
        <text>openBrowserOutside</text>
      </div>
      <div @click="fCode()" class="title">
        <text>F码</text>
      </div>
      <div @click="orderList()" class="title">
        <text>订单列表页面 -- orderList</text>
      </div>
      <div @click="isWifi()" class="title">
        <text>判断wifi是否已连上 -- isWifi</text>
      </div>
      <div @click="weibo()" class="title">
        <text>打开微博分享窗口 -- weibo</text>
      </div>
      <div @click="showTitlebar()" class="title">
        <text>显示标题栏 -- showTitlebar</text>
      </div>
      <div @click="hideTitlebar()" class="title">
        <text>隐藏标题栏 -- hideTitlebar</text>
      </div>
      <div @click="customTitle()" class="title">
        <text>设置题栏上的标题 -- customTitle</text>
      </div>
      <div @click="goCoupon()" class="title">
        <text>打开“我的优惠券”页面 -- goCoupon</text>
      </div>
      <div @click="close()" class="title">
        <text>关闭当前页面 -- close</text>
      </div>
      <div @click="clearWebCache()" class="title">
        <text>关闭当前页面 -- clearWebCache</text>
      </div>
      <div @click="goHome()" class="title">
        <text>跳转到首页 -- goHome</text>
      </div>
      <div @click="callTel()" class="title">
        <text>打电话 -- callTel</text>
      </div>
      <div @click="addCart()" class="title">
        <text>将商品加入到购物车 -- addCart</text>
      </div>
      <div @click="sendWx()" class="title">
        <text>打开微信分享页面 -- sendWx</text>
      </div>
      <div @click="sendWxTimeline()" class="title">
        <text>打开微信朋友圈分享页面 -- sendWxTimeline</text>
      </div>
      <div @click="openVideo()" class="title">
        <text>使用外部应用打开视频 -- openVideo</text>
      </div>
      <div @click="openSnsDialog()" class="title">
        <text>打开分享窗口，可以分享到微信、微博、卡片分享 -- openSnsDialog</text>
      </div>
      <div @click="getDeviceid()" class="title">
        <text>获取device id -- getDeviceid</text>
      </div>
      <div @click="getHashDeviceid()" class="title">
        <text>获取hash device id -- getHashDeviceid</text>
      </div>
      <div @click="getPhones()" class="title">
        <text>获取电话号码 -- getPhones</text>
      </div>
      <div @click="getEncryptUid()" class="title">
        <text>获取Encrypt User id -- getEncryptUid</text>
      </div>
      <div @click="getShopDeviceid()" class="title">
        <text>获取unique device id -- getShopDeviceid</text>
      </div>
      <div @click="setMenuShareInfo()" class="title">
        <text>打开分享窗口，可以分享到微信、微博、卡片分享 -- setMenuShareInfo</text>
      </div>
    </scroller>
  </div>
</template>

<style scoped>
  /** {
    color: #000;
    font-size: 32px;
    line-height: 40px;
  }*/
  
  .mainbody {
    background-color: #fff;
    /*padding: 20px;*/
  }
  
  .title {
    padding-top: 20px;
    font-size: 40px;
    line-height: 60px;
    color: #000;
    /*background-color: red;*/
    margin-bottom: 20px;
  }

</style>

<script>

  const modal = weex.requireModule('modal');
  const miShop = weex.requireModule('shopEvent');
  const stream = weex.requireModule('stream');
  const Cookies = require('cookies-js');

  function transformToJson(beforeData) {
    if(typeof beforeData === 'object') {
      return beforeData;
    }
    if(beforeData === '') {
      return null;
    }
    return JSON.parse(beforeData);
  }

  export default {
    data() {
      return {}
    },
    mounted() {
      miShop.trigger('wxShare', JSON.stringify({
        title: '与刘诗诗、刘昊然疯抢1亿元',
        desc: '小米年货节，与刘诗诗、刘昊然疯抢1亿元红包，赶快来吧！',
        url: location.href,
        image: 'https://s1.mi.com/m/ghd/2016/1212game/static/milogo.png',
      }), (response)=> {});
    },
    methods: {
      login() {
        miShop.trigger('hasLogin', '{"domain": "i.huodong.mi.com"}', (response)=> {
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '登录失败请稍后再试',
              duration: 1
            });
            return;
          }

          // data == 0 已经登录，data == 1 未登录
          if(response.data === 1) {
            miShop.trigger('login', '{"domain": "i.huodong.mi.com"}', (response)=> {
              response = transformToJson(response);
              if(response.error) {
                modal.toast({
                  message: response.error.description,
                  duration: 1
                });
              } else {
                // 执行登录后的逻辑
                if(response.data === 0) {
                  modal.toast({
                    message: '登录成功',
                    duration: 1
                  });
                } else if(response.data === 1) {
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
          } else if(response.data === 0) {
            modal.toast({
              message: '已经登录',
              duration: 1
            });
          } else if(response.data == 2) {
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
          headers:{},
          body: 'framework=weex',
          url: 'http://i.huodong.mi.com/tv321/default/book/'
        }, function(response){
         modal.toast({
           message: JSON.stringify(response),
           duration: 1
         })
        })
      },
      product() { // 进入商品详情页
        miShop.trigger('product', '4942', (response)=> {
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '出错了请稍后再试',
              duration: 1
            });
            return;
          }
          if(response.data === 0) {
            modal.toast({
              message: '进入商品详情页成功',
              duration: 1
            });
          } else if(response.data === 1) {
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
      openNew() { // 打开新的weex页面
        miShop.trigger('openNew', JSON.stringify({
          "url": encodeURIComponent('http://10.236.232.30:8080/dist/app.weex.js'), //必填，weex bundle的网址, 采用URL编码
          "show_titlebar" : true,    //选填，是否显示标题栏，默认为显示
          "show_statusbar": false,   //选填，是否显示状态栏，默认为显示
          "title" : "小米商城"       //选填，标题栏的标题，默认为“小米商城”
        }), (response)=> {
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '出错了请稍后再试',
              duration: 1
            });
            return;
          }
          if(response.data === 0) {
            modal.toast({
              message: '打开新页面成功',
              duration: 1
            });
          } else if(response.data === 1) {
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
      openBrowserInside() { // 使用浏览器打开网页
        miShop.trigger('openBrowser', JSON.stringify({
          "type": "inside", // inside, outside
          "title": "我是页面标题", // outside of app打开的时候不用穿
          "url": encodeURIComponent('http://www.baidu.com/')
        }), (response)=> {
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '出错了请稍后再试',
              duration: 1
            });
            return;
          }
          if(response.data === 0) {
            modal.toast({
              message: '使用浏览器打开网页成功',
              duration: 1
            });
          } else if(response.data === 1) {
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
      openBrowserOutside() { // 使用浏览器打开网页
        miShop.trigger('openBrowser', JSON.stringify({
          "type": "outside", // inside, outside
          "title": "我是页面标题", // outside of app打开的时候不用穿
          "url": encodeURIComponent('http://www.baidu.com/')
        }), (response)=> {
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '出错了请稍后再试',
              duration: 1
            });
            return;
          }
          if(response.data === 0) {
            modal.toast({
              message: '使用浏览器打开网页成功',
              duration: 1
            });
          } else if(response.data === 1) {
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
      fCode() { // 打开F码页面
        miShop.trigger('fCode', '', (response)=> {
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '出错了请稍后再试',
              duration: 1
            });
            return;
          }
          if(response.data === 0) {
            modal.toast({
              message: '打开F码页面成功',
              duration: 1
            });
          } else if(response.data === 1) {
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
      orderList() {  // 进入“我的订单列表”页面
        miShop.trigger('orderList', '', (response)=> {
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '出错了请稍后再试',
              duration: 1
            });
            return;
          }
          if(response.data === 0) {
            modal.toast({
              message: '进入“我的订单列表”页面成功',
              duration: 1
            });
          } else if(response.data === 1) {
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
        miShop.trigger('isWifi', '', (response)=> { // 打开“我的订单列表”页面
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '出错了请稍后再试',
              duration: 1
            });
            return;
          }
          if(response.data == 0) {
            // 这里可以去掉toast，添加WIFI连接情况下的逻辑
            modal.toast({
              message: 'WIFI已连接',
              duration: 1
            });
          } else if(response.data == 1) {
            // 这里可以去掉toast，添加WIFI未连接情况下的逻辑
            modal.toast({
              message: 'WIFI未连接',
              duration: 1
            });
          } else if(response.data == 2) {
            // 这种情况，绝大多数可能发生在浏览器中，无法得知用户网络情况
            modal.toast({
              message: '未知',
              duration: 1
            });
          }
        });
      },
      weibo() { // 打开微博分享窗口
        miShop.trigger('weibo', JSON.stringify({
          "text": encodeURIComponent("微博字符串"),
          "image": encodeURIComponent("http://i3.mifile.cn/a4/xmad_14890540335855_wTxbY.jpg"),
          "url": encodeURIComponent(typeof location != "undefined" ? location.href : "http://m.mi.com/") // App里面V8引擎不支持location
        }), (response)=> {
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '出错了请稍后再试',
              duration: 1
            });
            return;
          }
          // 打开微博分享窗口成功后
          if(response.data === 0) {
            modal.toast({
              message: '打开微博分享窗口成功',
              duration: 1
            });
          } else if(response.data === 1) {
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
      showTitlebar() { // 显示标题栏
        miShop.trigger('showTitlebar', '', (response)=> {
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '出错了请稍后再试',
              duration: 1
            });
            return;
          }
          // 添加显示标题栏的逻辑
          if(response.data === 0) {
            modal.toast({
              message: '显示标题栏成功',
              duration: 1
            });
          } else if(response.data === 1) {
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
      hideTitlebar() { // 隐藏标题栏
        miShop.trigger('hideTitlebar', '', (response)=> {
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '出错了请稍后再试',
              duration: 1
            });
            return;
          }
          // 添加隐藏标题栏的逻辑
          if(response.data === 0) {
            modal.toast({
              message: '隐藏标题栏成功',
              duration: 1
            });
          } else if(response.data === 1) {
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
      customTitle() { // 设置题栏上的标题
        miShop.trigger('customTitle', '我是标题', (response)=> {
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '出错了请稍后再试',
              duration: 1
            });
            return;
          }
          // 添加设置题栏上的标题成功后的逻辑
          if(response.data === 0) {
            modal.toast({
              message: '设置题栏上的标题成功',
              duration: 1
            });
          } else if(response.data === 1) {
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
      goCoupon() { // 打开“我的优惠券”页面
        miShop.trigger('goCoupon', '', (response)=> {
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '出错了请稍后再试',
              duration: 1
            });
            return;
          }
          // 添加打开“我的优惠券”页面成功后的逻辑
          if(response.data === 0) {
            modal.toast({
              message: '打开“我的优惠券”页面成功',
              duration: 1
            });
          } else if(response.data === 1) {
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
      close() { // 关闭当前View
        miShop.trigger('close', '', (response)=> {
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '出错了请稍后再试',
              duration: 1
            });
            return;
          }
          // 添加关闭当前View成功后的逻辑
          if(response.data === 0) {
            modal.toast({
              message: '关闭当前页面成功',
              duration: 1
            });
          } else if(response.data === 1) {
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
      clearWebCache() { // 清空当前缓存
        miShop.trigger('clearWebCache', '', (err, data)=> {
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '出错了请稍后再试',
              duration: 1
            });
            return;
          }
          // 添加清空当前缓存成功后的逻辑
          if(response.data === 0) {
            modal.toast({
              message: '清空当前缓存成功',
              duration: 1
            });
          } else if(response.data === 1) {
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
          "extra":{
            "extra_category_id": "419",
            "extra_category_name": "小米 Note 2"
          }
        }), (response)=> {
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '出错了请稍后再试',
              duration: 1
            });
            return;
          }
          // 添加进入到列表页面成功后的逻辑
          if(response.data === 0) {
            modal.toast({
              message: '进入到列表页面成功',
              duration: 1
            });
          } else if(response.data === 1) {
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
      goCart() { // 打开购物车
        miShop.trigger('goCart', '', (response)=> {
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '出错了请稍后再试',
              duration: 1
            });
            return;
          }
          // 添加打开购物车成功后的逻辑
          if(response.data === 0) {
            modal.toast({
              message: '打开购物车成功',
              duration: 1
            });
          } else if(response.data === 1) {
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
      callTel() { // 打电话，跳转到拨号界面并填上电话号码
        miShop.trigger('callTel', '123456', (response)=> {
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '出错了请稍后再试',
              duration: 1
            });
            return;
          }
          // 添加跳转到拨号界面成功后的逻辑
          if(response.data === 0) {
            modal.toast({
              message: '拨打电话成功',
              duration: 1
            });
          } else if(response.data === 1) {
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
          "consumption": "1",
        }), (response)=> {
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '出错了请稍后再试',
              duration: 1
            });
            return;
          }
          if(response.data == 0) { // 添加购物车成功的逻辑
            modal.toast({
              message: '添加购物车成功',
              duration: 1
            });
          } else if(response.data == 1) {
            modal.toast({
              message: '添加失败，请稍后再试',
              duration: 1
            });
          } else if(response.data == 2) {
            modal.toast({
              message: '网络问题，请稍后再试',
              duration: 1
            });
          } else if(response.data == 10001008) {
            modal.toast({
              message: '不支持jsonp调用',
              duration: 1
            });
          } else if(response.data == 10001001) {
            modal.toast({
              message: '未授权的应用',
              duration: 1
            });
          } else if(response.data == 2003009) {
            modal.toast({
              message: '已达到最大购买数量',
              duration: 1
            });
          } else if(response.data == 10001002) {
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
        miShop.trigger('goHome', '', (response)=> { // 跳转到App首页
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '出错了请稍后再试',
              duration: 1
            });
            return;
          }
          // 添加跳转到App首页的逻辑
          if(response.data === 0) {
            modal.toast({
              message: '跳转到App首页成功',
              duration: 1
            });
          } else if(response.data === 1) {
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
        miShop.trigger('openCommunity', '', (response)=> { // 吊起小米社区
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '出错了请稍后再试',
              duration: 1
            });
            return;
          }
          // 打开小米社区的逻辑
          if(response.data === 0) {
            modal.toast({
              message: '吊起小米社区成功',
              duration: 1
            });
          } else if(response.data === 1) {
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
        }), (response)=> {
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '出错了请稍后再试',
              duration: 1
            });
            return;
          }
          // 吊起微信分享页面成功后的逻辑
          if(response.data === 0) {
            modal.toast({
              message: '打开微信分享页面成功',
              duration: 1
            });
          } else if(response.data === 1) {
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
        }), (response)=> {
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '出错了请稍后再试',
              duration: 1
            });
            return;
          }
          // 打开微信朋友圈分享页面成功后的逻辑
          if(response.data === 0) {
            modal.toast({
              message: '打开微信朋友圈分享页面成功',
              duration: 1
            });
          } else if(response.data === 1) {
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
        miShop.trigger('openVideo', '//v.mifile.cn/b2c-mimall-media/5e3fb20ff329224cf15ca1d08d761736.mp4', (response)=> { // 使用外部应用打开视频
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '出错了请稍后再试',
              duration: 1
            });
            return;
          }
          // 使用外部应用打开视频的逻辑
          if(response.data === 0) {
            modal.toast({
              message: '视频打开成功',
              duration: 1
            });
          } else if(response.data === 1) {
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
          "sina_link": typeof location != "undefined" ? location.href : "http://m.mi.com/", // App里面V8引擎不支持location
        }), (response)=> {
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '出错了请稍后再试',
              duration: 1
            });
            return;
          }
          if(response.data === 0) {
            modal.toast({
              message: '打开分享窗口成功',
              duration: 1
            });
          } else if(response.data === 1) {
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
          "sina_link": typeof location != "undefined" ? location.href : "http://m.mi.com/", // App里面V8引擎不支持location
        }), (response)=> {
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '出错了请稍后再试',
              duration: 1
            });
            return;
          }
          if(response.data === 0) {
            modal.toast({
              message: '打开分享窗口成功',
              duration: 1
            });
          } else if(response.data === 1) {
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
        miShop.trigger('getDeviceid', '', (response)=> { // 获取device id
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '出错了请稍后再试',
              duration: 1
            });
            return;
          }
          if(!response.data) {
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
        miShop.trigger('getHashDeviceid', '', (response)=> { // 获取hash device id
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '出错了请稍后再试',
              duration: 1
            });
            return;
          }
          if(!response.data) {
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
        miShop.trigger('getPhones', '', (response)=> { // 获取电话号码
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '出错了请稍后再试',
              duration: 1
            });
            return;
          }
          if(!response.data) {
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
        miShop.trigger('getEncryptUid', '', (response)=> { // 获取Encrypt User id
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '出错了请稍后再试',
              duration: 1
            });
            return;
          }
          if(!response.data) {
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
        miShop.trigger('getShopDeviceid', '', (response)=> { // 获取unique device id
          response = transformToJson(response);
          if(response.error) {
            modal.toast({
              message: response.error.description || '出错了请稍后再试',
              duration: 1
            });
            return;
          }
          if(!response.data) {
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
      init() {
      }
    }
  }

</script>
