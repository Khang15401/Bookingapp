import "./navbar.css";
import {Link, useNavigate} from "react-router-dom"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContex";
import axios from "axios";
import { useRef } from "react";
import { useEffect } from "react";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleLogout = async () => {
    // window.localStorage.removeItem('user', null);
    // payload: res.data;
    try{
     await axios.post('/auth/logout');
     localStorage.setItem('user',null);
    //  dispatch({type: 'LOGOUT', payload:res.data});
    //  navigate("/login")
    } catch(err){
      console.log(err);
    } 
  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
        <span  className="logo">Kiawbooking</span>
        </Link>
        
        {user ? <>
          <div aria-expanded   className="user" onClick={() => setOpen(!open)}>Hello {user.username}</div>
         {open &&<div className="options">
            <>
            <Link className="link" to='/users'>Thông tin</Link>
            <Link className="link" to='/orders'>Booking</Link>
            <Link className="link" to='/login' onClick={handleLogout}>Đăng xuất</Link>
            </>
         </div>}
        </> 
        : (<div className="navItems">
            <Link to="/register">
              <button className="navButton">Đăng Ký</button>
            </Link>
            <Link to="/login">
              <button className="navButton"> Đăng Nhập</button>
            </Link>   
        </div>)}
        </div>
    </div>
  )
}

export default Navbar
