// import useFetch from "./useFetch";
// export const useHotelSearch = (destination1, min, max) => {
//     return useFetch(`/hotels?city=${destination1}&min=${min || 1}&max=${max || 9999999 }`);
//   };
import { useEffect, useState } from "react"
import axios from "axios";

const useFetch3 = (url) => {
    const [data3, setData3] = useState([])
    const [loading3, setLoading3] = useState(false)
    const [error3, setError3] = useState(false)

    useEffect(()=>{
        const fetchData3 = async ()=>{
            setLoading3(true)
            try {
               const res = await axios.get(url);
               setData3(res.data);
            }catch(err){
                setError3(err)
            }
            setLoading3(false)  
        };
    fetchData3();
    },[url])

    const reFetch3 = async ()=>{
        setLoading3(true)
        try {
           const res = await axios.get(url);
           setData3(res.data);
        }catch (err){
            setError3(err);
        }
        setLoading3(false);
    };

    return {data3, loading3, error3, reFetch3};
    
};

export default useFetch3;