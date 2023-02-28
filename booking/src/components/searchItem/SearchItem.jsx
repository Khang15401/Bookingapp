import "./searchItem.css"
import {Link} from "react-router-dom"

const SearchItem = ({item}) => {
  return (
    <div className="searchItem">
     <img src={item.photos[0]} 
     alt="" 
     className="siImg" 
     />
     <div className="siDesc">
     <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">Cách trung tâm {item.distance}km </span>
        <span className="siTaxiOp">Taxi sân bay miễn phí</span>
        <span className="siSubtitle">
        Studio Có Máy Điều Hòa
        </span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siHuyPhong">Miễn phí hủy</span>
        <span className="siTdeHuyPhong">
        Bạn có thể hủy sau, nên hãy đặt ngay hôm nay để có giá tốt.
        </span>
     </div>
     <div className="siChiTiet">
        
        <div className="siChiTietVb">
            <span className="siGia">{item.cheapestPrice}VND</span>
            {item.rating &&  <div className="siRating">
                <span>  </span>
                <button>{item.rating}</button>
            </div>}
            <span className="siThue">Đã bao gồm thuế và phí</span>
            <Link to={`/hotels/${item._id}`}>
            <button className="siNutKTra">Xem chỗ trống</button>
            </Link>
        </div>
     </div>
    </div>
  )
}

export default SearchItem
