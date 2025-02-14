import React, { useEffect, useState } from 'react';

const EmployeeTable: React.FC = () => {
  interface Employee {
    id: number;
    name: string;
    age: number;
    designation: string;
    salary: number;
  }

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [newEmployee, setNewEmployee] = useState({ name: '', age: '', designation: '', salary: '' });
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleCreateEmployee = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployee),
      });
      const data = await response.json();
      setEmployees([...employees, data]);
      setNewEmployee({ name: '', age: '', designation: '', salary: '' });
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
  };

  const handleUpdateEmployee = async () => {
    if (!editingEmployee) return;

    try {
      const response = await fetch(`http://localhost:3001/api/employees/${editingEmployee.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingEmployee),
      });
      const data = await response.json();
      setEmployees(employees.map(emp => (emp.id === data.id ? data : emp)));
      setEditingEmployee(null);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDeleteEmployee = async (id: number) => {
    try {
      await fetch(`http://localhost:3001/api/employees/${id}`, {
        method: 'DELETE',
      });
      setEmployees(employees.filter(emp => emp.id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.age}</td>
              <td>{employee.designation}</td>
              <td>{employee.salary}</td>
              <td>
                <button onClick={() => handleEditEmployee(employee)}>Edit</button>
                <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{editingEmployee ? 'Edit Employee' : 'Add New Employee'}</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={editingEmployee ? editingEmployee.name : newEmployee.name}
        onChange={e => (editingEmployee ? setEditingEmployee({ ...editingEmployee, name: e.target.value }) : handleInputChange(e))}
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={editingEmployee ? editingEmployee.age : newEmployee.age}
        onChange={e => (editingEmployee ? setEditingEmployee({ ...editingEmployee, age: parseInt(e.target.value) }) : handleInputChange(e))}
      />
      <input
        type="text"
        name="designation"
        placeholder="Designation"
        value={editingEmployee ? editingEmployee.designation : newEmployee.designation}
        onChange={e => (editingEmployee ? setEditingEmployee({ ...editingEmployee, designation: e.target.value }) : handleInputChange(e))}
      />
      <input
        type="number"
        name="salary"
        placeholder="Salary"
        value={editingEmployee ? editingEmployee.salary : newEmployee.salary}
        onChange={e => (editingEmployee ? setEditingEmployee({ ...editingEmployee, salary: parseInt(e.target.value) }) : handleInputChange(e))}
      />
      <button onClick={editingEmployee ? handleUpdateEmployee : handleCreateEmployee}>
        {editingEmployee ? 'Update Employee' : 'Add Employee'}
      </button>
    </div>
  );
};

export default EmployeeTable;