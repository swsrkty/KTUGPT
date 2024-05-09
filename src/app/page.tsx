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
      fetch(` https://sameemul-haque-ktugpt.hf.space/?q=${inputText[inputText.length-1]["text"]}`, {
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
          setSource((old) => [...old, text.source]);
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
    localStorage.setItem(
      "resultSource",
      JSON.stringify(outputText)
    );
  };

  const message = (itemId) => setId(itemId)

  return (
    <main>
      <Nav />
      <div className="flex">
        <HistorySidebar data={inputText} selectHistory={message}/>
        <section className="grow">
          <h2 className="pt-8 lg:pt-6 text-center text-2xl lg:text-3xl font-bold font-sans">
            Get answers from your textbooks
          </h2>
          <div className="flex justify-center">
            <form
              onSubmit={handleChange}
              className="flex flex-row gap-4 pt-6 w-10/12 lg:w-1/2"
              >
              <Input
                id="question"
                type="text"
                placeholder="Enter your question here"
                className="md:text-md"
                required
                />
              <Button type="submit" disabled={loading}>{loading ? <>Loading..</> : <>Go</>}</Button>

              {/* <p>Your input: {inputText.slice(-1)}</p> */}
            </form>
          </div>
          <div className="flex justify-center pt-6 h-52">
            <Textarea
              className="text-md rounded-xl w-10/12 lg:w-1/2 h-52"
              value={id == -1 ? outputText.slice(-1) : outputText[id-1]}
              ></Textarea>
          </div>
          <div className="flex justify-center pt-6">
            <ul className="w-10/12 lg:w-1/2">
              <h1 className="font-bold">References:</h1>
              {
                source.length > 0 ?
                source[id == -1 ? source.length - 1 : id - 1].map((item) => (
                  <li>{"Textbook: " + item.join(" - page: ")}</li>
                )):
                null
              }
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
