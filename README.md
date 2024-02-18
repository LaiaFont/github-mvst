## Description
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) using Tailwind CSS for styling, for the MVST Full Stack Interview process.

## How to run it
First, clone the repository and on its directory run in order to install the necessary libraries:
```
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Lastly, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If you want to get more quantity of API requests, you must set up the .env.local file with your API token, see .env.example to see the structure of the file.

## How to test it
In order to test the results, you can search for these different users.
* LaiaFont - Normal user
* Laia - No repositories
* asdfeeff - Doesn't exist

## Future improvements
The API calls are now done a service file, which is called by the main page file. This could be improved by adding a controller file which gives the necessary information to the different pages.

Another important improvement would be working with multiple pages, since the API returns a maximum of a 100 repositories, if there are more in different pages. This can be solved by adding pagination to the page and calling the API dynamically, loading the needed repositories for the specified page.

Lastly, I would improve the loading times of the graphs since it takes a long time, it exponentially increases together with the amount of repositories it has to load data for. This would go together with the loading messages, which could be improved by adding a simple animation to let the user know that the page has not frozen.

## Deployment

You can find the project deployed at [https://master--unique-raindrop-a7a804.netlify.app/](https://master--unique-raindrop-a7a804.netlify.app/).
