import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Axios } from '../../../API/Axios'
import { USER } from '../../../API/Api'
import Loading from '../../../Componants/Loading/Loading'
import { useNavigate } from 'react-router-dom'

export default function Updateuser() {

    const Nav = useNavigate()

    // To get id
    const ID = Number(window.location.pathname.replace('/dashboard/users/' , ''))

    // Usestates for inputs
    const [Name , setName] = useState('')
    const [Email , setEmail] = useState('')
    const [Role , setRole] = useState('')
    const [Load , setLoad] = useState(false)

    // To get user data and put it in the inputs
    useEffect (() => {
        setLoad(true)
        Axios
        .get(`${USER}/${ID}`)
        .then ( (data) => {
        setName(data.data.name)
        setEmail(data.data.email)
        setRole(data.data.role)
        setLoad(false)
    }).catch(() => Nav('/dashboard/users/page/404' , {replace: true})) // if there isn't user it will be error and go to error page and delete the last page
    } , [] )

    // Update function
    async function Handlesubmit(e) {
        setLoad(true)
        e.preventDefault()
        await Axios
        .post(`${USER}/edit/${ID}`  , {name: Name , email: Email , role: Role } )
        window.location.pathname = '/dashboard/users'
    }
    

    return (
            <>
                {Load && <Loading/> }

                <Form onSubmit={Handlesubmit} className='bg-white w-100 mx-2 p-3'>

                    <Form.Group className="mb-3" controlId="formBasicNameee">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" 
                        value={Name}
                        onChange={ (e) => setName(e.target.value) }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmailll">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email"
                        value={Email}
                        onChange={ (e) => setEmail(e.target.value) }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicRole">
                        <Form.Label>Role</Form.Label>
                        <Form.Select 
                            value={Role}
                            onChange={(e) => setRole(e.target.value)}>

                            <option disabled value=''>Select Role</option>
                            <option value='1995'>Admin</option>
                            <option value='2001'>User</option>
                            <option value='1999'>Product Maneger</option>
                        </Form.Select>
                    </Form.Group>

                    <Button disabled={Name.length > 1 && Email.length > 1 && Role !== '' ? false : true } className='d-flex ' variant="primary" type="submit">
                        Update
                    </Button>

                </Form>
            </>
    )
}