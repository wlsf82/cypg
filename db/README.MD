# PostgreSQL Database

This project is a dockerized PostgreSQL database with an `employee_data` table and some sample data into it.

## Project Structure

```sh
db
├── Dockerfile # Docker definition of the PostgreSQL DB
├── init.sql   # SQL scritps to create and populate a table with sample data
└── README.md  # Project documentation

```

## Setup Instructions

1. **Clone the repository:**

```sh
git clone <repository-url>
cd db/

```

2. **Build the Docker image:**

```sh
docker build -t demo-tat .

```

3. **Run the container:**

```sh
docker run -d --name demo-tat-postgres-container -p 5432:5432 demo-tat

```

## Usage

Once the container is running, you should be able to connect into it and run SQL queries.

```sh
psql -h localhost -U dbuser -d demo

SELECT * FROM employee_data;

```

The result should be similar to the one demonstrated below.

```sql
 id |     name      | age |    designation     | salary
----+---------------+-----+--------------------+--------
  1 | Alice Johnson |  38 | CEO                |  50000
  2 | Bob Smith     |  40 | CTO                |  40000
  3 | Charlie Brown |  35 | VP of Engineering  |  35000
(3 rows)

```

## License

This project is licensed under the MIT License.
