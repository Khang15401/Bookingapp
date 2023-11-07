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
import "./editHotel.scss";

const EditHotel = ({}) => {
  const navigate = useNavigate();
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [hotels, setHotels] = useState([]);
  const { hotelId } = useParams();
  console.log(hotelId);

  const { data, loading, error } = useFetch(`/hotels/filter/${hotelId}`);
  const { hotel } = useContext(AuthContext);
  console.log(data);

  const managerHotel = JSON.parse(localStorage.getItem("user"));
  const staffRole = managerHotel.role;
  // console.log(staffRole);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      let list = info.photos;
      if (files) {
        list = await Promise.all(
          Object.values(files).map(async (file) => {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "upload");
            const uploadRes = await axios.post(
              "https://api.cloudinary.com/v1_1/Kiawdev/image/upload",
              data
            );

            const { url } = uploadRes.data;
            return url;
          })
        );
      }
      const updateHotel = {
        ...info,
        photos: list,
      };
      // console.log(data);
      await axios.patch("/hotels/" + hotelId, updateHotel);
      alert("Sửa thông tin khách sạn thành công!");
      navigate("/hotels");
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
          <h1>Thông tin khách sạn</h1>
        </div>
        <div className="bottom">
          <div className="left1">
            <div>Ảnh khách sạn</div>
            {data.photos?.map((photo, i) => (
              // <div className="hotelImgWrapper" key={photo.id}>
              <img src={photo} alt="" />
              // </div>
            ))}
            {staffRole !== "admin" && (
              <>
                <label className="setup-label" htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </>
            )}
          </div>
          <div className="right1">
            {/* <form style={{ width: "100%" }}>
              <div className="formInput" style={{ width: "80%" }}>
                <label>Tên Khách Sạn</label>
                <input
                  onChange={handleChange}
                  // type={input.type}
                  placeholder={data.name}
                  id="name"
                  name="name"
                />
                <label>Khoảng Cách</label>
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
                  min={1}
                  max={5}
                  placeholder={data.rating}
                  id="rating"
                  name="rating"
                />
                <label>Nổi bật</label>
                <p>{data.featured}</p>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
                <button className="no-btn" disabled></button>
                <button onClick={handleClick}>Cập nhật</button>
              </div>
            </form> */}

            {staffRole === "admin" ? (
              <form style={{ width: "100%" }}>
                <div className="formInput" style={{ width: "82%" }}>
                  <div className="formInputRow">
                    <label>Tên khách sạn</label>
                    <div>{data.name}</div>
                  </div>

                  <div className="formInputRow">
                    <label>Khoảng cách:</label>
                    <div>{data.distance}km</div>
                  </div>
                  <div className="formInputRow">
                    <label>Địa chỉ:</label>
                    <div>{data.address}</div>
                  </div>
                  <div className="formInputRow">
                    <label>Thành phố:</label>
                    <div>{data.city}</div>
                  </div>
                  <div className="formInputRow">
                    <label>Tiêu đề:</label>
                    <div>{data.title}</div>
                  </div>
                  <div className="formInputRow">
                    <label>Đánh giá</label>
                    <div>{data.rating}</div>
                  </div>
                  <label>Nổi bật</label>
                  <p>{data.featured}</p>
                  <select id="featured" onChange={handleChange}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                  <button className="no-btn" disabled></button>
                  <button onClick={handleClick}>Cập nhật</button>
                </div>
              </form>
            ) : (
              <form style={{ width: "100%" }}>
                <div className="formInput" style={{ width: "80%" }}>
                  <label>Tên Khách Sạn</label>
                  <input
                    onChange={handleChange}
                    placeholder={data.name}
                    id="name"
                    name="name"
                  />
                  <label>Khoảng Cách</label>
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
                    min={1}
                    max={5}
                    placeholder={data.rating}
                    id="rating"
                    name="rating"
                  />
                  <label>Nổi bật</label>
                  <p>{data.featured}</p>
                  <select id="featured" onChange={handleChange}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                  <button className="no-btn" disabled></button>
                  <button onClick={handleClick}>Cập nhật</button>
                </div>
              </form>
            )}

            <div className="formInput" style={{ flex: 1 }}>
              {staffRole !== "admin" && (
                <div className="left1">
                  <div>Ảnh tải lên</div>
                  {Array.from(files).map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt={`Image ${index}`}
                      className="image-preview"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHotel;
