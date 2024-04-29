import { createRouter, createWebHistory } from "vue-router";

import BoardView from "../views/BoardView.vue";
import LoginView from "../views/LoginView.vue";
import LogoutView from "../views/LogoutView.vue"
import RegisterView from "../views/RegisterView.vue";
import ProfileView from "../views/ProfileView.vue"

import authService from "../api/authService";

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    { path: "/board", name: "board", component: BoardView, meta: {requiresAuth: true }},
    { path: "/profile", name: "profile", component: ProfileView, meta: {requiresAuth: true }},
    { path: "/register", name: "register", component: RegisterView },
    { path: "/login", name: "login", component: LoginView },
    { path: "/logout", name: "logout", component: LogoutView },
    { path: "/:pathMatch(.*)*", redirect: "/board" }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth) {
    authService.profile()
      .then(async response => {
        if (response.status === 200) {
          next();
        }
        else next("/logout")
      })
      .catch(() => next("/logout"))
  } else {
    next();
  }
});


export default router;