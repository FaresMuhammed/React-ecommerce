import { useEffect, useState } from "react"
import { CATEGORIES, CATEGORY } from "../../../API/Api"
import { Axios } from "../../../API/Axios"
import Tables from "../../../Componants/Dashboaed/Table"

export default function Categories() {

    // Table's Header in categories page
    const CategoriesHeader = [
        {name: 'ID' ,keyy: 'id'} ,
        {name: 'Title' ,keyy: 'title'} ,
        {name: 'Image' ,keyy: 'image'} ,
        {name: 'Craeted' ,keyy: 'created_at'} ,
        {name: 'Updated' ,keyy: 'updated_at'} ,
    ]

    const Title = 'Categories Page'

    // Table's data in categories page
    const [Categoriess , setCategoriess] = useState([])
    const [dataSent , setdatasent] = useState(false)


    // Paginate
    const [Page , setPage ] = useState(1) 
    const [ Limit , setLimit ] = useState(10)
    const [ Total , setTotal] = useState(0)

    const [loading , setloading] = useState(false)

    // Useeffect to get all categories
    useEffect ( () => {
        setloading(true)
        Axios
        .get(`/${CATEGORIES}?limit=${Limit}&page=${Page}`) // you decide the limit per page and the page , and the backend divide them 
        .then( (data) => 
            {setCategoriess(data.data.data)
            setTotal(data.data.total)})  // to get products num from backend
        .then( () => setdatasent(true))
        .catch(err => (err) )
        .finally(() => setloading(false) ) // to stop the loading even if there is error
    } , [Limit , Page] )  // to run the useeffect after changing limit or page

    // Delete function
    async function handleDelete(id) {
        await Axios.delete(`${CATEGORY}/${id}`)
            setCategoriess((previous) => previous.filter((item) => item.id !== id ) )
        }

    return (
    <div className=" w-100 p-2">
            
            <Tables
                Limit = {Limit}
                setLimit = {setLimit}
                Page = {Page}
                ChoosedPage = {setPage}
                Total = {Total}
                Data={Categoriess}
                Header={CategoriesHeader} 
                Delete={handleDelete}
                dataSent ={dataSent}
                Title = {Title}
                link ={CATEGORY}
                Search= 'title'
                loading ={loading}  // the make loading in Table page
            />
        </div>
    )
}