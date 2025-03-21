import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slicedata from "../../../../API/Helpers/Slice";
import { NavLink } from "react-router-dom";

export default function TopRated(props) {

    //Rating
    const RoundStart = Math.round(props.rating)
    const Stars = Math.min(RoundStart, 5)
    const GoldStars = Array.from({length: Stars}).map( (_, index) => (
        <FontAwesomeIcon key={index} icon={solid} style={{color: 'gold'}}/>
    ))
    const EmptyStars = Array.from({length: 5 - Stars}).map( (_, index) => (
        <FontAwesomeIcon key={index} icon={regularStar}/>
    ))

    return (
                <NavLink to={`/product/${props.id}`} className="col-12 border-bottom d-flex align-items-start flex-wrap mb-2 justify-content-center" >
                    <div className="d-flex">
                    <div className="col-md-4 col-12" 
                        style={{backgroundImage: `url('${props.img}')`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        height: '200px',
                        width:'165px'
                        }}>
                    </div>
                    
                    <div className="m-1 border rounded p-3 h-100 d-flex flex-column justify-content-between">
                        <div>
                            <p className="text-truncate" style={{ color: "gray" }}>
                                {Slicedata(props.title, 35)}
                            </p>
                            <p className="text-truncate text-black">
                                {props.description}
                            </p>
                        <div/>

                    <div className="d-flex align-items-center justify-content-between pt-4">
                        <div>
                            {GoldStars}
                            {EmptyStars}
                            <div className="d-flex align-items-center gap-3">
                                <h5 className="m-0 text-primary">{props.price}$</h5>
                                <h6 className="m-0" style={{ color: "gray", textDecoration: "line-through" }}>
                                    {props.discount}$
                                </h6>
                            </div>
                        </div>
                        <div className="border p-2 rounded">
                            <img
                            src={require("../../../Website/Images/download.png")}
                            alt="cart"
                            width="25px"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </NavLink>
    )
}