<template>
  <div>
    <div class="edit-profile-container">
      <section class="edit-profile-user-section">
        <div class="edit-profile-user-avatar-container">
          <site-input
            type="file"
            v-model="user.userImgUrl"
            class="edit-profile-user-avatar-input"
          />
          <avatar size="100px" user class="edit-profile-user-avatar" />
        </div>

        <div class="edit-profile-user-name">
          <editable
            class="edit-profile-user-name-item"
            v-model="user.firstName"
            allowed
          />
          <editable
            class="edit-profile-user-name-item"
            v-model="user.lastName"
            allowed
          />
        </div>
        <div class="edit-profile-user-joined">
          Joined {{ user.createdAt | date }}
        </div>
        <p class="edit-profile-user-bio-container">
          <span class="edit-profile-user-bio-title"
            >What's your story in few words?</span
          >
          <editable
            class="edit-profile-user-bio-text"
            v-model="user.bio"
            allowed
          />
        </p>
        <div class="edit-profile-user-languages">
          <site-input
            type="multiselect"
            prepand="Languages"
            stretch
            :options="require('@/languages.json')"
            v-model="user.languages"
          />
        </div>
        <div class="edit-profile-user-cred-container">
          <span class="edit-profile-user-cred-title">Email & Password</span>
          <span
            @click="editCredDisabled = !editCredDisabled"
            class="edit-profile-user-cred-enable"
          >
            <font-awesome-icon :icon="['far', 'edit']" />
          </span>
          <site-input
            v-model="user.email"
            :disabled="editCredDisabled"
            placeholder="Email"
            stretch
            class="edit-profile-user-cred-input"
          />
          <site-input
            v-model="user.password"
            :disabled="editCredDisabled"
            type="password"
            stretch
            class="edit-profile-user-cred-input"
            placeholder="New Password"
          />
          <site-input
            v-model="user.password"
            :disabled="editCredDisabled"
            stretch
            type="password"
            class="edit-profile-user-cred-input"
            placeholder="Confirm Password"
          />
        </div>
        <div class="edit-profile-user-actions">
          <primary-button text="Delete Account" @click.native="removeProfile" />
          <primary-button text="Save" @click.native="updateProfile" />
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import avatar from "@/cmps/avatar.vue";
import siteInput from "@/cmps/site-input.vue";
import editable from "@/cmps/editable";
import primaryButton from "@/cmps/primary-button.vue";
export default {
  name: "edit-profile",
  components: {
    avatar,
    siteInput,
    editable,
    primaryButton
  },
  data() {
    return {
      user: JSON.parse(JSON.stringify(this.$store.getters.user)),
      editCredDisabled: true
    };
  },
  methods: {
    async removeProfile() {
      await this.$store.dispatch({
        type: "removeUser",
        userId: this.user._id
      });
      this.$router.push("/home");
    },
    async updateProfile() {
      await this.$store.dispatch({
        type: "saveUser",
        user: this.user
      });
      this.$router.push("/user-profile");
    }
  },
  created() {
    if (this.user.bio === "") {
      this.user.bio = "I like adventures and meeting new people!";
    }
  }
};
</script>
