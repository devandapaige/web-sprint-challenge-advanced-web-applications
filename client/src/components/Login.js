import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";
import axios from "axios";

const initialLogin = {
  login: {
    username: "",
    password: "",
  },
};
const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [loginForm, setLoginForm] = useState(initialLogin);
  const history = useHistory();

  const handleChange = (e) => {
    setLoginForm({
      login: {
        ...loginForm,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", loginForm)
      .then((res) => {
        localStorage.setItem("token", res.data.payload);
        history.push("/bubbles");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          type="text"
          value={loginForm.username}
          onChange={handleChange}
          placeholder="username"
        />
        <input
          name="password"
          type="password"
          value={loginForm.password}
          onChange={handleChange}
          placeholder="password"
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
