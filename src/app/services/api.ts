// 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
async function connect(user: string): Promise<{success: boolean, payload: any}>{
    return fetch("https://api.github.com/users/" + user, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer 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'
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