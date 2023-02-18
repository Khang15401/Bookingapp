import "./navbar.css";
import {Link, useNavigate} from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContex";
const Navbar = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate()

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
        <span  className="logo">Kiawbooking</span>
        </Link>
        
        {user ? "Xin Chào " + user.username : (<div className="navItems">
            <Link to="/register">
              <button className="navButton">Đăng Ký</button>
            </Link>
            <Link to="/login">
              <button className="navButton"> Đăng Nhập</button>
            </Link>   
        </div>)}
        {/* {user ? user.username:(<div className="navItems">
            <Link to="/login">
            <button onClick={handleLogout} className="navButton">Đăng xuất</button>
            </Link>
        </div>)} */}
      </div>
    </div>
  )
}

export default Navbar
