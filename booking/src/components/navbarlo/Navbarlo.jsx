import "./navbarlo.css";
import {Link, useNavigate} from "react-router-dom"

const Navbarlo = () => {
    return (
        <div className="navbarlo">
          <div className="navContainerlo">
            {/* <Link to="/" style={{color:"inherit", textDecoration:"none"}}> */}
            <span  className="logolo">Kiawbooking</span>
            <a target="_blank" className="btn-login-manager" href="http://localhost:3001/login">
              <span>Đăng nhập</span>
            </a>
            {/* <Link>
            </Link> */}
            {/* </Link>   */}
          </div>
        </div>
      )
}

export default Navbarlo
