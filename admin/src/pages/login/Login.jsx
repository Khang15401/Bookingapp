import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContex";
import "./login.scss";
import { useNavigate } from "react-router-dom";
// import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert/Alert";
import toast from "react-hot-toast";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

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
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        // toast.success("Đăng nhập thành công");

        navigate("/");
      } else {
        toast.error("Bạn không được phép");
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "Bạn không được phép" },
        });
      }
    } catch (err) {
      // toast.error("Tài khoản của bạn bị khóa"  + error.message);
      // toast.error(
      //     "Thất bại." +
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

  return (
    <div>
      {/* <Link to="/" style={{ textDecoration: "none" }}> */}
      <div className="container-logo">
        <div className="logo1">Kiawadmin</div>
      </div>
      {/* </Link> */}
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
          <button disabled={loading} onClick={handleClick} className="lButton">
            Đăng nhập
          </button>
          {/* <a className="BtnRH" href="/">Trở về Trang Chủ</a> */}
          {/* {error && <span>{error.message}</span>}  */}
          <Alert />
        </div>
      </div>
    </div>
  );
};

export default Login;
