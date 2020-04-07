<template>
  <div id="map" style="width: 100%; height: 400px;"></div>
</template>
<script>
import { mapService } from "@/services/map.service.js";
export default {
  name: "tour-map",
  props: {
    locations: {
      type: Array
    }
  },
  watch: {
    locations: function() {
      this.locations.map(location => {
        mapService.addMarker(location.loc);
      });
      mapService.panTo(this.locations[0].loc);
    }
  },
  created() {
    mapService
      .initMap()
      .then(() => {
        mapService.panTo(this.locations[0].loc);
        this.locations.map(location => {
          mapService.addMarker(location.loc);
        });
      })
      .catch(console.log("INIT MAP ERROR"));
  }
};
</script>
