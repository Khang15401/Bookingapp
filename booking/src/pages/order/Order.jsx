import { useLocation } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import useFetch from "../../hooks/useFetch";
import "./order.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { da } from "date-fns/locale";

const Order = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const { data, loading, error, reFetch } = useFetch(
    `/orders/history/${user._id}`
  );


  useEffect(() => {
    setList(data);
  }, [data]);
  const handleClick = async (id, orderID) => {
    try {
      await axios.patch(`/rooms/reservation/${id}`);
      // Thực hiện các bước cập nhật danh sách hiển thị hoặc trạng thái khác nếu cần thiết
      await axios.patch(`/${path}/cancle/${orderID}`);
      window.location.reload();
      alert('Hủy đặt phòng thành công');
    } catch (error) {
      console.error(error);
      alert("Hủy đơn đặt phòng thất bại!");
    }
  };

  return (
    <div className="div-tong">
      <Navbar />
      {/* <Header/> */}
      <div className="orders">
        <div className="container">
          <div className="title">
            <h1>Lịch Sử Đặt Phòng</h1>
          </div>
          <table>
            <tr>
              <th>Tên Khách Sạn</th>
              <th>Thành Phố</th>
              <th>Giá</th>
              <th>Phòng</th>
              <th>Tình Trạng</th>
              <th>Thao tác</th>
            </tr>
            {data.map((order) => (
              <tr key={order._id}>
                <td>{order.nameHotel}</td>
                <td>{order.city}</td>
                <td>{order.price}</td>
                <td>{order.rooms}</td>
                <td>{order.status}</td>
                {order.status === "Hoàn Thành" ? (
                  <div className="btn-finishRoom-disabled">Hoàn thành</div>
                ) : order.status === "Đã Hủy" ? (
                  <div className="btn-cancle1Room-disabled">Đã Hủy</div>
                ) : (
                  <div
                    onClick={() => handleClick(order.roomId, order._id)}
                    className="btn-cancleRoom"
                  >
                    Hủy đặt phòng
                  </div>
                )}
              </tr>
            ))}
          </table>
        </div>
      </div>
      <MailList />
      {/* <Footer/> */}
      {/* <div className="fText"><Footer/></div> */}
    </div>
  );
};

export default Order;
