import App from '../app';

export default {
  props: [
    'productList'
  ],
  data() {
    return {
      cmsList: []
    }
  },
  mounted() {
    const self = this;
    self.formatCmsList();
  },
  methods: {
    formatCmsList() {
      const self = this;
      console.log(self.productList.length)
      for(let i=0; i<self.productList.length; i+=2) {
        let end;
        if(i == self.productList.length - 1) {
          end = self.productList.length;
        } else {
          end = i + 2;
        }
        self.cmsList.push(self.productList.slice(i, end));
      }
    },

    product(id) {
      App.product(id);
    },
  }
}