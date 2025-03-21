import { useEffect, useState } from "react"
import { USER, USERS } from "../../../API/Api"
import { Axios } from "../../../API/Axios"
import Tables from "../../../Componants/Dashboaed/Table"

export default function Users() {
    
    // Table's Header in users page
    const UsersHeader = [
        {name: 'ID' ,keyy: 'id'} ,
        {name: 'User Name' , keyy: 'name'} ,
        {name: 'Email' , keyy: 'email'} ,
        {name: 'Role'  , keyy: 'role'},
        {name: 'Craeted' ,keyy: 'created_at'} ,
        {name: 'Last Login' ,keyy: 'updated_at'} ,
    ]

    const Title = 'Users Page'

    // Table's data in users page
    const [users , setusers] = useState([])                // to get all users
    const [currentUser , setcurrentUser] = useState('')    // to get current user

    // Paginate
    const [Page , setPage ] = useState(1) 
    const [ Limit , setLimit ] = useState(10)
    const [ Total , setTotal] = useState(0)


    const [loading , setloading] = useState(false)


    // Useeffect to get current user
    useEffect(() => {
        Axios
        .get(`${USER}`)
        .then( res => setcurrentUser(res.data))
    } , [] )

    // Useeffect to get all users
    useEffect ( () => {
        setloading(true)
        Axios.
        get(`/${USERS}?limit=${Limit}&page=${Page}`)
        .then( (data) => {
            setusers(data.data.data)
            setTotal(data.data.total)})
            .finally(() => setloading(false) )
            .catch(err => (err) )
    } , [Limit , Page]  )


    // Delete function
    async function handleDelete(id) {
        await Axios.delete(`${USER}/${id}`)
            setusers((previous) => previous.filter((item) => item.id !== id ) )  // To update users directly after delete
        }
    
    return (
    <div className=" w-100 p-2 shadow-sm">
        <Tables 
            Limit = {Limit}
            setLimit = {setLimit} 
            Page = {Page}
            ChoosedPage = {setPage}
            Total = {Total}
            Data={users}
            Header={UsersHeader} 
            currentUser={currentUser}
            Delete= {handleDelete}
            Title = {Title}
            link ={USER}
            Search= 'name'
            loading ={loading}
        />
    </div>
    )
}