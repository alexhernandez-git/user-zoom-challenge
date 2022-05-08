import { atom } from "recoil";
import { IFavourites } from "../types";

export default atom<IFavourites>({
  key: "favourites",
  default: {
    results: [],
    loading: true,
    error: null,
  },
});
