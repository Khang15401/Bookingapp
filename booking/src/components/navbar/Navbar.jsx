import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContex";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  // console.log(user);
  // const userStore = JSON.parse(localStorage.getItem("user"));
  // const userId = user._id;
  // const { data, loading, error, reFetch } = useFetch(`/users/${userId}`);
  // console.log(data)
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      localStorage.setItem("user", null);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Kiawbooking</span>
        </Link>

        {user ? (
          <>
            <div className="container-register-agent">
              <Link className="link1" to="/messenger">
                <FontAwesomeIcon style={{width:"20px", height: "19px"}} icon={faMessage} />
              </Link>

              <Link className="register-agent" to="/partner">
                <span>Đăng ký trở thành đối tác</span>
              </Link>
              <a className="register-agent" href="/partner">
              </a>
            </div>
            <div aria-expanded className="user" onClick={() => setOpen(!open)}>
              <div className="wrap-img">
                <picture>
                  <img className="img-user" src={user.img} alt="" />
                </picture>
              </div>
              {user.username}
            </div>
            {open && (
              <div className="options">
                <>
                  <Link className="link" to="/users">
                    Thông tin
                  </Link>
                  <Link className="link" to="/orders">
                    Booking
                  </Link>
                  <Link className="link" to="/changePassword">
                    Đổi mật khẩu
                  </Link>
                  <Link className="link" to="/login" onClick={handleLogout}>
                    Đăng xuất
                  </Link>
                </>
              </div>
            )}
          </>
        ) : (
          <div className="navItems">
            <Link to="/register">
              <button className="navButton">Đăng ký</button>
            </Link>
            <Link to="/login">
              <button className="navButton"> Đăng nhập</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
