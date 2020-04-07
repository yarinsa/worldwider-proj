import { userService } from "../services/user.service.js";
import { utilService } from "../services/util.service.js";
// import { now } from "moment";

export const userStore = {
  state: {
    users: [],
    isLoggedIn: false,
    user: userService.getEmptyUser()
  },
  getters: {
    user(state) {
      return state.user;
    },
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    users(state) {
      return state.users;
    }
  },
  mutations: {
    setUsers(state, { users }) {
      state.users = users;
    },
    setUser(state, { user }) {
      if (user) {
        sessionStorage.setItem("user", JSON.stringify(user));
        state.user = JSON.parse(sessionStorage.user);
        state.isLoggedIn = true;
      } else if (sessionStorage.user) {
        state.user = JSON.parse(sessionStorage.user);
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    },
    updateUser(state, { user }) {
      const idx = state.users.findIndex(currUser => currUser._id === user._id);
      state.users.splice(idx, 1, user);
    },
    removeUser(state, userId) {
      console.log('removemutation', state.users)
      const idx = state.users.findIndex(currUser => currUser._id === userId);
      state.users.splice(idx, 1);
    }
  },
  actions: {
    async loadUsers(context) {
      const users = await userService.query();
      context.commit({ type: "setUsers", users });
      return users;
    },
    async loadUser(context, { userId }) {
      const user = await userService.getById(userId);
      context.commit({ type: "setUser", user });
      return user;
    },
    async loadUserProfile(context, { userId }) {
      const user = await userService.getById(userId);
      // context.commit({ type: "setUser", user });
      return user;
    },
    async login(context, { credentials }) {
      const user = await userService.login(credentials);
      context.commit({ type: "setUser", user });
      return user;
    },
    async uploadImg(context, { ev }) {
      const img = await utilService.uploadImg(ev);
      return img;
    },

    async logout(context) {
      await userService.logout()
      context.commit({ type: 'setUser', user: null })
    },

    async saveUser(context, { user }) {
      sessionStorage.setItem("user", JSON.stringify(user));
      const newUser = await userService.save(user);
      context.commit({ type: "setUser", user: newUser });
      return newUser;
    },
    async removeUser(context, { userId }) {
      await userService.remove(userId);
      context.commit({ type: "removeUser" });
    }
  }
};
