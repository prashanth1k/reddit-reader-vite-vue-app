import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
const history = createWebHistory();

const routes = [
  { path: "/", component: Home },
  {
    path: "/top",
    component: () => import("../views/Posts.vue"),
    props: { filter: "top" },
  },
  {
    path: "/controversial",
    component: () => import("../views/Posts.vue"),
    props: { filter: "controversial" },
  },
];

const router = createRouter({ history, routes });
export default router;
