import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './bars.css'
import { NavLink, Navigate } from 'react-router-dom'
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/Menucontext";
import { WindowSize } from '../../Context/Windowcontext';
import { Links } from './Navlink';
import { Axios } from '../../API/Axios';
import { USER } from '../../API/Api';

export default function Sidebar() {

    const menu = useContext(Menu)
    const Isopen = menu.Open

    const WindowContext = useContext(WindowSize)
    const windowSize = WindowContext.windowSize

    // To get userrole
    const [UserRole , setUserRole] = useState('')
    useEffect ( () => {
        Axios
        .get(`/${USER}`)
        .then( data => setUserRole(data.data.role))
        .catch( () => Navigate( '/login' , {replace: true}))
    } , [] )

    return (
        <>
            <div style={{
                position: 'fixed',
                top: '70px',
                left: '0',
                width: '100%',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                display: windowSize < '768' && Isopen ? 'block' : 'none'
            }}>
            </div>

            <div className='side-bar pt-3'
                style={{
                    left: windowSize < '768' ? (Isopen ? 0 : '-100%' ) : 0 ,
                    width: Isopen ? '215px' : '64px',
                    transition: '.7s' ,
                    position: windowSize < '768'? 'fixed' : 'sticky'}}>

                {/* navlink have class (active) */}
                {Links.map( (Link , key) => (
                    
                    Link.role.includes(UserRole) && (
                        <NavLink    
                            key={key}
                            to={Link.path}
                            className='d-flex align-items-center gap-2 side-bar-link'
                        >

                        <FontAwesomeIcon 
                            icon={Link.icon}
                            style={{padding: Isopen ? '15px 8px 15px 15px' :'15px'}}
                        />
                        
                        <p className='m-0' style={{display: Isopen ? 'block' : 'none'}}>
                            {Link.name}
                        </p>
                        </NavLink>)
                ))}
            </div>
        </>
    )
}