"use client"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "./ui/toggle_button";
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from 'next/navigation'


export default function Nav() {
    const { signOut } = useClerk();
    const router = useRouter()
    return (
        <header>
            <nav className="border-b-4 border-indigo-500 p-5">
                <ul className="flex ">
                    <li>KTUGPT</li> 
                    <li className="fixed right-5 -mt-2"><Button onClick={() => signOut(() => router.push("/"))}>Sign out</Button></li>
                </ul>
            </nav>
        </header>
    );
}

export {Nav}