import { Fragment, useContext } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/solid";
import { AppContext } from "../../App";

const filters = [
  {
    id: "sort",
    name: "Sort",
    options: [
      {
        label: "Created",
        value: "created",
      },
      {
        label: "Updated",
        value: "updated",
      },
      {
        label: "Pushed",
        value: "pushed",
      },
      {
        label: "Full Name",
        value: "full_name",
      },
    ],
  },
  {
    id: "direction",
    name: "Direction",
    options: [
      { label: "Ascendent", value: "asc" },
      { label: "Descendent", value: "desc" },
    ],
  },
];

const Filters = () => {
  const { filtersOpen, setFiltersOpen, setFieldValue, values } =
    useContext(AppContext);
  const handleCheck = (
    e: { target: HTMLInputElement },
    section: {
      id: string;
      name: string;
    }
  ) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setFieldValue(section.id, value);
    }
  };

  return (
    <Transition.Root show={filtersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex z-40"
        onClose={setFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="ml-auto relative max-w-xs w-full h-full bg-white dark:bg-gray-700 shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
            <div className="px-4 flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Filters
              </h2>
              <button
                type="button"
                className="-mr-2 w-10 h-10 bg-white dark:bg-gray-800 p-2 rounded-md flex items-center justify-center text-gray-400"
                onClick={() => setFiltersOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Filters */}
            <form className="mt-4 border-t border-gray-200 dark:border-gray-900">
              <h3 className="sr-only">Categories</h3>

              {filters.map((section) => (
                <Disclosure
                  as="div"
                  defaultOpen={true}
                  key={section.id}
                  className="border-t border-gray-200 dark:border-gray-900 px-4 py-6"
                >
                  {({ open }) => (
                    <>
                      <h3 className="-mx-2 -my-3 flow-root">
                        <Disclosure.Button className="px-2 py-3 bg-white dark:bg-gray-700 w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusSmIcon className="h-5 w-5" />
                            ) : (
                              <PlusSmIcon className="h-5 w-5" />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-6">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                defaultValue={option.value}
                                onChange={(e) => handleCheck(e, section)}
                                type="checkbox"
                                checked={
                                  section.id === "sort"
                                    ? option.value === values.sort
                                    : section.id === "direction"
                                    ? option.value === values.direction
                                    : false
                                }
                                defaultChecked={
                                  section.id === "sort"
                                    ? option.value === values.sort
                                    : section.id === "direction"
                                    ? option.value === values.direction
                                    : false
                                }
                                className="h-4 w-4 border-gray-300 rounded text-orange-500 focus:ring-orange-400"
                              />
                              <label
                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                className="ml-3 min-w-0 flex-1 text-gray-500 dark:text-gray-200"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </form>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default Filters;
