/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { AppContext } from "../../App";
import { useRecoilValue } from "recoil";
import { IFavourites, TFavourite } from "../../types";
import favouritesState from "../../state/favouritesState";
import Loader from "../Loader";
import Favourite from "./FavouriteCard";

const favourites = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-favourite-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-favourite-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More favourites...
];

export default function Favourites() {
  const { favouritesOpen, setFavouritesOpen, setFieldValue, values } =
    useContext(AppContext);

  const { error, loading, results } =
    useRecoilValue<IFavourites>(favouritesState);

  return (
    <Transition.Root show={favouritesOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setFavouritesOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-gray-700 shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
                          Favourites
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setFavouritesOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          {!loading && error ? (
                            <span className="mt-4 text-sm text-red-500 dark:text-red-200 bg-white dark:bg-red-700 px-4 py-6 shadow sm:p-6 rounded-lg flex flex-1">
                              It has been an error getting the repositories
                            </span>
                          ) : (
                            <>
                              {results.length === 0 && !loading && (
                                <span className=" text-sm text-gray-500 dark:text-gray-200 bg-white dark:bg-gray-600 px-4 py-6 shadow sm:p-6 rounded-lg flex flex-1">
                                  Favourites not found
                                </span>
                              )}
                              {loading && (
                                <div className="">
                                  <Loader />
                                  <Loader />
                                  <Loader />
                                  <Loader />
                                  <Loader />
                                  <Loader />
                                  <Loader />
                                  <Loader />
                                </div>
                              )}
                              <ul
                                role="list"
                                className="-my-6 divide-y divide-gray-200 dark:divide-gray-900"
                              >
                                {results.map((favourite: TFavourite) => (
                                  <Favourite
                                    key={favourite._id}
                                    favourite={favourite}
                                  />
                                ))}
                              </ul>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
