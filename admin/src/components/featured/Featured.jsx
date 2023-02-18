import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Tổng</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="title">Tổng doanh thu ngày</p>
        <p className="amount">10.000.000 VND</p>
        <p className="desc">
          Xử lý các giao dịch trước đó.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Mục Tiêu</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">60.000.000VND</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Cuối Tháng</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">45.000.000VND</div>
            </div>
          </div>
          {/* <div className="item">
            <div className="itemTitle">Cuối Tháng</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">80.000.000VND</div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Featured;
