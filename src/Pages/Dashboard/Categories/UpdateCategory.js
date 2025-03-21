import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Axios } from '../../../API/Axios'
import { CATEGORY } from '../../../API/Api'
import Loading from '../../../Componants/Loading/Loading'
import { useNavigate, useParams } from 'react-router-dom'

export default function UpdateCategory() {

    const Nav = useNavigate() 

    const {id} = useParams() // To get ID by react ,, it gets the id in object (the num after : in app) ,, to get anything from object but it in {}

    const [Title , setTitle] = useState('')
    const [Image , setImage] = useState('')
    const [Load , setLoad] = useState(false)


    async function Handlesubmit(e) {
        setLoad(true)
        e.preventDefault()

        const Form = new FormData()
        Form.append('title', Title)
        Form.append('image', Image)
        
        await Axios
        .post(`${CATEGORY}/edit/${id}` , Form )
        window.location.pathname = '/dashboard/categories'
    }

    useEffect (() => {
        setLoad(true)
        Axios
        .get(`${CATEGORY}/${id}`)
        .then ( (data) => {
        setTitle(data.data.title)
        setLoad(false)
    }).catch(() => Nav('/dashboard/categories/page/404' , {replace: true}))
    } , [] )

    return (
            <>
                {Load && <Loading/> }

                <Form onSubmit={Handlesubmit} className='bg-white w-100 mx-2 p-3'>

                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter Title" 
                        value={Title}
                        onChange={ (e) => setTitle(e.target.value) }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicImage">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file"
                        onChange={ (e) => setImage(e.target.files.item(0)) }
                        />
                    </Form.Group>

                    <Button disabled={Title.length > 1 ? false : true } className='d-flex ' variant="primary" type="submit">
                        Update
                    </Button>

                </Form>
            </>

    )
}