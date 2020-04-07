<template>
  <form class="add-review-container" @submit.prevent="addReview">
    <h3>Write a review...</h3>
    <site-input
      prepand="Name"
      required
      :disabled="isDisabled"
      class="add-review-name"
      v-model="review.name"
    />
    <site-input
      class="add-review-textarea"
      v-model="review.text"
      type="textarea"
      placeholder="Write review here"
    />
    <rating class="add-review-rating" v-model="review.rating" />

    <primary-button text="Send" type="submit" />
  </form>
</template>

<script>
import siteInput from "@/cmps/site-input.vue";
import primaryButton from "@/cmps/primary-button.vue";
import rating from "@/cmps/rate.vue";
export default {
  name: "AddReview",
  components: {
    primaryButton,
    siteInput,
    rating
  },
  props: {
    tourId: {
      required: true
      // type: String
    }
  },
  created() {
    this.loadTour();
    this.loadUser();
  },
  data() {
    return {
      tour: null,
      id: null,
      review: {
        text: "",
        tourGuideId: this.$store.getters.getTour.tourGuideId,
        userId: null,
        rating: 0,
        name: ""
      },
      isDisabled: this.$store.getters.isLoggedIn
    };
  },
  methods: {
    async loadTour() {
      const tourId = this.$route.params.id;
      const tour = await this.$store.dispatch({
        type: "loadTour",
        tourId
      });
      this.tour = tour;
      this.id = this.tour.tourGuideId;
      return this.id;
    },
    async addReview() {
      await this.$store.dispatch({
        type: "addReview",
        review: this.review
      });
      await this.$store.dispatch({
        type: "loadReviews"
      });
    },
    loadUser() {
      if (this.$store.getters.user._id) {
        this.review.name = this.$store.getters.user.firstName;
        this.review.userId = this.$store.getters.user._id;
      }
    }
  }
};
</script>
