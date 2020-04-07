<template>
  <section>
    <div class="filter-container">
      <div class="filter-first-row">
        <site-input
          type="text"
          v-model="filterBy.city"
          class="filter-input-city"
          stretch
          placeholder="Where do you want to travel?"
        />
      </div>
      <div class="filter-second-row">
        <div class="filter-input-categories-container">
          <primary-button
            class="filter-input-categories-button"
            text="Categories"
          />
          <site-input
            v-model="filterBy.tags"
            type="select"
            class="filter-input-categories"
            :options="require('@/tags.json')"
            placeholder="Choose category"
          />
        </div>
        <div class="filter-input-price-container">
          <primary-button
            class="filter-input-price-range"
            text="Price Range:"
          />
          <site-input
            type="text"
            class="filter-input-price-range-min"
            v-model="filterBy.minPrice"
            placeholder="Min. Price"
          />
          <site-input
            type="text"
            class="filter-input-price-range-max"
            v-model="filterBy.maxPrice"
            placeholder="Max. Price"
          />
        </div>
        <primary-button
          class="filter-reset-btn"
          @click.native="filterBy = {}"
          text="Reset"
        />
      </div>
      <div class="filter-third-row">
        <checkbox label="See top rated first" @input="emitSort" />
      </div>
    </div>
  </section>
</template>
<script>
import siteInput from "@/cmps/site-input.vue";
import checkbox from "@/cmps/checkbox.vue";
import primaryButton from "@/cmps/primary-button.vue";

export default {
  name: "tour-filter",
  components: {
    siteInput,
    primaryButton,
    checkbox
  },
  data() {
    return {
      filterBy: {}
    };
  },
  watch: {
    filterBy: {
      handler() {
        let filter = JSON.parse(JSON.stringify(this.filterBy));
        this.$emit("set-filter", filter);
      },
      deep: true
    }
  },
  methods: {
    emitSort(value) {
      console.log(value);
      this.$emit("set-sort", { rating: value });
    }
  }
};
</script>
