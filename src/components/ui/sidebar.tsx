import React, { useState, useEffect } from 'react';
import './sidebar.css'; 
interface HistoryItem {
  id: number;
  content: string;
}

function HistorySidebar(props) {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
  
    const fetchHistoryItems = async () => {
      const dummyHistory: HistoryItem[] = [
    
      ];
      setHistoryItems(dummyHistory);
    };

    fetchHistoryItems(); 
  }, [props]); 

  const clearChatHistory = () => {
    window.confirm('Are you sure you want to clear chat history?') && (
      localStorage.removeItem("chatHistory"),
      window.location.reload()
    ); 
  };

  return (
    <div className="flex">
      <div className="w-65 bg-white-200 p-0 left-0 absolute h-full">
        <div className='overflow-y-scroll h-screen w-60' id='scrollDiv'>
        <h2 className="p-1 text-xl  text-white w-[180npx]  bg-[#0f172a] dark:bg-[#020817] text-center">Chat History</h2>
        <button className="float-right p-1 hover:scale-105 transition-all ease-in-out" onClick={clearChatHistory}>Clear Chat History</button>
        <ul className="list-none p-0 mt-8 dark:border-[#020817] border-t-4">
          {props.data.map(item => (
            <li className="py-2 px-4 hover:bg-gray-300 dark:hover:bg-[#0f172a] dark:border-[#020817] border-b-4 border-r-4">{item}</li>
          ))}
        </ul>
        </div>
        
      </div>
    </div>
  );
}

export default HistorySidebar;
