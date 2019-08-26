const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const Tournament = mongoose.model('Tournament', {
  name: String,
  description: String,
  attendees: [ObjectId],
  previousStartDate: Date,
  startDate: Date,
  endDate: Date,
  doorTime: Date,
  eventStatus: String,
  isSolo: Boolean,
  isAccessibleForFree: Boolean,
  offers: [],
  maximumAttendeeCapacity: Number,
  remainingAttendeeCapacity: Number,
  location: ObjectId,
  referees: [ObjectId],
  subEvents: [ObjectId],
  sponsors: [ObjectId],
  imgUrl: String,
  reviews: [],
  aggregateRating: Number,
  organizer: ObjectId,
  contributors: [ObjectId],
  funders: [ObjectId],
  performers: [ObjectId]
});

module.exports = Tournament;
