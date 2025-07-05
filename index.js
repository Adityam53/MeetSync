const { initializeDataBase } = require("./db/db.connect");
const fs = require("fs");
const Meetup = require("./models/meetup.models");
const express = require("express");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

initializeDataBase();

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

const jsonData = fs.readFileSync("meetups.json", "utf-8");
const meetupsData = JSON.parse(jsonData);

const seedData = async () => {
  try {
    for (const meetupData of meetupsData) {
      const newMeetup = new Meetup({
        title: meetupData.title,
        date: meetupData.date,
        startTime: meetupData.startTime,
        endTime: meetupData.endTime,
        type: meetupData.type,
        imageThumbnail: meetupData.imageThumbnail,
        tags: meetupData.tags,
        details: meetupData.details,
        dressCode: meetupData.dressCode,
        ageRestrictions: meetupData.ageRestrictions,
        speakers: meetupData.speakers,
        venue: meetupData.venue,
        entryFee: meetupData.entryFee,
      });
      newMeetup.save();
    }
  } catch (error) {
    console.log("An error occurred while seeding data.");
  }
};

// seedData();

const readAllMeetups = async () => {
  try {
    const allMeetups = await Meetup.find();
    return allMeetups;
  } catch (error) {
    console.log(error);
  }
};

app.get("/meetups", async (req, res) => {
  try {
    const allMeetups = await readAllMeetups();
    if (allMeetups.length != 0) {
      res.json(allMeetups);
    } else {
      res.status(404).json({ error: "Meetups not found" });
    }
  } catch (error) {
    console.log("Failed to fetch meetups", error);
    res.status(500).json({ error: "An error occured while fetching meetups." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
