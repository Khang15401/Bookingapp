import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContex";
import useFetch from "../../hooks/useFetch";
import "./reserve.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const { dates } = useContext(SearchContext);
  
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

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
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      const user = JSON.parse(localStorage.getItem("user"));
      const newOrder = {
        ...info,
        userId: user._id,
        userName: user.username,
      };
      // console.log(newOrder);
      setOpen(false);
      await axios.post(`/orders/${hotelId}`,newOrder);
      alert("?????t ph??ng th??nh c??ng!");
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
        <span>L???a ch???n ph??ng c???a b???n:</span>

        <form>
          {data.map((item) => (
            <div className="rItem">
              <div className="rItemInfo">
                <div className="rTitle"  id='title'>{item.title}</div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMax"  >
                  S??? ng?????i t???i ??a: <b>{item.maxPeople}</b>
                </div>
                <div className="rPrice"  id="price">{item.price}</div>
              </div>
              <div className="rSelectRooms">
                {item.roomNumbers.map((roomNumber) => (
                  <div className="room" onChange={handleChange}>
                    <label>Ph.{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumber._id}
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNumber)}
                      id="idRoom"
                    />
                    <label>X??c nh???n</label>
                    <input type="checkbox" value={roomNumber.number} id="rooms" 
                    disabled={!isAvailable(roomNumber)}
                    onChange={handleChange}/>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button onClick={handleClick} 
          className="rButton"
          >
            ?????t tr?????c ngay!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reserve;
