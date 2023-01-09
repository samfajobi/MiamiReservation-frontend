import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../hooks/fetchData";
import { SearchContext } from "../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Reserve = ({setOpen, HotelId}) => {

  const { date } = useContext(SearchContext)
  const navigate = useNavigate() 
  
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`/hotel/room/${HotelId}`);
  console.log(data);  

  const handleCheck = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter( (item)  => item !== value))

  }

  
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const currentDate = new Date(start.getTime())

    const date = [];

    while(currentDate <= end) {
      date.push(new Date(currentDate).getTime());
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return date
  }

  const allDates = getDatesInRange(date[0]?.startDate, date[0]?.endDate);

  const isAvailable = (roomNum) => {
    const isFound = roomNum.unavailableDates.some(date => allDates.includes(new Date(date).getTime()) )

    return !isFound 
  }

  const handleClick = async () => {
    try {
      await Promise.all(selectedRooms.map(roomId => {
        const res =  axios.put(`/room/availability/${roomId}`, {
          dates: allDates,
        });
        return res.data
      }))

    } catch(err) {
      return err.message
    }
    setOpen(false);
    navigate("/");
  };

  console.log(getDatesInRange(date[0]?.startDate, date[0]?.endDate));
 
  return (
    <div>
        <div>
            <FontAwesomeIcon 
                icon={faCircleXmark}
                className="rclose"
                onClick={() => setOpen(false)} 
                />
              <span>Available Rooms:</span>  
              {data.map((item) => (
                <div>
                  <div>
                    <div>Title: {item.title}</div>
                    <div>Desc: {item.desc}</div>
                    <div>Max People: {item.maxNoPeople}</div>
                    <div>Price: {item.price}</div>
                  </div>
                  {item.roomNumbers.map(roomNum => (
                    <div>
                      <label>{roomNum.number}</label>
                      <input type="checkbox" disabled={!isAvailable(roomNum)} value={roomNum._id} onChange={handleCheck}/>
                    </div> )
                  )}   
                </div>
              ))}
              <button className="bg-blue-300" onClick={handleClick}>Reserve Now!!!</button>
        </div>
    </div>
  )
}

export default Reserve;