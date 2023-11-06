import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useEffect, useState } from "react";
import useFetch3 from "../../hooks/useFetch3";
import useFetch4 from "../../hooks/useFetch4";

const Featured = () => {

  const managerHotel = JSON.parse(localStorage.getItem("user"));
  const staffRole = managerHotel.role;
  const hotelId = managerHotel.hotelId;
  console.log(hotelId);

  const { data3, loading3, error3 } = useFetch3(`/orders`);
  console.log(data3);

  const { data4, loading4, error4 } = useFetch4(`/orders/filter/${hotelId}`);
  console.log(data4);

  const [revenueByWeek, setRevenueByWeek] = useState({});
  const [revenueByMonth, setRevenueByMonth] = useState({});
  const [revenueByYear, setRevenueByYear] = useState({});
  

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

  const transformedDataYear = Object.keys(revenueByYear).map((key) => ({
    Năm: key,
    Doanh_thu: revenueByYear[key],
  }));

  // console.log(transformedDataYear[0].Năm);
  // if (transformedDataYear.length > 0) {
  //   console.log(transformedDataYear[0].Năm);
  // } else {
  //   console.log("Mảng transformedDataYear trống.");
  // }

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Tổng</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        {/* <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div> */}
        {/* <p className="title">Tổng doanh thu năm </p>
        <p className="amount"> VND</p> */}
        <p className="title">
          Tổng doanh thu năm {Object.keys(revenueByYear)}:
        </p>
        <p className="amount">{revenueByYear["2023"]}</p>

        <p className="desc">Xử lý các giao dịch trước đó.</p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Mục Tiêu</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">60.000.000VND</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Cuối Tháng</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">45.000.000VND</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
