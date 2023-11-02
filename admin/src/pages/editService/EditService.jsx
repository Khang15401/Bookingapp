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
import "./editService.scss";

const EditService = ({}) => {
  const navigate = useNavigate();
  // const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [services, setServices] = useState([]);
  const { serviceId } = useParams();
  // console.log(orderId);

  const { data, loading, error } = useFetch(`/services/${serviceId}`);
  const { serivce } = useContext(AuthContext);
  console.log(data);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
          const updateService = {
            ...info,
          };
      await axios.patch("/services/" + serviceId, updateService);
      alert("Sửa thông tin dịch vụ thành công!");
      console.log(updateService)
      navigate("/services");
    } catch (err) {
      alert("Sửa thông tin dịch vụ không thành công!");
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Sửa thông tin dịch vụ</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
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
                <label>Tên dịch vụ</label>
                <input
                  // type={input.type}
                  placeholder={data.servicename}
                  id="servicename"
                  name="servicename"
                  onChange={handleChange}
                  
                />
                <label>Giới thiệu về dịch vụ</label>
                <input
                  // type={input.type}
                  placeholder={data.introduction}
                  id="introduction"
                  name="name"
                  onChange={handleChange}
                  
                />
                <label>Giá dịch vụ</label>
                <input
                  // type={input.type}
                  placeholder={data.serviceprice}
                  id="serviceprice"
                  name="serviceprice"
                  onChange={handleChange}
                />
                {/* <label>Tình trạng</label>
                <p>{data.status}</p>
                <select id="status" onChange={handleChange}>
                  <option value={'Chưa nhận phòng'}>Chưa nhận phòng</option>
                  <option value={'Đã hủy'}>Đã hủy</option>
                  <option value={'Hoàn thành'}>Hoàn thành</option>
                </select> */}
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

export default EditService;
