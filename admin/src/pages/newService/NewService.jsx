// import "./newService.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import { serviceInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./newService.scss";

const NewService = () => {
  const navigate = useNavigate()

  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  console.log(info);
  // const [rooms, setRooms] = useState([]);

  // const {data, loading, error} = useFetch("/rooms"); 

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // const handleSelect = e =>{
  //   const value = Array.from(e.target.selectedOptions, (option) => option.value);
  //   setRooms(value)
  // };
 
  console.log(files)

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newservice = {
        ...info,
      };

      await axios.post("/services", newservice);
      console.log(newservice);
      alert('Thêm dịch vụ thành công!')
      navigate("/services");
    } catch (err) {console.log(err)}
  };

  // return (
  //   <div className="new">
  //     <Sidebar />
  //     <div className="newContainer">
  //       <Navbar />
  //       <div className="top">
  //         <h1>Thêm Khách Sạn Mới</h1>
  //       </div>
  //       <div className="bottom">
  //         {/* <div className="left">
  //           <img
  //             src={
  //               files
  //                 ? URL.createObjectURL(files[0])
  //                 : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
  //             }
  //             alt=""
  //           />
  //         </div> */}
  //         <div className="right">
  //           <form>
  //             {/* <div className="formInput">
  //               <label htmlFor="file">
  //                 Image: <DriveFolderUploadOutlinedIcon className="icon" />
  //               </label>
  //               <input
  //                 type="file"
  //                 id="file"
  //                 multiple
  //                 onChange={(e) => setFiles(e.target.files)}
  //                 style={{ display: "none" }}
  //               />
  //             </div> */}

  //             {serviceInputs.map((input) => (
  //               <div className="formInput" key={input.id}>
  //                 <label>{input.label}</label>
  //                 <input 
  //                   id={input.id} 
  //                   onChange={handleChange} 
  //                   type={input.type} 
  //                   placeholder={input.placeholder} />
  //               </div>
  //             ))}
  //               {/* <div className="formInput">
  //                 <label>Đánh Giá</label>
  //                 <input id="rating" onChange={handleChange} placeholder="Từ 1 - 5 "> 
  //                 </input>
  //               </div> */}
  //               {/* <div className="formInput">
  //                 <label>Nổi Bật</label>
  //                 <select id="special" onChange={handleChange}>
  //                   <option value={false}>No</option>
  //                   <option value={true}>Yes</option>
  //                 </select>
  //               </div> */}
  //               {/* <div className="selectRooms">
  //                 <label>Loại Phòng</label>
  //                 <select id="rooms" multiple onChange={handleSelect}>
  //                   {loading ? "loading" : data && data.map(room=>(
  //                     <option key={room._id} value={room._id}>{room.title}</option>
  //                   ))}
  //                 </select>
  //               </div> */}
  //               <button onClick={handleClick}>Gửi</button>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );



  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1 className="h1-conf">Thêm dịch vụ mới</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {serviceInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <button className="no-btn" disabled></button>
              <button className="no-btn" disabled></button>
              <button className="no-btn" disabled></button>

              <button className="formInput1" onClick={handleClick}>Thêm</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewService;
