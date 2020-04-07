<template>
  <div class="about-project-container">
    <rounded-button
      class=" about-project-top-button chat-button "
      fa-icon="arrow-up"
      :class="{ active: isActive }"
      @click.native="goto('header')"
    />
    <h1 ref="header">About this project</h1>
    <p>
      Worldwider is an app that lets anyone create an income from being a tour
      guide in his own city.
      <br />
      The app was build using the most new technologies available such as
      Vue.js, MongoDB, Socket.io, SASS and REST API.
    </p>
    <h3>Key features & Ideas:</h3>
    <ul>
      <li @click="goto('design')" class="about-project-list-item">Design</li>
      <li @click="goto('inline')" class="about-project-list-item">
        Live Editing
      </li>
      <li @click="goto('google')" class="about-project-list-item">
        Google Maps API
      </li>
      <li @click="goto('chat')" class="about-project-list-item">Chat</li>
      <li @click="goto('components')" class="about-project-list-item">
        Reusable Components
      </li>
      <li @click="goto('mongo')" class="about-project-list-item">
        Server filtering, Review & Booking systems
      </li>
    </ul>
    <div class="about-project-feature" ref="design">
      <h3 class="about-project-feature-title">
        Design
      </h3>
      <p class="about-project-feature-text long">
        worldwider is completley self designed, not another replica of exisiting
        website or dribble concept. Altough the creation of worldwider required
        learning and investigating UX of the most popular websites.
        <br />
        worldwider is designed using powerful SASS, and it's responsive and
        looks great on every device :)

        <img
          src="@/assets/img/about-project/responsive.jpg"
          class="about-project-feature-img"
        />
      </p>
    </div>
    <div class="about-project-feature">
      <h3 class="about-project-feature-title" ref="inline">Inline editing</h3>
      <p class="about-project-feature-text">
        worldwider is using to most recent Vue.js features such as creating
        "costum inputs" which let worldwider users live edit their pages.
        <img
          src="@/assets/img/about-project/inline-editing.jpg"
          class="about-project-feature-img"
        />
      </p>
    </div>
    <div class="about-project-feature">
      <h3 ref="google" class="about-project-feature-title">Google Maps API</h3>
      <p class="about-project-feature-text">
        worldwider is using Google Maps API to search & display locations around
        the world. The results are optimized, displayed and eventually stored
        with only the relevent info.

        <img
          src="@/assets/img/about-project/google-api.jpg"
          class="about-project-feature-img"
        />
      </p>
    </div>
    <div class="about-project-feature" ref="chat">
      <h3 class="about-project-feature-title">Chat</h3>
      <p class="about-project-feature-text long">
        worldwider is using Socket.io to allow online users and guests to chat.
        The chat is divided into chat rooms by city.

        <img
          src="@/assets/img/about-project/chat.jpg"
          class="about-project-feature-img chat"
        />
      </p>
    </div>
    <div ref="components" class="about-project-feature">
      <h3 class="about-project-feature-title">
        Self made & reusable components
      </h3>
      <p class="about-project-feature-text">
        Across worldwider website there are no components libreries. It's true
        that they usually offer better outcome and easier usage, but making them
        allowed deep understanding of event handling and User experiance.

        <img
          src="@/assets/img/about-project/inputs.jpg"
          class="about-project-feature-img"
        />
      </p>
    </div>
    <div class="about-project-feature" ref="mongo">
      <h3 class="about-project-feature-title">
        Server filtering, Review & Booking systems
      </h3>
      <p class="about-project-feature-text long">
        worldwider uses MongoDB to fetch and store all the data. Creating fully
        working booking & reviews systems forces collecting data from various
        collection, and require good understanding of Promise and async code.

        <img
          src="@/assets/img/about-project/reviews.jpg"
          class="about-project-feature-img"
        />
      </p>
    </div>
  </div>
</template>

<script>
import roundedButton from "@/cmps/rounded-button.vue";
export default {
  name: "about-project",
  components: {
    roundedButton
  },
  methods: {
    goto(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;
      window.scrollTo(0, top);
    }
  }
};
</script>
