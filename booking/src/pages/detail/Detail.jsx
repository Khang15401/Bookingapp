import React, { useContext, useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "./detail.css";
import {
  faSearch,
  faHotel,
  faCalendarCheck,
  faList,
  faLocationDot,
  faCopy,
  faCircleXmark,
  faCalendarDays,
  faBanSmoking,
  faRulerCombined,
  faSnowflake,
  faShower,
  faTv,
  faGlassCheers,
  faChild,
  faGears,
  faStar,
  faCircleCheck,
  faFaceAngry,
  faFaceFrown,
  faFaceMeh,
  faFaceGrinWide,
  faFaceSmileBeam,
  faFaceLaughWink,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../components/header/Header";
import axios from "axios";
import { SearchContext, SearchContext1 } from "../../context/SearchContex";
import useFetch1 from "../../hooks/useFetch1";
import Reserve from "../../components/reserve/Reserve";
import useFetch2 from "../../hooks/useFetch2";
const Detail = () => {
  const { orderId } = useParams();
  // console.log(orderId);
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const { data, loading, error, reFetch } = useFetch(`/orders/${orderId}`);
  const hotelID = data.hotelId;
  const { data1, loading1, error1, reFetch1 } = useFetch1(
    `/hotels/room/${hotelID}`
  );
  const { data2, loading2, error2, reFetch2 } = useFetch2(
    `/orders/service/${orderId}`
  );
  console.log(data);

  const imgRoom = data.photoRoom;

  const [showConfirmation, setShowConfirmation] = useState(false);
  // const [changeTime, setChangeTime] = useState(false);
  const [orderID, setOrderID] = useState(null);
  const [id, setID] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  // const { dates, options } = useContext(SearchContext);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedRoomNumber, setSelectedRoomNumber] = useState(null);
  const [priceRoom, setPriceRoom] = useState(0);
  const [pictureRoom, setPictureRoom] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmTime, setConfirmTime] = useState(false);
  const [openValueRoom, setOpenValueRoom] = useState(false);
  const [openPageReview, setOpenPageReview] = useState(false);
  const [isRadioSelected, setIsRadioSelected] = useState(false);
  const [isRadioSelected2, setIsRadioSelected2] = useState(false);
  const [isCheckBoxSelected, setIsCheckBoxSelected] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [contentPositive, setContentPositive] = useState("");
  const [contentNegative, setContentNegative] = useState("");

  const handlePositiveChange = (e) => {
    setContentPositive(e.target.value);
  };

  // Hàm xử lý khi nội dung trong textarea Negative thay đổi
  const handleNegativeChange = (e) => {
    setContentNegative(e.target.value);
  };

  console.log(contentPositive);
  console.log(contentNegative);


  const handleRadioSelected = (e) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
  };

  console.log(selectedValue);
  const [checkboxes, setCheckboxes] = useState({
    soloTravel: false,
    withFriends: false,
    withFamily: false,
    withColleagues: false,
  });
  const handleCheckboxChange = (e) => {
    setIsCheckBoxSelected(true);
    const { name, checked } = e.target;
    if (name === "soloTravel") {
      // Nếu chọn "Một mình", tắt "Một mình" và cập nhật trạng thái của checkbox tương ứng
      setCheckboxes({
        soloTravel: checked,
        [name]: checked,
      });
    } else {
      // Cập nhật trạng thái của checkbox tương ứng và tắt "Một mình"
      setCheckboxes({
        ...checkboxes,
        [name]: checked,
        soloTravel: false,
      });
    }
  };
  // const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [changeTime, setChangeTime] = useState(false);

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  // localStorage.setItem(dates)
  // localStorage.setItem("dates", dates);
  const handleChangeTime = async () => {
    await localStorage.setItem("dates", JSON.stringify(dates));
    console.log(dates);
  };

  const handleChangeValueRoom = async (e) => {
    e.preventDefault();
    await localStorage.setItem("dates", JSON.stringify(dates));
    console.log(dates);
    await setOpenValueRoom(true);
    setOpenDate(false);
  };
  // console.log(JSON.stringify(dates))
  // localStorage.setItem("dates", JSON.stringify(dates));
  const hideChangeTime = async (e) => {
    e.preventDefault();
    await setChangeTime(false);
    setConfirmTime(false);
    setOpen(false);
    setOpenValueRoom(false);
  };

  const showConfirmDialog = (id, orderId) => {
    setShowConfirmation(true);
    setOrderID(orderId);
    setID(id);
  };

  const hideConfirmDialog = () => {
    setShowConfirmation(false);
    setOrderID(null);
    setID(null);
  };

  const handleClick = (id, orderID) => {
    if (data.status === "Hoàn thành" || data.status === "Đã hủy") {
      return;
    }
    // Hiển thị hộp thoại xác nhận trước khi hủy đặt phòng
    showConfirmDialog(id, orderID);
  };

  const confirmCancellation = async () => {
    try {
      await axios.patch(`/rooms/reservation/${id}`);
      await axios.patch(`/${path}/cancle/${orderId}`);
      window.location.reload();
      // Tắt hộp thoại xác nhận
      hideConfirmDialog();
    } catch (error) {
      console.error(error);
      alert("Hủy đơn đặt phòng thất bại!");
    }
  };

  function formatCurrency(amount) {
    if (typeof amount === "number" && !isNaN(amount)) {
      return amount
        .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
        .replace("₫", "VND");
    } else {
      return "0 VND";
    }
  }

  const handleChageNumberRoom = () => {
    setOpen(true);
    setOpenModal(true);
  };
  const handleReview = (e) => {
    e.preventDefault();
    setOpenPageReview(true);
  };

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const dayDifference = (date1, date2) => {
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

  const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

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
    "Tháng 12",
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

  const jsonData = JSON.parse(localStorage.getItem("dates"));
  const startDate = jsonData[0].startDate;
  const endDate = jsonData[0].endDate;

  const formattedStartDate = formatDateToVietnamese(startDate);
  const formattedEndDate = formatDateToVietnamese(endDate);

  const jsonOptions = JSON.parse(localStorage.getItem("options"));
  const Quantity = `${jsonOptions.Người_Lớn} người lớn - ${days} đêm, ${jsonOptions.Phòng} phòng`;

  // const Dola  = (priceRoom * days * options.Phòng) / 23500;
  // console.log(Dola.toFixed(2));

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    console.log(value);
    setConfirmTime(true);
    setSelectedRoomNumber(e.target.dataset.roomNumber);
    setPriceRoom(e.target.dataset.roomPrice);
    setPictureRoom(e.target.dataset.roomPhoto);
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  // console.log(selectedRoomNumber);
  // console.log(priceRoom);
  // console.log(pictureRoom);

  const IdRoom = data.roomId;

  const handleClick1 = async (e) => {
    e.preventDefault();
    try {
      // localStorage.setItem("dates", JSON.stringify(dates));
      await axios.patch(`/rooms/reservation/${IdRoom}`);
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          localStorage.setItem("roomId", roomId);

          return res.data;
        })
      );

      const roomId = localStorage.getItem("roomId");

      const updateOrder = {
        rooms: selectedRoomNumber,
        roomId: roomId,
        price: priceRoom * days * jsonOptions.Phòng,
        priceBasic: priceRoom,
        photoRoom: pictureRoom,
        quantity: Quantity,
        checkIn: formattedStartDate,
        checkOut: formattedEndDate,
      };
      // console.log(data);
      await axios.patch("/orders/" + orderId, updateOrder);
      console.log(updateOrder);
      setOpenValueRoom(false);
      alert("Hoàn thành chỉnh sửa đơn đặt phòng!");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  // Thay doi ngay gio phong khach san
  const PriceBasic = data.priceBasic;

  // Lay ngay gio hien tai
  const currentDateTime = new Date();
  const options = { year: "numeric", month: "2-digit", day: "2-digit" }; // Sử dụng '2-digit' cho tháng và ngày
  const formattedDateTime = new Intl.DateTimeFormat("en-CA", options).format(
    currentDateTime
  );
  console.log(formattedDateTime);

  // console.log(PriceBasic);
  const handleClick2 = async (e) => {
    e.preventDefault();
    await localStorage.setItem("dates", JSON.stringify(dates));
    try {
      const res = axios.put(`/rooms/availability/${IdRoom}`, {
        dates: alldates,
      });

      const updateOrder = {
        roomId: IdRoom,
        price: PriceBasic * days * jsonOptions.Phòng,
        quantity: Quantity,
        checkIn: formattedStartDate,
        checkOut: formattedEndDate,
      };
      // console.log(data);
      await axios.patch("/orders/" + orderId, updateOrder);
      console.log(updateOrder);
      setOpenValueRoom(false);
      alert("Hoàn thành chỉnh ngày ở phòng!");
      window.location.reload();
      return res.data;
    } catch (error) {
      alert("Lỗi thay đổi ngày ở!");
      console.log(error);
    }
  };

  const imgUser = localStorage.getItem("user");
  const user = JSON.parse(imgUser);
  console.log(user.img);

  const handleClick3 = async (e) => {
    e.preventDefault();
    try {
      const newReview = {
        userId: data.userId,
        userName: data.userName,
        imgUser: user.img,
        hotelId: data.hotelId,
        nameHotel: data.nameHotel,
        rating: selectedValue,
        roomId: data.roomId,
        titleRoom: data.titleRoom,
        timeReview: formattedDateTime,
        positive: contentPositive,
        negative: contentNegative,
      };
      // console.log(data);
      await axios.post("/reviews", newReview);
      alert("Hoàn thành đánh giá phòng ở!");
      console.log(newReview);
      setOpenPageReview(false);

      const Reviewed = {
        reviewed: true,
      }
      await axios.patch(`/orders/${orderId}`, Reviewed);
      console.log(Reviewed);
    } catch (error) {
      alert("Không thể gửi đánh giá!");
      console.log(error);
    }
  };

  const handleRadioChange = () => {
    setIsRadioSelected(true);
  };
  const handleRadioChange2 = () => {
    setIsRadioSelected2(true);
  };
  return (
    <div>
      <Navbar />
      <div className="container-detailOrder detail-sumary">
        <div className="wrap-detail">
          <div className="reservation-status-container">
            <div className="reservation-status-title">
              <div className="reservation-status-title-status">
                {data.status}
              </div>
              {/* <header className="detail-header">Đơn đặt đã hoàn tất</header> */}
              <header className="detail-header">
                {data.status === "Chưa nhận phòng"
                  ? "Đơn đặt đã được xác nhận"
                  : data.status === "Hoàn thành"
                  ? "Đơn đặt đã hoàn tất"
                  : "Đơn đặt đã được hủy"}
              </header>
            </div>
            {(data.status === "Hoàn thành" || data.status === "Đã hủy") && (
              <a
                className="link-booking-again"
                href={`/hotels/${data.hotelId}?fromDetail=true`}
              >
                <span className="icon-booking">
                  <FontAwesomeIcon className="icon-size-small" icon={faHotel} />
                </span>
                <span className="link-booking">Đặt lại</span>
              </a>
            )}
            {(data.status === "Hoàn thành" || data.status === "Đã hủy") && (
              <a className="link-booking-again spacing" href="/">
                <span className="icon-booking">
                  <FontAwesomeIcon
                    className="icon-size-small"
                    icon={faSearch}
                  />
                </span>
                <span className="link-booking">Tìm kiếm nơi ở khác</span>
              </a>
            )}
          </div>
          <div className="container-info-hotel">
            <div className="wrap-info-hotel">
              <div className="info2 info-hotel">
                <span className="wrap-nameHotel">
                  <a href={`/hotels/${data.hotelId}`} className="nameHotel">
                    {data.nameHotel}
                  </a>
                </span>
              </div>
              <picture className="picture-room">
                <img
                  className="photo setup-photo"
                  role="presentation"
                  loading="lazy"
                  src={data.photoRoom}
                  alt=""
                />
              </picture>
              <div className="container-time-checkin layout">
                <div className="wrap-time-checkin layout">
                  <div className="wrap-icon">
                    <span>
                      <FontAwesomeIcon
                        className="icon-size"
                        icon={faCalendarCheck}
                      />
                    </span>
                  </div>
                  <div className="layout position-detail">
                    <div className="wrap-checkin-checkout-info">
                      <div className="">
                        <div className="checkin-checkout-info">
                          <time className="position-tg position-tg2 setup-time type">
                            <h3 className="checkin">Nhận Phòng</h3>
                            <div className="setup-checkin">{data.checkIn}</div>
                            <div className="time-checkin">14:00 - 18:00</div>
                          </time>
                          <div>
                            <hr className="size-hr color-hr" />
                          </div>
                          <time className="position-tg position-tg2 setup-time type">
                            <h3 className="checkin">Trả Phòng</h3>
                            <div className="setup-checkin">{data.checkOut}</div>
                            <div className="time-checkin">12:00 - 13:00</div>
                          </time>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-detail-room layout">
                <div className="layout wrap-detail-room">
                  <div className="wrap-icon">
                    <span>
                      <FontAwesomeIcon className="icon-size" icon={faList} />
                    </span>
                  </div>
                  <div className="layout room-info">
                    <div className="layout format">Chi tiết đặt phòng</div>
                    <div className="layout font-quantity">{data.quantity}</div>
                  </div>
                </div>
              </div>
              <div className="container-detail-room layout">
                <div className="layout wrap-detail-room">
                  <div className="wrap-icon">
                    <span>
                      <FontAwesomeIcon
                        className="icon-size"
                        icon={faLocationDot}
                      />
                    </span>
                  </div>
                  <div className="layout room-info">
                    <div className="layout format">Địa chỉ</div>
                    <div className="layout font-quantity">{data.address}</div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="sticky-class"> */}
            <div id="container-detailroom" className="container-details-room">
              <header className="header-title-room" id="details-room">
                Chi tiết phòng
              </header>
              <div className="section section-detail">
                <div className="room">
                  <h3>{data.titleRoom}</h3>
                  <p className="room-introduction conf-font">{data.title}</p>
                  <table className="conf-table">
                    <tbody>
                      <tr>
                        <th scope="row" className="conf-table-content">
                          <h5 className="conf-font">Tên khách</h5>
                        </th>
                        <td>
                          <p> </p>
                          <div>
                            <div className="space-block">
                              <span>
                                <span className="conf-font">
                                  {data.userName}
                                </span>
                              </span>
                              <span> </span>
                            </div>
                          </div>
                          <p> </p>
                          <p></p>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" className="conf-table-content">
                          <h5 className="conf-font">Tùy chọn ưa thích</h5>
                        </th>
                        <td>
                          <div className="ctc-options">
                            <div className="ctc-options-item">
                              <span>
                                <FontAwesomeIcon
                                  className="icon-smoking"
                                  icon={faBanSmoking}
                                />
                                Phòng không hút thuốc
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th className="conf-table-content1 conf-font">
                          Phòng đã đặt bao gồm
                        </th>
                        <td>
                          <div className="device-room-area conf-font">
                            <span>
                              <FontAwesomeIcon
                                className="icon-details"
                                icon={faRulerCombined}
                              />
                              17 m²
                            </span>
                          </div>
                          <div className="device-room-area conf-font">
                            <span>
                              <FontAwesomeIcon
                                className="icon-details"
                                icon={faSnowflake}
                              />
                              Điều hòa không khí
                            </span>
                          </div>
                          <div className="device-room-area conf-font">
                            <span>
                              <FontAwesomeIcon
                                className="icon-details"
                                icon={faShower}
                              />
                              Phòng tắm trong phòng
                            </span>
                          </div>
                          <div className="device-room-area conf-font">
                            <span>
                              <FontAwesomeIcon
                                className="icon-details"
                                icon={faTv}
                              />
                              TV màn hình phẳng
                            </span>
                          </div>
                          <div className="device-room-area conf-font">
                            <span>
                              <FontAwesomeIcon
                                className="icon-details"
                                icon={faGlassCheers}
                              />
                              Minibar
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th
                          className="conf-table-content conf-font"
                          scope="row"
                        >
                          Chi tiết lựa chọn
                        </th>
                        <td className="conf-font">
                          <p>{data.quantity}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="conf-table">
                    <tbody>
                      <tr>
                        <th scope="row" className="conf-table-content">
                          <h5 className="conf-font">Bữa ăn</h5>
                        </th>
                        <td>
                          <div className="room__meal-rows">
                            <div className="room__meal-row">
                              <div className="room__meal-cell conf-font">
                                Giá của phòng này không bao gồm bữa ăn nào.
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table className=" room-policy-children">
                    <tbody>
                      <tr>
                        <th scope="row" className="conf-table-content position">
                          <h5>
                            <FontAwesomeIcon
                              className="icon-details"
                              icon={faChild}
                            />
                            <span className="conf-font position">
                              Trẻ em và giường
                            </span>
                          </h5>
                        </th>
                        <td>
                          <div className="children-policy-container conf-font">
                            <div
                              style={{ fontWeight: "600" }}
                              className="policy-children conf-font .mr-policy-children"
                            >
                              Chính sách trẻ em
                            </div>
                            <p className="conf-font mr-policy-children">
                              Phù hợp cho tất cả trẻ em
                            </p>
                            <div></div>
                          </div>
                          <div
                            style={{ fontWeight: "600" }}
                            className="policy-children conf-font mr-policy-children"
                          >
                            Chính sách nôi (cũi) và giường phụ
                          </div>
                          <p className="conf-font mr-policy-children">
                            Không cung cấp nôi/cũi và giường phụ.
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="conf-table">
                    <tbody>
                      <tr>
                        <th scope="row" className="conf-table-content">
                          <h5 className="conf-font">Thuế</h5>
                        </th>
                        <td>
                          <div className="room__meal-rows">
                            <div className="room__meal-row">
                              <div className="room__meal-cell conf-font">
                                Giá phòng chưa bao gồm 8% thuế GTGT.
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div id="priceSection"></div>
                <div>
                  <div className="wrap-price-final">
                    <table className="table-price-final">
                      <tbody>
                        <tr>
                          <div className="conf-table-content2" scope="row">
                            {data.quantity}
                          </div>
                          <td className="conf-font">
                            {data.priceService
                              ? formatCurrency(
                                  data.price / 1.08 - data.priceService
                                )
                              : formatCurrency(data.price)}
                          </td>
                        </tr>
                        {data2.map((service, index) => (
                          <tr key={index}>
                            <div className="conf-table-content2" scope="row">
                              - {service.servicename}
                            </div>
                            <td className="conf-font td-service">
                              {formatCurrency(service.serviceprice)}
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <div className="conf-table-content2" scope="row">
                            8 % Thuế GTGT
                          </div>
                          <td className="conf-font">
                            {data.priceService
                              ? formatCurrency(data.price - data.price / 1.08)
                              : formatCurrency(data.price * 1.08 - data.price)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="price-final-container fillter">
                  <div className="wrap-price-final">
                    <table className="table-price-final">
                      <tbody>
                        <tr>
                          <div
                            style={{ fontWeight: 0 }}
                            className="conf-table-content2"
                          >
                            <div className="conf-price-room">Giá</div>
                            <div className="conf-price-room-note ">
                              (dành cho 2 khách)
                            </div>
                          </div>
                          <td className="conf-font2">
                            {/* {formatCurrency(data.price)} */}
                            {data.priceService
                              ? formatCurrency(data.price)
                              : formatCurrency(data.price * 1.08)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="wrap-price-final fillter">
                    <div className="wrap-info-payment">
                      <h4 className="header-info-payment">
                        Giá cuối cùng được hiển thị là số tiền bạn sẽ thanh toán
                        cho chỗ nghỉ.
                      </h4>
                      <div className="conf-font">
                        Booking.com không thu phí khách cho bất kỳ đặt phòng,
                        phí hành chính hay bất kỳ chi phí nào khác.
                        <br />
                        Đơn vị phát hành thẻ của bạn có thể tính phí giao dịch
                        ngoại hối.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="banner-info banner-options">
            <div className="wrap-banner-info wrap-banner-info--disabled">
              <div className="booknumber-code">
                <div className="booknumber-code-item booknumber-font">
                  Mã đặt phòng:
                  <span className="booknumber-font2">{data._id}</span>
                  {/* <span>
                    <FontAwesomeIcon icon={faCopy} />
                  </span> */}
                </div>
                <div className="booknumber-code-item booknumber-font">
                  Mã phòng khách sạn:
                  <span className="booknumber-font2">{data.rooms}</span>
                </div>
              </div>
            </div>
            <div className="slide-bar-service-container">
              <div>
                <div className="wrap-info-service">
                  <div className="size-info-service">
                    <div className="Title-1">
                      Tất cả thông tin có đều chính xác?
                    </div>
                    <div className="Title-2 layout-title">
                      Bạn luôn được xem hoặc thay đổi đặt phòng trực tuyến,
                      không cần phải đăng ký.
                    </div>
                    <div className="button-cancle-room-container">
                      <div className="wrap-button-cancle">
                        {data.status !== "Hoàn thành" &&
                          data.status !== "Đã hủy" && (
                            <button
                              onClick={() => handleClick(data.roomId, data._id)}
                              type="button"
                              className="button-cancle-room"
                            >
                              <span className="icon-cancle">
                                <FontAwesomeIcon icon={faCircleXmark} />
                              </span>
                              <span className="title-cancle-room">
                                Tiến hành hủy đặt phòng
                              </span>
                            </button>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="change-time-book">
                {data.status !== "Hoàn thành" && data.status !== "Đã hủy" && (
                  <button
                    type="button"
                    className="button-cancle-room"
                    onClick={() => setChangeTime(!changeTime)}
                  >
                    <span className="icon-cancle">
                      <FontAwesomeIcon icon={faCalendarDays} />
                    </span>
                    <span className="title-cancle-room">
                      Thay đổi ngày tháng
                    </span>
                  </button>
                )}
                {data.status !== "Hoàn thành" && data.status !== "Đã hủy" && (
                  <button
                    type="button"
                    className="button-cancle-room change-number-room"
                    onClick={handleChageNumberRoom}
                  >
                    <span className="icon-cancle">
                      <FontAwesomeIcon icon={faGears} />
                    </span>
                    <span className="title-cancle-room">Thay đổi phòng</span>
                  </button>
                )}
                {data.status !== "Chưa nhận phòng" &&
                  data.status !== "Đã hủy" && 
                  !data.reviewed && (
                    <button
                      type="button"
                      className="button-cancle-room change-number-room"
                      onClick={handleReview}
                    >
                      <span className="icon-cancle">
                        <FontAwesomeIcon icon={faStar} />
                      </span>
                      <span className="title-cancle-room">Đánh giá chỗ ở</span>
                    </button>
                  )}
                <div className="info-contact-container">
                  <div className="Hr-contact"></div>
                  <div className="title-contact">Liên hệ chỗ nghỉ</div>
                  <div className="tele-contact">Điện thoại +84965816876</div>
                  <div className="wrap-link-chat-with">
                    <a href="#" className="link-chat-with">
                      Nhắn tin
                    </a>
                  </div>
                  <div className="wrap-link-chat-with1">
                    <a href="#" className="link-chat-with">
                      Gửi Email
                    </a>
                  </div>
                  <div className="trick-info">
                    Mẹo: Bạn có thể thay đổi đặt phòng này bất kỳ lúc nào
                  </div>
                </div>
              </div>
            </div>
          </div>

          {changeTime && (
            <div className="listWrapper1">
              <div className="listSearch1">
                {/* <h1 className="lsTitle">Tìm Kiếm</h1> */}
                <div className="lsItem1">
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="rClose"
                    onClick={hideChangeTime}
                  />
                  <label className="conf-font">Chọn ngày thay đổi</label>
                  <span
                    className="conf-font"
                    onClick={() => setOpenDate(!openDate)}
                  >{`${format(dates[0].startDate, "dd/MM/yyyy")} đến ${format(
                    dates[0].endDate,
                    "dd/MM/yyyy"
                  )}`}</span>
                  {openDate && (
                    <DateRange
                      onChange={(item) => setDates([item.selection])}
                      minDate={new Date()}
                      ranges={dates}
                    />
                  )}
                </div>
                <button
                  className="conf-font change-time"
                  // onClick={handleChangeTime}
                  onClick={handleClick2}
                >
                  Thay đổi
                </button>
              </div>
            </div>
          )}
          {/* <Header/>  */}
          {showConfirmation && (
            <div className="confirmation-dialog">
              <div className="confirmation-content">
                <h3 className="conf-font">Xác nhận hủy đặt phòng</h3>
                <p className="conf-font">
                  Bạn có chắc chắn muốn hủy đặt phòng?
                </p>
                <div className="confirmation-buttons">
                  <button className="conf-font" onClick={confirmCancellation}>
                    Xác nhận
                  </button>
                  <button className="conf-font" onClick={hideConfirmDialog}>
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          )}
          <Footer />

          {openPageReview && (
            <div className="container-review">
              <div className="form1" action="">
                <div id="myHeader">
                  <img className="img-room" src={data.photoRoom} alt="" />
                  <div className="img-text">
                    Đánh giá {data.nameHotel}
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      className="rClose1"
                      onClick={() => setOpenPageReview(!openPageReview)}
                    />
                  </div>
                  <span className="img-text1">
                    {data.checkIn} - {data.checkOut}
                  </span>
                </div>
                <div className="container-elemment">
                  <form action="">
                    <ol className="rf_question">
                      <li data-section="1">
                        <h2 className="h2-question">
                          1. Đây là chuyến đi công tác?
                        </h2>
                        <div>
                          <fieldset className="fieldset1">
                            {/* <fieldset> */}
                            <div className="group-radio" role="group">
                              <div
                                className="container-radio"
                                role="radiogroup"
                              >
                                <label className="lable-question1">
                                  <input
                                    type="radio"
                                    name="trip-purpose"
                                    onChange={handleRadioChange}
                                  />
                                  <span className="text-radio1"> Không</span>
                                </label>
                                <label className="lable-question2">
                                  <input
                                    type="radio"
                                    name="trip-purpose"
                                    onChange={handleRadioChange}
                                  />
                                  <span className="text-radio">Đúng</span>
                                </label>
                              </div>
                            </div>
                            {/* </fieldset> */}
                            {isRadioSelected && (
                              <div className="status-tks">
                                <span className="circle-check">
                                  <FontAwesomeIcon
                                    className="icon-circle-check"
                                    icon={faCircleCheck}
                                  />
                                </span>
                                <div>
                                  <p className="conf-font">
                                    Cảm ơn bạn đã trả lời
                                  </p>
                                </div>
                              </div>
                            )}
                          </fieldset>
                          <fieldset className="fieldset1">
                            <legend>
                              <h2 className="h2-question">
                                Bạn đi du lịch với ai?
                              </h2>
                            </legend>
                            <div className="container-label" role="group">
                              <label className="label-staywith">
                                <input
                                  className="input-staywith"
                                  type="checkbox"
                                  name="soloTravel"
                                  onChange={handleCheckboxChange}
                                  checked={checkboxes.soloTravel}
                                />
                                <span>Một mình</span>
                              </label>
                              <label className="label-staywith">
                                <input
                                  className="input-staywith"
                                  type="checkbox"
                                  name="withFriends"
                                  onChange={handleCheckboxChange}
                                  checked={checkboxes.withFriends}
                                />
                                <span>Bạn bè</span>
                              </label>
                              <label className="label-staywith">
                                <input
                                  className="input-staywith"
                                  type="checkbox"
                                  name="withFamily"
                                  onChange={handleCheckboxChange}
                                  checked={checkboxes.withFamily}
                                />
                                <span>Gia đình</span>
                              </label>
                              <label className="label-staywith">
                                <input
                                  className="input-staywith"
                                  type="checkbox"
                                  name="withColleagues"
                                  onChange={handleCheckboxChange}
                                  checked={checkboxes.withColleagues}
                                />
                                <span>Đồng nghiệp</span>
                              </label>
                            </div>
                          </fieldset>

                          {isCheckBoxSelected && (
                            <div className="status-tks">
                              <span className="circle-check">
                                <FontAwesomeIcon
                                  className="icon-circle-check"
                                  icon={faCircleCheck}
                                />
                              </span>
                              <div>
                                <p className="conf-font">
                                  Cảm ơn bạn đã trả lời
                                </p>
                              </div>
                            </div>
                          )}

                          <h2 className="h2-question">
                            Chỗ nghỉ có đáp ứng mong đợi của bạn?
                          </h2>
                          <fieldset className="fieldset1">
                            {/* <fieldset> */}
                            <div className="group-radio" role="group">
                              <div
                                className="container-radio"
                                role="radiogroup"
                              >
                                <label className="lable-question1">
                                  <input
                                    type="radio"
                                    name="trip satisfaction"
                                    onChange={handleRadioChange2}
                                  />
                                  <span className="text-radio1"> Không</span>
                                </label>
                                <label className="lable-question1">
                                  <input
                                    type="radio"
                                    name="trip satisfaction"
                                    onChange={handleRadioChange2}
                                  />
                                  <span className="text-radio">Có</span>
                                </label>
                                <label className="lable-question3">
                                  <input
                                    type="radio"
                                    name="trip satisfaction"
                                    onChange={handleRadioChange2}
                                  />
                                  <span className="text-radio">
                                    Vượt ngoài mong đợi của tôi
                                  </span>
                                </label>
                              </div>
                            </div>
                            {/* </fieldset> */}
                            {isRadioSelected2 && (
                              <div className="status-tks">
                                <span className="circle-check">
                                  <FontAwesomeIcon
                                    className="icon-circle-check"
                                    icon={faCircleCheck}
                                  />
                                </span>
                                <div>
                                  <p className="conf-font">
                                    Cảm ơn bạn đã trả lời
                                  </p>
                                </div>
                              </div>
                            )}
                          </fieldset>
                        </div>
                      </li>
                      <div className="separation"></div>
                      <li data-section="2">
                        <h2 className="h21-question">
                          2. Đánh giá chỗ nghỉ này?
                        </h2>
                        <fieldset className="fieldset1">
                          <h3 className="h3-question">
                            Kỳ nghỉ của bạn ở {data.nameHotel} thế nào?
                          </h3>
                          <div className="point-range-container">
                            <div className="point-range-number">
                              <input
                                name="point-trip"
                                type="radio"
                                id="point-hotel-1"
                                aria-label="Cực kì tệ"
                                className="point-range-number-input"
                                onChange={handleRadioSelected}
                                label="1"
                                value="1"
                              />
                              <label
                                className="point-range-number-label"
                                // onClick={handleLabelClick}

                                htmlFor="point-hotel-1"
                              >
                                <span aria-hidden="true">1</span>
                                <span className="hover-point tranform-hover-the-first">
                                  <FontAwesomeIcon
                                    style={{ height: "21px" }}
                                    icon={faFaceAngry}
                                  />{" "}
                                  1
                                  <br />
                                  Cực kì tệ
                                </span>
                              </label>
                              <input
                                name="point-trip"
                                type="radio"
                                aria-label="Rất tệ"
                                id="point-hotel-2"
                                className="point-range-number-input"
                                onChange={handleRadioSelected}
                                value="2"
                                label="2"
                              />
                              <label
                                className="point-range-number-label"
                                // onClick={handleLabelClick}
                                htmlFor="point-hotel-2"
                              >
                                <span aria-hidden="true">2</span>
                                <span className="hover-point tranform-hover2">
                                  <FontAwesomeIcon
                                    style={{ height: "21px" }}
                                    icon={faFaceAngry}
                                  />{" "}
                                  2
                                  <br />
                                  Rất tệ
                                </span>
                              </label>
                              <input
                                name="point-trip"
                                type="radio"
                                aria-label="Kém"
                                id="point-hotel-3"
                                className="point-range-number-input"
                                onChange={handleRadioSelected}
                                value="3"
                                label="3"
                              />
                              <label
                                className="point-range-number-label"
                                // onClick={handleLabelClick}
                                htmlFor="point-hotel-3"
                              >
                                <span aria-hidden="true">3</span>
                                <span className="hover-point tranform-hover3">
                                  <FontAwesomeIcon
                                    style={{ height: "21px" }}
                                    icon={faFaceFrown}
                                  />{" "}
                                  3
                                  <br />
                                  Kém
                                </span>
                              </label>
                              <input
                                name="point-trip"
                                type="radio"
                                aria-label="Thất vọng"
                                id="point-hotel-4"
                                className="point-range-number-input"
                                onChange={handleRadioSelected}
                                value="4"
                                label="4"
                              />
                              <label
                                className="point-range-number-label"
                                // onClick={handleLabelClick}
                                htmlFor="point-hotel-4"
                              >
                                <span aria-hidden="true">4</span>
                                <span className="hover-point tranform-hover4">
                                  <FontAwesomeIcon
                                    style={{ height: "21px" }}
                                    icon={faFaceFrown}
                                  />{" "}
                                  4
                                  <br />
                                  Thất vọng
                                </span>
                              </label>
                              <input
                                name="point-trip"
                                type="radio"
                                aria-label="Tàm tạm"
                                id="point-hotel-5"
                                className="point-range-number-input"
                                onChange={handleRadioSelected}
                                value="5"
                                label="5"
                              />
                              <label
                                className="point-range-number-label"
                                // onClick={handleLabelClick}
                                htmlFor="point-hotel-5"
                              >
                                <span aria-hidden="true">5</span>
                                <span className="hover-point tranform-hover5">
                                  <FontAwesomeIcon
                                    style={{ height: "21px" }}
                                    icon={faFaceMeh}
                                  />{" "}
                                  5
                                  <br />
                                  Tàm tạm
                                </span>
                              </label>
                              <input
                                name="point-trip"
                                type="radio"
                                aria-label="Dễ chịu"
                                id="point-hotel-6"
                                className="point-range-number-input"
                                onChange={handleRadioSelected}
                                value="6"
                                label="6"
                              />
                              <label
                                className="point-range-number-label"
                                // onClick={handleLabelClick}
                                htmlFor="point-hotel-6"
                              >
                                <span aria-hidden="true">6</span>
                                <span className="hover-point tranform-hover6">
                                  <FontAwesomeIcon
                                    style={{ height: "21px" }}
                                    icon={faFaceMeh}
                                  />{" "}
                                  6
                                  <br />
                                  Dễ chịu
                                </span>
                              </label>
                              <input
                                name="point-trip"
                                type="radio"
                                aria-label="Tốt"
                                id="point-hotel-7"
                                className="point-range-number-input"
                                onChange={handleRadioSelected}
                                value="7"
                                label="7"
                              />
                              <label
                                className="point-range-number-label"
                                // onClick={handleLabelClick}
                                htmlFor="point-hotel-7"
                              >
                                <span aria-hidden="true">7</span>
                                <span className="hover-point tranform-hover7">
                                  <FontAwesomeIcon
                                    style={{ height: "21px" }}
                                    icon={faFaceGrinWide}
                                  />{" "}
                                  7
                                  <br />
                                  Tốt
                                </span>
                              </label>
                              <input
                                name="point-trip"
                                type="radio"
                                aria-label="Rất tốt"
                                id="point-hotel-8"
                                className="point-range-number-input"
                                onChange={handleRadioSelected}
                                value="8"
                                label="8"
                              />
                              <label
                                className="point-range-number-label"
                                // onClick={handleLabelClick}
                                htmlFor="point-hotel-8"
                              >
                                <span aria-hidden="true">8</span>
                                <span className="hover-point tranform-hover8">
                                  <FontAwesomeIcon
                                    style={{ height: "21px" }}
                                    icon={faFaceGrinWide}
                                  />{" "}
                                  8
                                  <br />
                                  Rất tốt
                                </span>
                              </label>
                              <input
                                name="point-trip"
                                type="radio"
                                aria-label="Tuyệt hảo"
                                id="point-hotel-9"
                                className="point-range-number-input"
                                onChange={handleRadioSelected}
                                value="9"
                                label="9"
                              />
                              <label
                                className="point-range-number-label"
                                // onClick={handleLabelClick}
                                htmlFor="point-hotel-9"
                              >
                                <span aria-hidden="true">9</span>
                                <span className="hover-point tranform-hover9">
                                  <FontAwesomeIcon
                                    style={{ height: "21px" }}
                                    icon={faFaceSmileBeam}
                                  />{" "}
                                  9
                                  <br />
                                  Tuyệt hảo
                                </span>
                              </label>
                              <input
                                name="point-trip"
                                type="radio"
                                aria-label="Xuất sắc"
                                id="point-hotel-10"
                                className="point-range-number-input"
                                onChange={handleRadioSelected}
                                value="10"
                                label="10"
                              />
                              <label
                                className="point-range-number-label"
                                // onClick={handleLabelClick}
                                htmlFor="point-hotel-10"
                              >
                                <span aria-hidden="true">10</span>
                                <span className="hover-point tranform-hover-the-last">
                                  <FontAwesomeIcon
                                    style={{ height: "21px" }}
                                    icon={faFaceSmileBeam}
                                  />{" "}
                                  10
                                  <br />
                                  Xuất sắc
                                </span>
                              </label>
                            </div>
                          </div>
                          <div className="title-range-point-text">
                            <span className="conf-font span1">Cực kì tệ</span>
                            <span className="conf-font span2">Xuất sắc</span>
                          </div>
                        </fieldset>
                      </li>
                      <div className="separation"></div>
                      <li data-section="3" className="about-like-dislike">
                        <h2 className="h22-question">
                          3. Bạn có thể cho chúng tôi biết thêm chút ít không?
                        </h2>
                        <fieldset className="fieldset1">
                          <label className="review-content-positive">
                            <span className="rv-icon">
                              <FontAwesomeIcon
                                className="icon-rv"
                                style={{ height: "26px", width: "26px" }}
                                icon={faFaceSmileBeam}
                              />
                            </span>
                            <span className="rv-label">Bạn thích điều gì?</span>
                            <textarea
                              className="textarea_positive"
                              style={{
                                overflow: "hidden visible",
                                overflowWrap: "break-word",
                                height: "111.6px",
                              }}
                              name="hotel_positive"
                              id=""
                              cols="106"
                              value={contentPositive}
                              onChange={handlePositiveChange}
                              rows="9"
                              placeholder="Bạn nghĩ gì về bữa sáng? Địa điểm thì sao?"
                            ></textarea>
                          </label>
                          <label className="review-content-negative">
                            <span className="rv-icon">
                              <FontAwesomeIcon
                                className="icon-rv1"
                                style={{ height: "26px", width: "26px" }}
                                icon={faFaceFrown}
                              />
                            </span>
                            <span className="rv-label">
                              Bạn không thích điều gì?
                            </span>
                            <textarea
                              className="textarea_negative"
                              style={{
                                overflow: "hidden visible",
                                overflowWrap: "break-word",
                                height: "111.6px",
                              }}
                              name="hotel_negative"
                              id=""
                              cols="106"
                              rows="9"
                              value={contentNegative}
                              onChange={handleNegativeChange}
                              placeholder="Điều gì có thể cải thiện tốt hơn?"
                            ></textarea>
                          </label>
                          <button type="submit" onClick={handleClick3}>
                            <span className="text-button">Hoàn tất</span>
                          </button>
                        </fieldset>
                      </li>
                      <div className="separation3"></div>
                    </ol>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* {openModal && <Reserve setOpen={setOpenModal} hotelId={hotelID} />} */}
          {open && (
            <div className="reserve1">
              <div className="rContainer1">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="rClose"
                  // onClick={() => setOpen(false)}
                  onClick={hideChangeTime}
                />
                <span className="conf-font">Lựa chọn phòng của bạn:</span>

                <form>
                  {/* {confirmTime && ( */}
                  <div className="rItem">
                    <div className="listSearch2">
                      {/* <h1 className="lsTitle">Tìm Kiếm</h1> */}
                      <div className="lsItem1">
                        <label className="conf-font bold">
                          Xác nhận lại thời gian ở
                        </label>
                        <span
                          className="conf-font"
                          onClick={() => setOpenDate(!openDate)}
                        >{`${format(
                          dates[0].startDate,
                          "dd/MM/yyyy"
                        )} đến ${format(
                          dates[0].endDate,
                          "dd/MM/yyyy"
                        )}`}</span>
                        {openDate && (
                          <DateRange
                            onChange={(item) => setDates([item.selection])}
                            minDate={new Date()}
                            ranges={dates}
                          />
                        )}
                      </div>
                      <button
                        className="conf-font change-time"
                        // onClick={handleChangeTime}
                        onClick={handleChangeValueRoom}
                      >
                        Tiếp tục
                      </button>
                    </div>
                  </div>
                  {/* )} */}
                  {openValueRoom && (
                    <div>
                      {data1.map((item) => (
                        <div className="rItem" key={item._id}>
                          <div className="rItemInfo">
                            <div className="rTitle conf-font">{item.title}</div>
                            <div className="rDesc">{item.desc}</div>
                            <div className="rMax conf-font">
                              Số người tối đa: <b>{item.maxPeople}</b>
                            </div>
                            <div className="rPrice conf-font" id="price">
                              {/* {item.price} */}
                              {item.price.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
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
                                  data-room-price={item.price}
                                  data-room-photo={item.photo}
                                  onChange={handleSelect}
                                  disabled={!isAvailable(roomNumber)}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      <button
                        className="conf-font change-time"
                        // onClick={handleChangeTime}
                        onClick={handleClick1}
                      >
                        Thay đổi
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
