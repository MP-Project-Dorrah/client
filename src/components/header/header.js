import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./style.css";
import { AiOutlineLogout } from "react-icons/ai";
import { useSelector } from "react-redux";
import { logOut } from "../../reducers/login";
import { useDispatch } from "react-redux";
import { BsFillCircleFill } from "react-icons/bs";

const Header = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
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
            <li
              className={splitLocation[1] === "" ? "lie" : "logoUnActive"}
              id="logo"
            >
              PERFECTVIEW
            </li>
            <li className="lie">
              <Link
                className={splitLocation[1] === "" ? "homeActive" : "unActive"}
                to="/"
              >
                Home
                {splitLocation[1] === "" ? (
                  <BsFillCircleFill className="circle" />
                ) : (
                  ""
                )}
              </Link>
            </li>
            <li className="lie">
              <Link
                className={
                  splitLocation[1] === "agents" ? "active" : "unActive"
                }
                to="/agents"
              >
                Agents
                {splitLocation[1] === "agents" ? (
                  <BsFillCircleFill className="circle" />
                ) : (
                  ""
                )}
              </Link>
            </li>
            <li className="lie">
              <Link
                className={splitLocation[1] === "logIn" ? "active" : "unActive"}
                to="/logIn"
              >
                Log in
                {splitLocation[1] === "logIn" ? (
                  <BsFillCircleFill className="circle" />
                ) : (
                  ""
                )}
              </Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li
              className={splitLocation[1] === "" ? "lie" : "logoUnActive"}
              id="logo"
            >
              PERFECTVIEW
            </li>

            <li className="lie">
              <Link
                className={splitLocation[1] === "" ? "homeActive" : "unActive"}
                to="/"
              >
                Home
                {splitLocation[1] === "" ? (
                  <BsFillCircleFill className="circle" />
                ) : (
                  ""
                )}
              </Link>
            </li>
            <li className="lie">
              <Link
                className={
                  splitLocation[1] === "agents" ? "active" : "unActive"
                }
                to="/agents"
              >
                Agents
                {splitLocation[1] === "agents" ? (
                  <BsFillCircleFill className="circle" />
                ) : (
                  ""
                )}
              </Link>
            </li>
            <li className="lie">
              <Link
                className={
                  splitLocation[1] === "interestList" ? "active" : "unActive"
                }
                to="/interestList"
              >
                Interst list
                {splitLocation[1] === "interestList" ? (
                  <BsFillCircleFill className="circle" />
                ) : (
                  ""
                )}
              </Link>
            </li>

            <li className="lie">
              <Link
                className={
                  splitLocation[1] === "profile" ? "active" : "unActive"
                }
                to="/profile"
              >
                Profile
                {splitLocation[1] === "profile" ? (
                  <BsFillCircleFill className="circle" />
                ) : (
                  ""
                )}
              </Link>
            </li>
            {state.signIn.role === "61c05b910cca090670f00827" && (
              <>
                <li className="lie">
                  <Link className="link" to="/users">
                    Users
                    {splitLocation[1] === "users" ? (
                      <BsFillCircleFill className="circle" />
                    ) : (
                      ""
                    )}
                  </Link>
                </li>
              </>
            )}

            <li className="lie" id="logOutLi">
              <span className="link" onClick={logout}>
                <button className="logOutBtn">
                  <AiOutlineLogout />
                </button>
              </span>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default Header;
