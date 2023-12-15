
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/dashboard";
import Employees from "./pages/employees";
import CreateEmployee from "./pages/createEmployee";
import EmployeeDetails from "./pages/employee";
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateForm from "./pages/updateForm";


function App() {
  
  return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/employees" exact element={<Employees />} />
          <Route path="/create-employee" exact element={<CreateEmployee />} />
          <Route path="/employee/:id" exact element={<EmployeeDetails />} />
          <Route path="/employee/:id/update" exact element={<UpdateForm />} />
        </Routes>
      </div>
  );
}

export default App;
