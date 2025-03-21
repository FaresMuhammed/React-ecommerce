import Cookie from  'cookie-universal'
import { Outlet } from 'react-router-dom'

export default function RequireLogin() {

    const cookie = Cookie()
    const token = cookie.get('ecommerce')

    return (
    <div>
        {token ? window.history.back() : <Outlet/>}
    </div>
    )
}