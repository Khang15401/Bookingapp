import "./navbarlo.css";
import {Link, useNavigate} from "react-router-dom"

const Navbarlo = () => {
    return (
        <div className="navbarlo">
          <div className="navContainerlo">
            {/* <Link to="/" style={{color:"inherit", textDecoration:"none"}}> */}
            <span  className="logolo">Kiawbooking</span>
            {/* </Link>   */}
          </div>
        </div>
      )
}

export default Navbarlo
