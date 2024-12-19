import { createRouter, createWebHistory } from 'vue-router';
import ColorConfig from '../views/ColorConfig.vue';
import SongVisualizer from '../views/SongVisualizer.vue';
import SongLibrary from '../views/SongLibrary.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/library'
    },
    {
      path: '/library',
      name: 'library',
      component: SongLibrary
    },
    {
      path: '/song/:songId',
      name: 'song',
      component: SongVisualizer,
      props: true
    },
    {
      path: '/config',
      name: 'config',
      component: ColorConfig
    }
  ]
});

export default router;