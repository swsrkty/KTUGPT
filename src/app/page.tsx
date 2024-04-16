"use client"
import * as React from "react"
import { useState,ChangeEvent } from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import Nav from "@/components/Nav"
import { DropdownMenuCheckboxes } from "@/components/drop-down"
import { DropdownMenuCheckboxes2 } from "@/components/drop-down2"
import { Textarea } from "@/components/ui/textarea"
import HistorySidebar from "@/components/ui/sidebar"
type Checked = DropdownMenuCheckboxItemProps["checked"]


export default function Home() {
  const [inputText, setInputText] = useState([]);
  const [outputText, setOutputText] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 👇 Store the input value to local state
    e.preventDefault();
    setInputText(old => [...old, e.target.question.value]);
    console.log(inputText);
    fetch(`http://192.168.31.180:5000/?q=${inputText.slice(-1)}`, {  // Enter your IP address here
  
      method: 'POST', 
      mode: 'cors', 
  
    })
    .then(response => response.text())
      .then(text => {
        text = JSON.parse(text);
        setOutputText(text.result);
      })
      .catch(error => console.error(error));
  };
  
  return (
    <main className=" items-center justify-center">
        <Nav/>
        <HistorySidebar data={inputText}/>
        <section className="py-12 flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold m-4 font-sans">Get answers from your textbooks</h1>
          <p className="text-2xl text-muted-foreground">Select your subject and semester and start with your questions</p>
        </section>
      <div className="flex gap-6 items-center justify-center">
      < DropdownMenuCheckboxes2 />
      < DropdownMenuCheckboxes />
      
      </div>
      <div className="flex w-1/2 items-center justify-center space-x-2 mt-9 ml-96">

        <form onSubmit={handleChange} className="flex w-full items-center justify-between">
        
        <Input id="question" type="text" placeholder="Enter your question here" className="w-full mr-2" />
        <Button type="submit" >Go</Button>

      {/* <p>Your input: {inputText.slice(-1)}</p> */}
        </form>
        
      </div>
      <div className="flex-row min-h-screen justify-center items-center w-1/2 h-2/3 mt-9 ml-96 h-80">
        <Textarea className="rounded-xl align-center justify-center h-80" value={outputText}></Textarea>
      </div>  
    </main>
  );
}
