import { useContext, useState } from "react";
import { AuthContext } from "../../components/context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {

    const {user, loading, error, dispatch} = useContext(AuthContext)

    const navigate = useNavigate()

    const [ credentials, setCredentials ] = useState({
        email: undefined,
        password: undefined
    })

    const handleChange = (e) => {
        setCredentials(prev=> ({...prev, [e.target.id]: e.target.value}))
    }

    const handleClick = async (e) => {
        e.preventDefault()
        dispatch({type: "LOGIN_START"})
        try {
            navigate("/")
            const res = await axios.post("http://localhost:4000/api/auth/login", credentials)
            dispatch({type: "LOGIN_SUCCESS", payload: res.data})
        } catch(err) {
            dispatch({type: "LOGIN_FAILED", payload: err.response })
        }
    }   

    console.log(user)
    
   
    return ( 
        <div className=""> 
          <div>
            <input className="mx-9" type="text" onChange={handleChange} id ="email" placeholder="Email"/>
            <input type="password" onChange={handleChange} id="password" placeholder="Password"/>
          </div>  
          <button disabled={loading} onClick={handleClick}>Submit</button>  
          {error && <span>{error}</span>}
        </div>

    )  
}


export default Login;