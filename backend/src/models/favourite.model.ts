import { connect, Document, Model, model, Schema } from "mongoose";

interface IFavourite extends Document {
  org: string;
  repo: string;
  owner: string;
}

const favouriteSchema = new Schema<IFavourite>(
  {
    org: { type: String },
    repo: { type: String },
    owner: { type: String },
  },
  { timestamps: true }
);
const Favourite: Model<IFavourite> = model("Favourite", favouriteSchema);
export default Favourite;
