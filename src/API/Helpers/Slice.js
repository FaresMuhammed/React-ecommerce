export default function Slicedata( data , letters){
    return  data.length > letters ? data.slice(0 , letters) + '...' : data 
}