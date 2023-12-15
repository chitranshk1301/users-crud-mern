import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/dashboard";
import Employees from "./pages/employees";
import CreateEmployee from "./pages/createEmployee";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/employees" exact element={<Employees />} />
          <Route path="/create-employee" exact element={<CreateEmployee />} />
        </Routes>
      </div>
  );
}

export default App;
