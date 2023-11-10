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
  const navigate = useNavigate();
  const [info, setInfo] = useState({});
  console.log()

  const [isLocked, setIsLocked] = useState(false);
  const [lockReason, setLockReason] = useState("");
  const [selectedValue, setSelectedValue] = useState('default');
  const { userId } = useParams();

  const { data, loading, error } = useFetch(`/users/${userId}`);
  const { user } = useContext(AuthContext);

  // const handleChange = (e) => {
    // setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  // };

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    if (e.target.id === "locked") {
      setIsLocked(e.target.value === "true");
    } else {
      setLockReason(e.target.value);
    }
    setSelectedValue(e.target.value);
  };
  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   let newPhoto = info.photo;
  //   try {
  //     if (file) {
  //       // Nếu có tải lên ảnh mới, thực hiện upload và cập nhật ảnh
  //       const data = new FormData();
  //       data.append("file", file);
  //       data.append("upload_preset", "upload");

  //       const uploadRes = await axios.post(
  //         "https://api.cloudinary.com/v1_1/kiawdev/image/upload",
  //         data
  //       );
  //       const { url } = uploadRes.data;
  //       newPhoto = url;
  //     }

  //     const updateUser = {
  //       ...info,
  //       img: newPhoto,
  //     };
  //     await axios.patch("/users/" + userId, updateUser);
  //     alert("Sửa thông tin thành công!");
  //     navigate("/users");
  //   } catch (err) {
  //     alert("Sửa thông tin không thành công!");
  //     console.log(err);
  //   }
  // };

  const handleClick = async (e) => {
    e.preventDefault();
    try {

      const updateBanned = {
        ...info,
      };
      await axios.patch("/users/" + userId, updateBanned);
      console.log(updateBanned);
      alert("Điều chỉnh chặn người dùng thành công!");
      navigate("/users");
    } catch (err) {
      alert("Bị lỗi khi chặn người dùng!");
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Thông tin người dùng</h1>
        </div>
        <div className="bottom">
          <div className="left5">
            {/* <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            /> */}
            <label>Ảnh đại diện</label>
            <div>
              <img
                className="img-update"
                onChange={handleChange}
                src={data.img}
                id="img"
              />
            </div>
          </div>
          <div className="right">
            <form>
              <div className="formInput4">
                {/* <label>Ảnh đại diện</label>
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
                /> */}

                <div className="formInputRow2">
                  <label>Tên người dùng:</label>
                  <div>{data.username}</div>
                </div>

                <div className="formInputRow2">
                  <label>Email:</label>
                  <div>{data.email}</div>
                </div>

                <div className="formInputRow2">
                  <label>Thành phố:</label>
                  <div>{data.city}</div>
                </div>

                <div className="formInputRow2">
                  <label>Số điện thoại:</label>
                  <div>{data.phone}</div>
                </div>

                <div className="formInputRow2">
                  <label>Khóa tài khoản:</label>
                  <div>
                    <select name="lockReason" value={selectedValue} id="locked" onChange={handleChange}>
                      <option value="default" disabled hidden>
                        Hành động
                      </option>
                      <option value={true}>Khóa</option>
                      <option value={""}>Mở khóa</option>
                    </select>
                  </div>
                </div>

                {isLocked && (
                  <div className="formInputRow2">
                    <label>Lý do khóa:</label>
                    <div>
                      <select id="lockReason" onChange={handleChange}>
                        <option value="Tài khoản của bạn vi phạm về thanh toán">
                          Tài khoản của bạn vi phạm về thanh toán
                        </option>
                        <option value="Vi phạm quy tắc bình luận">
                          Vi phạm quy tắc bình luận
                        </option>
                        <option value="Vi phạm điều khoản sử dụng">
                          Vi phạm điều khoản sử dụng
                        </option>
                        <option value="Phản hồi tiêu cực từ khách sạn">
                          Phản hồi tiêu cực từ khách sạn
                        </option>
                        <option value="Lạm dụng hệ thống">
                          Phát hiện lạm dụng hệ thống
                        </option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              <button className="no-btn" disabled></button>
              {/* <button className="no-btn" disabled></button> */}
              <button onClick={handleClick}>Cập nhật</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
