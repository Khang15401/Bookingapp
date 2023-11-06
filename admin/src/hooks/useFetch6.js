// import useFetch from "./useFetch";
// export const useHotelSearch = (destination1, min, max) => {
//     return useFetch(`/hotels?city=${destination1}&min=${min || 1}&max=${max || 9999999 }`);
//   };
import { useEffect, useState } from "react"
import axios from "axios";

const useFetch6 = (url) => {
    const [data6, setData6] = useState([])
    const [loading6, setLoading6] = useState(false)
    const [error6, setError6] = useState(false)

    useEffect(()=>{
        const fetchData6 = async ()=>{
            setLoading6(true)
            try {
               const res = await axios.get(url);
               setData6(res.data);
            }catch(err){
                setError6(err)
            }
            setLoading6(false)  
        };
    fetchData6();
    },[url])

    const reFetch6 = async ()=>{
        setLoading6(true)
        try {
           const res = await axios.get(url);
           setData6(res.data);
        }catch (err){
            setError6(err);
        }
        setLoading6(false);
    };

    return {data6, loading6, error6, reFetch6};
    
};

export default useFetch6;