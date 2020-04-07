<template>
  <div class="booking-preview-container">
    <h3>
      &nbsp;
      <router-link :to="`/tours/${booking.tour._id}`"
        >{{ booking.tour.name }} -</router-link
      >
      &nbsp;{{ timeStampToDate(booking.date) }} - &nbsp; Attendees:
      {{ totalReservationsAttendees }} - &nbsp;Total Income: ${{
        totalReservationsIncome
      }}
    </h3>
    <div class="booking-preview-reservations-container">
      <div
        v-for="(reservation, idx) in booking.reservations"
        :key="idx"
        class="booking-preview-reservations-item"
        :style="style(reservation.user.imgUrl)"
      >
        <!-- <img :src="reservation.user.imgUrl" /> -->
        <div class="booking-preview-reservations-item-info">
          <router-link :to="`/user-profile/${reservation.user._id}`">
            <div class="booking-preview-reservations-item-info-name">
              {{ reservation.user.firstName }} &nbsp;
              {{ reservation.user.lastName }}
            </div>
          </router-link>
          <!-- <span class="booking-preview-reservations-item-info-email">
            <a class="link" :href="`mailto:${reservation.user.email}`">{{ reservation.user.email }}</a>
          </span>-->

          <span class="booking-preview-reservations-item-info-attendees"
            >Attendees: {{ reservation.attendees }}</span
          >
          <span class="booking-preview-reservations-item-info-total"
            >${{ reservation.totalCost }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "booking-preview",
  props: {
    booking: {
      type: Object,
      required: true
    }
  },
  methods: {
    timeStampToDate(timestamp) {
      var date = new Date(timestamp);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    },
    style(userImgUrl) {
      let style = {};
      style.background = ` url(${userImgUrl}) center / cover`;
      return style;
    }
  },
  computed: {
    totalReservationsIncome() {
      let sum = 0;
      this.booking.reservations.map(
        reservation => (sum += reservation.totalCost)
      );
      return sum;
    },
    totalReservationsAttendees() {
      let sum = 0;

      this.booking.reservations.map(
        reservation => (sum += reservation.attendees)
      );
      return sum;
    }
  }
};
</script>
