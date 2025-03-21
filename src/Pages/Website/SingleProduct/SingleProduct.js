import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import ImageGallery from "react-image-gallery";
import { Axios } from "../../../API/Axios";
import { PRODUCT } from "../../../API/Api";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import Showskelton from "../Skelton/Showskelton";
import { Cart } from "../../../Context/CartContext";
import AddRemoveButton from "./Add&RemoveButton";

export default function SingeProduct() {


    const [ProductImage , setProductImage] = useState([])
    const [Product , setProduct] = useState([])
    const {id} = useParams()
    const [Loading , setLoading] = useState(true)
    const [Count , setCount] =useState(5) // for carts num

    useEffect( () => {
        Axios.get(`${PRODUCT}/${id}`)
        .then((res) => {
            setProductImage(res.data[0].images.map( (img) => 
                {return { original: img.image, thumbnail: img.image }}
            )
        )
        setProduct(res.data[0])
        })
        .finally(()=> setLoading(false))
   } , [] )

    const RoundStart = Math.round(Product.rating)
    const Stars = Math.min(RoundStart, 5)
    const GoldStars = Array.from({length: Stars}).map( (_, index) => (
        <FontAwesomeIcon key={index} icon={solid} style={{color: 'gold'}}/>
    ))
    const EmptyStars = Array.from({length: 5 - Stars}).map( (_, index) => (
        <FontAwesomeIcon key={index} icon={regularStar}/>
    ))

    // Add to cart
    // Context to refresh cart direct in navbar
    const { setIsChanged } = useContext(Cart)

    const AddToCart = () =>{
        const Items = JSON.parse(localStorage.getItem('product')) || []

        // CHECKING (if product exist will increase count(wont add it again))
        const ProductExist = Items.findIndex((pro) => pro.id == id) 
        if (ProductExist !== -1) {
            if (Items[ProductExist].count) {
                Items[ProductExist].count += 1
            }else{
                Items[ProductExist].count = 2
            }
        } else {
            Items.push(Product)
        }
        localStorage.setItem('product' , JSON.stringify(Items))
        setIsChanged(prev => !prev)
    }


    return (
        <Container className="mt-5">
        <div className="d-flex align-items-start justify-content-center flex-wrap row-gap-5">

            {Loading ? (
                <div className="w-100">
                    <Showskelton height='200px' length='1' classes='col-12'/>
                        <div className="d-flex mt-1">
                            <Showskelton height='100px' length='1' classes='col-4'/>
                            <Showskelton height='100px' length='1' classes='col-4'/>
                            <Showskelton height='100px' length='1' classes='col-4'/>
                        </div>
                </div>
            )
            :(
            <>
                <div className="col-lg-4 col-md-6 col-12">
                        <ImageGallery items={ProductImage}/>
                </div>
                
                <div className="col-lg-8 col-md-6 col-12 ">
                    <div className="ms-5">
                        <h1>{Product.title}</h1>
                        <p style={ {color: 'grey'}}>{Product.About}</p>
                        <h3 className="fw-normal">{Product.description}</h3>


                    <div className="d-flex align-items-center justify-content-between pt-4 border-top flex-wrap">
                            <div>
                                {GoldStars}
                                {EmptyStars}
                                <div className="d-flex align-items-center gap-3">
                                    <h5 className="m-0 text-primary">{Product.price}$</h5>
                                    <h6 className="m-0" style={{ color: "gray", textDecoration: "line-through" }}>
                                        {Product.discount}$
                                    </h6>
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-4">
                                <AddRemoveButton setConut={ (data) => setCount(data)}/>
                                
                                <div onClick={AddToCart} className="border p-2 rounded">
                                    <img style={{cursor: 'pointer'}} 
                                    src={require("../../Website/Images/download.png")}
                                    alt="cart"
                                    width="25px"
                                    />
                                </div>

                            </div>
                            </div>
                        </div>
                        
                    </div>
                </>

                )
                
            }
        </div> 

        </Container>
    )
}