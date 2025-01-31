-- Create a table
CREATE TABLE employee_data (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    designation VARCHAR(100) NOT NULL,
    salary INT NOT NULL
);

-- Insert some sample data
INSERT INTO employee_data (name, age, designation, salary) VALUES
('Alice Johnson', 38, 'CEO', 50000),
('Bob Smith', 40, 'CTO', 40000),
('Charlie Brown', 35, 'VP of Engineering', 35000);
