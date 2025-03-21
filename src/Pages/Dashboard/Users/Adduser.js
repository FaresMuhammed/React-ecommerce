import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Axios } from '../../../API/Axios'
import { USER } from '../../../API/Api'
import Loading from '../../../Componants/Loading/Loading'

export default function Adduser() {

    // Usestates
    const [Upadateform , setUpdateform] = useState({
        Name: '',
        Email: '',
        Password: '',
        Role: ''
    })
    const [Load , setLoad] = useState(false)


    // Input function
    function Onchange(e) {
        setUpdateform({...Upadateform , [e.target.name]: e.target.value})
    }

    // Add function
    async function Handlesubmit(e) {
        setLoad(true)
        e.preventDefault()
        await Axios
        .post(`${USER}/add` , {name: Upadateform.Name , email: Upadateform.Email , password: Upadateform.Password , role: Upadateform.Role })
        window.location.pathname = '/dashboard/users'
    }
    

    return (
            <>
                {Load && <Loading/> }

                <Form onSubmit={Handlesubmit} className='bg-white w-100 mx-2 p-3'>

                    <Form.Group className="mb-3" controlId="formBasicNameee">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" 
                        name='Name'
                        value={Upadateform.Name}
                        onChange={Onchange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmailll">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                        name='Email'
                        value={Upadateform.Email}
                        onChange={Onchange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPass">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password"
                        name='Password'
                        value={Upadateform.Password}
                        onChange={Onchange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicRole">
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                        name='Role'
                        value={Upadateform.Role}
                        onChange={Onchange}
                            >
                            <option disabled value=''>Select Role</option>
                            <option value='1995'>Admin</option>
                            <option value='2001'>User</option>
                            <option value='1999'>Product Maneger</option>
                        </Form.Select>
                    </Form.Group>
                    
                    <Button disabled={Upadateform.Name.length > 1 && Upadateform.Email.length > 1 && Upadateform.Password.length > 6 && Upadateform.Role !== '' ? false : true } className='d-flex ' variant="primary" type="submit">
                        Add
                    </Button>

                </Form>
            </>
    )
}