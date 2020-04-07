/* eslint-disable no-undef */
const MAP_KEY = "AIzaSyDsUYlakovTBY9oO5413n3HYQWD4QV4H-Q";

import Axios from "axios";
var axios = Axios.create({
  withCredentials: true
});
export const mapService = {
  initMap,
  addMarker,
  panTo,
  geocodeLatLng,
  getLocationFromAPI,
  getMarkerLocation,
  searchLocation,
  addInfoWindow
};
var map;
var mainMarker;
var infowindow;

export function initMap(lat = 32.0749831, lng = 34.9120554) {
  return _connectGoogleApi().then(() => {
    map = new google.maps.Map(document.querySelector("#map"), {
      center: { lat, lng },
      zoom: 15
    });
    map.addListener("dblclick", event => {
      moveMarker(event.latLng);
    });
  });
}

function addMarker(loc) {
  var marker = new google.maps.Marker({
    position: loc,
    map: map,
    title: "Hello World!"
  });
  if (!mainMarker) {
    mainMarker = marker;
  }
  return marker;
}
function addInfoWindow(spot) {
  new google.maps.InfoWindow({
    content: spot.name,
    position: spot.loc,
    map: map
  });
  // infowindow.setContent(spot.name);
}
function moveMarker(loc) {
  mainMarker.setPosition(loc);
  geocodeLatLng(loc);
}

function getMarkerLocation() {
  return { lat: mainMarker.position.lat(), lng: mainMarker.position.lng() };
}

function panTo(loc) {
  var laLatLng = new google.maps.LatLng(loc.lat, loc.lng);
  map.panTo(laLatLng);
}

function geocodeLatLng(loc) {
  const geocoder = new google.maps.Geocoder();
  if (!infowindow) infowindow = new google.maps.InfoWindow();
  geocoder.geocode({ location: loc }, function(results, status) {
    if (status === "OK") {
      if (results[0]) {
        infowindow.setContent(results[0].formatted_address);
        infowindow.open(map, mainMarker);
      } else {
        infowindow.setContent("Opps, it seems like there is nothing there!");
      }
    } else {
      infowindow.setContent("Opps, it seems like there is nothing there!");
    }
  });
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve();
  const API_KEY = MAP_KEY; //TODO: Enter your API Key
  var elGoogleApi = document.createElement("script");
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
  elGoogleApi.async = true;
  document.body.append(elGoogleApi);

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve;
    elGoogleApi.onerror = () => reject("Google script failed to load");
  });
}

function getLocationFromAPI(elValue) {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${elValue}&key=${MAP_KEY}`
    )
    .then(res => res);
}

async function searchLocation(query) {
  try {
    return await axios
      .get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${MAP_KEY}`,
        {
          withCredentials: false
        }
      )
      .then(async res => {
        const results = res.data.results;
        return results;
      });
    //maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRZAAAAuWf1rPXaw6f-UHQ-bA_cqQWLionP48ho1A-ysC8d-3PklphhW6qYsFSq64OzcGMJ8n7gqpHxIR2MHY58KPLyzAySWeBYuwYTm6OMhH2iWw7fOC3j2kRWKl6XiSKYd7w-EhBXPwE8Hs56kYdzTinTYVKKGhTtYaFkjU-kqGFoE6Ru92iPxDlEqA&key=AIzaSyDsUYlakovTBY9oO5413n3HYQWD4QV4H-Q
    //  https:
    // console.log(results);
    // console.log(results["0"]);
    // console.log(results["0"].photos[0].photo_reference);
    // const photoRefs = results.map((result, idx) => {
    //   if (result.photos) {
    //     return result.photos[0].photo_reference;
    //   } else {
    //     return null;
    //   }
    // });
    // console.log(photoRefs);
    // const resultsToReturn = await photoRefs.map(async (photoRef, idx) => {
    //   console.log(photoRef);
    //   console.log(
    //     `https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=${photoRef}&key=${MAP_KEY}`
    //   );
    //   let photo = 1;
    //   if (photoRef) {
    //     let url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=${photoRef}&key=${MAP_KEY}`;
    //     photo = await axios.get(url, {
    //       withCredentials: false
    //     });
    //   }

    //   console.log(photo);
    //   return {
    //     result: results[idx],
    //     photo: photo
    //   };
    // });
    // // const photoReference = result.photos[0].photo_reference;
    // console.log(resultsToReturn);
  } catch (err) {
    console.log(err);
  }
}
