export const SearchBar = ({ setUsername, searchUser, username }: { setUsername: any, searchUser: any, username: string }) => (
    <div>
        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
            Enter a GitHub Username
        </label>
        <div className="flex flex-row relative mt-2 rounded-md shadow-sm">
            <input
                type="text"
                name="username"
                id="username"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                placeholder="Search for a user..."
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        searchUser(username);
                    }
                }}
            />
            <button className="block rounded-md border-0 mx-1 py-1.5 px-7 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 focus:bg-gray-200" onClick={() => searchUser(username)}>Search</button>
        </div>
    </div>
);