import React, { useState, useEffect } from 'react'
import { createEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployee } from '../services/EmployeeService';
import { updateEmployee } from '../services/EmployeeService';

const EmployeeComponent = () => {
    const { id } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [errors, setErrors] = useState({

        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: ''
    }
    );

    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setPhone(response.data.phone);
                setAddress(response.data.address);
            }).catch(error => {
                console.error("Error fetching employee:", error);
            });
        }
    }, [id]);

function saveOrUpdateEmployee(event) {
    event.preventDefault();

    if(validateForm()){
        const employee = { firstName, lastName, email, phone, address };
        console.log(employee);

        if (id) {
            updateEmployee(id, employee).then((response) => {
                console.log("Employee updated successfully:", response.data);
                navigator("/employees");
            }).catch(error => {
                console.error("Error updating employee:", error);
            })  
        } else {   
            createEmployee(employee).then((response) => {
                console.log("Employee added successfully:", response.data);
                navigator("/employees");
            }).catch(error => {
                console.error("Error creating employee:", error);
            });
        }
        
    
    }
}

function validateForm() {
    let isValid = true;
    const errorsCopy = { ...errors };

    if(firstName.trim()){
        errorsCopy.firstName = '';
    } else {
        errorsCopy.firstName = 'First name is required';
        isValid = false;
    }

    if(lastName.trim()){
        errorsCopy.lastName = '';
    } else {
        errorsCopy.lastName = 'Last name is required';
        isValid = false;
    }

    if(email.trim()){
        errorsCopy.email = '';
    } else {
        errorsCopy.email = 'Email is required';
        isValid = false;
    }

    if(phone.trim()){
        errorsCopy.phone = '';
    } else {
        errorsCopy.phone = 'Phone is required';
        isValid = false;
    }

    if(address.trim()){
        errorsCopy.address = '';
    } else {
        errorsCopy.address = 'Address is required';
        isValid = false;
    }

    setErrors(errorsCopy);
    return isValid;
}

function pageTitle() {
    if (id) {
        return <h2 className='text-center'>Update Employee</h2>
    }else {
        return <h2 className='text-center'>Add Employee</h2>
    }
}

  return (
    <div className='container '>
        <br /> <br />
        <div className='row'>
            <div className='card col-md-6 offset-md-3 '>
                {
                    pageTitle()
                }
                <form>
                    <div className='form-group mb-2'>
                        <label className='form-label'>First Name :</label>
                        <input 
                            type="text" 
                            placeholder='Enter Employees First Name' 
                            name='firstName' 
                            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                        />
                        {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                    </div>
                    <div className='form-group mb-2'>
                        <label className='form-label'>Last Name :</label>
                        <input 
                            type="text" 
                            placeholder='Enter Employees Last Name' 
                            name='lastName' 
                            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                        />
                        {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                    </div>
                    <div className='form-group mb-2'>
                        <label className='form-label'>Email :</label>
                        <input 
                            type="email" 
                            placeholder='Enter Employees Email' 
                            name='email' 
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}  
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                    </div>
                    <div className='form-group mb-2'>
                        <label className='form-label'>Phone :</label>
                        <input 
                            type="text" 
                            placeholder='Enter Employees Phone' 
                            name='phone' 
                            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                        {errors.phone && <div className='invalid-feedback'>{errors.phone}</div>}
                    </div>
                    <div className='form-group mb-2'>
                        <label className='form-label'>Address :</label>
                        <input 
                            type="text" 
                            placeholder='Enter Employees Address' 
                            name='address' 
                            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                        />
                        {errors.address && <div className='invalid-feedback'>{errors.address}</div>}
                    </div>
                    <div className='form-group mb-2 d-flex justify-content-center'>
                    <button className='btn btn-success mb-2' onClick={saveOrUpdateEmployee}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default EmployeeComponent