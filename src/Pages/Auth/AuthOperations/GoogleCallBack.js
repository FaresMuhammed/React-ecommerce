import axios from "axios"
import { useEffect } from "react"
import { GOOGLE, URL } from "../../../API/Api"
import { useLocation } from "react-router-dom"
import Cookie from 'cookie-universal'

export default function GoogleCallBack() {

  const location = useLocation()  // to get the location of  the link
  const cookie = Cookie()

  useEffect ( () => {
    async function Callback() {
      try {
        const res = await axios.get(`${URL}/${GOOGLE}${location.search}`)
        console.log(res)
        const token = res.data.access_token
        cookie.set ( 'ecommerce' , token)
      } catch (error) {
        console.log(error);
      }}
      Callback()
  } , [] )

  return (
    <div>
      eeee
    </div>
  )
}