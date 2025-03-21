import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";


export default function AddRemoveButton(props) {
    
    const [Btn , setBtn] = useState(1)

    useEffect ( () => {
        props.setConut(Btn)
    } , [Btn])




    return (
        <div className="input-group d-flex align-items-center gap-2">
            <span 
                className="input-group-btn"
                onClick={ (e) => {
                    if (Btn > 0) {
                        setBtn((prev => prev - 1))
                    } else{
                        setBtn(0)
                    }
                }}>

                    <button type="button" className="btn btn-danger btn-number" data-type="minus" data-field="quant[2]">
                        <FontAwesomeIcon icon={faMinus}/>
                    </button>

            </span>
            
            <div>
                <input 
                    type="number" 
                    className="form-control input-number" 
                    name="quant[2]"
                    min={1}
                    max={100}
                    value={Btn}
                    onChange={(e) => {
                        if (e.target.value > 0) {
                            setBtn(e.target.value)
                        } else{
                            setBtn(0)
                        }
                    }}
                />
            </div>

            <span 
                className="input-group-btn"
                onClick={ () =>
                    setBtn((prev) => ++prev)
                }>

                    <button type="button" className="btn btn-success btn-number" data-type="plus" data-field="quant[2]">
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>

            </span>

        </div>
    )

}