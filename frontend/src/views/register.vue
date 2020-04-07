<template>
  <section>
    <div class="register-form-container">
      <h1 class="register-form-title">
        Everything
        <span class="register-form-title-light">Big</span> Starts with Something
        <span class="register-form-title-bold">Little</span>.
      </h1>
      <form class="register-form" @submit.prevent="registerUser">
        <site-input
          v-model="user.firstName"
          class="register-form-item"
          placeholder="First Name"
          required
          stretch
          type="text"
          @keydown.enter.native="registerUser"
        ></site-input>
        <site-input
          v-model="user.lastName"
          class="register-form-item"
          placeholder="Last Name"
          required
          stretch
          type="text"
          @keydown.enter.native="registerUser"
        ></site-input>
        <site-input
          v-model="user.email"
          class="register-form-item"
          placeholder="Email"
          required
          stretch
          type="text"
          @keydown.enter.native="registerUser"
        ></site-input>
        <site-input
          v-model="user.password"
          class="register-form-item"
          placeholder="Password"
          required
          stretch
          type="password"
          @keydown.enter.native="registerUser"
        ></site-input>
        <site-input
          v-model="user.password"
          class="register-form-item"
          placeholder="Confirm Password"
          required
          stretch
          type="password"
          @keydown.enter.native="registerUser"
        ></site-input>

        <!-- <div class="register-form-item">
        <label class="register-form-item-label">
          About
          <site-input
            v-model="user.bio"
            class="register-form-item-input"
            placeholder="Add a few words about yourself..."
            type="textarea"
            @keydown.enter.native="registerUser"
          ></site-input>
        </label>
        </div>-->
        <!-- <div class="register-form-item">
          <img :src="user.userImgUrl" />
          <site-input type="file" v-model="user.userImgUrl" />
        </div> -->
        <div class="register-form-item">
          <primary-button type="submit" text="Create Account" />
          <!-- <button type="submit">Create Account</button> -->
        </div>
      </form>
      <img
        style="background-image: url('http://res.cloudinary.com/dlv6ajfir/image/upload/v1584806624/sgidgmcpztrhyiqoql58.jpg')"
        class="register-form-image"
      />
    </div>
  </section>
</template>
<script>
import primaryButton from "@/cmps/primary-button.vue";
import siteInput from "@/cmps/site-input.vue";
export default {
  name: "register",
  components: {
    siteInput,
    primaryButton
  },
  data() {
    return {
      user: this.$store.getters.user
    };
  },

  methods: {
    async uploadImg(ev) {
      // console.log(ev); // we need ev.target.files[0]
      var imgUrl = await this.$store.dispatch({
        type: "uploadImg",
        ev
      });
      console.log(imgUrl, "back in the component");
      this.user.userImgUrl = imgUrl[0];
      console.log(
        this.user.userImgUrl,
        "this.user.userImgUrl - back in the component"
      );
    },
    async registerUser() {
      await this.$store.dispatch({
        type: "saveUser",
        user: this.user
      });
      this.$router.push("/home");
    }
  }
};
</script>
