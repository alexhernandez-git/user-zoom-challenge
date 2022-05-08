import axios from "axios";
import { useMutation } from "react-query";
import { useSetRecoilState } from "recoil";
import useRemoveFavourite from "../../../hooks/useRemoveFavourite";
import favouritesState from "../../../state/favouritesState";
import { IFavourites, TFavourite } from "../../../types";

interface IFavourite {
  favourite: TFavourite | null;
}

const Favourite = ({ favourite }: IFavourite) => {
  const removeFavouriteMutation = useRemoveFavourite(favourite?._id);
  const handleRemoveFormFavourites = (e: any) => {
    e.preventDefault();
    removeFavouriteMutation.mutate();
  };
  return (
    <li className="flex py-6">
      <div className="flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-200">
            <h3>{favourite?.repo}</h3>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex">
            <button
              onClick={handleRemoveFormFavourites}
              type="button"
              className="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-500 dark:hover:text-orange-600"
            >
              Remove from favourites
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Favourite;
