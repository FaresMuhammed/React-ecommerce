import { useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Loading from '../../../Componants/Loading/Loading'
import { Axios } from '../../../API/Axios'
import { CATEGORIES, PRODUCT } from '../../../API/Api'
import { useNavigate } from 'react-router-dom'



export default function AddProduct() {

    const Nav = useNavigate()
    const [Load , setLoad]= useState(false)


    // useeffect to get categories 
    const [Categoriess , setCategoriess] = useState([])
    useEffect ( () => {
        Axios.get(`/${CATEGORIES}`)
        .then( data => setCategoriess(data.data))
        .catch(err => (err) )
    } , [] )
    console.log(Categoriess);
    // Const to show categories's title in options ,, to send the category's id with the product(backend asked)
    const ShowCategories = Categoriess.map ( (item , key) => <option key={key} value={item.id}>{item.title}</option>)
    

    // State to put the input's ID on it
    const [ID , setID] = useState('')

    // State to disable the inputs until choosing category
    const [Disabled , setDisabled] = useState(true)


    // To send it directly after choosing category and return form id
    const FakeData = {
        category: null,
        title: 'dummy',
        description: 'dummy',
        price: '222',
        discount: '0',
        About: 'About',
        stock: '0',
    }
    
    // To send form and return the his id (after choosing categoery)
    async function SubmitForm() {
        try{
            const res = await Axios.post(`${PRODUCT}/add` , FakeData)
            .then ( (dataa) => setID(dataa.data.id))  // now we have the id
        } catch (error) {
            console.log(error);
        }
    }

    // Inputs change
    function Handlechange(e) {
        setForm({ ...Formm , [e.target.name]: e.target.value })
        setDisabled(false)         // To enable the inputs after choosing category
        Disabled && SubmitForm()   // To run the SubmitForm(send fake data) function after choosing category ,, Only can send if disabled is true(only one time)
    }


    const [Formm , setForm ]= useState({
        category: 'Select Category',   // YOU CAN ADD OPTION HERE AS DEFAULT VALUE (IT MUST BE OPTION FROM OPTIONS)
        title: '',
        description: '',
        price: '',
        discount: '',
        About: '',
    })

    // Editing the sent Form by his id
    async function HandleEdit(e) {
        setLoad(true)
        e.preventDefault()
        await Axios.post(`${PRODUCT}/edit/${ID}` , Formm)
        Nav('/dashboard/products')
    }





    // Images
    const [Images , setImages ]= useState([])
    // Image's id (for delete)
    const imageID = useRef([])

    const EveryImg = useRef(-1)  // we will use it instead of i (cuz i will count from zero everytime u will add extra photo) ,,, start from -1 cuz first element will be 0

    // Sendimages
    async function ChangeImages(e) {  // ...previousImages    to dont delete the previous images after adding one
        
        // All choosed images(to show by map) , with [] to can map on it
        setImages( (previousImages) => [ ...previousImages , ...e.target.files])
        // Images have the photos but it will make rerender while adding images(wont add)
        
        const FilesImages = e.target.files  // To decrease rerender
        // Formdate to send images
        const imagess = new FormData()

        // For loop to send more than image cause api accepts only image
        for (let i = 0; i < FilesImages.length; i++) {
        EveryImg.current++;
        imagess.append('image' , FilesImages[i])

        imagess.append('product_id' , ID)        // u must send the product id with image ,,, product id equals the image id (in database)
        try{
            // we put it on the for cuz its only one image
            const ress = await Axios.post('/product-img/add', imagess , {
                onUploadProgress : (ProgressEvent) => {
                    const {loaded, total} = ProgressEvent // total , loaded are in onUploadProgress's parameter

                    const percentt = (Math.floor((loaded*100) / total))
                    Progress.current[EveryImg.current].style.width = `${percentt}%`     // useRef's width equals the percernt 
                    Progress.current[EveryImg.current].setAttribute('percent', `${percentt}%`)
                }
                })
                console.log(imageID);
                imageID.current[EveryImg.current] = ress.data.id;     // the imageID foe current image equals the id for sent 
            } catch (error) {
            console.log(error);
        }
        }
    }


    // Mapping on files to show photos
    const ShowImages = Images.map( (img , key) =>


        <div className='border p-2 w-100'>

<div className='d-flex align-items-center justify-content-between'>

            <div className='d-flex align-items-center justify-content-start gap-2 '>
                
                <img alt='' src={URL.createObjectURL(img)} width='80px'></img>   {/* to change file to image (if the object is file(only) you can change it to link(URL) by javascript) */}
                
                <div>
                    <p style={{width: '120px' , overflow:'hidden' , textOverflow: 'ellipsis' , marginBottom: '1'}}>{img.name}</p>   
                    <p>
                        {/* Image size */}
                        {img.size/(1024) < 999 ?
                        (img.size/(1024)).toFixed(2) + 'KB'
                        : (img.size/(1024*1024)).toFixed(2) + 'MB'
                        }
                    </p>
                </div>

            </div>

            <div><Button onClick={() => Deleteimage(key , img)} variant='danger'>Delete</Button></div>
            </div>

            {/* PROGRESS */}
            <div className='custom-progress mt-3'>
                <span 
                    ref={(element) => {Progress.current[key] = element}}
                    className='inner-progress'
                ></span>
            </div>
        </div>
    )

        // the percent loaded
        const Progress = useRef([])  // one useRef to link it with more than element (every one span with every one image )   ,,, [] cuz we will use it with more than one element

    // To ref files input to new div
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

                            {/*Disabled option to make it the default value (in the form ) */}
                            <option disabled >Select Category</option>
                            {/* The options from backend */}
                            {ShowCategories} 
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control type="text" placeholder="Enter title" 
                        value={Formm.title}
                        onChange={Handlechange}
                        name='title'

                        // to make dynamic disable
                        disabled={Disabled}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control type="text" placeholder="Enter description" 
                        value={Formm.description}
                        onChange={Handlechange}
                        name='description'
                        disabled={Disabled}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price:</Form.Label>
                        <Form.Control type="number" placeholder="Enter price" 
                        value={Formm.price}
                        onChange={Handlechange}
                        name='price'
                        disabled={Disabled}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="discount">
                        <Form.Label>Discount:</Form.Label>
                        <Form.Control type="number" placeholder="Enter discount"
                        value={Formm.discount}
                        onChange={Handlechange}
                        name='discount'
                        disabled={Disabled}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="about">
                        <Form.Label>About:</Form.Label>
                        <Form.Control type="text" placeholder="About..."
                        value={Formm.About}
                        onChange={Handlechange}
                        name='About'
                        disabled={Disabled}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="stock">
                        <Form.Label>Stock:</Form.Label>
                        <Form.Control type="number" placeholder="Stock..."
                        value={Formm.stock}
                        onChange={Handlechange}
                        name='stock'
                        disabled={Disabled}
                        />
                    </Form.Group>

                    {/* Add Photos */}
                    <Form.Group className="mb-3" controlId="images">
                        <Form.Label>Images:</Form.Label>
                        <Form.Control
                        ref={Files}
                        hidden       // To show div instead of input it by useref
                        type="file"
                        multiple     // to allow adding more than file
                        onChange={ChangeImages}
                        />
                    </Form.Group>

                    {/* Upload images div */}
                    <div className='d-flex align-items-center justify-content-center gap-2 py-3 w-100 flex-column rounded ' style={{border: Disabled ? '2px dashed grey' : '2px dashed #0086fe'}} // if inputs are disabled the color will be gray
                    onClick= {() => Files.current.click()
                    }
                    >
                        <img
                            src={require('../../../Assets/Images/R (1).png')}
                            alt='Img'
                            width='100px' 
                            style={{ filter: Disabled && 'grayscale(1)' }} // to change photo's color
                        />
                        
                        <p style={{ marginBottom: '0' , cursor: !Disabled && 'pointer' , color: Disabled? 'grey' : '#0086fe' , fontWeight: 'bold'}}>Upload Images</p>
                    </div>

                    <div className='d-flex align-items-start flex-column gap-2 mb-3'>
                        {ShowImages}
                    </div>

                    <Button disabled={Formm.title.length > 1 ? false : true } className='d-flex ' variant="primary" type="submit">
                        Add
                    </Button>

                </Form>
            </>
    )
}