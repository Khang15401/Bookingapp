import React from "react";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./changePassword.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert/Alert";
import toast from "react-hot-toast";
import NavbarProfile from "../../components/navbarProfile/NavbarProfile";
function ChangePassword() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  // const [info, setInfo] = useState({});
  const [info, setInfo] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [file, setFile] = useState("");
  const { data, loading, error, reFetch } = useFetch(`/users/${userId}`);
  console.log(data);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };


  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const { oldPassword, newPassword, confirmPassword } = info;


      if (newPassword !== confirmPassword) {
        toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp!");
        return;
      }

      // Gọi API để cập nhật mật khẩu
      await axios.post(`/users/changePassword/${userId}`, {
        oldPassword,
        newPassword,
        confirmPassword,
      });

      toast.success("Đổi mật khẩu thành công!");
      setTimeout(() => {
        window.location.reload();
      }, 1100);
    } catch (err) {
      toast.error("Mật khẩu cũ không đúng");
      console.log(err);
    }
  };


  return (
    <div className="div-tong1">
      {/* <Navbar /> */}
      <NavbarProfile/>
      {/* <Header/> */}
      <div className="orders">
        <div className="container">
          <div className="title">
            <h1 className="title-name">Đổi mật khẩu</h1>
          </div>
          <form className="edit-form">
            {/* <div className="div-tong"> */}
            <div className="title-input">
              <h2 className="lH21">Mật khẩu cũ </h2>
              <h2 className="lH21">Mật khẩu mới </h2>
              <h2 className="lH21">Nhập lại mật khẩu</h2>
            </div>
            <div className="Content-input">
              <input
                onChange={handleChange}
                placeholder="Nhập lại mật khẩu cũ"
                type="password"
                id="oldPassword"
                name="oldPassword"
                className="lInput1"
              />
              <input
                onChange={handleChange}
                placeholder="Nhập mật khẩu mới"
                type="password"
                id="newPassword"
                name="newPassword"
                className="lInput1"
              />
              <input
                onChange={handleChange}
                placeholder="Xác nhận mật khẩu mới"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="lInput1"
              />


              <button onClick={handleClick} className="lButton1">
                Cập Nhật Thông Tin
              </button>
            </div>
          </form>
        </div>
      </div>
      <Alert />
    </div>
  );
}

export default ChangePassword;
