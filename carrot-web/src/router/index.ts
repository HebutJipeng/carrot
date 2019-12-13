import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
const Lottie = () =>
  import(/* webpackChunkName: "Lottie" */ "../views/Lottie.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    redirect: {
      name: "lottie"
    }
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/lottie",
    name: "lottie",
    component: Lottie
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
