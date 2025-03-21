import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default function Error404() {
    return (
        <div className='w-100 error'>
            <div className='e403'>
                <h1 className='err'>404</h1> 
            </div>
            <div className='d-flex justify-content-center'>
                <p className='errr'>Not Found</p>
            </div>
            <div className='d-flex justify-content-center'>
                <p className='errrr'>The page you are looking for is not available.</p>
            </div>
            <Link to={'/'}>
                <Button className='d-flex '>
                    Return To Homepage
                </Button>
            </Link>
        </div>
    )
}