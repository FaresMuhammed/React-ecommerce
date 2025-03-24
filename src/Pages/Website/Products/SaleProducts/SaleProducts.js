import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slicedata from "..//../../../API/Helpers/Slice";
import { NavLink } from "react-router-dom";

export default function Product(props) {

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
            <NavLink to={`/product/${props.id}`} className={`col-lg-${props.col} col-md-${props.col2} col-12 p-2`}>
                
                <div className="m-1 border rounded p-3 h-100 d-flex flex-column justify-content-between">
                    <div>
                        <p className="text-truncate " style={{ color: "gray" }}>
                            {Slicedata(props.title, 35)}
                        </p>
                        <p className="text-truncate text-black">
                            {props.description}
                        </p>
                        <div className="px-5 py-4 position-relative">

                        {props.sale &&  
                            <p className="m-0 position-absolute top-0 start-0 bg-primary rounded-circle text-white text-uppercase d-inline-block text-center"
                                style={{ width: "50px", height: "50px", lineHeight: "50px" }}>
                                SALE
                            </p>}
                            <div className="w-100" 
                                style={{backgroundImage: `url('${"https://react-ecommerce-backend-production-f88d.up.railway.app" + props.img}')`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        height: '200px',
                                        width: '100%'}}>
                            </div>

                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between pt-4 border-top">
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
            </NavLink>
    )
}