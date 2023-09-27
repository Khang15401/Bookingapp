// import useFetch from "./useFetch";
// export const useHotelSearch = (destination1, min, max) => {
//     return useFetch(`/hotels?city=${destination1}&min=${min || 1}&max=${max || 9999999 }`);
//   };
import { useEffect, useState } from "react"
import axios from "axios";

const useFetch1 = (url) => {
    const [data1, setData1] = useState([])
    const [loading1, setLoading1] = useState(false)
    const [error1, setError1] = useState(false)

    useEffect(()=>{
        const fetchData1 = async ()=>{
            setLoading1(true)
            try {
               const res = await axios.get(url);
               setData1(res.data);
            }catch(err){
                setError1(err)
            }
            setLoading1(false)  
        };
    fetchData1();
    },[url])

    const reFetch1 = async ()=>{
        setLoading1(true)
        try {
           const res = await axios.get(url);
           setData1(res.data);
        }catch (err){
            setError1(err);
        }
        setLoading1(false);
    };

    return {data1, loading1, error1, reFetch1};
    
};

export default useFetch1;