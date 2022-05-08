import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import reposState from "../state/reposState";
import { IRepos } from "../types";

interface IUseGetRepos {
  results?: number;
  page?: number;
  org?: string;
  sort?: string;
  direction?: string;
}

const useGetRepos = ({
  results = 8,
  org = "facebook",
  sort = "created",
  direction = "asc",
}: IUseGetRepos = {}) => {
  const setRepos = useSetRecoilState(reposState);
  console.log(
    `https://api.github.com/orgs/${org}/repos?per_page=${results}&sort=${sort}&direction=${direction}`
  );
  const { isLoading, error, data } = useQuery(
    ["reposData", org, results, sort, direction],
    () =>
      axios
        .get(
          `https://api.github.com/orgs/${org}/repos?per_page=${results}&sort=${sort}&direction=${direction}`,
          {
            headers: {
              Authorization: "token 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",
            },
          }
        )
        .then((res) => res.data)
        .catch((err) => err.response)
  );
  useEffect(() => {
    if (isLoading) {
      setRepos((repos: IRepos) => {
        return { ...repos, loading: true, error: false };
      });
    } else {
      console.log("error", error);
      if (error) setRepos({ results: data, loading: false, error: error });
      else {
        setRepos((repos: IRepos) => ({
          ...repos,
          results: data,
          loading: false,
          error: null,
        }));
      }
    }
  }, [isLoading]);
};

export default useGetRepos;
