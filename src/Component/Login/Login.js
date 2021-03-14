import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import logo from "../Images/hooks_desktop_16_9_yk3d8k.png";
import { UserContext } from "../../App";
import axios from "axios";
import { useHistory, useLocation } from "react-router";

const Login = () => {
  const { value1, value2 } = useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = value2;
  const [UserInfo, setUserInfo] = useState([]);
  console.log(loggedInUser);

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const [login, setLogin] = useState(false);
  const [loginUnsuccessful, setLoginUnsuccessful] = useState(false);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data, e) => {
    setUserInfo(data);
  };

  useEffect(() => {
    let user = {
      email: UserInfo.email,
      password: UserInfo.password,
    };
    // console.log(data);
    if (user.email) {
      axios.post(`https://mudee.shop/helpz/api/pos/login`, user).then((res) => {
        //  console.log(res);
        // console.log(res.data);
        if (res.data.errors) {
          setLogin(false);
          setLoginUnsuccessful(true);
        } else {
          setLoggedInUser(res.data);
          setLogin(true);
          setLoginUnsuccessful(false);
          localStorage["user"] = JSON.stringify(res.data);
          history.replace(from);
        }
      });
    }
  }, [UserInfo]);

  return (
    <div className="loginForm">
      <img src={logo} alt="Logo" />
      <form onSubmit={handleSubmit(onSubmit)} className="Pos Manager">
        <input name="email" ref={register} placeholder="Name" required />
        <input name="password" ref={register} placeholder="Password" required />
        <input type="submit" />
      </form>
      {loginUnsuccessful ? <p>Credentials doesn't match</p> : " "}
    </div>
  );
};

export default Login;
