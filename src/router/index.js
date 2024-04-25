import { createRouter, createWebHistory } from "vue-router";

import BoardView from "../views/BoardView.vue";

const routes = [
  {
    path: "/board",
    name: "board",
    component: BoardView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes
});

export default router;
