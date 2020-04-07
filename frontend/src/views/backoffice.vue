<template>
  <section class="backoffice-wrapper">
    <div class="backoffice-container">
      <aside class="backoffice-sidebar">
        <div class="backoffice-sidebar-item" :class="{ active: view === 'stats' }">
          <span class="backoffice-sidebar-item-icon" @click="goto('stats')">
            <font-awesome-icon :icon="['fas', 'chart-pie']" />
          </span>
          <span class="backoffice-sidebar-item-text">Stats</span>
        </div>
        <div class="backoffice-sidebar-item" :class="{ active: view === 'bookings' }">
          <span class="backoffice-sidebar-item-icon" @click="goto('bookings')">
            <font-awesome-icon :icon="['fas', 'calendar-day']" />
          </span>
          <span class="backoffice-sidebar-item-text">Bookings</span>
        </div>
        <div class="backoffice-sidebar-item" :class="{ active: view === 'rating' }">
          <span class="backoffice-sidebar-item-icon" @click="goto('rating')">
            <font-awesome-icon :icon="['fas', 'star']" />
          </span>
          <span class="backoffice-sidebar-item-text">Rating</span>
        </div>
      </aside>
      <div class="backoffice-content-container">
        <div ref="stats" class="backoffice-content-stats">
          <h2>Your business data</h2>

          <chartLine />
        </div>
        <div ref="bookings" class="backoffice-content-bookings">
          <h2>Your Bookings:</h2>
          <div v-for="(booking, idx) in bookings" :key="idx">
            <booking-preview :booking="booking" :key="idx" @cancel="cancelBooking(booking._id)" />
          </div>
        </div>
        <div class="backoffice-content-reviews" ref="rating">
          <review-list :tourGuideId="this.$store.getters.user._id" />
        </div>
      </div>
    </div>
    <section v-if="bookings.length === 0">
      <h2>
        Oops...
        <br />Looks like no one has booked yet, maybe you should consider doing
        something else,
        <br />there is a cat picture to cheer you up
      </h2>
      <img
        src="https://www.peta.org/wp-content/uploads/2017/11/iStock-805170532_absolutimages-668x336.jpg?20190103112626"
      />
    </section>
  </section>
</template>
<script>
import bookingPreview from "@/cmps/booking-preview.vue";
import chartLine from "@/cmps/chart-line.vue";
import reviewList from "@/cmps/review-list.vue";
export default {
  name: "backoffice",
  components: {
    bookingPreview,
    chartLine,
    reviewList
  },
  data() {
    return {
      bookings: [],
      reservations: [],
      view: "stats"
    };
  },
  methods: {
    async loadBookings() {
      this.bookings = await this.$store.dispatch({
        type: "loadTourGuideBookings"
      });

      this.reservations = this.bookings.reduce((reservations, booking) => {
        return reservations.concat(booking.reservations);
      }, []);
    },
    async cancelBooking(bookingId) {
      await this.$store.dispatch({
        type: "cancelBooking",
        bookingId
      });
      this.bookings = await this.$store.dispatch({
        type: "loadTourGuideBookings"
      });
    },
    goto(refName) {
      this.view = refName;
      var element = this.$refs[refName];
      console.log(element);
      var top = element.offsetTop;
      window.scrollTo(0, top);
    }
  },
  created() {
    this.loadBookings();
  }
};
</script>

<style></style>
