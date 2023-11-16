import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContex";
import { useState } from "react";
import { Link } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const ImgUser = user.img;

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      localStorage.setItem("user", null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          {/* <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon /> */}
        </div>
        <div className="items">
          {/* <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div> */}
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>

          <div className="item" onClick={() => setOpen(!open)}>
            <div className="wrap-img">
              <picture>
                <img
                  src={ImgUser}
                  // src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                  className="avatar"
                />
              </picture>
            </div>
            <div className="username">{user.username}</div>
          </div>

          {open && (
            <div className="options">
              <>
                <Link className="link" to="/profile">
                  <a
                    style={{ textDecoration: "none", color: "inherit" }}
                    href="/profile"
                  >
                    Thông tin
                  </a>
                </Link>
                <Link className="link" to="/changePassword">
                  <a
                    style={{ textDecoration: "none", color: "inherit" }}
                    href="/changePassword"
                  >
                    Đổi mật khẩu
                  </a>
                </Link>
                <Link className="link" onClick={handleLogout} to="/login">
                  Đăng xuất
                </Link>
              </>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
