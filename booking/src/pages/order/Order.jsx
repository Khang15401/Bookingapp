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


const Order = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [id, setID] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const { data, loading, error, reFetch } = useFetch(
    `/orders/history/${user._id}`
  );

  useEffect(() => {
    setList(data);
  }, [data]);

  const showConfirmDialog = (id,orderId) => {
    setShowConfirmation(true);
    setOrderId(orderId);
    setID(id);
  };

  const hideConfirmDialog = () => {
    setShowConfirmation(false);
    setOrderId(null);
    setID(null);
  };

  // const handleClick = async (id, orderID) => {
  //   try {
  //     await axios.patch(`/rooms/reservation/${id}`);
  //     // Thực hiện các bước cập nhật danh sách hiển thị hoặc trạng thái khác nếu cần thiết
  //     await axios.patch(`/${path}/cancle/${orderID}`);
  //     window.location.reload();
  //     alert('Hủy đặt phòng thành công');
  //   } catch (error) {
  //     console.error(error);
  //     alert("Hủy đơn đặt phòng thất bại!");
  //   }
  // };

  const handleClick = (id, orderID) => {
    data.map(order=> {
      if (order.status === "Hoàn Thành" || order.status === "Đã Hủy") {
        return; // Không làm gì nếu trạng thái là "Hoàn Thành" hoặc "Đã Hủy"
      }
    })

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
              {/* <th>Tình Trạng</th> */}
              <th>Trang Thái</th>
            </tr>
            {data.map((order) => (
              <tr key={order._id}>
                <td>{order.nameHotel}</td>
                <td>{order.city}</td>
                <td>{order.price}</td>
                <td>{order.rooms}</td>
                {/* <td>{order.status}</td> */}
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
          {showConfirmation && (
            <div className="confirmation-dialog">
              <div className="confirmation-content">
                <h3>Xác nhận hủy đặt phòng</h3>
                <p>Bạn có chắc chắn muốn hủy đặt phòng?</p>
                <div className="confirmation-buttons">
                  <button onClick={confirmCancellation}>Xác nhận</button>
                  <button onClick={hideConfirmDialog}>Hủy</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <MailList />
    </div>
  );
};

export default Order;
