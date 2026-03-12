import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import SketchPlayerView from "@/views/SketchPlayerView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/sketches/:id",
      name: "sketch-player",
      component: SketchPlayerView,
    },
  ],
});

export default router;
