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
            <nav className="border-b-4 border-indigo-500 p-5 pb-7">
                <ul className="flex ">
                    <h1 className="text-[#0f172a] dark:text-white font-black font-sans text-3xl -mt-2 -mb-5">KTUGPT</h1>
                    <li className="absolute right-28 -mt-2"><ModeToggle /></li>
                    <li className="absolute right-5 -mt-2"><Button onClick={() => signOut(() => router.push("/"))}>Sign out</Button></li>
                </ul>
            </nav>
        </header>
    );
}

export {Nav}