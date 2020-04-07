<template>
  <header class="site-header" :class="headerClass">
    <router-link to="/home">
      <div
        class="logo site-header-logo"
        :class="{ active: isLoggedIn, hidden: navMenuActive }"
      >
        worldwider
      </div>
    </router-link>
    <div class="site-header-content"></div>
    <!-- <nav> -->
    <button
      @click="toggleNavMenu"
      class="site-header-nav-button"
      :class="headerClass"
    >
      <font-awesome-icon :icon="['fas', 'ellipsis-v']" />
    </button>
    <ul class="site-header-nav" :class="{ active: navMenuActive }">
      <li
        class="site-header-nav-item"
        @click="toggleNavMenu"
        :class="{ active: navMenuActive }"
      >
        <router-link to="/" class="site-header-nav-link">Home</router-link>
      </li>
      <li
        class="site-header-nav-item"
        @click="toggleNavMenu"
        :class="{ active: navMenuActive }"
      >
        <router-link to="/explore" class="site-header-nav-link">
          <font-awesome-icon
            @click="resetFilter"
            :icon="['far', 'compass']"
          />Explore
        </router-link>
      </li>
      <li
        class="site-header-nav-item"
        @click="toggleNavMenu"
        :class="{ active: navMenuActive }"
      >
        <router-link to="/tours/add" class="site-header-nav-link"
          >Become a guide</router-link
        >
      </li>
      <!-- <li class="site-header-nav-item" @click="toggleNavMenu" :class="{ active: navMenuActive }">
        <router-link to="/about" class="site-header-nav-link">About</router-link>
      </li>-->
      <li
        v-if="!isLoggedIn"
        class="site-header-nav-item"
        @click="toggleNavMenu"
        :class="{ active: navMenuActive }"
      >
        <router-link to="/login" class="site-header-nav-link"
          >Login</router-link
        >
      </li>
      <li
        v-if="!isLoggedIn"
        class="site-header-nav-item"
        @click="toggleNavMenu"
        :class="{ active: navMenuActive }"
      >
        <router-link to="/register" class="site-header-nav-link"
          >Register</router-link
        >
      </li>
      <li
        v-if="isLoggedIn"
        class="site-header-nav-item site-header-user-container"
      >
        <avatar
          user
          size="50px"
          class="site-header-avatar"
          :class="{ active: userMenuActive }"
          @click.native="toggleUserMenu"
        />
        <ul class="site-header-user-menu" :class="{ active: userMenuActive }">
          <router-link to="/user-profile" class="site-header-nav-link">
            <li class="site-header-user-menu-item">Profile</li>
          </router-link>
          <router-link to="/edit-profile" class="site-header-nav-link">
            <li class="site-header-user-menu-item">Edit Profile</li>
          </router-link>
          <!-- <router-link to="/bookings" class="site-header-nav-link">
            <li class="site-header-user-menu-item">My Bookings</li>
          </router-link>-->
          <router-link to="/backoffice" class="site-header-nav-link">
            <li class="site-header-user-menu-item">Back Office</li>
          </router-link>
          <div v-if="this.$store.getters.user.isAdmin === true">
            <router-link to="/admin" class="site-header-nav-link">
              <li class="site-header-user-menu-item">Admin</li>
            </router-link>
          </div>
          <li class="site-header-user-menu-item" @click="logout">Log Out</li>
        </ul>
      </li>
    </ul>
    <!-- </nav> -->
  </header>
</template>
<script>
import avatar from "@/cmps/avatar.vue";
export default {
  name: "site-header",
  components: {
    avatar
  },
  data() {
    return {
      userMenuActive: false,
      navMenuActive: false
    };
  },
  computed: {
    headerClass() {
      let classObj = { active: this.navMenuActive };

      if (this.$route.path.includes("/home")) {
        classObj.home = true;
        // style.position = `absolute`;
        // style.background = `linear-gradient(0deg, rgba(2, 0, 36, 0) 5%,rgba(23, 62, 119, 0.6) 95%)`;
        // style.color = `white`;
        // style.boxShadow = "none";
      }
      return classObj;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch({
        type: "logout"
      });
      this.isLoggedIn;
      this.$router.push("/home");
    },
    toggleUserMenu() {
      this.userMenuActive = !this.userMenuActive;
    },
    toggleNavMenu() {
      this.navMenuActive = !this.navMenuActive;
    },
    resetFilter() {
      const filterBy = {};
      this.$store.commit({
        type: "updateFilterBy",
        filterBy
      });
    }
  }
};
</script>
