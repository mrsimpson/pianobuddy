import { createRouter, createWebHashHistory } from 'vue-router';
import ColorConfig from '../views/ColorConfig.vue';
import SongVisualizer from '../views/SongVisualizer.vue';
import SongLibrary from '../views/SongLibrary.vue';
import CollectionsView from '../views/CollectionsView.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/library',
    },
    {
      path: '/library',
      name: 'library',
      component: SongLibrary,
    },
    {
      path: '/collections',
      name: 'collections',
      component: CollectionsView,
    },
    {
      path: '/song/:songId',
      name: 'song',
      component: SongVisualizer,
      props: true,
    },
    {
      path: '/config',
      name: 'config',
      component: ColorConfig,
    },
  ],
});

export default router;
