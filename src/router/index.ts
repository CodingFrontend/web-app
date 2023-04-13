import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("@/views/AuthView.vue"),
    },
    {
      path: "/add-event",
      name: "addEvent",
      component: () => import("@/views/AddEventView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const store = useAuthStore();
  if (!store.isAuth && to.name !== "auth") next({ name: "auth" });
  else next();
});

export default router;
