import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Landing(){
    return(
        <div>
        <div className="d-flex align-items-center justify-content-between flex-wrap hand">
            <Container>
                
            <div className="col-lg-5 col-md-8 col-12 text-md-start text-center">
                <h1 className="display-2 fw-bold" style={{color: 'white'}}>
                    What's on your mind?
                </h1>
                <h2 style={{ color: "white" }} className="fw-normal">
                    You are welcomed!
                </h2>

            {/* <Link
                to="/shop"
                className="btn btn-primary mt-3 py-3 px-4 fw-bold text-light"
                >
                Shop Now
            </Link> */}
            </div>
            </Container>
        </div>
    </div>
    )
}