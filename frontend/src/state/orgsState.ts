import { atom } from "recoil";
import { IOrgs } from "../types";

export default atom<IOrgs>({
  key: "orgs",
  default: {
    results: [],
    loading: true,
    error: null,
  },
});
