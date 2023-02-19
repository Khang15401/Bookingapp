import React from "react";
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { AuthContext } from "../../context/AuthContex";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./edit.scss";

const Edit = ({}) => {
  const navigate = useNavigate()
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [users, setUsers] = useState([]);
  const { userId } = useParams();
  
  const { data, loading, error } = useFetch(`/users/${userId}`);
  const { user } = useContext(AuthContext);
  

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // const handleload = async () => {
  //   const ttin = await axios.get("/users/" + userId);
  //   console.log(ttin);
  // };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/kiawdev/image/upload",
        data
      );
      // console.log(uploadRes.data)
      const { url } = uploadRes.data;

      // const updateUser = {
      //   ...info,
      //   img: url,
      // };
      const updateUser = {
        ...info,
        img: url,
      };
      // console.log(updateUser);

      await axios.patch("/users/" + userId, updateUser);
      alert("Sửa thông tin thành công!");
      navigate("/users");
    } catch (err) {
      alert("Sửa thông tin thành công!");
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Sửa User</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div class="formInput">
                <label>Ảnh đại diện</label>
                <img
                  class="img-update"
                  onChange={handleChange}
                  src={data.img}
                  id="img"
                />
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
                <label>Email</label>
                <input
                  onChange={handleChange}
                  // type={input.type}
                  placeholder={data.email}
                  id="email"
                  name="email"
                />
                <label>Tài Khoản</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder={data.username}
                  id="username"
                  name="username"
                />
                <label>Quốc Gia</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder={data.country}
                  id="country"
                  name="country"
                />
                <label>Thành Phố</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder={data.city}
                  id="city"
                  name="city"
                />
                <label>Điện thoại</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder={data.phone}
                  id="phone"
                  name="phone"
                />
              </div>

              
              <button className="no-btn" disabled></button>
              <button className="no-btn" disabled></button>
              <button onClick={handleClick}>Cập nhật</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
