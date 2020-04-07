<template>
  <section :key="$route.path">
    <div v-if="tour" class="tour-details-container">
      <div class="tour-details-imgs">
        <imgs-gallery
          class="tour-details-imgs-gallery"
          :imgList="tour.tourImgUrls"
        />
        <div v-if="isUserAllowedToEdit" class="tour-details-imgs-upload">
          <h2>Upload Some Images of your tour</h2>
          <site-input @input="handleImgUpload" type="file" />
        </div>
      </div>
      <div v-if="tour.tourGuideId" class="tour-details-book">
        <div class="tour-details-book-content">
          <input
            type="date"
            class="input tour-details-book-date"
            placeholder="When?"
            v-model="booking.date"
          />
          <site-input
            type="select"
            :options="['1', '2', '3', '4', '5']"
            placeholder="Attendees"
            stretch
            class="tour-details-book-attendees"
            v-model="booking.attendeesAmount"
          />

          <primary-button
            :text="`Reserve ${booking.attendeesAmount} spots for $${totalCost}`"
            class="tour-details-book-button"
            @click.native="handleBooking"
          />
        </div>
      </div>
      <div class="tour-details-head">
        <div class="tour-details-info">
          <editable
            class="tour-details-info-title"
            :allowed="isUserAllowedToEdit"
            v-model="tour.name"
          />
          <editable
            class="tour-details-info-city"
            :allowed="isUserAllowedToEdit"
            v-model="tour.city"
          />
          <editable
            class="tour-details-info-desc"
            :allowed="isUserAllowedToEdit"
            v-model="tour.desc"
          />
          <div class="tour-details-info-lang">
            <span v-for="(language, idx) in tour.tourGuide.languages" :key="idx"
              >{{ language }},</span
            >
          </div>

          <span class="tour-details-info-price">
            Duration: &nbsp; {{ tour.duration | duration }}
          </span>
          <br />
          <span>
            <span class="tour-details-info-price">$</span>
            <editable
              class="tour-details-info-price"
              :allowed="isUserAllowedToEdit"
              v-model="tour.price"
            />/ per person
          </span>
          <div class="tour-details-info-tags">
            <site-input
              v-if="isUserAllowedToEdit"
              type="multiselect"
              prepand="Categories"
              :options="require('@/tags.json')"
              v-model="tour.tags"
            />
            <div v-if="!isUserAllowedToEdit">
              <cube-textbox
                v-for="(tag, idx) in tour.tags"
                :allowed="isUserAllowedToEdit"
                :text="tag"
                :key="idx"
                mono-color
              />
            </div>
          </div>
          <div class="tour-details-info-duration">
            <site-input
              v-if="isUserAllowedToEdit"
              type="select"
              prepand="Duration"
              append="Minutes"
              @input="handleDuration"
              v-model="durationBeforeFormat"
              :options="['30', '60', '90', '120', '150']"
            />
          </div>
        </div>
      </div>
      <div v-if="isUserAllowedToEdit" class="tour-details-map-search-container">
        <h2 class="tour-details-map-search-list-title">
          Show your audiance where you will visit:
        </h2>
        <div class="tour-details-map-search-input">
          <site-input
            placeholder="Type to search..."
            @input.native="handleLocation"
          />
          <span class="tour-details-map-list-hint">Click to add</span>
        </div>
        <ul class="tour-details-map-search-results">
          <li
            v-for="(result, idx) in searchResults"
            @click="
              addSpot({
                name: result.name,
                loc: result.geometry.location
              })
            "
            :key="idx"
          >
            <cube-textbox
              :text="result.name"
              mono-color
              @remove="tour.spots.splice(idx, 1)"
            />
          </li>
        </ul>
        <div class="tour-details-map-search-selected">
          <cube-textbox
            v-for="(spot, idx) in tour.spots"
            :key="idx"
            :text="spot.name"
            removeable
            mono-color-blue
            @remove="tour.spots.splice(idx, 1)"
          />
        </div>
      </div>
      <div class="tour-details-map">
        <div class="tour-details-map-list-container">
          <h2 class="tour-details-map-list-title">Where will you travel?</h2>
          <span class="tour-details-map-hint">Click to show on the map</span>
          <ul class="tour-details-map-list">
            <li
              v-for="(spot, idx) in tour.spots"
              @click="showSpot(spot)"
              :class="{ active: spot.name === selectedSpot }"
              :key="idx"
            >
              {{ spot.name }}
            </li>
          </ul>
        </div>
        <tour-map class="tour-details-map-item" :locations="tour.spots" />
      </div>
      <div class="tour-details-profile">
        <span class="tour-details-profile-rating">
          <rating v-model="tour.tourGuide.rating.avg" show-only />
        </span>
        <avatar
          @click.native="userProfile(tour.tourGuideId)"
          class="tour-details-profile-avatar"
          :url="tour.tourGuide.userImgUrl"
          size="200px"
        />
        <div>
          <h2 class="tour-details-profile-name">
            {{ tour.tourGuide.firstName }} {{ tour.tourGuide.lastName }}
          </h2>
          <span class="tour-details-profile-joined"
            >Member since {{ tour.tourGuide.createdAt | date }}</span
          >
          <p class="tour-details-profile-bio">"{{ tour.tourGuide.bio }}"</p>
        </div>
      </div>
      <div class="tour-details-actions">
        <rounded-button
          v-if="isUserAllowedToEdit"
          class="tour-details-actions-item"
          @click.native="updateTour(tourGuide)"
          faIcon="save"
        />
        <rounded-button
          v-if="isUserAllowedToEdit"
          faIcon="trash-alt"
          class="tour-details-actions-item"
          @click.native="removeTour"
        />
        <!-- v-if="isUserAllowedToEdit && !isNewTour"  -->
      </div>
      <div class="tour-details-reviews">
        <add-review :tourId="$route.params.tourId" />
        <review-list :tourGuideId="tour.tourGuideId" />
      </div>
    </div>
  </section>
