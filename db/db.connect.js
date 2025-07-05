const mongoose = require("mongoose");
require("dotenv").config();

const initializeDataBase = async () => {
  const dbUri = process.env.MONGODB;
  await mongoose
    .connect(dbUri)
    .then(() => console.log("Database connected successfully."))
    .catch((error) => console.log("Failed to connect to database.", error));
};
module.exports = { initializeDataBase };
