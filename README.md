# Implementing Redis-Caching to Simple API

This is a simple API that returns a list of posts. The API is implemented using Node.JS and Redis is used for caching the response. The API is deployed on Render.

## API Endpoints
/api/posts
/api/posts/:id

## How to run the API
- Clone the repository
- Run `npm install`
- Install Redis on your local machine
- Start the Redis server
- Create a `.env` file and add the following variables
  - PORT=3000
  - REDIS_URL=[ Your Redis URL ]
- Run `npm start`
- The API will be running on `http://localhost:3000`

## Packages
- express
- redis
- axios
- dotenv