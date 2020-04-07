<template>
  <section>
    <div id="app" class="wrapper">
      <site-header />
      <user-msg></user-msg>
      <router-view :key="$route.path" class="main-container" />
      <site-footer />
      <chat />
    </div>
  </section>
</template>
 
<script>
import siteHeader from "@/cmps/header.vue";
import siteFooter from "@/cmps/footer.vue";
import userMsg from "@/cmps/user-msg.vue";
import chat from "@/cmps/chat.vue";
export default {
  name: "main-app",
  components: {
    siteHeader,
    siteFooter,
    userMsg,
    chat
  },
  created() {
    this.$store.commit({ type: "setUser" });
  }
};
</script>
<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
