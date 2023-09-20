import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContex";
import useFetch from "../../hooks/useFetch";
import "./reserve.css";
import axios, { all } from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
const { format, parseISO } = require('date-fns');

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedRoomNumber, setSelectedRoomNumber] = useState(null);
  const [priceRoom, setPriceRoom] = useState(0);
  const [pictureRoom, setPictureRoom] = useState("");
  const [nameRoom, setNameRoom] = useState("");
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  console.log(data);
  const [info, setInfo] = useState({});
  console.log(info)
  const [rooms, setRooms] = useState([]);
  const { dates, options } = useContext(SearchContext); 
  console.log(dates);
  const [showPaypalButton, setShowPaypalButton] = useState(false);
  const idHotel = useParams();
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // useEffect(() => {
  //   const script = document.createElement('script');
  //   // script.type = 'text/javascript'
  //   script.src = '/paypal-sdk.js'; // Đường dẫn tới tệp tin paypal-sdk.js  
  //   script.async = true;
  //   document.body.appendChild(script); 

  //   return () => {
  //     // Xóa script khi component Reserve bị hủy     
  //     document.body.removeChild(script);
  //   };
  // }, []);
  

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const dayDifference = (date1, date2)=>{
    const timeDiff = Math.abs(Date.parse(date2) - Date.parse(date1));
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  };

  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);
  console.log(days);

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
  console.log(alldates);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };
  const daysOfWeek = [
    "CN",
    "T2",
    "T3",
    "T4",
    "T5",
    "T6",
    "T7"
  ];
  
  const monthsOfYear = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12"
  ];
  
  // Hàm chuyển đổi ngày tháng năm sang chuỗi định dạng Tiếng Việt
  const formatDateToVietnamese = (isoDate) => {
    const date = new Date(isoDate);
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = monthsOfYear[date.getMonth()];
    const year = date.getFullYear();
  
    return `${dayOfWeek}, ${day} ${month}, ${year}`;
  };


  const jsonData = JSON.parse(localStorage.getItem('dates'));
  const startDate = jsonData[0].startDate;
  const endDate = jsonData[0].endDate;

  const formattedStartDate = formatDateToVietnamese(startDate);
  const formattedEndDate = formatDateToVietnamese(endDate);
  
  const jsonOptions = JSON.parse(localStorage.getItem('options'));
  const Quantity = `${jsonOptions.Người_Lớn} người lớn - ${days} đêm, ${jsonOptions.Phòng} phòng`
  
  const Dola  = (priceRoom * days * options.Phòng) / 23500;
  console.log(Dola.toFixed(2));

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    console.log({value});
    setShowPaypalButton(true);
    setSelectedRoomNumber(e.target.dataset.roomNumber);
    setPriceRoom(e.target.dataset.roomPrice);
    setPictureRoom(e.target.dataset.roomPhoto);
    setNameRoom(e.target.dataset.roomName);
    // setPriceBasic(e.target.dataset.)
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  // console.log(selectedRoomNumber);
  console.log(priceRoom);
  console.log(pictureRoom);
  // console.log(nameRoom);
  const navigate = useNavigate();

  const handleClick = async (e) => {
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
          priceBasic: priceRoom,
          roomId: roomId,
          userId: user._id,
          userName: user.username,
          photoRoom: pictureRoom,
          titleRoom: nameRoom,
          quantity: Quantity,
          checkIn: formattedStartDate,
          checkOut: formattedEndDate,
        };
        // console.log(priceRoom);
        // setOpen(false);
        await axios.post(`/orders/${hotelId}`, newOrder);
        console.log(newOrder);
        e.preventDefault();
        // alert("Đặt phòng thành công!");
        // navigate("/");
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
                  {(item.price*1.08).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </div>
              </div>
              <div className="rSelectRooms">
                {item.roomNumbers.map((roomNumber) => (
                  
                  <div className="room" key={roomNumber._id}>
                    <label>{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumber._id}
                      data-room-number={roomNumber.number}
                      data-room-price={item.price*1.08}
                      data-room-photo={item.photo}
                      data-room-name={item.title}
                      // data-room-basicprice={item.}
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNumber)}
                      />
                    {/* <label>Xác nhận</label> */}
                  </div>
                ))}
              </div>
            </div>
          ))}
          {showPaypalButton && (

            <PayPalButton 
            onClick={handleClick}
            // amount="0.01" 
            amount={Dola.toFixed(2)}  
            
            // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
            onSuccess={(details, data) => {
              alert("Transaction completed by " + details.payer.name.given_name);
              
              // OPTIONAL: Call your server to save the transaction
              // return fetch(`/orders/${hotelId}`, {
                //   method: "post",
                //   body: JSON.stringify({
                  //     orderID: data.orderID,
                  //   })
                  // });
                }}
              />
          )}
        </form>
      </div>
    </div>
  );
};

export default Reserve;
