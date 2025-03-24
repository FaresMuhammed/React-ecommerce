import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { CATEGORIES } from "../../../API/Api";
import { Axios } from "../../../API/Axios";
import Slicedata from "../../../API/Helpers/Slice";
import Showskelton from "../Skelton/Showskelton";

export default function Websitecategories() {

    const [ Loading , setLoading] = useState(true)

    const [categories, setCategories] = useState([]);
    useEffect(() => {
    Axios.get(`${CATEGORIES}`).then((res) => setCategories(res.data))
    .finally( () => setLoading(false))
    } , [] )
    const showCategories = categories?.map((item) => (
        <div className="col-lg-2 col-md-6 col-12 bg-transparent border-0 cat">
            <div className="m-1 bg-white border d-flex align-items-center justify-content-start gap-3 rounded py-2 h-100" style={{overflow:'hidden'}}>
                <img className="ms-3" width="80px"  alt="just an img" 
                    src={"https://react-ecommerce-backend-production-f88d.up.railway.app" + item.image} 
                />
                <p className="m-0">
                    {Slicedata(item.title , 10)}
                </p>
            </div>
        </div>
    ))

    return (
        <>
            <div className="py-5" style={{backgroundColor: 'aliceblue' , height:'800px' }}>
                <Container>
                    <div className="d-flex align-items-center justify-content-center flex-wrap row-gap-2">
                        {Loading ? <Showskelton height='80px' length='12' classes='col-lg-2 col-md-6 col-12 '/> 
                        : showCategories
                        }
                    </div>
                </Container>
            </div>

        </>
    )
    }