import "./hotel.css"
import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import MailList from "../../components/mailList/MailList"
import Footer from "../../components/footer/Footer"
import { useContext, useState } from "react"
import useFetch from "../../hooks/useFetch"
import { useLocation, useNavigate } from "react-router-dom"
import { SearchContext } from "../../context/SearchContex"
import { AuthContext } from "../../context/AuthContex"
import Reserve from "../../components/reserve/Reserve"


const Hotel = () => {
  const location = useLocation()
  const id = location.pathname.split("/")[2];
  const [soSlider,setSoSlider] = useState(0);
  const [open,setOpen] = useState(false);
  const [openModal,setOpenModal] = useState(false);

  const {data, loading, error, reFetch} = useFetch(`/hotels/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()
  
  const {dates, options} = useContext(SearchContext)


  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const dayDifference = (date1, date2)=>{
    const timeDiff = Math.abs(Date.parse(date2) - Date.parse(date1));
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  };

  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);


const handleOpen = (i) => {
  setSoSlider(i);
  setOpen(true);
}

const handleChuyen = (direction) => {
  let newSoSlider;

  if(direction==="l"){
    newSoSlider = soSlider === 0 ? 5 : soSlider-1;
  }else{
    newSoSlider = soSlider === 5 ? 0 : soSlider+1;
  }

  setSoSlider(newSoSlider)
};

  const handleClick = () => {
    if (user){
      setOpenModal(true);

    } else {
      navigate("/login");
    }
  }
  
  return (
    <div>
      <Navbar/>
      <Header type="list"/>
      {loading ? (
        "loading" 
      ) : (
        <div className="hotelContainer">
        {open && <div className="slider">
          <FontAwesomeIcon className="dong" icon={faCircleXmark} onClick={()=>setOpen(false)}/>
          <FontAwesomeIcon className="chuyen" icon={faCircleArrowLeft}  onClick={()=> handleChuyen("l")}/>
          <div className="sliderWrapper">
            <img 
            src={data.photos[soSlider]} 
            alt="" 
            className="sliderImg" />
          </div>
          <FontAwesomeIcon className="chuyen" icon={faCircleArrowRight} onClick={()=> handleChuyen("r")}/>
        </div>}
        <div className="hotelWrapper">
          <button onClick={handleClick} className="datNgay">?????t tr?????c ho???c ?????t ngay!</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelDiaChi">
            <FontAwesomeIcon icon={faLocationDot}/>
            <span>{data.address}</span>
          </div>
          <span className="hotelKCach">
            C??ch trung t??m {data.distance}km
          </span>
          <span className="hotelGiaHL">
          ?????t ph??ng h??n {data.cheapestPrice}VND t???i ch??? ngh??? n??y v?? nh???n taxi s??n bay mi???n ph??
          </span>
          <div className="hotelImages">
            {data.photos?.map((photo,i)=>(
              <div className="hotelImgWrapper">
                <img onClick={()=>handleOpen(i)} src={photo} alt="" className="hotelImg" />
              </div>
            ))}
          </div>
          <div className="hotelChiTiet">
            <div className="hotelChiTietVB">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">
                {data.desc}
              </p>
            </div>
            <div className="hotelChiTietGia">
            <h1>Ho??n h???o cho k?? ngh??? {days}- ????m!</h1>
              <span>
                N???m ??? trung t??m th???c s??? c???a th??nh ph???, kh??ch s???n n??y c?? m???t
                ??i???m v??? tr?? tuy???t v???i!
              </span>
              <h2>
                <b>T???ng chi ph??: {days * data.cheapestPrice * options.Ph??ng} VND</b> ({days} ????m)
              </h2>
              <button onClick={handleClick}>?????t tr?????c ho???c ?????t ngay!</button>
            </div>
          </div>
        </div>
        <MailList/>
        <Footer/>
      </div>
      )}
      {openModal && <Reserve setOpen = {setOpenModal} hotelId={id}/>}
    </div>
  );
};

export default Hotel
