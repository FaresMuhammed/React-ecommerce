import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { REGISTER, URL } from "../../../API/Api";
import Loading from "../../../Componants/Loading/Loading";
import Cookie from  'cookie-universal'
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import ph from './OIP.jpeg'


export default function Register() {

  const Ref = useRef()
  useEffect( ()=> {
    Ref.current.focus()
  } , [] )
  
  const navigate = useNavigate()

  const cookie = Cookie()

  // useStates
  const [Formm , setFormm] = useState({
    name: '',
    email: '',
    password:''
  })

  const [Error , setError] = useState('')

  const [loading , setloading] = useState(false)

  // Functions
  function Handlechange(e) {
    setFormm({...Formm , [e.target.name]: e.target.value})
  }

  async function Handlesubmit(e) {
    e.preventDefault();
    setloading(true)

    try{
      const res = await axios.post(` ${URL}/${REGISTER}` , Formm)
      setloading(false) 
      const token = res.data.token
      cookie.set('ecommerce' , token)
      navigate('/dashboard')
    }

    catch (err) {
      console.log(err);
      setloading(false)
      if (err.response.status === 422) {
        setError( <div className="center "> Email is already registered </div>)
      }else{
        setError('Internal Server Error')
      }
    }
  }


  return (
    <>
    {loading && <Loading/>} 
    
    <div className='container'>
      <div className="row" style={{height: '100vh'}}>
        <Form className="form " onSubmit={Handlesubmit}>
          <div className="center">
            <div className="custom-form">
              <h1 className="h1"> Register </h1>

              <Form.Group className="form-custom mb-3">
                <Form.Control id='name' type='text' placeholder='Enter Your Name...'
                name="name"
                value={Formm.name}
                onChange={Handlechange}
                required
                ref={Ref}
                />
                <Form.Label htmlFor='name'>Name</Form.Label>
              </Form.Group>

              <Form.Group className="form-custom mb-3" >
                <Form.Control id='email' type='email' placeholder='Enter Your Email...'
                name="email"
                value={Formm.email}
                onChange={Handlechange}
                required
                />
                <Form.Label htmlFor='email'>Email</Form.Label>

              </Form.Group>            
              
              <Form.Group className="form-custom mb-3">
                <Form.Control id='password' type='password' placeholder='Enter Your Password'
                name="password"
                value={Formm.password}
                onChange={Handlechange}
                required
                minLength='6'
                />
                <Form.Label htmlFor='password'>Password</Form.Label>
              </Form.Group>

              {Error !== '' && <span className="error ">{Error}</span>}

              <button className="btn btn-primary center" type='submit'>Register</button>
              
              <div className="or center">OR</div>
              <div className="center">
                <div className="google-btn ">
                  <a  href="http://127.0.0.1:8000/login-google">
                    <div className="google-icon-wrapper">
                      <img
                      className="google-icon"
                      src={ph}
                      alt="Sign in wiwth google"
                      />
                    </div>
                    <p className="btn-text">
                      <b>Register with google</b>
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </>
  )
}
