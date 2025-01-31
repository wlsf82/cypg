# Express PostgreSQL Server

This project is an Express.js server that connects to a PostgreSQL database to retrieve employees data. The server provides an API endpoint to fetch details from the `employee_data` table.

## Project Structure

```sh
backend
├── src
│   ├── app.js                     # Entry point of the application
│   ├── controllers
│   │   └── employeesController.js # Controller for employees-related logic
│   ├── routes
│   │   └── employeesRoutes.js      # Routes for employees-related endpoints
│   └── db
│       └── index.js               # Database connection and query functions
├── package.json                   # NPM configuration file
├── .env                           # Environment variables
└── README.md                      # Project documentation

```

## Setup Instructions

1. **Clone the repository:**

```sh
git clone <repository-url>
cd backend/

```

2. **Install dependencies:**

```js
npm install

```

3. **Configure environment variables:**

Create a `.env` file in the root directory and add your PostgreSQL connection string:

```.env
DATABASE_URL=your_database_connection_string # Similar to `.env.example`
PORT=3001

```

4. **Run the server:**

```sh
npm start # or, run `npm run dev` to start the server in development mode

```

## Usage

Once the server is running, you can retrieve employee data by sending a `GET` request to the the `/api/employees` endpoint.

You can test it out with the below `curl` command.

```sh
curl http://localhost:3001/api/employees

```

The above command should return an array of objects containing the `name`, `age`, `designation`, and `salary` of employees from the `employee_data` table.

Something like this:

```sh
[
  {
    "name":"Alice Johnson",
    "age":38,
    "designation":"CEO",
    "salary":50000
  },
  {"name":"Bob Smith",
    "age":40,
    "designation":"CTO",
    "salary":40000
  },
  {
    "name":"Charlie Brown",
    "age":35,
    "designation":"VP of Engineering",
    "salary":35000
  },
  {
    "name":"John Doe",
    "age":45,
    "designation":"Principal Engineer",
    "salary":28000
  }
]

```

## License

This project is licensed under the MIT License.
