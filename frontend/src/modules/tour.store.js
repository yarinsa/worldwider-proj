import { tourService } from "@/services/tour.service.js";
import { utilService } from "@/services/util.service.js";

export const tourStore = {
  state: {
    tours: [],
    tour: {},
    filterBy: {},
    sortBy: {}
  },
  getters: {
    getFilter(state) {
      return state.filterBy;

    },
    getTours(state) {
      return state.tours;
    },
    getTour(state) {
      return state.tour;
    },
    toursToDisplay(state) {
      if (!state.filterBy) return state.tours;
      if (state.filterBy.city) {
        return state.tours.filter(tour => {
          const currTour = tour.city.toLowerCase();
          return currTour.includes(state.filterBy.city.toLowerCase())
        });
      }
      // state.filterBy = {}
      // if (state.filterBy.status) {
      //   return tourService.filterByStatus(state.filterBy.status)
      // }
    },
    // tourAfterSort(state) {
    //   if (!state.sortBy) return state.tours;
    //   if (state.sortBy) {
    //     return function (a, b) {
    //       return a[property] - b[property];
    //     };


    //     return state.tours.filter(tour => {
    //       console.log('TODO IN FILTER:', tour);
    //       const currTour = tour.city.toLowerCase();
    //       return currTour.includes(state.filterBy.city.toLowerCase())
    //     });
    //   }
    // }
  },
  mutations: {
    addTour(state, { updatedTour }) {
      state.tours.unshift(updatedTour);
    },
    removeTourFromList(state, { tourId }) {
      const idx = state.tours.findIndex(currTour => currTour._id === tourId);
      if (idx === -1) return;
      state.tours[idx].tour = {
        name: "",
        bio: "",
        price: null,
        tourUrls: ["", "", ""],
        availability: {},
        maxAttendees: null
      };
    },
    setTours(state, { tours }) {
      state.tours = tours;
    },
    setTour(state, { tour }) {
      state.tour = tour;
    },
    updateTour(state, { tour }) {
      const idx = state.tours.findIndex(currTour => currTour._id === tour._id);
      if (idx === -1) return;
      state.tours.splice(idx, 1, tour);
    },
    updateFilterBy(state, { filterBy }) {

      state.filterBy = filterBy;
    },
    updateSortBy(state, { sortBy }) {
      state.sortBy = sortBy;
    }
  },
  actions: {
    async uploadImg(context, { ev }) {
      const img = await utilService.uploadImg(ev);
      return img;
    },
    async loadTours(context) {

      let filter = JSON.parse(JSON.stringify(context.state.filterBy));
      // const filter = context.state.filterBy;
      const sort = JSON.parse(JSON.stringify(context.state.sortBy));

      const tours = await tourService.query(filter, sort);
      context.commit({ type: "setTours", tours });
      return tours;
    },

    async loadTour(context, { tourId }) {
      if (tourId === "add" || !tourId) {
        const tour = await tourService.getEmpty();
        tour.tourGuide = context.getters.user;
        context.commit({ type: "setTour", tour });
        return tour;
      } else {
        let tour = await tourService.getById(tourId);
        tour = tour[0];
        context.commit({ type: "setTour", tour });
        return tour;
      }
    },

    async removeTour(context, { tourId }) {
      await tourService.remove(tourId);
      context.commit({ type: "removeTourFromList", tourId });
    },

    async saveTour(context, { tour }) {
      const isEdit = !!tour._id;
      tour.tourGuideId = tour.tourGuide._id;
      delete tour.tourGuide._id;
      delete tour.tourGuide.isAdmin;
      const updatedTour = await tourService.save(tour);
      context.commit({
        type: isEdit ? "addTour" : "updatedTour",
        updatedTour
      });
      return updatedTour;
    }
  }
}

