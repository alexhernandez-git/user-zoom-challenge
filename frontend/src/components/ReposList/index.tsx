import { useContext } from "react";
import { useRecoilValue } from "recoil";
import reposState from "../../state/reposState";
import RepoCard from "./RepoCard";
import { IRepos, TRepo } from "../../types";
import { AppContext } from "../../App";
import Loader from "../Loader";
import VisibilitySensor from "react-visibility-sensor";

const ReposList = ({ setResults }: { setResults: Function }) => {
  const { loading, error, results } = useRecoilValue<IRepos>(reposState);

  const onChangeVisibility = (visible: boolean) => {
    if (visible) {
      setResults((results: number) => results + 8);
    }
  };
  return (
    <div className="mb-5">
      {!loading && error ? (
        <span className="mt-4 text-sm text-red-500 dark:text-red-200 bg-white dark:bg-red-700 px-4 py-6 shadow sm:p-6 rounded-lg flex flex-1">
          It has been an error getting the repositories
        </span>
      ) : (
        <>
          {results.length === 0 && !loading && (
            <span className="mt-4 text-sm text-gray-500 dark:text-gray-200 bg-white dark:bg-gray-700 px-4 py-6 shadow sm:p-6 rounded-lg flex flex-1">
              Repository not found
            </span>
          )}
          <ul className="space-y-4">
            {results.map((repo: TRepo) => (
              <RepoCard repo={repo} key={repo.id} />
            ))}
          </ul>

          <VisibilitySensor onChange={onChangeVisibility}>
            <div
              className="p-3"
              onClick={() => setResults((results: number) => results + 8)}
            ></div>
          </VisibilitySensor>
          {loading && (
            <div className="mt-4">
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
        </>
      )}
    </div>
  );
};

export default ReposList;
