'use client';
import React, { useState } from 'react';
import connect from "../app/services/api";

export default function Home() {
  const [username, setUsername] = useState("");
  const [userExists, setUserExists] = useState(true);
  const [userData, setUserData] = useState({ 'avatar_url': '', 'name': '', 'bio': '' });

  async function searchUser(value: string) {
    try {
      const response = await connect(value);
      setUserExists(response.success);
      setUserData(response.payload);
    } catch (error) {
      setUserExists(false); // Set userExists to false if an error occurs
    }
  }

  return (
    <main className="flex min-h-screen flex-col p-24">
      <div>
        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
          Enter a GitHub Username
        </label>
        <div className="flex flex-row justify-between relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            name="username"
            id="username"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Search for a user..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="block rounded-md border-0 mx-1 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" onClick={() => searchUser(username)}>Search</button>
        </div>
      </div>
      <div>
        {userExists ? (
          <div className="columns-2">
            <div>
              <div>
                <img src="https://avatars.githubusercontent.com/u/74786722?v=4" alt="User avatar" className="rounded-full ring-1 ring-inset ring-gray-300" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold">{userData.name}</p>
              <p className="text-lg">{userData.bio}</p>
            </div>
          </div>
        ) : (
            <p className="m-2 text-rose-700 text-center">The user { username } could not be found.</p>
        )}
      </div>
    </main>
  );
}