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
    self.cmsList = self.productList;
    console.log(self.cmsList)
  },
  methods: {

    product(id) {
      App.product(id);
    },
  }
}