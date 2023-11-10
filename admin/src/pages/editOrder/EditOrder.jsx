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
  console.log(services);
  console.log(priceService);

  const { data, loading, error } = useFetch(`/orders/${orderId}`);
  const priceOrder = data.price;
  console.log(priceOrder);
  const { data1, loading1, error1 } = useFetch1(`/services/filter/:id`);
  console.log(data1);
  const { order } = useContext(AuthContext);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setSelectedValue(e.target.value);
  };

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
      const updatedPrice = priceOrder; // Giả sử ban đầu price sẽ là priceOrder

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
            <form>
              <div className="formInput">
                <label>Tên khách sạn</label>
                <input
                  // type={input.type}
                  placeholder={data.nameHotel}
                  id="name"
                  name="name"
                  disabled
                />
                <label>Tên khách hàng</label>
                <input
                  // type={input.type}
                  placeholder={data.userName}
                  id="name"
                  name="name"
                  disabled
                />
                <label>Giá tiền</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder={data.price}
                  id="distance"
                  name="distance"
                />
                <label>Nhận phòng</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder={data.checkIn}
                  id="title"
                  name="title"
                  disabled
                />
                <label>Trả phòng</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder={data.checkOut}
                  id="title"
                  name="title"
                  disabled
                />
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

                <label>
                  Tình trạng: <p>{data.status}</p>
                </label>
                {/* <p>{data.status}</p> */}
                <select
                  id="status"
                  value={selectedValue}
                  onChange={handleChange}
                >
                  <option value="default" disabled hidden>
                    Tình trạng đặt phòng
                  </option>
                  <option value={"Chưa nhận phòng"}>Chưa nhận phòng</option>
                  <option value={"Đã hủy"}>Đã hủy</option>
                  <option value={"Hoàn thành"}>Hoàn thành</option>
                </select>
              </div>

              <button className="no-btn" disabled></button>
              <button className="no-btn" disabled></button>
              <button className="no-btn" disabled></button>
              <button onClick={handleClick}>Cập nhật</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOrder;
