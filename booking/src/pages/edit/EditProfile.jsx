import { useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import useFetch from "../../hooks/useFetch";
import "./editProfile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";

const EditProfile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const [info, setInfo] = useState({});
  const [file, setFile] = useState("");
  const { data, loading, error, reFetch } = useFetch(`/users/${userId}`);
  console.log(data);

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
      console.log(info);
      alert("Thông tin được cập nhật thành công!");
      // navigate("/users");
      window.location.reload();
    } catch (err) {
      alert("Thông tin chưa được cập nhật!");
      console.log(err);
    }
  };

  return (
    <div className="div-tong1">
      <Navbar />
      {/* <Header/> */}
      <div className="orders">
        <div className="container">
          <div className="title">
            <h1 className="title-name">Thông Tin Cá Nhân</h1>
          </div>
          <form className="edit-form">
            {/* <div className="div-tong"> */}
            <div className="title-input">
              <h2 className="lH21">Tài khoản </h2>
              <h2 className="lH21">Email </h2>
              <h2 className="lH21">Quốc gia </h2>
              <h2 className="lH21">Thành phố </h2>
              <h2 className="lH21">Điện thoại </h2>
            </div>
            <div className="Content-input">
              <input
                onChange={handleChange}
                type="text"
                placeholder={data.username}
                id="username"
                name="username"
                className="lInput1"
              />
              <input
                onChange={handleChange}
                type="text"
                placeholder={data.email}
                id="email"
                name="email"
                className="lInput1"
              />
              <input
                onChange={handleChange}
                type="text"
                placeholder={data.country}
                id="country"
                name="country"
                className="lInput1"
              />
              <input
                onChange={handleChange}
                type="text"
                placeholder={data.city}
                id="city"
                name="city"
                className="lInput1"
              />
              <input
                onChange={handleChange}
                type="text"
                placeholder={data.phone}
                id="phone"
                name="phone"
                className="lInput1"
              />
              <button onClick={handleClick} className="lButton1">
                Cập Nhật Thông Tin
              </button>
            </div>

            <div className="avatar-input">
              <label className="label-input">Ảnh đại diện hiện tại</label>
              <img
                class="img-update"
                onChange={handleChange}
                src={data.img}
                id="img"
                style={{ marginBottom: "20px" }}
              />
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
              <label className="label-input">Ảnh đại diện được tải lên</label>
              <img
                className="img-update"
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
              <label className="label-input" htmlFor="file">
                Image: <FontAwesomeIcon className="icon" icon={faFileUpload} />
              </label>
            </div>
          </form>
        </div>
      </div>
      {/* <MailList /> */}
      {/* <Footer/> */}
      {/* <div className="fText"><Footer/></div> */}
    </div>
  );
};

export default EditProfile;
