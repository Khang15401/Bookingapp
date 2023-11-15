import "./sidebar.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FormatListNumbered from "@mui/icons-material/FormatListNumbered";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import ListOutlined from "@mui/icons-material/ListOutlined";
import GradingIcon from "@mui/icons-material/Grading";
import { AuthContext } from "../../context/AuthContex";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    window.localStorage.removeItem("user");
    // payload: res.data;
    window.localStorage.setItem("user", null);
    navigate("/login");
  };

  const { user } = useContext(AuthContext);
  const managerHotel = JSON.parse(localStorage.getItem("user"));
  const staffRole = managerHotel.role;
  console.log(staffRole);

  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Kiawadmin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Danh sách</p>
          {staffRole !== "staff" && (
            <Link to="/users" style={{ textDecoration: "none" }}>
              <li>
                <PersonOutlineIcon className="icon" />
                <span>Người dùng</span>
              </li>
            </Link>
          )}

          {staffRole === "admin" && (
            <>
              <Link to="/users/staff" style={{ textDecoration: "none" }}>
                <li>
                  <HandshakeOutlinedIcon className="icon" />
                  <span>Đối tác</span>
                </li>
              </Link>
              <Link to="/reviews" style={{ textDecoration: "none" }}>
                <li>
                  <RateReviewOutlinedIcon className="icon" />
                  <span>Đánh giá</span>
                </li>
              </Link>
            </>
          )}

          {staffRole === "staff" && (
            <>
              <Link to="/hotels" style={{ textDecoration: "none" }}>
                <li>
                  <StoreIcon className="icon" />
                  <span>Khách sạn</span>
                </li>
              </Link>
              <Link to="/rooms" style={{ textDecoration: "none" }}>
                <li>
                  <ListOutlined className="icon" />
                  <span>Phòng</span>
                </li>
              </Link>
              <Link to="/orders" style={{ textDecoration: "none" }}>
                <li>
                  <GradingIcon className="icon" />
                  <span>Lịch đặt phòng</span>
                </li>
              </Link>
              <Link to="/services" style={{ textDecoration: "none" }}>
                <li>
                  <FormatListNumbered className="icon" />
                  <span>Dịch vụ khách sạn</span>
                </li>
              </Link>
            </>
          )}

          {/* <p className="title">Người dùng</p>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <li>
              <ExitToAppIcon className="icon" />
              {user && (
                <span
                  style={{ textDecoration: "none", border: "0px #fff" }}
                  onClick={handleLogout}
                >
                  Đăng xuất
                </span>
              )}
            </li>
          </Link> */}

          {/* <Link to="/login" style={{ textDecoration: "none" }}>
            <li>
              <ExitToAppIcon className="icon" />
              {user && <span><button style={{ textDecoration: "none" }} onClick={handleLogout}>Profile</button></span>}
            </li>
          </Link> */}
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
