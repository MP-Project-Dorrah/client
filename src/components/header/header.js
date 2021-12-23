import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { AiOutlineLogout } from "react-icons/ai";
import { useSelector } from "react-redux";
import { logOut } from "../../reducers/login";
import { useDispatch } from "react-redux";

const Header = () => {
  let navigate = useNavigate();
  const dispatchEvent = useDispatch();

  const state = useSelector((state) => {
    return state;
  });

  const logout = () => {
    const data = {
      role: "",
      token: "",
      userID: "",
      username: "",
    };
    dispatchEvent(logOut(data));
    navigate(`/`);
  };

  return (
    <>
      <div className="nav">
        {state.signIn.token.length === 0 ? (
          <ul>
            <li className="lie" id="logo">
              logo
            </li>
            <li className="lie">
              <Link className="link" to="/">
                Home
              </Link>
            </li>
            <li className="lie">
              <Link className="link" to="/agents">
                Agents
              </Link>
            </li>
            <li className="lie">
              <Link className="link" to="/logIn">
                log in
              </Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li className="lie">logo</li>
            <li className="lie">
              <Link className="link" to="/">
                Home
              </Link>
            </li>
            <li className="lie">
              <Link className="link" to="/agents">
                Agents
              </Link>
            </li>
            <li className="lie">
              <Link className="link" to="/interestList">
                interst list
              </Link>
            </li>
            <li className="lie">
              <Link className="link" to="/">
                Profile
              </Link>
            </li>
            <li className="lie">
              <span className="link" onClick={logout}>
                <AiOutlineLogout />
              </span>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default Header;
