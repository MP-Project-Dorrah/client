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
import Users from "./components/users";
import User from "./components/user";
import { useSelector } from "react-redux";
import NotFound from "./components/notFound";

function App() {
  const state = useSelector((state) => {
    return state;
  });

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/agents" element={<Agents />} />
        <Route exact path="/property/:id" element={<Property />} />
        {state.signIn.token ? (
          <>
            <Route exact path="/interestList" element={<InterestList />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/user/:id" element={<User />} />
            <Route exact path="/users" element={<Users />} />
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <>
            <Route exact path="/log" element={<Signup />} />
            <Route exact path="/logIn" element={<Login />} />
            <Route exact path="/forgetPassword" element={<Forget />} />
            <Route exact path="/resetPassword" element={<Reset />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
