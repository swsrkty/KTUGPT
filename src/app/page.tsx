"use client";
import * as React from "react";
import { useState, useEffect, ChangeEvent } from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import Nav from "@/components/Nav";
import { DropdownMenuCheckboxes } from "@/components/drop-down";
import { DropdownMenuCheckboxes2 } from "@/components/drop-down2";
import { Textarea } from "@/components/ui/textarea";
import HistorySidebar from "@/components/ui/sidebar";
type Checked = DropdownMenuCheckboxItemProps["checked"];

export default function Home() {
  const [inputText, setInputText] = useState([]);
  const [outputText, setOutputText] = useState([]);
  const [id, setId] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(
      localStorage.getItem("chatHistory") || "[]"
    );
    setInputText(storedHistory);
  }, []);

  useEffect(() => {
    if (inputText.length > 0) {
      setLoading(true);
      console.log(inputText.slice(-1));
      fetch(` http://127.0.0.1:5000/?q=${inputText.slice(-1)["text"]}`, {
        //====== Enter your IP address here ======
        method: "POST",
        mode: "cors",
      })
        .then((response) => response.text())
        .then((text) => {
          text = JSON.parse(text);
          setOutputText((old) => [...old, text.result]);
          setLoading(false);
          setId(-1);
          setSource(text.source);
        })
        .catch((error) => console.error(error));
    }
  }, [inputText]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newInput = e.target.question.value;
    setInputText((old) => [...old, {"id": old.length+1, "text": newInput}]);
    localStorage.setItem(
      "chatHistory",
      JSON.stringify([...inputText, {"id": inputText.length+1, "text": newInput}])
    );
    localStorage.setItem(
      "chatResult",
      JSON.stringify(outputText)
    );
  };

  const message = (itemId) => setId(itemId)

  return (
    <main className=" items-center justify-center">
      <Nav />
      <HistorySidebar data={inputText} selectHistory={message}/>
      <section className="flex flex-col pt-6 items-center text-center">
        <h2 className="ml-12 text-4xl font-bold font-sans">
          Get answers from your textbooks
        </h2>
      </section>
      <div className="flex w-1/2 items-center justify-center space-x-2 mt-9 ml-96">
        <form
          onSubmit={handleChange}
          className="flex w-full items-center justify-between"
        >
          <Input
            id="question"
            type="text"
            placeholder="Enter your question here"
            className="text-md w-full mr-2"
            required
          />
          <Button type="submit" disabled={loading}>{loading ? <>Loading..</> : <>Go</>}</Button>

          {/* <p>Your input: {inputText.slice(-1)}</p> */}
        </form>
      </div>
      <div className="flex-row justify-center items-center w-1/2 mt-9 ml-96 h-60">
        <Textarea
          className="text-md rounded-xl align-center justify-center h-60"
          value={id == -1 ? outputText.slice(-1) : outputText[id-1]}
        ></Textarea>
      </div>
      <ul className="ml-96 pl-4 mt-2">
        <h1 className="font-bold">References:</h1>
        {source.map((item) => (
          <li>{"Textbook: " + item.join(" - page: ")}</li>
        ))}
      </ul>
    </main>
  );
}
