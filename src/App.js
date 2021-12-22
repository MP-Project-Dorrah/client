import "./App.css";
import Header from "./components/header/header";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/signup/signup";
import Login from "./components/logIn/login";
import Forget from "./components/forget/forget";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/log" element={<Signup />} />
        <Route exact path="/logIn" element={<Login />} />
        <Route exact path="/forgetPassword" element={<Forget />} />
        {/* <Route path="*" element={<Notfound />} /> */}
      </Routes>
    </div>
  );
}

export default App;
