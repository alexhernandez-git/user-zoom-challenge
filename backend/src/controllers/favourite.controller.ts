import { Request, Response } from "express";
import { Favourite } from "../models";
import { TypedRequestBody, TFavourite, TypedRequestParams } from "../types";

// Create and Save a new Favourite
exports.create = (
  req: TypedRequestBody<{ repo: TFavourite }>,
  res: Response
) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Favourite
  const favourite = new Favourite(req.body.repo);
  // Save Favourite in the database
  favourite
    .save()
    .then((data: TFavourite) => {
      res.status(201).send(data);
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Favourite.",
      });
    });
};

// Retrieve all Favourites from the database.
exports.findAll = (_: Request, res: Response) => {
  Favourite.find({})
    .then((data: TFavourite[]) => {
      res.send(data);
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving favourites.",
      });
    });
};

// Delete a Favourite with the specified id in the request
exports.delete = (req: TypedRequestParams<{ id: number }>, res: Response) => {
  const { id } = req.params;
  Favourite.findByIdAndRemove(id)
    .then((data: TFavourite) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Favourite with id=${id}. Maybe Favourite was not found!`,
        });
      } else {
        res.send({
          message: "Favourite was deleted successfully!",
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: "Could not delete Favourite with id=" + id,
      });
    });
};

// Check if repo is in favourites
exports.checkIsInFavourites = async (
  req: TypedRequestParams<{ owner: string; repo: string }>,
  res: Response
) => {
  const { owner, repo } = req.params;
  try {
    const favourite = await Favourite.findOne({ owner, repo });
    if (favourite) {
      res.send(favourite);
    } else {
      res
        .status(400)
        .send({ message: "This repo is not one of your favourites" });
    }
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred",
    });
  }
};
