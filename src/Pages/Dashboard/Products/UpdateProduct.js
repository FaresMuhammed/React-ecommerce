import { useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Loading from '../../../Componants/Loading/Loading'
import { Axios } from '../../../API/Axios'
import { CATEGORIES, PRODUCT } from '../../../API/Api'
import { useNavigate, useParams } from 'react-router-dom'


export default function UpdateProduct() {

    const Nav = useNavigate()
    const {id} = useParams()
    const [Load , setLoad]= useState(false)
    const [ImagesFromServer , setImagesFromServer]= useState([])
    const [ImagesFromServerID , setImagesFromServerID] = useState([])  // to store the deleted images's id

    const [Formm , setForm ]= useState({
        category: 'Select Category',
        title: '',
        description: '',
        price: '',
        discount: '',
        About: '',
    })

    function Handlechange(e) {
        setForm({ ...Formm , [e.target.name]: e.target.value })
    }


// Getting categories
    const [Categoriess , setCategoriess] = useState([])
    useEffect ( () => {
        Axios.get(`/${CATEGORIES}`)
        .then( data => setCategoriess(data.data.data))
        .catch(err => (err) )
    } , [] )

    const ShowCategories = Categoriess.map ( (item , key) => <option key={key} value={item.id}>{item.title}</option>)


    // To get products 
    useEffect ( () => {
        Axios.get(`${PRODUCT}/${id}`)
        .then(
            (data) => {setForm(data.data[0])
            setImagesFromServer(data.data[0].images)
            console.log(data);
        })
        .catch(err => (err))
    } , [])




    async function HandleEdit(e) {

        setLoad(true)
        e.preventDefault()

        // To run the delete function after save only (images wont deleted without save)
        for (let i = 0; i < ImagesFromServerID.length; i++) {
            await Axios.delete(`product-img/${ImagesFromServerID}`)
        }

        await Axios.post(`${PRODUCT}/edit/${id}` , Formm)
        Nav('/dashboard/products')
    }




    // Images
    const [Images , setImages ]= useState([])
    const imageID = useRef([])
    const EveryImg = useRef(-1)
    const Progress = useRef([])

    async function ChangeImages(e) {
        
        setImages( (previousImages) => [ ...previousImages , ...e.target.files])
        
        const FilesImages = e.target.files
        const imagess = new FormData()
        for (let i = 0; i < FilesImages.length; i++) {
        EveryImg.current++;
        imagess.append('image' , FilesImages[i])

        imagess.append('product_id' , id)
        try{
            const ress = await Axios.post('/product-img/add', imagess , {
                onUploadProgress : (ProgressEvent) => {
                    const {loaded, total} = ProgressEvent
                    const percentt = (Math.floor((loaded*100) / total))
                    Progress.current[EveryImg.current].style.width = `${percentt}%`
                    Progress.current[EveryImg.current].setAttribute('percent', `${percentt}%`)
                }
                })
                console.log(imageID);
                imageID.current[EveryImg.current] = ress.data.id;
            } catch (error) {
            console.log(error);
        }
        }
    }


    // Show images
    const ShowImages = Images.map( (img , key) =>
        <div className='border p-2 w-100'>
            <div className='d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center justify-content-start gap-2 '>
                    
                    <img alt='' src={URL.createObjectURL(img)} width='80px'></img>
                    
                    <div>
                        <p style={{width: '120px' , overflow:'hidden' , textOverflow: 'ellipsis' , marginBottom: '1'}}>{img.name}</p>   
                        <p>
                            {img.size/(1024) < 999 ?
                            (img.size/(1024)).toFixed(2) + 'KB'
                            : (img.size/(1024*1024)).toFixed(2) + 'MB'
                            }
                        </p>
                    </div>

                </div>

                <div><Button onClick={() => Deleteimage(key , img)} variant='danger'>Delete</Button></div>
            </div>

            <div className='custom-progress mt-3'>
                <span 
                    ref={(element) => {Progress.current[key] = element}}
                    className='inner-progress'
                ></span>
            </div>
        </div>
    )
    console.log(ImagesFromServer);

    // Show images from backend
    const ShowImagesFromServer = ImagesFromServer.map( (img , key) =>
    <div className='border p-2 w-100'>
    <div className='d-flex align-items-center justify-content-between'>
        <div key={key} className='d-flex align-items-center justify-content-start gap-2 '>
            <img alt='' src={img.image} width='80px'></img>
        </div>

        <div><Button onClick={() => DeleteimageFromServer(img.id)} variant='danger'>Delete</Button></div>
    </div>
</div>

)


    const Files = useRef()

    async function Deleteimage(id , img) {
            const Currentid = imageID.current[id];
        try {
            await Axios.delete(`product-img/${Currentid}`)
            setImages( (prev) => prev.filter((image) => image !== img) )
            imageID.current= imageID.current.filter((ids) => ids !== Currentid)
            EveryImg.current--
        } catch (error) {
            console.log(error);
        }
    }

    async function DeleteimageFromServer(id) {
        setImagesFromServer( (prev) => prev.filter((image) => image.id !== id) )
        setImagesFromServerID( (prev) => {return [ ...prev, id ]} )   // now the id for deleted images stored
}


    return (
            <>
                {Load && <Loading/>}

                <Form className='bg-white w-100 mx-2 p-3' onSubmit={HandleEdit}>

                    <Form.Group className="mb-3" controlId="category">
                        <Form.Label>Category:</Form.Label>
                        <Form.Select 
                            value={Formm.category}
                            onChange={Handlechange}
                            name='category' >
                            <option disabled >Select Category</option>
                            {ShowCategories} 
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Title" 
                        value={Formm.title}
                        onChange={Handlechange}
                        name='title'


                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Title" 
                        value={Formm.description}
                        onChange={Handlechange}
                        name='description'
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price:</Form.Label>
                        <Form.Control type="number" placeholder="Enter Title" 
                        value={Formm.price}
                        onChange={Handlechange}
                        name='price'
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="discount">
                        <Form.Label>Discount:</Form.Label>
                        <Form.Control type="number" placeholder="Enter Discount"
                        value={Formm.discount}
                        onChange={Handlechange}
                        name='discount'
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="about">
                        <Form.Label>About:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Title" 
                        value={Formm.About}
                        onChange={Handlechange}
                        name='About'
                        />
                    </Form.Group>

                    {/* Add Photos */}
                    <Form.Group className="mb-3" controlId="images">
                        <Form.Label>Images:</Form.Label>
                        <Form.Control
                        ref={Files}
                        hidden
                        type="file"
                        multiple
                        onChange={ChangeImages}
                        />
                    </Form.Group>

                    <div className='d-flex align-items-center justify-content-center gap-2 py-3 w-100 flex-column rounded ' style={{border: '2px dashed #0086fe' , marginBottom: '8px'}}
                    onClick= {() => Files.current.click()
                    }
                    >
                        <img
                            src={require('../../../Assets/Images/R (1).png')}
                            alt='Img'
                            width='100px' 
                        />
                        
                        <p style={{ marginBottom: '0' , cursor: 'pointer' , color: '#0086fe' , fontWeight: 'bold'}}
                        >Upload Images</p>
                    </div>

                    <div className='d-block align-items-start flex-wrap gap-2 mb-3'>
                        {ShowImagesFromServer}
                    </div>
                    <div className='d-flex align-items-start flex-column gap-2 mb-3'>
                        {ShowImages}
                    </div>


                    

                    <Button className='d-flex ' variant="primary" type="submit">
                        Save
                    </Button>

                </Form>
            </>
    )
}