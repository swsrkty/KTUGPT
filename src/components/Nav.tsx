"use-client"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "./ui/toggle_button";


export default function Nav() {
    return (
        <header>
            <nav className="border-b-4 border-indigo-500 p-5">
                <ul className="flex ">
                    <li>KTUGPT</li> 
                    <li className="fixed right-0"><Button>Login</Button></li>
                </ul>
            </nav>
        </header>
    );
}

export {Nav}