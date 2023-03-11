import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import useFetch from "../../hooks/useFetch";
import "./order.css";

const Order = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { data, loading, error, reFetch } = useFetch(`/orders/history/${user._id}`);
  console.log(data);
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
              {/* <th>Tiêu Đề</th> */}
              <th>Thành Phố</th>
              <th>Giá</th>
              <th>Phòng</th>
              <th>Tình Trạng</th>
            </tr>
            {data.map((order) => (
              <tr key={order._id}>
                <td>{order.nameHotel}</td>
                {/* <td>{order.title}</td> */}
                <td>{order.city}</td>
                <td>{order.price}</td>
                <td>{order.rooms}</td>
                <td>{order.status}</td>
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
