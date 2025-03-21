import { createContext, useState } from 'react'


export const Menu = createContext(true)

export default function Menucontext({children}) {

    const [ Open , setOpen] = useState(false)

    return (
        <Menu.Provider value = {{Open , setOpen}}>
            {children}
        </Menu.Provider>
    )
}