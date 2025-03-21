import { useEffect, useState } from "react"
import {  PRODUCT, PRODUCTS } from "../../../API/Api"
import { Axios } from "../../../API/Axios"
import Tables from "../../../Componants/Dashboaed/Table"

export default function Products() {

    // Table's Header in products page
    const ProductsHeader = [
        {name: 'ID' ,keyy: 'id'} ,
        {name: 'Images' ,keyy: 'images'},
        {name: 'Title' ,keyy: 'title'} ,
        {name: 'Description' ,keyy: 'description'} ,
        {name: 'Price' ,keyy: 'price'} ,
        {name: 'Rate' ,keyy: 'rating'} ,
        {name: 'Craeted' ,keyy: 'created_at'} ,
        {name: 'Updated' ,keyy: 'updated_at'} ,
    ]

    const Title = 'Products Page'

    // Table's data in products page
    const [Products , setProducts] = useState([])
    const [dataSent , setdatasent] = useState(false) // to stop the loading if there is no data

        // Paginate
        const [Page , setPage ] = useState(1) 
        const [ Limit , setLimit ] = useState(10)
        const [ Total , setTotal] = useState(0)


        const [loading , setloading] = useState(false)

    // Useeffect to get all products
    useEffect ( () => {
        setloading(true)
        Axios.
        get(`/${PRODUCTS}?limit=${Limit}&page=${Page}`)
        .then( (data) => {
            setProducts(data.data.data)
            setTotal(data.data.total)})
        .then( () => setdatasent(true) )
        .catch(err => (err) )
        .finally(() => setloading(false) )
    } , [Limit , Page]  )
    console.log(Products);

    // Delete funtion
    async function handleDelete(id) {
        await Axios.delete(`${PRODUCT}/${id}`)
            setProducts((previous) => previous.filter((item) => item.id !== id ) )
        }

    return (
    <div className=" w-100 p-2">
        <Tables 
            Limit = {Limit}
            setLimit = {setLimit}
            Page = {Page}
            ChoosedPage = {setPage}
            Total = {Total}
            Data={Products}
            Header={ProductsHeader} 
            Delete={handleDelete}
            dataSent ={dataSent}
            Title = {Title}
            link ={PRODUCT}
            Search= 'title'
            loading ={loading}
        />
    </div>
    )
}