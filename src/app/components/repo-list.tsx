import { FilterBar } from "./filter-bar";
import moment from 'moment';

export const RepoList = ({ filteredRepos, languages, setNameValue, setLanguageValue }: { filteredRepos: any, languages: any, setNameValue: any, setLanguageValue: any }) => (
  <div className="col-span-2">
    <FilterBar
      setNameValue={setNameValue}
      setLanguageValue={setLanguageValue}
      languages={languages}
    />
    <hr className="my-5 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
    <div>
      {filteredRepos.length > 0 ? Object.values(filteredRepos).map((repo: any) => (
        <div key={repo.id} className="flex flex-col">
          <section className="title-section flex flex-row items-center">
            <p className="text-lg font-bold text-blue-700 mr-2">{repo.name}</p>
            <p className="text-xs font-bold px-1.5 text-gray-400 capitalize ring-1 ring-gray-400 rounded-full">
              {repo.visibility}
            </p>
          </section>
          <p className="text-sm">{repo.description}</p>

          <div className="info-section flex flex-row justify-between">
            <section className="language-section flex flex-row items-center">
              <p
                className="mr-1"
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: (
                    languages[repo.language as keyof typeof languages] as
                      | { color: string }
                      | undefined
                  )?.color,
                }}
              ></p>
              <p className="text-sm">{repo.language}</p>
            </section>
            <section className="forks-section flex flex-row items-center">
              {repo.forks_count > 0 ? (
                <>
                  <svg
                    aria-label="fork"
                    role="img"
                    height="16"
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="16"
                    data-view-component="true"
                    className="octicon octicon-repo-forked"
                  >
                    <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
                  </svg>
                  <p className="text-sm"> {repo.forks_count}</p>
                </>
              ) : (
                ""
              )}
            </section>
            <section className="starred-section flex flex-row items-center">
              {repo.stargazers_count > 0 ? (
                <>
                  <svg
                    aria-label="star"
                    role="img"
                    height="16"
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="16"
                    data-view-component="true"
                    className="octicon octicon-star"
                  >
                    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
                  </svg>
                  <p className="text-sm"> {repo.stargazers_count}</p>
                </>
              ) : (
                ""
              )}
            </section>
            <p className="text-sm">
              Updated {moment(repo.updated_at).fromNow()}
            </p>
          </div>
          <hr className="my-5 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
        </div>
      )): <p className="m-2 text-gray-400 text-center">No available repositories</p>}
    </div>
  </div>
);
