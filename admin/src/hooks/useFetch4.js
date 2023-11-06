// import useFetch from "./useFetch";
// export const useHotelSearch = (destination1, min, max) => {
//     return useFetch(`/hotels?city=${destination1}&min=${min || 1}&max=${max || 9999999 }`);
//   };
import { useEffect, useState } from "react"
import axios from "axios";

const useFetch4 = (url) => {
    const [data4, setData4] = useState([])
    const [loading4, setLoading4] = useState(false)
    const [error4, setError4] = useState(false)

    useEffect(()=>{
        const fetchData4 = async ()=>{
            setLoading4(true)
            try {
               const res = await axios.get(url);
               setData4(res.data);
            }catch(err){
                setError4(err)
            }
            setLoading4(false)  
        };
    fetchData4();
    },[url])

    const reFetch4 = async ()=>{
        setLoading4(true)
        try {
           const res = await axios.get(url);
           setData4(res.data);
        }catch (err){
            setError4(err);
        }
        setLoading4(false);
    };

    return {data4, loading4, error4, reFetch4};
    
};

export default useFetch4;