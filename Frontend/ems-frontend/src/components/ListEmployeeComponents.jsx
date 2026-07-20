import React,{useState,useEffect} from 'react'
import { listEmployees } from '../services/EmployeeService'; 
import {useNavigate} from 'react-router-dom'
import { removeEmployee } from '../services/EmployeeService';

export const ListEmployeeComponents = () => {
    const navigator = useNavigate();

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        getAllEmployees();
    }, []);

    function getAllEmployees() {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch((error) => {
            console.error("Error fetching employees:", error);
        })
    }

    function addNewEmployee() {
        navigator("/add-employee");
    }

    function updateEmployee(id) {
        navigator(`/update-employee/${id}`);
    }

    function deleteEmployee(id) {
        removeEmployee(id).then((response) => {
            // Remove the deleted employee from local state so UI updates immediately
            setEmployees(prev => prev.filter(emp => emp.id !== id));
        }).catch((error) => {
            console.error("Error deleting employee:", error);
        })
    }

  return (
    <div className='container'>
        <h2 className="text-center">List of Employees</h2>
    
        <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((employee) => (
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.email}</td>
                        <td>{employee.phone}</td>
                        <td>{employee.address}</td>
                        <td>
                            <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                            <button className='btn btn-danger' style={{marginLeft: "10px"}} onClick={() => deleteEmployee(employee.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
