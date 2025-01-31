import React, { useEffect, useState } from 'react';

const EmployeeTable: React.FC = () => {
  interface Employee {
    name: string;
    age: number;
    designation: string;
    salary: number;
  }

  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/employees');
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <h1>Employees List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Designation</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.age}</td>
              <td>{employee.designation}</td>
              <td>{employee.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
