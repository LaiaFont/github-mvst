
async function connect(user: string): Promise<{success: boolean, payload: any}>{
    return fetch("https://api.github.com/users/" + user)
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