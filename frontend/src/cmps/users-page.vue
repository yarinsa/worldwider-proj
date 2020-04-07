<template>
  <div class="users-page">
    <h1>Users list</h1>
    <ul class="users-page-list">
      <li v-for="(user, idx) in users" :key="idx" class="users-page-list-item">
        <h4>
          {{user.firstName}}
          {{user.lastName}}
        </h4>
        <p>{{user._id}}</p>
        <button @click="removeUser(user._id)">x</button>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: "users-page",
  data() {
    return {
      users: []
    };
  },
  methods: {
    async setUsers() {
      const loadedUsers = await this.$store.dispatch({ type: "loadUsers" });
      this.users = loadedUsers;
    },
    async removeUser(userId) {
      await this.$store.dispatch({
        type: "removeUser",
        userId
      });
      await this.$store.dispatch({
        type: "loadUsers"
      });
    }
  },
  created() {
    this.setUsers();
  }
};
</script>

<style>
</style>