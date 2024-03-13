import { Actions } from "./actions"
import { Logo } from "./logo"

export const Navbar = () => { 
    return (
        <nav className="fixed top-0 w-full h-20 z-[49] bg-[#252731] px-2 lg:px-4  shadow-sm flex items-center justify-between ">
            <Logo />
            <Actions />
        </nav>
    )
}
