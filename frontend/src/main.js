import Vue from "vue";
import app from "@/app.vue";
import router from "@/router.js";
import store from "@/modules";
import "./filters/filters.js";

Vue.config.productionTip = false;
import "./styles/global.scss";

//Font - awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faGlobeEurope,
  faSave,
  faTrashAlt,
  faMinusCircle,
  faEllipsisV,
  faArrowDown,
  faCalendarDay,
  faChartPie,
  faStar,
  faComment,
  faPaperPlane,
  faCommentDots,
  faArrowUp
} from "@fortawesome/free-solid-svg-icons";
import {
  faCompass,
  faTimesCircle,
  faEye,
  faEyeSlash,
  faEdit,
  faArrowAltCircleRight,
  faArrowAltCircleLeft
  // faArrowDown
} from "@fortawesome/free-regular-svg-icons";
library.add(
  faGlobeEurope,
  faEdit,
  faSave,
  faTrashAlt,
  faCompass,
  faEye,
  faEyeSlash,
  faMinusCircle,
  faEllipsisV,
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
  faArrowDown,
  faCalendarDay,
  faChartPie,
  faTimesCircle,
  faStar,
  faPaperPlane,
  faCommentDots,
  faComment,
  faArrowUp
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

//Pie-chart

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(app)
}).$mount("#app");
