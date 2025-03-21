import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import './CssComponants/button.css';
import './CssComponants/alerts.css';
import './CssComponants/Loading.css';
import './CssComponants/google.css';
import './Pages/Auth/AuthOperations/Auth.css';
import 'react-loading-skeleton/dist/skeleton.css'  //Skeleton

// reactstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Menucontext from './Context/Menucontext';
import Windowcontext from './Context/Windowcontext';
import Cartcontext from './Context/CartContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Windowcontext>
      <Menucontext>
        <Cartcontext>
          <Router>
            <App/>
          </Router>
        </Cartcontext>
      </Menucontext>
    </Windowcontext>
)
