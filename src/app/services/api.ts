async function connect(user: string): Promise<{success: boolean, payload: any}>{
    console.log("API_TOKEN", process.env.NEXT_PUBLIC_API_TOKEN);
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

export default connect;