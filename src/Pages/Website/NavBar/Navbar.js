import { Axios } from "../../../API/Axios"
import { useContext, useEffect, useState } from "react";
import { DropdownButton, DropdownItem, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Link, Navigate } from "react-router-dom";
import { CATEGORIES, LOGOUT, USER } from "../../../API/Api";
import Slicedata from "../../../API/Helpers/Slice";
import Showskelton from "../Skelton/Showskelton";
import Cookie from "cookie-universal"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Cart } from "../../../Context/CartContext";

export default function NavBar() {

    const [loading , setloading] = useState(true)

    // To get user name
    // const [Signin , setignin] = useState(false)
    // const [Username , setUsername] = useState('')

    //     useEffect(() => {
    //         Axios
    //         .get(`/${USER}`)
    //         .then( (res) => setUsername(res.data.name))
    //         .catch(window.location.pathname = '/login')
    //     } , [] )
    // console.log(Username);
    


    // Logout function
    const cookie = Cookie()
    function Handlelogout() {
        Axios.get( `/${LOGOUT}`)
        window.location.pathname = '/login'
        cookie.remove('ecommerce')
    }
    // Home function
    function Home() {
        window.location.pathname = '/'
    }
    

    const [Categories , setCategories] = useState([])
    useEffect(() => {
        Axios.get(`${CATEGORIES}`)
        .then( (res) => setCategories(res.data.data.slice(-7)))  // to get last 8 categories
        .finally ( () => setloading(false))
    } , [] )
    console.log(Categories);

    const ShowCategories = Categories.map( caregory => ( 
            <p className="m-0 category-title">
                {Slicedata(caregory.title , 10)}
            </p>
        ))


        // Add to cart modal
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        // Getting selected products to show onclick cart
        const [Products , setProducts] = useState([])
        // Using context ton refresh cart products
        const { IsChanged } = useContext(Cart)

        useEffect(() => {
            const SelectedProducts = JSON.parse(localStorage.getItem('product')) || [];
            setProducts(SelectedProducts)
        } , [IsChanged])

        const CartShow = Products?.map((product, key) => (
            <div className="mb-4" key={key}>
                <div className="d-flex align-items-start gap-2 flex-wrap">
                    <img
                    src={product.images[0].image}
                    height={"80px"}
                    style={{ objectFit: "cover" }}
                    className="rounded col-sm-3 col-12"
                    alt="img"
                    />
                    <div className="col-sm-6 col-12">
                        <h6>{product.title}</h6>
                        <p className="m-0 text-truncate">{product.description}</p>
                        <div className="d-flex align-items-center gap-3">
                            <h5 className="m-0 text-primary">{product.discount}$</h5>
                            <h6 className="m-0" style={{color: "gray",textDecoration: "line-through"}}>
                                {product.price}$
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
))


return (

    <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>{CartShow}</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary">Ckeckout</Button>
            </Modal.Footer>
        </Modal>




    <nav className="py-3">
        <Container>
            <div className="d-flex align-items-center justify-content-between flex-wrap">
                <Link className="col-3 d-flex " to="/">
                    <img
                    width="150px"
                    src={require('../../Website/Images/Orange and Gray Tag Cart Virtual Shop Logo.png')}
                    alt="logo"/>
                </Link>

                <div className="col-12 col-md-4 order-md-2 order-3 mt-md-0 mt-3 position-relative ">
                    <Form.Control
                    type="Search"
                    className="form-control custom-search py-3 rounded-3 h-50"
                    placeholder="Search Product"
                    />
                    <h3 className="btn btn-primary position-absolute top-0 end-0 h-100 line-height m-0 px-4 rounded-3 d-flex align-items-center justify-content-center">
                        Search
                    </h3>
                </div>
                <div className="col-3 d-flex align-items-center justify-content-end gap-4 order-md-3 order-1">
                        <div>
                            <div onClick={handleShow} style={{display: 'flex' , alignItems:'center' , color: 'black'}} className="divs divs2">
                                <img style={{cursor: 'pointer'}}
                                width="30px"
                                src={require("../../Website/Images/download.png")}
                                alt="Cart"/>
                            </div>
                        </div>
                        <div>
                            {/* {  */}
                                {/* Username === '' ? */}
                                <Link to="/login" style={{display: 'flex' , alignItems:'center' , color: 'black'}} className="divs">
                                <img
                                width="25px"
                                src={require("../../Website/Images/download.jpeg")}
                                alt="Cart"/>
                                Login
                            </Link>
                            {/* :
                                <DropdownButton  style={{width: '100px'}} title={Username}>
                                    <DropdownItem onClick={Home} >Home page</DropdownItem>
                                    <DropdownItem onClick={Handlelogout} >Logout</DropdownItem>
                                </DropdownButton>
                            } */}

                        </div>
                    </div>
                </div>


                    <div className="mt-3">
                        <div className="d-flex justify-content-start align-items-center gap-5 flex-wrap">
                            { loading ? 
                                <>
                                    <Showskelton length='4' height='30px' width='100px'/>
                                </>
                                : (ShowCategories) 
                            }

                            <Link to='/categories' className="text-block category-title divs" >
                                Show All
                            </Link>
                            </div>
                </div>
        </Container>
    </nav>
    </>

);
}