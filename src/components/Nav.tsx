"use-client"

import { ModeToggle } from "./ui/toggle_button";

export default function Nav() {
    return (
        <header>
            <nav>
                <ul className="flex items-center justify-between">
                    <li>KTUGPT</li>
                    <li><ModeToggle/></li>
                </ul>
            </nav>
        </header>
    );
}

export {Nav}