import Landing from "../Landing/Landing";
import "./Home.css";
import Saleproducts from "../Products/SaleProducts/ShowSaleproducts";
import ShowTopRated from "../Products/TopRatedProducts/ShowTopRated";
import LatestProducts from "../Products/LatestProducts/LatestProducts";
import { Container } from "react-bootstrap";

export default function HomePage() {

    return (
        <div>
            <Landing/>
            <Saleproducts/>
            <Container>.
                <div className="d-flex align-items-start flex-wrap mt-5" >
                    <ShowTopRated/>
                    <LatestProducts/>
                </div>
            </Container>
        </div>
    )
}