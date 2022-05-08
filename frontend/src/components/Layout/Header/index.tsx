import { useContext } from "react";
import { AppContext } from "../../../App";
import { AppContextInterface } from "../../../types";
import SearchComponent from "./Search";
import ToggleTheme from "./ToggleTheme";

const Header = () => {
  const { setFiltersOpen, setFavouritesOpen } =
    useContext<AppContextInterface>(AppContext);
  return (
    <header className="bg-white dark:bg-gray-700 shadow-sm sticky lg:overflow-y-visible top-0 z-10">
      <nav className={` w-full bg-white dark:bg-gray-700`} aria-label="Global">
        <div className="p-3 flex-shrink-0 relative flex justify-between items-center w-full">
          <SearchComponent />
          <div className="flex items-center">
            <span
              onClick={() => setFiltersOpen(true)}
              className="w-8 h-8 mx-5 flex justify-center items-center rounded-lg text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </span>
            <span
              onClick={() => setFavouritesOpen(true)}
              className="w-8 h-8 mr-5 flex justify-center items-center rounded-lg text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600 cursor-pointer"
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
            </span>
            <ToggleTheme />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
