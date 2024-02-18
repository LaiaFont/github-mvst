export const UserProfile = ({ userData }: { userData: any }) => (
    <div className="flex flex-row md:flex-col">
        <div className="mr-2 md:w-4/5">
            <img src={userData.avatar_url} height="auto" width="300" alt="User avatar" className="rounded-full ring-1 ring-inset ring-gray-300"/>
        </div>
        <div className="md:w-4/5">
            <p className="text-2xl font-bold">{userData.name}</p>
            <p className="text-lg text-gray-600">{userData.login}</p>
            <p className="my-2">{userData.bio}</p>
        </div>
    </div>
);