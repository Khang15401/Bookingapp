import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContex";
import useFetch from "../../hooks/useFetch";
import "./reserve.css";
import axios, { all } from "axios";
import { Link, useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedRoomNumber, setSelectedRoomNumber] = useState(null);
  const [priceRoom, setPriceRoom] = useState(0);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const { dates, options } = useContext(SearchContext);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const dayDifference = (date1, date2)=>{
    const timeDiff = Math.abs(Date.parse(date2) - Date.parse(date1));
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  };
  
  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);
  // console.log(days);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };
  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRoomNumber(e.target.dataset.roomNumber);
    setPriceRoom(e.target.dataset.roomPrice);
    // console.log(e.target.dataset.roomPrice);
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  // console.log(selectedRoomNumber);
  // console.log(priceRoom);
  // console.log(days * priceRoom*options.Phòng);
  // const priceWithVAT = (priceRoom * days * options * 1.08).toFixed(0);
  // console.log(priceWithVAT);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          localStorage.setItem("roomId", roomId);
          return res.data;
        })
      );

      const user = JSON.parse(localStorage.getItem("user"));
      const roomId = localStorage.getItem("roomId");
      // const priceWithVAT = (priceRoom * days * options * 1.08).toFixed(0);
      // console.log(priceWithVAT);
      const newOrder = {
        ...info,
        rooms: selectedRoomNumber,
        priceRoom: priceRoom * days * options.Phòng,
        roomId: roomId,
        userId: user._id,
        userName: user.username,
      };
      setOpen(false);
      console.log(priceRoom);
      await axios.post(`/orders/${hotelId}`, newOrder);
      alert("Đặt phòng thành công!");
      console.log(newOrder);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Lựa chọn phòng của bạn:</span>

        <form>
          {data.map((item) => (
            <div className="rItem" key={item._id}>
              <div className="rItemInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMax">
                  Số người tối đa: <b>{item.maxPeople}</b>
                </div>
                <div className="rPrice" id="price">
                  {/* {item.price} */}
                  {item.price*1.08}
                </div>
              </div>
              <div className="rSelectRooms">
                {/* {item.roomNumbers.map((roomNumber) => (
                  <div className="room" onChange={handleChange}>
                    <label>Ph.{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumber._id}
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNumber)}
                      id="idRoom"
                    />
                    <label>Xác nhận</label>
                    <input type="checkbox" value={roomNumber.number} id="rooms" 
                    disabled={!isAvailable(roomNumber)}
                    onChange={handleChange}/>
                  </div>
                ))} */}
                {item.roomNumbers.map((roomNumber) => (
                  <div className="room" key={roomNumber._id}>
                    <label>{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumber._id}
                      data-room-number={roomNumber.number}
                      data-room-price={item.price*1.08}
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNumber)}
                    />
                    {/* <label>Xác nhận</label> */}
                  </div>
                ))}
              </div>
            </div>
          ))}
          {/* <Link to={`/pay/${hotelId}`}> */}
          <button onClick={handleClick} className="rButton">
            Đặt trước ngay!
          </button>
          {/* </Link> */}
        </form>
      </div>
    </div>
  );
};

export default Reserve;
