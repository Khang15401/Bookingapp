import React from "react";
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Alert from "../../components/Alert/Alert";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ChildCareOutlinedIcon from "@mui/icons-material/ChildCareOutlined";
import SentimentVerySatisfiedOutlinedIcon from "@mui/icons-material/SentimentVerySatisfiedOutlined";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { AuthContext } from "../../context/AuthContex";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./detailReview.scss";
import toast from "react-hot-toast";

const DetailReview = ({}) => {
  const navigate = useNavigate();
  // const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const { reviewId } = useParams();
  console.log(reviewId);

  const managerHotel = JSON.parse(localStorage.getItem("user"));
  // console.log(managerHotelId);
  const staffRole = managerHotel.role;

  const { data, loading, error } = useFetch(`/reviews/${reviewId}`);
  const managerHotelId = data.hotelId;
  console.log(managerHotelId);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleDeleteRoom = async () => {
    try {
      await axios.delete(`/reviews/${reviewId}/${managerHotelId}`);
      toast.success("Xóa đánh giá thành công!");
      setTimeout(() => {
        navigate("/reviews");
      }, 700);
    } catch (err) {}
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <Alert />
        <div className="top">
          <h1>Chi tiết đánh giá</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <div className="c-review-block">
              <div className="bui-grid">
                <div className="bui-grid__column-3 c-review-block__left">
                  <div className="c-review-block__row c-review-block__guest">
                    <div className="c-guest bui-avatar-block">
                      <div className="c-avatar bui-avatar ">
                        <img
                          className="bui-avatar__image"
                          src={data.imgUser}
                          alt=""
                        />
                      </div>
                      <div className="bui-avatar-block__text">
                        <span className="bui-avatar-block__title">
                          {data.userName}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="c-review-block__row c-review-block__room-info-row         review-block__room-info--disabled">
                    <ul className="bui-list bui-list--text bui-list--icon bui_font_caption">
                      <li className="bui-list__item review-block__room-info--disabled">
                        <span className="bui-list__icon">
                          {/* <FontAwesomeIcon
                      style={{
                        height: "16px",
                        width: "16px",
                      }}
                      icon={faBed}
                    /> */}
                          <BedOutlinedIcon />
                        </span>
                        <span></span>
                        <div className="bui-list__body">{data.titleRoom}</div>
                      </li>
                    </ul>
                  </div>
                  <ul className="bui-list bui-list--text bui-list--icon bui_font_caption c-review-block__row c-review-block__stay-date">
                    <li className="bui-list__item">
                      <span className="bui-list__icon">
                        {/* <FontAwesomeIcon
                    style={{
                      height: "16px",
                      width: "16px",
                    }}
                    icon={faCalendar}
                  /> */}
                        <CalendarMonthOutlinedIcon />
                      </span>
                      <div className="bui-list__body">
                        1 đêm ·
                        <span className="c-review-block__date">
                          tháng 3/2023
                        </span>
                      </div>
                    </li>
                  </ul>
                  <ul className="bui-list bui-list--text bui-list--icon bui_font_caption review-panel-wide__traveller_type c-review-block__row">
                    <li className="bui-list__item">
                      <span className="bui-list__icon">
                        {/* <FontAwesomeIcon
                    style={{
                      height: "16px",
                      width: "16px",
                    }}
                    icon={faChildren}
                  /> */}
                        <ChildCareOutlinedIcon />
                      </span>
                      <div className="bui-list__body">Cặp đôi</div>
                    </li>
                  </ul>
                </div>
                <div className="bui-grid__column-9 c-review-block__right">
                  <div className="c-review-block__row">
                    <span className="c-review-block__date">
                      Đã đánh giá: {data.timeReview}
                    </span>
                    <div className="bui-grid">
                      <div className="bui-grid__column-11">
                        <h3 className=" c-review-block__title c-review__title--ltr   c-review-block__title c-review__title--ltr">
                          {data.ratingText}
                        </h3>
                      </div>
                      <div className="bui-grid__column-1 bui-u-text-right">
                        <div className="bui-review-score c-score">
                          <div className="bui-review-score__badge">
                            {data.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="c-review-block__row">
                    <div className="c-review">
                      <div className="c-review__row">
                        <p className="c-review__inner c-review__inner--ltr">
                          <span className="c-review__prefix c-review__prefix--color-green">
                            {/* <FontAwesomeIcon
                        style={{
                          height: "15.75px",
                          width: "15.75px",
                        }}
                        icon={faSmileBeam}
                      /> */}
                            <SentimentVerySatisfiedOutlinedIcon
                              style={{
                                height: "15.75px",
                                width: "15.75px",
                              }}
                            />
                          </span>
                          <span> · </span>
                          <span className="c-review__body">
                            {data.positive}
                          </span>
                        </p>
                      </div>
                      <div className="c-review__row">
                        {data.negative && (
                          <p className="c-review__inner c-review__inner--ltr">
                            <span className="c-review__prefix color-icon">
                              <SentimentDissatisfiedOutlinedIcon
                                style={{
                                  height: "15.75px",
                                  width: "15.75px",
                                }}
                              />
                            </span>
                            <span> · </span>
                            <span className="c-review__body">
                              {data.negative}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {staffRole === "admin" && (
            <button className="btn-delete-review" onClick={handleDeleteRoom}>Xóa đánh giá</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailReview;
