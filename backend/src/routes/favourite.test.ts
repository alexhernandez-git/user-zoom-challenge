import { TFavourite } from "../types";
import app from "../app";
const request = require("supertest");
const mongoose = require("mongoose");
jest.setTimeout(500000);

const repo = {
  name: "Hello-World",
  owner: "octocat",
  org: "facebook",
};

let favourite: TFavourite = null;

describe("Test the favourites path", () => {
  // beforeAll(async () => {
  beforeAll(async () => {
    await mongoose
      .connect("mongodb://db:27017/local", { useUnifiedTopology: true })
      .then(async () => {
        await request(app)
          .post("/api/favourites/")
          .send({ repo: repo })
          .then((response: any) => {
            favourite = response.data;
            expect(response.statusCode).toBe(201);
          });
      });
  });

  afterAll((done) => {
    mongoose.connection.close();
    mongoose.disconnect(done);
  });
  test("It should list the favourites", async (done) => {
    await request(app)
      .get("/api/favourites")
      .then((response: any) => {
        expect(response.statusCode).toBe(200);
      });
  });
  test("It should return success on check is in favourites", async () => {
    await request(app)
      .get(
        "/api/favourites/is-favourite/" + favourite.owner + "/" + favourite.repo
      )
      .then((response: any) => {
        expect(response.statusCode).toBe(200);
      });
  });
  test("It should return fail on check is in favourites", async () => {
    await request(app)
      .get(
        "/api/favourites/is-favourite/" + favourite.owner + "/" + favourite.repo
      )
      .then((response: any) => {
        expect(response.statusCode).toBe(400);
        expect(response.data).toHaveProperty("message");
      });
  });
  test("It should delete the favourite", async () => {
    await request(app)
      .delete("/api/favourites/" + favourite._id)
      .then(async () => {
        await request(app)
          .get("/api/favourites")
          .then(async (response: any) => {
            expect(response.statusCode).toBe(200);
            expect(response.data).toBe([]);
          });
      });
  });
});
