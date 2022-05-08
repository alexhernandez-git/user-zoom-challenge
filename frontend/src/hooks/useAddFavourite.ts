import axios from "axios";
import React from "react";
import { useMutation } from "react-query";
import { useSetRecoilState } from "recoil";
import favouritesState from "../state/favouritesState";
import { IFavourites } from "../types";

const useAddFavourite = () => {
  const setFavourites = useSetRecoilState(favouritesState);

  const mutation = useMutation("add favourite", {
    mutationFn: (data: {
      org: string | undefined;
      repo: string;
      owner: string;
    }) => axios.post(`http://localhost:8080/api/favourites/`, { repo: data }),
    onSuccess: (result, variables, context) => {
      console.log(result, variables, context);
      setFavourites((favourites: IFavourites) => ({
        results: [...favourites.results, result.data],
        loading: false,
        error: null,
      }));
    },
    onError: (error, variables, context) => {
      console.log(error, variables, context);
      setFavourites((favourites: IFavourites) => ({
        results: favourites.results,
        loading: false,
        error: error,
      }));
    },
  });
  return mutation;
};

export default useAddFavourite;
