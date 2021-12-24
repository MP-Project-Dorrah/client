import "./App.css";
import Header from "./components/header/header";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/signup/signup";
import Login from "./components/logIn/login";
import Forget from "./components/forget/forget";
import Reset from "./components/resetpass/reset";
import Home from "./components/home/home";
import Agents from "./components/agents/agents";
import InterestList from "./components/interestList/interest";
import Profile from "./components/profile/profile";
import Property from "./components/property/property";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/log" element={<Signup />} />
        <Route exact path="/logIn" element={<Login />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/forgetPassword" element={<Forget />} />
        <Route exact path="/resetPassword" element={<Reset />} />
        <Route exact path="/agents" element={<Agents />} />
        <Route exact path="/interestList" element={<InterestList />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/property/:id" element={<Property />} />
        
        {/* <Route path="*" element={<Notfound />} /> */}
      </Routes>
    </div>
  );
}

export default App;
