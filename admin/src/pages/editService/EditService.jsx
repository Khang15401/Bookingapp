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
import Alert from "../../components/Alert/Alert";
import toast from "react-hot-toast";

const EditService = ({}) => {
  const navigate = useNavigate();
  // const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [services, setServices] = useState([]);
  const { serviceId } = useParams();
  // console.log(orderId);
  const [selectedValue, setSelectedValue] = useState("default");

  const { data, loading, error } = useFetch(`/services/${serviceId}`);
  const { serivce } = useContext(AuthContext);
  const hiddenService = data.isHidden;

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
      toast.success("Sửa thông tin dịch vụ thành công!");
      console.log(updateService);

      setTimeout(() => {
        navigate("/services");
        // window.location.reload();
      }, 800);
    } catch (err) {
      toast.error("Sửa thông tin dịch vụ không thành công!");
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <Alert />
        <div className="top">
          <h1>Sửa thông tin dịch vụ</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
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
                <label>
                  <p>
                    <label>
                      Tình trạng: <p>{hiddenService ? "Đã ẩn" : "Hiển thị"}</p>
                    </label>
                  </p>
                </label>
                {/* <p>{data.status}</p> */}
                {data.status !== "Hoàn thành" && data.status !== "Đã hủy" && (
                  <select
                    id="isHidden"
                    value={selectedValue}
                    onChange={handleChange}
                  >
                    <option value="default" disabled hidden>
                      Trạng thái
                    </option>
                    <option value={true}>Ẩn</option>
                    <option value={false}>Hiển thị</option>
                  </select>
                )}
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
