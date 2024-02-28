import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
 
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import Nav from "@/components/Nav"
import { DropdownMenuCheckboxes } from "@/components/drop-down"
import { DropdownMenuCheckboxes1 } from "@/components/dropdown2"
import { Textarea } from "@/components/ui/textarea"

type Checked = DropdownMenuCheckboxItemProps["checked"]

export default function Home() {
 
  return (
    <main className=" p-12 items-center justify-center">
        <Nav/>
        <section className="py-12 flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold m-4 font-sans">Get answers from your textbooks</h1>
          <p className="text-2xl text-muted-foreground">Select your subject and semester and start with your questions</p>
        </section>
      <div className="flex gap-6 items-center justify-center">
      < DropdownMenuCheckboxes />
      < DropdownMenuCheckboxes1 />
      </div>
      <div className="flex w-1/2 items-center justify-center space-x-2 mt-9 ml-96">
        <Input type="text" placeholder="Enter your question here" />
        <Button type="submit">Go</Button>
      </div>
      <div className="flex-row min-h-screen justify-center items-center w-1/2 h-2/3 mt-9 ml-96 h-80">
        <Textarea className="rounded-xl align-center justify-center h-80"></Textarea>
      </div>
    </main>
  );
}
