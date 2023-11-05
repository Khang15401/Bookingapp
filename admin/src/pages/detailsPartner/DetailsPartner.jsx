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
import "./detailsPartner.scss";
import useFetch1 from "../../hooks/useFetch1";
import useFetch2 from "../../hooks/useFetch2";

const DetailsPartner = ({}) => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [users, setUsers] = useState([]);
  const { userId } = useParams();

  const { data, loading, error } = useFetch(`/users/${userId}`);
  // console.log(data);
  const hotelId = data.hotelId;
  const { data1, loading1, error1 } = useFetch1(`/hotels/filter/${hotelId}`);
  // console.log(data1);
  const { data2, loading2, error2 } = useFetch2(`/hotels/room/${hotelId}`);
  // console.log(data2);
  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let newPhoto = info.photo;
    try {
      if (file) {
        // Nếu có tải lên ảnh mới, thực hiện upload và cập nhật ảnh
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");

        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/kiawdev/image/upload",
          data
        );
        const { url } = uploadRes.data;
        newPhoto = url;
      }

      const updateUser = {
        ...info,
        img: newPhoto,
      };
      await axios.patch("/users/" + userId, updateUser);
      alert("Sửa thông tin thành công!");
      navigate("/users");
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
          <h1>Đối tác</h1>
        </div>
        <div className="bottom">
          <div className="right2">
            <form className="setupForm">
              <div className="formInput2">
                {/* <label>Ảnh đại diện</label>
                <img
                  class="img-update"
                  onChange={handleChange}
                  src={data.img}
                  id="img"
                /> */}
                <h3 style={{ paddingBottom: "30px" }}>Thông tin đối tác</h3>
                <label>
                  Email : <div>{data.email}</div>
                </label>
                <label>
                  Tài khoản:<div>{data.username}</div>
                </label>
                <label>
                  Thành phố: <div>{data.city}</div>
                </label>
                <label>
                  Điện thoại: <div>{data.phone}</div>
                </label>
              </div>
            </form>
          </div>
          <div className="left2">
            <h3 style={{ paddingBottom: "30px" }}>Khách sạn quản lý</h3>
            <div className="setup-Info">
              <label>
                <div>
                  <span className="span-hotel">{data1.name}</span>
                </div>
              </label>
              <label>
                Địa chỉ:<div>{data1.address}</div>
              </label>
              <label>
                Điểm đánh giá: <div>{data1.rating}</div>
              </label>
              <label>
                Giới thiệu: <div>{data1.title}</div>
              </label>
              <h3 style={{ paddingBottom: "30px" }}>Danh sách phòng</h3>

              {/* <label>
                <div>{data1.title}</div>
              </label>
              <label>
                Điểm đánh giá: <div>{data1.rating}</div>
              </label>
              <label>
                Giới thiệu: <div>{data1.title}</div>
              </label> */}

              {data2.map((item, index) => (
                <div key={index}>
                  <label>
                    <div>{item.title}: | {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}/1 đêm</div>
                  </label>
                  {/* <label>
                    Điểm đánh giá: <div>{item.rating}</div>
                  </label>
                  <label>
                    Giới thiệu: <div>{item.introduction}</div>
                  </label> */}
                </div>
              ))}
            </div>
          </div>
          <div className="left1">
            <h3>Hình ảnh khách sạn</h3>
            {data1.photos?.map((photo, i) => (
              // <div className="hotelImgWrapper" key={photo.id}>
              <img src={photo} alt="" />
              // </div>
            ))}
          </div>
          {/* <div className="left1">Hello</div> */}
        </div>
      </div>
    </div>
  );
};

export default DetailsPartner;
