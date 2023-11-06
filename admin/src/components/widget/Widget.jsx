import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import BedroomChildOutlinedIcon from "@mui/icons-material/BedroomChildOutlined";
import MapsHomeWorkOutlinedIcon from "@mui/icons-material/MapsHomeWorkOutlined";

const Widget = ({ type, amount, diff }) => {
  const managerHotel = JSON.parse(localStorage.getItem("user"));
  const staffRole = managerHotel.role;

  let data;

  //temporary
  // const amount = 100;
  // const diff = 20;

  if (staffRole === "admin") {
    switch (type) {
      case "user":
        data = {
          title: "Người dùng",
          isMoney: false,
          link: "See all users",
          icon: (
            <PersonOutlinedIcon
              className="icon"
              style={{
                color: "crimson",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
              }}
            />
          ),
        };
        break;

      case "partner":
        data = {
          title: "Đối tác",
          isMoney: false,
          link: "See all partners",
          icon: (
            <PersonOutlinedIcon
              className="icon"
              style={{
                backgroundColor: "rgba(128, 0, 128, 0.2)",
                color: "purple",
              }}
            />
          ),
        };
        break;

      case "order":
        data = {
          title: "Đơn đặt",
          isMoney: false,
          link: "View all orders",
          icon: (
            <ShoppingCartOutlinedIcon
              className="icon"
              style={{
                backgroundColor: "rgba(218, 165, 32, 0.2)",
                color: "goldenrod",
              }}
            />
          ),
        };
        break;
      case "hotel":
        data = {
          title: "Khách sạn",
          isMoney: false,
          link: "View add hotels",
          icon: (
            <MapsHomeWorkOutlinedIcon
              className="icon"
              style={{
                backgroundColor: "rgba(0, 128, 0, 0.2)",
                color: "green",
              }}
            />
          ),
        };
        break;
      case "room":
        data = {
          title: "Loại phòng",
          isMoney: false,
          link: "See details",
          icon: (
            <BedroomChildOutlinedIcon
              className="icon"
              style={{
                backgroundColor: "rgba(218, 165, 32, 0.2)",
                color: "goldenrod",
              }}
            />
          ),
        };
        break;
      default:
        break;
    }
  } else if (staffRole === "staff") {
    switch (type) {
      case "revenue":
        data = {
          title: "Doanh thu",
          isMoney: true,
          link: "See all users",
          icon: (
            <PersonOutlinedIcon
              className="icon"
              style={{
                color: "crimson",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
              }}
            />
          ),
        };
        break;

      case "review":
        data = {
          title: "Đánh giá",
          isMoney: false,
          link: "See all partners",
          icon: (
            <PersonOutlinedIcon
              className="icon"
              style={{
                backgroundColor: "rgba(128, 0, 128, 0.2)",
                color: "purple",
              }}
            />
          ),
        };
        break;

      case "order":
        data = {
          title: "Đơn đặt phòng",
          isMoney: false,
          link: "View all orders",
          icon: (
            <ShoppingCartOutlinedIcon
              className="icon"
              style={{
                backgroundColor: "rgba(218, 165, 32, 0.2)",
                color: "goldenrod",
              }}
            />
          ),
        };
        break;

      case "room":
        data = {
          title: "Loại phòng",
          isMoney: false,
          link: "See details",
          icon: (
            <BedroomChildOutlinedIcon
              className="icon"
              style={{
                backgroundColor: "rgba(218, 165, 32, 0.2)",
                color: "goldenrod",
              }}
            />
          ),
        };
        break;
      default:
        break;
    }
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {amount}
        </span>
        <span className="link"></span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
