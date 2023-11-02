import "./navbarpartner.css";
import {Link, useNavigate} from "react-router-dom"

const NavbarPartner = () => {
    return (
        <div className="navbarPartner">
          <div className="navContainerPartner">
            {/* <Link to="/" style={{color:"inherit", textDecoration:"none"}}> */}
            <span  className="logoPartner">Kiawbooking</span>
            {/* </Link>   */}
          </div>
        </div>
      )
}

export default NavbarPartner
