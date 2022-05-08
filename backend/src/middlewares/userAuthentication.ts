import { NextFunction, Request, Response } from "express";
import { TypedRequestBody } from "../types";

const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

module.exports = function (
  req: TypedRequestBody<{ user: any }>,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(
      token,
      accessTokenSecret,
      (err: Error, data: { user: string }) => {
        console.log(token);
        console.log(accessTokenSecret);
        console.log(data.user);
        if (err) {
          return res.sendStatus(403);
        }
        console.log("data.user", data.user);
        req.user = data.user;
        next();
      }
    );
  } else {
    res.sendStatus(401);
  }
};
