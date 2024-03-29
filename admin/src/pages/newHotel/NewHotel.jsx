import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../../components/Alert/Alert";
import toast from "react-hot-toast"

const NewHotel = () => {
  const navigate = useNavigate()

  const [files, setFiles] = useState([]);
  console.log(files)
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);

  const {data, loading, error} = useFetch("/rooms"); 

  // const getInfoUser = JSON.parse(localStorage.getItem("user"));
  // const userId = getInfoUser._id;

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = e =>{
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setRooms(value)
  };
 
  console.log(files)

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/Kiawdev/image/upload",
            data
            );
            
            // navigate("/login");
            const { url } = uploadRes.data;
          return url;
        })
      );
      
      const getInfoUser = JSON.parse(localStorage.getItem("user"));
      const userId = getInfoUser._id;

      const newhotel = {
        ...info,
        rooms,
        photos: list,
        hotelOwner: userId,
      };
      const response = await axios.post("/hotels", newhotel);
      const hotelId = response.data._id;
      getInfoUser.hotelId = hotelId;
      localStorage.setItem("user", JSON.stringify(getInfoUser))
      console.log(hotelId);

      const updateUser = {
        hotelId: hotelId,
      };

      await axios.patch("/users/" + userId, updateUser);

      toast.success('Thêm thông tin khách sạn thành công!')
      
      // navigate("/hotels");
    } catch (err) {
      console.log(err)}
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <Alert/>
        <div className="top">
          <h1>Thêm khách sạn mới</h1>
        </div>
        <div className="bottom">
          <div className="left2">
          <div>Ảnh vừa được tải lên</div>
          {Array.from(files).map((file, index) => (
            <img
              key={index} 
              src={URL.createObjectURL(file)}
              alt={`Image ${index}`}
              className="image-preview"
            />
          // </div>x
        ))}

{/* {files && files.length > 0 ? (
  files.map((file, index) => (
    <img
      key={index}
      src={URL.createObjectURL(file)}
      alt={`Image ${index + 1}`}
    />
  ))
) : (
  <img
    src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
    alt=""
  />
)} */}
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input 
                    id={input.id} 
                    onChange={handleChange} 
                    type={input.type} 
                    placeholder={input.placeholder} />
                </div>
              ))}
                {/* <div className="formInput">
                  <label>Đánh giá</label>
                  <input id="rating" onChange={handleChange} placeholder="Từ 1 - 5 "> 
                  </input>
                </div>
                <div className="formInput">
                  <label>Nổi bật</label>
                  <select id="special" onChange={handleChange}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div> */}
                {/* <div className="selectRooms">
                  <label>Loại phòng</label>
                  <select id="rooms" multiple onChange={handleSelect}>
                    {loading ? "loading" : data && data.map(room=>(
                      <option key={room._id} value={room._id}>{room.title}</option>
                    ))}
                  </select>
                </div> */}
                <button onClick={handleClick}>Thêm</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
