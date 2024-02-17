export const FilterBar = ({ setNameValue, setLanguageValue, languages }: {setNameValue: any, setLanguageValue: any, languages: any}) => (
    <div className="flex flex-row relative mt-2 rounded-md shadow-sm">
        <input
        type="text"
        name="repository"
        id="repository"
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
        placeholder="Find a repository..."
        onChange={(e) => setNameValue(e.target.value)}
        />
        <select className="block rounded-md border-0 mx-1 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 focus:bg-gray-200" onChange={(e) => setLanguageValue(e.target.value)}>
        <option key={"all"} value={"all"}>All</option>
        {Object.keys(languages).map((language: string) => (
            <option key={language} value={language}>{language}</option>
        ))}
        </select>
    </div>
);