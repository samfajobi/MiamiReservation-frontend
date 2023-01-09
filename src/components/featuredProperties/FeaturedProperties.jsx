import useFetch from "../hooks/fetchData";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  
  const { loading, error, data } = useFetch("http://localhost:4000/api/hotel?featured=true&limit=4")
  // console.log(data)
  // console.log(error)

  return (
    <div className="fp">
      { loading ? ("Loading.....") : 
      (
        <>
        { data.map( item => (
        <div className="fpItem" key={item._id}>
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
          alt=""
          className="fpImg"
        />
        <span className="fpName">{item.name}</span>
        <span className="fpCity">{item.city}</span>
        <span className="fpPrice">Starting from {item.price}</span> 
        <div className="fpRating">
          <button>{item.ratings}</button>
          <span>Excellent</span>
        </div>
      </div>)) } 
      </>)}
    </div>
  );
};

export default FeaturedProperties;
