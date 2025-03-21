import { createContext, useState } from 'react'


export const Cart = createContext(true)

export default function Cartcontext({children}) {

    const [ IsChanged , setIsChanged] = useState(false)

    return (
        <Cart.Provider value = {{IsChanged , setIsChanged}}>
            {children}
        </Cart.Provider>
    )
}