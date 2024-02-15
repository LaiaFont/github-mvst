'use client';
import React, { useState } from 'react';
import { getUser, getRepos, getLanguageColors } from "../app/services/api";

export default function Home() {
  const [username, setUsername] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [userData, setUserData] = useState({ 'avatar_url': '', 'name': '', 'bio': '', 'login': '' });
  const [userRepos, setUserRepos] = useState([]);
  const [languageColors, setLanguageColors] = useState({});

  async function searchUser(value: string) {
    try {
      const response = await getUser(value);
      setUserExists(response.success);
      setUserData(response.payload);

      const repos = await getRepos(response.payload.repos_url);
      setUserRepos(repos.payload);

      setLanguageColors(await getLanguageColors());
    } catch (error) {
      setUserExists(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col p-24">
      <div>
        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
          Enter a GitHub Username
        </label>
        <div className="flex flex-row relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            name="username"
            id="username"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Search for a user..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="block rounded-md border-0 mx-1 py-1.5 px-7 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 focus:bg-gray-200" onClick={() => searchUser(username)}>Search</button>
        </div>
      </div>
      <hr className="my-5 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
      <div>
        {userExists ? (
          <div className="grid grid-cols-3">
            <div className="flex flex-col">
              <div>
                <img src={userData.avatar_url} alt="User avatar" className="rounded-full ring-1 ring-inset ring-gray-300" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userData.name}</p>
                <p className="text-lg text-gray-600">{ userData.login }</p>
                <p className="my-2">{ userData.bio }</p>
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex flex-row relative mt-2 rounded-md shadow-sm">
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder="Find a repository..."
                />
                <button className="block rounded-md border-0 mx-1 py-1.5 px-7 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 focus:bg-gray-200" onClick={() => searchUser(username)}>Type</button>
                <button className="block rounded-md border-0 mx-1 py-1.5 px-7 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 focus:bg-gray-200" onClick={() => searchUser(username)}>Language</button>
              </div>
              <hr className="my-5 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
              <div>
                {userRepos.map((repo: any) => (
                  <div key={repo.id} className="flex flex-col">
                    <section className="title-section flex flex-row items-center">
                      <p className="text-lg font-bold text-blue-700 mr-2">{repo.name}</p>
                      <p className="text-xs font-bold px-1.5 text-gray-400 capitalize ring-1 ring-gray-400 rounded-full">{repo.visibility}</p>
                    </section>
                    <p className="text-sm">{repo.description}</p>
                    
                    <div className="info-section flex flex-row justify-between">
                      <section className="language-section flex flex-row items-center">
                        <p style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          backgroundColor: (languageColors as { [key: string]: { color: string } })[repo.language]?.color || "gray"
                        }}></p>
                        <p className="text-sm">{repo.language}</p>
                      </section>
                      {repo.forks_count > 0 ? <><svg aria-label="fork" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-repo-forked">
                        <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
                      </svg><p className="text-sm"> {repo.forks_count}</p></> : ""}
                        
                        <p className="text-sm">{repo.updated_at}</p>
                        
                    </div>
                    <hr className="my-5 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
                  </div>
                  
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="m-2 text-rose-700 text-center">The user {username} could not be found.</p>
        )}
      </div>
    </main>
  );
}