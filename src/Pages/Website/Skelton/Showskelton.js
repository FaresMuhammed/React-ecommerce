import Skeleton from "react-loading-skeleton"

export default function Showskelton(props) {

    const Showskeleton = Array.from({length: props.length}).map( ( _, key) => (
        <div className={`${props.classes}`}>
            <div className="mx-1">
                <Skeleton height={props.height} width={props.width}/>
            </div>
        </div>
    ))

    return Showskeleton
}