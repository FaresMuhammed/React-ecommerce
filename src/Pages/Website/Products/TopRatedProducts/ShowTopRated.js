import { useEffect, useState } from "react"
import { Axios } from "../../../../API/Axios"
import { TOPRATED } from "../../../../API/Api"
import Showskelton from "../../Skelton/Showskelton"
import TopRated from "./TopRated"


export default function ShowTopRated() {

    //Skeleton
    const [Loading , setLoading]= useState(true)

    //Products
    const [Products , setProducts ] = useState([])
    useEffect( () => {
        Axios.get(`${TOPRATED}`)
        .then ( (res) => setProducts(res.data))
        .finally( () => setLoading(false))
    } , [] )
    console.log(Products);

    const Showproducts = Products.map( (product) => 
        <TopRated
            id={product.id}
            title={product.title} 
            img={product.images[0].image} 
            discount={product.discount} 
            price={product.price}
            description={product.description}
            rating={product.rating}
            sale
        />)

    return (
        <div className="col-md-6 col-12" style={{border: '2px solid #0D6EFD'}}>
                <h1 className="text-center m-0 p-3 bg-primary text-white">
                    TOP RATED
                </h1>
            <div className="p-5">

                { Loading ? (
                    <>
                        <Showskelton height='800px' length='1' classes='col-12'/>
                    </>                
                ) 
                    : (Showproducts)
                }

            </div>
        </div>
    )
}