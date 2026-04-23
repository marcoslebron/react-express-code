## Get Started
This repository consists of a [CRA](https://create-react-app.dev/docs/getting-started) UI app and a basic [express](http://expressjs.com/) API server.

UI will run on port *3000* by default and API will run on port *3001* by default

### 1. Prerequisites

- [NodeJs](https://nodejs.org/en/)
- [NPM](https://npmjs.org/) 

### 2. Installation

On the command prompt run the following commands:

``` 
 $ git clone https://github.com/chriskurhandll/react-express-code-interview.git
 $ cd react-express-code-interview
 $ cd client 
 $ npm install
 $ cd ../server
 $ npm install
 $ npm run start in both client and server directories
```

### 3. Usage

UI URL:  http://localhost:3000/
API URL: http://localhost:3001/api

CORS is enabled on the server so API calls from UI will succeed.# react-express-code-interview

# Users API

This project extends the existing `GET /api/users` endpoint with support for:

- Pagination via `page` and `size`
- Dynamic sorting via `sort`
- Paging metadata in the response
- Validation for invalid query parameters
- Tests for service and API behavior
- Basic logging hooks for request and error visibility

## What was added

The `GET /api/users` endpoint now supports:

- `page`: the page number to retrieve
- `size`: the number of results per page
- `sort`: optional sort field

### Sort behavior

The `sort` parameter supports:

- ascending sort: `sort=name`
- descending sort: `sort=-id`

Currently supported sortable fields:

- `id`
- `name`

The implementation is designed so additional sortable fields can be added easily by extending the allowed field list in the users service.

## Response shape

The endpoint returns a response with `data` and `paging`.

Example:

```json
{
  "data": [
    { "id": 2, "name": "Andrew" },
    { "id": 0, "name": "Jorn" }
  ],
  "paging": {
    "totalResults": 5,
    "next": "http://localhost:3001/api/users?page=2&size=2&sort=name"
  }
}
```
### Paging fields
totalResults: total number of users available
previous: URI for the previous page, when applicable
next: URI for the next page, when applicable

previous and next are only included when valid for the current page.

Example requests
Default request
```bash
curl "http://localhost:3001/api/users"
```
Page 1, size 2
```bash
curl "http://localhost:3001/api/users?page=1&size=2"
```
Sort by name ascending
```bash
curl "http://localhost:3001/api/users?sort=name&page=1&size=10"
```
Sort by id descending
```bash
curl "http://localhost:3001/api/users?sort=-id&page=1&size=10"
```