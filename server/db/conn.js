const mongoose = require("mongoose");

const username = "tayyaba";
const password = "Tayyaba123"; // Update your actual password here

// Encode the password to handle special characters
const encodedPassword = encodeURIComponent(password);

const DB = `mongodb+srv://${username}:${encodedPassword}@cluster0.mdfvaqg.mongodb.net/mernstack?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection established"))
  .catch((error) => console.log(error.message));
