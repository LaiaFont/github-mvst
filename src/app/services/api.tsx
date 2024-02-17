import moment from 'moment';

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
    return fetch(url + "?per_page=100&sort=updated", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_API_TOKEN
        },
    }).then((res) => res.json())
    .then(
        async (result) => {
            for (let i = 0; i < result.length; i++) {
                const activity_url = result[i].url + "/stats/commit_activity";
                const activityResponse = await fetch(activity_url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_API_TOKEN
                    },
                }).then((res) => {
                    if (res.status == 200) {
                        return res.json();
                    } else {
                        return [];
                    }
                });
                
                if (activityResponse.length > 0) {
                    const data = activityResponse.map((item: { days: any, week: any; total: any; }) => {
                        return {
                            week: item.week,
                            commits: item.total,
                        };
                    });

                    result[i].activity = data;
                } else {
                    const weeksTillToday = moment().subtract(1, 'year').week();
            
                    result[i].activity = Array(weeksTillToday).fill({week: 0, commits: 0});
                }
            }
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