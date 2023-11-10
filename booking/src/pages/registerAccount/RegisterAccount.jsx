import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContex";
import "./registerAccount.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbarlo from "../../components/navbarlo/Navbarlo";
import toast from "react-hot-toast";
import Alert from "../../components/Alert/Alert";

const RegisterAccount = () => {
  const [credentials, setCredentials] = useState({});
  console.log(credentials);
  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" });

    const userData = { ...credentials, role: credentials.role };
    try {
      const res = await axios.post("/auth/register", credentials);
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
      toast.success("Tạo tài khoản quản lý thành công! Bạn có thể đăng nhập để quản lí khách sạn")
      // navigate("/localhost:");
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (err) {
      toast.error("Đăng ký tài khoản thất bại!")
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div>
      <Navbarlo />
      <h1 className="title-h1">Đăng ký tài khoản đối tác</h1>
      <div className="registerAccount">
        <div className="registerAccountContainer">
          <h2>Tài khoản: </h2>
          <input
            type="text"
            placeholder="tên tài khoản"
            id="username"
            onChange={handleChange}
            className="lInput"
          />
          <h2>Mật khẩu: </h2>
          <input
            type="password"
            placeholder="mật khẩu"
            id="password"
            onChange={handleChange}
            className="lInput"
          />
          <h2>Email: </h2>
          <input
            type="text"
            placeholder="e-mail"
            id="email"
            onChange={handleChange}
            className="lInput"
          />
          <h2>Quốc gia: </h2>
          <input
            type="text"
            placeholder="quốc gia"
            id="country"
            onChange={handleChange}
            className="lInput"
          />
          <h2>Thành phố: </h2>
          <input
            type="text"
            placeholder="thành phố"
            id="city"
            onChange={handleChange}
            className="lInput"
          />
          <h2>Điện thoại: </h2>
          <input
            type="text"
            placeholder="điện thoại"
            id="phone"
            onChange={handleChange}
            className="lInput"
          />
          {/* <h2>Xác nhận trở thành đại lý </h2> */}
          <div className="checkbox-partner">
            <input
              type="checkbox"
              id="role"
              onChange={(e) => {
                const newRole = e.target.checked ? "staff" : "";
                setCredentials((prev) => ({ ...prev, role: newRole }));
              }}
            />
            <span className="confirmPartner">
              Xin hãy chắc chắn rằng bạn đã đọc qua tất cả <a className="terms-and-policies" href="/policies">Điều khoản và Chính sách</a> khi trở thành đối tác của Kiawbooking
            </span>
          </div>
          <div className="btn-registerAccount-user">
            <button
              disabled={loading}
              onClick={handleClick}
              className="lButton3"
            >
              Đăng Ký
            </button>
            <button disabled={loading} className="lButton3">
              <a className="BtnRH1" href="/">
                Trở về Trang Chủ
              </a>
            </button>
          </div>
          {error && <span>{error.message}</span>}
        </div>
      </div>
      <Alert/>
    </div>
  );
};

export default RegisterAccount;
