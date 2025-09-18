import {NavLink} from "react-router-dom"

export default function Header(){
    const header = `bg-slate-700 py-6 px-3 shadow-lg shadow-slate-700/30 
                    flex justify-between items-center
                    sm:px-4 md:px-6 lg:pr-10 xl:pr-20 `
    const link = `text-slate-300 text-lg font-semibold
                  transition-transform transition-colors duration-300 ease-in-out 
                  hover:scale-110 active:scale-95 hover:text-slate-400`
    return(
        <header className={header}>
            <h1 className="font-bold text-2xl text-slate-200">Shop Database</h1>
            <nav className="flex gap-4 md:gap-6 lg:gap-10 xl:gap-14 xl:mr-10">
                <NavLink to="/" className={({isActive}) => isActive ? `${link} underline` : link}>home</NavLink>
                <NavLink to="stock" className={({isActive}) => isActive ? `${link} underline` : link}>Stock</NavLink>
            </nav>
        </header>
    )
}