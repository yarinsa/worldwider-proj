import httpService from "./http.service.js";

export const tourService = {
  query,
  getById,
  remove,
  save,
  getEmpty
};

function query(filterBy, sortBy) {
  var queryStr = "?";
  if (filterBy.city) queryStr += `&city=${filterBy.city}`;
  if (filterBy.maxPrice) queryStr += `&maxPrice=${filterBy.maxPrice}`;
  if (filterBy.minPrice) queryStr += `&minPrice=${filterBy.minPrice}`;
  // if (filterBy.minRating) queryStr += `&minRating=${filterBy.minRating}`;
  // if (filterBy.maxRating) queryStr += `&maxRating=${filterBy.maxRating}`;
  if (filterBy.tourGuideId) queryStr += `&tourGuideId=${filterBy.tourGuideId}`;
  if (filterBy.tourId) queryStr += `&tourId=${filterBy.tourId}`;
  if (filterBy.tags) queryStr += `&tags=${filterBy.tags}`;
  console.log(sortBy);
  Object.keys(sortBy).map(key => {
    queryStr += `&${key}=${sortBy[key]}`;
  });
  console.log("string", queryStr);
  return httpService.get(`tour${queryStr}`);
}

function getById(tourId) {
  return httpService.get(`tour/${tourId}`);
}

function remove(tourId) {
  return httpService.delete(`tour/${tourId}`);
}
// function save(tourGuide) {
//   const tourId = tourGuide.tour._id;
//   return tourId ? _update(tourGuide) : _add(tourGuide);
// }
function save(tour) {
  if (tour._id) {
    return httpService.put(`tour/${tour._id}`, tour);
  } else {
    return httpService.post(`tour/`, tour);
  }
}

function getEmpty() {
  return httpService.get(`tour/empty`);
}
