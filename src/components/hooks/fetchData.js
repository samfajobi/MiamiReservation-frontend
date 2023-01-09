import {useState, useEffect } from 'react';
import axios from 'axios';


const useFetch = (url) => {
    const [data, setData ] = useState([]);
    const [loading, setLoading ] =  useState(false);
    const [error, setError] = useState(false);
    
    
    useEffect( () => {
       const fetchData = async () => {
        setLoading(true);
        try{
            const res = await axios.get(url);   
            setData(res.data)
    
        } catch(err) {
            setError(err.message)
        }  
        setLoading(false)
     }
     fetchData()
    }, [url])

    const reFetch = async () => {
        try{
            setLoading(true);
            const res = await axios.get(url) 
            setData(res.data)
        } catch(err) {
            setError(err.message) 
        }
        setLoading(false);
    }

    return { loading, error, data, reFetch}
} 


export default useFetch;