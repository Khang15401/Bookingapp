import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContex";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbarlo from "../../components/navbarlo/Navbarlo";
import NavbarPartner from "../../components/navbarPartner/NavbarPartner";
import Alert from "../../components/Alert/Alert";
import toast from "react-hot-toast";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  // const { loading, error, dispatch } = useContext(AuthContext);
  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

      // toast.success("Đăng nhập thành công!");
      navigate("/");
    } catch (err) {
      // toast.error("Đăng nhập thất bại!");
      // toast.error(error.message);
      // toast.error(
      //     "Thất bại!" +
      //     (error && error.message ? ` ${error.message}` : "")
      // );
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Đăng nhập thất bại!";

      toast.error(`${errorMessage}`);
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   dispatch({ type: "LOGIN_START" });
  //   try {
  //     const res = await axios.post("/auth/login", credentials);
  //     const userDetails = res.data.details;

  //     if (res.status === 403) {
  //       // Tài khoản bị khóa, hiển thị thông báo toast với lý do bị khóa
  //       toast.error(`Đăng nhập thất bại! ${res.data.error} Lý do: ${res.data.lockReason}`);
  //       dispatch({ type: "LOGIN_FAILURE", payload: { message: "Account is locked" } });
  //     } else {
  //       dispatch({ type: "LOGIN_SUCCESS", payload: userDetails });
  //       toast.success("Đăng nhập thành công!");
  //       setTimeout(() => {
  //         navigate("/");
  //       }, 800);
  //     }
  //   } catch (err) {
  //     toast.error("Đăng nhập thất bại!");
  //     dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
  //   }
  // };

  return (
    <div>
      {/* <Navbarlo/> */}
      <NavbarPartner />
      <div className="login">
        <div className="lContainer">
          <h2>Tài khoản: </h2>
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
            className="lInput"
          />
          <h2>Mật khẩu: </h2>
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="lInput"
          />
          <button disabled={loading} onClick={handleClick} className="lButton2">
            Đăng Nhập
          </button>
          <button disabled={loading} className="lButton2">
            <a className="BtnRH1" href="/">
              Trở về Trang Chủ
            </a>
          </button>
          {/* <a className="BtnRH" href="/register">Trở về Trang Chủ</a> */}
          {/* {error && <span>{error.message}</span>} */}
        </div>
        <Alert />
      </div>
    </div>
  );
};

export default Login;
