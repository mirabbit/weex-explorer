import Fetch from './components/fetch/index';

export default {
  data: {
    cmsData: {},
  },
  mounted() {
    const self = this;
    self.getCmsList();
  },
  methods: {
    

    getCmsList() {
      const self = this;
      Fetch.getScript('//cdn.cnbj0.fds.api.mi-img.com/b2c-webfile/cms/js/promotion_huojiang.js?needValidHost=false', () => {
        self.cmsData = _huojiang;
        console.log(self.cmsData)
      })
      
    }
  }
}