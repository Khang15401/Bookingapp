import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch';

const Detail = () => {

  const {orderId} = useParams();

  const { data, loading, error, reFetch } = useFetch(
    `/orders/${orderId}`
  );
  console.log(data);  

  return (
    <div>
      <h3>Thông tin hóa đơn</h3>
      <p>Mã đơn phòng: {data._id}</p>
      <p>Tên khách hàng: {data.userName}</p>  
      <p>Giá Phòng: {(data.price/1.08).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
    </div>
  )
}

export default Detail
