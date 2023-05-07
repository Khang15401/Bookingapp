
import { useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import useFetch from "../../hooks/useFetch";
import "./editProfile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const [info, setInfo] = useState({});
  const { data, loading, error, reFetch } = useFetch(`/users/${userId}`);
  console.log(data);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const updateUser = {
      ...info,
      };
      await axios.patch("/users/" + userId, updateUser);
      console.log(info);
      alert("Thông tin được cập nhật thành công!");
      // navigate("/users");
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
            <h1>Thông Tin Cá Nhân</h1>
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
                    <input onChange={handleChange} type="text"  placeholder={data.username} id="username"
                    name="username" className="lInput1" />
                    <input onChange={handleChange} type="text"  placeholder={data.email} id="email"
                    name="email" className="lInput1" />
                    <input onChange={handleChange} type="text"  placeholder={data.country} id="country"
                    name="country"
                    className="lInput1" />
                    <input onChange={handleChange} type="text"  placeholder={data.city} id="city"
                    name="city" className="lInput1" />
                    <input onChange={handleChange} type="text" placeholder={data.phone} id="phone"
                    name="phone" className="lInput1" />
                    <button onClick={handleClick} className="lButton1" >Cập Nhật Thông Tin</button>
                  </div>
                {/* </div> */}
          </form> 
        </div>
      </div>
      {/* <MailList /> */}
      {/* <Footer/> */}
      {/* <div className="fText"><Footer/></div> */}
    </div>
  )
}

export default EditProfile
