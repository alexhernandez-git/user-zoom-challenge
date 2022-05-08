import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import favouritesState from "../state/favouritesState";
import { IFavourites } from "../types";

const useGetFavourites = () => {
  const setFavourites = useSetRecoilState(favouritesState);

  const { isLoading, error, data } = useQuery(["favouritesData"], () =>
    axios
      .get(`http://localhost:8080/api/favourites/`)
      .then((res) => res.data)
      .catch((err) => err.response)
  );
  console.log("favourites", data);
  useEffect(() => {
    if (isLoading) {
      setFavourites((repos: IFavourites) => {
        return { ...repos, loading: true, error: false };
      });
    } else {
      console.log("error", error);
      if (error) setFavourites({ results: data, loading: false, error: error });
      else {
        console.log("entra");
        setFavourites((repos: IFavourites) => ({
          ...repos,
          results: data,
          loading: false,
          error: null,
        }));
      }
    }
  }, [isLoading]);
};

export default useGetFavourites;
