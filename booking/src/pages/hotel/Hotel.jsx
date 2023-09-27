import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faHandPointRight,
  faLocationDot,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
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

  const { data, loading, error, reFetch } = useFetch(`/hotels/find/${id}`);
  // const { data1, loading1, error1 } = useFetch(`/rooms/${}`);
  // console.log(data.rooms);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates, options } = useContext(SearchContext);
  // MOI
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
  // console.log(selectedDates);
  // console.log(selectedOptions);

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
  console.log(fromDetail);

  const handleRebookRoom = async () => {
    window.location.reload();
    try {
      await localStorage.setItem("dates", JSON.stringify(selectedDates));
      await localStorage.setItem("options", JSON.stringify(selectedOptions));
    } catch (error) {}
  };

  // const [dayNew, setDayNew] = useState(0);
  // const [price, setPrice] = useState(0);

  // Sử dụng useEffect để tính toán days khi selectedDates thay đổi
  // useEffect(() => {
  //   // Tính toán số ngày giữa startDate và endDate
  //   const startDate = selectedDates[0].startDate;
  //   const endDate = selectedDates[0].endDate;
  //   const timeDifference = endDate.getTime() - startDate.getTime();
  //   const daysDifference = timeDifference / (1000 * 3600 * 24); // Chuyển đổi milliseconds thành ngày

  //   // Cập nhật giá trị mới của days
  //   setDayNew(daysDifference);
  // }, [selectedDates]);

  // // Sử dụng useEffect để tính toán price khi days và selectedOptions thay đổi
  // useEffect(() => {
  //   // Tính toán giá dựa trên days và selectedOptions
  //   const calculatedPrice =
  //     dayNew *
  //     data.cheapestPrice *
  //     selectedOptions.Phòng *
  //     1.08;

  //   // Cập nhật giá trị mới của price
  //   setPrice(calculatedPrice);
  // }, [dayNew, selectedOptions]);
  // console.log(dayNew);
  // console.log(price);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const dayDifference = (date1, date2) => {
    const timeDiff = Math.abs(Date.parse(date2) - Date.parse(date1));
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  };

  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);
  // const day =  days * data.cheapestPrice * options.Phòng;
  // console.log(day);
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

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {fromDetail && (
        <div className="headerSearch1">
          <div className="headerSearchItem1">
            <FontAwesomeIcon icon={faHandPointRight} className="headerIcon1" />
            {/* <input
              type="text"
              placeholder="Mời bạn lựa chọn thời gian nghỉ và thêm các lựa chọn phòng"
              className="headerSearchInput"
              
            /> */}
            <p className="notify">Mời bạn thêm thời gian nghỉ và các lựa chọn phòng</p>
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
                <h1>Hoàn hảo cho kì nghỉ {days}- đêm!</h1>
                <span>
                  Nằm ở trung tâm thực sự của thành phố, khách sạn này có một
                  điểm vị trí tuyệt vời!
                </span>
                <h2>
                  <b>
                    Giá chỉ từ:{" "}
                    {(
                      days *
                      data.cheapestPrice *
                      options.Phòng
                    ).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </b>{" "}
                  ({days} đêm)
                </h2>
                <button onClick={handleClick}>Đặt trước hoặc Đặt ngay!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
