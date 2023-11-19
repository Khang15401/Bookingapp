import React from "react";
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { AuthContext } from "../../context/AuthContex";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./editOrder.scss";
import useFetch1 from "../../hooks/useFetch1";
import Alert from "../../components/Alert/Alert";
import toast from "react-hot-toast";
import useFetch2 from "../../hooks/useFetch2";

const EditOrder = ({}) => {
  const navigate = useNavigate();
  // const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [orders, setOrders] = useState([]);
  const { orderId } = useParams();
  // console.log(orderId);
  const [services, setServices] = useState([]);
  const [priceService, setPriceService] = useState();
  const [selectedValue, setSelectedValue] = useState("default");
  // console.log(services);
  // console.log(priceService);
  const [paid, setPaid] = useState(false);

  const { data, loading, error } = useFetch(`/orders/${orderId}`);
  const priceOrder = data.price;
  console.log(priceOrder);
  const { data1, loading1, error1 } = useFetch1(`/services/filter/:id`);
  console.log(data1);
  const { order } = useContext(AuthContext);

  const { data2, loading2, error2, reFetch2 } = useFetch2(
    `/orders/service/${orderId}`
  );
  console.log(data2);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setSelectedValue(e.target.value);
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

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => ({
      // price: option.getAttribute('data-price'),
      price: parseFloat(option.getAttribute("data-price")),
    }));

    const totalPrice = selectedOptions.reduce(
      (sum, service) => sum + service.price,
      0
    );
    // setTotalPrice(totalPrice);
    setServices(value);
    setPriceService(totalPrice);
  };

  // Dieu chinh lai gia tien và cách tính thuế GTGT của toàn bộ dịch vụ

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      let updatedPrice = priceOrder; // Giả sử ban đầu price sẽ là priceOrder

      if (services.length > 0) {
        updatedPrice += priceService; // Nếu có dịch vụ được chọn, thì thêm giá dịch vụ vào giá đơn hàng
        updatedPrice *= 1.08; // Sau đó tính thuế GTGT (VAT)
      }
      const updateOrder = {
        ...info,
        services,
        // price: (priceOrder + priceService) * 1.08,
        price: updatedPrice,
        priceService: priceService,
      };
      await axios.patch("/orders/" + orderId, updateOrder);
      console.log(updateOrder);
      toast.success("Sửa thông tin đơn hàng thành công!");

      setTimeout(() => {
        navigate("/orders");
      }, 800);
    } catch (err) {
      toast.error("Sửa thông tin không thành công!");
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Sửa thông tin đơn hàng</h1>
        </div>
        <div className="bottom">
          {/* <div className="left"> */}
          {/* <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            /> */}
          {/* </div> */}
          <div className="right">
            <form className="form6">
              <div className="formInput5">
                <label>Tên khách sạn</label>
                {/* <input
                  // type={input.type}
                  placeholder={data.nameHotel}
                  id="name"
                  name="name"
                  disabled
                /> */}
                <div className="div-info" style={{ color: "gray" }}>
                  {data.nameHotel}
                </div>
                <label>Tên khách hàng</label>
                {/* <input
                  // type={input.type}
                  placeholder={data.userName}
                  id="name"
                  name="name"
                  disabled
                /> */}
                <div className="div-info" style={{ color: "gray" }}>
                  {data.userName}
                </div>
                <label>Giá tiền phòng</label>
                {/* <input
                  onChange={handleChange}
                  type="text"
                  placeholder={data.price}
                  id="distance"
                  name="distance"
                /> */}
                <div className="div-info" style={{ color: "gray" }}>
                  {data.price}
                </div>
                <label>Nhận phòng</label>
                {/* <input
                  onChange={handleChange}
                  type="text"
                  placeholder={data.checkIn}
                  id="title"
                  name="title"
                  disabled
                /> */}
                <div className="div-info" style={{ color: "gray" }}>
                  {data.checkIn}
                </div>
                <label>Trả phòng</label>
                {/* <input
                  onChange={handleChange}
                  type="text"
                  placeholder={data.checkOut}
                  id="title"
                  name="title"
                  disabled
                /> */}
                <div className="div-info" style={{ color: "gray" }}>
                  {data.checkOut}
                </div>
                {data.status !== "Hoàn thành" && data.status !== "Đã hủy" && (
                  <div className="selectRooms">
                    <label>Loại dịch vụ</label>
                    <select
                      className="select-services"
                      id="rooms"
                      multiple
                      onChange={handleSelect}
                    >
                      {loading
                        ? "loading"
                        : data1 &&
                          data1.map((service) => (
                            <option
                              key={service._id}
                              data-price={service.serviceprice}
                              value={service._id}
                            >
                              {service.servicename}
                            </option>
                          ))}
                    </select>
                  </div>
                )}

                <label>
                  Tình trạng: <p>{data.status}</p>
                </label>
                {/* <p>{data.status}</p> */}
                {data.status !== "Hoàn thành" && data.status !== "Đã hủy" && (
                  <select
                    id="status"
                    value={selectedValue}
                    onChange={handleChange}
                  >
                    <option value="default" disabled hidden>
                      Tình trạng đặt phòng
                    </option>
                    <option value={"Chưa nhận phòng"}>Chưa nhận phòng</option>
                    <option value={"Đã nhận phòng"}>Đã nhận phòng</option>
                    <option value={"Đã hủy"}>Đã hủy</option>
                    <option value={"Hoàn thành"}>Hoàn thành</option>
                  </select>
                )}
                {/* {data.status !== "Hoàn thành" && data.status !== "Đã hủy" && (
                  <button
                    style={{ display: "flex", justifyContent: "center" }}
                    onClick={handleClick}
                  >
                    Cập nhật
                  </button>
                )} */}

                {data.status !== "Hoàn thành" && data.status !== "Đã hủy" ? (
                  <button
                    style={{ display: "flex", justifyContent: "center" }}
                    onClick={handleClick}
                  >
                    Cập nhật
                  </button>
                ) : (
                  <button
                    style={{ display: "flex", justifyContent: "center" }}
                    onClick={() => setPaid(!paid)}
                    type="button"
                  >
                    Xem chi tiết hóa đơn
                  </button>
                )}
              </div>

              {/* <button className="no-btn" disabled></button> */}
              {/* <button className="no-btn" disabled></button> */}
              {/* <button className="no-btn" disabled></button> */}
              {paid && (
                <div className="left">
                  <div className="wrap-detail-payment">
                    <header className="header-title-room">
                      Chi tiết thanh toán
                    </header>
                    <div className="section section-detail">
                      <div className="room">
                        <h3>{data.titleRoom}</h3>
                        <table className="conf-table">
                          <tbody>
                            <tr>
                              <th scope="row" className="conf-table-content">
                                <h5
                                  style={{ paddingLeft: "78px" }}
                                  className="conf-font"
                                >
                                  Khách hàng
                                </h5>
                              </th>
                              <td>
                                <p></p>
                                <div className="space-block">
                                  <span>
                                    <span className="conf-font">
                                      {data.userName}
                                    </span>
                                  </span>
                                </div>
                                <p></p>
                                <p></p>
                              </td>
                            </tr>

                            <tr>
                              <th scope="row" className="conf-table-content">
                                <h5
                                  style={{ paddingLeft: "78px" }}
                                  className="conf-font"
                                >
                                  Khách sạn
                                </h5>
                              </th>
                              <td>
                                <p></p>
                                <div className="space-block">
                                  <span>
                                    <span className="conf-font">
                                      {data.nameHotel}
                                    </span>
                                  </span>
                                </div>
                                <p></p>
                                <p></p>
                              </td>
                            </tr>

                            <tr>
                              <th scope="row" className="conf-table-content">
                                <h5
                                  style={{ paddingLeft: "78px" }}
                                  className="conf-font"
                                >
                                  Chi tiết lựa chọn
                                </h5>
                              </th>
                              <td>
                                <p></p>
                                <div className="space-block">
                                  <span>
                                    <span className="conf-font">
                                      {data.quantity}
                                    </span>
                                  </span>
                                </div>
                                <p></p>
                                <p></p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div>
                          <div className="wrap-price-final">
                            <table className="table-price-final">
                              <tbody>
                                <tr>
                                  <div className="conf-table-content2">
                                    {data.quantity}
                                  </div>
                                  <td
                                    style={{ textAlign: "right" }}
                                    className="conf-font"
                                  >
                                    {data.priceService
                                      ? formatCurrency(
                                          data.price / 1.08 - data.priceService
                                        )
                                      : formatCurrency(data.price)}
                                  </td>
                                </tr>

                                {data2.map((service, index) => (
                                  <tr key={index}>
                                    <div
                                      className="conf-table-content2"
                                      scope="row"
                                    >
                                      - {service.servicename}
                                    </div>
                                    <td
                                      style={{ textAlign: "right" }}
                                      className="conf-font td-service"
                                    >
                                      {formatCurrency(service.serviceprice)}
                                    </td>
                                  </tr>
                                ))}

                                <tr>
                                  <div
                                    className="conf-table-content2"
                                    scope="row"
                                  >
                                    8 % Thuế GTGT
                                  </div>
                                  <td
                                    style={{ textAlign: "right" }}
                                    className="conf-font"
                                  >
                                    {data.priceService
                                      ? formatCurrency(
                                          data.price - data.price / 1.08
                                        )
                                      : formatCurrency(
                                          data.price * 1.08 - data.price
                                        )}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div>
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
                                  <td
                                    style={{ textAlign: "right" }}
                                    className="conf-font2"
                                  >
                                    {/* {formatCurrency(data.price)} */}
                                    {data.priceService
                                      ? formatCurrency(data.price)
                                      : formatCurrency(data.price * 1.08)}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div>
                          <div className="wrap-price-final">
                            <table className="table-price-final">
                              <tbody>
                                <tr>
                                  <div
                                    style={{ fontWeight: 0 }}
                                    className="conf-table-content2"
                                  >
                                    <div className="conf-price-room">
                                      Trạng thái
                                    </div>
                                    {/* <div className="conf-price-room-note ">
                                    (dành cho 2 khách)
                                  </div> */}
                                  </div>
                                  <td
                                    style={{ textAlign: "right" }}
                                    className="conf-font2"
                                  >
                                    {data.status === "Hoàn thành" &&
                                      "Đã thanh toán"}
                                    {data.status === "Đã hủy" && "Đã hủy"}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOrder;
