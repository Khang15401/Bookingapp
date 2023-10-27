import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContex";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbarlo from "../../components/navbarlo/Navbarlo";

const Login = () => {
  const [ credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  })

const { loading, error, dispatch } = useContext(AuthContext);

const navigate = useNavigate()

const handleChange = (e) => {
    setCredentials(prev=>({...prev, [e.target.id]:e.target.value}));
};

const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div>
      <Navbarlo/>
      <div className="login">
          <div className="lContainer">
              <h2>Tài khoản: </h2>
              <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput" />
              <h2>Mật khẩu: </h2>
              <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput" />
              <button disabled={loading} onClick={handleClick} className="lButton2">Đăng Nhập</button>
              <button disabled={loading} className="lButton2"><a className="BtnRH" href="/">Trở về Trang Chủ</a></button>
              {/* <a className="BtnRH" href="/register">Trở về Trang Chủ</a> */}
              {error && <span>{error.message}</span>}
          </div>
      </div>
    </div>
  )
}

export default Login
