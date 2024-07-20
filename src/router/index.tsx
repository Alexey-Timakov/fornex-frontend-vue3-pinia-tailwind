// import { BackupsPage, LoginPage } from "@/views"
import { useStore } from "@/stores/store";
import BackupsPage from "@/views/BackupsPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import TempPage from "@/views/TempPage.vue";
import type { VNode } from "vue";
import { createRouter, createWebHistory } from 'vue-router'

type TRoute = {
  path: string;
  name: string;
  component: VNode;
};

export const routes: TRoute[] = [
  {
    path: "/",
    name: "Start Page",
    component: <LoginPage />
  },
  {
    path: "/backups",
    name: "Backups Page",
    component: <BackupsPage />,
  },
  {
    path: "/domains",
    name: "Domain Page",
    component: <TempPage />,
  },
  {
    path: "/projects",
    name: "Projects Page",
    component: <TempPage />,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const appStore = useStore();

  const user = localStorage.getItem("user");
  const userData = localStorage.getItem("userData");

  if (!(user && user.length && userData && userData.length)) {
    console.warn("No previous session found");

    if (to.fullPath !== "/" && appStore.currentUser === null) {
      console.warn("Not logged in. Redirect to LoginPage");
      next("/")
    }
  }

  if (user && user.length && userData && userData.length) {
    console.warn("Previous session found for user:", user);

    if (appStore.currentUser === null) {
      console.log("Set user:", user)
      appStore.setUser(user);
    }

    if (from.path === "/" && to.path === "/") {
      console.log("Initial loading, redirect to BackupsPage");
      next("/backups")
    }

    else {
      next();
    }

  }

  else {
    next();
  }
})

export default router;