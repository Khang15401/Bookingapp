import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";

const Revenue = ({ orders }) => {

    const { data, loading, error } = useFetch(`/orders`);
    console.log(data)

  const [revenueByWeek, setRevenueByWeek] = useState({});
  const [revenueByMonth, setRevenueByMonth] = useState({});
  const [revenueByYear, setRevenueByYear] = useState({});

  useEffect(() => {
    // Khởi tạo các biến để tính tổng doanh thu theo tuần, tháng và năm
    const revenueByWeek = {};
    const revenueByMonth = {};
    const revenueByYear = {};

    orders.forEach((order) => {
      const createdAt = new Date(order.createdAt);
      const week = createdAt.toLocaleWeekString();
      const month = createdAt.getMonth() + 1;
      const year = createdAt.getFullYear();

      // Tính toán doanh thu cho từng tuần
      if (!revenueByWeek[week]) {
        revenueByWeek[week] = 0;
      }
      revenueByWeek[week] += order.price;

      // Tính toán doanh thu cho từng tháng
      if (!revenueByMonth[`${year}-${month}`]) {
        revenueByMonth[`${year}-${month}`] = 0;
      }
      revenueByMonth[`${year}-${month}`] += order.price;

      // Tính toán doanh thu cho từng năm
      if (!revenueByYear[year]) {
        revenueByYear[year] = 0;
      }
      revenueByYear[year] += order.price;
    });

    setRevenueByWeek(revenueByWeek);
    setRevenueByMonth(revenueByMonth);
    setRevenueByYear(revenueByYear);
  }, [orders]);

  return (
    <div>
      <h2>Doanh thu theo tuần</h2>
      <ul>
        {Object.entries(revenueByWeek).map(([week, revenue]) => (
          <li key={week}>
            Tuần {week}: {revenue} VNĐ
          </li>
        ))}
      </ul>

      <h2>Doanh thu theo tháng</h2>
      <ul>
        {Object.entries(revenueByMonth).map(([month, revenue]) => (
          <li key={month}>
            Tháng {month}: {revenue} VNĐ
          </li>
        ))}
      </ul>

      <h2>Doanh thu theo năm</h2>
      <ul>
        {Object.entries(revenueByYear).map(([year, revenue]) => (
          <li key={year}>
            Năm {year}: {revenue} VNĐ
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Revenue;
