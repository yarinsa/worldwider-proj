import Vue from 'vue'
import Vuex from 'vuex'

import { userStore } from './user.store.js';
import { tourStore } from './tour.store.js';
import { bookingStore } from './booking.store.js';
import { reviewStore } from './review.store.js';


Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    modules: {
        userStore,
        tourStore,
        bookingStore,
        reviewStore
    }
})
