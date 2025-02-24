# ReactJS Application with Mock API and Deployment

## Project Overview

This project is a ReactJS application built with TypeScript, integrating Tailwind CSS for styling. It interacts with a mock API (JSONPlaceholder) to perform CRUD operations (Create, Read, Update, Delete) on a list of items. The app is deployed on Vercel for easy access.

## Features

- Fetch and display a list of items from a mock API.
- Add new items to the list.
- Update existing items.
- Delete items from the list.
- Basic error handling for API calls.
- Responsive design using Tailwind CSS for both desktop and mobile.

## Stack

- **Frontend:** TypeScript, Tailwind CSS
- **API:** JSONPlaceholder (Mock API)
- **Deployment:** Vercel

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- Node.js (>=16.x)
- tailwindcss
- jsonserver

### Installation & Running the Project Locally

1. Clone the repository:
   ```sh
   git clone https://github.com/BluffSet7340/reactjs_mockapi.git
   ```
2. Install json-server:
   ```sh
   npm install json-server
   ```
2. Set json-server to watch db.json file:
   ```sh
   json-server --watch db.json
   ```
2. Navigate to the project directory:
   ```sh
   cd reactjs_mockapi
   ```
3. Install dependencies:
   ```sh
   npm install 
   ```
4. Start the development server, if prompted, press y to use another port:
   ```sh
   npm start 
   ```
5. Open localhost in your browser.

## Deployment

The application is deployed on [**Vercel**](https://reactjs-mockapi.vercel.app/).

## API Endpoints

- Fetch items: `GET https://jsonplaceholder.typicode.com/posts`
- Create item: `POST https://jsonplaceholder.typicode.com/posts`
- Update item: `PUT https://jsonplaceholder.typicode.com/posts/:id`
- Delete item: `DELETE https://jsonplaceholder.typicode.com/posts/:id`

## License

This project is licensed under the MIT License.

## Contact

My [email](mailto\:saeed.binmizan@gmail.com).

