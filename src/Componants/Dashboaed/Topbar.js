import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/Menucontext";
import { LOGOUT, USER } from "../../API/Api";
import { Axios } from "../../API/Axios";
import { DropdownButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import Cookie from "cookie-universal"
import { Navigate } from "react-router-dom";


export default function Topbar() {

    const cookie = Cookie()
    const menu = useContext(Menu)
    const toopen = menu.setOpen

    // To get user name
    const [Username , setUsername] = useState('')
    useEffect ( () => {
        Axios
        .get(`/${USER}`)
        .then( data => setUsername(data.data.name))
        .catch( () => Navigate( '/login' , {replace: true}))
    } , [] )

    // Logout function
    function Handlelogout() {
        Axios.get( `/${LOGOUT}`)
        window.location.pathname = '/login'
        cookie.remove('ecommerce')
    }
    // Home function
    function Home() {
        window.location.pathname = '/'
    }

    return (
    <div className="top-bar ">
        <div className="d-flex align-items-center justify-content-between h-100">
            <div className="d-flex align-items-center gap-3">
                <h1 style={{fontWeight: 'bold'}}>Dashboard</h1>
                <FontAwesomeIcon  icon={faBars} 
                    onClick={ () => toopen( prev => !prev )} 
                    cursor= {'pointer'} 
                    style={{backgroundColor: 'rgba(185, 185, 185, 0.6)' , padding: '7px', borderRadius: '20%' , marginBottom: '8px' }} />
            </div>
            <div >
                <DropdownButton  style={{width: '100px'}} title={Username}>
                    <DropdownItem onClick={Home} >Home page</DropdownItem>
                    <DropdownItem onClick={Handlelogout} >Logout</DropdownItem>
                </DropdownButton>
            </div>
        </div>
    </div>
    )
}