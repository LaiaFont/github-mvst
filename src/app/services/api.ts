
function connect(): void {
    fetch("https://api.github.com/users/LaiaFont")
    .then((res) => res.json())
    .then((result) => { console.log(result) },
      (error) => { console.log(error); })
}

export default connect;