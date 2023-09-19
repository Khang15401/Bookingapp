import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContex";
import useFetch1 from "../../hooks/useFetch1";
const List = () => {
  const location = useLocation();
  const [isSearch, setIsSearch] = useState(false);
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [destination1, setDestination1] = useState("");   
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 1}&max=${max || 9999999}`
  );

  const { data1, loading1, error1, reFetch1 } = useFetch1(
    `/hotels?city=${destination1}&min=${min || 1}&max=${max || 9999999}`
  );
  const { dispatch } = useContext(SearchContext);

  const navigate = useNavigate();
  const handleClick = () => {
    reFetch1();
    dispatch({ type: "NEW_SEARCH", payload: { destination1, dates, options } });
    // dispatch({type: "RESET_SEARCH"});
    //     window.location.reload();
    // navigate("/", {state:{ destination, dates, options }});
    setIsSearch(true);  
    // localStorage.setItem('destination1',destination1);
    navigate("/hotels", { state: { destination1, dates, options } });
  };
  console.log(data1);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Tìm Kiếm</h1>
            <div className="lsItem">
              <label>Tên chỗ nghỉ / điểm đến:</label>
              <input
                // placeholder={localStorage.getItem('destination1') || destination }
                placeholder={ destination }
                onChange={(e) => setDestination1(e.target.value)}
                type="text"
              />
            </div>
            <div className="lsItem">
              <label>Ngày nhận phòng</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "dd/MM/yyyy"
              )} đến ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Lựa Chọn</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Giá thấp nhất <small>mỗi đêm</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Giá cao nhất <small>mỗi đêm</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Người Lớn</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.Người_Lớn}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Trẻ Em</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.Trẻ_Em}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Phòng</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.Phòng}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Tìm kiếm</button>
          </div>
          <div className="listKq">
            {/* {loading ? "loading" : <>
            {data.map(item=>( 
              <SearchItem item={item} key={item._id}/>
            ))}
            </>} */}
            {loading ? (
              "loading"
            ) : (
              <>
                {(data1.length > 0 ? data1 : data).map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
            {/* {loading1 ? (
              "loading"
            ) : (
              <>
                {isSearch
                  ? loading
                    ? "loading"
                    : data.map((item) => (
                        <SearchItem item={item} key={item._id} />
                      ))
                  : loading1
                  ? "loading"
                  : data1.map((item) => (
                      <SearchItem item={item} key={item._id} />
                    ))}
              </>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
