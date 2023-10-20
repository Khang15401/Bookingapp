import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import useFetch1 from "../../hooks/useFetch1";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const NewRoom = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);
  const [selectedValue, setSelectedValue] = useState('default');
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
      await axios.post(`/rooms/${hotelId}`, { ...info, roomNumbers });
      // console.log(info, roomNumbers);
      navigate("/rooms");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(info);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Thêm Phòng Mới</h1>
        </div>
        <div className="bottom">
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
              {/* <div className="formInput">
                <label>Chọn khách sạn</label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                      ))}
                </select>
              </div> */}
              {staffRole === "admin" ? (
                <div className="formInput">
                  <label>Chọn khách sạn</label>
                  <select
                    id="hotelId"
                    value={selectedValue}
                    onChange={(e) => setHotelId(e.target.value)}
                  >
                    <option value="default" disabled hidden>Thêm vào khách sạn</option>
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
                  >
                    <option value="default" disabled hidden>Thêm vào khách sạn</option>
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
