import { Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Dashboard from "./pages/dashboard";
import Employees from "./pages/employees";


function App() {
  return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/employees" exact element={<Employees />} />
        </Switch>
        <Footer />
      </div>
  );
}

export default App;
