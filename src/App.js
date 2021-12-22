import "./App.css";
import Header from "./components/header/header";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/signup/signup";
import Login from "./components/logIn/login";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/log" element={<Signup />} />
        <Route exact path="/logIn" element={<Login />} />
        {/* <Route path="*" element={<Notfound />} /> */}
      </Routes>
    </div>
  );
}

export default App;
