# Virtual Ticket List

## Description

This is a simple single-page website showcasing a virtual list react component built from scratch do display hundreds of thousands of tickest with no performance issues.

## Inispirations

1. [React Virtualized](https://github.com/bvaughn/react-virtualized)
2. Numerous stackoverflow posts and other dev sites' articles

## How to run

1. Clone this repository
2. Run `npm install` or `yarn` to install all dependencies
3. Run `npm run dev` or `yarn dev` to start the development server
4. Open `http://localhost:5173/` in your browser (check terminal to confirm port number)

## Technologies used

I used [Vite](https://vitejs.dev/) to set up this project as a fast and lightweight alternative to [Create React App](https://create-react-app.dev/).

## Features to try out

1. Virtual list (obviously :D )
2. Add, update, and delete tickets
3. Search tickets by subject or description

## Possible improvements

1. Using [Tailwind CSS](https://tailwindcss.com/) to style the website. this could save developer time and effort and yield a more consistent design with better overall code quality.
2. Adding a landing page and then using [React Router](https://reactrouter.com/en/main) to navigate to the ticket list page.
3. Using a state management library like [Redux](https://redux.js.org/) or [MobX](https://mobx.js.org/README.html) to manage the application state instead of react context API. My personal favourite is [MobX-Keystone](https://mobx-keystone.js.org/), which is a very powerful and easy to use state management library.
