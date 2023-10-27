import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContex";
import "./register1.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbarlo from "../../components/navbarlo/Navbarlo";

const Register1 = () => {
  const [ credentials, setCredentials] = useState({
    
  })
const { loading, error, dispatch } = useContext(AuthContext);

const navigate = useNavigate()

const handleChange = (e) => {
    setCredentials(prev=>({...prev, [e.target.id]:e.target.value}));
};

const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" });
    try {
      const res = await axios.post("/auth/register", credentials);
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
      alert("Tạo người dùng thành công!!!")
      navigate("/login")
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div>
      <Navbarlo/>
      <div className="register">
          <div className="registerContainer">
              <h2>Tài khoản: </h2>
              <input type="text"  placeholder="username" id="username" onChange={handleChange} className="lInput" />
              <h2>Mật khẩu: </h2>
              <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput" />
              <h2>Email: </h2>
              <input type="text"  placeholder="email" id="email" onChange={handleChange} className="lInput" />
              <h2>Quốc gia: </h2>
              <input type="text"  placeholder="quốc gia" id="country" onChange={handleChange} className="lInput" />
              <h2>Thành phố: </h2>
              <input type="text"  placeholder="thành phố" id="city" onChange={handleChange} className="lInput" />
              <h2>Điện thoại: </h2>
              <input type="text" placeholder="điện thoại" id="phone" onChange={handleChange} className="lInput" />
              <button disabled={loading} onClick={handleClick} className="lButton" >Đăng Ký</button>
              <button disabled={loading} className="lButton"><a className="BtnRH" href="/">Trở về Trang Chủ</a></button>
              {error && <span>{error.message}</span>}
          </div>
      </div>
    </div>
  )
}

export default Register1
