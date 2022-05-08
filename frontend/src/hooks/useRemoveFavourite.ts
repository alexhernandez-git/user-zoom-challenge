import axios from "axios";
import React from "react";
import { useMutation } from "react-query";
import { useSetRecoilState } from "recoil";
import favouritesState from "../state/favouritesState";
import { IFavourites } from "../types";

const useRemoveFavourite = (favouriteId: string | undefined) => {
  const setFavourites = useSetRecoilState(favouritesState);

  const mutation = useMutation("remove mutation", {
    mutationFn: () =>
      axios.delete(`http://localhost:8080/api/favourites/${favouriteId}`),
    onSuccess: (result, variables, context) => {
      console.log(result, variables, context);
      setFavourites((favourites: IFavourites) => ({
        results: favourites.results.filter((fav) => fav._id !== favouriteId),
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

export default useRemoveFavourite;
