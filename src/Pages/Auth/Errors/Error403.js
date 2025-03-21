import { Link } from 'react-router-dom'
import './Error.css'
import { Button } from 'react-bootstrap'

export default function Error403({role}) {  // To control who will have the error by role 
    return (
        <div className='w-100 error'>
            <div className='e403'>
                <h1 className='err'>403</h1> 
            </div>
            <div className='d-flex justify-content-center'>
                <p className='errr'>Not Found</p>
            </div>
            <div className='d-flex justify-content-center'>
                <p className='errrr'>You don't have premission to access this page.</p>
            </div>
            <Link to={ role === '1999' ? '/dashboard/products' : '/' }>
                <Button className='d-flex '>
                    {role === '1999' ? 'Return to products page' : 'Return to homepage'}
                </Button>
            </Link>
        </div>
    )
}