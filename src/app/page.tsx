'use client';
import React, { useState, useEffect } from 'react';
import { getUser, getRepos, getLanguageColors } from "../app/services/api";
import { SearchBar } from './components/search-bar';
import { UserProfile } from './components/user-profile';
import { RepoList } from './components/repo-list';

export default function Home() {
  const [username, setUsername] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [userData, setUserData] = useState({});
  const [userRepos, setUserRepos] = useState([]);
  const [languages, setLanguages] = useState({});
  const [filteredRepos, setFilteredRepos] = useState({});
  const [nameValue, setNameValue] = useState("");
  const [languageValue, setLanguageValue] = useState("");

  async function searchUser(value: string) {
    setUserExists(false);
    setUserData({});
    setUserRepos([]);
    setFilteredRepos({});
    
    try {
      const response = await getUser(value);
      setUserExists(response.success);
      setUserData(response.payload);

      const repos = await getRepos(response.payload.repos_url);

      if (repos.success) {
        setUserRepos(repos.payload);

        if (repos.payload.length > 0) {
          let langColors = await getLanguageColors();
          let languages: any = {};

          repos.payload.forEach((repo: any) => {
            if (repo.language) {
              if (!languages[repo.language] && langColors[repo.language]) {
                languages[repo.language] = langColors[repo.language];
              }
            }
          });

          setLanguages(languages);
        } else {
          setLanguages({});
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const filtered = userRepos.filter(
      (repo) =>
        repo.name.toLowerCase().includes(nameValue.toLowerCase()) &&
        (languageValue === "all" || !languageValue || (repo.language && repo.language.toLowerCase() === languageValue.toLowerCase()))
    );
    setFilteredRepos(filtered);
    
  }, [userRepos, nameValue, languageValue]);

  return (
    <main className="flex min-h-screen flex-col p-10">
      <SearchBar setUsername={setUsername} searchUser={searchUser} username={username} />
      <hr className="my-5 h-0.5 border-t-0 bg-neutral-100" />
      
      {userExists ? (
        <div className="grid grid-cols-1 md:grid-cols-3">
          <UserProfile userData={userData} />
          <RepoList filteredRepos={filteredRepos} languages={languages} setNameValue={setNameValue} setLanguageValue={setLanguageValue} />
        </div>
      ) : (
        <p className="m-2 text-gray-400 text-center">No results</p>
      )}
    </main>
  );
}