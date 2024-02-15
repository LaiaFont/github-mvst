'use client';
import React, { useState } from 'react';
import connect from "../app/services/api";

export default function Home() {
  const [username, setUsername] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [userData, setUserData] = useState({'avatar_url': '', 'name': '', 'bio': ''});

  async function searchUser(value: string) {
    try {
      const response = await connect(value);
      setUserExists(response.success);
      setUserData(response.payload);
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
                <p className="text-2xl font-bold">{ userData.name }</p>
                <p className="text-lg">{ userData.bio }</p>
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
            </div>
          </div>
        ) : (
          <p className="m-2 text-rose-700 text-center">The user {username} could not be found.</p>
        )}
      </div>
    </main>
  );
}