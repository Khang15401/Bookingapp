import "./sidebar.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FormatListNumbered from "@mui/icons-material/FormatListNumbered";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import ListOutlined from "@mui/icons-material/ListOutlined";
import GradingIcon from '@mui/icons-material/Grading';
import { AuthContext } from "../../context/AuthContex";

const Sidebar = () => {
  
  const navigate = useNavigate()
  const handleLogout = () => {
    window.localStorage.removeItem('user');
    // payload: res.data;
    navigate("/login");
  }
  
  const { user } = useContext(AuthContext);
  
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
          <p className="title">Danh Sách</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Người dùng</span>
            </li>
          </Link>
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
          
          <p className="title">USER</p>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <li>
              <ExitToAppIcon className="icon" />
              {user && <span><button style={{ textDecoration: "none" }} onClick={handleLogout}>Đăng xuất</button></span>}
            </li>
          </Link>

          

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
