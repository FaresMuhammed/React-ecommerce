import { Route, Routes } from 'react-router-dom';

import Homepage from './Pages/Website/MainWbsite/Homepage';
import Login from './Pages/Auth/AuthOperations/Login';
import Register from './Pages/Auth/AuthOperations/Register';
import Users from './Pages/Dashboard/Users/Users';
import GoogleCallBack from './Pages/Auth/AuthOperations/GoogleCallBack';
import Dashboard from './Pages/Dashboard/Dashboard';
import Requireauth from './Pages/Auth/Protecting/Requireauth';
import UpdateUser from './Pages/Dashboard/Users/Upadateuser';
import Adduser from './Pages/Dashboard/Users/Adduser';
import Error404 from './Pages/Auth/Errors/Error404';
import RequireLogin from './Pages/Auth/Protecting/RequireLogin';
import Categories from './Pages/Dashboard/Categories/Categories';
import AddCategoery from './Pages/Dashboard/Categories/AddCategoery';
import UpdateCategory from './Pages/Dashboard/Categories/UpdateCategory';
import Products from './Pages/Dashboard/Products/Products';
import AddProduct from './Pages/Dashboard/Products/AddProduct';
import UpdateProduct from './Pages/Dashboard/Products/UpdateProduct';
import Website from './Pages/Website/MainWbsite/Website';
import WebsiteProducts from './Pages/Website/Products/SaleProducts/SaleProducts';
import Websitecategories from './Pages/Website/Categories/Categories';
import SingeProduct from './Pages/Website/SingleProduct/SingleProduct';


export default function App() {
  return (
    <div>

      <Routes>

        {/*For any path isn't here */}
        <Route element={<Error404/>} path='/*'/>
        
        {/* Puplic routes */}
        <Route element={<Website/>}>
          <Route path="/" element={<Homepage/>}/>
          <Route path='/categories' element={<Websitecategories/>}/>
          <Route path='/products' element={<WebsiteProducts/>}/>
          <Route path='/product/:id' element={<SingeProduct/>} />
        </Route>

        <Route element={<RequireLogin/>}>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='/auth/google/callback' element={<GoogleCallBack/>}/>
        </Route>

        {/* protected routes */}
        <Route element={<Requireauth Allowedrole={['1995' , '1999']}/>}>  {/* 2001 normal user won't access the dashboard */}
          <Route path='/dashboard' element={<Dashboard/>}>

            <Route element={<Requireauth Allowedrole = {['1995']}/>} >  {/* won't access if your role isn't admin */}
              <Route path='users' element={<Users/>}/>
              <Route path='users/:id' element={<UpdateUser/>}/>
              <Route path='user/add' element={<Adduser/>}/>
            </Route>

            <Route element={<Requireauth Allowedrole = {['1999' , '1995']}/>}>
              
              {/* Categories */}
              <Route path='categories' element={<Categories/>}/>
              <Route path='category/add' element={<AddCategoery/>}/>
              <Route path='categories/:id' element={<UpdateCategory/>}/>

              {/* Products */}
              <Route path='products' element={<Products/>}/>
              <Route path='product/add' element={<AddProduct/>}/>
              <Route path='products/:id' element={<UpdateProduct/>}/>

            </Route>

          </Route>
        </Route>
      </Routes>
    </div>
  )
}