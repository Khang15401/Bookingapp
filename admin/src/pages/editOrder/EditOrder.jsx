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
import "./editOrder.scss";

const EditOrder = ({}) => {
  const navigate = useNavigate();
  // const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [orders, setOrders] = useState([]);
  const { orderId } = useParams();
  // console.log(orderId);

  const { data, loading, error } = useFetch(`/orders/${orderId}`);
  const { order } = useContext(AuthContext);
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
          const updateOrder = {
            ...info,
          };
          // console.log(data);
      await axios.patch("/orders/" + orderId, updateOrder);
      alert("Sửa thông tin đơn hàng thành công!");
      navigate("/orders");
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
          <h1>Sửa thông tin đơn hàng</h1>
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
                <label>Tên khách sạn</label>
                <input
                  // type={input.type}
                  placeholder={data.nameHotel}
                  id="name"
                  name="name"
                  disabled
                />
                <label>Tên khách hàng</label>
                <input
                  // type={input.type}
                  placeholder={data.userName}
                  id="name"
                  name="name"
                  disabled
                />
                {/* <label>Khoảng Cách</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder={data.distance}
                  id="distance"
                  name="distance"
                />
                <label>Địa Chỉ</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder={data.address}
                  id="address"
                  name="address"
                />
                <label>Thành Phố</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder={data.city}
                  id="city"
                  name="city"
                />
                
                <label>Tiêu Đề</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder={data.title}
                  id="title"
                  name="title"
                />
                <label>Đánh Giá</label>
                <input
                  onChange={handleChange}
                  type="number"
                  min={0}
                  placeholder={data.rating}
                  id="rating"
                  name="rating"
                /> */}
                <label>Tình trạng</label>
                <p>{data.status}</p>
                <select id="status" onChange={handleChange}>
                  <option value={'Chưa nhận phòng'}>Chưa nhận phòng</option>
                  <option value={'Đã hủy'}>Đã hủy</option>
                  <option value={'Hoàn thành'}>Hoàn thành</option>
                </select>
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

export default EditOrder;
