<template>
  <section>
    <ul v-if="tours" class="tour-list-container">
      <li v-for="tour in toursToRender" :key="tour._id">
        <router-link :to="'tours/' + tour._id">
          <tour-preview :tour="tour"></tour-preview>
        </router-link>
      </li>
    </ul>

    <ul v-if="bookings">
      <li v-for="booking in bookingsToRender" class="tour-list-item" :key="booking._id">
        <router-link :to="'tours/' + booking._id">
          <tour-preview :booking="booking"></tour-preview>
        </router-link>
        <button class="my-button danger" @click="cancelBooking(booking._id)">
          <font-awesome-icon :icon="['fas', 'trash-alt']" />
        </button>
      </li>
    </ul>
  </section>
</template>

<script>
import tourPreview from "./tour-preview.vue";
export default {
  name: "tour-list",
  props: {
    tours: Array,
    maxItems: {
      type: Number,
      default: Infinity
    },
    bookings: Array
  },
  components: {
    tourPreview
  },
  computed: {
    toursToRender() {
      if (this.maxItems) {
        return this.tours.slice(0, this.maxItems);
      }
      return this.tours;
    },
    bookingsToRender() {
      if (this.maxItems) {
        return this.bookings.slice(0, this.maxItems);
      }
      return this.bookings;
    }
  },
  methods: {
    cancelBooking(bookingId) {
      this.$emit("cancelBooking", bookingId);
    }
  }
};
</script>
