import http from "http";
import app from "./src/app";
import mongoose from "mongoose";
const server = http.createServer(app);

mongoose
  .connect("mongodb://db:27017/local", {
    // useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// set port, listen for requests
const PORT = process.env.PORT || 8080;
if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}
