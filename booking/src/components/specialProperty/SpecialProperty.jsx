import useFetch from "../../hooks/useFetch";
import "./specialProperty.css"
import { Link } from "react-router-dom";

const SpecialProperty = () => {

  const {data, loading, error} = useFetch("/hotels?featured=true&limit=4");

  return (
    <div className="sp">
        {loading ? "Loading" : <>
        {data.map((item)=>(
            
            <div className="spItem" key={item._id}>
              <Link to={`/hotels/${item._id}`}>
                <img src={item.photos[0]}
                alt="" 
                className="spImg" 
                />
              </Link>
                <span className="spName">{item.name}</span>
                <span className="spCity">{item.city}</span>
                <span className="spGia">Giá chỉ từ {item.cheapestPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                {item.rating &&  <div className="spTitle">
                    <button>{item.rating}</button>
                    <span>Tuyệt hảo</span>
                </div>}
            </div>
        ))}
            </>}
    </div>
    
   
  )
}

export default SpecialProperty
