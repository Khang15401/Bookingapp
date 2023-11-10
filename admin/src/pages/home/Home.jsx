import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Widget from "../../components/widget/Widget";
import useFetch from "../../hooks/useFetch";
import useFetch1 from "../../hooks/useFetch1";
import useFetch2 from "../../hooks/useFetch2";
import useFetch3 from "../../hooks/useFetch3";
import useFetch4 from "../../hooks/useFetch4";
import { useEffect, useState } from "react";
import useFetch5 from "../../hooks/useFetch5";
import useFetch6 from "../../hooks/useFetch6";

const Home = () => {
  const { data, loading, error } = useFetch(`/users`);

  const staffUsers = data.filter((user) => user.role === "staff");
  const numberOfPartner = staffUsers.length;
  const nonAdminUsers = data.filter((item) => item.isAdmin === false);
  const numberOfUser = nonAdminUsers.length;

  const managerHotel = JSON.parse(localStorage.getItem("user"));
  const staffRole = managerHotel.role;
  const hotelId = managerHotel.hotelId;
  console.log(hotelId);

  const { data1, loading1, error1 } = useFetch1(`/hotels`);
  const numberOfHotels = data1.length;

  const { data2, loading2, error2 } = useFetch2(`/rooms`);
  const numberOfRooms = data2.length;

  const { data3, loading3, error3 } = useFetch3(`/orders`);
  // console.log(data3);

  const { data4, loading4, error4 } = useFetch4(`/orders/filter/${hotelId}`);
  const numberOfOrderByHotelId = data4.length;

  const { data5, loading5, error5 } = useFetch5(`/hotels/room/${hotelId}`);
  const numberOfRoomHotel = data5.length;

  const { data6, loading6, error6 } = useFetch6(`/hotels/review/${hotelId}`);
  const numberOfReview = data6.length;

  

  const [revenueByWeek, setRevenueByWeek] = useState({});
  const [revenueByMonth, setRevenueByMonth] = useState({});
  const [revenueByYear, setRevenueByYear] = useState({});
  console.log(revenueByWeek);
  console.log(revenueByMonth);
  console.log(revenueByYear);

  // useEffect(() => {
  //   // Khởi tạo các biến để tính tổng doanh thu theo tuần, tháng và năm
  //   const revenueByWeek = {};
  //   const revenueByMonth = {};
  //   const revenueByYear = {};

  //   const calculateWeekNumber = (date) => {
  //     const currentDate = new Date(date);
  //     currentDate.setHours(0, 0, 0, 0); // Ensure we are working with midnight time
  //     currentDate.setDate(currentDate.getDate() + 3 - (currentDate.getDay() + 6) % 7); // Adjust to Thursday
  //     const weekNumber = Math.ceil(
  //       (currentDate - new Date(currentDate.getFullYear(), 0, 4)) / 604800000
  //     ); // Calculate week number
  //     return weekNumber;
  //   };

  //   data3.forEach((order) => {
  //     if (order.status === "Hoàn thành") {
  //       const createdAt = new Date(order.createdAt);
  //       const week = calculateWeekNumber(createdAt);
  //       const month = createdAt.getMonth() + 1;
  //       const year = createdAt.getFullYear();

  //       // Tính toán doanh thu cho từng tuần
  //       // if (!revenueByWeek[week]) {
  //       //   revenueByWeek[week] = 0;
  //       // }
  //       // revenueByWeek[week] += order.price;

  //       // if (!revenueByWeek[`Tuần ${week}`]) {
  //       //   revenueByWeek[`Tuần ${week}`] = 0;
  //       // }
  //       // revenueByWeek[`Tuần ${week}`] += order.price;

  //       const weekWithYear = `Tuần ${week} / ${year}`;
  //   if (!revenueByWeek[weekWithYear]) {
  //     revenueByWeek[weekWithYear] = 0;
  //   }
  //   revenueByWeek[weekWithYear] += order.price;

  //       // Tính toán doanh thu cho từng tháng
  //       if (!revenueByMonth[`${year}-${month}`]) {
  //         revenueByMonth[`${year}-${month}`] = 0;
  //       }
  //       revenueByMonth[`${year}-${month}`] += order.price;

  //       // Tính toán doanh thu cho từng năm
  //       if (!revenueByYear[year]) {
  //         revenueByYear[year] = 0;
  //       }
  //       revenueByYear[year] += order.price;
  //     }
  //   });

  //   setRevenueByWeek(revenueByWeek);
  //   setRevenueByMonth(revenueByMonth);
  //   setRevenueByYear(revenueByYear);
  // }, [data3]);

  useEffect(() => {
    if (staffRole === "admin") {
      // Khởi tạo các biến để tính tổng doanh thu theo tuần, tháng và năm
      const revenueByWeek = {};
      const revenueByMonth = {};
      const revenueByYear = {};

      const calculateWeekNumber = (date) => {
        const currentDate = new Date(date);
        currentDate.setHours(0, 0, 0, 0); // Ensure we are working with midnight time
        currentDate.setDate(
          currentDate.getDate() + 3 - ((currentDate.getDay() + 6) % 7)
        ); // Adjust to Thursday
        const weekNumber = Math.ceil(
          (currentDate - new Date(currentDate.getFullYear(), 0, 4)) / 604800000
        ); // Calculate week number
        return weekNumber;
      };

      data3.forEach((order) => {
        if (order.status === "Hoàn thành") {
          const createdAt = new Date(order.createdAt);
          const week = calculateWeekNumber(createdAt);
          const month = createdAt.getMonth() + 1;
          const year = createdAt.getFullYear();

          const weekWithYear = `Tuần ${week} / ${year}`;
          if (!revenueByWeek[weekWithYear]) {
            revenueByWeek[weekWithYear] = 0;
          }
          revenueByWeek[weekWithYear] += order.price;

          if (!revenueByMonth[`${year}-${month}`]) {
            revenueByMonth[`${year}-${month}`] = 0;
          }
          revenueByMonth[`${year}-${month}`] += order.price;

          if (!revenueByYear[year]) {
            revenueByYear[year] = 0;
          }
          revenueByYear[year] += order.price;
        }
      });

      setRevenueByWeek(revenueByWeek);
      setRevenueByMonth(revenueByMonth);
      setRevenueByYear(revenueByYear);
    }
  }, [data3, staffRole]);

  useEffect(() => {
    if (staffRole === "staff") {
      // Khởi tạo các biến để tính tổng doanh thu theo tuần, tháng và năm
      const revenueByWeek = {};
      const revenueByMonth = {};
      const revenueByYear = {};

      const calculateWeekNumber = (date) => {
        const currentDate = new Date(date);
        currentDate.setHours(0, 0, 0, 0); // Ensure we are working with midnight time
        currentDate.setDate(
          currentDate.getDate() + 3 - ((currentDate.getDay() + 6) % 7)
        ); // Adjust to Thursday
        const weekNumber = Math.ceil(
          (currentDate - new Date(currentDate.getFullYear(), 0, 4)) / 604800000
        ); // Calculate week number
        return weekNumber;
      };

      data4.forEach((order) => {
        if (order.status === "Hoàn thành") {
          const createdAt = new Date(order.createdAt);
          const week = calculateWeekNumber(createdAt);
          const month = createdAt.getMonth() + 1;
          const year = createdAt.getFullYear();

          const weekWithYear = `Tuần ${week} / ${year}`;
          if (!revenueByWeek[weekWithYear]) {
            revenueByWeek[weekWithYear] = 0;
          }
          revenueByWeek[weekWithYear] += order.price;

          if (!revenueByMonth[`${year}-${month}`]) {
            revenueByMonth[`${year}-${month}`] = 0;
          }
          revenueByMonth[`${year}-${month}`] += order.price;

          if (!revenueByYear[year]) {
            revenueByYear[year] = 0;
          }
          revenueByYear[year] += order.price;
        }
      });

      setRevenueByWeek(revenueByWeek);
      setRevenueByMonth(revenueByMonth);
      setRevenueByYear(revenueByYear);
    }
  }, [data4, staffRole]);

  const transformedData = Object.keys(revenueByWeek).map((key) => ({
    Tuần: key,
    Doanh_thu: revenueByWeek[key],
  }));
  console.log(transformedData);

  const transformedDataMonth = Object.keys(revenueByMonth).map((key) => ({
    Tháng: key,
    Doanh_thu: revenueByMonth[key],
  }));

  const transformedDataYear = Object.keys(revenueByYear).map((key) => ({
    Năm: key,
    Doanh_thu: revenueByYear[key],
  }));
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          {staffRole === "admin" ? (
            <>
              <Widget amount={numberOfHotels} type="hotel" />
              <Widget amount={numberOfRooms} type="room" />
              <Widget amount={numberOfPartner} type="partner" />
              <Widget amount={numberOfUser} type="user" />
            </>
          ) : (
            <>
              <Widget amount={numberOfReview} type="review" />
              <Widget amount={numberOfOrderByHotelId} type="order" />
              <Widget amount={numberOfRoomHotel} type="room" />
            </>
          )}
        </div>
        <div className="charts">
          <Featured data1={transformedDataYear} />
          <Chart
            title="Doanh thu theo tuần"
            data={transformedData}
            xDataKey="Tuần"
            aspect={2 / 1}
          />
          <Chart
            title="Doanh thu theo tháng"
            data={transformedDataMonth}
            xDataKey="Tháng"
            aspect={2 / 1}
          />
        </div>
        <div className="listContainer"></div>
      </div>
    </div>
  );
};

export default Home;