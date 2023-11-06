// import useFetch from "./useFetch";
// export const useHotelSearch = (destination1, min, max) => {
//     return useFetch(`/hotels?city=${destination1}&min=${min || 1}&max=${max || 9999999 }`);
//   };
import { useEffect, useState } from "react"
import axios from "axios";

const useFetch5 = (url) => {
    const [data5, setData5] = useState([])
    const [loading5, setLoading5] = useState(false)
    const [error5, setError5] = useState(false)

    useEffect(()=>{
        const fetchData5 = async ()=>{
            setLoading5(true)
            try {
               const res = await axios.get(url);
               setData5(res.data);
            }catch(err){
                setError5(err)
            }
            setLoading5(false)  
        };
    fetchData5();
    },[url])

    const reFetch5 = async ()=>{
        setLoading5(true)
        try {
           const res = await axios.get(url);
           setData5(res.data);
        }catch (err){
            setError5(err);
        }
        setLoading5(false);
    };

    return {data5, loading5, error5, reFetch5};
    
};

export default useFetch5;