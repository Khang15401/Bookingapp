import React, { useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../components/header/Header";
import axios from "axios";
const Detail = () => {
  const { orderId } = useParams();
  console.log(orderId);
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  console.log(path)
  const { data, loading, error, reFetch } = useFetch(`/orders/${orderId}`);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderID, setOrderID] = useState(null);
  const [id, setID] = useState(null);
  // console.log(hotelId);

  // const handleClick = async () => {
  //   const hotelId = data.hotelId;
  //   try {
  //   //  const location = await axios.get(`/hotels/${hotelId}`);
  //   //  Navigate(`/hotels/${hotelId}`);
  //   return <Navigate to={`/hotels/${hotelId}`} />;
  //   // setOrderId(orderId);
  //   // console.log(location);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  const showConfirmDialog = (id,orderId) => {
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
      if (data.status === "Hoàn thành" || data.status === "Đã hủy"){
        return;
      }
    // Hiển thị hộp thoại xác nhận trước khi hủy đặt phòng
    showConfirmDialog(id ,orderID);
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
            <a className="link-booking-again" href="#">
              <span className="icon-booking">
                <FontAwesomeIcon className="icon-size-small" icon={faHotel} />
              </span>
              <span className="link-booking">Đặt lại</span>
            </a>
            <a className="link-booking-again spacing" href="#">
              <span className="icon-booking">
                <FontAwesomeIcon className="icon-size-small" icon={faSearch} />
              </span>
              <span className="link-booking">Tìm kiếm nơi ở khác</span>
            </a>
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
                  <h3>Phòng Superior Giường Đôi</h3>
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
                          Sức chứa tối đa
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
                          {/* <h3 style={{fontWeight: "600"}} className='policy-children'>Chính sách nôi (cũi) và giường phụ</h3> */}
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
                                Giá phòng đã bao gồm 8% thuế GTGT.
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
                            {formatCurrency(data.price / 1.08)}
                          </td>
                        </tr>
                        <tr>
                          <div className="conf-table-content2" scope="row">
                            8 % Thuế GTGT
                          </div>
                          <td className="conf-font">
                            {formatCurrency(data.price - data.price / 1.08)}
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
                            {formatCurrency(data.price)}
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
                  <span>
                    <FontAwesomeIcon icon={faCopy} />
                  </span>
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
                        {data.status !== 'Hoàn Thành' && data.status !== 'Đã Hủy' && (
                          <button onClick={() => handleClick(data.roomId, data._id)} type="button" className="button-cancle-room">
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
              {data.status !== 'Hoàn Thành' && data.status !== 'Đã Hủy' && (
                <button type="button" className="button-cancle-room">
                  <span className="icon-cancle">
                    <FontAwesomeIcon icon={faCalendarDays} />
                  </span>
                  <span className="title-cancle-room">Thay đổi ngày tháng</span>
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
          {showConfirmation && (
            <div className="confirmation-dialog">
              <div className="confirmation-content">
                <h3 className="conf-font">Xác nhận hủy đặt phòng</h3>
                <p className="conf-font">Bạn có chắc chắn muốn hủy đặt phòng?</p>
                <div className="confirmation-buttons">
                  <button className="conf-font" onClick={confirmCancellation}>Xác nhận</button>
                  <button className="conf-font" onClick={hideConfirmDialog}>Hủy</button>
                </div>
              </div>
            </div>
          )}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Detail;
