import { Application } from "express";

module.exports = (app: Application) => {
  const favourites = require("../controllers/favourite.controller.ts");
  var router = require("express").Router();
  // Create a new favourite
  router.post("/", favourites.create);
  // Retrieve all favourites
  router.get("/", favourites.findAll);
  // Retrieve all published favourites
  router.delete("/:id", favourites.delete);
  // Create a new favourite
  router.get("/is-favourite/:owner/:repo", favourites.checkIsInFavourites);
  // Retrieve a single favourite with id
  app.use("/api/favourites", router);
};
