import { bookingService } from "@/services/booking.service.js";

export const bookingStore = {
  state: {
    bookings: []
  },
  getters: {
    bookings(state) {
      return state.bookings;
    }
  },
  mutations: {
    setBookings(state, { bookings }) {
      state.bookings = bookings;
    },
    addBooking(state, { bookingFromDB }) {
      state.bookings.unshift(bookingFromDB);
    },
    removeBooking(state, { bookingId }) {
      const bookingIdx = state.bookings.findIndex(
        booking => booking._id === bookingId
      );
      state.bookings.splice(bookingIdx, 1);
      // state.bookings = state.bookings.filter(
      //   booking => booking._id !== bookingId
      // );
    }
  },
  actions: {
    async saveBooking(context, { booking }) {
      try {
        const bookingFromDB = await bookingService.save(booking);
        context.commit({
          type: "addBooking",
          bookingFromDB
        });
      } catch (error) {
        console.log("There was problem booking your tour");
      }
    },
    async loadUserBookings(context) {
      const bookings = await bookingService.getUserBookings(
        context.getters.user._id
      );
      context.commit({
        type: "setBookings",
        bookings
      });
      return bookings;
    },

    async loadTourGuideBookings(context) {
      const bookings = await bookingService.getTourGuideBookings(
        context.getters.user._id
      );
      context.commit({
        type: "setBookings",
        bookings
      });
      return bookings;
    },

    async cancelBooking(context, { bookingId }) {
      await bookingService.removeBooking(bookingId);
      context.commit({ type: "removeBooking", bookingId });
    },
    async cancelReservation(context, { bookingId }) {
      await bookingService.removeReservation(
        bookingId,
        context.getters.user._id
      );
      context.commit({ type: "removeBooking", bookingId });
    }
  }
};
