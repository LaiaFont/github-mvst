async function getUser(user: string): Promise<{ success: boolean, payload: any }> {
    return fetch("https://api.github.com/users/" + user, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_API_TOKEN
        },

    })
        .then((res) => res.json())
        .then(
            (result) => {
                return { 'success': true, 'payload': result };
            },
            (error) => {
                return { 'success': false, 'payload': error };
            }
        );
}

async function getRepos(url: string): Promise<{ success: boolean, payload: any }> {
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_API_TOKEN
        },
    })
        .then((res) => res.json())
        .then(
            (result) => {
                return { 'success': true, 'payload': result };
            },
            (error) => {
                return { 'success': false, 'payload': error };
            }
        );
}

export { getUser, getRepos };