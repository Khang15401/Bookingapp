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
import "./editRoom.scss";

const EditRoom = ({}) => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const { roomId } = useParams();
  // console.log(roomId);

  const { data, loading, error } = useFetch(`/rooms/${roomId}`);
  // const { room } = useContext(AuthContext);
  console.log(data);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // const data = new FormData();
    // data.append("file", file);
    // data.append("upload_preset", "upload");
    try {
      // const uploadRes = await axios.post(
      //   "https://api.cloudinary.com/v1_1/kiawdev/image/upload",
      //   data
      //   );
      //       const { url } = uploadRes.data;

      // console.log(updateHotel);
      const updateRoom = {
        ...info,
      };
      // console.log(info);
      await axios.patch("/rooms/" + roomId, updateRoom);
      alert("Sửa thông tin phòng thành công!");
      navigate("/rooms");
    } catch (err) {
      alert("Sửa thông tin không thành công!");
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Sửa Thông Tin Phòng Khách Sạn</h1>
        </div>
        <div className="bottom">
          {/* <div className="left"> */}
          {/* <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            /> */}
          {/* </div> */}
          <div className="right">
            <form>
              <div class="formInput">
                {/* <label>Ảnh Khách Sạn</label>
                <div
                  class="img-update"
                  onChange={handleChange}
                  src={data.photos}
                  id="photos"
                ></div> */}
                {/* <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label> */}
                {/* <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                /> */}
                <label>Tiêu Đề Phòng</label>
                <input
                  onChange={handleChange}
                  // type={input.type}
                  placeholder={data.title}
                  id="title"
                  name="title"
                />
                <label>Giới Thiệu</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder={data.desc}
                  id="desc"
                  name="desc"
                />
                <label>Giá Phòng</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder={data.price}
                  id="price"
                  name="price"
                />

                {/* <label>Nổi bật</label>
                <p>{data.featured}</p>
                <select id="special" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select> */}
                <label>Số Người Tối Đa</label>
                <input
                  onChange={handleChange}
                  type="number"
                  min={1}
                  max={15}
                  placeholder={data.maxPeople}
                  id="maxPeople"
                  name="maxPeople"
                />
                <label>Số Phòng Khách Sạn</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder={data.roomNumbers}
                  // placeholder={JSON.stringify(data.roomNumbers)}
                  id="roomNumbers"
                  name="roomNumbers"
                />
              </div>

              <button className="no-btn" disabled></button>
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

export default EditRoom;
