import React, { useState, useEffect } from "react";
import { Trash2, ChevronRight, ChevronLeft  } from 'lucide-react';
interface HistoryItem {
  id: number;
  content: string;
}

function HistorySidebar(props) {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const fetchHistoryItems = async () => {
      const dummyHistory: HistoryItem[] = [];
      setHistoryItems(dummyHistory);
    };

    fetchHistoryItems();
  }, [props]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const clearChatHistory = () => {
    window.confirm("Are you sure you want to clear chat history?") &&
      (localStorage.removeItem("chatHistory"),
       localStorage.removeItem("chatResult"),
       localStorage.removeItem("resultSource"),
       window.location.reload()
      );
  };


  return (
    <>
      <button className="flex absolute m-0.5 lg:hidden" >
        <ChevronRight onClick={toggleSidebar} size={32} className="text-white rounded bg-[#0f172a] dark:bg-[#020817] p-1 hover:text-gray-300"/>
      </button>
      <div className={"lg:flex" + (showSidebar ? " flex" : " hidden")}>
        <div className="w-65 bg-white dark:bg-[#0f172a] p-0 left-0 absolute h-full">
          <div className="overflow-y-scroll h-screen w-60 border-r-4" id="scrollDiv">
            <button className="lg:hidden float-right p-1 mr-1 mt-0.5 transition-all ease-in-out">
              <ChevronLeft onClick={toggleSidebar} className="text-white hover:text-gray-300"/>
            </button>
            <h2 className="p-1 text-xl  text-white w-[180npx]  bg-[#0f172a] dark:bg-[#020817] text-center">
              Chat History
            </h2>
            <button
              className="float-right p-1 mr-1 hover:scale-105 transition-all ease-in-out"
              onClick={clearChatHistory}
            >
              <Trash2 />
            </button>
            <ul className="list-none p-0 mt-8 dark:border-[#020817] border-t-4">
              {props.data.map((item) => (
                <li 
                  className="py-2 px-4 hover:bg-gray-300 dark:hover:bg-[#020817] dark:border-[#020817] border-b-4" 
                  key={item.id}
                  onClick={() => props.selectHistory(item.id)}
                >
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default HistorySidebar;
