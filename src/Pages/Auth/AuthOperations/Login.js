import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { LOGIN, URL } from "../../../API/Api";
import Loading from "../../../Componants/Loading/Loading";
import Cookie from  'cookie-universal'
import ph from './OIP.jpeg'

import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";


export default function Login() {

  const Ref = useRef()
  useEffect(() => {
    Ref.current.focus()
  }, [])

  const cookie = Cookie()

  // useStates
  const [Formm , setFormm ]= useState({
    email: '',
    password: ''
  })
  const [Error , setError] = useState('')
  const [loading , setloading] = useState(false)

  // Functions
  function Handlechange(e) {
    setFormm({ ...Formm , [e.target.name]: e.target.value })
  }

  async function Handlesubmit(e) {
    e.preventDefault();
    setloading(true)
    
    try{
      const res = await axios.post(` ${URL}/${LOGIN}` , {
        email: Formm.email ,
        password: Formm.password
      })
      setloading(false)
      console.log(res)
      const token = res.data.token
      cookie.set('ecommerce' , token)
      // Navigate according to role
      const role = res.data.user.role
      const go = role === '1995' ? '/dashboard/users' : (role === '1999' ? '/dashboard/products' : '/')
      window.location.pathname = `${go}`
    }
    catch (err) {
      setloading(false)
      if (err.response.status === 401) {
        setError( <div className="center"> Wrong email or password </div>)
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
        <Form className="form " onSubmit={Handlesubmit} style={{ position: 'relative'}}>
          <div className="center">

            <div className="custom-form">

              <h1 className="h1"> Login </h1>
              
              <Form.Group className="form-custom mb-3">
                <Form.Control id='email' type='email' placeholder='Enter Your Email...'
                name="email"
                value={Formm.email}
                onChange={Handlechange}
                required
                ref={Ref}
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
              
              <button className="btn btn-primary center" type='submit'>Login</button>
              
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
                      <b>Login with google</b>
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="center" style={ {marginTop: '20px' , }}>
            <p> Not a member?</p>
            <Link to={'/register'}><p style={{fontWeight: 'bold'}}>  Register Now</p></Link>
          </div>
        </Form>
      </div>
    </div>
  </>
  )
}
