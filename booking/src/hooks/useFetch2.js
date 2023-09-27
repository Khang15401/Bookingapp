// import useFetch from "./useFetch";
// export const useHotelSearch = (destination1, min, max) => {
//     return useFetch(`/hotels?city=${destination1}&min=${min || 1}&max=${max || 9999999 }`);
//   };
import { useEffect, useState } from "react"
import axios from "axios";

const useFetch2 = (url) => {
    const [data2, setData2] = useState([])
    const [loading2, setLoading2] = useState(false)
    const [error2, setError2] = useState(false)

    useEffect(()=>{
        const fetchData2 = async ()=>{
            setLoading2(true)
            try {
               const res = await axios.get(url);
               setData2(res.data);
            }catch(err){
                setError2(err)
            }
            setLoading2(false)  
        };
    fetchData2();
    },[url])

    const reFetch2 = async ()=>{
        setLoading2(true)
        try {
           const res = await axios.get(url);
           setData2(res.data);
        }catch (err){
            setError2(err);
        }
        setLoading2(false);
    };

    return {data2, loading2, error2, reFetch2};
    
};

export default useFetch2;