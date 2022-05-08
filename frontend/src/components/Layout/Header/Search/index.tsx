import { useContext, useState } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Combobox } from "@headlessui/react";
import useGetOrgs from "../../../../hooks/useGetOrgs";
import orgsState from "../../../../state/orgsState";
import { useRecoilValue } from "recoil";
import { AppContextInterface, IOrgs, TOrg } from "../../../../types";
import { AppContext } from "../../../../App";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SearchComponent() {
  const {
    values: { org },
    setFieldValue,
  } = useContext<AppContextInterface>(AppContext);

  const [query, setQuery] = useState("");

  const orgs = useRecoilValue<IOrgs>(orgsState);
  // Filter orgs by full name
  const filteredOrgs = orgs.results.filter((org: TOrg) => {
    const lowerCaseSearch = query.toLowerCase();
    return org.login.includes(lowerCaseSearch);
  });
  return (
    <Combobox
      as="div"
      value={org}
      onChange={(value) => setFieldValue("org", value)}
      className="flex-1"
    >
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
          <svg
            className="h-5 w-5 text-gray-400 dark:text-gray-100"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <Combobox.Input
          className="block w-full bg-white dark:bg-gray-600 border border-gray-300 rounded-3xl py-2 pl-10 pr-3 text-sm placeholder-gray-500 dark:placeholder-gray-100 focus:outline-none dark:text-white focus:text-gray-900 dark:focus:text-white focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(org: TOrg) => org?.login}
          placeholder={"Select organization"}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredOrgs.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredOrgs.map((org: TOrg) => (
              <Combobox.Option
                key={org.login}
                value={org}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active
                      ? "bg-orange-500 text-white dark:text-gray-900"
                      : "text-gray-900 dark:text-white"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex">
                      <span
                        className={classNames(
                          "truncate",
                          selected ? "font-semibold" : ""
                        )}
                      >
                        {org?.login}
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active
                            ? "text-white dark:text-orange-500"
                            : "text-orange-500"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
