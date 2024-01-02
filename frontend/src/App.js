import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import EmployeesTable from "./components/employeesTable/EmployeesTable";
import EmployeesProfile from "./components/employeesTable/EmployeesProfile";
import Todo from "./components/todo/Todo";
import Counter from "./components/counter/Counter";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<EmployeesTable />} />
        <Route path="/employee/:id" element={<EmployeesProfile />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/todo" element={<Todo />} />
        <Route
          path="*"
          element={
            <div>
              <h1>Page Not Found</h1>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
