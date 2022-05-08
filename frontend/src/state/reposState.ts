import { atom } from "recoil";
import { IRepos } from "../types";

export default atom<IRepos>({
  key: "repos",
  default: {
    results: [],
    loading: true,
    error: null,
  },
});
