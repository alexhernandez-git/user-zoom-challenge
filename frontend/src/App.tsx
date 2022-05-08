import { useState, createContext, useMemo } from "react";
import Layout from "./components/Layout";
import Filters from "./components/Filters";
import useGetRepos from "./hooks/useGetRepos";
import useFormikForm from "./hooks/useSearchForm";
import { AppContextInterface } from "./types";
import Favourites from "./components/FavouritesList";
import useGetOrgs from "./hooks/useGetOrgs";
import useGetFavourites from "./hooks/useGetFavourites";
import ReposList from "./components/ReposList";

export const AppContext = createContext<AppContextInterface>({
  filtersOpen: false,
  setFiltersOpen: () => {},
  favouritesOpen: false,
  setFavouritesOpen: () => {},
  values: {
    org: null,
    sort: "",
    direction: "",
  },
  handleChange: () => {},
  handleSubmit: () => {},
  setFieldValue: () => {},
});

function App() {
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const [favouritesOpen, setFavouritesOpen] = useState<boolean>(false);

  const [results, setResults] = useState<number>(8);
  const { values, handleChange, handleSubmit, setFieldValue } = useFormikForm({
    initialValues: {
      org: { login: "facebook" },
      sort: "created",
      direction: "desc",
    },
    onSubmit: () => {},
  });
  const { org, sort, direction } = values;
  useGetRepos({
    results,
    sort,
    direction,
    org: org?.login,
  });
  useGetOrgs({ results: 500 });
  useGetFavourites();

  const appContextProviderProps = {
    filtersOpen,
    setFiltersOpen,
    favouritesOpen,
    setFavouritesOpen,
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
  };

  console.log(values);

  return (
    <AppContext.Provider value={appContextProviderProps}>
      <Filters />
      <Favourites />
      <Layout>
        <div className={"max-w-3xl mx-auto px-6 flex flex-col lg:px-6 mt-10"}>
          {/* Filters */}

          <main className={`lg:col-span-8 xl:col-span-6 xl:col-start-3`}>
            {/* Repos List */}
            <ReposList setResults={setResults} />
          </main>
        </div>
      </Layout>
    </AppContext.Provider>
  );
}

export default App;
