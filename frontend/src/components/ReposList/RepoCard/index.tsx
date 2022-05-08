import { LazyLoadImage } from "react-lazy-load-image-component";
import { useContext, useRef } from "react";
import useAccordion from "../../../hooks/useAccordion";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { IFavourites, TRepo } from "../../../types";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { AppContext } from "../../../App";
import favouritesState from "../../../state/favouritesState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import useAddFavourite from "../../../hooks/useAddFavourite";
import useRemoveFavourite from "../../../hooks/useRemoveFavourite";

const RepoCard = ({ repo }: { repo: TRepo }) => {
  const { show, height, toggleAccordion, contentSpace } = useAccordion();
  const { values } = useContext(AppContext);
  const { loading, error, results } =
    useRecoilValue<IFavourites>(favouritesState);

  const addFavouriteMutation = useAddFavourite();
  const handleAddToFavourites = (e: any) => {
    e.preventDefault();
    const repoData = {
      org: values.org?.login,
      repo: repo.name,
      owner: repo.owner.login,
    };
    addFavouriteMutation.mutate(repoData);
  };
  // If exists means that this repo is in favourite
  const favouriteId = results.find(
    (favourite) => favourite.org + "/" + favourite.repo === repo.full_name
  )?._id;
  const removeFavouriteMutation = useRemoveFavourite(favouriteId);

  const handleRemoveFromFavourites = (e: any) => {
    e.preventDefault();

    removeFavouriteMutation.mutate();
  };

  return (
    <li className="pt-4" data-testid={"toggle-div"}>
      <div className="motion-safe:animate-fadeIn bg-white dark:bg-gray-700 px-4 py-6 shadow sm:p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex space-x-3 items-center">
            <div className="flex-shrink-0">
              {repo?.owner?.avatar_url ? (
                <LazyLoadImage
                  className="h-10 w-10 rounded-full"
                  src={repo?.owner?.avatar_url}
                />
              ) : (
                <svg
                  className="bg-gray-100 text-gray-300 rounded-full overflow-hidden h-10 w-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                <span className="">{repo?.full_name}</span>
              </p>
              <span className="inline-flex items-center text-sm">
                <span className="font-medium text-orange-500">
                  {repo?.disabled ? "Disabled" : "Active"}
                </span>
              </span>
            </div>
          </div>
          <button
            data-testid={"big-screen-button"}
            onClick={toggleAccordion}
            className="hidden sm:block inline-flex items-center px-4 py-2 shadow-sm text-sm font-medium rounded-3xl text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600"
          >
            {show ? "See less" : "See more"}
          </button>
        </div>
        <div
          ref={contentSpace}
          style={{ maxHeight: `${height}` }}
          className="overflow-auto transition-max-height duration-500 ease-in-out"
        >
          <div className="mt-5">
            <div className="bg-gray-50 dark:bg-gray-600 shadow overflow-hidden sm:rounded-lg">
              <div className="flex items-center justify-between px-4 py-5 sm:px-6">
                <div className="">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                    Repo Information
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-200">
                    Repository details.
                  </p>
                </div>
                <button
                  onMouseDown={
                    favouriteId
                      ? (e) => handleRemoveFromFavourites(e)
                      : (e) => handleAddToFavourites(e)
                  }
                  className={`w-8 h-8 flex justify-center items-center rounded-lg text-white cursor-pointer ${
                    favouriteId
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600"
                      : "bg-gray-300 dark:bg-gray-100"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200 dark:sm:divide-gray-700">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-200">
                      Full name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                      {repo?.full_name}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={toggleAccordion}
          data-testid={"small-screen-button"}
          className="block text-center sm:hidden w-full items-center px-4 py-2 mt-4 shadow-sm text-sm font-medium rounded-3xl text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600"
        >
          {show ? "See less" : "See more"}
        </button>
      </div>
    </li>
  );
};

export default RepoCard;
