<template>
  <div class="login-container">
    <div class="login-gallery">
      <h2 class="login-gallery-title">Discover world of unlimited adventures...</h2>
      <div
        v-for="(img, idx) in imgs"
        :key="idx"
        :class="`login-gallery-item login-gallery-item-${idx} `"
        :style="`background: url(${img}) center / cover`"
      ></div>
    </div>
    <form @submit="onLogin" class="form login-form">
      <h3 class="login-form-title">Log in</h3>
      <div class="login-form-danger" v-if="wrong">Invalid email or password</div>
      <site-input
        v-model="credentials.email"
        class="login-form-item"
        placeholder="Email"
        type="text"
        required
        @keydown.enter.native="onLogin"
      ></site-input>
      <site-input
        v-model="credentials.password"
        class="login-form-item"
        placeholder="Password"
        required
        type="password"
        @keydown.enter.native="onLogin"
      ></site-input>
      <div class="login-form-actions">
        <primary-button :text="'Sign In'" type="submit" />
      </div>
    </form>
  </div>
</template>

<script>
import primaryButton from "@/cmps/primary-button.vue";
import siteInput from "@/cmps/site-input.vue";

export default {
  name: "login",
  components: {
    siteInput,
    primaryButton
  },
  data() {
    return {
      wrong: false,
      credentials: {
        email: "",
        password: ""
      },
      imgs: [
        "https://res.cloudinary.com/dlv6ajfir/image/upload/v1584806516/mo4x9wwdl38mpz0mjj1o.jpg",
        "http://res.cloudinary.com/dlv6ajfir/image/upload/v1584806587/h1h8drx3e3lcty0x7bnr.jpg",
        "http://res.cloudinary.com/dlv6ajfir/image/upload/v1584806862/mzksdjsp4uja2jv7ynr5.jpg"
      ]
    };
  },
  methods: {
    async onLogin() {
      await this.$store.dispatch({
        type: "login",
        credentials: this.credentials
      });
      console.log("registered");
      this.$router.push("/home");

      // .catch(() => {
      //   this.wrong = true;
      // });
    }
  }
};
</script>
