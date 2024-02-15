function getUser(user: string): Promise<{ success: boolean, payload: any }> {
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

function getRepos(url: string): Promise<{ success: boolean, payload: any }> {
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

function getLanguageColors(): Promise<any> {
    return fetch('https://raw.githubusercontent.com/ozh/github-colors/master/colors.json')
        .then((res) => res.json());
}

export { getUser, getRepos, getLanguageColors };