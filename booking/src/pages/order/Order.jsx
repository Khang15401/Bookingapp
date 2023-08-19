import { useLocation } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { faWallet } from '@fortawesome/free-solid-svg-icons';

import useFetch from "../../hooks/useFetch";
import "./order.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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
  const reversedData = [...data].reverse();
  // console.log(reversedData);
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
      <div className="WrapperContainer">
      <Navbar />
        <div style={{height: '100%', width: '1270px', margin: '0 auto'}}>
          <h2 className="title-order">Đơn đặt phòng của tôi</h2>
          <div className="WrapperListOrder">
            {reversedData.map((order) => {
              return (
                <div className="WrapperItemOrder" key={order?._id}>
                  <div className="WrapperStatus">
                    <div className="Wrapper-detail">
                      <span style={{fontSize: '14px', fontWeight: 'bold'}}>Mã đơn phòng: {order._id}</span>
                      <div>
                        <span className="status-reservation">Trạng Thái | </span> 
                        <span style={{fontSize: '18px', fontWeight: 'bold', color: '#003580'}}> {`${order.status}`}</span>
                      </div>
                    </div>
                    <div>
                      <span style={{color: 'rgb(255, 66, 78)'}}>Tên Khách sạn: </span>
                      <span style={{color: 'rgb(90, 32, 193)', fontWeight: 'bold'}}>{`${order.nameHotel}`}</span>
                    </div>
                    <div>
                      {/* <span style={{color: 'rgb(90, 32, 193)', fontWeight: 'bold'}}>{`${order.status}`}</span> */}
                    </div>
                  </div> 
                  <div className="detail-img">
                    <img className="photo-Room" src={order.photoRoom} alt="" />
                    <div className="detail-room">
                      <span>{order.roomId}</span>
                      <div className="number-room">Phòng {(order?.rooms)}</div>
                    </div>
                    <div className="price-room">
                      <span>50.000vnd</span>
                    </div>
                    {/* <div className="price-room">
                      <span>{(order?.rooms)}</span>
                    </div> */}
                  </div>
                  <div className="WrapperFooterItem">
                    <div>
                      <span style={{color: 'rgb(255, 66, 78)'}}>Tổng tiền: </span>
                      <span 
                        style={{ fontSize: '13px', color: 'rgb(56, 56, 61)',fontWeight: 700 }}
                      >{(order?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }))}</span>
                    </div>  
                    <div style={{display: 'flex', gap: '10px'}}>
                    <button className="button-order"
                        // onClick={() => handleCanceOrder(order)}
                        size={40}
                        styleButton={{
                            height: '36px',
                            border: '1px solid #9255FD',
                            borderRadius: '4px'
                        }}
                        textbutton={'Hủy đơn hàng'}
                        styleTextButton={{ color: '#9255FD', fontSize: '14px' }}
                      >
                        Hủy Đặt Phòng
                      </button>
                      <button className="button-order"
                        // onClick={() => handleDetailsOrder(order?._id)}
                        size={40}
                        styleButton={{
                            height: '36px',
                            border: '1px solid #9255FD',
                            borderRadius: '4px'
                        }}
                        textbutton={'Xem chi tiết'}
                        styleTextButton={{ color: '#9255FD', fontSize: '14px' }}
                      >
                        Xem Chi Tiết
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <MailList />  
      </div>

  );
};

export default Order;
