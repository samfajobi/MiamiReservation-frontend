import { useContext, useState } from "react";
import { AuthContext } from "../../components/context/AuthContext";
import { Link } from "react-router-dom";
import "./navbar.css"

const Navbar = () => {

  const { user } = useContext(AuthContext)

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/">
         <span className="logo">Miami Booking</span>
        </Link>

        {user ? user.userData.username : <div className="navItems"> 
          <button className="mx-5">Register</button>
          <button className="">Login</button>
        </div> }
      </div>
    </div>
  )
}

export default Navbar