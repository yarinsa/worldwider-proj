import httpService from "./http.service.js";

export const bookingService = {
  getById,
  removeReservation,
  removeBooking,
  save,
  getUserBookings,
  getTourGuideBookings
};

async function getById(bookingId) {
  return await httpService.get(`booking/${bookingId}`);
}

async function getUserBookings(userId) {
  try {
    const bookings = await httpService.get(`booking/user/${userId}`);
    return bookings;
  } catch (err) {
    return "There was problem getting bookings";
  }
} //hey

async function getTourGuideBookings(tourGuideId) {
  try {
    const bookings = await httpService.get(`booking/tourGuide/${tourGuideId}`);
    return bookings;
  } catch (err) {
    return "There was problem getting bookings";
  }
}

function save(booking) {
  return booking._id ? _update(booking) : _add(booking);
}

async function _add(booking) {
  try {
    const bookingFromDB = httpService.post(`booking`, booking);
    return bookingFromDB;
  } catch (err) {
    return "There was problem booking";
  }
}

async function _update(booking) {
  return await httpService.put(`booking/${booking._id}`, booking);
}

async function removeReservation(bookingId, userId) {
  return await httpService.delete(`booking/${bookingId}?userId=${userId}`);
}
async function removeBooking(bookingId) {
  return await httpService.delete(`booking/${bookingId}`);
}
