import Vue from 'vue';
import Router from 'vue-router';
import inputPage from '@/components/inputPage.vue';
import DataAnalysis from '@/components/dataAnalysis.vue';
import InputChat from '@/components/inputChat.vue';

Vue.use(Router);

const routes = [
  {
    path: '/inputPage',
    name: 'inputPage',
    component: inputPage
  },{
    path:'/dataAnalysis',
    name: 'dataAnalysis',
    component: DataAnalysis
  },
  {
    path: '/inputChat',
    name: 'inputChat',
    component: InputChat
  },
];

const router = new Router({
  mode: 'history',
  base: '/',
  routes
});

export default router;