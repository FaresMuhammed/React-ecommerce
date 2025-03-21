import { LOGOUT } from "../../../API/Api"
import { Axios } from "../../../API/Axios"
import Cookie from "cookie-universal"

export default function Logout() {

    const cookie = Cookie()

    async function Handlelogout() {
        try{
            const res = await Axios.get( `/${LOGOUT}`)
            cookie.remove('ecommerce')
        }catch (err) {
            console.log(err);
        }
    }

    return <button onClick={Handlelogout} className="btn center" type='submit'>Logout</button>
}