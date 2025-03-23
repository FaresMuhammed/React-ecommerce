import { useEffect, useState } from "react"
import { Axios } from "../../../../API/Axios"
import { SALEPRODUCTS } from "../../../../API/Api"
import Showskelton from "../../Skelton/Showskelton"
import Product from "./SaleProducts"


export default function Saleproducts() {

    //Skeleton
    const [Loading , setLoading]= useState(true)

    //Products
    const [Products , setProducts ] = useState([])
    useEffect( () => {
        Axios.get(`${SALEPRODUCTS}`)
        .then ( (res) => setProducts(res.data))
        .finally( () => setLoading(false))
    } , [] )
    console.log(Products);

    const Showproducts = Products.map( (product) => 
        <Product
            id={product.id}
            title={product.title} 
            img={product?.images[0]?.image} 
            discount={product.discount} 
            price={product.price}
            description={product.description}
            rating={product.rating}
            sale
            col='3'
            col2='6'
        />)

    return (
        <>
            <div style={{display: 'flex' , justifyContent: 'center' }}>
                <h1 style={{ fontWeight: 'bold' , marginTop: '20px' , marginBottom: '-40px' , border: '1px solid black' , width:'300px' , textAlign: 'center'}}>
                    TOP BIG DEALS
                </h1>
            </div>

            <div className="d-flex align-items-stretch justify-content-center flex-wrap mt-5 row-gap">
                { Loading ? (
                    <>
                        <Showskelton height='300px' length='8' classes='col-lg-3 col-md-6 col-12'/>
                    </>                
                ) 
                    : (Showproducts)
                }
            </div>
        </>
    )
}