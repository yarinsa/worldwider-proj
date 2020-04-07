<template>
  <section class="tour-app-container">
    <!-- <div class="tour-filter"> -->
    <!-- <h4>This is tour filter</h4> -->
    <tour-filter @set-sort="setSort" @set-filter="setFilter"></tour-filter>
    <!-- </div> -->

    <div class="tour-app-list">
      <tour-list :tours="tours" :tourGuides="tourGuides"></tour-list>
    </div>

    <!-- home page lit for berlin -->
    <!-- <tour-list :filter="{city: "Berlin"}" :tourGuides="tourGuides"></tour-list> -->

    <!-- <router-view></router-view> -->
  </section>
</template>

<script>
import tourFilter from "@/cmps/tour-filter.vue";
import tourList from "@/cmps/tour-list.vue";

export default {
  name: "tour-app",
  components: {
    tourList,
    tourFilter
  },
  computed: {
    tours() {
      return this.$store.getters.getTours;
    },
    tourGuides() {
      return this.$store.getters.getTourGuides;
    },
    filterBy() {
      return this.$store.getters.filterBy;
    }
  },
  methods: {
    async getTours() {
      await this.$store.dispatch({
        type: "loadTours"
      });
    },
    setFilter(filterBy) {
      this.$store.commit({
        type: "updateFilterBy",
        filterBy
      });
      this.$store.dispatch({
        type: "loadTours"
      });
    },
    setSort(sortBy) {
      this.$store.commit({
        type: "updateSortBy",
        sortBy
      });
      this.$store.dispatch({
        type: "loadTours"
      });
    },
    resetFilter() {
      const filterBy = {};
      this.$store.commit({
        type: "updateFilterBy",
        filterBy
      });
    }
  },
  created() {
    this.getTours();
    this.resetFilter();
  }
};
</script>

<style></style>
