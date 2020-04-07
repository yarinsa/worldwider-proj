import Vue from "vue";
import VueRouter from "vue-router";
import home from "@/views/home.vue";
import tourApp from "@/views/tour-app.vue";
import register from "@/views/register.vue";
import editProfile from "@/cmps/edit-profile.vue";
import login from "@/views/login.vue";
import tourDetails from "@/views/tour-details.vue";
import userProfile from "@/views/user-profile.vue";
import backoffice from "@/views/backoffice.vue";
import bookings from "@/views/bookings.vue";
import admin from '@/views/admin.vue'
import aboutProject from '@/views/about-project.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: home
  },
  {
    path: "/explore",
    name: "explore",
    component: tourApp
  },
  {
    path: "/tours/:id",
    name: "tourDetails",
    component: tourDetails
  },
  {
    path: "/tours/edit",
    name: "tourAdd",
    component: tourDetails
  },
  {
    path: "/register",
    name: "register",
    component: register
  },
  {
    path: "/login",
    name: "login",
    component: login
  },
  {
    path: "/backoffice",
    name: "backoffice",
    component: backoffice
  },
  {
    path: "/bookings",
    name: "bookings",
    component: bookings
  },
  {
    path: "/logout",
    name: "logout",
    component: home
  },
  {
    path: "/user-profile/:id?",
    name: "user-profile",
    component: userProfile
  },
  {
    path: "/edit-profile",
    name: "edit-profile",
    component: editProfile
  },
  {
    path: "/admin",
    name: "admin",
    component: admin
  },
  {
    path: "/about-project",
    name: "about-project",
    component: aboutProject
  }
];

const router = new VueRouter({
  routes
});

export default router;
