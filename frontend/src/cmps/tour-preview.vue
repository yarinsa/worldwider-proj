<template>
  <section>
    <div v-if="tour">
      <div class="tour-preview-container" :style="bcg">
        <div class="tour-preview-info">
          <avatar
            class="tour-preview-info-avatar"
            :url="tour.tourGuide.userImgUrl"
            size="50px"
          />
          <p class="tour-preview-info-name">
            {{ tour.name }}
            <span class="tour-preview-info-guide">with {{ nameDispaly }}</span>
          </p>
          <div class="tour-preview-info-booking">
            <span class="tour-preview-info-booking-date"
              >{{ tour.duration | duration }}&nbsp; •</span
            >
            <span class="tour-preview-info-booking-date"
              >&nbsp; Up to {{ tour.maxAttendees }} participents</span
            >
          </div>
          <div class="tour-preview-info-rating">
            <rating
              v-model="tour.tourGuide.rating.avg"
              single
              show-only
              :total="tour.tourGuide.rating.total"
            />
          </div>
          <span class="tour-preview-info-price"
            >{{ tour.price | price }} / per person</span
          >
          <div class="tour-preview-info-tags">
            <cube-textbox :text="tour.city" mono-color-blue />
            <cube-textbox
              v-for="(tag, idx) in tour.tags"
              :text="tag"
              :key="idx"
              mono-color
            />
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="tour-preview-container" :style="bookingBcg">
        <div class="tour-preview-info">
          <avatar
            class="tour-preview-info-avatar"
            :url="booking.guide.userImgUrl"
            size="50px"
          />
          <p class="tour-preview-info-name">
            {{ booking.tour.name }}
            <span class="tour-preview-info-guide">with {{ nameDispaly }}</span>
          </p>
          <div class="tour-preview-info-booking">
            <span class="tour-preview-info-booking-date"
              >Tour Date: {{ booking.date | date }}</span
            >
            <br />
            <span class="tour-preview-info-booking-date"
              >Booked: {{ booking.bookingDate | date }}</span
            >
            <br />
          </div>
          <span class="tour-preview-info-price"
            >{{ booking.totalCost | price }} /
            {{ booking.attendees }} people</span
          >

          <!-- <span class="tour-preview-info-price">Total: {{ booking.totalCost | price }}</span> -->
        </div>
      </div>
      <br />
    </div>
  </section>
</template>

<script>
import avatar from "@/cmps/avatar.vue";
import rating from "@/cmps/rate.vue";
import cubeTextbox from "@/cmps/cube-textbox.vue";
export default {
  name: "tour-preview",
  props: {
    tourGuide: { type: Object },
    tour: { type: Object },
    booking: { type: Object }
  },
  components: {
    avatar,
    rating,
    cubeTextbox
  },
  computed: {
    nameDispaly() {
      var nameStr = "";
      if (this.booking) {
        nameStr = `${this.booking.guide.firstName} ${this.booking.guide.lastName}`;
      } else if (this.tour) {
        nameStr = `${this.tour.tourGuide.firstName} ${this.tour.tourGuide.lastName}`;
      }
      return nameStr;
    },
    bcg() {
      let style = {};
      // style.background = `linear-gradient(70deg,rgba(0, 0, 0, 0) 70%, rgba(255, 255, 255, 1) 100%)`;
      style.background = ` url(${this.tour.tourImgUrls[0]}) center / cover`;
      // style.backgroundSize = "cover";
      // style.backgroundPosition = "center";
      return style;
    },
    bookingBcg() {
      let style = {};
      // style.background = `linear-gradient(70deg,rgba(0, 0, 0, 0) 70%, rgba(255, 255, 255, 1) 100%)`;
      style.background = ` url(${this.booking.tour.tourImgUrls[0]}) center / cover`;
      // style.backgroundSize = "cover";
      // style.backgroundPosition = "center";
      return style;
    }
  },
  methods: {
    removeTour(tourGuide) {
      this.$emit("removeTour", Object.values(tourGuide));
    },
    viewTour(tourId) {
      this.$router.push(`/tours/${tourId}`);
    },
    emitCancel(bookingId) {
      console.log(bookingId);
      this.$emit("cancelBooking", bookingId);
    }
  },
  created() {
    // console.log("IN PREVIRE ", this.booking);
  }
};
</script>

<style scoped>
img {
  width: 40px;
}
</style>