</template>

<script>
import editable from "@/cmps/editable.vue";
import siteInput from "@/cmps/site-input.vue";
import roundedButton from "@/cmps/rounded-button.vue";
import primaryButton from "@/cmps/primary-button.vue";
import cubeTextbox from "@/cmps/cube-textbox.vue";
import tourMap from "@/cmps/tour-map.vue";
import rating from "@/cmps/rate.vue";
import avatar from "@/cmps/avatar.vue";
import addReview from "@/cmps/add-review.vue";
import reviewList from "@/cmps/review-list.vue";
import { mapService } from "@/services/map.service.js";
import { eventBus } from "@/services/event-bus.service.js";
import imgsGallery from "@/cmps/imgs-gallery.vue";
// import moment from "moment";

export default {
  name: "tour-details",
  components: {
    imgsGallery,
    editable,
    roundedButton,
    cubeTextbox,
    tourMap,
    rating,
    avatar,
    siteInput,
    addReview,
    primaryButton,
    reviewList
  },
  data() {
    return {
      tourGuide: null,
      isUserAllowedToEdit: false,
      searchResults: [],
      isBookFixed: false,
      tour: null, // fixing to tour data
      booking: {
        attendeesAmount: "1"
      },
      isNewTour: false,
      selectedSpot: "",
      durationBeforeFormat: "30"
    };
  },
  computed: {
    totalCost() {
      return this.booking.attendeesAmount * this.tour.price;
    }
  },
  methods: {
    /// --------------------MAPS--------------------------///
    handleLocation(event) {
      const query = event.target.value;
      mapService
        .searchLocation(query)
        .then(results => {
          this.searchResults = [...results];
        })
        .catch(err => {
          this.searchResults = [`Error: ${err}`];
        });
      event.target.value = query;
    },
    showSpot(spot) {
      this.selectedSpot = spot.name;
      mapService.panTo(spot.loc);
    },
    addSpot(newSpot) {
      let isExist = this.tour.spots.find(
        spot =>
          spot.loc.lat === newSpot.loc.lat && spot.loc.lng === newSpot.loc.lng
      );
      if (isExist) return;
      this.tour.spots.unshift(newSpot);
      mapService.addInfoWindow(newSpot);
    },

    /// --------------------TOUR CRUD--------------------------///

    async loadTour() {
      const tourId = this.$route.params.id;
      if (tourId === "add") {
        const user = this.$store.getters.user;
        if (!user._id) {
          this.$router.push("/login");
        } else {
          const tour = await this.$store.dispatch({ type: "loadTour" });
          this.tour = JSON.parse(JSON.stringify(tour));
          this.isUserAllowedToEdit = true;
          this.isNewTour = true;
        }
      } else {
        const tour = await this.$store.dispatch({
          type: "loadTour",
          tourId
        });
        this.tour = tour;
        if (this.tour.tourGuideId === this.$store.getters.user._id) {
          this.isUserAllowedToEdit = true;
        }
        this.tour = tour;
      }
      return this.tour;
    },

    async removeTour() {
      const tourId = this.tour._id;
      await this.$store.dispatch({
        type: "removeTour",
        tourId
      });
      await this.$store.dispatch({
        type: "loadTours"
      });
      this.$router.push("/explore");
    },

    async updateTour() {
      const tour = this.tour;
      await this.$store.dispatch({
        type: "saveTour",
        tour
      });
      await this.$store.dispatch({
        type: "loadTours"
      });
      this.$router.push("/explore");
    },

    handleImgUpload(event) {
      this.tour.tourImgUrls.unshift(event);
    },
    handleDuration(event) {
      this.tour.duration = +event * 60000;
    },
    /// --------------------BOOKING--------------------------///
    async handleBooking() {
      const booking = this.booking;
      booking.date = new Date(this.booking.date).getTime();
      booking.tourId = this.tour._id;
      booking.userId = this.$store.getters.user._id;
      booking.totalCost = this.totalCost;
      try {
        await this.$store.dispatch({
          type: "saveBooking",
          booking
        });
        console.log("booked");
        const msg = {
          txt: `${this.tour.name} booked successfully!`,
          type: "success"
        };
        eventBus.$emit("show-msg", msg);
      } catch (err) {
        const msg = {
          txt: `There was problem booking your tour`,
          type: "danger"
        };
        eventBus.$emit("show-msg", msg);
      }
      this.$store.dispatch({
        type: "loadUserBookings"
      });
    },
    userProfile(userId) {
      this.$router.push("/user-profile/" + userId);
    },
    setInitialDate() {
      // console.log("setting date");
      // let date = "";
      // date += moment(new Date()).year() + "-";
      // date += moment(new Date()).month() + "-";
      // date += moment(new Date()).date();
      // this.booking.date = date;
      // return date;
    }
  },
  created() {
    this.loadTour();
    // this.setInitialDate();
    // window.addEventListener("scroll", this.handleScroll);
  }
};
</script>
