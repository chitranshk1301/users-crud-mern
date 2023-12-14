import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Dashboard from "./pages/dashboard";
import Employees from "./pages/employees";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/employees" exact element={<Employees />} />
        </Routes>
        <Footer />
      </div>
  );
}

export default App;
