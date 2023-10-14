import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faBed,
  faCalendar,
  faCalendarDays,
  faChildren,
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faFaceFrown,
  faFaceSmileBeam,
  faHandPointRight,
  faLocationDot,
  faPerson,
  faSmileBeam,
  faSort,
  faSortDown,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { useContext, useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import useFetch1 from "../../hooks/useFetch1";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContex";
import { AuthContext } from "../../context/AuthContex";
import Reserve from "../../components/reserve/Reserve";
import { format } from "date-fns";
import { DateRange } from "react-date-range";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [soSlider, setSoSlider] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDetailReview, setOpenDetailReview] = useState(false);
  const [selectedReview, setSelectedReview] = useState("");
  console.log(selectedReview);
  const [openPanel, setOpenPanel] = useState(false);


  const { data, loading, error, reFetch } = useFetch(`/hotels/find/${id}`);
  const { data1, loading1, error1, reFetch1 } = useFetch1(
    `/hotels/review/${id}`
  );
  // console.log(data1);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates, options } = useContext(SearchContext);
  const [openDate, setOpenDate] = useState(false);
  const [selectedDates, setSelectedDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    Người_Lớn: 1,
    Trẻ_Em: 0,
    Phòng: 1,
  });

  const handleOption = (ten, hoatdong) => {
    setSelectedOptions((prev) => {
      return {
        ...prev,
        [ten]:
          hoatdong === "i"
            ? selectedOptions[ten] + 1
            : selectedOptions[ten] - 1,
      };
    });
  };

  

  //CHECK xem co phai dc open tu trang DETAIL khong ?
  const urlParams = new URLSearchParams(window.location.search);
  const fromDetail = urlParams.get("fromDetail");
  // console.log(fromDetail);

  const handleRebookRoom = async () => {
    window.location.reload();
    try {
      await localStorage.setItem("dates", JSON.stringify(selectedDates));
      await localStorage.setItem("options", JSON.stringify(selectedOptions));
    } catch (error) {}
  };

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const dayDifference = (date1, date2) => {
    const timeDiff = Math.abs(Date.parse(date2) - Date.parse(date1));
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  };

  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);
  const VND = (days * data.cheapestPrice * options.Phòng).toFixed(0);
  const handleOpen = (i) => {
    setSoSlider(i);
    setOpen(true);
  };

  const handleChuyen = (direction) => {
    let newSoSlider;

    if (direction === "l") {
      newSoSlider = soSlider === 0 ? 5 : soSlider - 1;
    } else {
      newSoSlider = soSlider === 5 ? 0 : soSlider + 1;
    }

    setSoSlider(newSoSlider);
  };

  const handleChuyen1 = (direction) => {
    const ul = ulRef.current;
    const liWidth = ul.children[0].offsetWidth;

    if (direction === "l") {
      ul.scrollBy(-liWidth, 0);
    } else if (direction === "r") {
      ul.scrollBy(liWidth, 0);
    }
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };
  const ulRef = useRef(null);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {fromDetail && (
        <div className="headerSearch1">
          <div className="headerSearchItem1">
            <FontAwesomeIcon icon={faHandPointRight} className="headerIcon1" />
            <p className="notify">
              Mời bạn thêm thời gian nghỉ và các lựa chọn phòng
            </p>
          </div>
          <div className="headerSearchItem1">
            <FontAwesomeIcon className="headerIcon" icon={faCalendarDays} />
            <span
              onClick={() => setOpenDate(!openDate)}
              className="headerSearchText"
            >{`${format(selectedDates[0].startDate, "dd/MM/yyyy")} 
                đến ${format(selectedDates[0].endDate, "dd/MM/yyyy")}`}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setSelectedDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={selectedDates}
                className="date1"
                minDate={new Date()}
              />
            )}
          </div>
          <div className="headerSearchItem1">
            <FontAwesomeIcon className="headerIcon" icon={faPerson} />
            <span
              onClick={() => setOpenOptions(!openOptions)}
              className="headerSearchText"
            >{`${selectedOptions.Người_Lớn} Người Lớn . ${selectedOptions.Trẻ_Em} Trẻ Em . ${selectedOptions.Phòng} Phòng `}</span>
            {openOptions && (
              <div className="options1">
                <div className="optionItem">
                  <span className="optionText">Người Lớn</span>
                  <div className="optionCounter">
                    <button
                      disabled={selectedOptions.Người_Lớn <= 1}
                      className="optionCounterButton"
                      onClick={() => handleOption("Người_Lớn", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">
                      {selectedOptions.Người_Lớn}
                    </span>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("Người_Lớn", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="optionItem">
                  <span className="optionText">Trẻ Em</span>
                  <div className="optionCounter">
                    <button
                      disabled={selectedOptions.Trẻ_Em <= 0}
                      className="optionCounterButton"
                      onClick={() => handleOption("Trẻ_Em", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">
                      {selectedOptions.Trẻ_Em}
                    </span>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("Trẻ_Em", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="optionItem">
                  <span className="optionText">Phòng</span>
                  <div className="optionCounter">
                    <button
                      disabled={selectedOptions.Phòng <= 1}
                      className="optionCounterButton"
                      onClick={() => handleOption("Phòng", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">
                      {selectedOptions.Phòng}
                    </span>
                    <button
                      disabled={selectedOptions.Phòng >= 5}
                      className="optionCounterButton"
                      onClick={() => handleOption("Phòng", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="headerSearchItem">
            <button className="headerBtn" onClick={handleRebookRoom}>
              Áp Dụng
            </button>
          </div>
        </div>
      )}

      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                className="dong"
                icon={faCircleXmark}
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                className="chuyen"
                icon={faCircleArrowLeft}
                onClick={() => handleChuyen("l")}
              />
              <div className="sliderWrapper">
                <img src={data.photos[soSlider]} alt="" className="sliderImg" />
              </div>
              <FontAwesomeIcon
                className="chuyen"
                icon={faCircleArrowRight}
                onClick={() => handleChuyen("r")}
              />
            </div>
          )}

          <div className="hotelWrapper">
            <button onClick={handleClick} className="datNgay">
              Đặt trước hoặc đặt ngay!
            </button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelDiaChi">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelKCach">Cách trung tâm {data.distance}km</span>
            <span className="hotelGiaHL">
              Đặt phòng hơn {data.cheapestPrice}VND tại chỗ nghỉ này và nhận
              taxi sân bay miễn phí
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={photo.id}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelChiTiet">
              <div className="hotelChiTietVB">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelChiTietGia">
                <h1>Hoàn hảo cho kì nghỉ {days}đêm!</h1>
                <span>
                  Nằm ở trung tâm thực sự của thành phố, khách sạn này có một
                  điểm vị trí tuyệt vời!
                </span>
                <h2>
                  <b>
                    Giá chỉ từ:{" "}
                    {(days * data.cheapestPrice * options.Phòng).toLocaleString(
                      "vi-VN",
                      {
                        style: "currency",
                        currency: "VND",
                      }
                    )}
                  </b>{" "}
                  ({days} đêm)
                </h2>
                <button onClick={handleClick}>Đặt trước hoặc Đặt ngay!</button>
              </div>
            </div>
          </div>
          <div style={{ width: "100%", maxWidth: "1024px" }}>
            <div>
              <div></div>
              <div className="page-section">
                <div className="property-reviews">
                  <div className="title-reviews">
                    <div className="wrap-title-reviews">
                      <div className="title-reviews-block">
                        Đánh giá của khách
                      </div>
                      <div>
                        <div className="point-hotel-container">
                          <button className="btn-see-all-reviews">
                            <div className="wrap-see-all-rv rv-setup">
                              <div className="review-score">
                                <div className="score_frame">{data.rating}</div>
                              </div>
                              <div>
                                <span className="font-reviews">Tuyệt hảo</span>
                                {data && data.reviews && (
                                  <span className="font-reviews number-review">
                                    · {data.reviews.length} đánh giá
                                  </span>
                                )}
                              </div>
                              <span onClick={() => setOpenPanel(true)} className="review-score-all">
                                <span  className="conf-font1">
                                  Đọc tất cả đánh giá
                                </span>
                              </span>
                            </div>
                          </button>
                        </div>
                      </div>
                      <div>
                        <div></div>
                        <div className="wrap-block-review">
                          <h3>Đọc xem khách yêu thích điều gì nhất:</h3>
                          <div className="container-content-review position-review">
                            <ul
                              className="list-review-scroll size"
                              tabIndex={0}
                              ref={ulRef}
                            >
                              {data1.map((item, index) => (
                                <li key={index} className="size-li">
                                  <div className="container-content">
                                    <div className="feature-view feature1 feature2">
                                      <div className="feauture-avatar">
                                        <div className="custom-avatar">
                                          <div className="wrap-avatar">
                                            {/* <span>{item.userName}</span> */}
                                            <picture className="avatar">
                                              <img
                                                className="img-userReview"
                                                loading="lazy"
                                                src={item.imgUser}
                                                alt=""
                                              />
                                            </picture>
                                          </div>
                                          <div className="wrap-name">
                                            <div className="name-user-review">
                                              {item.userName}
                                            </div>
                                            <div>
                                              <span className="timeReview">
                                                Ngày đánh giá: {item.timeReview}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="feauture-review-text">
                                        <div className="wrap-review-text">
                                          <div className="conf-font1 options-text">
                                            <span>"</span>
                                            {item.positive}
                                            <span>"</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="feauture-more">
                                        <button
                                          onClick={() => {
                                            const itemId = item._id;
                                            console.log(itemId);
                                            setOpenDetailReview(true);
                                            setSelectedReview(
                                              data1.find(
                                                (review) =>
                                                  review._id === itemId
                                              )
                                            );
                                          }}
                                          className="btn-detail-review btn-detail1 btn-detail2"
                                        >
                                          <span>Xem chi tiết</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                            <div className="wrap-btn-scroll">
                              <button
                                className="btn-scroll left-scroll"
                                type="button"
                                onClick={() => handleChuyen1("l")}
                              >
                                <span>
                                  <span className="wrap-btn-move-left">
                                    <FontAwesomeIcon icon={faAngleLeft} />
                                  </span>
                                </span>
                              </button>
                              <button
                                className="btn-scroll right-scroll"
                                type="button"
                                onClick={() => handleChuyen1("r")}
                              >
                                <span className="wrap-btn-move-right">
                                  <span>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                  </span>
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <button onClick={() => setOpenPanel(true)} className="color-btn-see-all-cmt">
                          <span>Đọc tất cả đánh giá</span>
                        </button>

                        {openDetailReview && selectedReview && (
                          <div className="wrap-review-detail setup-review-detail">
                            <div className="container-review-detail">
                              <div className="move1 move2">
                                <div className="modelOpen1">
                                  <div className="modelOpen2">
                                    <div className="padding1 padding2 padding3">
                                      <div className="wrap-btn-off-model">
                                        <button
                                          onClick={() =>
                                            setOpenDetailReview(false)
                                          }
                                          className="btn-off-model"
                                        >
                                          <span className="btn-off-model1">
                                            <span className="btn-off-model2">
                                              <FontAwesomeIcon icon={faXmark} />
                                            </span>
                                          </span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="block-detail-review">
                                    <div className="review">
                                      <div className="mr-review">
                                        <div className="review-avatar">
                                          <div className="avatar-user-review">
                                            <div className="img-review">
                                              <picture className="conf-img conf-img1">
                                                <img
                                                  src={selectedReview.imgUser}
                                                  loading="lazy"
                                                  alt=""
                                                />
                                              </picture>
                                            </div>
                                            <div className="name-review">
                                              <div className="name-reivewer">
                                                {selectedReview.userName}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="review-content">
                                          <div style={{ height: "100%" }}>
                                            <div className="list-detail-review">
                                              <div className="detail-review-time-point">
                                                <div className="status-timereview">
                                                  <div>
                                                    <div>
                                                      <span className="span-setup">
                                                        ngày đánh giá:{" "}
                                                        {
                                                          selectedReview.timeReview
                                                        }
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="title-review">
                                                    {selectedReview.ratingText}
                                                  </div>
                                                </div>
                                                <div className="point-review">
                                                  <div className="review-score">
                                                    <div className="wrap-review-score">
                                                      <div className="block-score">
                                                        {selectedReview.rating}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="container-review-positive-text">
                                                <div className="wrap-review-positive-text">
                                                  <div className="icon-positive">
                                                    <span className="wrap-icon-positive">
                                                      <FontAwesomeIcon
                                                        icon={faFaceSmileBeam}
                                                      />
                                                    </span>
                                                  </div>
                                                  <div className="space"></div>
                                                  <div className="wrap-content-review">
                                                    <div className="content-review">
                                                      {selectedReview.positive}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="container-review-negative-text">
                                                <div className="wrap-review-negative-text">
                                                  <div className="icon-negative">
                                                    <span className="wrap-icon-negative">
                                                      <FontAwesomeIcon
                                                        icon={faFaceFrown}
                                                      />
                                                    </span>
                                                  </div>
                                                  <div className="space"></div>
                                                  <div className="wrap-content-review">
                                                    <div className="content-review">
                                                      {selectedReview.negative}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          { openPanel && (
            <div className="container-panel">
            <div className="sliding-panel-widget is-shown">
              <div className="sliding-panel-widget-scrollable ">
                <div onClick={() => setOpenPanel(false)}  className="sliding-panel-widget-close-button">
                  <i className="bicon-aclose"></i>
                </div>
                <div className="sliding-panel-widget-content review_list_block one_col">
                  <div className="review_list_outer_container clearfix">
                    <div className="review_list_score_container lang_ltr scores_full_layout">
                      <div className="reviews_panel_header_score">
                        <div className="review-score-capla">
                          <div>
                            <div className="wrap-point">
                              <div className="block-point font-point">
                                {data.rating}
                              </div>
                              <div className="status-point">
                                <div className="font-point">Tuyệt hảo</div>
                                <div className="total-review">
                                  {data && data.reviews
                                    ? `${data.reviews.length} đánh giá`
                                    : "Không có đánh giá"}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="review-guidelines-capla">
                          Chúng tôi cố gắng mang đến 100% đánh giá thật
                        </div>
                      </div>
                    </div>
                    <div
                      className="review_list_container review-list--clean"
                      style={{ display: "block" }}
                    >
                      <div
                        id="review_list_page_container"
                        style={{ display: "block" }}
                      >
                        <div className="reviewlist-header bui-u-clearfix">
                          <h3
                            className="font-point1"
                            style={{ display: "inline-block" }}
                          >
                            Đánh giá của khách{" "}
                          </h3>
                          <span className="bui-form__group bui-u-pull-end">
                            <label
                              className="bui-form__labe"
                              htmlFor="review_sort"
                            >
                              Sắp xếp đánh giá theo:{" "}
                            </label>
                            <span className="bui-input-select">
                              <select
                                className="bui-form__control"
                                id="review_sort"
                              >
                                <option value="">Phù hợp nhất</option>
                                <option value="">Mới nhất</option>
                                <option value="">Cũ nhất</option>
                              </select>
                              <span className="bk-icon -streamline-arrow_menu bui-input-select__icon">
                                <FontAwesomeIcon icon={faSort} />
                              </span>
                            </span>
                          </span>
                        </div>
                        <ul className="review_list">
                          {data1.map((item, index) => (
                            <li
                              key={item._id}
                              className="review_list_new_item_block"
                            >
                              <div className="c-review-block">
                                <div className="bui-grid">
                                  <div className="bui-grid__column-3 c-review-block__left">
                                    <div className="c-review-block__row c-review-block__guest">
                                      <div className="c-guest bui-avatar-block">
                                        <div className="c-avatar bui-avatar ">
                                          <img
                                            className="bui-avatar__image"
                                            src={item.imgUser}
                                            alt=""
                                          />
                                        </div>
                                        <div className="bui-avatar-block__text">
                                          <span className="bui-avatar-block__title">
                                            {item.userName}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="c-review-block__row c-review-block__room-info-row         review-block__room-info--disabled">
                                      <ul className="bui-list bui-list--text bui-list--icon bui_font_caption">
                                        <li className="bui-list__item review-block__room-info--disabled">
                                          <span className="bui-list__icon">
                                            <FontAwesomeIcon
                                              style={{
                                                height: "16px",
                                                width: "16px",
                                              }}
                                              icon={faBed}
                                            />
                                          </span>
                                          <span></span>
                                          <div className="bui-list__body">
                                            {item.titleRoom}
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                    <ul className="bui-list bui-list--text bui-list--icon bui_font_caption c-review-block__row c-review-block__stay-date">
                                      <li className="bui-list__item">
                                        <span className="bui-list__icon">
                                          <FontAwesomeIcon
                                            style={{
                                              height: "16px",
                                              width: "16px",
                                            }}
                                            icon={faCalendar}
                                          />
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
                                          <FontAwesomeIcon
                                            style={{
                                              height: "16px",
                                              width: "16px",
                                            }}
                                            icon={faChildren}
                                          />
                                        </span>
                                        <div className="bui-list__body">
                                          Cặp đôi
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="bui-grid__column-9 c-review-block__right">
                                    <div className="c-review-block__row">
                                      <span className="c-review-block__date">
                                        Đã đánh giá: ngày 2 tháng 9 năm 2023
                                      </span>
                                      <div className="bui-grid">
                                        <div className="bui-grid__column-11">
                                          <h3 className=" c-review-block__title c-review__title--ltr   c-review-block__title c-review__title--ltr">
                                            {item.ratingText}
                                          </h3>
                                        </div>
                                        <div className="bui-grid__column-1 bui-u-text-right">
                                          <div className="bui-review-score c-score">
                                            <div className="bui-review-score__badge">
                                              {item.rating}
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
                                              <FontAwesomeIcon
                                                style={{
                                                  height: "15.75px",
                                                  width: "15.75px",
                                                }}
                                                icon={faSmileBeam}
                                              />
                                            </span>
                                            <span> · </span>
                                            <span className="c-review__body">
                                              {item.positive}
                                            </span>
                                          </p>
                                        </div>
                                        <div className="c-review__row">
                                          <p className="c-review__inner c-review__inner--ltr">
                                            <span className="c-review__prefix color-icon">
                                              <FontAwesomeIcon
                                                style={{
                                                  height: "15.75px",
                                                  width: "15.75px",
                                                }}
                                                icon={faFaceFrown}
                                              />
                                            </span>
                                            <span> · </span>
                                            <span className="c-review__body">
                                              {item.negative}
                                            </span>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}
          
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
