import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from  'cookie-universal'
import { useEffect, useState } from "react";
import { USER } from "../../../API/Api";
import Loading from "../../../Componants/Loading/Loading";
import { Axios } from "../../../API/Axios";
import Error403 from "../Errors/Error403";


export default function Requireauth({Allowedrole}) {

    const navigate = useNavigate()

    // To get token
    const cookie = Cookie()
    const token = cookie.get('ecommerce')

    // To get user's data
    const [ User , setUser ] = useState('')

    useEffect ( () => {
        Axios
        .get(`/${USER}` )
        .then( data => setUser(data.data))
        .catch( () => navigate( '/login' , {replace: true}))
    } , [] )
    console.log(User);

    // To protect routes from access without login & any cookie edit from user
    return token ? (
            User === '' ?
            (<Loading/>)
            : Allowedrole.includes(User.role) ?
            (<Outlet/>) :
            (<Error403 role={User.role}/>)
        ) : 
        (<Navigate to={'/login'} replace={true}/> )
}