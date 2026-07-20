import { HeaderComponent } from "./components/HeaderComponent"
import { ListEmployeeComponents } from "./components/ListEmployeeComponents"
import { FooterComponent } from "./components/FooterComponent"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import EmployeeComponent from "./components/EmployeeComponent"
import './App.css'

function App(){
  return (
    <>
      <BrowserRouter>
        <HeaderComponent/>
          <Routes>
            {/* // http://localhost:3000 */}
            <Route path="/" element={<ListEmployeeComponents />} />

            {/* // http://localhost:3000/employees */}
            <Route path="/employees" element={<ListEmployeeComponents />} />

            {/* // http://localhost:3000/add-employee */}
            <Route path="/add-employee" element={<EmployeeComponent />} />

            {/* // http://localhost:3000/update-employee/:id */}
            <Route path="/update-employee/:id" element={<EmployeeComponent />} /> 

            {/* // http://localhost:3000/delete-employee/:id */}
            <Route path="/delete-employee/:id" element={<EmployeeComponent />} /> 
          </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}
export default App