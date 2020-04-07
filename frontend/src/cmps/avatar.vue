<template>
  <div class="avatar" :style="avatarStyle"></div>
</template>

<script>
export default {
  name: "avater",
  props: {
    value: {
      type: [String, Boolean, Number],
      default: ""
    },
    size: {
      type: String,
      default: "100px"
    },
    url: {
      type: String,
      default:
        "https://boostchiropractic.co.nz/wp-content/uploads/2016/09/default-user-img-768x768.jpg"
    },
    user: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    avatarStyle() {
      return {
        backgroundImage: `url(${this.computedUrl})`,
        width: `${this.size}`,
        height: `${this.size}`
      };
    },
    computedUrl() {
      let computedUrl = this.url;
      if (this.user) {
        if (this.$store.getters.isLoggedIn) {
          if (this.$store.getters.user.userImgUrl === "") {
            return computedUrl;
          }
          computedUrl = this.$store.getters.user.userImgUrl;
        }
      }
      if (!this.url) {
        computedUrl =
          "https://boostchiropractic.co.nz/wp-content/uploads/2016/09/default-user-img-768x768.jpg";
      }
      return computedUrl;
    }
  }
};
</script>

<style></style>
