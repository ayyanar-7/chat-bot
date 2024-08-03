import Vue from 'vue'
import App from './App.vue'
import router from './router';
import axios from "axios";

import {
  DatePicker,
  Dropdown,
  Icon,
  Menu,
  Table,
  Badge,
  Button,
} from 'ant-design-vue';

// Importing CSS
import 'ant-design-vue/dist/antd.css';
// import { PieChartOutlined } from '@ant-design/icons-vue';

// Using Ant Design Vue components
Vue.use(DatePicker);
Vue.use(Dropdown);
Vue.use(Icon);
Vue.use(Menu);
Vue.use(Table);
Vue.use(Badge);
Vue.use(Button);
Vue.use(axios)
// Vue.use(PieChartOutlined);
axios.defaults.baseURL = "http://localhost:3000";

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
