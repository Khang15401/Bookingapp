import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import useFetch1 from "../../hooks/useFetch1";
import axios from "axios";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Alert from "../../components/Alert/Alert";

const NewRoom = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [file, setFile] = useState("");
  console.log(file);
  const [rooms, setRooms] = useState([]);
  const [selectedValue, setSelectedValue] = useState("default");
  const managerHotel = JSON.parse(localStorage.getItem("user"));
  const managerHotelId = managerHotel.hotelId;
  const staffRole = managerHotel.role;

  const { data, loading, error } = useFetch("/hotels");
  const { data1, loading1, error1 } = useFetch1(
    `/hotels/filter/${managerHotelId}`
  );
  console.log(data1);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setSelectedValue(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    console.log(roomNumbers);
    try {
      const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");

        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/kiawdev/image/upload",
          data
        );
        const { url } = uploadRes.data;
        const photo = url

      await axios.post(`/rooms/${hotelId}`, { ...info, roomNumbers,photo: photo });
      // console.log(info, roomNumbers);
      toast.success("Tạo phòng khách sạn thành công");
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch (err) {
      toast.error("Tạo phòng khách sạn thất bại");
      console.log(err);
    }
  };

  console.log(info);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <Alert />
        <div className="top">
          <h1>Thêm Phòng Mới</h1>
        </div>
        <div className="bottom">
          <div className="left2">
            <div className="formInput3">
              <label>Ảnh phòng</label>
              {staffRole === "staff" && (
                  <>
                    <img
                      src={
                        file
                          ? URL.createObjectURL(file)
                          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                      alt=""
                    />
                  </>
                )}
              {staffRole === "staff" && (
                <>
                  <label htmlFor="file">
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </div>
          </div>
          <div className="right">
            <form>
              {roomInputs.map((input) => (
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
              <div className="formInput">
                <label>Mã số mỗi phòng</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="nhập vào mã số giữa các phòng."
                />
              </div>

              {staffRole === "admin" ? (
                <div className="formInput">
                  <label>Chọn khách sạn</label>
                  <select
                    id="hotelId"
                    value={selectedValue}
                    onChange={(e) => setHotelId(e.target.value)}
                  >
                    <option value="default" disabled hidden>
                      Thêm vào khách sạn
                    </option>
                    {loading
                      ? "loading"
                      : data &&
                        data.map((hotel) => (
                          <option key={hotel._id} value={hotel._id}>
                            {hotel.name}
                          </option>
                        ))}
                  </select>
                </div>
              ) : staffRole === "staff" ? (
                <div className="formInput">
                  <label>Chọn khách sạn</label>
                  <select
                    id="hotelId"
                    value={selectedValue}
                    onChange={(e) => setHotelId(e.target.value)}
                    // onChange={handleChange}
                  >
                    <option value="default" disabled hidden>
                      Thêm vào khách sạn
                    </option>
                    {loading ? (
                      "loading"
                    ) : (
                      <option key={data1._id} value={data1._id}>
                        {data1.name}
                      </option>
                    )}
                  </select>
                </div>
              ) : null}

              <button className="formInput1" onClick={handleClick}>
                Thêm
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
