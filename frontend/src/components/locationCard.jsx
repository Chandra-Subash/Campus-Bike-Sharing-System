function LocationCard({ location }) {

  return (

    <div
      style={{
        border:"1px solid black",
        padding:"20px",
        width:"250px"
      }}
    >

      <h3>
        {location.name}
      </h3>

      <p>
        Available Bikes:
        {location.bikes}
      </p>

      <button>
        Book Ride
      </button>

    </div>
  );
}

export default LocationCard;