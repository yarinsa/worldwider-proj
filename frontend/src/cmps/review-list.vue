<!-- In order to use this component you have to send tour guide id !-->

<template>
  <section class="review-list-container">
    <div class="review-list-header">
      <h2>
        Reviews
        <rate :value="avg" single show-only :total="total" />
      </h2>
    </div>
    <div v-if="reviewsList.length > 0">
      <div v-for="(review, idx) in reviewsList" :key="idx" class="review-list-item-container">
        <div class="review-list-item-avatar-container">
          <avatar
            size="80px"
            :url="avatarUrl(review.by.userImgUrl)"
            class="review-list-item-avatar"
          />
          <span
            v-if="review.by.createdAt"
            class="review-list-item-joined"
          >Joined {{ review.by.createdAt | date }}</span>
        </div>
        <div class="review-list-item-content-container">
          <h3 class="review-list-item-header">{{ review.by.firstName }} {{ review.by.lastName }}</h3>
          <span class="review-list-item-content-info">
            <rate :value="review.rating" show-only />
            • {{ review.createdAt | date }}
          </span>
          <p class="review-list-item-text">{{ review.text }}</p>
          <button
            @click="remove(review._id)"
            class="review-list-item-remove"
            v-if="currUser._id === review.by._id && review.by._id"
          >
            <font-awesome-icon :icon="['fas', 'trash-alt']" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import rate from "@/cmps/rate.vue";
import avatar from "@/cmps/avatar.vue";
export default {
  name: "ReviewsList",
  components: {
    rate,
    avatar
  },
  props: {
    tourGuideId: {
      type: String
      // required: true,
    }
  },
  data() {
    return {
      currUser: this.$store.getters.user
    };
  },
  methods: {
    async getReviews() {
      const tourGuideId = this.tourGuideId;
      if (tourGuideId) {
        const filterBy = { tourGuideId };
        await this.$store.commit({
          type: "setFilterReviewsBy",
          filterBy
        });
        await this.$store.dispatch({
          type: "loadReviews"
        });
      }
      // this.reviewsList = reviews.reviews;
      // this.avg = reviews.avg;
      // this.total = reviews.total;
    },
    avatarUrl(url) {
      if (url) {
        return url;
      } else {
        return null;
      }
    },
    // emitRemove(reviewId) {
    //   this.$emit("removeReview", reviewId);
    // }
    async remove(reviewId) {
      await this.$store.dispatch({
        type: "removeReview",
        reviewId
      });
      this.$store.dispatch({
        type: "loadReviews"
      });
    }
  },
  computed: {
    reviewsList() {
      return this.$store.getters.reviews.reviews;
    },
    avg() {
      return this.$store.getters.reviews.avg;
    },
    total() {
      return this.$store.getters.reviews.total;
    }
  },
  created() {
    this.getReviews();
  }
};
</script>
