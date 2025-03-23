import { useEffect, useState } from "react"
import { Axios } from "../../../../API/Axios"
import { LATESTRODUCTS } from "../../../../API/Api"
import Showskelton from "../../Skelton/Showskelton"
import Product from "../SaleProducts/SaleProducts"


export default function LatestProducts() {

    //Skeleton
    const [Loading , setLoading]= useState(true)

    //Products
    const [Products , setProducts ] = useState([])
    useEffect( () => {
        Axios.get(`${LATESTRODUCTS}`)
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
            col='12'
            col2='12'
        />)

    return (
        <div className="col-md-6 col-12">
            <div className="ms-md-3">
            <div style={{display: 'flex' , justifyContent: 'center' }}>
                <h1 style={{ fontWeight: 'bold' , marginTop: '10px' , marginBottom: '-40px' , border: '1px solid black' , width:'300px' , textAlign: 'center'}}>
                    LATEST PRODUCTS
                </h1>
            </div>
                <div className="d-flex align-items-stretch justify-content-center flex-wrap mt-5 row-gap mb-5">
                    { Loading ? (
                        <>
                            <Showskelton height='300px' length='6' classes='col-12'/>
                        </>                
                    ) 
                        : (Showproducts)
                    }
                </div>
            </div>

        </div>
    )
}

// import { useEffect, useState } from "react"
// import { Axios } from "../../../../API/Axios"
// import { SALEPRODUCTS } from "../../../../API/Api"
// import Showskelton from "../../Skelton/Showskelton"
// import Product from "../SaleProducts/SaleProducts"


// export default function ShowLatestProducts() {

//     //Skeleton
//     // const [Loading , setLoading]= useState(true)

//     //Products
//     const [Products , setProducts ] = useState([])
//     useEffect( () => {
//         Axios.get(`${SALEPRODUCTS}`)
//         .then ( (res) => setProducts(res.data))
//         // .finally( () => setLoading(false))
//     } , [] )
//     console.log(Products);

//     const Showproducts = Products.map( (product) => 
//         <Product    
//             title={product.title} 
//             img={product.images[0].image} 
//             discount={product.discount} 
//             price={product.price}
//             description={product.description}
//             rating={product.rating}
//             sale
//         />)

//     return (
//         <div className="col-md-6 col-12 " style={{border: '2px solid #0D6EFD'}}>
//             <div className="ms-3">
//                 <h1 className="text-center m-0 p-3 bg-primary text-white">
//                         LATEST PRODUCTS
//                     </h1>
//                 <div className="p-5">
//                     {Showproducts}
//                     {/* { Loading ? (
//                         <>
//                             <Showskelton height='300px' length='8' classes='col-lg-3 col-md-6 col-12'/>
//                         </>                
//                     ) 
//                         : (Showproducts)
//                     } */}
//                 </div>
//             </div>

//         </div>
//     )
// }