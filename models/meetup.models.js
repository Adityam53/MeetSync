const { request } = require("express");
const mongoose = require("mongoose");

const meetupSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  imageThumbnail: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
      required: true,
    },
  ],
  details: {
    type: String,
    required: true,
  },
  dressCode: {
    type: String,
  },
  ageRestrictions: {
    type: String,
    required: true,
  },
  speakers: [
    {
      speakerName: {
        type: String,
        required: true,
      },
      speakerDesignation: {
        type: String,
        required: true,
      },
      speakerImg: {
        type: String,
        required: true,
      },
    },
  ],
  venue: {
    type: String,
    required: true,
  },
  entryFee: {
    type: Number,
    required: true,
  },
});

const Meetup = mongoose.model("Meetup", meetupSchema);
module.exports = Meetup;
