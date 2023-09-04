import { Link, useLocation } from "react-router-dom";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import useFetch from "../../hooks/useFetch";
import "./order.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Order = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
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

  const navigate = useNavigate();

  const reversedData = [...data].reverse();
  // console.log(reversedData);  
  const showConfirmDialog = (id,orderId) => {
    setShowConfirmation(true);
    setOrderId(orderId);
    setID(id);
  };
  console.log(reversedData);

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

  const handleDetailsOrder = async (orderId) => {
    try {
     const details = await axios.get(`/orders/${orderId}`);
     navigate(`/orders/detail/${orderId}`);
    // setOrderId(orderId);   
    console.log(details);
    } catch (error) {
      console.error(error);
    }
  }

  return (
      <div className="WrapperContainer">
      <Navbar />
      {/* <SearchOrder/> */}
        <div style={{height: '100%', width: '1270px', margin: '0 auto'}}>
          <h2 className="title-order">Đơn đặt phòng của tôi</h2>
          <div className="container-search">
            <FontAwesomeIcon className="icon-search" icon={faMagnifyingGlass}/>
            <input  className="form-search" onChange={ (e) => setSearch(e.target.value)} placeholder="Nhập vào mã đơn đặt phòng, tên thành phố hoặc tên khách sạn..."/>
          </div>
          <div className="WrapperListOrder">
            {reversedData.filter((order) =>{ 
              const searchTerm = search.toLowerCase();
              const regex = new RegExp(searchTerm, 'i');
              return (
                  regex.test(order._id.toLowerCase()) ||
                  regex.test(order.nameHotel.toLowerCase()) ||
                  regex.test(order.city.toLowerCase())
              );
            }).map((order) => {
              return (
                <div className="WrapperItemOrder" key={order?._id}>
                  <div className="WrapperStatus">
                    <div className="Wrapper-detail">
                      <span className="conf-font1" style={{fontWeight: 'bold'}}>Mã đơn phòng: {order._id}</span>
                      <div>
                        <span className="status-reservation">Trạng thái | </span> 
                        <span style={{fontSize: '18px', fontWeight: 'bold', color: '#003580'}}> {`${order.status}`}</span>
                      </div>
                    </div>
                    <div>
                      <span className="conf-font1">Tên khách sạn: </span>
                      <span style={{color: 'rgb(0, 53, 128)', fontWeight: 'bold'}}>{`${order.nameHotel}`}</span>
                    </div>
                    <div>
                      {/* <span style={{color: 'rgb(90, 32, 193)', fontWeight: 'bold'}}>{`${order.status}`}</span> */}
                    </div>
                  </div> 
                  <div className="detail-img">
                    <img className="photo-Room" src={order.photoRoom} alt="" />
                    <div className="detail-room">
                      <span>{order.city}</span>
                      <div className="number-room conf-font1">Phòng {(order?.rooms)}</div>
                    </div>
                    <div className="price-room conf-font1">
                      <span>{(order.price/1.08).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
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
                    {order.status !== 'Đã Hủy' &&  order.status !== 'Hoàn Thành' && (
                      <button className="button-order"
                        // onClick={() => handleCanceOrder(order)}
                        onClick={() => handleClick(order.roomId, order._id)}
                        size={40}
                        styleButton={{
                            height: '36px',
                            border: '1px solid #9255FD',
                            borderRadius: '4px'
                        }}
                        styleTextButton={{ color: '#9255FD', fontSize: '14px' }}
                        disabled={order.status === 'Đã Hủy'}
                      >
                        Hủy Đặt Phòng
                      </button>
                    )}
                      {/* <div className="btn-cancleRoom" onClick={() => handleClick(order.roomId, order._id)}>Hủy đặt phòng</div> */}
                    {/* <Link to = {`/orders/detail/${orderId}`}   style={{color:"inherit", textDecoration:"none"}}> */}
                      <button className="button-order"
                        onClick={() => handleDetailsOrder(order?._id)}
                        size={40}
                        styleButton={{
                          height: '36px',
                          border: '1px solid #9255FD',
                          borderRadius: '4px'
                        }}
                        styleTextButton={{ color: '#9255FD', fontSize: '14px' }}
                        >
                        Xem Chi Tiết
                      </button>
                    {/* </Link> */}
                    </div>
                  </div>
                </div>
              )
            })}
            {showConfirmation && (
            <div className="confirmation-dialog">
              <div className="confirmation-content">
                <h3 className="conf-font1">Xác nhận hủy đặt phòng</h3>
                <p className="conf-font1">Bạn có chắc chắn muốn hủy đặt phòng?</p>
                <div className="confirmation-buttons">
                  <button className="conf-font1" onClick={confirmCancellation}>Xác nhận</button>
                  <button className="conf-font1" onClick={hideConfirmDialog}>Hủy</button>
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
