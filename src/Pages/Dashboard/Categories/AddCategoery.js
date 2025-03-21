import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Axios } from '../../../API/Axios'
import { CATEGORY} from '../../../API/Api'
import Loading from '../../../Componants/Loading/Loading'

export default function AddCategoery() {

    // Usestates
    const [ Title , setTitle ] = useState('')
    const [ Image , setImage ] = useState('')
    const [Load , setLoad] = useState(false)

    // Update function
    async function Handlesubmit(e) {
        setLoad(true)
        e.preventDefault()
        // We use Formdata to send image
        const Form = new FormData()
        Form.append('title', Title)
        Form.append('image', Image)

        await Axios
        .post(`${CATEGORY}/add` , Form)
        window.location.pathname = '/dashboard/categories'

    }

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
                        onChange={(e) => setImage(e.target.files.item(0))}   // 0 cause we need the first file
                        />
                    </Form.Group>

                    <Button disabled={Title.length > 1 ? false : true } className='d-flex ' variant="primary" type="submit">
                        Add
                    </Button>

                </Form>
            </>
    )
}