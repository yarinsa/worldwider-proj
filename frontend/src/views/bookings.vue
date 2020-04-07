<template>
  <section>
    <div class="booking-container">
      <div>
        <div class="booking-nav">
          <span
            class="booking-nav-item"
            :class="{ active: isUpcoming === null }"
            @click="isUpcoming = null"
          >All</span>
          <span
            class="booking-nav-item"
            :class="{ active: isUpcoming }"
            @click="isUpcoming = true"
          >Upcoming</span>
          <span
            class="booking-nav-item"
            :class="{ active: isUpcoming === false }"
            @click="isUpcoming = false"
          >Past</span>
        </div>
        <h1 v-if="bookingToDisplay.length === 0">Oops... it's seems like there is nothing here.</h1>
        <tour-list
          :bookings="bookingToDisplay"
          @cancelBooking="cancelBooking"
          class="booking-list"
          :key="isUpcoming"
        />
      </div>
    </div>
  </section>
</template>

<script>
import tourList from "@/cmps/tour-list.vue";

export default {
  name: "bookings",
  components: {
    tourList
  },
  data() {
    return {
      bookings: [],

      isUpcoming: null
    };
  },
  methods: {
    async loadBookings() {
      this.bookings = await this.$store.dispatch({
        type: "loadUserBookings"
      });
    },
    async cancelBooking(bookingId) {
      await this.$store.dispatch({
        type: "cancelReservation",
        bookingId
      });
    }
  },
  computed: {
    bookingToDisplay() {
      if (this.isUpcoming) {
        //upcoming
        return this.$store.getters.bookings.filter(
          booking => booking.date > Date.now()
        );
      } else if (this.isUpcoming === null) {
        //all
        return this.$store.getters.bookings;
      } else {
        //Passed
        return this.$store.getters.bookings.filter(
          booking => booking.date < Date.now()
        );
      }
    }
  },
  created() {
    this.loadBookings();
  }
};
</script>
