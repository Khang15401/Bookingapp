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
import Alert from "../../components/Alert/Alert";
import toast from "react-hot-toast"

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
      const getInfoUser = JSON.parse(localStorage.getItem("user"));
      const hotelId = getInfoUser.hotelId;

      const newservice = {
        ...info,
        hotelId: hotelId,
      };

      await axios.post("/services", newservice);
      console.log(newservice);
      toast.success('Thêm dịch vụ thành công!')

      setTimeout(() => {
        navigate("/services");
      }, 800);
      
    } catch (err) {console.log(err)}
  };


  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <Alert/>
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
              {/* <button className="no-btn" disabled></button>
              <button className="no-btn" disabled></button>
              <button className="no-btn" disabled></button> */}

              <button className="formInput1" onClick={handleClick}>Thêm</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewService;
