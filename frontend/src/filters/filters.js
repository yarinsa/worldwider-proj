import Vue from "vue";
import moment from "moment";
var momentDurationFormatSetup = require("moment-duration-format");

momentDurationFormatSetup(moment);

Vue.filter("price", num => {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    style: "currency",
    currency: "USD"
  });
});

Vue.filter("date", timestamp => {
  return moment(new Date(timestamp)).fromNow();
});
Vue.filter("MM-YY", timestamp => {
  let date = "";
  date += moment(new Date(timestamp)).month();
  date += moment(new Date(timestamp)).year();
  return date;
});

Vue.filter("duration", timeInMs => {
  return moment.duration(timeInMs, "milliseconds").format("d[d] h[h] m[m]", {
    trim: "both"
  });
});
