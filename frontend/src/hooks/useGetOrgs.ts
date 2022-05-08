import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import orgsState from "../state/orgsState";
import { IOrgs } from "../types";

interface IUseGetOrgs {
  results?: number;
}

const useGetOrgs = ({ results = 10 }: IUseGetOrgs = {}) => {
  const setOrgs = useSetRecoilState(orgsState);

  const { isLoading, error, data } = useQuery(["orgsData", results], () =>
    axios
      .get(`https://api.github.com/organizations?per_page=${results}`, {
        headers: {
          Authorization: "token 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",
        },
      })
      .then((res) => res.data)
      .catch((err) => err.response)
  );
  console.log(data, error);
  useEffect(() => {
    if (isLoading) {
      setOrgs((repos: IOrgs) => {
        return { ...repos, loading: true, error: false };
      });
    } else {
      console.log("error", error);
      if (error) setOrgs({ results: data, loading: false, error: error });
      else {
        console.log("entra");
        setOrgs((repos: IOrgs) => ({
          ...repos,
          results: data,
          loading: false,
          error: null,
        }));
      }
    }
  }, [isLoading]);
};

export default useGetOrgs;
