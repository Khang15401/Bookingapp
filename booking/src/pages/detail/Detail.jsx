import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch';
import Navbar from "../../components/navbar/Navbar";
import "./detail.css"
import {
  faSearch,
  faHotel
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import Header from '../../components/header/Header';
const Detail = () => {

  const {orderId} = useParams();

  const { data, loading, error, reFetch } = useFetch(
    `/orders/${orderId}`
  );
  console.log(data);  

  return (
    <div>
      <Navbar/>
      <div className='container-detailOrder detail-sumary'>
        <div className='wrap-detail'>
          <div className='reservation-status-container'>
            <div className='reservation-status-title'>
                <div className='reservation-status-title-status'>{data.status}</div>
                <header className='detail-header'>Đơn đặt đã hoàn tất</header>
            </div>
            <a className='link-booking-again' href="#">
              <span className='icon-booking'>
                <FontAwesomeIcon icon={faHotel}/>
              </span>
              <span className='link-booking'>Đặt lại</span>
            </a>
            <a className='link-booking-again spacing' href="#">
              <span className='icon-booking'>
                <FontAwesomeIcon icon={faSearch}/>
              </span>
              <span className='link-booking'>Tìm kiếm nơi ở khác</span>
            </a>
          </div>
        </div>      
      </div>
      {/* <p>Giá Phòng: {(data.price/1.08).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p> */}
    </div>
  )
}

export default Detail
