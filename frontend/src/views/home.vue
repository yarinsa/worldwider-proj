<template>
  <div class="home-container" ref="home">
    <div class="home-landing-container">
      <div class="home-landing-content">
        <span class="home-landing-header">Travel with anyone, anywhere, at any time...</span>
        <div class="home-landing-search-container">
          <site-input
            v-model="searchData.city"
            class="home-landing-search-input"
            placeholder="Where are you traveling to..."
          />
          <primary-button @click.native="search" class="home-landing-search-button" text="Search" />
        </div>
        <div class="home-landing-cubes">
          <cube-textbox
            v-for="(city, idx) in ['New York', 'London', 'Tel Aviv', 'Toronto']"
            :text="city"
            :key="idx"
            mono-color
            @click.native="search((searchData.city = city))"
          />
        </div>
      </div>
      <span class="home-arrow-down" @click="goto('porto')">
        <font-awesome-icon :icon="['fas', 'arrow-down']" />
      </span>
    </div>
    <div class="home-city-container" ref="porto">
      <h2>Popular with locals</h2>
      <tour-list :tours="toursToRender" :max-items="3" class="home-city-list" />
    </div>
    <div class="home-city-container">
      <h2>Explore the best of New York</h2>
      <tour-list :tours="getToursByCity('new york')" :max-items="3" class="home-city-list" />
    </div>
    <div class="home-city-container">
      <h2>Explore the best of London</h2>
      <tour-list :tours="getToursByCity('london')" :max-items="3" class="home-city-list" />
    </div>

    <!-- <div class="home-city-container">
      <h2>Top Rated Tour...</h2>
      <tour-list :tours="topRatedTours" :max-items="3" class="home-city-list" />
    </div>-->
    <div class="home-top-rated-container"></div>
  </div>
</template>

<script>
import primaryButton from "@/cmps/primary-button.vue";
import siteInput from "@/cmps/site-input.vue";
import tourList from "@/cmps/tour-list.vue";
import cubeTextbox from "@/cmps/cube-textbox.vue";

export default {
  name: "home",
  components: {
    "primary-button": primaryButton,
    "site-input": siteInput,
    tourList,
    cubeTextbox
  },
  data() {
    return {
      searchData: { city: "" }
    };
  },
  computed: {
    toursToRender() {
      return this.$store.getters.getTours;
    }
  },
  methods: {
    goto(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;
      window.scrollTo(0, top);
    },
    getToursByCity(city) {
      let filterBy = { city };
      return this.toursToRender.filter(tour => {
        const currTour = tour.city.toLowerCase();
        return currTour.includes(filterBy.city.toLowerCase());
      });
    },
    search() {
      const filterBy = this.searchData;
      this.$store.commit({
        type: "updateFilterBy",
        filterBy
      });
      this.$router.push("/explore");
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
    this.resetFilter();
    this.$store.dispatch({
      type: "loadTours"
    });
  }
  // destroyed() {
  //   this.resetFilter();
  // }
};
</script>

<style></style>
