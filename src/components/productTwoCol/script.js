export default {
  components: {
    ComponentA
  },
  mounted() {
    this.myLazyLoad = new LazyLoad({
      elements_selector: ".lazy",
      throttle: 30,
      // 建议设置一个图片占位符，可以是url或base64
      // placeholder: ''
    });
  },
  methods: {
    loadImage(image) {
      return require('./images/' + image);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  // 可异步，为了控制组件切换时长，给切入组件添加 activate 钩子
  activate(done) {
    var self = this;
    window.setTimeout(function() {
      self.someData = 'test';
      done();
      window.statInit && window.statInit();
    }, 500);
  },
  data() {
    return {

    }
  },
  beforeDestroy() {
    this.myLazyLoad.destroy();
  }
}
